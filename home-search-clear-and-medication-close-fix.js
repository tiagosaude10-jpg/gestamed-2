(function(){
  'use strict';
  var PATCH_ID='gestamed-home-clear-close-2026-07-25-144';
  if(document.documentElement.getAttribute('data-gm-home-clear-close')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-clear-close',PATCH_ID);

  function forceHome(){
    var modal=document.getElementById('gm-med-modal');
    var shell=document.getElementById('gm-med-shell');
    var suggestions=document.getElementById('gm-home-med-suggestions');
    var welcome=document.getElementById('gm-welcome-screen');
    var home=document.getElementById('gm-home-screen');
    if(modal)modal.classList.remove('open');
    if(shell){shell.style.setProperty('display','none','important');}
    if(suggestions){suggestions.classList.remove('open');suggestions.innerHTML='';}
    if(welcome)welcome.classList.add('gm-welcome-hidden');
    if(home){
      home.classList.remove('gm-home-hidden');
      home.style.removeProperty('display');
      home.scrollTop=0;
    }
    document.body.style.overflow='';
    document.documentElement.classList.add('gm-home-active');
    var field=document.getElementById('gm-home-search');
    if(field){field.value='';field.dispatchEvent(new Event('input',{bubbles:true}));}
  }

  function clearHomeSearch(event){
    if(event){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();}
    var field=document.getElementById('gm-home-search');
    var suggestions=document.getElementById('gm-home-med-suggestions');
    if(field){field.value='';field.dispatchEvent(new Event('input',{bubbles:true}));field.focus();}
    if(suggestions){suggestions.classList.remove('open');suggestions.innerHTML='';}
    updateClearButton();
  }

  function updateClearButton(){
    var field=document.getElementById('gm-home-search');
    var button=document.getElementById('gm-home-search-clear');
    if(button&&field)button.style.display=field.value.trim()?'flex':'none';
  }

  function installClearButton(){
    var field=document.getElementById('gm-home-search');
    var canvas=document.getElementById('gm-home-canvas');
    if(!field||!canvas)return false;
    var button=document.getElementById('gm-home-search-clear');
    if(!button){
      button=document.createElement('button');
      button.id='gm-home-search-clear';
      button.type='button';
      button.setAttribute('aria-label','Limpar pesquisa');
      button.textContent='×';
      button.style.cssText='position:absolute;z-index:45;right:10.5%;top:24.72%;width:8.2%;height:4.2%;display:none;align-items:center;justify-content:center;border:0;background:transparent;color:#d73378;font:500 clamp(24px,5vw,36px)/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent;';
      button.addEventListener('click',clearHomeSearch,true);
      button.addEventListener('touchend',clearHomeSearch,true);
      canvas.appendChild(button);
    }
    if(field.getAttribute('data-gm-clear-installed')!=='144'){
      field.setAttribute('data-gm-clear-installed','144');
      field.style.paddingRight='19%';
      field.addEventListener('input',updateClearButton,true);
      field.addEventListener('search',function(){setTimeout(updateClearButton,0)},true);
    }
    updateClearButton();
    return true;
  }

  function installMedicationClose(){
    var shell=document.getElementById('gm-med-shell');
    if(!shell)return false;
    var close=shell.querySelector('#gm-med-modal .gm-close');
    var back=shell.querySelector('.gm-back');
    if(close&&close.getAttribute('data-gm-force-home')!=='144'){
      close.setAttribute('data-gm-force-home','144');
      close.addEventListener('click',function(e){forceHome();e.preventDefault();e.stopImmediatePropagation();},true);
      close.addEventListener('touchend',function(e){forceHome();e.preventDefault();e.stopImmediatePropagation();},true);
    }
    if(back&&back.getAttribute('data-gm-force-home')!=='144'){
      back.setAttribute('data-gm-force-home','144');
      back.addEventListener('click',function(e){forceHome();e.preventDefault();e.stopImmediatePropagation();},true);
      back.addEventListener('touchend',function(e){forceHome();e.preventDefault();e.stopImmediatePropagation();},true);
    }
    window.GestaMedCloseMedication=forceHome;
    return true;
  }

  document.addEventListener('click',function(event){
    var target=event.target&&event.target.closest?event.target.closest('#gm-med-modal .gm-close,#gm-med-shell .gm-back'):null;
    if(target){forceHome();event.preventDefault();event.stopImmediatePropagation();}
  },true);

  var tries=0;
  (function boot(){tries+=1;installClearButton();installMedicationClose();if(tries<300)setTimeout(boot,100)})();
})();