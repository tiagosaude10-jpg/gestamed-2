(function(){
  'use strict';
  var PATCH_ID='gestamed-home-medication-direct-detail-2026-07-25-163';
  if(document.documentElement.getAttribute('data-gm-direct-detail')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-direct-detail',PATCH_ID);

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  }

  function findSearchInput(){
    return document.querySelector('#searchInput, input[type="search"]:not(#gm-home-search), input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function setSearch(name){
    var original=findSearchInput();
    var homeSearch=document.getElementById('gm-home-search');
    if(!original)return false;
    if(homeSearch)homeSearch.value=name;
    original.value=name;
    ['input','change','keyup'].forEach(function(type){
      original.dispatchEvent(new Event(type,{bubbles:true}));
    });
    try{if(typeof applyFilters==='function')applyFilters();}catch(error){}
    return true;
  }

  function hideHomeForDetail(){
    var home=document.getElementById('gm-home-screen');
    var panel=document.getElementById('gm-home-filter-results');
    if(panel)panel.classList.remove('gm-home-results-open');
    if(home){
      home.style.removeProperty('display');
      home.style.removeProperty('visibility');
      home.style.removeProperty('opacity');
      home.classList.add('gm-home-hidden');
    }
    document.documentElement.classList.remove('gm-home-active','gm-home-filter-mode');
  }

  function findExactMedication(name){
    var target=normalize(name);
    var selectors='button,a,[role="button"],.drug-card,.med-card,.medicine-card,.result-card,.search-result-item';
    var nodes=Array.prototype.slice.call(document.querySelectorAll(selectors));
    return nodes.find(function(el){
      if(!el||!el.isConnected)return false;
      if(el.closest&&el.closest('#gm-home-screen,#gm-welcome-screen,#gm-home-filter-results'))return false;
      var rect=el.getBoundingClientRect();
      if(!rect.width||!rect.height)return false;
      var text=normalize(el.innerText||el.textContent||'');
      if(!text)return false;
      var firstLine=normalize(String(el.innerText||el.textContent||'').split(/\n/)[0]);
      return firstLine===target||text===target||text.indexOf(target+' ')===0;
    })||null;
  }

  function openDirect(name){
    if(!setSearch(name))return;
    var attempts=0;
    function tryOpen(){
      attempts+=1;
      var result=findExactMedication(name);
      if(result){
        hideHomeForDetail();
        window.setTimeout(function(){
          try{result.click();}catch(error){}
        },20);
        return;
      }
      if(attempts<30)window.setTimeout(tryOpen,70);
      else hideHomeForDetail();
    }
    window.setTimeout(tryOpen,40);
  }

  document.addEventListener('click',function(event){
    var card=event.target&&event.target.closest?event.target.closest('#gm-home-filter-results .gm-home-result-card'):null;
    if(!card)return;
    event.preventDefault();
    event.stopPropagation();
    if(event.stopImmediatePropagation)event.stopImmediatePropagation();
    var name=String(card.textContent||'').trim();
    if(name)openDirect(name);
  },true);
})();