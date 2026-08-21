(function(){
'use strict';
var STYLE_ID='gm-hdp-chronic-theory-v276-style';
var TARGET='chronic-hypertension';
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
    card('gm-hdp-theory-what','📖','O que é a hipertensão arterial crônica (HAC)',
      '<p>É a hipertensão que já existia <b>antes da gestação</b> ou que é identificada <b>antes de 20 semanas</b> — ou seja, não é induzida pela própria gravidez, embora a gestação exija reavaliação e, muitas vezes, ajuste do tratamento.</p>'+
      '<p>A gestante com HAC tem risco aumentado de desenvolver <b>pré-eclâmpsia sobreposta</b>, de restrição de crescimento fetal e de complicações relacionadas ao controle pressórico ao longo da gravidez — por isso o acompanhamento é mais frequente do que numa gestação sem hipertensão prévia.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Como reconhecer',
      '<ul>'+
      '<li>Hipertensão documentada <b>antes da gestação</b>, ou identificada <b>antes de 20 semanas</b> de idade gestacional.</li>'+
      '<li>Histórico de necessidade de anti-hipertensivo fora da gestação também reforça o diagnóstico.</li>'+
      '<li>Se a hipertensão só aparece depois de 20 semanas, o diagnóstico correto é <b>hipertensão gestacional</b> ou <b>pré-eclâmpsia</b>, não HAC.</li>'+
      '</ul>'
    )+
    card('gm-hdp-theory-dx','🧪','O que avaliar ao longo do pré-natal',
      '<p>Além da PA em cada consulta, vale registrar uma <b>avaliação basal</b> de função renal e proteinúria assim que possível — isso ajuda a identificar mudanças novas mais tarde, que podem indicar PE sobreposta.</p>'+
      '<p>Sinais de alerta para PE sobreposta incluem: piora pressórica desproporcional, nova proteinúria, disfunção orgânica nova (plaquetas, transaminases, creatinina), ou necessidade crescente de anti-hipertensivo.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Como é tratada',
      '<ul>'+
      '<li><b>Opções de manutenção</b> deste módulo: nifedipino de liberação prolongada, metildopa e labetalol, quando disponível e adequado ao caso.</li>'+
      '<li>PA ≥160/110 <b>não deve ser tratada apenas com ajuste lento da dose de manutenção</b> — abrir o protocolo de crise hipertensiva.</li>'+
      '<li>A decisão sobre o momento do parto é <b>individualizada</b>: integra controle pressórico, necessidade de medicação, presença de lesão de órgão-alvo e condição fetal. A regra das 37 semanas da pré-eclâmpsia <b>não se aplica automaticamente</b> à HAC isolada.</li>'+
      '<li>Se surgir PE sobreposta, a conduta passa a seguir os princípios de gravidade da pré-eclâmpsia (ver módulo "PE Sobreposta à HAC").</li>'+
      '</ul>'
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
