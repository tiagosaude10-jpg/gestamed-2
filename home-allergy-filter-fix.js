(function(){
  'use strict';
  var PATCH_ID='gestamed-home-filter-audit-fix-2026-07-25-159';
  if(document.documentElement.getAttribute('data-gm-home-filter-audit-fix')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-filter-audit-fix',PATCH_ID);

  var correctTerms={
    'Dor':'analgésico',
    'Febre':'antitérmico',
    'Náuseas':'antiemético',
    'Vômitos':'antiemético',
    'Azia/Refluxo':'refluxo',
    'Alergia':'anti-histamínico',
    'Constipação':'laxante',
    'Analgésicos':'analgésico',
    'Anti-inflamatórios':'anti-inflamatório',
    'Antibióticos':'antibiótico',
    'Antifúngicos':'antifúngico',
    'Antivirais':'antiviral',
    'Anti-histamínicos':'anti-histamínico',
    'Antieméticos':'antiemético',
    'Anti-hipertensivos':'anti-hipertensivo',
    'Antidiabéticos':'antidiabético',
    'Anticoagulantes':'anticoagulante',
    'Antiagregantes':'antiagregante',
    'Anticonvulsivantes':'anticonvulsivante',
    'Antidepressivos':'antidepressivo',
    'Ansiolíticos':'ansiolítico',
    'Antipsicóticos':'antipsicótico',
    'Corticoides':'corticoide',
    'Broncodilatadores':'broncodilatador',
    'Antiasmáticos':'antiasmático',
    'Antiácidos':'antiácido',
    'Protetores gástricos':'protetor gástrico',
    'Laxantes':'laxante',
    'Antidiarreicos':'antidiarreico',
    'Diuréticos':'diurético',
    'Hormônios':'hormônio',
    'Vitaminas e suplementos':'suplemento',
    'Medicamentos obstétricos':'obstétrico'
  };

  function findSearchInput(){
    return document.querySelector('#searchInput, input[type="search"]:not(#gm-home-search), input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function applyCorrectTerm(label){
    var term=correctTerms[label];
    var original=findSearchInput();
    var homeSearch=document.getElementById('gm-home-search');
    if(!term||!original)return;
    if(homeSearch)homeSearch.value=term;
    original.value=term;
    ['input','change','keyup'].forEach(function(type){
      original.dispatchEvent(new Event(type,{bubbles:true}));
    });
    try{if(typeof applyFilters==='function')applyFilters();}catch(error){}
  }

  document.addEventListener('click',function(event){
    var button=event.target&&event.target.closest?event.target.closest('.gm-home-filter-chip'):null;
    if(!button)return;
    var label=button.getAttribute('aria-label')||'';
    if(!correctTerms[label])return;
    window.setTimeout(function(){applyCorrectTerm(label);},0);
    window.setTimeout(function(){applyCorrectTerm(label);},80);
  },true);
})();
