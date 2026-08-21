(function(){
'use strict';
var PATCH_ID='2026.08.21.261';
function start(){
  var api=window.GestaMedHDPState;
  if(!api){window.setTimeout(start,80);return;}
  if(api.__maternalHistoryCompat)return;
  var originalGet=api.getValue;
  var originalSet=api.set;
  var originalPatch=api.patch;
  function map(path){return typeof path==='string'&&path.indexOf('history.')===0?'maternalHistory.'+path.slice(8):path;}
  api.getValue=function(path){try{return originalGet.call(api,map(path));}catch(error){return '';}};
  api.set=function(path,value,source){return originalSet.call(api,map(path),value,source||'state-compat-v261');};
  api.patch=function(values,source){var mapped={};Object.keys(values||{}).forEach(function(path){mapped[map(path)]=values[path];});return originalPatch.call(api,mapped,source||'state-compat-v261');};
  api.__maternalHistoryCompat=true;
  document.documentElement.setAttribute('data-gm-hdp-state-compat',PATCH_ID);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
