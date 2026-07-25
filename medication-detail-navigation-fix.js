(function(){
  'use strict';
  var PATCH_ID='gestamed-medication-detail-navigation-fix-2026-07-25-143';
  if(document.documentElement.getAttribute('data-gm-med-detail-fix')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-med-detail-fix',PATCH_ID);

  function installStyle(){
    if(document.getElementById('gm-med-detail-navigation-style'))return;
    var style=document.createElement('style');
    style.id='gm-med-detail-navigation-style';
    style.textContent=[
      '#gm-med-modal.gm-modal{background:#fff!important;align-items:stretch!important;}',
      '#gm-med-modal.gm-modal.open{display:block!important;}',
      '#gm-med-modal .gm-sheet{width:100%!important;height:100%!important;max-height:100%!important;border-radius:0!important;padding:calc(env(safe-area-inset-top,0px) + 18px) 18px calc(env(safe-area-inset-bottom,0px) + 24px)!important;background:#fff!important;position:relative!important;overflow:auto!important;box-sizing:border-box!important;}',
      '#gm-med-modal .gm-sheet-head{position:sticky!important;top:0!important;z-index:20!important;min-height:52px!important;background:#fff!important;padding-bottom:8px!important;}',
      '#gm-med-modal .gm-close{margin-left:auto!important;flex:0 0 auto!important;}',
      '#gm-med-modal .gm-detail{position:relative!important;z-index:1!important;}',
      '#gm-med-modal .gm-detail h2{padding-right:6px!important;line-height:1.2!important;word-break:break-word!important;}',
      '#gm-med-modal .gm-period{min-height:64px!important;}',
      '#gm-med-modal .gm-period .gm-badge{max-width:55%!important;white-space:normal!important;}'
    ].join('');
    document.head.appendChild(style);
  }

  function goHome(event){
    if(event){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();}
    var modal=document.getElementById('gm-med-modal');
    if(modal)modal.classList.remove('open');
    if(typeof window.GestaMedCloseMedication==='function'){
      window.GestaMedCloseMedication();
      return;
    }
    var shell=document.getElementById('gm-med-shell');
    if(shell)shell.style.display='none';
    document.body.style.overflow='';
    var home=document.getElementById('gm-home-screen');
    if(home)home.classList.remove('gm-home-hidden');
  }

  function install(){
    installStyle();
    var shell=document.getElementById('gm-med-shell');
    if(!shell)return false;
    if(shell.getAttribute('data-gm-detail-nav-fixed')==='143')return true;
    shell.setAttribute('data-gm-detail-nav-fixed','143');

    var close=shell.querySelector('#gm-med-modal .gm-close');
    if(close){
      close.addEventListener('click',goHome,true);
      close.addEventListener('touchend',goHome,true);
      close.setAttribute('aria-label','Fechar e voltar para a tela inicial');
    }

    var back=shell.querySelector('.gm-back');
    if(back){
      back.addEventListener('click',goHome,true);
      back.addEventListener('touchend',goHome,true);
    }

    var modal=shell.querySelector('#gm-med-modal');
    if(modal){
      modal.addEventListener('click',function(event){
        if(event.target===modal)goHome(event);
      },true);
    }
    return true;
  }

  document.addEventListener('click',function(event){
    var close=event.target&&event.target.closest?event.target.closest('#gm-med-modal .gm-close'):null;
    if(close)goHome(event);
  },true);

  var tries=0;
  (function boot(){tries+=1;if(install())return;if(tries<240)setTimeout(boot,100)})();
})();