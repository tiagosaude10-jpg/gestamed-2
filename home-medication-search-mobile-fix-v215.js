(function(){
'use strict';
var ROOT='#gm-app-flow';
var INPUT='#gm-home-search';

function currentChosenName(){
  var input=document.querySelector(ROOT+' '+INPUT);
  return input?String(input.value||'').replace(/\s+/g,' ').trim():'';
}

function openChosen(){
  var name=currentChosenName();
  if(!name)return;

  try{
    if(typeof window.GestaMedOpenMedicationDirect==='function'){
      window.GestaMedOpenMedicationDirect(name);
      return;
    }
  }catch(e){}

  try{
    if(typeof window.GestaMedOpenMedication==='function'){
      window.GestaMedOpenMedication(name);
      return;
    }
  }catch(e){}

  var legacy=document.querySelector('#gm-med-search');
  if(!legacy)return;
  legacy.value=name;
  try{legacy.dispatchEvent(new Event('input',{bubbles:true}));}catch(e){}
}

function ensureStyle(){
  var old=document.getElementById('gm-command-search-single-v228-style');
  if(old)old.remove();
  var prior=document.getElementById('gm-command-search-single-v218-style');
  if(prior)prior.remove();
  var s=document.createElement('style');
  s.id='gm-command-search-single-v228-style';
  s.textContent=[
    '#gm-app-flow .gm-command-search{grid-template-columns:minmax(0,1fr) 64px!important;overflow:visible!important;}',
    '#gm-app-flow .gm-command-search>button[type="submit"]:first-child{display:none!important;}',
    '#gm-app-flow .gm-command-search input{padding-left:18px!important;padding-right:8px!important;}',
    '#gm-app-flow .gm-command-filter-button{display:flex!important;align-items:center!important;justify-content:center!important;width:64px!important;height:100%!important;border-left:1px solid rgba(234,93,137,.16)!important;background:#fff8fb!important;color:#d91f5c!important;font-size:0!important;}',
    '#gm-app-flow .gm-command-filter-button:after{content:"🔍";font-size:25px;line-height:1;}',
    '#gm-app-flow .gm-command-filter-button:active{background:#ffeaf1!important;transform:scale(.98);}',
    '#gm-app-flow #gm-command-med-search-results{display:none!important;}'
  ].join('');
  document.head.appendChild(s);
}

function install(){
  var input=document.querySelector(ROOT+' '+INPUT);
  var form=document.querySelector(ROOT+' .gm-command-search');
  var oldButton=document.querySelector(ROOT+' .gm-command-filter-button');
  if(!input||!form||!oldButton)return false;

  ensureStyle();
  input.setAttribute('autocomplete','off');
  input.setAttribute('autocapitalize','none');
  input.setAttribute('enterkeyhint','search');

  var button=oldButton.cloneNode(true);
  oldButton.parentNode.replaceChild(button,oldButton);
  button.setAttribute('aria-label','Pesquisar e abrir medicamento');
  button.setAttribute('title','Pesquisar medicamento');
  button.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openChosen();},false);

  var newForm=form.cloneNode(false);
  while(form.firstChild)newForm.appendChild(form.firstChild);
  form.parentNode.replaceChild(newForm,form);
  newForm.addEventListener('submit',function(e){e.preventDefault();e.stopPropagation();openChosen();},false);

  input=document.querySelector(ROOT+' '+INPUT);
  input.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
      e.preventDefault();
      openChosen();
    }
  },false);

  return true;
}

var tries=0;
(function boot(){
  tries+=1;
  if(install())return;
  if(tries<120)setTimeout(boot,100);
})();
})();