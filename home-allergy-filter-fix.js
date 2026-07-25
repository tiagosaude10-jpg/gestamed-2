(function(){
  'use strict';
  var PATCH_ID='gestamed-home-allergy-filter-fix-2026-07-25-158';
  if(document.documentElement.getAttribute('data-gm-home-allergy-filter-fix')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-allergy-filter-fix',PATCH_ID);

  function findSearchInput(){
    return document.querySelector('#searchInput, input[type="search"]:not(#gm-home-search), input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function applyCorrectTerm(){
    var original=findSearchInput();
    var homeSearch=document.getElementById('gm-home-search');
    if(!original)return;
    if(homeSearch)homeSearch.value='anti-histamínico';
    original.value='anti-histamínico';
    ['input','change','keyup'].forEach(function(type){
      original.dispatchEvent(new Event(type,{bubbles:true}));
    });
    try{if(typeof applyFilters==='function')applyFilters();}catch(error){}
  }

  document.addEventListener('click',function(event){
    var button=event.target&&event.target.closest?event.target.closest('.gm-home-filter-chip'):null;
    if(!button||button.getAttribute('aria-label')!=='Alergia')return;
    window.setTimeout(applyCorrectTerm,0);
    window.setTimeout(applyCorrectTerm,70);
  },true);
})();
