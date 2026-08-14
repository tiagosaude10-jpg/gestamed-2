(function () {
  'use strict';

  var PATCH_ID = 'gestamed-medication-detail-responsive-2026-08-14-194';
  if (document.documentElement.getAttribute('data-gm-med-detail-responsive') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-med-detail-responsive', PATCH_ID);

  var oldStyle = document.getElementById('gm-med-detail-responsive-style');
  if (oldStyle) oldStyle.remove();

  var style = document.createElement('style');
  style.id = 'gm-med-detail-responsive-style';
  style.textContent = [
    '#modal .sheet,#modal #detail,#modal .grid,#modal .info{box-sizing:border-box!important;min-width:0!important;max-width:100%!important;}',
    '#modal .sheet{overflow-x:hidden!important;}',
    '#modal #detail,#modal .grid,#modal .info{overflow-x:clip!important;}',
    '#modal .period-row{box-sizing:border-box!important;display:grid!important;grid-template-columns:minmax(78px,28%) minmax(0,1fr)!important;align-items:start!important;gap:10px!important;width:100%!important;min-width:0!important;max-width:100%!important;}',
    '#modal .period-label{box-sizing:border-box!important;min-width:0!important;padding-top:5px!important;line-height:1.3!important;overflow-wrap:anywhere!important;word-break:normal!important;}',
    '#modal .period-row>.badge{box-sizing:border-box!important;display:block!important;width:100%!important;min-width:0!important;max-width:100%!important;flex:0 1 auto!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;line-height:1.35!important;text-align:center!important;}',
    '#modal .riskline{box-sizing:border-box!important;min-width:0!important;max-width:100%!important;overflow:hidden!important;}',
    '#modal .riskline>.badge{box-sizing:border-box!important;display:inline-block!important;width:auto!important;min-width:0!important;max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;line-height:1.35!important;}',
    '#modal .fda-legend,#modal .info p,#modal .info a{min-width:0!important;max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;}',
    '#gm-med-modal .gm-sheet,#gm-med-modal .gm-detail,#gm-med-modal .gm-periods,#gm-med-modal .gm-info{box-sizing:border-box!important;min-width:0!important;max-width:100%!important;overflow-x:hidden!important;}',
    '#gm-med-modal .gm-period{box-sizing:border-box!important;display:grid!important;grid-template-columns:minmax(78px,28%) minmax(0,1fr)!important;align-items:start!important;gap:10px!important;width:100%!important;min-width:0!important;max-width:100%!important;}',
    '#gm-med-modal .gm-period>strong{min-width:0!important;padding-top:5px!important;line-height:1.3!important;overflow-wrap:anywhere!important;}',
    '#gm-med-modal .gm-period>.gm-badge{box-sizing:border-box!important;display:block!important;width:100%!important;min-width:0!important;max-width:100%!important;flex:0 1 auto!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;line-height:1.35!important;text-align:center!important;}',
    '#gm-med-modal .gm-decision>.gm-badge,#gm-med-modal .gm-info p{box-sizing:border-box!important;min-width:0!important;max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;}',
    '@media(max-width:380px){#modal .period-row,#gm-med-modal .gm-period{grid-template-columns:minmax(72px,27%) minmax(0,1fr)!important;gap:8px!important;}#modal .period-row>.badge,#gm-med-modal .gm-period>.gm-badge{font-size:10px!important;padding:6px 7px!important;}}'
  ].join('');
  document.head.appendChild(style);
})();
