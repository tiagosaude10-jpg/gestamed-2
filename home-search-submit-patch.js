(function(){
  'use strict';
  var PATCH_ID='gestamed-home-search-submit-2026-07-24-136';
  if(document.documentElement.getAttribute('data-gm-home-search-submit')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-search-submit',PATCH_ID);

  function normalize(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}

  function originalSearch(){
    var selectors=[
      '#searchInput','#search-input','#medicationSearch','#medication-search',
      'input[type="search"]','input[placeholder*="medicamento" i]',
      'input[placeholder*="princípio" i]','input[placeholder*="principio" i]'
    ];
    var all=[];
    selectors.forEach(function(sel){
      try{document.querySelectorAll(sel).forEach(function(el){if(all.indexOf(el)<0)all.push(el);});}catch(e){}
    });
    return all.find(function(el){return el.id!=='gm-home-search' && !el.closest('#gm-home-screen,#gm-welcome-screen');})||null;
  }

  function fire(el,type){
    try{el.dispatchEvent(new InputEvent(type,{bubbles:true,inputType:'insertText',data:null}));}
    catch(e){try{el.dispatchEvent(new Event(type,{bubbles:true}));}catch(x){}}
  }

  function hideHome(){
    var home=document.getElementById('gm-home-screen');
    var welcome=document.getElementById('gm-welcome-screen');
    if(home)home.classList.add('gm-home-hidden');
    if(welcome)welcome.classList.add('gm-welcome-hidden');
    document.documentElement.classList.remove('gm-home-active');
  }

  function clickSearchControl(input){
    var scope=input.closest('form')||input.parentElement||document;
    var candidates=[];
    try{candidates=Array.prototype.slice.call(scope.querySelectorAll('button,[role="button"],input[type="submit"]'));}catch(e){}
    var control=candidates.find(function(el){
      var t=normalize((el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'')+' '+(el.textContent||''));
      return /pesquis|buscar|search|consult/.test(t);
    });
    if(control){try{control.click();return true;}catch(e){}}
    return false;
  }

  function submitSearch(value){
    var term=String(value||'').trim();
    if(!term)return false;
    var input=originalSearch();
    if(!input)return false;
    input.value=term;
    fire(input,'input');fire(input,'change');fire(input,'keyup');
    ['applyFilters','filterMedications','renderMedications','searchMedications','performSearch'].forEach(function(name){
      try{if(typeof window[name]==='function')window[name]();}catch(e){}
    });
    hideHome();
    window.setTimeout(function(){
      clickSearchControl(input);
      try{input.focus();input.setSelectionRange(term.length,term.length);}catch(e){}
    },40);
    return true;
  }

  function install(){
    var field=document.getElementById('gm-home-search');
    if(!field)return false;
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