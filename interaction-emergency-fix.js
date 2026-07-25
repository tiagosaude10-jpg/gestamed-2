(function(){
  'use strict';
  var PATCH_ID='gestamed-interaction-emergency-fix-2026-07-25-147';
  if(document.documentElement.getAttribute('data-gm-interaction-fix')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-interaction-fix',PATCH_ID);

  function apply(){
    var home=document.getElementById('gm-home-screen');
    var shell=document.getElementById('gm-med-shell');
    var modal=document.getElementById('gm-med-modal');

    if(home&&!home.classList.contains('gm-home-hidden')){
      home.style.setProperty('pointer-events','auto','important');
      home.style.setProperty('z-index','2147483000','important');
      if(shell){
        shell.style.setProperty('display','none','important');
        shell.style.setProperty('pointer-events','none','important');
      }
      if(modal){
        modal.classList.remove('open');
        modal.style.setProperty('display','none','important');
        modal.style.setProperty('pointer-events','none','important');
      }
    }else if(shell&&shell.style.display!=='none'){
      shell.style.setProperty('pointer-events','auto','important');
      if(modal&&modal.classList.contains('open')){
        modal.style.removeProperty('display');
        modal.style.setProperty('pointer-events','auto','important');
      }
    }

    ['gm-home-search','gm-home-search-clear','gm-home-search-button','gm-home-med-suggestions'].forEach(function(id){
      var el=document.getElementById(id);
      if(el)el.style.setProperty('pointer-events','auto','important');
    });
  }

  document.addEventListener('focusin',apply,false);
  document.addEventListener('input',apply,false);
  document.addEventListener('click',apply,false);
  document.addEventListener('touchstart',apply,false);
  window.setTimeout(apply,0);
  window.setTimeout(apply,300);
  window.setTimeout(apply,1000);
})();