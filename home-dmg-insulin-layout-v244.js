(function(){
'use strict';

var PATCH_ID='2026.08.19.244';
var DMG_CARD_ID='gm-dmg-home-card-v244';
var INSULIN_BOUND='data-gm-insulin-home-v244';

function home(){return document.querySelector('#gm-app-flow [data-screen="home"]');}
function grid(){var h=home();return h?h.querySelector('.gm-command-module-grid[aria-label="Módulos do GestaMed"]'):null;}
function insulinCard(){var h=home();return h?h.querySelector('[data-gm-module="insulina"]'):null;}
function iicCard(){return document.getElementById('gm-iic-cerclage-command-button');}

function openFullDmg(){
  if(typeof window.openGestationalDiabetesModule==='function')window.openGestationalDiabetesModule();
}

function openInsulin(){
  openFullDmg();
  var tries=0;
  var timer=window.setInterval(function(){
    tries+=1;
    if(window.GestaMedDMGMaster&&typeof window.GestaMedDMGMaster.open==='function'){
      window.GestaMedDMGMaster.open('insulin');
      window.clearInterval(timer);
      return;
    }
    if(tries>=20)window.clearInterval(timer);
  },75);
}

function setInsulinCard(){
  var btn=insulinCard();
  if(!btn)return false;

  var icon=btn.querySelector('.gm-command-module-icon');
  var copy=btn.querySelector('.gm-command-module-copy');
  var strong=copy&&copy.querySelector('strong');
  var oldDmgSubtitle=copy&&copy.querySelector('.gm-dmg-new-subtitle');

  if(icon)icon.textContent='💉';
  if(strong)strong.textContent='Cálculo de Insulina';
  if(oldDmgSubtitle)oldDmgSubtitle.remove();
  if(copy){
    var small=copy.querySelector('.gm-insulin-home-subtitle');
    if(!small){small=document.createElement('small');small.className='gm-insulin-home-subtitle';copy.appendChild(small);}
    small.textContent='Dose, NPH e esquema inicial';
  }
  btn.setAttribute('aria-label','Cálculo de Insulina');
  btn.setAttribute('title','Cálculo de Insulina');

  if(btn.getAttribute(INSULIN_BOUND)!=='1'){
    btn.setAttribute(INSULIN_BOUND,'1');
    btn.addEventListener('click',function(event){
      event.preventDefault();
      event.stopPropagation();
      if(event.stopImmediatePropagation)event.stopImmediatePropagation();
      openInsulin();
    },true);
  }
  return true;
}

function ensureDmgCard(){
  var g=grid();
  var iic=iicCard();
  if(!g||!iic)return false;

  var btn=document.getElementById(DMG_CARD_ID);
  if(!btn){
    btn=document.createElement('button');
    btn.id=DMG_CARD_ID;
    btn.type='button';
    btn.className='gm-command-module gm-card-pink';
    btn.setAttribute('aria-label','Diabetes Gestacional');
    btn.setAttribute('title','Diabetes Gestacional');
    btn.innerHTML='<span class="gm-command-module-icon">🩸</span><span class="gm-command-module-copy"><strong>Diabetes Gestacional</strong><small>Diagnóstico, rastreio e critérios</small></span><span class="gm-command-arrow">›</span>';
    btn.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();openFullDmg();});
  }

  if(btn.parentElement!==g||iic.nextElementSibling!==btn){
    iic.insertAdjacentElement('afterend',btn);
  }
  return true;
}

function enforceOrder(){
  var g=grid();
  if(!g)return false;
  var idade=g.querySelector('[data-gm-module="idade"]');
  var insulina=insulinCard();
  var exames=g.querySelector('[data-gm-module="exames"]');
  var peso=g.querySelector('[data-gm-module="peso"]');
  var prescricoes=g.querySelector('[data-gm-module="prescricoes"]');
  var condutas=g.querySelector('[data-gm-module="condutas"]');
  var iic=iicCard();
  var dmg=document.getElementById(DMG_CARD_ID);
  if(!idade||!insulina||!exames||!peso||!prescricoes||!condutas)return false;

  [idade,insulina,exames,peso,prescricoes,condutas].forEach(function(card){g.appendChild(card);});
  if(iic)g.appendChild(iic);
  if(dmg)g.appendChild(dmg);
  return true;
}

function apply(){
  if(!setInsulinCard())return false;
  ensureDmgCard();
  enforceOrder();
  var h=home();if(h)h.setAttribute('data-gm-home-buttons',PATCH_ID);
  return true;
}

function addStyle(){
  var id='gm-home-dmg-insulin-layout-v244-style';
  if(document.getElementById(id))return;
  var s=document.createElement('style');s.id=id;
  s.textContent=[
    '#gm-app-flow [data-screen="home"] [data-gm-module="insulina"] .gm-command-module-copy strong{font-size:13px!important;line-height:1.18!important;font-weight:800!important;}',
    '#gm-app-flow [data-screen="home"] [data-gm-module="insulina"] .gm-command-module-copy strong:before{content:none!important;display:none!important;}',
    '#gm-app-flow [data-screen="home"] [data-gm-module="insulina"] .gm-dmg-new-subtitle{display:none!important;}',
    '#gm-app-flow [data-screen="home"] .gm-insulin-home-subtitle,#gm-app-flow [data-screen="home"] #'+DMG_CARD_ID+' small{display:block;margin-top:3px;color:#40506c;font-size:9px;line-height:1.2;}'
  ].join('');
  document.head.appendChild(s);
}

function init(){
  addStyle();
  [0,100,250,500,900,1500,2500].forEach(function(ms){window.setTimeout(apply,ms);});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',function(){window.setTimeout(apply,100);},{once:true});
})();