(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
function root(){return document.getElementById(ROOT_ID);}
function empty(id){var e=document.getElementById(id);return !e||String(e.value||'').trim()==='';}
function alertHtml(title,text){return '<aside class="gm-master-alert warn"><b>'+title+'</b><span>'+text+'</span></aside>';}
function validNumber(value){if(value==null)return null;var s=String(value).trim().replace(',','.');if(s==='')return null;var x=Number(s);return Number.isFinite(x)&&x>0?x:null;}
function analyzeProfileSafe(){
 var api=window.GestaMedDMGMaster;if(!api||!api.state)return;
 var state=api.state,keys=state.profileType===6?['fasting','postbreakfast','prelunch','postlunch','predinner','postdinner']:['fasting','postbreakfast','postlunch','postdinner'];
 var labels={fasting:'Jejum',postbreakfast:'Pós-café',prelunch:'Pré-almoço',postlunch:'Pós-almoço',predinner:'Pré-jantar',postdinner:'Pós-jantar'};
 var total=0,high=0,low=0,stats={};keys.forEach(function(k){stats[k]={total:0,high:0,low:0};});
 (state.profileRows||[]).forEach(function(r){keys.forEach(function(k){var v=validNumber(r[k]);if(v==null)return;total++;stats[k].total++;var target=(k==='fasting'||k==='prelunch'||k==='predinner')?95:140;if(v<70){low++;stats[k].low++;}else if(v>=target){high++;stats[k].high++;}});});
 var out=document.getElementById('gm-profile-result');if(!out)return;
 if(!total){out.innerHTML=alertHtml('Sem medidas válidas','Preencha ao menos uma glicemia para analisar. Campos vazios e valores inválidos não entram no cálculo.');return;}
 var pct=high/total*100,maxKey=keys[0],maxRate=-1;keys.forEach(function(k){var s=stats[k],rate=s.total?s.high/s.total:0;if(rate>maxRate){maxRate=rate;maxKey=k;}});
 var pattern=maxRate>0?labels[maxKey]:'Sem predomínio de hiperglicemia';
 var kind=pct>=30?'danger':high?'warn':'ok';
 var clinical=pct>=30?'Critério ministerial percentual para insulinoterapia atingido, se as metas permaneceram inadequadas após tratamento não farmacológico.':high?'Percentual global abaixo de 30%, porém existem medidas fora da meta. Avaliar persistência, repetição no mesmo horário e tempo de tratamento.':'Perfil sem medidas acima da meta no período informado.';
 var rows=keys.map(function(k){var s=stats[k],p=s.total?s.high/s.total*100:0;return '<tr><td>'+labels[k]+'</td><td>'+s.high+'/'+s.total+'</td><td>'+p.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%</td></tr>';}).join('');
 out.innerHTML='<div class="gm-analysis-box"><div class="gm-analysis-head"><div><small>Medidas válidas</small><b>'+total+'</b></div><div><small>Acima da meta</small><b>'+high+'</b></div><div><small>% alterado</small><b>'+pct.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%</b></div><div><small>Hipoglicemias</small><b>'+low+'</b></div></div><aside class="gm-master-alert '+kind+'"><b>Padrão predominante: '+pattern+'</b><span>'+clinical+'</span></aside><table class="gm-mini-table"><thead><tr><th>Horário</th><th>Alteradas</th><th>%</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}
function onClick(e){var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
 if(t.id==='gm-dx-fasting-btn'&&empty('gm-dx-fasting')){e.preventDefault();e.stopImmediatePropagation();document.getElementById('gm-dx-fasting-result').innerHTML=alertHtml('Informe a glicemia de jejum','O campo não pode ficar vazio.');return;}
 if(t.id==='gm-totg-btn'&&(empty('gm-totg0')||empty('gm-totg1')||empty('gm-totg2'))){e.preventDefault();e.stopImmediatePropagation();document.getElementById('gm-totg-result').innerHTML=alertHtml('Preencha os três tempos','Jejum, 1 hora e 2 horas são necessários para interpretar o TOTG.');return;}
 if(t.id==='gm-post-interpret'&&(empty('gm-post-fasting')||empty('gm-post-2h'))){e.preventDefault();e.stopImmediatePropagation();document.getElementById('gm-post-result').innerHTML=alertHtml('Preencha os dois valores','Informe jejum e glicemia de 2 horas do TOTG pós-parto.');return;}
 if(t.id==='gm-initial-eval'&&empty('gm-initial-pct')){e.preventDefault();e.stopImmediatePropagation();document.getElementById('gm-initial-result').innerHTML=alertHtml('Informe o percentual','Use o percentual calculado no Perfil Glicêmico.');return;}
 if(t.id==='gm-profile-analyze'){e.preventDefault();e.stopImmediatePropagation();analyzeProfileSafe();return;}
}
function init(){var r=root();if(!r){setTimeout(init,150);return;}if(r.getAttribute('data-dmg-validation-v231')==='1')return;r.setAttribute('data-dmg-validation-v231','1');r.addEventListener('click',onClick,true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();window.addEventListener('load',init,{once:true});
})();