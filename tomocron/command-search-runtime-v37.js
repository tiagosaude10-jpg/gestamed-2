(()=>{
'use strict';
const input=document.getElementById('tcGlobalSearch');
const clear=document.getElementById('tcSearchClear');
if(!input||!clear)return;

// iOS Safari aplica zoom automático em inputs com fonte menor que 16px.
// Mantemos 16px reais para que a tela permaneça na mesma escala ao abrir o teclado.
input.style.setProperty('font-size','16px','important');
input.style.setProperty('-webkit-text-size-adjust','100%','important');
input.style.setProperty('text-size-adjust','100%','important');

function syncClear(){
  clear.classList.toggle('visible',input.value.length>0);
  clear.setAttribute('aria-hidden',input.value.length>0?'false':'true');
}

// Escuta no document em captura: roda antes do listener v36 que intercepta o evento no input.
document.addEventListener('input',e=>{
  if(e.target===input)syncClear();
},true);

document.addEventListener('focusin',e=>{
  if(e.target!==input)return;
  syncClear();
  input.style.setProperty('font-size','16px','important');
},true);

document.addEventListener('click',e=>{
  const btn=e.target.closest&&e.target.closest('#tcSearchClear');
  if(!btn)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  input.value='';
  syncClear();
  input.dispatchEvent(new Event('input',{bubbles:true}));
  input.focus({preventScroll:true});
},true);

syncClear();
})();
