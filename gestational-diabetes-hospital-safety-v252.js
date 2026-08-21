(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
var STYLE_ID='gm-dmg-hospital-safety-v252-style';
function root(){return document.getElementById(ROOT_ID);}
function addStyle(){if(document.getElementById(STYLE_ID))return;var s=document.createElement('style');s.id=STYLE_ID;s.textContent=[
'#'+ROOT_ID+' .gm-hosp252{margin-top:14px;border:1px solid #efc8c8;border-radius:18px;overflow:hidden;background:#fff6f6;box-shadow:0 5px 15px rgba(74,38,58,.04)}',
'#'+ROOT_ID+' .gm-hosp252>header{display:flex;align-items:center;gap:10px;padding:12px 13px;background:#fff0f1;color:#b72c36}',
'#'+ROOT_ID+' .gm-hosp252>header .ico{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#fff;font-size:21px}',
'#'+ROOT_ID+' .gm-hosp252>header strong{display:block;font-size:15px}#'+ROOT_ID+' .gm-hosp252>header small{display:block;margin-top:2px;color:#667083;font-size:10.4px}',
'#'+ROOT_ID+' .gm-hosp252 .body{padding:13px 14px;background:#fff;color:#374154;font-size:12.2px;line-height:1.52}',
'#'+ROOT_ID+' .gm-hosp252-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px}',
'#'+ROOT_ID+' .gm-hosp252-grid article{padding:10px;border:1px solid #eee2e7;border-radius:13px;background:#fff}',
'#'+ROOT_ID+' .gm-hosp252-grid b{display:block;color:#b72c36;font-size:11.2px;margin-bottom:3px}',
'#'+ROOT_ID+' .gm-hosp252-grid span{font-size:10.5px;line-height:1.38;color:#4d5668}',
'#'+ROOT_ID+' .gm-hosp252-note{margin-top:9px;padding:10px 11px;border-radius:13px;background:#fff8e9;border:1px solid #efd6a7;color:#5b513f;font-size:10.8px;line-height:1.4}',
'@media(max-width:440px){#'+ROOT_ID+' .gm-hosp252-grid{grid-template-columns:1fr}}'
].join('');document.head.appendChild(s);}
function markup(){return '<section class="gm-hosp252" data-hosp252="1"><header><span class="ico">🚨</span><div><strong>CAD na gestação — pontos críticos de segurança</strong><small>Cetoacidose pode ocorrer com glicemia menos elevada</small></div></header><div class="body"><p>Na gestação, a suspeita de cetoacidose exige avaliação hospitalar imediata, incluindo cetonas, eletrólitos e equilíbrio ácido-base. A glicemia isolada não exclui CAD, pois pode ocorrer <b>CAD euglicêmica</b>.</p><div class="gm-hosp252-grid"><article><b>Após 24 semanas</b><span>Durante o tratamento da CAD, a SBD recomenda vigilância contínua do bem-estar fetal.</span></article><article><b>Prioridade inicial</b><span>Estabilização materna e correção da acidose, com manejo hospitalar protocolado.</span></article><article><b>Cesárea não é automática</b><span>A CAD, isoladamente, não deve levar a cesárea de emergência. Interromper a gestação apenas quando houver indicação materna/fetal específica.</span></article><article><b>Antes de operar, quando possível</b><span>Corrigir a acidose e estabilizar a paciente reduz risco materno-fetal e anestésico.</span></article></div><div class="gm-hosp252-note"><b>Importante:</b> este bloco orienta reconhecimento e segurança. Ele não substitui protocolo hospitalar de reposição volêmica, eletrólitos e insulinoterapia intravenosa.</div></div></section>';}
function insert(){addStyle();var r=root();if(!r)return false;var d=r.querySelector('.gm-dmg-new-detail[data-topic="hospital"]');if(!d||d.hidden||d.querySelector('[data-hosp252]'))return false;var page=d.querySelector('.gm-master-page');if(!page)return false;var theory=d.querySelector('.gm-hosp-theory');var w=document.createElement('div');w.innerHTML=markup();var node=w.firstElementChild;if(theory)page.insertBefore(node,theory);else{var ref=page.querySelector('.gm-master-ref');if(ref)page.insertBefore(node,ref);else page.appendChild(node);}return true;}
function init(){addStyle();var r=root();if(!r){setTimeout(init,150);return;}var obs=new MutationObserver(function(){setTimeout(insert,0);});obs.observe(r,{subtree:true,attributes:true,attributeFilter:['hidden','data-topic']});r.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-master-topic="hospital"]'))setTimeout(insert,0);});insert();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();window.addEventListener('load',insert,{once:true});
})();