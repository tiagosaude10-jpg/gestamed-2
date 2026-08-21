(function(){
'use strict';
var STYLE_ID='gm-hdp-evaluation-theory-v273-style';
var TARGET='evaluation';
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
    card('gm-hdp-theory-what','📖','Para que serve a avaliação inicial',
      '<p>Diante de qualquer elevação da pressão arterial na gestação, o primeiro passo não é só medir a PA: é investigar de forma sistemática se já existe <b>disfunção materna ou fetal</b> associada. É essa avaliação que diferencia hipertensão gestacional isolada de pré-eclâmpsia, e que identifica sinais de gravidade que mudam a conduta imediatamente.</p>'+
      '<p>Diante de PA grave (≥160/110) ou convulsão, a <b>estabilização tem prioridade</b> sobre completar toda a investigação — trate primeiro, investigue em paralelo.</p>'
    )+
    card('gm-hdp-theory-class','🔖','O que avaliar e por quê',
      '<ul>'+
      '<li><b>Sinais vitais completos:</b> PAS/PAD, frequência cardíaca, frequência respiratória, SpO₂ e temperatura — não avalie a PA isoladamente.</li>'+
      '<li><b>Sintomas de alarme:</b> cefaleia, alteração visual, epigastralgia, dor em hipocôndrio direito, dispneia, oligúria, convulsão, sangramento e redução de movimentos fetais.</li>'+
      '<li><b>Exames maternos:</b> plaquetas, creatinina, TGO/AST, TGP/ALT, LDH, bilirrubinas e proteinúria (relação P/C ou 24 horas).</li>'+
      '<li><b>Avaliação fetal:</b> BCF, peso fetal estimado, percentil, líquido amniótico, Doppler de artéria umbilical e cardiotocografia.</li>'+
      '</ul>'
    )+
    card('gm-hdp-theory-dx','🧪','Como interpretar os achados',
      '<p>Nenhum exame isolado fecha o diagnóstico — o conjunto é que direciona a classificação. Alguns pontos de corte usados neste módulo:</p>'+
      '<ul><li>Plaquetas &lt;100.000/mm³ e TGO/TGP ≥70 U/L são critérios de disfunção materna relevantes.</li>'+
      '<li>Se houver suspeita de HELLP, valorize especialmente LDH, bilirrubinas, esfregaço de sangue periférico (esquizócitos) e coagulação, conforme o quadro clínico.</li>'+
      '<li>No feto, Doppler com resistência aumentada, diástole ausente ou fluxo reverso, e percentil &lt;10, sinalizam possível insuficiência placentária.</li></ul>'
    )+
    card('gm-hdp-theory-tx','💊','O que fazer com o resultado',
      '<ul>'+
      '<li>Use os achados para <b>classificar</b> a síndrome hipertensiva no módulo de Diagnóstico e, a partir daí, seguir a conduta do módulo específico correspondente.</li>'+
      '<li>PA ≥160/110 abre imediatamente o protocolo de <b>crise hipertensiva</b>, independente do restante da investigação estar completo.</li>'+
      '<li>Convulsão é tratada como <b>eclâmpsia</b> desde o primeiro momento.</li>'+
      '<li>Achados de disfunção materna/fetal em paciente ainda sem diagnóstico definido reforçam a suspeita de pré-eclâmpsia, mesmo com proteinúria ausente ou PA apenas moderadamente elevada.</li>'+
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
