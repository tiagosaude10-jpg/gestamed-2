(function(){
'use strict';
var STYLE_ID='gm-hdp-eclampsia-theory-v279-style';
var MODULE_CLICK_ID='eclampsia';
var CARD_ID='eclampsia';
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
  return '<div class="gm-hdp-theory" data-eclampsia-theory="1">'+
    card('gm-hdp-theory-what','📖','O que é a eclâmpsia',
      '<p>É a ocorrência de <b>convulsão</b> em gestante ou puérpera com síndrome hipertensiva, não explicada por outra causa neurológica. É considerada a manifestação mais grave do espectro da pré-eclâmpsia — uma emergência que exige proteção da paciente, estabilização, MgSO₄ e definição rápida da conduta.</p>'+
      '<p><b>MgSO₄ não substitui anti-hipertensivo:</b> os dois tratamentos são necessários em paralelo quando há hipertensão grave associada.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Iminência vs. eclâmpsia franca',
      '<ul>'+
      '<li><b>Iminência de eclâmpsia:</b> sintomas premonitórios como cefaleia intensa/refratária, alteração visual, epigastralgia importante ou hiper-reflexia, sem convulsão ainda instalada — já indicam início de MgSO₄ profilático conforme avaliação clínica.</li>'+
      '<li><b>Eclâmpsia franca:</b> convulsão já ocorreu. A partir daí, o foco é ABC, proteção, MgSO₄ terapêutico e controle da PA grave associada.</li>'+
      '</ul>'
    )+
    card('gm-hdp-theory-dx','🧪','Conduta imediata na convulsão',
      '<ul>'+
      '<li><b>Proteção contra trauma</b>, sem conter a paciente à força e sem introduzir objetos na boca.</li>'+
      '<li>Acionar ajuda, avaliar via aérea, respiração/SpO₂ e obter acesso venoso com aferição de PA.</li>'+
      '<li><b>Sulfato de magnésio — ataque (Zuspan):</b> 4 g IV lentamente em 15–20 minutos.</li>'+
      '<li><b>Manutenção (Zuspan):</b> 10 g diluídos em volume final de 500 mL, infundidos a 50 mL/h = 1 g/h (padrão do módulo; 0,5 ou 2 g/h exigem decisão clínica explícita).</li>'+
      '<li><b>Esquema Pritchard</b> (alternativa): 4 g IV + 10 g IM (5 g em cada glúteo), manutenção 5 g IM a cada 4 horas — evitar via IM se houver trombocitopenia/coagulopatia importante ou HELLP com risco hemorrágico.</li>'+
      '<li><b>Recorrência convulsiva:</b> bolus adicional de MgSO₄ 2 g IV; se persistir, reavaliar diagnósticos diferenciais neurológicos/metabólicos.</li>'+
      '</ul>'
    )+
    card('gm-hdp-theory-tx','💊','Monitorização, toxicidade e depois da crise',
      '<ul>'+
      '<li><b>Sinais de alerta para toxicidade pelo magnésio:</b> frequência respiratória &lt;16, diurese ≤25 mL/h, reflexo patelar diminuído/ausente, torpor ou coma.</li>'+
      '<li>Diante de toxicidade: <b>suspender o MgSO₄</b>, avaliar imediatamente e considerar gluconato de cálcio 10% — 10 mL IV quando clinicamente indicado, junto com suporte ABC.</li>'+
      '<li>Tratar a <b>hipertensão grave associada</b> em paralelo, usando o protocolo de crise hipertensiva.</li>'+
      '<li>A eclâmpsia indica <b>resolução da gestação após estabilização materna</b> — mas isso <b>não gera cesárea automática</b>: a via de parto depende das condições maternas, fetais, cervicais e da urgência do caso.</li>'+
      '</ul>'
    )+
    '<p class="gm-hdp-theory-ref">Conteúdo educacional baseado em diretrizes da FEBRASGO (Pré-eclâmpsia — Protocolos) e do Ministério da Saúde (Manual de Gestação de Alto Risco). Não substitui protocolo institucional, avaliação clínica individualizada nem julgamento profissional.</p>'+
  '</div>';
}
function insert(){
  addStyle();
  var r=root();if(!r)return false;
  var c=r.querySelector('.gm-hdp-e-module[data-hdp-emergency-module="'+CARD_ID+'"]');
  if(!c)return false;
  var wrap=c.querySelector('.gm-hdp-e-wrap');
  if(!wrap||wrap.querySelector('[data-eclampsia-theory]'))return false;
  var back=wrap.querySelector('.gm-hdp-e-back');
  var w=document.createElement('div');w.innerHTML=theoryHtml();
  var node=w.firstElementChild;
  if(back)wrap.insertBefore(node,back);else wrap.appendChild(node);
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
    r.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-hdp-module="'+MODULE_CLICK_ID+'"],[data-hdp-jump="'+MODULE_CLICK_ID+'"]'))setTimeout(insert,80);});
  })();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',insert,{once:true});
})();
