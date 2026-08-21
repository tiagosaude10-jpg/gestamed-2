(function(){
'use strict';
var PATCH_ID='2026.08.21.265';
var STYLE_ID='gm-hdp-delivery-postpartum-style-v265';
var api=null;

function v(path){try{var x=api.getValue(path);return x===undefined||x===null?'':x;}catch(e){return '';}}
function n(path){var x=parseFloat(String(v(path)).replace(',','.'));return isNaN(x)?null:x;}
function b(path){return !!v(path);}
function set(path,value,source){api.set(path,value,source||'delivery-postpartum-v265');}
function esc(x){return String(x===undefined||x===null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function severeBP(){var s=n('vitals.sbp'),d=n('vitals.dbp');return (s!==null&&s>=160)||(d!==null&&d>=110);}

function moduleId(){
  var c=document.querySelector('#gm-hdp-screen .gm-hdp-placeholder-card');
  if(!c)return '';
  var saved=c.getAttribute('data-hdp-f-module');
  if(saved)return saved;
  var t=(c.querySelector('h2')||{}).textContent||'';
  if(t==='Parto e Conduta por IG')return 'delivery';
  if(t==='Puerpério e Seguimento')return 'postpartum';
  return '';
}

function field(label,path,type,opts){
  opts=opts||[];var val=v(path);
  if(type==='select')return '<label class="gm-hdp-f-field"><span>'+label+'</span><select data-f-path="'+path+'"><option value="">Selecione</option>'+opts.map(function(o){return '<option value="'+esc(o)+'" '+(String(val)===String(o)?'selected':'')+'>'+esc(o)+'</option>';}).join('')+'</select></label>';
  if(type==='check')return '<label class="gm-hdp-f-check"><input type="checkbox" data-f-path="'+path+'" '+(val?'checked':'')+'><span>'+label+'</span></label>';
  return '<label class="gm-hdp-f-field"><span>'+label+'</span><input type="'+(type||'text')+'" data-f-path="'+path+'" value="'+esc(val)+'"></label>';
}
function card(title,body,sub){return '<section class="gm-hdp-f-card"><h3>'+title+'</h3>'+(sub?'<p class="gm-hdp-f-sub">'+sub+'</p>':'')+body+'</section>';}
function alert(level,title,text){return '<div class="gm-hdp-f-alert is-'+level+'"><strong>'+title+'</strong><p>'+text+'</p></div>';}
function grid(items){return '<div class="gm-hdp-f-grid">'+items.join('')+'</div>';}
function checks(items){return '<div class="gm-hdp-f-checks">'+items.join('')+'</div>';}
function diagnosis(){return String(v('assessment.diagnosis')||'').toLowerCase();}
function severity(){return String(v('assessment.severity')||'').toLowerCase();}
function hellp(){var d=diagnosis(),p=n('labs.platelets'),ldh=n('labs.ldh'),ast=n('labs.ast'),alt=n('labs.alt');return d.indexOf('hellp')>=0||((p!==null&&p<100000)&&(ldh!==null&&ldh>=600)&&((ast!==null&&ast>=70)||(alt!==null&&alt>=70)));}
function eclampsia(){return diagnosis().indexOf('eclâmpsia')>=0||diagnosis().indexOf('eclampsia')>=0||b('symptoms.seizure');}
function pe(){var d=diagnosis();return d.indexOf('pré-eclâmpsia')>=0||d.indexOf('pe sobreposta')>=0||d.indexOf('pre-eclampsia')>=0;}
function severePE(){return pe()&&(severity().indexOf('gravidade')>=0||severeBP()||eclampsia()||hellp());}
function fetalCritical(){return v('fetal.ctg')==='Patológica'||v('fetal.umbilicalDoppler')==='Fluxo reverso'||b('delivery.fetalDeterioration')||b('delivery.fetalDeath');}
function maternalNoWait(){return eclampsia()||hellp()||b('delivery.refractoryHypertension')||b('delivery.pulmonaryEdema')||b('delivery.stroke')||b('delivery.dic')||b('delivery.abruption')||b('delivery.progressiveRenal')||b('delivery.progressiveLiver')||b('delivery.instability');}

function deliveryDecision(){
  var w=n('patient.gestationalWeeks'),d=diagnosis();
  if(eclampsia())return {level:'red',title:'Resolução indicada após estabilização materna',text:'Eclâmpsia exige estabilização inicial, MgSO₄ e controle da PA grave. A via de parto permanece obstétrica; não gerar cesárea automática.'};
  if(hellp())return {level:'red',title:'Programar resolução da gestação',text:'HELLP confirmada não deve entrar em prolongamento expectante até 34 semanas. Estabilize a mãe, avalie hemoterapia/anestesia/feto e defina a via obstétrica.'};
  if(maternalNoWait()||fetalCritical())return {level:'red',title:'Há critério para não aguardar',text:'Deterioração materna ou fetal identificada. Priorizar estabilização e resolução conforme urgência obstétrica.'};
  if(severePE()){
    if(w!==null&&w>=34)return {level:'red',title:'Estabilizar e resolver',text:'Pré-eclâmpsia com sinais de gravidade em idade gestacional ≥34 semanas: não prolongar apenas para completar corticoide.'};
    if(w!==null&&w<34)return {level:'orange',title:'Expectante hospitalar pode ser considerada',text:'Somente se mãe e feto estiverem rigorosamente estáveis, sem HELLP/eclâmpsia/deterioração, em unidade adequada. Qualquer piora encerra a estratégia expectante.'};
  }
  if(pe()&&w!==null&&w>=37)return {level:'orange',title:'Programar resolução',text:'Pré-eclâmpsia sem sinais de gravidade a partir de 37 semanas: programar resolução, sem cesárea automática.'};
  if(pe()&&w!==null&&w<37)return {level:'green',title:'Vigilância/conduta expectante',text:'Se mãe e feto estáveis, manter vigilância estreita até o momento adequado ou surgimento de indicação de resolução.'};
  if(d.indexOf('hipertensão arterial crônica')>=0)return {level:'green',title:'Programação individualizada',text:'Na HAC, integrar controle pressórico, necessidade de medicação, lesão de órgão-alvo e condição fetal; não aplicar automaticamente a regra de 37 semanas da PE.'};
  if(d.indexOf('hipertensão gestacional')>=0)return {level:'green',title:'Programação própria da hipertensão gestacional',text:'Se controlada, sem PE e com mãe/feto estáveis, seguir programação obstétrica do protocolo. Reclassifique imediatamente se houver deterioração.'};
  return {level:'orange',title:'Dados insuficientes para decisão automática',text:'Preencha diagnóstico, idade gestacional, gravidade e condição materno-fetal.'};
}

function delivery(){
  var dec=deliveryDecision();
  var balance=(n('delivery.fluidsIn')||0)-(n('delivery.urineOut')||0)-(n('delivery.otherLosses')||0);
  return '<div class="gm-hdp-f-wrap">'+
    alert(dec.level,dec.title,dec.text)+
    card('Contexto atual',grid([field('Semanas','patient.gestationalWeeks','number'),field('Dias','patient.gestationalDays','number'),field('Diagnóstico','assessment.diagnosis','text'),field('Gravidade','assessment.severity','text'),field('PAS','vitals.sbp','number'),field('PAD','vitals.dbp','number')]))+
    card('Não posso esperar',checks([field('Hipertensão grave refratária','delivery.refractoryHypertension','check'),field('Edema pulmonar','delivery.pulmonaryEdema','check'),field('AVC/deterioração neurológica','delivery.stroke','check'),field('CIVD','delivery.dic','check'),field('DPP','delivery.abruption','check'),field('Insuficiência renal progressiva','delivery.progressiveRenal','check'),field('Deterioração hepática','delivery.progressiveLiver','check'),field('Instabilidade materna','delivery.instability','check'),field('Deterioração fetal','delivery.fetalDeterioration','check'),field('Óbito fetal','delivery.fetalDeath','check')]),'Eclâmpsia e HELLP são lidas automaticamente do estado clínico e também bloqueiam prolongamento expectante.')+
    card('Corticoide antenatal','<div class="gm-hdp-f-guidance"><strong>Betametasona</strong><span>12 mg IM, repetir 12 mg em 24 h</span><strong>Dexametasona — alternativa</strong><span>6 mg IM 12/12 h por 4 doses</span></div><p class="gm-hdp-f-note">Não atrasar parto materno-fetalmente indicado apenas para completar corticoterapia.</p>')+
    card('Via de parto',grid([field('Apresentação','delivery.presentation','select',['Cefálica','Pélvica','Transversa']),field('Bishop','delivery.bishop','number'),field('Cicatriz uterina','delivery.uterineScar','select',['Não','Sim']),field('Mãe estabilizada','delivery.maternalStable','select',['Sim','Não']),field('Feto estável','delivery.fetalStable','select',['Sim','Não']),field('Necessidade de nascimento muito rápido','delivery.urgentBirth','select',['Não','Sim'])])+'<p class="gm-hdp-f-note">PE/eclâmpsia/HELLP indicam avaliação de resolução conforme o quadro, mas não constituem cesárea automática. A via depende de apresentação, colo, cicatriz, vitalidade e urgência.</p>')+
    card('Balanço hídrico',grid([field('Entradas (mL)','delivery.fluidsIn','number'),field('Diurese (mL)','delivery.urineOut','number'),field('Outras perdas (mL)','delivery.otherLosses','number')])+'<div class="gm-hdp-f-balance"><small>Saldo calculado</small><strong>'+balance+' mL</strong></div><p class="gm-hdp-f-note">Em PE grave, evitar expansão volêmica indiscriminada e reavaliar saldo positivo relevante.</p>')+
    card('Segurança intraparto','<ul class="gm-hdp-f-list"><li>PA ≥160/110 persistente deve reabrir o protocolo de crise.</li><li>MgSO₄, quando indicado, não deve ser suspenso apenas por trabalho de parto ou cesárea.</li><li>Evitar metilergometrina/ergometrina em paciente hipertensa quando houver alternativa adequada.</li><li>Neuroproteção fetal e anticonvulsivante materno devem permanecer como indicações distintas.</li></ul>')+
    '<button type="button" class="gm-hdp-f-back" data-hdp-action="main">Voltar aos módulos</button></div>';
}

function dischargeReady(){
  var bp=!severeBP();
  var sym=!b('symptoms.headache')&&!b('symptoms.visual')&&!b('symptoms.dyspnea')&&!b('symptoms.ruqPain')&&!b('symptoms.epigastric');
  var labs=b('postpartum.labsStable');
  var plan=b('postpartum.medPlan')&&b('postpartum.warningSigns')&&b('postpartum.followUp')&&b('postpartum.bpAccess');
  return bp&&sym&&labs&&plan;
}

function postpartum(){
  var ready=dischargeReady(),days=n('patient.postpartumDays');
  var status=alert(severeBP()?'red':'orange',severeBP()?'Hipertensão grave no puerpério':'Puerpério hipertensivo — risco continua',severeBP()?'PA ≥160/110 mantém o mesmo gatilho de emergência do período gestacional. Abrir protocolo de crise.':'Pré-eclâmpsia/eclâmpsia podem surgir ou piorar após o parto; não desative alertas porque a gestação terminou.');
  if(eclampsia())status+=alert('red','Convulsão puerperal — tratar como eclâmpsia no contexto compatível','ABC, MgSO₄, controle de PA e investigação simultânea de causas neurológicas/metabólicas conforme o quadro.');
  var dischargeAlert=ready?alert('green','Critérios básicos preenchidos','A tela reconhece estabilidade mínima, mas a alta continua dependente da avaliação clínica completa e do contexto obstétrico.'):alert('orange','Alta não automatizada','Há critérios ainda não preenchidos ou sinais/sintomas que exigem reavaliação. Uma PA isolada normal não basta.');
  return '<div class="gm-hdp-f-wrap">'+status+
    card('Dados puerperais',grid([field('Puerpério','patient.postpartum','check'),field('Dias após o parto','patient.postpartumDays','number'),field('PAS','vitals.sbp','number'),field('PAD','vitals.dbp','number'),field('Amamentando','postpartum.breastfeeding','select',['Sim','Não'])]))+
    card('Sinais de alerta',checks([field('Cefaleia','symptoms.headache','check'),field('Alteração visual','symptoms.visual','check'),field('Dor HCD/epigástrio','symptoms.ruqPain','check'),field('Dispneia','symptoms.dyspnea','check'),field('Oligúria','symptoms.oliguria','check'),field('Convulsão','symptoms.seizure','check')]))+
    card('Laboratório / HELLP pós-parto',grid([field('Plaquetas','labs.platelets','number'),field('TGO/AST','labs.ast','number'),field('TGP/ALT','labs.alt','number'),field('LDH','labs.ldh','number'),field('Creatinina','labs.creatinine','number')])+'<p class="gm-hdp-f-note">HELLP pode persistir ou piorar inicialmente. Se não houver recuperação esperada, reconsiderar diagnósticos diferenciais como PTT/SHU/esteatose hepática aguda conforme contexto.</p>')+
    card('Anti-hipertensivos no puerpério','<div class="gm-hdp-f-guidance"><strong>Nifedipino de liberação prolongada</strong><span>Opção puerperal compatível com aleitamento; titular conforme PA e formulação.</span><strong>Enalapril / captopril</strong><span>Podem ser opções pós-parto; verificar creatinina e potássio antes de usar bloqueio do SRAA.</span><strong>Metildopa</strong><span>Pode ser mantida transitoriamente, mas reavaliar continuação prolongada e transição para esquema crônico mais apropriado.</span></div><p class="gm-hdp-f-note">Prescrições copiáveis e doses finais ficarão na camada de prescrições do próximo bloco.</p>')+
    card('Fatores que podem piorar PA',checks([field('AINE em uso','postpartum.nsaid','check'),field('Derivado ergotamínico','postpartum.ergot','check'),field('Bromocriptina/cabergolina','postpartum.dopamineAgonist','check')]),'Revisar medicamentos e contexto renal/volêmico quando a pressão estiver difícil de controlar.')+
    card('Avaliar alta',checks([field('Exames estáveis/em recuperação','postpartum.labsStable','check'),field('Plano medicamentoso definido','postpartum.medPlan','check'),field('Sinais de alarme orientados','postpartum.warningSigns','check'),field('Acesso a aferição de PA','postpartum.bpAccess','check'),field('Retorno programado','postpartum.followUp','check')])+dischargeAlert)+
    card('Monitorização domiciliar',grid([field('Meta/data do próximo controle','postpartum.nextBpDate','text'),field('Última PA domiciliar','postpartum.homeBp','text')])+'<p class="gm-hdp-f-note">PA ≥160/110 ou sintomas neurológicos, visuais, respiratórios ou convulsão exigem avaliação urgente. Hipertensão persistente por volta de 12 semanas deve ser reavaliada como possível HAC.</p>')+
    card('Seguimento de longo prazo','<ul class="gm-hdp-f-list"><li>Reavaliar PA e função renal.</li><li>Orientar risco cardiovascular futuro e controle de peso, atividade física, glicemia, lipídios e tabagismo.</li><li>Registrar antecedente de PE/eclâmpsia/HELLP/RCF para próxima gestação.</li><li>Consulta pré-concepcional e planejamento de prevenção em gestação futura.</li></ul><div class="gm-hdp-f-chip">'+(days!==null?'Puerpério D'+days:'Dias pós-parto não informados')+'</div>')+
    '<button type="button" class="gm-hdp-f-back" data-hdp-action="main">Voltar aos módulos</button></div>';
}

function render(force){
  var id=moduleId();if(!id)return;
  var c=document.querySelector('#gm-hdp-screen .gm-hdp-placeholder-card');if(!c)return;
  if(!force&&c.getAttribute('data-hdp-f-rendered')==='1')return;
  c.setAttribute('data-hdp-f-module',id);c.setAttribute('data-hdp-f-rendered','1');
  c.className='gm-hdp-placeholder-card gm-hdp-f-module';
  c.innerHTML=id==='delivery'?delivery():postpartum();bind(c);
}
function bind(root){root.querySelectorAll('[data-f-path]').forEach(function(el){el.addEventListener('change',function(){set(el.getAttribute('data-f-path'),el.type==='checkbox'?el.checked:el.value);render(true);});});var back=root.querySelector('[data-hdp-action="main"]');if(back)back.addEventListener('click',function(){var h=document.querySelector('#gm-hdp-screen .gm-hdp-back');if(h)h.click();});}
function ensureStyle(){if(document.getElementById(STYLE_ID))return;var s=document.createElement('style');s.id=STYLE_ID;s.textContent=['.gm-hdp-f-module{max-width:none!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;text-align:left!important}.gm-hdp-f-wrap{display:grid;gap:12px}.gm-hdp-f-card{padding:15px;border:1px solid #ead8df;border-radius:20px;background:#fff;box-shadow:0 8px 22px rgba(65,40,50,.06)}.gm-hdp-f-card h3{margin:0;color:#71223f;font-size:15px}.gm-hdp-f-sub,.gm-hdp-f-note{margin:5px 0 0;color:#667387;font-size:11px;line-height:1.48}.gm-hdp-f-grid,.gm-hdp-f-checks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:11px}.gm-hdp-f-field>span{display:block;margin-bottom:5px;color:#657186;font-size:10px;font-weight:800}.gm-hdp-f-field input,.gm-hdp-f-field select{box-sizing:border-box;width:100%;height:43px;padding:0 10px;border:1px solid #ead8df;border-radius:12px;background:#fff;color:#28354a}.gm-hdp-f-check{display:flex;align-items:center;gap:8px;min-height:40px;padding:7px 9px;border:1px solid #eee0e5;border-radius:12px;background:#fffafb;color:#4e5a6d;font-size:10px;font-weight:750}.gm-hdp-f-check input{width:17px;height:17px;accent-color:#c72f5d}.gm-hdp-f-alert{padding:13px 14px;border-radius:17px}.gm-hdp-f-alert strong{display:block;font-size:13px}.gm-hdp-f-alert p{margin:4px 0 0;font-size:11px;line-height:1.43}.gm-hdp-f-alert.is-red{background:#ffecee;color:#8d1734;border:1px solid #f2c5cc}.gm-hdp-f-alert.is-orange{background:#fff5e5;color:#825016;border:1px solid #efd5a5}.gm-hdp-f-alert.is-green{background:#edf8f1;color:#28613c;border:1px solid #cde7d4}.gm-hdp-f-guidance{display:grid;gap:4px;margin-top:10px}.gm-hdp-f-guidance strong{color:#6e2841;font-size:11px}.gm-hdp-f-guidance span{margin-bottom:6px;color:#5c687c;font-size:11px;line-height:1.42}.gm-hdp-f-list{margin:8px 0 0;padding-left:18px;color:#556176;font-size:11px;line-height:1.55}.gm-hdp-f-balance{margin-top:10px;padding:11px;border-radius:14px;background:#f7f3f5}.gm-hdp-f-balance small{display:block;color:#7b6170}.gm-hdp-f-balance strong{display:block;margin-top:2px;color:#6e2741;font-size:18px}.gm-hdp-f-chip{display:inline-block;margin-top:10px;padding:7px 10px;border-radius:999px;background:#f8eaf0;color:#7a2747;font-size:11px;font-weight:800}.gm-hdp-f-back{width:100%;min-height:47px;border:1px solid #ead1da;border-radius:15px;background:#fff;color:#a32952;font-weight:850}@media(max-width:420px){.gm-hdp-f-grid,.gm-hdp-f-checks{grid-template-columns:1fr 1fr}.gm-hdp-f-card{padding:13px}}'].join('');document.head.appendChild(s);}
function observe(){var root=document.getElementById('gm-hdp-screen');if(!root)return false;new MutationObserver(function(){window.requestAnimationFrame(function(){render(false);});}).observe(root,{childList:true,subtree:true});render(false);return true;}
function start(){api=window.GestaMedHDPState;if(!api){window.setTimeout(start,100);return;}if(!document.getElementById('gm-hdp-screen')){window.setTimeout(start,100);return;}ensureStyle();observe();document.documentElement.setAttribute('data-gm-hdp-delivery-postpartum',PATCH_ID);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
