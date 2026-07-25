(function () {
  'use strict';

  var STYLE_ID = 'gestamed-search-input-size-only-style';
  var oldStyle = document.getElementById(STYLE_ID);
  if (oldStyle) oldStyle.remove();

  var style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = [
    '.gm-search-clear-host{',
    '  width:100%!important;',
    '  max-width:none!important;',
    '  flex:1 1 100%!important;',
    '}',
    '#searchInput,',
    'input[type="search"],',
    'input[placeholder*="medicamento" i],',
    'input[placeholder*="princípio" i],',
    'input[placeholder*="principio" i]{',
    '  display:block!important;',
    '  width:100%!important;',
    '  max-width:none!important;',
    '  min-width:0!important;',
    '  min-height:54px!important;',
    '  height:54px!important;',
    '  font-size:18px!important;',
    '  font-weight:500!important;',
    '  line-height:1.25!important;',
    '  padding-top:12px!important;',
    '  padding-bottom:12px!important;',
    '  padding-left:17px!important;',
    '  padding-right:64px!important;',
    '  box-sizing:border-box!important;',
    '}',
    '#searchInput::placeholder,',
    'input[type="search"]::placeholder,',
    'input[placeholder*="medicamento" i]::placeholder{',
    '  font-size:17px!important;',
    '  opacity:.8!important;',
    '}'
  ].join('');

  document.head.appendChild(style);
})();