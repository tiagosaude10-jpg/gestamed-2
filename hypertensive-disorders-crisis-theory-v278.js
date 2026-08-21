(function(){
'use strict';
var STYLE_ID='gm-hdp-crisis-theory-v278-style';
var MODULE_CLICK_ID='hypertensive-crisis';
var CARD_ID='crisis';
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
  return '<div class="gm-hdp-theory" data-crisis-theory="1">'+
    card('gm-hdp-theory-what','📖','O que é a crise hipertensiva',
      '<p>É a elevação grave da pressão arterial (<b>PAS ≥160 mmHg e/ou PAD ≥110 mmHg</b>) durante a gestação ou puerpério, que exige <b>confirmação rápida e tratamento urgente</b> — independentemente de qual seja o diagnóstico de base (HAC, hipertensão gestacional, pré-eclâmpsia ou PE sobreposta).</p>'+
      '<p>O risco principal é cerebrovascular (hemorragia, encefalopatia hipertensiva) e cardíaco; por isso o foco imediato é baixar a PA grave com segurança, e só depois retomar a investigação completa do quadro.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Confirmar antes de tratar, mas sem demora',
      '<p>Diante de PA ≥160/110, o passo é <b>reavaliar rapidamente a persistência</b> — não é preciso esperar quatro horas de medições repetidas como em outros contextos de hipertensão. Se confirmada, o tratamento deve começar sem demora.</p>'+
      '<p>Depois de tratar a crise, <b>a investigação não termina</b>: é preciso definir se o quadro é HAC, hipertensão gestacional, pré-eclâmpsia, PE sobreposta ou doença puerperal, e avaliar a necessidade de MgSO₄ e o momento da resolução da gestação.</p>'
    )+
    card('gm-hdp-theory-dx','🧪','Opções de tratamento agudo',
      '<ul>'+
      '<li><b>Nifedipino oral:</b> 10 mg VO agora; reavaliar a PA em 20–30 minutos; repetir conforme protocolo, respeitando dose cumulativa máxima de <b>30 mg</b> no episódio. Não usar por via sublingual.</li>'+
      '<li><b>Hidralazina IV:</b> 5 mg IV lentamente (preparo: 1 mL da ampola 20 mg/mL + 19 mL de diluente = 1 mg/mL; 5 mL = 5 mg); reavaliar em cerca de 20 minutos; dose cumulativa máxima geralmente até <b>45 mg</b>, ou até <b>20 mg</b> no protocolo mais conservador usado em eclâmpsia.</li>'+
      '<li><b>Labetalol IV</b> (opção institucional): sequência 20 → 40 → 80 mg, até 220 mg; contraindicado/cauteloso em asma importante, FC &lt;60 ou bloqueio, e insuficiência cardíaca descompensada.</li>'+
      '</ul>'
    )+
    card('gm-hdp-theory-tx','💊','Depois de controlar a crise',
      '<ul>'+
      '<li>Reavaliar a PA pelo cronômetro estabelecido — o acompanhamento persiste mesmo se a paciente for transferida ou mudar de tela/setor.</li>'+
      '<li>Se a PA permanecer fora da faixa grave, <b>não registrar nova dose de resgate</b> sem nova indicação clínica.</li>'+
      '<li>Convulsão associada muda o quadro para <b>eclâmpsia</b> — abrir o protocolo específico de MgSO₄.</li>'+
      '<li>Definir a etiologia e o seguimento: a crise tratada não substitui a classificação correta da síndrome hipertensiva de base.</li>'+
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
  if(!wrap||wrap.querySelector('[data-crisis-theory]'))return false;
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
