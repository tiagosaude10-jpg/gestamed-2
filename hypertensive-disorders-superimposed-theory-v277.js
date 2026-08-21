(function(){
'use strict';
var STYLE_ID='gm-hdp-superimposed-theory-v277-style';
var TARGET='superimposed-preeclampsia';
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
    card('gm-hdp-theory-what','📖','O que é a PE sobreposta à HAC',
      '<p>É o surgimento de <b>pré-eclâmpsia em cima de uma hipertensão arterial crônica já existente</b>. É um diagnóstico mais difícil do que a pré-eclâmpsia "pura", porque a paciente já tem PA elevada e, muitas vezes, já tem alguma alteração renal de base — por isso o que importa aqui é identificar o que <b>mudou</b> em relação ao basal dela.</p>'+
      '<p>É uma das apresentações de maior risco dentro do espectro hipertensivo, e costuma exigir avaliação mais frequente do que a HAC isolada.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Critérios objetivos vs. sinais de alerta',
      '<ul>'+
      '<li><b>Critério objetivo</b> (reforça bastante o diagnóstico): nova proteinúria significativa, ou nova disfunção de órgão-alvo (plaquetopenia, elevação de transaminases, disfunção renal), surgindo após 20 semanas em quem já tinha HAC.</li>'+
      '<li><b>Sinais de alerta isolados</b> (levantam suspeita, mas não fecham diagnóstico sozinhos): piora pressórica desproporcional, sintomas como cefaleia/epigastralgia/dispneia, ou necessidade crescente de anti-hipertensivo.</li>'+
      '</ul>'+
      '<p>A diferença importa: critérios objetivos direcionam para conduta de pré-eclâmpsia com sinais de gravidade; sinais isolados pedem investigação adicional antes de fechar o diagnóstico.</p>'
    )+
    card('gm-hdp-theory-dx','🧪','Como é feito o diagnóstico',
      '<p>Comparar o <b>basal</b> (PA, função renal, proteinúria antes ou no início da gestação) com o <b>estado atual</b> é o ponto central. Nova proteinúria, disfunção orgânica nova, piora pressórica desproporcional ao esperado, ou insuficiência placentária surgindo após 20 semanas, em paciente com HAC prévia, reforçam o diagnóstico de PE sobreposta.</p>'+
      '<p>Avaliar também Doppler de artéria umbilical e percentil fetal, já que a insuficiência placentária é parte do quadro.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Como é conduzida',
      '<ul>'+
      '<li>Uma vez confirmada com critério objetivo, a conduta segue os <b>mesmos princípios de gravidade da pré-eclâmpsia</b>: monitorização estreita, controle da PA grave quando presente, e avaliação do momento da resolução da gestação.</li>'+
      '<li>Quando há apenas sinais de alerta isolados, sem critério objetivo, reforçar a investigação e reavaliar em intervalo curto, sem fechar o diagnóstico apenas por eles.</li>'+
      '<li><b>A magnitude da proteinúria não deve ser usada isoladamente</b> para definir gravidade ou o momento do parto.</li>'+
      '<li>PA ≥160/110 continua exigindo o protocolo de crise hipertensiva, independentemente da HAC de base.</li>'+
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
