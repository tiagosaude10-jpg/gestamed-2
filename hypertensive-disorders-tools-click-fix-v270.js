(function(){
'use strict';
var PATCH_ID='2026.08.21.270';
var bypass=false;
function clickFresh(kind){
  var root=document.getElementById('gm-hdp-screen');
  if(!root)return;
  var selector=kind==='fab'?'[data-hdp-tools-fab]':'[data-hdp-tools-open="'+kind+'"]';
  var old=root.querySelector(selector);
  if(!old)return;
  var container=kind==='fab'?old:old.closest('.gm-hdp-tools-launch');
  if(container)container.remove();
  var attempts=0;
  function tryAgain(){
    attempts+=1;
    var fresh=document.querySelector('#gm-hdp-screen '+selector);
    if(fresh){
      bypass=true;
      try{fresh.click();}finally{window.setTimeout(function(){bypass=false;},0);}
      return;
    }
    if(attempts<20)window.setTimeout(tryAgain,25);
  }
  window.setTimeout(tryAgain,0);
}
function delegated(event){
  if(bypass)return;
  var target=event.target&&event.target.closest?event.target.closest('[data-hdp-tools-open],[data-hdp-tools-fab]'):null;
  if(!target||!target.closest('#gm-hdp-screen'))return;
  event.preventDefault();
  event.stopImmediatePropagation();
  var kind=target.hasAttribute('data-hdp-tools-fab')?'fab':target.getAttribute('data-hdp-tools-open');
  clickFresh(kind||'calc');
}
function start(){
  document.addEventListener('click',delegated,true);
  document.documentElement.setAttribute('data-gm-hdp-tools-click-fix',PATCH_ID);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();