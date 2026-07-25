(function(){
  'use strict';
  var PATCH_ID='gestamed-medication-fda-badge-fix-2026-07-25-146';
  if(document.documentElement.getAttribute('data-gm-med-fda-fix')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-med-fda-fix',PATCH_ID);

  function normalizeBadge(){
    var badge=document.querySelector('#gm-med-modal.open .gm-fda');
    if(!badge)return;
    var raw=String(badge.textContent||'').trim().toUpperCase();
    var match=raw.match(/(?:^|\b)(A|B|C|D|X|N)(?:\b|$)/);
    var value=match?match[1]:'N';
    if(badge.textContent!==value)badge.textContent=value;
    badge.style.cssText+=';width:34px!important;min-width:34px!important;height:34px!important;flex:0 0 34px!important;white-space:nowrap!important;overflow:hidden!important;word-break:normal!important;';
  }

  document.addEventListener('click',function(event){
    if(event.target&&event.target.closest&&event.target.closest('.gm-card,.gm-sug')){
      window.setTimeout(normalizeBadge,30);
      window.setTimeout(normalizeBadge,120);
    }
  },false);

  document.addEventListener('touchend',function(event){
    if(event.target&&event.target.closest&&event.target.closest('.gm-card,.gm-sug')){
      window.setTimeout(normalizeBadge,30);
      window.setTimeout(normalizeBadge,120);
    }
  },false);
})();