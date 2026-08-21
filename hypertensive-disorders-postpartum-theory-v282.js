(function(){
'use strict';
var STYLE_ID='gm-hdp-postpartum-theory-v282-style';
var TARGET='postpartum';
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
    card('gm-hdp-theory-what','📖','Por que o risco não termina no parto',
      '<p>O nascimento do bebê não encerra o risco da síndrome hipertensiva. A pré-eclâmpsia pode <b>surgir pela primeira vez</b> no puerpério, e um quadro que já existia pode <b>piorar</b> nos primeiros dias após o parto — por isso a vigilância continua ativa mesmo com a gestação resolvida.</p>'+
      '<p>A maior parte dos casos de eclâmpsia pós-parto ocorre <b>na primeira semana</b>, o que reforça a necessidade de orientação clara à paciente antes da alta.</p>'
    )+
    card('gm-hdp-theory-class','🔖','O que continua valendo no puerpério',
      '<ul>'+
      '<li><b>PA ≥160/110 no puerpério</b> aciona o mesmo protocolo de crise hipertensiva usado na gestação — não é "menos grave" só por já ter nascido o bebê.</li>'+
      '<li>Sintomas de alarme (cefaleia intensa, alteração visual, epigastralgia, dispneia) devem ser ativamente questionados, não apenas aguardados.</li>'+
      '<li>Se a paciente já usou sulfato de magnésio, a atenção aos sinais de toxicidade continua nas horas seguintes à suspensão.</li>'+
      '</ul>'
    )+
    card('gm-hdp-theory-dx','🧪','Reavaliação laboratorial e diagnósticos diferenciais',
      '<p>Em quem teve HELLP ou pré-eclâmpsia grave, plaquetas, TGO/TGP e função renal costumam ser <b>repetidos no pós-parto</b> — em muitos casos há piora transitória nas primeiras 24–48 horas antes de começar a melhorar.</p>'+
      '<p>Se a plaquetopenia, a hemólise ou a disfunção renal <b>não evoluem como esperado</b>, vale considerar diagnósticos diferenciais como <b>PTT</b> (púrpura trombocitopênica trombótica), <b>SHU</b> (síndrome hemolítico-urêmica) e <b>esteatose hepática aguda da gestação (EHAG)</b>, que podem mimetizar HELLP mas exigem condutas distintas.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Anti-hipertensivos, amamentação e alta',
      '<ul>'+
      '<li><b>Compatíveis com amamentação</b>, entre as opções mais usadas: nifedipino de liberação prolongada, metildopa (uso mais transitório no puerpério) e, quando indicado, enalapril/captopril — com atenção à função renal e ao potássio na paciente e acompanhamento do lactente.</li>'+
      '<li>A necessidade de anti-hipertensivo pode <b>diminuir gradualmente</b> nas semanas seguintes ao parto, mas isso deve ser reavaliado, não presumido.</li>'+
      '<li><b>Critérios para considerar a alta segura:</b> PA fora da faixa grave, ausência de sintomas de alarme, exames laboratoriais estáveis, e confirmação de que a paciente tem plano de medicação, orientação sobre sinais de alarme, consulta de retorno agendada e acesso para aferir a PA em casa.</li>'+
      '<li>Antes da alta, orientar sobre o <b>risco cardiovascular a longo prazo</b> associado à pré-eclâmpsia, reforçando a importância do acompanhamento clínico continuado após o puerpério.</li>'+
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
