(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
function root(){return document.getElementById(ROOT_ID);}
function num(id){var e=document.getElementById(id);if(!e)return null;var s=String(e.value||'').trim().replace(',','.');if(s==='')return null;var x=Number(s);return Number.isFinite(x)?x:null;}
function alertHtml(title,text,kind){return '<aside class="gm-master-alert '+(kind||'warn')+'"><b>'+title+'</b><span>'+text+'</span></aside>';}
function insulinButton(){return '<button class="gm-master-secondary" data-open-insulin-safe>Calcular insulina</button>';}
function bindInsulin(out){var b=out&&out.querySelector('[data-open-insulin-safe]');if(!b)return;b.onclick=function(){var api=window.GestaMedDMGMaster;if(api&&typeof api.open==='function')api.open('insulin');};}
function evaluate(e){var t=e.target&&e.target.closest&&e.target.closest('button');if(!t||t.id!=='gm-initial-eval')return;var out=document.getElementById('gm-initial-result');if(!out)return;e.preventDefault();e.stopImmediatePropagation();var p=num('gm-initial-pct'),d=num('gm-initial-days'),c=num('gm-initial-count');
 if(p==null||p<0||p>100){out.innerHTML=alertHtml('Percentual inválido','Informe um percentual entre 0 e 100%.','warn');return;}
 if(d!=null&&(d<0||d>60)){out.innerHTML=alertHtml('Tempo inválido','Informe um número de dias entre 0 e 60.','warn');return;}
 if(c!=null&&(c<0||c>500||Math.floor(c)!==c)){out.innerHTML=alertHtml('Número de medidas inválido','Informe uma contagem inteira entre 0 e 500.','warn');return;}
 if(p>=30){if(d==null||d<=0){out.innerHTML=alertHtml('Complete o contexto do tratamento','O critério percentual deve ser interpretado após medidas não farmacológicas. Informe há quantos dias alimentação, atividade física quando permitida e monitorização estão em curso.','warn');return;}out.innerHTML=alertHtml('Critério percentual para insulinoterapia atingido','Há ≥30% de glicemias acima da meta no contexto informado de tratamento não farmacológico. Avaliar insulinoterapia e o padrão glicêmico materno-fetal antes de definir o esquema.','danger')+insulinButton();bindInsulin(out);return;}
 if(d!=null&&d>=7&&c!=null&&c>=2){out.innerHTML=alertHtml('Considerar farmacoterapia','Há pelo menos duas glicemias acima da meta e já transcorreram 7 dias de tratamento não farmacológico. A SBD recomenda que essa resposta seja reavaliada dentro de 7–14 dias e admite considerar farmacoterapia conforme persistência e contexto clínico.','warn')+insulinButton();bindInsulin(out);return;}
 out.innerHTML=alertHtml('Manter acompanhamento e reavaliar','O critério percentual não foi atingido e os dados informados não preenchem o critério complementar de persistência. Manter medidas não farmacológicas, revisar técnica e padrão por horário e reavaliar em curto prazo.','ok');
}
function init(){var r=root();if(!r){setTimeout(init,150);return;}if(r.getAttribute('data-dmg-initial-safety-v247')==='1')return;r.setAttribute('data-dmg-initial-safety-v247','1');r.addEventListener('click',evaluate,true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();window.addEventListener('load',init,{once:true});
})();