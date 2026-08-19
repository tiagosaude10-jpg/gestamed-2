(function(){
'use strict';
var PATCH='2026.08.19.241';
var ATTR='data-gm-dmg-home-layout-v241';
var SHORTCUT='data-gm-insulin-shortcut';
var running=false;
function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();}
function allButtons(){return Array.prototype.slice.call(document.querySelectorAll('#gm-app-flow [data-screen="home"] button, #gm-app-flow [data-screen="home"] a, #gm-app-flow [data-screen="home"] [role="button"]'));}
function byText(words){var wanted=words.map(norm);return allButtons().find(function(el){var t=norm((el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'')+' '+(el.textContent||''));return wanted.every(function(w){return t.indexOf(w)!==-1;});})||null;}
function findDmg(){return byText(['diabetes','gestacional']);}
function findIic(){return allButtons().find(function(el){var t=norm(el.textContent||'');return (t.indexOf('iic')!==-1||t.indexOf('insuficiencia istmo')!==-1) && t.indexOf('cerclagem')!==-1 && t.indexOf('progesterona')!==-1;})||null;}
function home(){return document.querySelector('#gm-app-flow [data-screen="home"]');}
function stripActionAttrs(el){Array.prototype.slice.call(el.attributes||[]).forEach(function(a){if(a.name.indexOf('data-gm-')===0||a.name==='onclick'||a.name==='id')el.removeAttribute(a.name);});el.setAttribute(SHORTCUT,'1');el.setAttribute('aria-label','Cálculo de Insulina');}
function rewriteShortcut(btn){var icon=btn.querySelector('.gm-command-module-icon')||btn.querySelector('[class*="icon"]');if(icon)icon.textContent='💉';var strong=btn.querySelector('strong');if(strong)strong.textContent='Cálculo de Insulina';var small=btn.querySelector('small');if(small)small.textContent='Dose, NPH e esquema inicial';if(!strong){btn.innerHTML='<span class="gm-command-module-icon">💉</span><span class="gm-command-module-copy"><strong>Cálculo de Insulina</strong><small>Dose, NPH e esquema inicial</small></span><span class="gm-command-arrow">›</span>';}}
function openInsulinFromDmg(dmg){
  if(!dmg)return;
  try{dmg.click();}catch(e){try{if(typeof window.openGestationalDiabetesModule==='function')window.openGestationalDiabetesModule();}catch(_){} }
  var tries=0;
  var timer=window.setInterval(function(){tries++;try{if(window.GestaMedDMGMaster&&typeof window.GestaMedDMGMaster.open==='function'){window.GestaMedDMGMaster.open('insulin');window.clearInterval(timer);return;}if(typeof window.openGestationalDiabetesModule==='function'&&tries===2)window.openGestationalDiabetesModule();}catch(e){}if(tries>=20)window.clearInterval(timer);},80);
}
function patch(){
  if(running)return false;running=true;
  try{
    var h=home();if(!h)return false;
    var dmg=findDmg(),iic=findIic();if(!dmg||!iic)return false;
    var parent=dmg.parentElement;if(!parent||iic.parentElement!==parent)return false;
    var existing=h.querySelector('['+SHORTCUT+'="1"]');
    if(existing){
      if(iic.nextElementSibling!==dmg)parent.insertBefore(dmg,iic.nextSibling);
      h.setAttribute(ATTR,PATCH);return true;
    }
    var marker=document.createComment('gm-dmg-original-position-v241');
    parent.insertBefore(marker,dmg);
    var shortcut=dmg.cloneNode(true);
    stripActionAttrs(shortcut);rewriteShortcut(shortcut);
    shortcut.classList.add('gm-insulin-shortcut-card');
    marker.parentNode.insertBefore(shortcut,marker);marker.remove();
    parent.insertBefore(dmg,iic.nextSibling);
    shortcut.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();openInsulinFromDmg(dmg);},true);
    h.setAttribute(ATTR,PATCH);
    return true;
  } finally {running=false;}
}
function schedule(){[0,80,220,600,1200].forEach(function(ms){window.setTimeout(patch,ms);});}
function addStyle(){if(document.getElementById('gm-home-insulin-shortcut-v241-style'))return;var s=document.createElement('style');s.id='gm-home-insulin-shortcut-v241-style';s.textContent='[data-gm-insulin-shortcut="1"] .gm-command-module-icon{font-size:30px}[data-gm-insulin-shortcut="1"] strong{line-height:1.08}[data-gm-insulin-shortcut="1"] small{line-height:1.15}';document.head.appendChild(s);}
function init(){addStyle();schedule();var target=document.getElementById('gm-app-flow')||document.body;if(target){new MutationObserver(function(){schedule();}).observe(target,{subtree:true,childList:true,attributes:true,attributeFilter:['class','data-screen']});}document.addEventListener('click',function(e){var homeNav=e.target.closest&&e.target.closest('[data-gm-nav="home"], [data-screen="home"], [aria-label="Início"]');if(homeNav)schedule();},true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',schedule,{once:true});
})();