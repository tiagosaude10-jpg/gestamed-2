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
    '  min-height:64px!important;',
    '  height:64px!important;',
    '  font-size:22px!important;',
    '  font-weight:600!important;',
    '  line-height:1.25!important;',
    '  padding-top:15px!important;',
    '  padding-bottom:15px!important;',
    '  padding-left:20px!important;',
    '  padding-right:70px!important;',
    '  box-sizing:border-box!important;',
    '}',
    '#searchInput::placeholder,',
    'input[type="search"]::placeholder,',
    'input[placeholder*="medicamento" i]::placeholder{',
    '  font-size:20px!important;',
    '  opacity:.8!important;',
    '}'
  ].join('');

  document.head.appendChild(style);
})();