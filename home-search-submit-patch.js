(function(){
  'use strict';
  var PATCH_ID='gestamed-home-search-submit-2026-07-24-138';
  if(document.documentElement.getAttribute('data-gm-home-search-submit')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-search-submit',PATCH_ID);

  var submitting=false;
  var lastSubmitted='';

  function submitSearch(value){
    var term=String(value||'').trim();
    if(!term || submitting)return false;
    if(typeof window.GestaMedOpenMedication!=='function')return false;
    submitting=true;
    lastSubmitted=term;
    try{window.GestaMedOpenMedication(term);}catch(e){submitting=false;return false;}
    window.setTimeout(function(){submitting=false;},700);
    return true;
  }

  function install(){
    var field=document.getElementById('gm-home-search');
    if(!field)return false;
    if(field.getAttribute('data-gm-search-installed')==='138')return true;
    field.setAttribute('data-gm-search-installed','138');
    field.style.background='rgba(255,255,255,.96)';
    field.style.borderRadius='999px';
    field.style.paddingLeft='5%';
    field.style.paddingRight='12%';
    field.style.boxSizing='border-box';
    field.style.color='#3b2333';
    field.style.fontWeight='500';
    field.setAttribute('enterkeyhint','search');

    function run(e){
      if(e){e.preventDefault();e.stopImmediatePropagation();}
      submitSearch(field.value);
    }

    field.addEventListener('keydown',function(e){
      if(e.key==='Enter' || e.keyCode===13)run(e);
    },true);
    field.addEventListener('keypress',function(e){
      if(e.key==='Enter' || e.keyCode===13)run(e);
    },true);
    field.addEventListener('search',run,true);
    field.addEventListener('change',function(){
      var term=String(field.value||'').trim();
      if(term && term!==lastSubmitted)submitSearch(term);
    },true);

    var canvas=document.getElementById('gm-home-canvas');
    if(canvas){
      var old=document.getElementById('gm-home-search-button');
      if(old)old.remove();
      var btn=document.createElement('button');
      btn.type='button';btn.id='gm-home-search-button';
      btn.setAttribute('aria-label','Pesquisar medicamento');
      btn.style.cssText='position:absolute;z-index:7;right:2.2%;top:24.25%;width:11%;height:5.1%;border:0;background:transparent;border-radius:999px;-webkit-tap-highlight-color:rgba(236,72,153,.15);';
      btn.addEventListener('click',run,true);
      canvas.appendChild(btn);
    }
    return true;
  }

  var tries=0;(function start(){tries++;if(install())return;if(tries<120)setTimeout(start,100);})();
})();