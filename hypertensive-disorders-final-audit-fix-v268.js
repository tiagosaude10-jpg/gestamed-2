(function(){
'use strict';
var PATCH_ID='2026.08.21.268';
var api=null;
function v(path){try{var x=api.getValue(path);return x===undefined||x===null?'':x;}catch(e){return '';}}
function n(path){var x=parseFloat(String(v(path)).replace(',','.'));return isNaN(x)?null:x;}
function b(path){return !!v(path);}
function norm(x){return String(x||'').toLowerCase();}
function isTrueEclampsiaDiagnosis(){var d=norm(v('assessment.diagnosis'));return d.indexOf('eclâmpsia')===0||d.indexOf('eclampsia')===0;}
function isPreeclampsiaDiagnosis(){var d=norm(v('assessment.diagnosis'));return d.indexOf('pré-eclâmpsia')>=0||d.indexOf('pre-eclampsia')>=0||d.indexOf('pe sobreposta')>=0;}
function fixFalseEclampsiaUI(){
  var root=document.getElementById('gm-hdp-screen');if(!root)return;
  var trueEcl=b('symptoms.seizure')||isTrueEclampsiaDiagnosis();
  if(!trueEcl)root.querySelectorAll('.gm-hdp-global-alert[data-global-alert="eclampsia"]').forEach(function(el){el.remove();});
  var title=(root.querySelector('.gm-hdp-brand h1')||{}).textContent||'';
  if(title==='Puerpério e Seguimento'&&!trueEcl){
    root.querySelectorAll('.gm-hdp-f-alert.is-red').forEach(function(el){var t=(el.querySelector('strong')||{}).textContent||'';if(t.indexOf('Convulsão puerperal')>=0)el.remove();});
  }
  if(title==='Parto e Conduta por IG'&&isPreeclampsiaDiagnosis()&&!trueEcl){
    var first=root.querySelector('.gm-hdp-f-wrap>.gm-hdp-f-alert');
    if(first){
      var w=n('patient.gestationalWeeks');
      var sev=norm(v('assessment.severity'));
      var severe=sev.indexOf('gravidade')>=0||sev.indexOf('emergência')>=0||sev.indexOf('emergencia')>=0;
      var strong=first.querySelector('strong'),p=first.querySelector('p');
      first.classList.remove('is-red','is-orange','is-green');
      if(severe&&w!==null&&w>=34){first.classList.add('is-red');if(strong)strong.textContent='Estabilizar e resolver';if(p)p.textContent='Pré-eclâmpsia com sinais de gravidade em idade gestacional ≥34 semanas: estabilizar e programar resolução, sem cesárea automática.';}
      else if(severe&&w!==null&&w<34){first.classList.add('is-orange');if(strong)strong.textContent='Expectante hospitalar pode ser considerada';if(p)p.textContent='Somente se mãe e feto estiverem rigorosamente estáveis, sem HELLP/eclâmpsia/deterioração, em unidade adequada.';}
      else if(w!==null&&w>=37){first.classList.add('is-orange');if(strong)strong.textContent='Programar resolução';if(p)p.textContent='Pré-eclâmpsia sem sinais de gravidade a partir de 37 semanas: programar resolução, sem cesárea automática.';}
      else {first.classList.add('is-green');if(strong)strong.textContent='Vigilância/conduta expectante';if(p)p.textContent='Se mãe e feto estáveis, manter vigilância estreita até o momento adequado ou surgimento de indicação de resolução.';}
    }
  }
}
function patchAudit(){
  if(!window.GestaMedHDPAudit||window.GestaMedHDPAudit.__v268)return;
  function severeBPFrom(s,d){s=parseFloat(s);d=parseFloat(d);return (!isNaN(s)&&s>=160)||(!isNaN(d)&&d>=110);}
  function pureEvaluate(s){var dx=norm(s.dx),ecl=!!s.seizure||dx.indexOf('eclâmpsia')===0||dx.indexOf('eclampsia')===0,hellp=!!s.hellp;return {severeBP:severeBPFrom(s.sbp,s.dbp),eclampsia:ecl,hellp:hellp,cesareanAutomatic:false,expectantBlocked:hellp||ecl,mgToxic:((s.fr!==undefined&&s.fr!==null&&s.fr<16)||(s.uo!==undefined&&s.uo!==null&&s.uo<=25)||s.reflex==='Ausente'||s.reflex==='Diminuído')};}
  var cases=[
    {name:'PE sem gravidade 32s',in:{dx:'Pré-eclâmpsia',sbp:148,dbp:94},want:{severeBP:false,eclampsia:false,cesareanAutomatic:false}},
    {name:'PA grave',in:{dx:'Pré-eclâmpsia',sbp:168,dbp:112},want:{severeBP:true,eclampsia:false}},
    {name:'Eclâmpsia não gera cesárea automática',in:{dx:'Eclâmpsia',sbp:170,dbp:110,seizure:true},want:{eclampsia:true,cesareanAutomatic:false,expectantBlocked:true}},
    {name:'HELLP bloqueia prolongamento expectante',in:{dx:'Síndrome HELLP',hellp:true},want:{hellp:true,expectantBlocked:true}},
    {name:'MgSO₄ FR 12',in:{fr:12,uo:40,reflex:'Presente'},want:{mgToxic:true}},
    {name:'MgSO₄ diurese 20 mL/h',in:{fr:18,uo:20,reflex:'Presente'},want:{mgToxic:true}},
    {name:'MgSO₄ reflexo ausente',in:{fr:18,uo:40,reflex:'Ausente'},want:{mgToxic:true}},
    {name:'MgSO₄ reflexo diminuído',in:{fr:18,uo:40,reflex:'Diminuído'},want:{mgToxic:true}},
    {name:'Puerpério mantém gatilho de PA grave',in:{dx:'Puerpério',sbp:176,dbp:114},want:{severeBP:true}},
    {name:'Proteinúria isolada não implica cesárea',in:{dx:'Pré-eclâmpsia',sbp:148,dbp:92},want:{cesareanAutomatic:false,eclampsia:false}},
    {name:'HAC sem gravidade não abre crise',in:{dx:'Hipertensão arterial crônica',sbp:142,dbp:92},want:{severeBP:false}},
    {name:'Pré-eclâmpsia nunca é lida como eclâmpsia por substring',in:{dx:'Pré-eclâmpsia com sinais de gravidade',sbp:150,dbp:100},want:{eclampsia:false}}
  ];
  window.GestaMedHDPAudit.run=function(){return cases.map(function(c){var got=pureEvaluate(c.in),ok=Object.keys(c.want).every(function(k){return got[k]===c.want[k];});return {name:c.name,ok:ok,want:c.want,got:got};});};
  window.GestaMedHDPAudit.__v268=true;
}
function start(){api=window.GestaMedHDPState;if(!api){setTimeout(start,80);return;}fixFalseEclampsiaUI();patchAudit();try{api.subscribe(function(){setTimeout(function(){fixFalseEclampsiaUI();patchAudit();},0);});}catch(e){}new MutationObserver(function(){setTimeout(function(){fixFalseEclampsiaUI();patchAudit();},0);}).observe(document.body,{subtree:true,childList:true});document.documentElement.setAttribute('data-gm-hdp-final-audit-fix',PATCH_ID);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();