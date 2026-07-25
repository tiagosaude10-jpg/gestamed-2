(function(){
  'use strict';
  var PATCH_ID='gestamed-home-medication-direct-detail-2026-07-25-169';
  document.documentElement.setAttribute('data-gm-direct-detail',PATCH_ID);

  var movedDetail=null;
  var originalParent=null;
  var originalNextSibling=null;

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  }

  function ensureStyle(){
    var old=document.getElementById('gm-direct-detail-style');
    if(old)old.remove();
    var style=document.createElement('style');
    style.id='gm-direct-detail-style';
    style.textContent=[
      '#gm-direct-opening-mask{display:none;position:fixed;inset:0;z-index:2147483646;background:rgba(255,247,250,.97);align-items:center;justify-content:center;flex-direction:column;gap:12px;color:#8a2857;font:700 16px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',
      '#gm-direct-opening-mask.gm-show{display:flex}',
      '.gm-direct-opening-spinner{width:34px;height:34px;border:4px solid #f7c9da;border-top-color:#ef4f91;border-radius:50%;animation:gmSpin .7s linear infinite}',
      '@keyframes gmSpin{to{transform:rotate(360deg)}}',
      'html.gm-direct-detail-open #gm-home-screen{display:flex!important;visibility:visible!important;opacity:1!important;z-index:2147481000!important}',
      'html.gm-direct-detail-open body>*:not(#gm-home-screen):not(.gm-direct-detail-modal):not(#gm-direct-opening-mask){visibility:hidden!important}',
      'html.gm-direct-detail-open .gm-direct-detail-modal{visibility:visible!important;opacity:1!important;z-index:2147483000!important}',
      'html.gm-direct-detail-open .gm-direct-detail-modal *{visibility:visible!important}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureOpeningMask(){
    var mask=document.getElementById('gm-direct-opening-mask');
    if(mask)return mask;
    mask=document.createElement('div');
    mask.id='gm-direct-opening-mask';
    mask.innerHTML='<div class="gm-direct-opening-spinner"></div><div>Abrindo medicamento…</div>';
    document.body.appendChild(mask);
    return mask;
  }

  function keepPinkHomeVisible(){
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

  function findSearchInput(){
    return document.querySelector('#searchInput, input[type="search"]:not(#gm-home-search), input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function setSearch(name){
    var original=findSearchInput();
    if(!original)return false;
    original.value=name;
    ['input','change','keyup'].forEach(function(type){original.dispatchEvent(new Event(type,{bubbles:true}));});
    try{if(typeof applyFilters==='function')applyFilters();}catch(error){}
    return true;
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
      var ac=a.matches('button,a,[role="button"]')?0:1;
      var bc=b.matches('button,a,[role="button"]')?0:1;
      if(ac!==bc)return ac-bc;
      return String(a.textContent||'').length-String(b.textContent||'').length;
    });
    var found=candidates[0]||null;
    if(found&&!found.matches('button,a,[role="button"]'))found=found.closest('button,a,[role="button"]')||found;
    return found;
  }

  function hasDetailText(node){
    var text=normalize(node&&node.innerText||node&&node.textContent||'');
    return text.indexOf('decisao resumida')!==-1 || text.indexOf('classificacao por periodo')!==-1 || text.indexOf('posologia de referencia')!==-1;
  }

  function findDetailContainer(){
    var preferred=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],dialog,.modal,.drug-modal,.medication-modal,.details-modal,[class*="sheet"],[class*="drawer"]'));
    var found=preferred.find(function(node){
      if(!node||!node.isConnected||!hasDetailText(node))return false;
      var rect=node.getBoundingClientRect();
      return rect.width>80&&rect.height>120;
    });
    if(found)return found;
    return Array.prototype.slice.call(document.querySelectorAll('section,article,div')).filter(function(node){
      if(!node||!node.isConnected||!hasDetailText(node))return false;
      var rect=node.getBoundingClientRect();
      return rect.width>80&&rect.height>120;
    }).sort(function(a,b){return a.getBoundingClientRect().height-b.getBoundingClientRect().height;})[0]||null;
  }

  function promoteDetail(detail){
    if(!detail)return;
    movedDetail=detail;
    originalParent=detail.parentNode;
    originalNextSibling=detail.nextSibling;
    detail.classList.add('gm-direct-detail-modal');
    if(detail.parentNode!==document.body)document.body.appendChild(detail);
    detail.style.setProperty('z-index','2147483000','important');
    document.documentElement.classList.add('gm-direct-detail-open');
    keepPinkHomeVisible();
  }

  function restoreDetail(){
    document.documentElement.classList.remove('gm-direct-detail-open');
    if(movedDetail){
      movedDetail.classList.remove('gm-direct-detail-modal');
      movedDetail.style.removeProperty('z-index');
      if(originalParent&&originalParent.isConnected){
        try{
          if(originalNextSibling&&originalNextSibling.parentNode===originalParent)originalParent.insertBefore(movedDetail,originalNextSibling);
          else originalParent.appendChild(movedDetail);
        }catch(error){}
      }
    }
    movedDetail=null;
    originalParent=null;
    originalNextSibling=null;
    keepPinkHomeVisible();
  }

  function watchClose(){
    var tries=0;
    (function tick(){
      tries+=1;
      if(!movedDetail)return;
      var rect=movedDetail.getBoundingClientRect();
      var cs=getComputedStyle(movedDetail);
      var closed=!movedDetail.isConnected||cs.display==='none'||cs.visibility==='hidden'||rect.width<20||rect.height<40||!hasDetailText(movedDetail);
      if(closed){restoreDetail();return;}
      if(tries<7200)setTimeout(tick,100);
    })();
  }

  function openDirect(name){
    var mask=ensureOpeningMask();
    keepPinkHomeVisible();
    mask.classList.add('gm-show');
    if(!setSearch(name)){mask.classList.remove('gm-show');return;}
    var attempts=0;
    (function findAndOpen(){
      attempts+=1;
      var result=findExactMedication(name);
      if(result){
        try{result.click();}catch(error){try{result.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}catch(ignore){}}
        var detailAttempts=0;
        (function waitDetail(){
          detailAttempts+=1;
          var detail=findDetailContainer();
          if(detail){
            promoteDetail(detail);
            mask.classList.remove('gm-show');
            watchClose();
            return;
          }
          if(detailAttempts<80)setTimeout(waitDetail,60);
          else mask.classList.remove('gm-show');
        })();
        return;
      }
      if(attempts<60)setTimeout(findAndOpen,60);
      else mask.classList.remove('gm-show');
    })();
  }

  ensureStyle();
  ensureOpeningMask();

  document.addEventListener('click',function(event){
    var card=event.target&&event.target.closest?event.target.closest('#gm-home-filter-results .gm-home-result-card'):null;
    if(!card)return;
    event.preventDefault();
    event.stopPropagation();
    if(event.stopImmediatePropagation)event.stopImmediatePropagation();
    var name=String(card.getAttribute('data-medication-name')||'').trim();
    if(!name){var title=card.querySelector('strong');name=String(title?title.textContent:'').trim();}
    if(name)openDirect(name);
  },true);
})();