(function(){
  'use strict';
  var PATCH_ID='gestamed-home-filter-audit-2026-07-25-159';
  if(document.documentElement.getAttribute('data-gm-home-filter-audit')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-filter-audit',PATCH_ID);

  var redirects={
    'Dor':'Analgésicos',
    'Náuseas':'Antieméticos',
    'Vômitos':'Antieméticos',
    'Alergia':'Anti-histamínicos',
    'Constipação':'Laxantes'
  };

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  }

  function chipByLabel(label){
    return Array.prototype.find.call(document.querySelectorAll('.gm-home-filter-chip'),function(button){
      return normalize(button.getAttribute('aria-label')||button.textContent)===normalize(label);
    })||null;
  }

  function setVisibleActive(button,label){
    window.setTimeout(function(){
      document.querySelectorAll('.gm-home-filter-chip').forEach(function(item){item.classList.remove('gm-home-filter-active');});
      if(button)button.classList.add('gm-home-filter-active');
      var title=document.querySelector('#gm-home-filter-results .gm-home-results-head strong');
      if(title)title.textContent=label;
    },160);
  }

  document.addEventListener('click',function(event){
    var source=event.target&&event.target.closest?event.target.closest('.gm-home-filter-chip'):null;
    if(!source)return;
    var sourceLabel=source.getAttribute('aria-label')||source.textContent||'';
    var targetLabel=redirects[sourceLabel];
    if(!targetLabel)return;
    var target=chipByLabel(targetLabel);
    if(!target||target===source)return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    target.click();
    setVisibleActive(source,sourceLabel);
  },true);
})();
