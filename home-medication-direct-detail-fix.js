(function(){
  'use strict';
  var PATCH_ID='gestamed-home-medication-direct-detail-2026-08-17-228';
  document.documentElement.setAttribute('data-gm-direct-detail',PATCH_ID);

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  }

  function newHomeActive(){
    var screen=document.querySelector('#gm-app-flow [data-screen="home"]');
    return !!(screen&&screen.classList.contains('gm-screen-active'));
  }

  function selectIntoNewSearch(card){
    if(!card)return false;
    var name=String(card.getAttribute('data-medication-name')||'').replace(/\s+/g,' ').trim();
    if(!name){
      var title=card.querySelector('strong,.gm-home-result-name,.gm-drug,h3,h4');
      name=String(title?title.textContent:'').replace(/\s+/g,' ').trim();
    }
    if(!name)return false;
    var input=document.querySelector('#gm-app-flow #gm-home-search');
    if(!input)return false;
    input.value=name;
    input.setAttribute('value',name);
    var panel=document.getElementById('gm-home-filter-results');
    if(panel){
      panel.classList.remove('gm-home-results-open');
      panel.setAttribute('aria-hidden','true');
    }
    try{input.blur();}catch(e){}
    return true;
  }

  function ensureStyle(){
    var old=document.getElementById('gm-direct-detail-style');
    if(old)old.remove();
    var style=document.createElement('style');
    style.id='gm-direct-detail-style';
    style.textContent=[
      '#gm-direct-opening-mask{display:none;position:fixed;inset:0;z-index:2147483646;background:rgba(255,247,250,.96);align-items:center;justify-content:center;flex-direction:column;gap:12px;color:#8a2857;font:700 16px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',
      '#gm-direct-opening-mask.gm-show{display:flex}',
      '.gm-direct-opening-spinner{width:34px;height:34px;border:4px solid #f7c9da;border-top-color:#ef4f91;border-radius:50%;animation:gmSpin .7s linear infinite}',
      '@keyframes gmSpin{to{transform:rotate(360deg)}}',
      'html.gm-direct-detail-open #gm-home-screen{display:flex!important;visibility:visible!important;opacity:1!important;z-index:2147481000!important}',
      'html.gm-direct-detail-open #gm-med-shell{background:transparent!important;pointer-events:none!important}',
      'html.gm-direct-detail-open #gm-med-shell>#gm-med-top,html.gm-direct-detail-open #gm-med-shell>#gm-med-body{display:none!important}',
      'html.gm-direct-detail-open #gm-med-modal{display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;z-index:2147483650!important}',
      'html.gm-direct-detail-open #gm-med-modal .gm-sheet{visibility:visible!important;opacity:1!important}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureMask(){
    var mask=document.getElementById('gm-direct-opening-mask');
    if(mask)return mask;
    mask=document.createElement('div');
    mask.id='gm-direct-opening-mask';
    mask.innerHTML='<div class="gm-direct-opening-spinner"></div><div>Abrindo medicamento…</div>';
    document.body.appendChild(mask);
    return mask;
  }

  function showPinkHome(){
    var home=document.getElementById('gm-home-screen');
    var welcome=document.getElementById('gm-welcome-screen');
    var panel=document.getElementById('gm-home-filter-results');
    if(welcome)welcome.classList.add('gm-welcome-hidden');
    if(panel)panel.classList.remove('gm-home-results-open');
    if(home){
      home.classList.remove('gm-home-hidden');
      home.style.setProperty('display','flex','important');
      home.style.setProperty('visibility','visible','important');
      home.style.setProperty('opacity','1','important');
    }
    document.documentElement.classList.add('gm-home-active');
    document.documentElement.classList.remove('gm-home-filter-mode');
  }

  function finishClose(){
    document.documentElement.classList.remove('gm-direct-detail-open');
    try{if(typeof window.GestaMedCloseMedication==='function')window.GestaMedCloseMedication();}catch(error){}
    showPinkHome();
  }

  function findExactCard(name){
    var target=normalize(name);
    var cards=Array.prototype.slice.call(document.querySelectorAll('#gm-med-body .gm-card[data-id]'));
    return cards.find(function(card){
      var title=card.querySelector('.gm-drug');
      return normalize(title?title.textContent:'')===target;
    })||null;
  }

  function waitForModuleAndOpen(name,mask){
    var attempts=0;
    (function tick(){
      attempts+=1;
      var shell=document.getElementById('gm-med-shell');
      var search=document.getElementById('gm-med-search');
      if(shell&&search){
        search.value=name;
        search.dispatchEvent(new Event('input',{bubbles:true}));
        var card=findExactCard(name);
        if(card){
          card.click();
          var detailAttempts=0;
          (function waitDetail(){
            detailAttempts+=1;
            var modal=document.getElementById('gm-med-modal');
            if(modal&&modal.classList.contains('open')){
              document.documentElement.classList.add('gm-direct-detail-open');
              showPinkHome();
              mask.classList.remove('gm-show');
              return;
            }
            if(detailAttempts<80)setTimeout(waitDetail,50);
            else mask.classList.remove('gm-show');
          })();
          return;
        }
      }
      if(attempts<100)setTimeout(tick,50);
      else mask.classList.remove('gm-show');
    })();
  }

  function openDirect(name){
    name=String(name||'').replace(/\s+/g,' ').trim();
    if(!name)return false;
    var mask=ensureMask();
    mask.classList.add('gm-show');
    showPinkHome();

    function launch(){
      try{if(typeof window.GestaMedOpenMedication==='function')window.GestaMedOpenMedication(name);}catch(e){}
      waitForModuleAndOpen(name,mask);
    }

    if(typeof window.GestaMedOpenMedication==='function'){
      launch();
      return true;
    }

    var tries=0;
    (function waitApi(){
      tries+=1;
      if(typeof window.GestaMedOpenMedication==='function'){
        launch();
        return;
      }
      if(tries<80)setTimeout(waitApi,50);
      else{
        /* fallback: tenta usar diretamente o módulo já presente na página */
        waitForModuleAndOpen(name,mask);
      }
    })();
    return true;
  }

  window.GestaMedOpenMedicationDirect=openDirect;

  ensureStyle();
  ensureMask();

  document.addEventListener('click',function(event){
    var card=event.target&&event.target.closest?event.target.closest('#gm-home-filter-results .gm-home-result-card'):null;
    if(!card)return;

    if(newHomeActive()){
      event.preventDefault();
      event.stopPropagation();
      if(event.stopImmediatePropagation)event.stopImmediatePropagation();
      selectIntoNewSearch(card);
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if(event.stopImmediatePropagation)event.stopImmediatePropagation();
    var name=String(card.getAttribute('data-medication-name')||'').trim();
    if(!name){var title=card.querySelector('strong');name=String(title?title.textContent:'').trim();}
    if(name)openDirect(name);
  },true);

  document.addEventListener('click',function(event){
    var close=event.target&&event.target.closest?event.target.closest('#gm-med-modal .gm-close'):null;
    if(!close)return;
    setTimeout(finishClose,0);
  },true);
})();