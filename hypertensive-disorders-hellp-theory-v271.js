(function(){
'use strict';
var STYLE_ID='gm-hdp-hellp-theory-v271-style';
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
  return '<div class="gm-hdp-theory" data-hellp-theory="1">'+
    card('gm-hdp-theory-what','📖','O que é a síndrome HELLP',
      '<p>HELLP é a sigla, em inglês, para <b>H</b>emolysis (hemólise), <b>EL</b>evated Liver enzymes (enzimas hepáticas elevadas) e <b>L</b>ow <b>P</b>latelets (plaquetopenia). É considerada uma forma grave dentro do espectro da pré-eclâmpsia, embora uma parte das gestantes possa apresentar o quadro com pressão arterial normal ou apenas levemente elevada.</p>'+
      '<p>Ocorre com mais frequência entre o final do 2º e o 3º trimestre, mas de 15% a 30% dos casos só são reconhecidos no <b>puerpério</b>, geralmente dentro das primeiras 48 horas após o parto — por isso a vigilância não termina com o nascimento.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Como é classificada',
      '<p>A síndrome é classificada de acordo com a presença dos três componentes da tríade:</p>'+
      '<ul><li><b>HELLP completa:</b> hemólise, enzimas hepáticas elevadas e plaquetopenia presentes ao mesmo tempo.</li><li><b>HELLP parcial (incompleta):</b> apenas um ou dois dos três componentes presentes. Mesmo incompleta, exige vigilância rigorosa, pois pode evoluir para a forma completa.</li></ul>'+
      '<p>A <b>classificação de Mississippi</b>, baseada na contagem de plaquetas, é usada para estratificar a gravidade:</p>'+
      '<ul><li><b>Classe 1:</b> plaquetas &lt;50.000/mm³ — maior risco hemorrágico.</li><li><b>Classe 2:</b> plaquetas entre 50.000 e 100.000/mm³.</li><li><b>Classe 3:</b> plaquetas entre 100.000 e 150.000/mm³.</li></ul>'
    )+
    card('gm-hdp-theory-dx','🧪','Como é feito o diagnóstico',
      '<p>O diagnóstico é laboratorial, apoiado no quadro clínico. Os critérios usados neste módulo são:</p>'+
      '<ul><li><b>Hemólise:</b> LDH ≥600 U/L e/ou bilirrubina indireta &gt;1,2 mg/dL e/ou esquizócitos no esfregaço de sangue periférico.</li><li><b>Enzimas hepáticas elevadas:</b> TGO/AST e/ou TGP/ALT ≥70 U/L.</li><li><b>Plaquetopenia:</b> contagem de plaquetas &lt;100.000/mm³.</li></ul>'+
      '<p>O sintoma mais frequente é <b>dor em hipocôndrio direito ou epigástrio</b>, presente em até 90% dos casos, por distensão da cápsula hepática. Náuseas, vômitos e mal-estar geral também são comuns e podem simular quadro gástrico ou viral. Cefaleia e alteração visual costumam acompanhar quando há pré-eclâmpsia associada, mas <b>a HELLP pode ocorrer com PA normal</b> — a suspeita clínica não deve depender só da pressão arterial.</p>'+
      '<p>Toda dor abdominal alta na gestação associada a plaquetopenia deve levantar a suspeita, mesmo sem hipertensão evidente.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Como é conduzida e tratada',
      '<ul>'+
      '<li><b>Estabilização materna primeiro:</b> internação hospitalar, ABC, controle da PA grave quando presente (protocolo de crise hipertensiva) e sulfato de magnésio para profilaxia/tratamento de convulsão, já que a HELLP integra o espectro da pré-eclâmpsia grave.</li>'+
      '<li><b>Avaliação hematológica:</b> coagulograma e reserva de hemocomponentes conforme a contagem de plaquetas e o risco de sangramento; transfusão de plaquetas é considerada em contagens muito baixas, sobretudo diante de sangramento ativo ou antes de procedimento cirúrgico, conforme protocolo institucional.</li>'+
      '<li><b>Corticoide antenatal:</b> indicado para maturação pulmonar fetal quando a idade gestacional é menor que 34 semanas — mas <b>não deve atrasar a resolução da gestação</b> quando ela já está indicada pela gravidade do quadro materno.</li>'+
      '<li><b>Resolução da gestação:</b> diferente da pré-eclâmpsia sem sinais de gravidade, a HELLP confirmada, de forma geral, <b>não é conduzida de forma expectante prolongada até 34 semanas</b>. A decisão de resolver a gestação considera a estabilização materna, mesmo em idades gestacionais mais precoces.</li>'+
      '<li><b>Via de parto:</b> continua sendo uma decisão obstétrica — a HELLP, isoladamente, não é indicação automática de cesariana.</li>'+
      '<li><b>Vigilância no puerpério:</b> o quadro pode iniciar, persistir ou até piorar transitoriamente nas primeiras 24–48 horas após o parto, com resolução progressiva geralmente a partir do 3º dia. Repetir os exames laboratoriais nesse período é essencial.</li>'+
      '</ul>'+
      '<p><b>Diagnósticos diferenciais</b> a considerar, sobretudo quando o quadro não evolui como esperado após o parto: púrpura trombocitopênica trombótica (PTT), síndrome hemolítico-urêmica (SHU) e esteatose hepática aguda da gestação (EHAG).</p>'
    )+
    '<p class="gm-hdp-theory-ref">Conteúdo educacional baseado em diretrizes da FEBRASGO (Pré-eclâmpsia — Protocolos) e do Ministério da Saúde (Manual de Gestação de Alto Risco). Não substitui protocolo institucional, avaliação clínica individualizada nem julgamento profissional.</p>'+
  '</div>';
}
function insert(){
  addStyle();
  var r=root();if(!r)return false;
  var d=r.querySelector('.gm-hdp-hs-wrap[data-hdp-hs-module="hellp"]');
  if(!d||d.querySelector('[data-hellp-theory]'))return false;
  var back=d.querySelector('.gm-hdp-hs-back');
  var wrap=document.createElement('div');
  wrap.innerHTML=theoryHtml();
  var node=wrap.firstElementChild;
  if(back)d.insertBefore(node,back);else d.appendChild(node);
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
    r.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-hdp-module="hellp"]'))setTimeout(insert,60);});
  })();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',insert,{once:true});
})();
