(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const num=v=>{const n=Number(String(v||'').trim().replace(',','.'));return Number.isFinite(n)?n:null};

function screen(id){$$('.screen').forEach(x=>x.classList.add('hidden'));$('#'+id)?.classList.remove('hidden')}
function view(id){
  $$('.view').forEach(x=>x.classList.add('hidden'));
  $('#'+id)?.classList.remove('hidden');
  $$('.bottom-nav [data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===id));
  screen('app');
  scrollTo(0,0);
}
$$('[data-go]').forEach(b=>b.onclick=()=>screen(b.dataset.go));
$$('[data-view]').forEach(b=>b.onclick=()=>view(b.dataset.view));

let sex=null;
$$('[data-sex]').forEach(b=>b.onclick=()=>{
  $$('[data-sex]').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  sex=b.dataset.sex;
});

function formatDateInput(value){
  const d=String(value||'').replace(/\D/g,'').slice(0,8);
  if(d.length<=2)return d;
  if(d.length<=4)return d.slice(0,2)+'/'+d.slice(2);
  return d.slice(0,2)+'/'+d.slice(2,4)+'/'+d.slice(4);
}
function brToIso(value){
  const m=String(value||'').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if(!m)return'';
  const day=Number(m[1]),month=Number(m[2]),year=Number(m[3]);
  const test=new Date(year,month-1,day);
  if(test.getFullYear()!==year||test.getMonth()!==month-1||test.getDate()!==day)return'';
  return `${m[3]}-${m[2]}-${m[1]}`;
}
function isoToBr(value){
  const m=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m?`${m[3]}/${m[2]}/${m[1]}`:'';
}

const prevDate=$('#prevDate'),prevDatePicker=$('#prevDatePicker'),prevDateClearBtn=$('#prevDateClearBtn');
function syncPrevDateClear(){prevDateClearBtn?.classList.toggle('visible',!!String(prevDate?.value||'').trim())}
if(prevDate){
  prevDate.addEventListener('input',()=>{
    prevDate.value=formatDateInput(prevDate.value);
    if(prevDatePicker&&prevDate.value.length===10)prevDatePicker.value=brToIso(prevDate.value)||'';
    syncPrevDateClear();
  });
  prevDate.addEventListener('blur',()=>{
    if(!prevDate.value){syncPrevDateClear();return}
    const iso=brToIso(prevDate.value);
    if(iso){if(prevDatePicker)prevDatePicker.value=iso;prevDate.setCustomValidity('')}
    else prevDate.setCustomValidity('Informe uma data válida no formato DD/MM/AAAA.');
    syncPrevDateClear();
  });
  prevDate.addEventListener('focus',()=>prevDate.setCustomValidity(''));
}
prevDatePicker?.addEventListener('change',()=>{
  if(!prevDate)return;
  prevDate.value=isoToBr(prevDatePicker.value);
  prevDate.setCustomValidity('');
  syncPrevDateClear();
});
prevDateClearBtn?.addEventListener('click',()=>{
  if(prevDate){prevDate.value='';prevDate.setCustomValidity('');syncPrevDateClear();prevDate.focus()}
  if(prevDatePicker)prevDatePicker.value='';
});
syncPrevDateClear();

function initClearableFields(){
  const fields=$$('.app-main input:not([type="date"]):not(#prevDate),.app-main textarea');
  fields.forEach(field=>{
    if(field.closest('.clearable-wrap'))return;
    const wrap=document.createElement('div');
    wrap.className='clearable-wrap'+(field.tagName==='TEXTAREA'?' clearable-textarea':'');
    field.parentNode.insertBefore(wrap,field);
    wrap.appendChild(field);
    const clear=document.createElement('button');
    clear.type='button';clear.className='field-clear-btn';clear.setAttribute('aria-label','Limpar campo');clear.title='Limpar campo';clear.textContent='×';
    wrap.appendChild(clear);
    const sync=()=>clear.classList.toggle('visible',!!String(field.value||'').trim());
    field.addEventListener('input',sync);field.addEventListener('change',sync);
    clear.addEventListener('click',()=>{
      field.value='';
      field.dispatchEvent(new Event('input',{bubbles:true}));
      field.dispatchEvent(new Event('change',{bubbles:true}));
      sync();field.focus();
    });
    sync();
  });
}
initClearableFields();

function formatCreatinine(value){
  const digits=String(value||'').replace(/\D/g,'').replace(/^0+(?=\d)/,'').slice(0,5);
  if(!digits)return'';
  const cents=digits.padStart(3,'0');
  return cents.slice(0,-2)+','+cents.slice(-2);
}
['scr','prevScr'].forEach(id=>{
  const field=$('#'+id);if(!field)return;
  field.inputMode='numeric';field.autocomplete='off';
  field.addEventListener('input',()=>{const f=formatCreatinine(field.value);if(field.value!==f)field.value=f});
  field.addEventListener('focus',()=>{try{field.setSelectionRange(field.value.length,field.value.length)}catch(e){}});
});

function egfr(age,s,scr){const k=s==='female'?.7:.9,a=s==='female'?-.241:-.302,r=scr/k;return 142*Math.pow(Math.min(r,1),a)*Math.pow(Math.max(r,1),-1.2)*Math.pow(.9938,age)*(s==='female'?1.012:1)}
function crcl(age,s,scr,w){const x=(140-age)*w/(72*scr);return s==='female'?x*.85:x}
function stage(e){return e>=90?'G1':e>=60?'G2':e>=45?'G3a':e>=30?'G3b':e>=15?'G4':'G5'}
function rec(e,aki,dial){
  if(dial==='yes')return['blue','Paciente em diálise — protocolo específico',['Não usar a TFGe calculada isoladamente para decidir sobre contraste.','Contraste iodado IV não exige, por si só, iniciar diálise nem alterar rotineiramente o horário da sessão.','Confirmar indicação e protocolo institucional.']];
  if(aki==='yes')return['red','LRA/AKI conhecida ou suspeita — alto risco renal',['A TFGe calculada perde confiabilidade quando a creatinina está variando rapidamente.','A decisão deve ser individualizada por risco-benefício e urgência do exame.','Se o contraste for necessário, considerar expansão volêmica isotônica quando clinicamente apropriada e sem contraindicação.','Exame urgente ou potencialmente salvador não deve ser atrasado apenas para aguardar estabilização da creatinina.']];
  if(e<30)return['red','TFGe < 30 — maior atenção renal',['Não representa proibição automática ao contraste intravenoso.','Confirmar benefício diagnóstico, alternativas e urgência.','Considerar profilaxia com solução isotônica se clinicamente apropriada e sem contraindicação.','Evitar redução arbitrária de dose que possa tornar o exame não diagnóstico.']];
  if(e<45)return['yellow','TFGe 30–44 — atenção individualizada',['Contraste iodado intravenoso não é automaticamente contraindicado.','Revisar estabilidade renal, estado volêmico, comorbidades e fatores de risco adicionais.','Profilaxia não é rotina para todos com TFGe ≥30, mas pode ser considerada em situações selecionadas de alto risco.']];
  if(e<60)return['green','TFGe 45–59 — sem restrição renal específica pela TFGe isolada',['Com função renal estável e sem LRA/AKI, o contraste IV pode ser utilizado quando indicado.','Não há indicação rotineira de profilaxia renal apenas por esta faixa de TFGe.','Manter as demais verificações de segurança.']];
  return['green','TFGe ≥ 60 — baixo risco renal pela TFGe',['Com função renal estável e sem LRA/AKI, seguir com contraste IV quando indicado.','Não há indicação de profilaxia renal específica pela TFGe isolada.','Manter as demais verificações de segurança.']];
}
function specialistGuidance(e,aki,dial){
  if(dial==='yes')return{radio:'Contato com radiologista é recomendado quando houver dúvida sobre indicação, protocolo, volume de contraste ou particularidades da diálise. A diálise não deve ser iniciada nem ter seu horário alterado apenas por causa do contraste iodado IV.',neph:'Nefrologia: seguir o acompanhamento habitual do paciente dialítico. Solicitar avaliação adicional se houver instabilidade clínica, distúrbios hidroeletrolíticos, sobrecarga volêmica ou outra questão renal ativa.'};
  if(aki==='yes')return{radio:'Entrar em contato com o radiologista antes do contraste sempre que possível, especialmente em exame eletivo, para decisão individualizada de risco-benefício, alternativas e estratégia de proteção renal.',neph:'Considerar avaliação da Nefrologia se a LRA/AKI for confirmada, progressiva, sem causa definida, associada a oligúria, distúrbios eletrolíticos, sobrecarga volêmica ou necessidade de suporte renal. Em urgência, a avaliação não deve atrasar exame potencialmente salvador.'};
  if(e<30)return{radio:'Recomenda-se discutir com o radiologista, principalmente em exame eletivo, para documentar risco-benefício, necessidade real do contraste, alternativas e medidas preventivas.',neph:'TFGe <30 sugere disfunção renal avançada quando persistente. Considerar avaliação nefrológica conforme contexto, evolução e complicações; não é necessário aguardar Nefrologia para exame urgente quando o benefício do contraste for maior.'};
  if(e<45)return{radio:'Contato rotineiro com radiologista não é obrigatório apenas pela TFGe 30–44 se a função estiver estável e não houver LRA. Considerar discussão se houver múltiplos fatores de risco, deterioração recente, desidratação, insuficiência cardíaca ou dúvida sobre a indicação.',neph:'Nefrologia não é necessária apenas para liberar contraste. Considerar avaliação se houver queda progressiva da função renal, albuminúria importante, etiologia incerta ou outras complicações da doença renal.'};
  return{radio:'Não há necessidade de contato com radiologista apenas pela TFGe se a função renal estiver estável e não houver outros alertas. Seguir protocolo institucional e indicação clínica.',neph:'Não há indicação de avaliação nefrológica apenas para liberação do contraste. Encaminhar conforme critérios clínicos de doença renal crônica, progressão ou complicações.'};
}
function trendInfo(scr){
  const prev=num($('#prevScr')?.value),date=String($('#prevDate')?.value||'').trim();
  if(!prev||prev<=0)return'';
  const delta=scr-prev,pct=(delta/prev)*100,sign=delta>=0?'+':'';
  return `<div class="guidance-box"><h4>Tendência da creatinina</h4><p>Creatinina anterior: <b>${prev.toFixed(2).replace('.',',')} mg/dL</b>${date?` em ${date}`:''}. Variação até o valor atual: <b>${sign}${delta.toFixed(2).replace('.',',')} mg/dL (${sign}${pct.toFixed(1).replace('.',',')}%)</b>. Esta comparação isolada não confirma nem exclui LRA/AKI; o intervalo de tempo e o contexto clínico são essenciais.</p></div>`;
}
function collectRenal(){
  const age=num($('#age').value),scr=num($('#scr').value),w=num($('#weight').value),urea=num($('#urea').value),aki=$('#aki').value,dial=$('#dialysis').value,err=[];
  if(!age||age<18||age>120)err.push('Informe idade entre 18 e 120 anos.');
  if(!sex)err.push('Selecione o sexo ao nascimento.');
  if(!scr||scr<=0)err.push('Informe creatinina válida.');
  return{age,scr,w,urea,aki,dial,err};
}
function quickRenalHtml(data){
  const e=egfr(data.age,sex,data.scr),st=stage(e),[color,title,items]=rec(e,data.aki,data.dial);
  return `<div class="result ${color} quick-result"><small>TFGe CKD-EPI 2021</small><div class="egfr">${Math.round(e)}</div><div class="unit">mL/min/1,73 m² · ${st}</div><div class="conduct"><h3>${title}</h3><ul>${items.slice(0,2).map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`;
}
function fullRenalHtml(data){
  const e=egfr(data.age,sex,data.scr),st=stage(e),[color,title,items]=rec(e,data.aki,data.dial),cg=data.w?crcl(data.age,sex,data.scr,data.w):null,sp=specialistGuidance(e,data.aki,data.dial);
  return `<div class="result ${color}"><small>TFGe CKD-EPI 2021</small><div class="egfr">${Math.round(e)}</div><div class="unit">mL/min/1,73 m² · ${st}</div><div class="conduct"><h3>CONDUTA SUGERIDA — ${title}</h3><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="metrics"><div class="metric"><small>Creatinina</small><b>${data.scr.toFixed(2).replace('.',',')} mg/dL</b></div><div class="metric"><small>Ureia</small><b>${data.urea?data.urea+' mg/dL':'—'}</b></div><div class="metric"><small>CrCl</small><b>${cg?Math.round(cg)+' mL/min':'—'}</b></div></div><div class="clinical-guidance"><div class="guidance-box"><h4>Radiologista</h4><p>${sp.radio}</p></div><div class="guidance-box"><h4>Nefrologia</h4><p>${sp.neph}</p></div>${trendInfo(data.scr)}<div class="guidance-box"><h4>Interpretação prática</h4><ul><li>A TFGe deve ser interpretada junto com estabilidade da creatinina, presença de LRA/AKI, estado volêmico e urgência do exame.</li><li>Contraste iodado IV não deve ser negado automaticamente apenas por uma TFGe reduzida; risco-benefício e impacto diagnóstico devem ser considerados.</li><li>Quando houver alto risco renal, revisar hidratação, nefrotóxicos e necessidade de repetição de contraste em curto intervalo conforme protocolo institucional.</li></ul></div></div><div class="result-disclaimer">Apoio à decisão clínica. Não substitui avaliação médica, radiológica ou nefrológica nem o protocolo institucional vigente.</div></div>`;
}
function renderRenal(mode,target,errorTarget){
  const data=collectRenal();
  if(data.err.length){
    errorTarget.innerHTML='<div class="error"><b>Não foi possível calcular.</b><br>'+data.err.join('<br>')+'</div>';
    target.innerHTML='';errorTarget.scrollIntoView({behavior:'smooth',block:'center'});return;
  }
  errorTarget.innerHTML='';
  target.innerHTML=mode==='quick'?quickRenalHtml(data):fullRenalHtml(data);
  target.scrollIntoView({behavior:'smooth',block:'start'});
}
$('#calcRenal')?.addEventListener('click',()=>renderRenal('quick',$('#renalResult'),$('#renalError')));
$('#calcRenalBottom')?.addEventListener('click',()=>renderRenal('full',$('#renalResultBottom'),$('#renalErrorBottom')));

$('#calcDose')?.addEventListener('click',()=>{
  const w=num($('#doseWeight').value),c=num($('#conc').value),m=num($('#mlkg').value),f=num($('#flow').value);
  if(!w||!m){$('#doseResult').innerHTML='<div class="error">Informe peso e mL/kg do protocolo.</div>';return}
  const v=w*m,g=v*c/1000,d=f?v/f:null,r=f?c*f/1000:null;
  $('#doseResult').innerHTML=`<div class="output"><b>Volume: ${v.toFixed(1)} mL</b><br>Carga de iodo: ${g.toFixed(1)} g I${f?`<br>Taxa de entrega: ${r.toFixed(2)} g I/s · duração ${d.toFixed(1)} s`:''}</div>`;
});
$('#protocolSummary')?.addEventListener('click',()=>{$('#protocolResult').innerHTML=`<div class="output"><b>${$('#exam').value}</b><br>Indicação: ${$('#indication').value||'Não informada'}<br>Fases: ${$('#phases').value||'Não informadas'}<br>Observações: ${$('#protocolNotes').value||'Sem observações'}<br><small>Confirmar parâmetros conforme protocolo institucional.</small></div>`});
$('#calcIodine')?.addEventListener('click',()=>{const c=num($('#quickConc').value),v=num($('#quickVol').value);$('#iodineResult').innerHTML=v?`<div class="output"><b>${(c*v/1000).toFixed(1)} g de iodo total</b><br>${v} mL × ${c} mg I/mL</div>`:'<div class="error">Informe o volume.</div>'});
$('#assessSafety')?.addEventListener('click',()=>{const p=$('#prior').value,r=$('#renalRisk').value,g=$('#preg').value,alerts=[];if(p==='yes')alerts.push('Reação prévia grave: avaliação médica/radiológica e planejamento individualizado.');if(r==='yes')alerts.push('LRA/AKI ou TFGe <30: avaliação individualizada de risco-benefício.');if(g==='yes')alerts.push('Gestação: confirmar indicação, benefício e alternativas.');$('#safetyResult').innerHTML=`<div class="output"><b>${alerts.length?'ATENÇÃO':'Sem alerta adicional identificado'}</b><br>${alerts.join('<br>')||'Prosseguir conforme protocolo institucional.'}</div>`});

const ADMIN_NOTICE_KEY='tomocron_admin_notice',noticeBtn=$('#adminNoticeBtn'),noticeDot=$('#noticeDot'),noticePanel=$('#adminNoticePanel'),exitBtn=$('#exitAppBtn');
function renderAdminNotice(){
  const text=(localStorage.getItem(ADMIN_NOTICE_KEY)||'').trim();
  if(text){noticeDot?.classList.remove('hidden');if(noticePanel)noticePanel.textContent='Aviso do administrador\n'+text}
  else{noticeDot?.classList.add('hidden');noticePanel?.classList.add('hidden');if(noticePanel)noticePanel.textContent=''}
}
noticeBtn?.addEventListener('click',()=>{const text=(localStorage.getItem(ADMIN_NOTICE_KEY)||'').trim();if(!text){alert('Sem avisos no momento.');return}noticePanel?.classList.toggle('hidden')});
window.TomoCronAdmin={setNotice(text){const value=String(text||'').trim();if(value)localStorage.setItem(ADMIN_NOTICE_KEY,value);else localStorage.removeItem(ADMIN_NOTICE_KEY);renderAdminNotice()},clearNotice(){localStorage.removeItem(ADMIN_NOTICE_KEY);renderAdminNotice()}};

function clearSessionData(){
  try{sessionStorage.clear()}catch(e){}
  $$('input').forEach(el=>{el.value='';el.dispatchEvent(new Event('input',{bubbles:true}))});
  $$('textarea').forEach(el=>{el.value='';el.dispatchEvent(new Event('input',{bubbles:true}))});
  $$('select').forEach(el=>el.selectedIndex=0);
  $$('.field-clear-btn,.clear-btn').forEach(el=>el.classList.remove('visible'));
  $$('[data-sex]').forEach(el=>el.classList.remove('active'));sex=null;
  ['renalError','renalResult','renalErrorBottom','renalResultBottom','doseResult','protocolResult','iodineResult','safetyResult'].forEach(id=>{const el=$('#'+id);if(el)el.innerHTML=''});
}
function exitApplication(){
  if(!confirm('Deseja sair do TomoCron?'))return;
  clearSessionData();
  try{window.open('','_self');window.close()}catch(e){}
  setTimeout(()=>{try{location.replace('about:blank')}catch(e){document.body.innerHTML='';document.body.style.background='#fff'}},120);
}
exitBtn?.addEventListener('click',exitApplication);
renderAdminNotice();

const install=$('#installApp');
const standalone=window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true;
if(standalone)install?.classList.add('is-installed');
else if(install)install.onclick=()=>alert('No iPhone, toque no botão Compartilhar do Safari e escolha “Adicionar à Tela de Início”. Depois confirme “Adicionar”.');

console.assert(Math.round(egfr(57,'male',1.37))===60);
console.assert(Math.round(egfr(75,'female',1.65))===32);
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
screen('start');
})();