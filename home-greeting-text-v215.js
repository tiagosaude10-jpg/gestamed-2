(function(){
'use strict';
function apply(){
  var p=document.querySelector('#gm-app-flow [data-screen="home"] .gm-command-greeting p');
  if(!p)return false;
  p.textContent='Acesse conteúdos para apoiar sua prática com excelência.';
  return true;
}
var tries=0;
function start(){tries+=1;if(apply())return;if(tries<120)setTimeout(start,100);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();