(function(){
'use strict';
var PATCH='2026.08.19.243';
var HOME_ATTR='data-gm-dmg-home-layout-v243';
var DMG_ATTR='data-gm-dmg-home-card';
var running=false;

function home(){return document.querySelector('#gm-app-flow [data-screen="home"]');}
function grid(){var h=home();return h&&h.querySelector('.gm-command-module-grid[aria-label="Módulos do GestaMed"]');}
function insulinCard(){var h=home();return h&&h.querySelector('[data-gm-module="insulina"]');}
function iicCard(){return document.getElementById('gm-iic-cerclage-command-button') || (function(){var g=grid();if(!g)return null;return Array.prototype.slice.call(g.children).find(function(el){var t=(el.textContent||'').toLowerCase();return t.indexOf('iic')!==-1&&t.indexOf('cerclagem')!==-1&&t.indexOf('progesterona')!==-1;})||null;})();}
function dmgCard(){var h=home();return h&&h.querySelector('['+DMG_ATTR+'="1"]');}

function setCopy(btn,title,subtitle,icon){
  if(!btn)return;
  var ico=btn.querySelector('.gm-command-module-icon');if(ico)ico.textContent=icon;
  var copy=btn.querySelector('.gm-command-module-copy');
  if(copy){
    var strong=copy.querySelector('strong');if(strong)strong.textContent=title;
    var small=copy.querySelector('small');
    if(!small){small=document.createElement('small');copy.appendChild(small);}
    small.className='gm-insulin-home-subtitle';small.textContent=subtitle;
  }
  btn.setAttribute('aria-label',title);btn.setAttribute('title',title);
}

function openInsulin(){
  try{if(typeof window.openGestationalDiabetesModule==='function')window.openGestationalDiabetesModule();}catch(e){}
  var tries=0,t=window.setInterval(function(){tries++;
    try{if(window.GestaMedDMGMaster&&typeof window.GestaMedDMGMaster.open==='function'){window.GestaMedDMGMaster.open('insulin');window.clearInterval(t);return;}}catch(e){}
    if(tries>=30)window.clearInterval(t);
  },70);
}
function openDmg(){try{if(typeof window.openGestationalDiabetesModule==='function')window.openGestationalDiabetesModule();}catch(e){}}

function bindInsulin(btn){
  if(!btn||btn.getAttribute('data-gm-insulin-direct-v243')==='1')return;
  btn.setAttribute('data-gm-insulin-direct-v243','1');
  btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();openInsulin();},true);
}
function bindDmg(btn){
  if(!btn||btn.getAttribute('data-gm-dmg-direct-v243')==='1')return;
  btn.setAttribute('data-gm-dmg-direct-v243','1');
  btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();openDmg();},true);
}

function createDmgCard(g){
  var btn=document.createElement('button');
  btn.type='button';btn.className='gm-command-module gm-card-pink';btn.setAttribute(DMG_ATTR,'1');
  btn.innerHTML='<span class="gm-command-module-icon">🩸</span><span class="gm-command-module-copy"><strong>Diabetes Gestacional</strong><small>Diagnóstico, rastreio e critérios</small></span><span class="gm-command-arrow">›</span>';
  bindDmg(btn);return btn;
}

function fix(){
  if(running)return false;running=true;
  try{
    var h=home(),g=grid();if(!h||!g)return false;
    var insulin=insulinCard();if(!insulin)return false;

    /* 1) Restaura definitivamente o card nativo da posição 2 como Cálculo de Insulina. */
    setCopy(insulin,'Cálculo de Insulina','Dose, NPH e esquema inicial','💉');
    insulin.classList.remove('gm-card-pink');
    insulin.classList.add('gm-card-blue','gm-insulin-home-card');
    bindInsulin(insulin);

    /* 2) Garante que Idade Gestacional + Cálculo de Insulina sejam os dois primeiros cards. */
    var idade=g.querySelector('[data-gm-module="idade"]');
    if(idade){
      if(g.firstElementChild!==idade)g.insertBefore(idade,g.firstElementChild);
      if(idade.nextElementSibling!==insulin)g.insertBefore(insulin,idade.nextSibling);
    }

    /* 3) Cria um card DMG independente. Nunca clona/substitui o card de insulina. */
    var dmg=dmgCard();
    if(!dmg){dmg=createDmgCard(g);g.appendChild(dmg);}else{setCopy(dmg,'Diabetes Gestacional','Diagnóstico, rastreio e critérios','🩸');bindDmg(dmg);}

    /* 4) Posiciona a dupla IIC + Diabetes Gestacional no final da grade clínica, antes das estatísticas. */
    var iic=iicCard();
    if(iic){
      g.appendChild(iic);
      g.appendChild(dmg);
    }

    h.setAttribute(HOME_ATTR,PATCH);
    return true;
  } finally {running=false;}
}

function style(){
  var id='gm-home-dmg-insulin-layout-v243-style';if(document.getElementById(id))return;
  var s=document.createElement('style');s.id=id;s.textContent=[
    /* neutraliza a regra antiga do v204 que escondia o texto nativo e escrevia Diabetes Gestacional via :before */
    '#gm-app-flow [data-screen="home"] [data-gm-module="insulina"] .gm-command-module-copy strong{font-size:13px!important;line-height:1.18!important;font-weight:800!important;}',
    '#gm-app-flow [data-screen="home"] [data-gm-module="insulina"] .gm-command-module-copy strong:before{content:none!important;display:none!important;}',
    '#gm-app-flow [data-screen="home"] [data-gm-module="insulina"] .gm-dmg-new-subtitle{display:none!important;}',
    '#gm-app-flow [data-screen="home"] .gm-insulin-home-subtitle,#gm-app-flow [data-screen="home"] ['+DMG_ATTR+'="1"] small{display:block!important;margin-top:3px;color:#40506c;font-size:9px;line-height:1.2;}',
    '#gm-app-flow [data-screen="home"] .gm-insulin-home-card .gm-command-module-icon{font-size:28px;}',
    '#gm-app-flow [data-screen="home"] ['+DMG_ATTR+'="1"] .gm-command-module-icon{font-size:28px;}'
  ].join('');document.head.appendChild(s);
}
function schedule(){[0,50,120,250,500,900,1500,2500].forEach(function(ms){window.setTimeout(fix,ms);});}
function init(){style();schedule();var f=document.getElementById('gm-app-flow');if(f)new MutationObserver(schedule).observe(f,{subtree:true,childList:true});document.addEventListener('click',function(e){var n=e.target.closest&&e.target.closest('[data-gm-nav="inicio"],[aria-label="Início"]');if(n)schedule();},true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',schedule,{once:true});
})();