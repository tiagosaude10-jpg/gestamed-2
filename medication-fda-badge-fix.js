(function(){
  'use strict';
  var PATCH_ID='gestamed-medication-fda-badge-fix-2026-07-25-145';
  if(document.documentElement.getAttribute('data-gm-med-fda-fix')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-med-fda-fix',PATCH_ID);

  function normalizeBadge(){
    var badge=document.querySelector('#gm-med-modal .gm-fda');
    if(!badge)return;
    var raw=String(badge.textContent||'').trim().toUpperCase();
    var match=raw.match(/(?:^|\b)(A|B|C|D|X|N)(?:\b|$)/);
    badge.textContent=match?match[1]:'N';
    badge.style.width='34px';
    badge.style.minWidth='34px';
    badge.style.height='34px';
    badge.style.flex='0 0 34px';
    badge.style.whiteSpace='nowrap';
    badge.style.overflow='hidden';
    badge.style.wordBreak='normal';
  }

  document.addEventListener('click',function(){
    window.setTimeout(normalizeBadge,0);
    window.setTimeout(normalizeBadge,80);
  },true);

  var observer=new MutationObserver(normalizeBadge);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  normalizeBadge();
})();