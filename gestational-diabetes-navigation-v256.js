(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
var STYLE_ID='gm-dmg-navigation-v256-style';
var TOP_FLAG='data-gm-dmg-command-back-v256';
var INNER_FLAG='data-gm-dmg-menu-back-v256';

function root(){return document.getElementById(ROOT_ID);}
function addStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');
  s.id=STYLE_ID;
  s.textContent=[
    '#'+ROOT_ID+' .gm-dmg-new-back['+TOP_FLAG+']{font-weight:850!important;white-space:nowrap!important}',
    '#'+ROOT_ID+' [data-master-back]['+INNER_FLAG+']{font-weight:850!important;white-space:nowrap!important}',
    '@media(max-width:440px){#'+ROOT_ID+' .gm-dmg-new-back['+TOP_FLAG+']{font-size:11px!important}#'+ROOT_ID+' [data-master-back]['+INNER_FLAG+']{font-size:10.5px!important;padding:0 9px!important}}'
  ].join('');
  document.head.appendChild(s);
}

function closeToCommand(){
  if(typeof window.closeGestationalDiabetesModule==='function'){
    window.closeGestationalDiabetesModule();
    return true;
  }
  return false;
}

function backToDmgMenu(){
  var api=window.GestaMedDMGMaster;
  if(api&&typeof api.menu==='function'){
    api.menu();
    return true;
  }
  return false;
}

function patchTop(r){
  var btn=r.querySelector('.gm-dmg-new-back');
  if(!btn)return false;
  btn.textContent='‹ Voltar à tela de comando';
  btn.setAttribute('aria-label','Voltar à tela de comando');
  btn.setAttribute('title','Voltar à tela de comando');
  btn.setAttribute(TOP_FLAG,'1');
  if(btn.getAttribute('data-gm-v256-bound')!=='1'){
    btn.setAttribute('data-gm-v256-bound','1');
    btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      closeToCommand();
    },true);
  }
  return true;
}

function patchInner(r){
  var d=r.querySelector('.gm-dmg-new-detail');
  if(!d||d.hidden)return false;
  var btn=d.querySelector('[data-master-back]');
  if(!btn)return false;
  btn.textContent='‹ Voltar ao Diabetes Gestacional';
  btn.setAttribute('aria-label','Voltar ao menu do Diabetes Gestacional');
  btn.setAttribute('title','Voltar ao Diabetes Gestacional');
  btn.setAttribute(INNER_FLAG,'1');
  if(btn.getAttribute('data-gm-v256-bound')!=='1'){
    btn.setAttribute('data-gm-v256-bound','1');
    btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      backToDmgMenu();
    },true);
  }
  return true;
}

function patch(){
  addStyle();
  var r=root();
  if(!r)return false;
  patchTop(r);
  patchInner(r);
  return true;
}

function schedule(){
  [0,60,160,350].forEach(function(ms){setTimeout(patch,ms);});
}

function init(){
  addStyle();
  var r=root();
  if(!r){setTimeout(init,150);return;}
  schedule();
  var obs=new MutationObserver(function(){schedule();});
  obs.observe(r,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','data-topic']});
  r.addEventListener('click',function(e){
    if(e.target.closest&&e.target.closest('[data-master-topic]'))schedule();
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
window.addEventListener('load',schedule,{once:true});
})();
