(function(){
'use strict';

var PATCH_ID='2026.08.20.258';
var STORAGE_KEY='gestamed-hdp-clinical-state-v1';
var STYLE_ID='gm-hdp-state-style-v258';
var listeners=[];

function now(){return new Date().toISOString();}
function clone(value){return JSON.parse(JSON.stringify(value));}
function emptyState(){return {
  version:1,
  updatedAt:null,
  patient:{gestationalWeeks:'',gestationalDays:'',postpartum:false,postpartumDays:'',weightKg:''},
  vitals:{sbp:'',dbp:'',heartRate:'',respRate:'',spo2:'',temperature:''},
  symptoms:{headache:false,visual:false,epigastric:false,ruqPain:false,dyspnea:false,oliguria:false,seizure:false,bleeding:false,reducedFetalMovement:false},
  labs:{platelets:'',creatinine:'',ast:'',alt:'',ldh:'',bilirubin:'',proteinCreatinineRatio:'',protein24h:''},
  fetal:{fhr:'',estimatedWeight:'',percentile:'',fluid:'',umbilicalDoppler:'',mca:'',cpr:'',ductusVenosus:'',ctg:''},
  assessment:{diagnosis:'',severity:''},
  timestamps:{},
  history:[]
};}

function read(){
  try{
    var raw=sessionStorage.getItem(STORAGE_KEY);
    if(!raw)return emptyState();
    var parsed=JSON.parse(raw);
    return mergeDefaults(emptyState(),parsed);
  }catch(error){return emptyState();}
}
function mergeDefaults(base,incoming){
  Object.keys(base).forEach(function(key){
    if(incoming[key]===undefined||incoming[key]===null)incoming[key]=clone(base[key]);
    else if(base[key]&&typeof base[key]==='object'&&!Array.isArray(base[key])&&typeof incoming[key]==='object'&&!Array.isArray(incoming[key]))incoming[key]=mergeDefaults(base[key],incoming[key]);
  });
  return incoming;
}
var state=read();

function getPath(path){return path.split('.').reduce(function(obj,key){return obj&&obj[key]!==undefined?obj[key]:undefined;},state);}
function setPath(path,value,source){
  var parts=path.split('.'),cursor=state;
  parts.forEach(function(key,index){
    if(index===parts.length-1)cursor[key]=value;
    else{if(!cursor[key]||typeof cursor[key]!=='object')cursor[key]={};cursor=cursor[key];}
  });
  var stamp=now();
  state.updatedAt=stamp;
  state.timestamps[path]=stamp;
  state.history.unshift({at:stamp,path:path,value:value,source:source||'interface'});
  if(state.history.length>120)state.history.length=120;
  persist();
  notify(path,value);
}
function persist(){try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(error){}}
function notify(path,value){
  listeners.slice().forEach(function(fn){try{fn(clone(state),path,value);}catch(error){}});
  refreshVisible();
}
function subscribe(fn){if(typeof fn==='function'&&listeners.indexOf(fn)===-1)listeners.push(fn);return function(){listeners=listeners.filter(function(item){return item!==fn;});};}
function reset(){state=emptyState();persist();notify('reset',null);}

function formatTs(ts){if(!ts)return 'Sem atualização';try{return new Date(ts).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});}catch(error){return ts;}}
function igText(){
  if(state.patient.postpartum){return state.patient.postpartumDays!==''?'Puerpério D'+state.patient.postpartumDays:'Puerpério';}
  var w=state.patient.gestationalWeeks,d=state.patient.gestationalDays;
  if(w==='')return 'IG não informada';
  return w+'s'+(d!==''?d+'d':'');
}
function paText(){return state.vitals.sbp!==''&&state.vitals.dbp!==''?state.vitals.sbp+' × '+state.vitals.dbp+' mmHg':'PA não informada';}
function assessmentText(){return state.assessment.diagnosis||'Diagnóstico não definido';}
function severityText(){return state.assessment.severity||'Gravidade não definida';}
function esc(v){return String(v===undefined||v===null?'':v).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}

function summaryMarkup(compact){
  return '<div class="gm-hdp-state-summary '+(compact?'is-compact':'')+'">'+
    '<div class="gm-hdp-state-summary-head"><div><span>Dados clínicos compartilhados</span><strong>'+esc(assessmentText())+'</strong></div><button type="button" data-hdp-state-edit>Editar</button></div>'+
    '<div class="gm-hdp-state-chips"><span>'+esc(igText())+'</span><span>'+esc(paText())+'</span><span>'+esc(severityText())+'</span></div>'+
    '<small>Última atualização: '+esc(formatTs(state.updatedAt))+'</small>'+
  '</div>';
}

function refreshVisible(){
  var stamp=state.updatedAt||'';
  var main=document.querySelector('#gm-hdp-screen .gm-hdp-patient-card');
  if(main&&main.getAttribute('data-hdp-state-rendered')!==stamp){main.innerHTML=summaryMarkup(true);main.setAttribute('data-hdp-state-rendered',stamp);bindEdit(main);}
  document.querySelectorAll('#gm-hdp-screen .gm-hdp-state-slot').forEach(function(slot){
    if(slot.getAttribute('data-hdp-state-rendered')!==stamp){slot.innerHTML=summaryMarkup(false);slot.setAttribute('data-hdp-state-rendered',stamp);bindEdit(slot);}
  });
}
function bindEdit(root){var b=root.querySelector('[data-hdp-state-edit]');if(b)b.addEventListener('click',openEditor);}

function injectIntoModule(){
  var content=document.querySelector('#gm-hdp-screen .gm-hdp-placeholder-content');
  if(!content)return;
  var slot=content.querySelector('.gm-hdp-state-slot');
  if(!slot){slot=document.createElement('section');slot.className='gm-hdp-state-slot';content.insertBefore(slot,content.firstChild);}
  var stamp=state.updatedAt||'';
  if(slot.getAttribute('data-hdp-state-rendered')!==stamp){slot.innerHTML=summaryMarkup(false);slot.setAttribute('data-hdp-state-rendered',stamp);bindEdit(slot);}
}

function field(label,path,type,options){
  var value=getPath(path);options=options||{};
  if(type==='checkbox')return '<label class="gm-hdp-state-check"><input type="checkbox" data-state-path="'+path+'" '+(value?'checked':'')+'><span>'+label+'</span></label>';
  if(type==='select')return '<label><span>'+label+'</span><select data-state-path="'+path+'"><option value="">Selecione</option>'+options.map(function(o){return '<option value="'+esc(o)+'" '+(String(value)===String(o)?'selected':'')+'>'+esc(o)+'</option>';}).join('')+'</select></label>';
  return '<label><span>'+label+'</span><input data-state-path="'+path+'" type="'+(type||'text')+'" value="'+esc(value)+'" '+(options.placeholder?'placeholder="'+esc(options.placeholder)+'"':'')+'></label>';
}

function editorMarkup(){
  return '<div class="gm-hdp-state-modal" id="gm-hdp-state-modal"><section class="gm-hdp-state-card" role="dialog" aria-modal="true" aria-labelledby="gm-hdp-state-title">'+
    '<header><div><small>Bloco B</small><h2 id="gm-hdp-state-title">Dados clínicos compartilhados</h2><p>Estes dados ficam disponíveis para todos os 12 módulos durante esta sessão.</p></div><button type="button" data-state-close aria-label="Fechar">×</button></header>'+
    '<div class="gm-hdp-state-body">'+
      '<h3>Paciente</h3><div class="gm-hdp-state-grid">'+field('Semanas','patient.gestationalWeeks','number',{placeholder:'Ex.: 32'})+field('Dias','patient.gestationalDays','number',{placeholder:'0–6'})+field('Peso (kg)','patient.weightKg','number',{placeholder:'Ex.: 68'})+field('Puerpério','patient.postpartum','checkbox')+field('Dias pós-parto','patient.postpartumDays','number',{placeholder:'Ex.: 3'})+'</div>'+
      '<h3>Sinais vitais</h3><div class="gm-hdp-state-grid">'+field('PAS (mmHg)','vitals.sbp','number')+field('PAD (mmHg)','vitals.dbp','number')+field('FC','vitals.heartRate','number')+field('FR','vitals.respRate','number')+field('SpO₂ (%)','vitals.spo2','number')+'</div>'+
      '<h3>Avaliação atual</h3><div class="gm-hdp-state-grid">'+field('Diagnóstico','assessment.diagnosis','select',['Hipertensão gestacional','Hipertensão arterial crônica','Pré-eclâmpsia','PE sobreposta à HAC','Eclâmpsia','Síndrome HELLP'])+field('Gravidade','assessment.severity','select',['Sem sinais de gravidade','Com sinais de gravidade','Emergência hipertensiva','Em investigação'])+'</div>'+
      '<h3>Sintomas</h3><div class="gm-hdp-state-checks">'+field('Cefaleia','symptoms.headache','checkbox')+field('Alteração visual','symptoms.visual','checkbox')+field('Epigastralgia','symptoms.epigastric','checkbox')+field('Dor em HCD','symptoms.ruqPain','checkbox')+field('Dispneia','symptoms.dyspnea','checkbox')+field('Oligúria','symptoms.oliguria','checkbox')+field('Convulsão','symptoms.seizure','checkbox')+field('Sangramento','symptoms.bleeding','checkbox')+field('Movimentos fetais reduzidos','symptoms.reducedFetalMovement','checkbox')+'</div>'+
      '<h3>Laboratório</h3><div class="gm-hdp-state-grid">'+field('Plaquetas (/mm³)','labs.platelets','number')+field('Creatinina (mg/dL)','labs.creatinine','number')+field('TGO/AST','labs.ast','number')+field('TGP/ALT','labs.alt','number')+field('LDH','labs.ldh','number')+field('Bilirrubina','labs.bilirubin','number')+field('Relação P/C','labs.proteinCreatinineRatio','number')+field('Proteinúria 24h (mg)','labs.protein24h','number')+'</div>'+
      '<h3>Feto</h3><div class="gm-hdp-state-grid">'+field('BCF','fetal.fhr','number')+field('PFE (g)','fetal.estimatedWeight','number')+field('Percentil','fetal.percentile','number')+field('Líquido','fetal.fluid','select',['Normal','Reduzido','Oligodrâmnio','Polidrâmnio'])+field('Artéria umbilical','fetal.umbilicalDoppler','select',['Normal','Resistência aumentada','Diástole ausente','Fluxo reverso'])+field('ACM','fetal.mca','select',['Normal','Alterada','Não realizada'])+field('RCP','fetal.cpr','select',['Normal','Alterada','Não calculada'])+field('Ducto venoso','fetal.ductusVenosus','select',['Normal','Alterado','Não realizado'])+field('CTG','fetal.ctg','select',['Tranquilizadora','Suspeita','Patológica','Não realizada'])+'</div>'+
    '</div>'+
    '<footer><button type="button" class="gm-hdp-state-reset" data-state-reset>Limpar sessão clínica</button><button type="button" class="gm-hdp-state-save" data-state-save>Salvar dados</button></footer>'+
  '</section></div>';
}

function openEditor(){
  var old=document.getElementById('gm-hdp-state-modal');if(old)old.remove();
  var wrap=document.createElement('div');wrap.innerHTML=editorMarkup();var modal=wrap.firstChild;(document.getElementById('gm-app-flow')||document.body).appendChild(modal);
  modal.querySelectorAll('[data-state-path]').forEach(function(input){
    input.addEventListener('change',function(){var value=input.type==='checkbox'?input.checked:input.value;setPath(input.getAttribute('data-state-path'),value,'editor');});
  });
  function close(){modal.remove();refreshVisible();injectIntoModule();}
  modal.querySelector('[data-state-close]').addEventListener('click',close);
  modal.querySelector('[data-state-save]').addEventListener('click',close);
  modal.addEventListener('click',function(event){if(event.target===modal)close();});
  modal.querySelector('[data-state-reset]').addEventListener('click',function(){if(window.confirm('Limpar todos os dados clínicos desta sessão?')){reset();modal.remove();}});
}

function ensureStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');s.id=STYLE_ID;s.textContent=[
    '.gm-hdp-state-summary{padding:14px;border:1px solid rgba(190,45,91,.12);border-radius:20px;background:linear-gradient(135deg,#fff,#f3fbf5);box-shadow:0 8px 22px rgba(61,88,67,.07);}',
    '.gm-hdp-state-summary.is-compact{padding:0;border:0;background:transparent;box-shadow:none;}',
    '.gm-hdp-state-summary-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;}.gm-hdp-state-summary-head span{display:block;color:#9a4965;font-size:10px;font-weight:850;text-transform:uppercase;letter-spacing:.7px;}.gm-hdp-state-summary-head strong{display:block;margin-top:3px;color:#6f1738;font-size:15px;}.gm-hdp-state-summary-head button{border:1px solid rgba(183,35,80,.15);border-radius:12px;background:#fff;color:#b62455;padding:7px 10px;font-size:11px;font-weight:800;cursor:pointer;}',
    '.gm-hdp-state-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}.gm-hdp-state-chips span{padding:6px 9px;border-radius:999px;background:#f7edf1;color:#6d2941;font-size:11px;font-weight:750}.gm-hdp-state-summary>small{display:block;margin-top:8px;color:#758094;font-size:10px}.gm-hdp-state-slot{margin-bottom:12px}',
    '.gm-hdp-state-modal{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;padding:18px 10px;background:rgba(34,22,30,.48);backdrop-filter:blur(5px)}.gm-hdp-state-card{width:min(100%,620px);max-height:92vh;display:flex;flex-direction:column;border-radius:28px;background:#fff;box-shadow:0 28px 70px rgba(61,22,39,.28);overflow:hidden}.gm-hdp-state-card header{display:flex;justify-content:space-between;gap:12px;padding:20px 20px 14px;border-bottom:1px solid #f2dfe6}.gm-hdp-state-card header small{color:#c42a5b;font-weight:850;text-transform:uppercase}.gm-hdp-state-card header h2{margin:3px 0 4px;color:#731c3c;font-size:21px}.gm-hdp-state-card header p{margin:0;color:#687387;font-size:12px;line-height:1.35}.gm-hdp-state-card header button{flex:0 0 auto;width:38px;height:38px;border:0;border-radius:50%;background:#f8e9ee;color:#a42752;font-size:25px;cursor:pointer}',
    '.gm-hdp-state-body{padding:5px 18px 18px;overflow:auto}.gm-hdp-state-body h3{margin:18px 0 9px;color:#7f2846;font-size:13px;text-transform:uppercase;letter-spacing:.5px}.gm-hdp-state-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.gm-hdp-state-grid label:not(.gm-hdp-state-check){display:block}.gm-hdp-state-grid label>span{display:block;margin:0 0 5px;color:#59667a;font-size:11px;font-weight:750}.gm-hdp-state-grid input,.gm-hdp-state-grid select{box-sizing:border-box;width:100%;height:44px;padding:0 11px;border:1px solid #ead4dc;border-radius:12px;background:#fff;color:#283349;outline:none}.gm-hdp-state-grid input:focus,.gm-hdp-state-grid select:focus{border-color:#df658b;box-shadow:0 0 0 3px rgba(223,101,139,.1)}',
    '.gm-hdp-state-checks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.gm-hdp-state-check{display:flex!important;align-items:center;gap:8px;min-height:42px;padding:8px 10px;border:1px solid #eee0e5;border-radius:12px;background:#fffafb;color:#4c586c;font-size:11px;font-weight:700}.gm-hdp-state-check input{width:18px;height:18px;accent-color:#c52e5d}.gm-hdp-state-card footer{display:flex;gap:10px;padding:13px 18px calc(13px + env(safe-area-inset-bottom,0px));border-top:1px solid #f2dfe6;background:#fff}.gm-hdp-state-card footer button{min-height:46px;border-radius:14px;font-weight:800;cursor:pointer}.gm-hdp-state-reset{flex:1;border:1px solid #ead0da;background:#fff;color:#9b3658}.gm-hdp-state-save{flex:1.2;border:0;background:linear-gradient(105deg,#c9134f,#ef5c7e);color:#fff}',
    '@media(max-width:420px){.gm-hdp-state-grid,.gm-hdp-state-checks{grid-template-columns:1fr 1fr}.gm-hdp-state-modal{padding:7px 6px}.gm-hdp-state-card{max-height:96vh;border-radius:22px}}'
  ].join('');document.head.appendChild(s);
}

function observe(){
  var root=document.getElementById('gm-hdp-screen');if(!root)return false;
  var obs=new MutationObserver(function(){window.requestAnimationFrame(function(){refreshVisible();injectIntoModule();});});
  obs.observe(root,{childList:true,subtree:true});
  refreshVisible();injectIntoModule();
  return true;
}

window.GestaMedHDPState={
  get:function(){return clone(state);},
  getValue:function(path){return clone(getPath(path));},
  set:function(path,value,source){setPath(path,value,source||'api');},
  patch:function(values,source){Object.keys(values||{}).forEach(function(path){setPath(path,values[path],source||'api');});},
  reset:reset,
  subscribe:subscribe,
  openEditor:openEditor,
  storage:'sessionStorage',
  version:PATCH_ID
};

ensureStyle();
var tries=0;function start(){tries+=1;if(observe())return;if(tries<120)window.setTimeout(start,100);}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
document.documentElement.setAttribute('data-gm-hdp-state',PATCH_ID);
})();