(function(){
'use strict';
var STYLE_ID='gm-hdp-gestational-theory-v275-style';
var TARGET='gestational-hypertension';
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
    card('gm-hdp-theory-what','📖','O que é a hipertensão gestacional',
      '<p>É a hipertensão que surge <b>pela primeira vez após 20 semanas</b> de gestação, <b>sem</b> os critérios de pré-eclâmpsia (sem proteinúria significativa e sem sinais de disfunção materna ou uteroplacentária no momento do diagnóstico).</p>'+
      '<p>É um diagnóstico <b>evolutivo</b>: uma parte relevante das gestantes com hipertensão gestacional acaba desenvolvendo pré-eclâmpsia ao longo da gravidez — por isso o acompanhamento não termina no diagnóstico inicial, ele apenas começa ali.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Diferença para as outras categorias',
      '<ul>'+
      '<li><b>Vs. HAC:</b> na hipertensão gestacional a PA elevada só aparece depois de 20 semanas; na HAC, já existia antes da gestação ou antes de 20 semanas.</li>'+
      '<li><b>Vs. pré-eclâmpsia:</b> na hipertensão gestacional não há proteinúria significativa nem disfunção materna/fetal associada. Assim que qualquer um desses critérios aparecer, o diagnóstico deve ser <b>reclassificado</b> para pré-eclâmpsia.</li>'+
      '</ul>'
    )+
    card('gm-hdp-theory-dx','🧪','Como é feito o diagnóstico e o rastreamento',
      '<p>PAS ≥140 mmHg e/ou PAD ≥90 mmHg, confirmadas após 20 semanas, na ausência de proteinúria significativa (relação P/C ≥0,3 ou proteinúria de 24h ≥300 mg) e sem sinais de disfunção de órgão-alvo.</p>'+
      '<p>O rastreamento de progressão para pré-eclâmpsia deve incluir, a cada retorno: PA, proteinúria, plaquetas, creatinina, transaminases e percentil fetal, além de perguntar ativamente por cefaleia, alteração visual, dispneia e epigastralgia.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Como é conduzida',
      '<ul>'+
      '<li><b>Excluir pré-eclâmpsia a cada deterioração</b> clínica ou laboratorial — não assumir que a paciente "só tem hipertensão gestacional" sem reavaliar.</li>'+
      '<li><b>PA ≥160/110 persistente não é ajuste ambulatorial:</b> abrir o protocolo de crise hipertensiva.</li>'+
      '<li>A vigilância materno-fetal deve ser <b>individualizada</b> conforme o controle pressórico e a evolução clínica.</li>'+
      '<li>Diferente da pré-eclâmpsia sem sinais de gravidade, a hipertensão gestacional controlada, sem critérios de PE e com mãe/feto estáveis, segue sua <b>própria programação obstétrica</b> — não se aplica automaticamente a regra dos 37 semanas da pré-eclâmpsia.</li>'+
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
