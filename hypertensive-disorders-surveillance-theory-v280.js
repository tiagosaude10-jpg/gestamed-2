(function(){
'use strict';
var STYLE_ID='gm-hdp-surveillance-theory-v280-style';
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
  return '<div class="gm-hdp-theory" data-surveillance-theory="1">'+
    card('gm-hdp-theory-what','📖','Para que serve a vigilância materno-fetal',
      '<p>Nas síndromes hipertensivas, o quadro pode mudar de gravidade em poucos dias — por isso a vigilância não é um exame único, é um <b>acompanhamento contínuo</b> da mãe e do feto, com frequência ajustada ao risco de cada caso.</p>'+
      '<p>A frequência da vigilância depende do diagnóstico, da gravidade, da idade gestacional, do crescimento fetal e da estabilidade clínica — <b>não existe uma frequência única</b> para todas as síndromes.</p>'
    )+
    card('gm-hdp-theory-class','🔖','O que acompanhar do lado materno',
      '<p>PA, sintomas de alarme (cefaleia, alteração visual, epigastralgia, dispneia), plaquetas, função renal (creatinina) e função hepática (TGO/TGP). Em manejo expectante de pré-eclâmpsia grave, o ambiente precisa ser <b>hospitalar</b>.</p>'+
      '<p>Valorizar a <b>tendência</b> — não só o valor isolado do dia: piora progressiva de plaquetas, creatinina ou enzimas hepáticas pode anteceder uma descompensação clínica evidente.</p>'
    )+
    card('gm-hdp-theory-dx','🧪','O que acompanhar do lado fetal',
      '<ul>'+
      '<li><b>Crescimento e líquido amniótico:</b> peso fetal estimado, percentil e volume de líquido — PFE &lt;p10 sinaliza avaliar restrição de crescimento; &lt;p3 é achado de maior atenção.</li>'+
      '<li><b>Doppler:</b> artéria umbilical (normal / resistência aumentada / diástole ausente / fluxo reverso), ACM e relação cérebro-placentária (RCP). O ducto venoso é particularmente relevante em restrição de crescimento fetal precoce e grave — não é exame obrigatório para toda gestante hipertensa.</li>'+
      '<li><b>Cardiotocografia e movimentos fetais:</b> CTG tranquilizadora, suspeita ou patológica; redução de movimentos fetais referida pela paciente.</li>'+
      '</ul>'+
      '<p>Doppler crítico (fluxo reverso) ou CTG patológica indicam <b>avaliação obstétrica imediata</b>. Achados intermediários (resistência aumentada, diástole ausente, PFE &lt;p10) pedem vigilância fetal intensificada e individualizada.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Como montar o plano de vigilância',
      '<ul>'+
      '<li>Definir uma <b>frequência materna</b> (diária/internada, 2x/semana, semanal, quinzenal, mensal ou individualizada) e uma <b>frequência fetal</b> própria, conforme o diagnóstico e a gravidade.</li>'+
      '<li>Reavaliar o plano a cada mudança clínica ou laboratorial relevante — a vigilância acompanha a evolução do quadro, não é fixa desde o início.</li>'+
      '<li>Deterioração materna ou fetal identificada durante a vigilância deve levar à reavaliação imediata da conduta, incluindo a possibilidade de resolução da gestação.</li>'+
      '</ul>'
    )+
    '<p class="gm-hdp-theory-ref">Conteúdo educacional baseado em diretrizes da FEBRASGO (Pré-eclâmpsia — Protocolos) e do Ministério da Saúde (Manual de Gestação de Alto Risco). Não substitui protocolo institucional, avaliação clínica individualizada nem julgamento profissional.</p>'+
  '</div>';
}
function insert(){
  addStyle();
  var r=root();if(!r)return false;
  var d=r.querySelector('.gm-hdp-hs-wrap[data-hdp-hs-module="surveillance"]');
  if(!d||d.querySelector('[data-surveillance-theory]'))return false;
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
    r.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-hdp-module="surveillance"]'))setTimeout(insert,80);});
  })();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',insert,{once:true});
})();
