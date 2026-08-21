(function(){
'use strict';
var PATCH_ID='2026.08.21.267';
var STYLE_ID='gm-hdp-global-safety-style-v267';
var api=null;

function v(path){try{var x=api.getValue(path);return x===undefined||x===null?'':x;}catch(e){return '';}}
function n(path){var x=parseFloat(String(v(path)).replace(',','.'));return isNaN(x)?null:x;}
function b(path){return !!v(path);}
function esc(x){return String(x===undefined||x===null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function lower(x){return String(x||'').toLowerCase();}
function severeBPFrom(s,d){s=parseFloat(s);d=parseFloat(d);return (!isNaN(s)&&s>=160)||(!isNaN(d)&&d>=110);}
function severeBP(){return severeBPFrom(n('vitals.sbp'),n('vitals.dbp'));}
function diagnosis(){return lower(v('assessment.diagnosis'));}
function currentHellp(){var p=n('labs.platelets'),ldh=n('labs.ldh'),ast=n('labs.ast'),alt=n('labs.alt');return diagnosis().indexOf('hellp')>=0||((p!==null&&p<100000)&&(ldh!==null&&ldh>=600)&&((ast!==null&&ast>=70)||(alt!==null&&alt>=70)));}
function currentEclampsia(){return b('symptoms.seizure')||diagnosis().indexOf('eclâmpsia')>=0||diagnosis().indexOf('eclampsia')>=0;}
function mgToxicity(){var fr=n('vitals.respRate'),uo=n('mgso4.urineOutput'),r=v('mgso4.reflex'),c=v('mgso4.consciousness');return (fr!==null&&fr<16)||(uo!==null&&uo<=25)||r==='Ausente'||r==='Diminuído'||c==='Torpor'||c==='Coma';}
function fetalCritical(){return v('fetal.ctg')==='Patológica'||v('fetal.umbilicalDoppler')==='Fluxo reverso'||b('delivery.fetalDeterioration');}
function postpartum(){return b('patient.postpartum');}

function alerts(){
  var out=[];
  if(mgToxicity())out.push({level:'red',code:'mg-tox',title:'Possível toxicidade/acúmulo de MgSO₄',text:'FR <16, reflexo reduzido/ausente, torpor/coma ou diurese ≤25 mL/h exige suspensão/reavaliação imediata do MgSO₄ e suporte conforme quadro.',target:'eclampsia'});
  if(currentEclampsia())out.push({level:'red',code:'eclampsia',title:postpartum()?'Convulsão no puerpério':'Convulsão / eclâmpsia',text:'Priorizar proteção, ABC, MgSO₄ e controle da hipertensão grave quando presente. A via de parto não é cesárea automática.',target:'eclampsia'});
  if(severeBP())out.push({level:'red',code:'severe-bp',title:(postpartum()?'PA grave no puerpério':'PA ≥160/110'),text:'Hipertensão grave exige confirmação rápida de persistência e tratamento urgente; metildopa não é opção de resgate agudo.',target:'hypertensive-crisis'});
  if(currentHellp())out.push({level:'red',code:'hellp',title:'HELLP compatível/registrada',text:'Não oferecer prolongamento expectante rotineiro. Estabilizar e programar resolução da gestação; via permanece obstétrica.',target:'hellp'});
  if(fetalCritical())out.push({level:'red',code:'fetal',title:'Deterioração fetal crítica',text:'CTG patológica ou Doppler umbilical com fluxo reverso exige avaliação obstétrica imediata e integração com idade gestacional/condição materna.',target:'surveillance'});
  var p=n('labs.platelets');if(p!==null&&p<100000&&!currentHellp())out.push({level:'orange',code:'platelets',title:'Plaquetas <100.000/mm³',text:'Característica de gravidade no contexto hipertensivo e componente LP da HELLP; avaliar tendência e demais marcadores.',target:'hellp'});
  var cr=n('labs.creatinine'),uo=n('mgso4.urineOutput');if((cr!==null&&cr>=1.2)||(uo!==null&&uo<=25))out.push({level:'orange',code:'renal-mg',title:'Risco renal durante MgSO₄',text:'Disfunção renal/oligúria aumenta risco de acúmulo. Reavaliar manutenção e monitorização; não reduzir automaticamente a dose de ataque.',target:'eclampsia'});
  return out;
}

function go(target){
  var root=document.getElementById('gm-hdp-screen');if(!root)return;
  var direct=root.querySelector('[data-hdp-module="'+target+'"],[data-hdp-jump="'+target+'"]');
  if(direct){direct.click();return;}
  var main=root.querySelector('[data-hdp-action="main"]');
  if(main){main.click();setTimeout(function(){var btn=document.querySelector('#gm-hdp-screen [data-hdp-module="'+target+'"],#gm-hdp-screen [data-hdp-jump="'+target+'"]');if(btn)btn.click();},30);}
}

function bannerMarkup(a){return '<div class="gm-hdp-global-alert is-'+a.level+'" data-global-alert="'+a.code+'"><div><strong>'+esc(a.title)+'</strong><span>'+esc(a.text)+'</span></div><button type="button" data-global-go="'+a.target+'">Abrir protocolo</button></div>';}
function refreshBanners(){
  var root=document.getElementById('gm-hdp-screen');if(!root||!root.classList.contains('gm-screen-active'))return;
  var content=root.querySelector('.gm-hdp-content');if(!content)return;
  var host=content.querySelector('.gm-hdp-global-alerts');
  var list=alerts().slice(0,3);
  if(!list.length){if(host)host.remove();return;}
  var sig=list.map(function(a){return a.code;}).join(',');
  if(host&&host.getAttribute('data-hdp-alerts-sig')===sig)return;
  if(!host){host=document.createElement('section');host.className='gm-hdp-global-alerts';content.insertBefore(host,content.firstChild);}
  host.setAttribute('data-hdp-alerts-sig',sig);
  host.innerHTML=list.map(bannerMarkup).join('');
  host.querySelectorAll('[data-global-go]').forEach(function(btn){btn.addEventListener('click',function(){go(btn.getAttribute('data-global-go'));});});
}

function pureEvaluate(s){
  var dx=lower(s.dx),hellp=!!s.hellp,ecl=!!s.seizure||dx.indexOf('ecl')>=0,sev=severeBPFrom(s.sbp,s.dbp);
  return {severeBP:sev,eclampsia:ecl,hellp:hellp,cesareanAutomatic:false,expectantBlocked:hellp||ecl,mgToxic:((s.fr!==undefined&&s.fr!==null&&s.fr<16)||(s.uo!==undefined&&s.uo!==null&&s.uo<=25)||s.reflex==='Ausente')};
}
function auditCases(){return [
  {name:'PE sem gravidade 32s',in:{dx:'Pré-eclâmpsia',sbp:148,dbp:94,hellp:false,seizure:false},want:{severeBP:false,eclampsia:false,hellp:false,cesareanAutomatic:false}},
  {name:'PA grave',in:{dx:'Pré-eclâmpsia',sbp:168,dbp:112},want:{severeBP:true}},
  {name:'Eclâmpsia não gera cesárea automática',in:{dx:'Eclâmpsia',sbp:170,dbp:110,seizure:true},want:{eclampsia:true,cesareanAutomatic:false,expectantBlocked:true}},
  {name:'HELLP bloqueia prolongamento expectante',in:{dx:'Síndrome HELLP',hellp:true},want:{hellp:true,expectantBlocked:true}},
  {name:'MgSO₄ FR 12',in:{fr:12,uo:40,reflex:'Presente'},want:{mgToxic:true}},
  {name:'MgSO₄ diurese 20 mL/h',in:{fr:18,uo:20,reflex:'Presente'},want:{mgToxic:true}},
  {name:'MgSO₄ reflexo ausente',in:{fr:18,uo:40,reflex:'Ausente'},want:{mgToxic:true}},
  {name:'Puerpério mantém gatilho de PA grave',in:{dx:'Puerpério',sbp:176,dbp:114},want:{severeBP:true}},
  {name:'Proteinúria isolada não implica cesárea',in:{dx:'Pré-eclâmpsia',sbp:148,dbp:92},want:{cesareanAutomatic:false}},
  {name:'HAC sem gravidade não abre crise',in:{dx:'Hipertensão arterial crônica',sbp:142,dbp:92},want:{severeBP:false}}
];}
function runAudit(){
  return auditCases().map(function(c){var got=pureEvaluate(c.in),ok=Object.keys(c.want).every(function(k){return got[k]===c.want[k];});return {name:c.name,ok:ok,want:c.want,got:got};});
}
function auditMarkup(){var r=runAudit(),pass=r.filter(function(x){return x.ok;}).length;return '<div class="gm-hdp-audit-modal" id="gm-hdp-audit-modal"><section class="gm-hdp-audit-panel" role="dialog" aria-modal="true"><header><div><small>Bloco H</small><h2>Auditoria de Segurança</h2><p>Testes lógicos do módulo hipertensivo.</p></div><button data-audit-close>×</button></header><div class="gm-hdp-audit-score"><strong>'+pass+'/'+r.length+'</strong><span>cenários aprovados</span></div><main>'+r.map(function(x){return '<article class="gm-hdp-audit-case '+(x.ok?'is-pass':'is-fail')+'"><b>'+(x.ok?'✓':'✕')+'</b><div><strong>'+esc(x.name)+'</strong><span>'+(x.ok?'Resultado coerente com as travas configuradas.':'Falha de coerência — revisar antes de uso clínico.')+'</span></div></article>';}).join('')+'</main><footer><button type="button" data-audit-rerun>Executar novamente</button><small>Auditoria lógica local; não substitui validação clínica institucional e testes de interface em dispositivo real.</small></footer></section></div>';}
function openAudit(){var old=document.getElementById('gm-hdp-audit-modal');if(old)old.remove();var w=document.createElement('div');w.innerHTML=auditMarkup();var m=w.firstChild;(document.getElementById('gm-app-flow')||document.body).appendChild(m);m.querySelector('[data-audit-close]').addEventListener('click',function(){m.remove();});m.addEventListener('click',function(e){if(e.target===m)m.remove();});m.querySelector('[data-audit-rerun]').addEventListener('click',function(){m.remove();openAudit();});}
function injectAuditButton(){
  var root=document.getElementById('gm-hdp-screen');if(!root)return;
  var content=root.querySelector('.gm-hdp-content');if(!content||content.querySelector('[data-hdp-audit-open]'))return;
  var btn=document.createElement('button');btn.type='button';btn.className='gm-hdp-audit-launch';btn.setAttribute('data-hdp-audit-open','1');btn.innerHTML='<span>🛡️</span><strong>Auditoria de segurança</strong><small>Testar travas e cenários clínicos</small>';
  var version=content.querySelector('.gm-hdp-version');if(version)content.insertBefore(btn,version);else content.appendChild(btn);
  btn.addEventListener('click',openAudit);
}
function ensureStyle(){if(document.getElementById(STYLE_ID))return;var s=document.createElement('style');s.id=STYLE_ID;s.textContent=[
'.gm-hdp-global-alerts{display:grid;gap:8px;margin-bottom:12px}.gm-hdp-global-alert{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:12px 13px;border-radius:16px;border:1px solid}.gm-hdp-global-alert div{display:grid;gap:3px}.gm-hdp-global-alert strong{font-size:12px}.gm-hdp-global-alert span{font-size:10px;line-height:1.42}.gm-hdp-global-alert button{border:0;border-radius:11px;padding:8px 10px;background:#fff;font-size:10px;font-weight:850;cursor:pointer}.gm-hdp-global-alert.is-red{background:#ffecee;border-color:#f1c0c9;color:#8d1734}.gm-hdp-global-alert.is-orange{background:#fff5e5;border-color:#efd6a7;color:#805017}',
'.gm-hdp-audit-launch{width:100%;display:grid;grid-template-columns:36px 1fr;grid-template-rows:auto auto;column-gap:10px;text-align:left;align-items:center;margin:14px 0;padding:13px;border:1px solid #d8e5dc;border-radius:18px;background:#f2faf5;color:#315e42;cursor:pointer}.gm-hdp-audit-launch>span{grid-row:1/3;font-size:24px}.gm-hdp-audit-launch strong{font-size:12px}.gm-hdp-audit-launch small{font-size:10px;color:#6c7a70}',
'.gm-hdp-audit-modal{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;padding:15px 10px;background:rgba(30,22,27,.5);backdrop-filter:blur(5px)}.gm-hdp-audit-panel{width:min(100%,620px);max-height:92vh;display:flex;flex-direction:column;border-radius:26px;background:#fff;overflow:hidden;box-shadow:0 28px 70px rgba(50,25,35,.3)}.gm-hdp-audit-panel header{display:flex;justify-content:space-between;gap:12px;padding:18px;border-bottom:1px solid #eee2e7}.gm-hdp-audit-panel header small{color:#b22653;font-weight:850}.gm-hdp-audit-panel h2{margin:3px 0;color:#72223f;font-size:20px}.gm-hdp-audit-panel header p{margin:0;color:#6d7788;font-size:11px}.gm-hdp-audit-panel header button{width:36px;height:36px;border:0;border-radius:50%;background:#f7e8ed;color:#a12550;font-size:23px}.gm-hdp-audit-score{display:flex;align-items:baseline;gap:8px;padding:14px 18px;background:#f6fbf7}.gm-hdp-audit-score strong{font-size:25px;color:#28633e}.gm-hdp-audit-score span{font-size:11px;color:#65766b}.gm-hdp-audit-panel main{display:grid;gap:8px;padding:14px 18px;overflow:auto}.gm-hdp-audit-case{display:flex;gap:10px;align-items:center;padding:10px;border-radius:13px}.gm-hdp-audit-case>b{width:27px;height:27px;display:grid;place-items:center;border-radius:50%}.gm-hdp-audit-case div{display:grid;gap:2px}.gm-hdp-audit-case strong{font-size:11px}.gm-hdp-audit-case span{font-size:9px;line-height:1.35}.gm-hdp-audit-case.is-pass{background:#edf8f1;color:#2f6342}.gm-hdp-audit-case.is-pass>b{background:#d9efdf}.gm-hdp-audit-case.is-fail{background:#ffecef;color:#8b203a}.gm-hdp-audit-case.is-fail>b{background:#f7ccd5}.gm-hdp-audit-panel footer{display:grid;gap:7px;padding:14px 18px calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid #eee2e7}.gm-hdp-audit-panel footer button{min-height:44px;border:0;border-radius:13px;background:#b92756;color:#fff;font-weight:850}.gm-hdp-audit-panel footer small{color:#7a8391;font-size:9px;line-height:1.4}',
'@media(max-width:480px){.gm-hdp-global-alert{grid-template-columns:1fr}.gm-hdp-global-alert button{width:100%}}'
].join('');document.head.appendChild(s);}
function sync(){injectAuditButton();refreshBanners();}
function start(){api=window.GestaMedHDPState;if(!api){setTimeout(start,80);return;}ensureStyle();sync();try{api.subscribe(function(){setTimeout(sync,0);});}catch(e){}new MutationObserver(function(){sync();}).observe(document.body,{subtree:true,childList:true});document.documentElement.setAttribute('data-gm-hdp-global-safety',PATCH_ID);window.GestaMedHDPAudit={run:runAudit,open:openAudit,alerts:alerts};}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
