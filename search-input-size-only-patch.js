(function () {
  'use strict';

  var STYLE_ID = 'gestamed-search-input-size-only-style';
  var oldStyle = document.getElementById(STYLE_ID);
  if (oldStyle) oldStyle.remove();

  var style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = [
    '#searchInput,',
    'input[type="search"],',
    'input[placeholder*="medicamento" i],',
    'input[placeholder*="princípio" i],',
    'input[placeholder*="principio" i]{',
    '  min-height:60px!important;',
    '  height:60px!important;',
    '  font-size:18px!important;',
    '  line-height:1.25!important;',
    '  padding-top:14px!important;',
    '  padding-bottom:14px!important;',
    '  padding-left:18px!important;',
    '  box-sizing:border-box!important;',
    '}'
  ].join('');

  document.head.appendChild(style);
})();
