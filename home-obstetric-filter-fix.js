(function(){
  'use strict';
  var PATCH_ID='gestamed-home-obstetric-filter-fix-2026-07-25-160';
  if(document.documentElement.getAttribute('data-gm-home-obstetric-filter-fix')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-obstetric-filter-fix',PATCH_ID);

  var obstetricMedications=[
    'Ácido fólico','Sulfato ferroso','Carbonato de cálcio','Ácido acetilsalicílico',
    'Progesterona','Nifedipino','Sulfato de magnésio','Metildopa','Labetalol','Hidralazina',
    'Insulina','Oxitocina','Misoprostol','Metilergometrina','Ácido tranexâmico',
    'Betametasona','Dexametasona','Penicilina benzatina','Imunoglobulina anti-D'
  ];

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
  }

  function findSearchInput(){
    return document.querySelector('#searchInput, input[type="search"]:not(#gm-home-search), input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function searchMedication(name){
    var original=findSearchInput();
    var homeSearch=document.getElementById('gm-home-search');
    if(!original)return;
    if(homeSearch)homeSearch.value=name;
    original.value=name;
    ['input','change','keyup'].forEach(function(type){original.dispatchEvent(new Event(type,{bubbles:true}));});
    try{if(typeof applyFilters==='function')applyFilters();}catch(error){}

    window.setTimeout(function(){
      var wanted=normalize(name);
      var candidates=Array.prototype.slice.call(document.querySelectorAll('button,a,[role="button"]')).filter(function(el){
        if(el.closest&&el.closest('#gm-home-screen,#gm-welcome-screen'))return false;
        var text=normalize(el.innerText||el.textContent||el.getAttribute('aria-label')||'');
        return text===wanted||text.indexOf(wanted)!==-1;
      });
      if(candidates.length){
        var home=document.getElementById('gm-home-screen');
        if(home){home.style.removeProperty('display');home.style.removeProperty('visibility');home.style.removeProperty('opacity');home.classList.add('gm-home-hidden');}
        document.documentElement.classList.remove('gm-home-active','gm-home-filter-mode');
        try{candidates[0].click();}catch(error){}
      }
    },160);
  }

  function renderCorrectList(){
    var panel=document.getElementById('gm-home-filter-results');
    if(!panel)return;
    var title=panel.querySelector('strong');
    var list=panel.querySelector('.gm-home-results-list');
    if(title)title.textContent='Medicamentos obstétricos';
    if(!list)return;
    list.innerHTML='';
    obstetricMedications.forEach(function(name){
      var card=document.createElement('button');
      card.type='button';
      card.className='gm-home-result-card';
      card.textContent=name;
      card.addEventListener('click',function(){searchMedication(name);});
      list.appendChild(card);
    });
    panel.classList.add('gm-home-results-open');
  }

  document.addEventListener('click',function(event){
    var button=event.target&&event.target.closest?event.target.closest('.gm-home-filter-chip'):null;
    if(!button||button.getAttribute('aria-label')!=='Medicamentos obstétricos')return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.setTimeout(renderCorrectList,0);
    window.setTimeout(renderCorrectList,120);
  },true);
})();
