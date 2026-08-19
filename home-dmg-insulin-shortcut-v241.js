(function(){
'use strict';
var PATCH='2026.08.19.242';
var ATTR='data-gm-dmg-home-layout-v242';
var SHORTCUT='data-gm-insulin-shortcut';
var running=false;
function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();}
function home(){return document.querySelector('#gm-app-flow [data-screen="home"]');}
function grid(){var h=home();return h&&h.querySelector('.gm-command-module-grid');}
function buttons(){var g=grid();return g?Array.prototype.slice.call(g.querySelectorAll(':scope > button, :scope > a, :scope > [role="button"]')):[];}
function byText(words){var wanted=words.map(norm);return buttons().find(function(el){var t=norm((el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'')+' '+(el.textContent||''));return wanted.every(function(w){return t.indexOf(w)!==-1;});})||null;}
function findAge(){return byText(['idade','gestacional']);}
function findDmg(){return buttons().find(function(el){if(el.hasAttribute(SHORTCUT))return false;var t=norm(el.textContent||'');return t.indexOf('diabetes')!==-1&&t.indexOf('gestacional')!==-1;})||null;}
function findIic(){return buttons().find(function(el){var t=norm(el.textContent||'');return (t.indexOf('iic')!==-1||t.indexOf('insuficiencia istmo')!==-1)&&t.indexOf('cerclagem')!==-1&&t.indexOf('progesterona')!==-1;})||null;}
function stripActionAttrs(el){Array.prototype.slice.call(el.attributes||[]).forEach(function(a){if(a.name.indexOf('data-gm-')===0||a.name==='onclick'||a.name==='id')el.removeAttribute(a.name);});el.setAttribute(SHORTCUT,'1');el.setAttribute('aria-label','Cálculo de Insulina');}
function rewriteShortcut(btn){var icon=btn.querySelector('.gm-command-module-icon')||btn.querySelector('[class*="icon"]');if(icon)icon.textContent='💉';var strong=btn.querySelector('strong');if(strong)strong.textContent='Cálculo de Insulina';var small=btn.querySelector('small');if(small)small.textContent='Dose, NPH e esquema inicial';if(!strong){btn.innerHTML='<span class="gm-command-module-icon">💉</span><span class="gm-command-module-copy"><strong>Cálculo de Insulina</strong><small>Dose, NPH e esquema inicial</small></span><span class="gm-command-arrow">›</span>';}}
function openInsulinFromDmg(dmg){if(!dmg)return;try{dmg.click();}catch(e){try{if(typeof window.openGestationalDiabetesModule==='function')window.openGestationalDiabetesModule();}catch(_){} }var tries=0;var timer=window.setInterval(function(){tries++;try{if(window.GestaMedDMGMaster&&typeof window.GestaMedDMGMaster.open==='function'){window.GestaMedDMGMaster.open('insulin');window.clearInterval(timer);return;}if(typeof window.openGestationalDiabetesModule==='function'&&tries===2)window.openGestationalDiabetesModule();}catch(e){}if(tries>=24)window.clearInterval(timer);},80);}
function ensureShortcut(dmg){var h=home(),g=grid();if(!h||!g||!dmg)return null;var shortcut=h.querySelector('['+SHORTCUT+'="1"]');if(!shortcut){shortcut=dmg.cloneNode(true);stripActionAttrs(shortcut);rewriteShortcut(shortcut);shortcut.classList.add('gm-insulin-shortcut-card');shortcut.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();openInsulinFromDmg(findDmg()||dmg);},true);}else{rewriteShortcut(shortcut);}return shortcut;}
function patch(){if(running)return false;running=true;try{var h=home(),g=grid();if(!h||!g)return false;var age=findAge(),dmg=findDmg(),iic=findIic();if(!age||!dmg||!iic)return false;var shortcut=ensureShortcut(dmg);if(!shortcut)return false;
    /* ORDEM EXATA SOLICITADA: Idade gestacional | Cálculo de Insulina */
    if(age.nextElementSibling!==shortcut)g.insertBefore(shortcut,age.nextSibling);
    /* Diabetes Gestacional deve ficar ao lado do IIC, logo após ele. */
    if(iic.nextElementSibling!==dmg)g.insertBefore(dmg,iic.nextSibling);
    h.setAttribute(ATTR,PATCH);return true;
  }finally{running=false;}}
function schedule(){[0,80,220,500,900,1500].forEach(function(ms){window.setTimeout(patch,ms);});}
function addStyle(){if(document.getElementById('gm-home-insulin-shortcut-v242-style'))return;var s=document.createElement('style');s.id='gm-home-insulin-shortcut-v242-style';s.textContent='[data-gm-insulin-shortcut="1"] .gm-command-module-icon{font-size:30px}[data-gm-insulin-shortcut="1"] strong{line-height:1.08}[data-gm-insulin-shortcut="1"] small{line-height:1.15}';document.head.appendChild(s);}
function init(){addStyle();schedule();var target=document.getElementById('gm-app-flow')||document.body;if(target){new MutationObserver(function(){schedule();}).observe(target,{subtree:true,childList:true,attributes:true,attributeFilter:['class','data-screen']});}document.addEventListener('click',function(e){var homeNav=e.target.closest&&e.target.closest('[data-gm-nav="inicio"], [aria-label="Início"]');if(homeNav)schedule();},true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',schedule,{once:true});
})();