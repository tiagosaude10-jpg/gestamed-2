(function(){
  'use strict';
  var PATCH_ID='gestamed-home-search-submit-2026-07-25-142';
  if(document.documentElement.getAttribute('data-gm-home-search-submit')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-search-submit',PATCH_ID);
  function install(){
    var field=document.getElementById('gm-home-search');
    if(!field)return false;
    field.setAttribute('enterkeyhint','search');
    field.setAttribute('autocomplete','off');
    field.style.background='rgba(255,255,255,.96)';
    field.style.borderRadius='999px';
    field.style.paddingLeft='5%';
    field.style.paddingRight='12%';
    field.style.boxSizing='border-box';
    field.style.color='#3b2333';
    field.style.fontWeight='500';
    return true;
  }
  var tries=0;(function start(){tries++;if(install())return;if(tries<120)setTimeout(start,100);})();
})();