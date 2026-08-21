(function(){
'use strict';
var STYLE_ID='gm-hdp-diagnosis-theory-v272-style';
var TARGET='diagnosis';
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
    '#gm-hdp-screen .gm-hdp-theory-card .body table{width:100%;border-collapse:separate;border-spacing:0;margin:0 0 9px;border:1px solid rgba(0,0,0,.08);border-radius:12px;overflow:hidden;}',
    '#gm-hdp-screen .gm-hdp-theory-card .body th,#gm-hdp-screen .gm-hdp-theory-card .body td{padding:7px 8px;text-align:left;font-size:11.3px;border-bottom:1px solid rgba(0,0,0,.06);}',
    '#gm-hdp-screen .gm-hdp-theory-card .body th{background:rgba(0,0,0,.035);}',
    '#gm-hdp-screen .gm-hdp-theory-card .body tr:last-child td{border-bottom:0;}',
    '#gm-hdp-screen .gm-hdp-theory-what{border:1px solid #d3e6f7;}#gm-hdp-screen .gm-hdp-theory-what>header{background:#eef6ff;color:#1c5f96;}',
    '#gm-hdp-screen .gm-hdp-theory-class{border:1px solid #e2d8f5;}#gm-hdp-screen .gm-hdp-theory-class>header{background:#f5f0ff;color:#5c3f96;}',
    '#gm-hdp-screen .gm-hdp-theory-dx{border:1px solid #f1dfae;}#gm-hdp-screen .gm-hdp-theory-dx>header{background:#fff6e6;color:#8a5a10;}',
    '#gm-hdp-screen .gm-hdp-theory-tx{border:1px solid #f3cfda;}#gm-hdp-screen .gm-hdp-theory-tx>header{background:#fdeef1;color:#93214a;}',
    '#gm-hdp-screen .gm-hdp-theory-ref{margin-top:2px;padding:10px 12px;border-radius:13px;background:#f7f5f2;color:#6c6357;font-size:10.3px;line-height:1.5;}',
    '@media(max-width:420px){#gm-hdp-screen .gm-hdp-theory-card .body{font-size:12px;}#gm-hdp-screen .gm-hdp-theory-card .body th,#gm-hdp-screen .gm-hdp-theory-card .body td{font-size:10.6px;}}'
  ].join('');
  document.head.appendChild(s);
}
function card(cls,icon,title,bodyHtml){
  return '<section class="gm-hdp-theory-card '+cls+'"><header><span class="ico">'+icon+'</span><span>'+title+'</span></header><div class="body">'+bodyHtml+'</div></section>';
}
function theoryHtml(){
  return '<div class="gm-hdp-theory" data-'+TARGET+'-theory="1">'+
    card('gm-hdp-theory-what','📖','O que são as síndromes hipertensivas da gestação',
      '<p>É um grupo de condições que têm em comum a elevação da pressão arterial durante a gravidez, mas que <b>não são a mesma doença</b> — cada uma tem origem, risco e conduta diferentes. Classificar corretamente logo no início é o que direciona toda a vigilância e o tratamento daqui em diante.</p>'+
      '<p>O ponto de partida é sempre o mesmo: confirmar a hipertensão (PAS ≥140 mmHg e/ou PAD ≥90 mmHg) e, a partir daí, verificar <b>quando</b> ela apareceu e <b>o que mais</b> está presente além da pressão alta.</p>'
    )+
    card('gm-hdp-theory-class','🔖','Como se classificam',
      '<table><thead><tr><th>Categoria</th><th>Quando aparece</th><th>O que mais tem</th></tr></thead><tbody>'+
      '<tr><td><b>HAC</b> (crônica)</td><td>Antes da gestação ou antes de 20 semanas</td><td>Hipertensão isolada, sem proteinúria/disfunção nova</td></tr>'+
      '<tr><td><b>Hipertensão gestacional</b></td><td>Após 20 semanas</td><td>Sem proteinúria e sem disfunção de órgão-alvo</td></tr>'+
      '<tr><td><b>Pré-eclâmpsia</b></td><td>Após 20 semanas</td><td>Com proteinúria significativa <b>ou</b> disfunção materna/uteroplacentária</td></tr>'+
      '<tr><td><b>PE sobreposta à HAC</b></td><td>Após 20 semanas, em quem já tinha HAC</td><td>Novo critério objetivo de PE surge sobre a hipertensão prévia</td></tr>'+
      '<tr><td><b>Eclâmpsia</b></td><td>Qualquer momento do espectro</td><td>Convulsão em contexto hipertensivo/gestacional</td></tr>'+
      '</tbody></table>'+
      '<p>A <b>síndrome HELLP</b> é considerada uma forma grave dentro desse mesmo espectro (ver módulo próprio), e pode ocorrer mesmo com PA normal ou pouco elevada.</p>'
    )+
    card('gm-hdp-theory-dx','🧪','Como é feito o diagnóstico',
      '<p>A hipertensão é confirmada com <b>PAS ≥140 mmHg e/ou PAD ≥90 mmHg</b>. A crise hipertensiva (PA ≥160/110) exige confirmação rápida e tratamento urgente, sem esperar reavaliações repetidas.</p>'+
      '<p>A <b>proteinúria significativa</b> é definida por relação proteína/creatinina urinária ≥0,3 ou proteinúria de 24 horas ≥300 mg. Sua ausência <b>não exclui</b> pré-eclâmpsia, quando há outros critérios de disfunção presentes.</p>'+
      '<p>Os principais sinais de <b>disfunção materna</b> a investigar são: cefaleia persistente, alteração visual, epigastralgia ou dor em hipocôndrio direito, dispneia, oligúria, plaquetas &lt;100.000/mm³, creatinina ≥1,2 mg/dL e transaminases (TGO/TGP) ≥70 U/L. Do lado fetal, contam Doppler de artéria umbilical alterado e percentil fetal &lt;10.</p>'
    )+
    card('gm-hdp-theory-tx','💊','Como a classificação orienta a conduta',
      '<ul>'+
      '<li>A classificação <b>não é definitiva</b> — deve ser revista a cada consulta, porque uma síndrome pode evoluir para outra (ex.: hipertensão gestacional progredindo para pré-eclâmpsia).</li>'+
      '<li>Cada categoria tem seu próprio módulo neste aplicativo com a conduta detalhada — use este módulo para <b>classificar</b> e depois abra o módulo específico correspondente.</li>'+
      '<li>PA ≥160/110 sempre abre o protocolo de <b>crise hipertensiva</b>, independentemente de qual seja o diagnóstico de base.</li>'+
      '<li>Convulsão sempre é tratada como <b>eclâmpsia</b> até prova em contrário, mesmo antes de fechar o restante da investigação.</li>'+
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
