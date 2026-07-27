(function(){
  'use strict';
  var PATCH_ID='gestamed-home-search-submit-2026-07-27-182';
  if(document.documentElement.getAttribute('data-gm-home-search-submit')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-search-submit',PATCH_ID);
  function install(){
    var field=document.getElementById('gm-home-search');
    if(!field)return false;
    field.setAttribute('enterkeyhint','search');
    field.setAttribute('autocomplete','off');
    field.style.setProperty('background','#ffffff','important');
    field.style.setProperty('border-radius','0','important');
    field.style.setProperty('left','15.2%','important');
    field.style.setProperty('width','68.2%','important');
    field.style.setProperty('padding-left','1.4%','important');
    field.style.setProperty('padding-right','2%','important');
    field.style.setProperty('box-sizing','border-box','important');
    field.style.setProperty('color','#3b2333','important');
    field.style.setProperty('font-weight','500','important');
    field.style.setProperty('-webkit-appearance','none','important');
    field.style.setProperty('appearance','none','important');
    return true;
  }
  var tries=0;(function start(){tries++;if(install())return;if(tries<120)setTimeout(start,100);})();
})();