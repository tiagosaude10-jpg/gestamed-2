(function(){
  'use strict';
  var PATCH_ID='gestamed-home-search-submit-2026-07-24-138';
  if(document.documentElement.getAttribute('data-gm-home-search-submit')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-search-submit',PATCH_ID);

  var timer=null;
  function submitSearch(value){
    var term=String(value||'').trim();
    if(term.length<3)return false;
    if(typeof window.GestaMedOpenMedication==='function'){
      window.GestaMedOpenMedication(term);
      return true;
    }
    setTimeout(function(){
      if(typeof window.GestaMedOpenMedication==='function')window.GestaMedOpenMedication(term);
    },250);
    return true;
  }

  function install(){
    var field=document.getElementById('gm-home-search');
    if(!field)return false;
    if(field.getAttribute('data-gm-search-installed')==='138')return true;
    field.setAttribute('data-gm-search-installed','138');
    field.setAttribute('enterkeyhint','search');
    field.style.background='rgba(255,255,255,.96)';
    field.style.borderRadius='999px';
    field.style.paddingLeft='5%';
    field.style.paddingRight='12%';
    field.style.boxSizing='border-box';
    field.style.color='#3b2333';
    field.style.fontWeight='500';

    field.addEventListener('input',function(){
      clearTimeout(timer);
      var value=field.value;
      if(String(value||'').trim().length<3)return;
      timer=setTimeout(function(){submitSearch(value);},650);
    },true);
    field.addEventListener('keydown',function(e){
      if(e.key==='Enter'){
        e.preventDefault();e.stopImmediatePropagation();
        clearTimeout(timer);submitSearch(field.value);
      }
    },true);
    field.addEventListener('change',function(){clearTimeout(timer);submitSearch(field.value);},true);
    field.addEventListener('search',function(e){e.preventDefault();clearTimeout(timer);submitSearch(field.value);},true);
    field.addEventListener('blur',function(){if(field.value.trim().length>=3){clearTimeout(timer);submitSearch(field.value);}},true);

    var canvas=document.getElementById('gm-home-canvas');
    if(canvas){
      var old=document.getElementById('gm-home-search-button');
      if(old)old.remove();
      var btn=document.createElement('button');
      btn.type='button';btn.id='gm-home-search-button';
      btn.setAttribute('aria-label','Pesquisar medicamento');
      btn.style.cssText='position:absolute;z-index:20;right:2.5%;top:24.1%;width:13%;height:5.4%;border:0;background:transparent;border-radius:999px;cursor:pointer;';
      btn.addEventListener('touchend',function(e){e.preventDefault();e.stopImmediatePropagation();clearTimeout(timer);submitSearch(field.value);},true);
      btn.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();clearTimeout(timer);submitSearch(field.value);},true);
      canvas.appendChild(btn);
    }
    return true;
  }

  var tries=0;(function start(){tries++;if(install())return;if(tries<120)setTimeout(start,100);})();
})();