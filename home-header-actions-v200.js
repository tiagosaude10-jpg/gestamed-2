(function () {
  'use strict';

  var PATCH_ID = 'gestamed-header-actions-2026-08-17-222';
  var IIC_MODULE_SRC = 'iic-cerclage-progesterone-module-v211.js?v=20260817-211';
  var ADMIN_ACCESS_FIX_SRC = 'admin-cid-labor-fix-v212.js?v=20260817-212';
  var RESOURCE_DEDUPE_SRC = 'resource-buttons-dedupe-v213.js?v=20260817-213';
  var ADMIN_MANAGER_SRC = 'admin-access-manager-v214.js?v=20260817-214';
  var HOME_GREETING_TEXT_SRC = 'home-greeting-text-v215.js?v=20260817-215';
  var HOME_MED_SEARCH_FIX_SRC = 'home-medication-search-mobile-fix-v215.js?v=20260817-219';
  var HOME_AUTOCOMPLETE_SYNC_SRC = 'home-medication-autocomplete-sync-v219.js?v=20260817-222';
  var LEGAL_REGISTRATION_SRC = 'legal-registration-v215.js?v=20260817-221';

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
  loadOnce('gm-admin-cid-labor-fix-loader',ADMIN_ACCESS_FIX_SRC,'admin-cid-labor-v212');
  loadOnce('gm-resource-buttons-dedupe-loader',RESOURCE_DEDUPE_SRC,'resource-buttons-dedupe-v213');
  loadOnce('gm-admin-access-manager-loader',ADMIN_MANAGER_SRC,'admin-access-manager-v214');
  loadOnce('gm-home-greeting-text-loader',HOME_GREETING_TEXT_SRC,'home-greeting-text-v215');
  loadOnce('gm-home-med-search-fix-loader',HOME_MED_SEARCH_FIX_SRC,'home-medication-search-v219');
  loadOnce('gm-home-med-autocomplete-sync-loader',HOME_AUTOCOMPLETE_SYNC_SRC,'home-medication-autocomplete-sync-v220');
  loadOnce('gm-legal-registration-loader',LEGAL_REGISTRATION_SRC,'legal-registration-v215');

  var attempts = 0;
  function start() {
    attempts += 1;
    if (applyHeaderActions()) return;
    if (attempts < 120) window.setTimeout(start, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();