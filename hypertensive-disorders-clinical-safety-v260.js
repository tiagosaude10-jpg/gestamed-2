(function(){
'use strict';
var PATCH_ID='2026.08.20.260';
var api=null;
function val(p){var v=api&&api.getValue(p);return v===undefined||v===null?'':v;}
function num(p){var n=parseFloat(String(val(p)).replace(',','.'));return isNaN(n)?null:n;}
function yes(p){return !!val(p);}
function htn(){var s=num('vitals.sbp'),d=num('vitals.dbp');return (s!==null&&s>=140)||(d!==null&&d>=90);}
function severeBP(){var s=num('vitals.sbp'),d=num('vitals.dbp');return (s!==null&&s>=160)||(d!==null&&d>=110);}
function ga20(){var w=num('patient.gestationalWeeks');return w!==null&&w>=20;}
function protein(){var r=num('labs.proteinCreatinineRatio'),p=num('labs.protein24h');return (r!==null&&r>=0.3)||(p!==null&&p>=300);}
function platelets(){var p=num('labs.platelets');return p!==null&&p<100000;}
function liverLab(){var a=num('labs.ast'),b=num('labs.alt');return (a!==null&&a>=70)||(b!==null&&b>=70);}
function renalLab(){var c=num('labs.creatinine');return c!==null&&c>=1.2;}
function placental(){var d=val('fetal.umbilicalDoppler'),p=num('fetal.percentile');return ['Resistência aumentada','Diástole ausente','Fluxo reverso'].indexOf(d)>=0||(p!==null&&p<10);}
function chronic(){return yes('history.chronicHypertension')||yes('history.hypertensionBefore20Weeks');}
function hardOrgan(){return platelets()||liverLab()||renalLab()||yes('symptoms.seizure')||yes('symptoms.visual')||placental();}
function superHard(){return protein()||hardOrgan();}
function softWarning(){return yes('symptoms.headache')||yes('symptoms.epigastric')||yes('symptoms.ruqPain')||yes('symptoms.dyspnea')||yes('symptoms.oliguria')||yes('history.increasedAntihypertensiveNeed');}
function classify(){
  var r={diagnosis:'',severity:'',level:'green',reason:[]};
  if(yes('symptoms.seizure')){r.diagnosis='Eclâmpsia — suspeita clínica';r.severity='Emergência';r.level='red';r.reason=['Convulsão: estabilizar e avaliar eclâmpsia e diagnósticos diferenciais'];return r;}
  if(chronic()){
    if(ga20()&&superHard()){r.diagnosis='PE sobreposta à HAC — critérios compatíveis';r.level='red';r.reason=['HAC prévia + novo critério objetivo após 20 semanas'];}
    else if(ga20()&&softWarning()){r.diagnosis='HAC — suspeitar de PE sobreposta';r.level='orange';r.reason=['Há sinais/sintomas ou maior necessidade terapêutica que exigem investigação, sem fechar diagnóstico isoladamente'];}
    else{r.diagnosis='Hipertensão arterial crônica';r.level='orange';r.reason=['Hipertensão prévia ou identificada antes de 20 semanas'];}
  }else if(htn()&&ga20()){
    if(protein()||hardOrgan()){r.diagnosis='Pré-eclâmpsia — critérios compatíveis';r.level='red';r.reason=[protein()?'Hipertensão após 20 semanas + proteinúria significativa':'Hipertensão após 20 semanas + disfunção objetiva materna/uteroplacentária'];}
    else if(softWarning()){r.diagnosis='Hipertensão após 20 semanas — investigar PE';r.level='orange';r.reason=['Sintomas isolados são sinais de alerta, mas não devem fechar PE automaticamente sem avaliação clínica/objetiva'];}
    else{r.diagnosis='Hipertensão gestacional';r.level='orange';r.reason=['Hipertensão após 20 semanas sem critérios objetivos atuais de PE'];}
  }else if(htn()){r.diagnosis='Hipertensão em investigação';r.level='orange';r.reason=['PA elevada sem classificação definitiva'];}
  else{r.diagnosis='Sem síndrome hipertensiva classificada';r.reason=['Sem critério pressórico atual suficiente para classificação'];}
  if(r.diagnosis.indexOf('Pré-eclâmpsia')>=0||r.diagnosis.indexOf('PE sobreposta')>=0){
    var severe=severeBP()||platelets()||liverLab()||renalLab()||yes('symptoms.seizure')||yes('symptoms.visual')||yes('symptoms.dyspnea')||yes('symptoms.headache')||yes('symptoms.epigastric')||yes('symptoms.ruqPain')||yes('symptoms.oliguria');
    r.severity=severe?'Sinais de gravidade/alarme — confirmar clinicamente':'Sem sinais de gravidade identificados';
  }else if(severeBP())r.severity='Emergência hipertensiva';
  return r;
}
function saveConservative(){var r=classify();api.set('assessment.diagnosis',r.diagnosis,'clinical-safety-v260');api.set('assessment.severity',r.severity,'clinical-safety-v260');}
function fixLabels(root){
  root.querySelectorAll('.gm-hdp-c-check span').forEach(function(span){
    if(span.textContent==='Cefaleia')span.textContent='Cefaleia persistente/refratária';
    if(span.textContent==='Dispneia')span.textContent='Dispneia / suspeita de edema pulmonar';
    if(span.textContent==='Epigastralgia')span.textContent='Epigastralgia persistente/sem outra causa';
    if(span.textContent==='Dor em HCD')span.textContent='Dor HCD persistente/sem outra causa';
  });
}
function fixResult(root){
  var box=root.querySelector('.gm-hdp-c-result');if(!box)return;
  var r=classify(),h=box.querySelector('h2'),b=box.querySelector('b'),ul=box.querySelector('ul');
  box.classList.remove('is-green','is-orange','is-red');box.classList.add('is-'+r.level);
  if(h)h.textContent=r.diagnosis;
  if(b)b.textContent=r.severity;
  else if(r.severity&&h){b=document.createElement('b');b.textContent=r.severity;h.insertAdjacentElement('afterend',b);}
  if(ul)ul.innerHTML=r.reason.map(function(x){var li=document.createElement('li');li.textContent=x;return li.outerHTML;}).join('');
}
function fixSuperimposed(root){
  var title=(root.querySelector('.gm-hdp-brand h1')||{}).textContent||'';
  if(title!=='PE Sobreposta à HAC')return;
  var alert=root.querySelector('.gm-hdp-c-alert');if(!alert)return;
  if(chronic()&&ga20()&&!superHard()&&softWarning()){
    var strong=alert.querySelector('strong'),p=alert.querySelector('p');
    alert.classList.remove('is-red');alert.classList.add('is-orange');
    if(strong)strong.textContent='Suspeita de PE sobreposta — investigar';
    if(p)p.textContent='Piora pressórica, sintomas ou maior necessidade de anti-hipertensivo levantam suspeita, mas não fecham diagnóstico isoladamente.';
  }
}
function apply(){var root=document.getElementById('gm-hdp-screen');if(!root)return;fixLabels(root);fixResult(root);fixSuperimposed(root);}
function start(){api=window.GestaMedHDPState;if(!api){setTimeout(start,100);return;}var root=document.getElementById('gm-hdp-screen');if(!root){setTimeout(start,100);return;}var obs=new MutationObserver(function(){requestAnimationFrame(apply);});obs.observe(root,{childList:true,subtree:true});api.subscribe(function(){requestAnimationFrame(apply);});root.addEventListener('click',function(e){if(e.target&&e.target.matches('[data-c-classify]'))setTimeout(saveConservative,0);},true);apply();document.documentElement.setAttribute('data-gm-hdp-clinical-safety',PATCH_ID);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();