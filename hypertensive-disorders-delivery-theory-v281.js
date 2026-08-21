(function(){
'use strict';
var STYLE_ID='gm-hdp-delivery-theory-v281-style';
var TARGET='delivery';
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
    card('gm-hdp-theory-what','📖','Como se decide o momento do parto',
      '<p>Nas síndromes hipertensivas, a decisão de <b>quando</b> resolver a gestação pesa o risco materno de continuar grávida contra o risco fetal/neonatal de nascer antes do tempo. Não existe uma regra única: o diagnóstico, a gravidade, a idade gestacional e a estabilidade materna e fetal juntos definem o momento.</p>'+
      '<p>A <b>via de parto é uma decisão obstétrica</b>, separada da decisão de "quando" — a síndrome hipertensiva por si só não é indicação automática de cesariana.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Momento por diagnóstico',
      '<ul>'+
      '<li><b>Pré-eclâmpsia com sinais de gravidade, ≥34 semanas:</b> resolução da gestação após estabilização materna.</li>'+
      '<li><b>Pré-eclâmpsia com sinais de gravidade, &lt;34 semanas:</b> considerar conduta expectante em ambiente <b>hospitalar rigoroso</b>, com corticoide para maturação pulmonar, apenas se mãe e feto permanecerem estáveis — qualquer sinal de deterioração muda a conduta para resolução.</li>'+
      '<li><b>Pré-eclâmpsia sem sinais de gravidade:</b> programar em torno de 37 semanas, mantendo vigilância até lá.</li>'+
      '<li><b>Hipertensão arterial crônica:</b> momento individualizado, conforme controle pressórico, lesão de órgão-alvo e condição fetal — não segue a regra das 37 semanas da pré-eclâmpsia.</li>'+
      '<li><b>Hipertensão gestacional:</b> programação própria, reavaliando continuamente se o quadro evolui para pré-eclâmpsia.</li>'+
      '</ul>'
    )+
    card('gm-hdp-theory-dx','🧪','Quando "não dá para esperar"',
      '<p>Independentemente da idade gestacional, alguns achados indicam que a gestação precisa ser resolvida sem demora:</p>'+
      '<ul>'+
      '<li>Hipertensão grave refratária ao tratamento;</li>'+
      '<li>Edema agudo de pulmão;</li>'+
      '<li>Acidente vascular cerebral;</li>'+
      '<li>Coagulação intravascular disseminada (CIVD);</li>'+
      '<li>Descolamento prematuro de placenta (DPP);</li>'+
      '<li>Insuficiência renal ou hepática progressiva;</li>'+
      '<li>Instabilidade materna franca, ou deterioração/óbito fetal.</li>'+
      '</ul>'+
      '<p>Diante de qualquer um desses achados, a conduta expectante é interrompida e a resolução passa a ser prioridade.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Segurança durante o trabalho de parto e o parto',
      '<ul>'+
      '<li>Corticoide para maturação pulmonar quando indicado pela idade gestacional, sem que isso atrase a resolução em caso de instabilidade materna.</li>'+
      '<li>PA ≥160/110 durante o trabalho de parto ou no intraparto <b>reabre o protocolo de crise hipertensiva</b> — tratar antes de prosseguir.</li>'+
      '<li>Se a paciente já está em uso de <b>sulfato de magnésio</b>, ele <b>não deve ser interrompido</b> por causa do trabalho de parto ou da cesariana, salvo indicação clínica específica.</li>'+
      '<li>Evitar <b>ergometrina/derivados do ergot</b> na dequitação de pacientes hipertensas, pelo risco de elevar ainda mais a PA — preferir uterotônicos sem esse efeito.</li>'+
      '</ul>'
    )+
    '<p class="gm-hdp-theory-ref">Conteúdo educacional baseado em diretrizes da FEBRASGO (Pré-eclâmpsia — Protocolos) e do Ministério da Saúde (Manual de Gestação de Alto Risco). Não substitui protocolo institucional, avaliação clínica individualizada nem julgamento profissional.</p>'+
  '</div>';
}
function insert(){
  addStyle();
  var r=root();if(!r)return false;
  var c=r.querySelector('.gm-hdp-f-module[data-hdp-f-module="'+TARGET+'"]');
  if(!c)return false;
  var wrap=c.querySelector('.gm-hdp-f-wrap');
  if(!wrap||wrap.querySelector('[data-'+TARGET+'-theory]'))return false;
  var back=wrap.querySelector('.gm-hdp-f-back');
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
    r.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-hdp-module="'+TARGET+'"]'))setTimeout(insert,80);});
  })();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',insert,{once:true});
})();
