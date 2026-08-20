(function () {
  'use strict';

  var PATCH_ID = 'gestamed-header-actions-2026-08-20-248';
  var IIC_MODULE_SRC = 'iic-cerclage-progesterone-module-v211.js?v=20260817-211';
  var HOME_GREETING_TEXT_SRC = 'home-greeting-text-v215.js?v=20260817-215';
  var HOME_MED_SEARCH_FIX_SRC = 'home-medication-search-mobile-fix-v215.js?v=20260817-301';
  var LEGAL_REGISTRATION_SRC = 'legal-registration-v215.js?v=20260817-221';
  var MOBILE_INPUT_SELECTION_FIX_SRC = 'mobile-input-selection-fix-v216.js?v=20260817-225';
  var REGISTER_MOBILE_SCROLL_FIX_SRC = 'register-mobile-scroll-fix-v217.js?v=20260817-224';
  var MOBILE_EMAIL_PASTE_FIX_SRC = 'mobile-email-paste-fix-v217.js?v=20260817-225';
  var HOME_DMG_INSULIN_LAYOUT_SRC = 'home-dmg-insulin-layout-v244.js?v=20260819-244';
  var DMG_TOP_BACK_FIX_SRC = 'gestational-diabetes-top-back-fix-v245.js?v=20260819-245';
  var DMG_DIAGNOSIS_SAFETY_SRC = 'gestational-diabetes-diagnosis-safety-v246.js?v=20260819-246';
  var DMG_INITIAL_SAFETY_SRC = 'gestational-diabetes-initial-safety-v247.js?v=20260819-247';
  var DMG_INSULIN_SAFETY_SRC = 'gestational-diabetes-insulin-safety-v248.js?v=20260820-248';

  function applyHeaderActions() {
    var header = document.querySelector('#gm-app-flow .gm-command-header');
    var actions = document.querySelector('#gm-app-flow .gm-command-actions');
    var logout = document.querySelector('#gm-app-flow .gm-command-logout');
    var notices = document.querySelector('#gm-app-flow .gm-command-notices');
    if (!header || !actions || !logout || !notices) return false;
    if (actions.parentElement !== header) header.appendChild(actions);
    logout.textContent = 'Sair';
    logout.setAttribute('aria-label', 'Sair da conta');
    logout.setAttribute('title', 'Sair');
    notices.setAttribute('aria-label', 'Abrir avisos');
    notices.setAttribute('title', 'Avisos');
    document.documentElement.setAttribute('data-gm-header-actions', PATCH_ID);
    return true;
  }

  function ensureStyle() {
    if (document.getElementById('gm-header-actions-v200-style')) return;
    var style = document.createElement('style');
    style.id = 'gm-header-actions-v200-style';
    style.textContent = [
      '#gm-app-flow .gm-command-header{padding-top:calc(env(safe-area-inset-top,0px) + 52px)!important;min-height:calc(255px + env(safe-area-inset-top,0px))!important;}',
      '#gm-app-flow .gm-command-actions{position:absolute!important;top:calc(env(safe-area-inset-top,0px) + 8px)!important;right:12px!important;bottom:auto!important;left:auto!important;z-index:20!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:8px!important;}',
      '#gm-app-flow .gm-command-action{display:flex!important;align-items:center!important;justify-content:center!important;height:36px!important;padding:0!important;border:1px solid rgba(201,43,96,.16)!important;border-radius:18px!important;background:rgba(255,255,255,.9)!important;box-shadow:0 4px 12px rgba(128,42,72,.1)!important;color:#b91f54!important;cursor:pointer!important;line-height:1!important;-webkit-tap-highlight-color:transparent!important;backdrop-filter:blur(8px)!important;}',
      '#gm-app-flow .gm-command-notices{width:36px!important;min-width:36px!important;font-size:17px!important;}',
      '#gm-app-flow .gm-command-logout{width:auto!important;min-width:60px!important;padding:0 15px!important;font-size:14px!important;font-weight:750!important;letter-spacing:.1px!important;}',
      '#gm-app-flow .gm-command-action:active{transform:scale(.96)!important;}',
      '#gm-app-flow .gm-command-action:focus-visible{outline:3px solid rgba(239,76,130,.25)!important;outline-offset:2px!important;}',
      '#gm-app-flow .gm-command-action-badge{top:-4px!important;right:-4px!important;}'
    ].join('');
    document.head.appendChild(style);
  }

  function loadOnce(id,src,module){if(document.getElementById(id))return;var s=document.createElement('script');s.id=id;s.src=src;s.async=false;s.setAttribute('data-gestamed-module',module);document.head.appendChild(s);}

  ensureStyle();
  loadOnce('gm-iic-cerclage-module-loader',IIC_MODULE_SRC,'iic-cerclage-progesterone-v211');
  loadOnce('gm-home-greeting-text-loader',HOME_GREETING_TEXT_SRC,'home-greeting-text-v215');

  /* RESTAURAÇÃO: usa somente a busca que estava funcional antes da reconstrução v300. */
  loadOnce('gm-home-med-search-fix-loader',HOME_MED_SEARCH_FIX_SRC,'home-medication-search-v228-restored');

  loadOnce('gm-legal-registration-loader',LEGAL_REGISTRATION_SRC,'legal-registration-v215');
  loadOnce('gm-mobile-input-selection-loader',MOBILE_INPUT_SELECTION_FIX_SRC,'mobile-input-selection-v216');
  loadOnce('gm-register-mobile-scroll-loader',REGISTER_MOBILE_SCROLL_FIX_SRC,'register-mobile-scroll-v217');
  loadOnce('gm-mobile-email-paste-loader',MOBILE_EMAIL_PASTE_FIX_SRC,'mobile-email-paste-v217');
  loadOnce('gm-home-dmg-insulin-layout-loader',HOME_DMG_INSULIN_LAYOUT_SRC,'home-dmg-insulin-layout-v244');
  loadOnce('gm-dmg-top-back-fix-loader',DMG_TOP_BACK_FIX_SRC,'gestational-diabetes-top-back-fix-v245');
  loadOnce('gm-dmg-diagnosis-safety-loader',DMG_DIAGNOSIS_SAFETY_SRC,'gestational-diabetes-diagnosis-safety-v246');
  loadOnce('gm-dmg-initial-safety-loader',DMG_INITIAL_SAFETY_SRC,'gestational-diabetes-initial-safety-v247');
  loadOnce('gm-dmg-insulin-safety-loader',DMG_INSULIN_SAFETY_SRC,'gestational-diabetes-insulin-safety-v248');

  var attempts = 0;
  function start() {
    attempts += 1;
    if (applyHeaderActions()) return;
    if (attempts < 120) window.setTimeout(start, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();