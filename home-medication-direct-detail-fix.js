(function(){
  'use strict';
  var PATCH_ID='gestamed-home-medication-direct-detail-2026-07-25-165';
  document.documentElement.setAttribute('data-gm-direct-detail',PATCH_ID);

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  }

  function findSearchInput(){
    return document.querySelector('#searchInput, input[type="search"]:not(#gm-home-search), input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function ensureOpeningMask(){
    var mask=document.getElementById('gm-direct-opening-mask');
    if(mask)return mask;
    mask=document.createElement('div');
    mask.id='gm-direct-opening-mask';
    mask.innerHTML='<div class="gm-direct-opening-spinner"></div><div>Abrindo medicamento…</div>';
    document.body.appendChild(mask);
    if(!document.getElementById('gm-direct-opening-style')){
      var style=document.createElement('style');
      style.id='gm-direct-opening-style';
      style.textContent='#gm-direct-opening-mask{display:none;position:fixed;inset:0;z-index:2147483646;background:#fff7fa;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:#8a2857;font:700 16px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}#gm-direct-opening-mask.gm-show{display:flex}.gm-direct-opening-spinner{width:34px;height:34px;border:4px solid #f7c9da;border-top-color:#ef4f91;border-radius:50%;animation:gmSpin .7s linear infinite}@keyframes gmSpin{to{transform:rotate(360deg)}}';
      document.head.appendChild(style);
    }
    return mask;
  }

  function setSearch(name){
    var original=findSearchInput();
    if(!original)return false;
    original.value=name;
    ['input','change','keyup'].forEach(function(type){
      original.dispatchEvent(new Event(type,{bubbles:true}));
    });
    try{
      original.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true}));
      original.dispatchEvent(new KeyboardEvent('keyup',{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true}));
    }catch(error){}
    try{if(typeof applyFilters==='function')applyFilters();}catch(error){}
    return true;
  }

  function hideHomeAndOldHeader(){
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
    var nodes=Array.prototype.slice.call(document.querySelectorAll('button,a,[role="button"],li,article,div'));
    var candidates=nodes.filter(function(el){
      if(!el||!el.isConnected)return false;
      if(el.closest&&el.closest('#gm-home-screen,#gm-welcome-screen,#gm-home-filter-results,#gm-direct-opening-mask'))return false;
      var raw=String(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();
      if(!raw||raw.length>260)return false;
      var text=normalize(raw);
      var firstLine=normalize(String(el.innerText||el.textContent||'').split(/\n/)[0]);
      return firstLine===target||text===target||text.indexOf(target+' ')===0;
    });
    candidates.sort(function(a,b){
      var aClickable=(a.matches('button,a,[role="button"]')?0:1);
      var bClickable=(b.matches('button,a,[role="button"]')?0:1);
      if(aClickable!==bClickable)return aClickable-bClickable;
      return String(a.textContent||'').length-String(b.textContent||'').length;
    });
    var found=candidates[0]||null;
    if(found&&!found.matches('button,a,[role="button"]')){
      found=found.closest('button,a,[role="button"]')||found;
    }
    return found;
  }

  function closeMaskWhenDetailAppears(mask){
    var tries=0;
    (function watch(){
      tries+=1;
      var modal=document.querySelector('[role="dialog"],.modal,.drug-modal,.medication-modal,.details-modal');
      var text=modal?normalize(modal.innerText||modal.textContent||''):'';
      if(modal&&text&&text.indexOf('classificacao por periodo')!==-1){
        mask.classList.remove('gm-show');
        return;
      }
      if(tries<50)setTimeout(watch,80);else mask.classList.remove('gm-show');
    })();
  }

  function openDirect(name){
    var mask=ensureOpeningMask();
    mask.classList.add('gm-show');
    hideHomeAndOldHeader();
    if(!setSearch(name)){
      mask.classList.remove('gm-show');
      return;
    }
    var attempts=0;
    (function tryOpen(){
      attempts+=1;
      var result=findExactMedication(name);
      if(result){
        try{result.click();}catch(error){
          try{result.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}catch(ignore){}
        }
        closeMaskWhenDetailAppears(mask);
        return;
      }
      if(attempts<60)setTimeout(tryOpen,60);
      else mask.classList.remove('gm-show');
    })();
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