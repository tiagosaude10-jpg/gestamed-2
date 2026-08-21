(function(){
'use strict';
var STYLE_ID='gm-hdp-preeclampsia-theory-v274-style';
var TARGET='preeclampsia';
function root(){return document.getElementById('gm-hdp-screen');}
function addStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');s.id=STYLE_ID;
  s.textContent=[
    '#gm-hdp-screen .gm-hdp-theory{margin-top:14px;display:grid;gap:10px;}',
    '#gm-hdp-screen .gm-hdp-theory-card{border-radius:18px;overflow:hidden;box-shadow:0 5px 15px rgba(74,38,58,.05);}',
    '#gm-hdp-screen .gm-hdp-theory-card>header{display:flex;align-items:center;gap:9px;padding:12px 13px;font-weight:850;font-size:13.5px;}',
    '#gm-hdp-screen .gm-hdp-theory-card>header .ico{display:grid;place-items:center;flex:0 0 auto;width:34px;height:34px;border-radius:11px;background:rgba(255,255,255,.72);font-size:17px;}',
    '#gm-hdp-screen .gm-hdp-theory-card .body{padding:12px 14px;background:#fff;color:#374154;font-size:12.3px;line-height:1.58;}',
    '#gm-hdp-screen .gm-hdp-theory-card .body p{margin:0 0 9px;}',
    '#gm-hdp-screen .gm-hdp-theory-card .body p:last-child{margin-bottom:0;}',
    '#gm-hdp-screen .gm-hdp-theory-card .body ul{margin:0 0 9px;padding-left:18px;}',
    '#gm-hdp-screen .gm-hdp-theory-card .body ul:last-child{margin-bottom:0;}',
    '#gm-hdp-screen .gm-hdp-theory-card .body li{margin-bottom:5px;}',
    '#gm-hdp-screen .gm-hdp-theory-what{border:1px solid #d3e6f7;}#gm-hdp-screen .gm-hdp-theory-what>header{background:#eef6ff;color:#1c5f96;}',
    '#gm-hdp-screen .gm-hdp-theory-class{border:1px solid #e2d8f5;}#gm-hdp-screen .gm-hdp-theory-class>header{background:#f5f0ff;color:#5c3f96;}',
    '#gm-hdp-screen .gm-hdp-theory-dx{border:1px solid #f1dfae;}#gm-hdp-screen .gm-hdp-theory-dx>header{background:#fff6e6;color:#8a5a10;}',
    '#gm-hdp-screen .gm-hdp-theory-tx{border:1px solid #f3cfda;}#gm-hdp-screen .gm-hdp-theory-tx>header{background:#fdeef1;color:#93214a;}',
    '#gm-hdp-screen .gm-hdp-theory-ref{margin-top:2px;padding:10px 12px;border-radius:13px;background:#f7f5f2;color:#6c6357;font-size:10.3px;line-height:1.5;}',
    '@media(max-width:420px){#gm-hdp-screen .gm-hdp-theory-card .body{font-size:12px;}}'
  ].join('');
  document.head.appendChild(s);
}
function card(cls,icon,title,bodyHtml){
  return '<section class="gm-hdp-theory-card '+cls+'"><header><span class="ico">'+icon+'</span><span>'+title+'</span></header><div class="body">'+bodyHtml+'</div></section>';
}
function theoryHtml(){
  return '<div class="gm-hdp-theory" data-'+TARGET+'-theory="1">'+
    card('gm-hdp-theory-what','📖','O que é a pré-eclâmpsia',
      '<p>É uma síndrome multissistêmica específica da gestação, caracterizada por hipertensão que surge após 20 semanas associada a sinais de disfunção materna e/ou uteroplacentária. Está ligada a uma placentação anormal, com liberação de fatores que causam disfunção endotelial generalizada — por isso pode afetar rim, fígado, sistema nervoso, coagulação e a circulação placentária.</p>'+
      '<p>É a principal causa evitável de morbimortalidade materna e perinatal ligada às síndromes hipertensivas, o que torna o reconhecimento precoce essencial.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Como é classificada',
      '<ul>'+
      '<li><b>Sem sinais de gravidade:</b> hipertensão após 20 semanas com critério de PE presente, mas sem os achados de disfunção grave listados abaixo.</li>'+
      '<li><b>Com sinais de gravidade:</b> presença de PA ≥160/110, plaquetas &lt;100.000/mm³, disfunção hepática (TGO/TGP ≥70 ou dor persistente em HCD/epigástrio), disfunção renal, edema pulmonar/dispneia ou sintomas neurológicos (cefaleia refratária, alteração visual, convulsão).</li>'+
      '</ul>'+
      '<p>Essa distinção muda completamente a conduta: define se a gestação pode ser conduzida de forma expectante ou se caminha para resolução.</p>'
    )+
    card('gm-hdp-theory-dx','🧪','Como é feito o diagnóstico',
      '<p>Hipertensão (PAS ≥140 e/ou PAD ≥90) surgindo após 20 semanas, associada a <b>pelo menos um</b> destes:</p>'+
      '<ul><li><b>Proteinúria significativa:</b> relação proteína/creatinina urinária ≥0,3 ou proteinúria de 24h ≥300 mg.</li>'+
      '<li><b>Disfunção materna sem proteinúria:</b> plaquetopenia, elevação de transaminases, disfunção renal (creatinina ≥1,2 mg/dL), edema pulmonar, ou sintomas cerebrais/visuais novos.</li>'+
      '<li><b>Disfunção uteroplacentária:</b> Doppler de artéria umbilical alterado ou percentil fetal &lt;10.</li></ul>'+
      '<p><b>A ausência de proteinúria não exclui pré-eclâmpsia</b> quando há outro critério de disfunção presente.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Como é conduzida',
      '<ul>'+
      '<li><b>Com sinais de gravidade:</b> internação, monitorização estreita, controle da PA grave quando presente, sulfato de magnésio conforme indicação, e definição do momento da resolução da gestação — geralmente sem prolongamento até 37 semanas.</li>'+
      '<li><b>Sem sinais de gravidade:</b> se mãe e feto permanecerem estáveis, manter vigilância estreita (PA, sintomas, exames e avaliação fetal periódicos); a resolução é programada a partir de <b>37 semanas</b>.</li>'+
      '<li><b>Corticoide antenatal</b> quando indicado e a idade gestacional é menor que 34 semanas, sem atrasar o parto quando ele já está indicado.</li>'+
      '</ul>'+
      '<p><b>Princípios de segurança:</b> proteinúria elevada isoladamente não define gravidade; PA ≥160/110 persistente sempre exige o protocolo de crise hipertensiva; a pré-eclâmpsia, por si só, <b>não é indicação automática de cesariana</b> — a via de parto continua sendo uma decisão obstétrica.</p>'
    )+
    '<p class="gm-hdp-theory-ref">Conteúdo educacional baseado em diretrizes da FEBRASGO (Pré-eclâmpsia — Protocolos) e do Ministério da Saúde (Manual de Gestação de Alto Risco). Não substitui protocolo institucional, avaliação clínica individualizada nem julgamento profissional.</p>'+
  '</div>';
}
function insert(){
  addStyle();
  var r=root();if(!r)return false;
  var c=r.querySelector('.gm-hdp-c-module[data-hdp-clinical-module="'+TARGET+'"]');
  if(!c)return false;
  var body=c.querySelector('.gm-hdp-c-body');
  if(!body||body.querySelector('[data-'+TARGET+'-theory]'))return false;
  var wrap=document.createElement('div');
  wrap.innerHTML=theoryHtml();
  body.appendChild(wrap.firstElementChild);
  return true;
}
function init(){
  var tries=0;
  (function boot(){
    tries+=1;
    var r=root();
    if(!r){if(tries<200)setTimeout(boot,150);return;}
    insert();
    var obs=new MutationObserver(function(){insert();});
    obs.observe(r,{subtree:true,childList:true});
    r.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-hdp-module="'+TARGET+'"]'))setTimeout(insert,80);});
  })();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',insert,{once:true});
})();
