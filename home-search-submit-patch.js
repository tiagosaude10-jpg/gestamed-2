(function(){
  'use strict';
  var PATCH_ID='gestamed-home-search-submit-2026-07-24-137';
  if(document.documentElement.getAttribute('data-gm-home-search-submit')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-search-submit',PATCH_ID);

  function submitSearch(value){
    var term=String(value||'').trim();
    if(!term)return false;
    if(typeof window.GestaMedOpenMedication==='function'){
      window.GestaMedOpenMedication(term);
      return true;
    }
    return false;
  }

  function install(){
    var field=document.getElementById('gm-home-search');
    if(!field)return false;
    if(field.getAttribute('data-gm-search-installed')==='true')return true;
    field.setAttribute('data-gm-search-installed','true');
    field.style.background='rgba(255,255,255,.96)';
    field.style.borderRadius='999px';
    field.style.paddingLeft='5%';
    field.style.paddingRight='5%';
    field.style.boxSizing='border-box';
    field.style.color='#3b2333';
    field.style.fontWeight='500';

    field.addEventListener('keydown',function(e){
      if(e.key==='Enter'){
        e.preventDefault();e.stopImmediatePropagation();
        submitSearch(field.value);
      }
    },true);
    field.addEventListener('search',function(e){
      e.preventDefault();submitSearch(field.value);
    },true);

    var canvas=document.getElementById('gm-home-canvas');
    if(canvas && !document.getElementById('gm-home-search-button')){
      var btn=document.createElement('button');
      btn.type='button';btn.id='gm-home-search-button';
      btn.setAttribute('aria-label','Pesquisar medicamento');
      btn.style.cssText='position:absolute;z-index:6;left:3.5%;top:24.55%;width:8%;height:4.6%;border:0;background:transparent;border-radius:999px;';
      btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();submitSearch(field.value);});
      canvas.appendChild(btn);
    }
    return true;
  }

  var tries=0;(function start(){tries++;if(install())return;if(tries<100)setTimeout(start,120);})();
})();