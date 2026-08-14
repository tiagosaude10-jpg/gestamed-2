(function () {
  'use strict';

  var PATCH_ID = 'gestamed-entry-flow-2026-08-14-190';
  var CID_URL = 'https://laboratoriocid.com.br/logins/login';
  if (document.documentElement.getAttribute('data-gm-entry-flow') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-entry-flow', PATCH_ID);

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function removeLegacyEntryLayers() {
    ['gm-welcome-screen', 'gm-home-screen', 'gm-login-screen', 'gm-app-flow'].forEach(function (id) {
      var node = document.getElementById(id);
      if (node) node.remove();
    });
    ['gm-home-screen-style', 'gm-entry-flow-style'].forEach(function (id) {
      var node = document.getElementById(id);
      if (node) node.remove();
    });
    document.documentElement.classList.remove('gm-home-active');
    document.body.classList.remove('gm-flow-active');
  }

  function findTarget(labels) {
    var candidates = Array.prototype.slice.call(document.querySelectorAll('button, a, [role="button"], [onclick]'));
    var wanted = labels.map(normalize);
    return candidates.find(function (element) {
      if (element.closest && element.closest('#gm-app-flow')) return false;
      var text = normalize((element.getAttribute('aria-label') || '') + ' ' + (element.getAttribute('title') || '') + ' ' + (element.textContent || ''));
      return wanted.some(function (label) { return text === label || text.indexOf(label) !== -1; });
    }) || null;
  }

  function findSearchInput() {
    return document.querySelector('#searchInput, input[type="search"], input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function dispatchInput(input) {
    ['input', 'change', 'keyup'].forEach(function (type) { input.dispatchEvent(new Event(type, { bubbles: true })); });
    try { if (typeof applyFilters === 'function') applyFilters(); } catch (error) {}
  }

  function hideFlow() {
    var flow = document.getElementById('gm-app-flow');
    if (flow) flow.classList.add('gm-flow-hidden');
    document.body.classList.remove('gm-flow-active');
  }

  function setFlowScreen(name) {
    var flow = document.getElementById('gm-app-flow');
    if (!flow) return;
    flow.classList.remove('gm-flow-hidden');
    flow.setAttribute('data-screen', name);
    flow.querySelectorAll('.gm-flow-screen').forEach(function (screen) {
      screen.classList.toggle('gm-screen-active', screen.getAttribute('data-screen') === name);
    });
    document.body.classList.add('gm-flow-active');
    var active = flow.querySelector('.gm-flow-screen.gm-screen-active');
    if (active) active.scrollTop = 0;
  }

  function showHome() { setFlowScreen('home'); }

  function activate(labels) {
    var target = findTarget(labels);
    if (!target) return false;
    hideFlow();
    window.setTimeout(function () { try { target.click(); } catch (error) {} }, 20);
    return true;
  }

  function openExternal(url) {
    var opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  }

  function showDevelopmentMessage(label) {
    var old = document.getElementById('gm-home-dev-message');
    if (old) old.remove();
    var overlay = document.createElement('div');
    overlay.id = 'gm-home-dev-message';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = '<div class="gm-home-dev-card"><div class="gm-home-dev-icon">🛠️</div><strong>' + label + '</strong><p>Módulo em desenvolvimento.</p><button type="button">Entendi</button></div>';
    function close() { overlay.remove(); }
    overlay.addEventListener('click', function (event) { if (event.target === overlay || event.target.tagName === 'BUTTON') close(); });
    document.body.appendChild(overlay);
  }

  function ensureStyle() {
    var style = document.createElement('style');
    style.id = 'gm-entry-flow-style';
    style.textContent = [
      'body.gm-flow-active{overflow:hidden!important;}',
      'body.gm-flow-active>*:not(#gm-app-flow):not(script):not(style){visibility:hidden!important;pointer-events:none!important;}',
      '#gm-app-flow{position:fixed;inset:0;z-index:2147483100;background:#f5dce3;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:#681b36;}',
      '#gm-app-flow.gm-flow-hidden{display:none!important;}',
      '.gm-flow-screen{position:absolute;inset:0;display:none;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;}',
      '.gm-flow-screen.gm-screen-active{display:flex;}',
      '.gm-screen-shell{position:relative;width:min(100%,520px);min-height:100%;margin:0 auto;background:#fff1f4 url("gestamed-background-clean.jpg?v=190") center/cover no-repeat;overflow:hidden;box-shadow:0 0 40px rgba(98,37,65,.12);}',
      '.gm-welcome-shell{display:flex;flex-direction:column;align-items:center;padding:max(22px,env(safe-area-inset-top)) 28px max(20px,env(safe-area-inset-bottom));}',
      '.gm-brand{text-align:center;}.gm-brand-symbol{display:block;width:74px;height:82px;margin:0 auto -2px;object-fit:cover;mix-blend-mode:multiply;}',
      '.gm-brand-name{margin:0;color:#ef6682;font-size:clamp(42px,11vw,58px);font-weight:300;letter-spacing:-2.8px;line-height:1;}.gm-brand-name b{color:#c7144f;font-weight:650;}',
      '.gm-brand-subtitle{margin:13px 0 0;color:#6d243b;font-size:13px;font-weight:650;line-height:1.42;letter-spacing:1.9px;text-transform:uppercase;}',
      '.gm-heart-divider{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:8px;color:#ed6485;font-size:14px;}.gm-heart-divider:before,.gm-heart-divider:after{content:"";width:45px;height:1px;background:rgba(160,57,88,.25);}',
      '.gm-hero-art{display:block;width:min(100%,355px);aspect-ratio:487/475;margin:3px auto 0;object-fit:cover;mix-blend-mode:multiply;border-radius:48% 48% 44% 44%;}',
      '.gm-welcome-start-slot{width:100%;margin:4px 0 13px;}.gm-welcome-message{margin:0 0 13px;color:#b71d50;text-align:center;font-size:clamp(21px,5.8vw,28px);font-weight:750;line-height:1.18;}',
      '.gm-features{width:100%;display:grid;grid-template-columns:repeat(3,1fr);margin:0 auto 17px;}.gm-feature{min-width:0;display:flex;flex-direction:column;align-items:center;gap:5px;padding:0 8px;color:#6d2039;text-align:center;font-size:12px;line-height:1.22;}.gm-feature+.gm-feature{border-left:1px solid rgba(177,49,88,.2);}',
      '.gm-feature-icon{width:47px;height:47px;display:grid;place-items:center;border:1.5px solid #cb3f68;border-radius:50%;color:#cb3f68;font-size:24px;font-weight:400;}.gm-welcome-actions{width:100%;margin-top:auto;}',
      '.gm-primary-button{width:100%;min-height:60px;border:0;border-radius:22px;color:#fff;background:linear-gradient(105deg,#d40d4e 0%,#ea3f65 48%,#ff786e 100%);box-shadow:0 10px 24px rgba(194,25,78,.25);cursor:pointer;font-size:21px;font-weight:550;}',
      '.gm-login-link{display:block;margin:16px auto 0;padding:4px 8px;border:0;color:#651b35;background:transparent;cursor:pointer;font-size:15px;}.gm-login-link b{color:#d82f62;}.gm-author{margin:10px 0 0;color:#ce5780;font-size:12px;}',
      '.gm-login-shell{display:grid;place-items:center;padding:70px 28px 32px;}.gm-back-button{position:absolute;z-index:2;top:max(20px,env(safe-area-inset-top));left:22px;width:43px;height:43px;border:1px solid rgba(180,31,79,.16);border-radius:50%;color:#b8184d;background:rgba(255,255,255,.72);box-shadow:0 6px 18px rgba(115,32,59,.08);cursor:pointer;font-size:34px;line-height:1;}',
      '.gm-login-card{width:100%;padding:28px 24px 24px;border:1px solid rgba(255,255,255,.8);border-radius:32px;background:rgba(255,250,251,.78);box-shadow:0 22px 55px rgba(117,34,59,.13);backdrop-filter:blur(12px);text-align:center;}.gm-login-logo{width:104px;height:103px;border-radius:27px;box-shadow:0 8px 22px rgba(184,33,78,.15);}.gm-login-card h1{margin:17px 0 6px;color:#86143d;font-size:26px;letter-spacing:-.6px;}.gm-login-card>p{margin:0;color:#815165;font-size:14px;}.gm-login-card form{margin-top:25px;text-align:left;}.gm-login-card label{display:block;margin:15px 0 7px;color:#6d2039;font-size:13px;font-weight:750;}',
      '.gm-login-card input{box-sizing:border-box;width:100%;height:52px;padding:0 15px;border:1px solid rgba(162,64,96,.2);border-radius:15px;outline:none;color:#5b2035;background:rgba(255,255,255,.88);}.gm-login-card input:focus{border-color:#e4517a;box-shadow:0 0 0 4px rgba(228,81,122,.12);}.gm-password-field{position:relative;}.gm-password-field input{padding-right:78px;}.gm-password-toggle{position:absolute;top:0;right:7px;height:52px;border:0;color:#c92a5d;background:transparent;cursor:pointer;font-size:12px;font-weight:750;}.gm-forgot{display:block;margin:12px 0 0 auto;border:0;color:#bd2857;background:transparent;cursor:pointer;font-size:12px;}.gm-login-submit{min-height:53px;margin-top:19px;border-radius:16px;font-size:17px;}.gm-form-error{display:none;margin:12px 0 0;padding:9px 11px;border-radius:10px;color:#8f183d;background:#ffe1e8;font-size:12px;text-align:left;}.gm-form-error.gm-error-visible{display:block;}.gm-register{margin-top:19px!important;}.gm-register button{border:0;color:#c92458;background:transparent;cursor:pointer;font-weight:750;}',
      '.gm-home-shell{box-sizing:border-box;position:relative;width:min(100%,600px);min-height:100%;margin:0 auto;padding:0 14px max(18px,env(safe-area-inset-bottom));background:#fff4f7 url("gestamed-background-clean.jpg?v=190") center top/cover no-repeat;box-shadow:0 0 40px rgba(98,37,65,.12);color:#17233c;}',
      '.gm-command-header{box-sizing:border-box;position:relative;display:grid;grid-template-columns:minmax(0,60%) minmax(0,40%);grid-template-rows:auto 1fr;grid-template-areas:"brand clinician" "greeting clinician";min-height:216px;margin:0 -14px 12px;padding:13px 14px 10px;overflow:hidden;border-radius:0 0 26px 26px;background:linear-gradient(135deg,rgba(255,251,252,.78),rgba(255,224,235,.76));box-shadow:0 8px 22px rgba(174,53,94,.08);}.gm-command-header:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 84% 24%,rgba(255,255,255,.42),transparent 34%),radial-gradient(circle at 7% 4%,rgba(242,119,154,.12),transparent 25%);pointer-events:none;}.gm-command-brand-area{grid-area:brand;position:relative;z-index:2;min-width:0;text-align:center;}.gm-command-brand-row{display:flex;align-items:center;justify-content:center;gap:5px;}.gm-command-logo{width:48px;height:56px;object-fit:contain;}.gm-command-name{margin:0;color:#ef6d90;font-size:clamp(29px,8vw,45px);font-weight:300;letter-spacing:-1.8px;line-height:1;white-space:nowrap;}.gm-command-name b{color:#d40b50;font-weight:720;}.gm-command-tagline{margin:2px 0 0;color:#92506a;font-size:clamp(8px,2.1vw,12px);font-weight:750;line-height:1.35;letter-spacing:.3px;text-transform:uppercase;}.gm-command-heart{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:3px;color:#ef4c82;font-size:11px;}.gm-command-heart:before,.gm-command-heart:after{content:"";width:28px;height:1px;background:#ecabc0;}.gm-command-clinician{grid-area:clinician;position:relative;z-index:1;align-self:stretch;min-width:0;pointer-events:none;}.gm-command-clinician img{position:absolute;right:-4px;bottom:-13px;width:118%;height:calc(100% + 8px);object-fit:contain;object-position:right bottom;user-select:none;-webkit-user-drag:none;}.gm-command-greeting{grid-area:greeting;position:relative;z-index:2;align-self:end;min-width:0;padding:8px 3px 0;}.gm-command-greeting h2{margin:0;color:#121b31;font-size:clamp(18px,5vw,27px);line-height:1.08;white-space:nowrap;}.gm-command-greeting h2 span{color:#f04c80;}.gm-command-greeting p{max-width:245px;margin:5px 0 0;color:#26324a;font-size:clamp(11px,3.15vw,15px);line-height:1.35;}',
      '.gm-command-search{box-sizing:border-box;position:relative;z-index:4;display:grid;grid-template-columns:42px minmax(0,1fr) 45px;align-items:center;width:100%;height:54px;margin:0 0 12px;border:1px solid rgba(234,93,137,.18);border-radius:22px;background:rgba(255,255,255,.94);box-shadow:0 7px 20px rgba(191,42,91,.09);overflow:hidden;}.gm-command-search button{height:100%;border:0;background:transparent;color:#ef1760;cursor:pointer;font-size:23px;}.gm-command-search input{box-sizing:border-box;min-width:0;width:100%;height:100%;padding:0;border:0;outline:0;background:transparent;color:#26324a;font-size:14px;}.gm-command-search input::placeholder{color:#a59ea3;text-overflow:ellipsis;}.gm-command-filter-button{border-left:1px solid rgba(234,93,137,.1)!important;font-size:21px!important;}',
      '.gm-command-filter-row{display:flex;gap:8px;margin:0 -1px 14px;padding:2px 1px 4px;overflow-x:auto;scrollbar-width:none;}.gm-command-filter-row::-webkit-scrollbar{display:none;}.gm-command-filter-chip{flex:0 0 auto;min-width:88px;height:40px;padding:0 12px;border:1px solid rgba(116,151,174,.24);border-radius:21px;background:rgba(255,255,255,.9);box-shadow:0 4px 12px rgba(92,49,70,.06);color:#1b2336;font-size:13px;font-weight:720;cursor:pointer;white-space:nowrap;}',
      '.gm-command-section-title{margin:9px 2px 9px;color:#182139;font-size:19px;line-height:1.1;}.gm-command-quick-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin-bottom:14px;}.gm-command-quick{min-width:0;min-height:86px;padding:7px 2px 6px;border:1px solid rgba(236,133,166,.15);border-radius:17px;background:rgba(255,255,255,.78);box-shadow:0 5px 14px rgba(96,39,65,.055);color:#172138;cursor:pointer;}.gm-command-quick-icon{display:grid;place-items:center;height:44px;color:#f23878;font-size:29px;line-height:1;}.gm-command-quick-label{display:block;overflow:hidden;text-overflow:ellipsis;font-size:10px;font-weight:720;white-space:nowrap;}',
      '.gm-command-module-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:12px;}.gm-command-module{box-sizing:border-box;display:grid;grid-template-columns:46px minmax(0,1fr) 26px;align-items:center;gap:7px;min-height:88px;padding:9px;border:1px solid var(--gm-card-border,rgba(68,122,184,.13));border-radius:18px;background:var(--gm-card-bg,#fff);box-shadow:0 5px 14px rgba(88,41,65,.04);color:#172138;text-align:left;cursor:pointer;overflow:hidden;}.gm-command-module-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--gm-icon-bg,#e4f2ff);font-size:25px;}.gm-command-module-copy{min-width:0;}.gm-command-module-copy strong{display:block;font-size:13px;line-height:1.18;overflow-wrap:anywhere;}.gm-command-module-copy small{display:block;margin-top:3px;color:#40506c;font-size:9px;line-height:1.2;}.gm-command-arrow{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:var(--gm-accent,#1689ed);color:#fff;font-size:21px;line-height:1;}.gm-card-blue{--gm-card-bg:rgba(231,243,255,.9);--gm-accent:#1689ed;--gm-icon-bg:#d9efff;}.gm-card-pink{--gm-card-bg:rgba(255,231,238,.88);--gm-accent:#f43776;--gm-icon-bg:#ffd4df;}.gm-card-green{--gm-card-bg:rgba(237,248,238,.9);--gm-accent:#31b43c;--gm-icon-bg:#dbf3df;}.gm-card-purple{--gm-card-bg:rgba(243,235,255,.9);--gm-accent:#a54ef2;--gm-icon-bg:#ebdcff;}.gm-card-orange{--gm-card-bg:rgba(255,246,229,.9);--gm-accent:#ffa000;--gm-icon-bg:#ffedc7;}',
      '.gm-command-cid{box-sizing:border-box;display:grid;grid-template-columns:62px 1fr 34px;align-items:center;gap:12px;width:100%;min-height:92px;margin:2px 0 12px;padding:13px 15px;border:1px solid rgba(0,142,164,.2);border-radius:19px;background:rgba(230,247,249,.9);color:#14233a;text-align:left;cursor:pointer;}.gm-command-cid-icon{display:grid;place-items:center;width:60px;height:60px;border-radius:50%;background:#078da5;color:#fff;font-size:34px;}.gm-command-cid strong{display:block;font-size:18px;line-height:1.18;}.gm-command-cid small{display:block;margin-top:5px;color:#087f98;font-size:12px;line-height:1.25;}.gm-command-cid .gm-command-arrow{background:#078da5;}',
      '.gm-command-stats{margin-bottom:12px;padding:12px 14px;border:1px solid rgba(236,133,166,.14);border-radius:19px;background:rgba(255,255,255,.78);}.gm-command-stats h3{margin:0 0 10px;font-size:14px;}.gm-command-stat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));}.gm-command-stat{display:grid;grid-template-columns:38px 1fr;align-items:center;gap:7px;min-width:0;padding:4px 8px;}.gm-command-stat+.gm-command-stat{border-left:1px solid rgba(232,105,145,.18);}.gm-command-stat-icon{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#05889e;color:#fff;font-size:20px;}.gm-command-stat strong{display:block;font-size:17px;}.gm-command-stat small{display:block;color:#40506c;font-size:9px;line-height:1.25;}.gm-command-stat-review{border-radius:12px;background:#fff1d9;}.gm-command-stat-review .gm-command-stat-icon{background:transparent;color:#704016;font-size:25px;}.gm-command-stat-review strong,.gm-command-stat-review small{color:#7b380a;}',
      '.gm-command-evidence{display:grid;grid-template-columns:54px 1fr 58px;align-items:center;gap:10px;margin-bottom:12px;padding:11px 13px;border:1px solid rgba(236,133,166,.18);border-radius:19px;background:rgba(255,235,242,.82);}.gm-command-evidence-icon,.gm-command-evidence-check{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:#f33878;color:#fff;font-size:29px;}.gm-command-evidence-check{background:#53b92d;font-size:31px;}.gm-command-evidence strong{display:block;color:#e22662;font-size:14px;}.gm-command-evidence small{display:block;margin-top:3px;color:#29344b;font-size:10px;line-height:1.35;}',
      '.gm-command-nav{position:sticky;z-index:20;bottom:max(0px,env(safe-area-inset-bottom));display:grid;grid-template-columns:repeat(5,minmax(0,1fr));align-items:end;margin:4px -3px 0;padding:7px 3px 6px;border:1px solid rgba(236,133,166,.16);border-radius:21px;background:rgba(255,255,255,.96);box-shadow:0 -7px 22px rgba(102,42,67,.08);backdrop-filter:blur(14px);}.gm-command-nav button{min-width:0;padding:2px;border:0;background:transparent;color:#40475a;cursor:pointer;font-size:10px;}.gm-command-nav-icon{display:block;margin-bottom:3px;color:#c05b81;font-size:22px;line-height:1;}.gm-command-nav .gm-nav-active{color:#ef1760;font-weight:760;}.gm-command-nav .gm-nav-active .gm-command-nav-icon{color:#ef1760;}.gm-command-nav .gm-nav-main{transform:translateY(-8px);}.gm-command-nav .gm-nav-main .gm-command-nav-icon{display:grid;place-items:center;width:48px;height:48px;margin:-10px auto 2px;border-radius:50%;background:linear-gradient(145deg,#f8568b,#ed1f63);box-shadow:0 8px 18px rgba(229,35,99,.28);color:#fff;font-size:28px;}',
      '#gm-home-dev-message{position:fixed;inset:0;z-index:2147483647;background:rgba(45,24,38,.42);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:24px;}.gm-home-dev-card{width:min(88vw,360px);background:#fff;border-radius:24px;padding:26px 22px;text-align:center;box-shadow:0 24px 70px rgba(82,33,61,.28);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#3b2333;}.gm-home-dev-card strong{display:block;font-size:20px;margin:4px 0 8px;}.gm-home-dev-card p{margin:0 0 20px;color:#76576a;font-size:15px;}.gm-home-dev-icon{font-size:34px;}.gm-home-dev-card button{border:0;border-radius:999px;background:#ec4899;color:#fff;font-weight:800;font-size:15px;padding:12px 26px;}',
      '@media(min-width:700px){.gm-screen-shell,.gm-home-shell{min-height:calc(100% - 48px);margin:24px auto;border-radius:36px;}}',
      '@media(max-width:430px){.gm-home-shell{padding-left:12px;padding-right:12px;}.gm-command-header{grid-template-columns:minmax(0,61%) minmax(0,39%);min-height:204px;margin-left:-12px;margin-right:-12px;padding:10px 12px 9px;}.gm-command-logo{width:43px;height:51px;}.gm-command-name{font-size:clamp(28px,8vw,34px);}.gm-command-clinician img{right:-7px;bottom:-12px;width:127%;height:calc(100% + 9px);}.gm-command-greeting{padding-top:6px;}.gm-command-greeting h2{font-size:clamp(18px,5vw,21px);}.gm-command-greeting p{font-size:clamp(11px,3.15vw,13px);}.gm-command-quick-grid{gap:5px;}.gm-command-quick-label{font-size:9px;}.gm-command-module-grid{gap:8px;}.gm-command-module{grid-template-columns:40px minmax(0,1fr) 23px;gap:5px;min-height:84px;padding:7px;}.gm-command-module-icon{width:38px;height:38px;font-size:22px;}.gm-command-arrow{width:23px;height:23px;font-size:19px;}.gm-command-module-copy strong{font-size:11px;}.gm-command-module-copy small{font-size:8px;}.gm-command-stat{grid-template-columns:31px 1fr;padding:3px 5px;}.gm-command-stat-icon{width:30px;height:30px;font-size:17px;}.gm-command-stat strong{font-size:14px;}.gm-command-stat small{font-size:8px;}}',
      '@media(max-width:350px){.gm-command-header{grid-template-columns:minmax(0,64%) minmax(0,36%);}.gm-command-name{font-size:27px;}.gm-command-greeting h2{font-size:17px;}.gm-command-module-grid{grid-template-columns:1fr;}.gm-command-stat-grid{grid-template-columns:1fr;}.gm-command-stat+.gm-command-stat{border-left:0;border-top:1px solid rgba(232,105,145,.18);}}',
      '@media(max-height:720px){.gm-welcome-shell{padding-top:12px;padding-bottom:12px;}.gm-brand-symbol{width:55px;height:61px;}.gm-brand-name{font-size:39px;}.gm-brand-subtitle{margin-top:8px;font-size:10px;}.gm-heart-divider{margin-top:4px;}.gm-hero-art{width:255px;}.gm-welcome-start-slot{margin:1px 0 7px;}.gm-welcome-message{margin:0 0 7px;font-size:19px;}.gm-feature-icon{width:39px;height:39px;font-size:20px;}.gm-features{margin-bottom:10px;}.gm-primary-button{min-height:50px;font-size:18px;}.gm-login-link{margin-top:8px;}.gm-author{margin-top:5px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildWelcome() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'welcome'); screen.setAttribute('aria-label', 'Apresentação do GestaMed');
    screen.innerHTML = '<div class="gm-screen-shell gm-welcome-shell">' +
      '<div class="gm-brand"><img class="gm-brand-symbol" src="gestamed-logo-symbol.jpg?v=190" alt="Símbolo GestaMed"><h1 class="gm-brand-name"><b>Gesta</b>Med</h1><p class="gm-brand-subtitle">Apoio clínico para<br>profissionais e estudantes.</p><div class="gm-heart-divider" aria-hidden="true">♥</div></div>' +
      '<img class="gm-hero-art" src="gestamed-hero.jpg?v=190" alt="Ilustração de uma gestante em tons de rosa">' +
      '<div class="gm-welcome-start-slot"><button id="gm-welcome-start" class="gm-primary-button" type="button">Começar agora</button></div>' +
      '<div class="gm-features" aria-label="Recursos do GestaMed"><div class="gm-feature"><span class="gm-feature-icon">▣</span><span>Protocolos<br>e condutas</span></div><div class="gm-feature"><span class="gm-feature-icon">♡</span><span>Conteúdos<br>confiáveis</span></div><div class="gm-feature"><span class="gm-feature-icon">⌂</span><span>Ferramentas<br>para estudo</span></div></div>' +
      '<div class="gm-welcome-actions"><p class="gm-welcome-message">Seu apoio prático<br>na rotina da obstetrícia.</p><button id="gm-welcome-login" class="gm-login-link" type="button">Já tem uma conta? <b>Entrar</b></button></div><p class="gm-author">By Tiago Pereira de Albuquerque</p></div>';
    screen.querySelector('#gm-welcome-start').addEventListener('click', function () { setFlowScreen('login'); });
    screen.querySelector('#gm-welcome-login').addEventListener('click', function () { setFlowScreen('login'); });
    return screen;
  }

  function buildLogin() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'login'); screen.setAttribute('aria-label', 'Login do GestaMed');
    screen.innerHTML = '<div class="gm-screen-shell gm-login-shell"><button class="gm-back-button" type="button" aria-label="Voltar para a apresentação">‹</button><div class="gm-login-card"><img class="gm-login-logo" src="gestamed-icon-rosa-20260724.png?v=190" alt="GestaMed"><h1>Bem-vindo ao GestaMed</h1><p>Acesse sua conta para continuar.</p><form novalidate><label for="gm-login-email">E-mail</label><input id="gm-login-email" name="email" type="email" autocomplete="email" placeholder="seuemail@exemplo.com"><label for="gm-login-password">Senha</label><div class="gm-password-field"><input id="gm-login-password" name="password" type="password" autocomplete="current-password" placeholder="Digite sua senha"><button class="gm-password-toggle" type="button" aria-label="Mostrar senha">Mostrar</button></div><button class="gm-forgot" type="button">Esqueci minha senha</button><p class="gm-form-error" role="alert">Preencha seu e-mail e sua senha para continuar.</p><button class="gm-primary-button gm-login-submit" type="submit">Entrar</button></form><p class="gm-register">Ainda não tem uma conta? <button type="button">Criar conta</button></p></div></div>';
    screen.querySelector('.gm-back-button').addEventListener('click', function () { setFlowScreen('welcome'); });
    var password = screen.querySelector('#gm-login-password');
    var toggle = screen.querySelector('.gm-password-toggle');
    toggle.addEventListener('click', function () { var show = password.type === 'password'; password.type = show ? 'text' : 'password'; toggle.textContent = show ? 'Ocultar' : 'Mostrar'; toggle.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha'); });
    screen.querySelector('form').addEventListener('submit', function (event) { event.preventDefault(); var email = screen.querySelector('#gm-login-email').value.trim(); var value = password.value; var error = screen.querySelector('.gm-form-error'); if (!email || !value) { error.classList.add('gm-error-visible'); return; } error.classList.remove('gm-error-visible'); showHome(); });
    return screen;
  }

  function buildHome() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'home'); screen.setAttribute('aria-label', 'Tela inicial GestaMed');
    var shell = document.createElement('main'); shell.className = 'gm-home-shell';
    shell.innerHTML = '<header class="gm-command-header"><div class="gm-command-brand-area"><div class="gm-command-brand-row"><img class="gm-command-logo" src="gestamed-logo-cutout-v190.png?v=190" alt="Símbolo GestaMed"><h1 class="gm-command-name"><b>Gesta</b>Med</h1></div><p class="gm-command-tagline">Cuidar com conhecimento,<br>decidir com segurança.</p><div class="gm-command-heart" aria-hidden="true">♥</div></div><div class="gm-command-clinician" aria-hidden="true"><img src="gestamed-clinician-cutout-v190.png?v=190" alt=""></div><div class="gm-command-greeting"><h2>Olá, Profissional! <span>♥</span></h2><p>Acesse conteúdos confiáveis para apoiar sua prática com excelência.</p></div></header>' +
      '<form class="gm-command-search" role="search"><button type="submit" aria-label="Pesquisar">⌕</button><input id="gm-home-search" type="search" autocomplete="off" spellcheck="false" placeholder="Pesquisar medicamento ou princípio ativo" aria-label="Pesquisar medicamento ou princípio ativo"><button class="gm-command-filter-button" type="button" aria-label="Abrir filtros">☷</button></form>' +
      '<div class="gm-command-filter-row" aria-label="Filtros rápidos"><button class="gm-command-filter-chip" type="button" data-gm-filter="dor">😟 &nbsp;Dor</button><button class="gm-command-filter-chip" type="button" data-gm-filter="febre">🌡️ &nbsp;Febre</button><button class="gm-command-filter-chip" type="button" data-gm-filter="alergia">🌿 &nbsp;Alergia</button><button class="gm-command-filter-chip" type="button" data-gm-filter="nauseas">🤢 &nbsp;Náuseas</button><button class="gm-command-filter-chip" type="button" data-gm-filter="vomitos">🤮 &nbsp;Vômitos</button></div>' +
      '<h2 class="gm-command-section-title">Acesso rápido</h2><div class="gm-command-quick-grid"><button class="gm-command-quick" type="button" data-gm-dev="Agenda"><span class="gm-command-quick-icon">▦</span><span class="gm-command-quick-label">Agenda</span></button><button class="gm-command-quick" type="button" data-gm-dev="Checklists"><span class="gm-command-quick-icon">☑</span><span class="gm-command-quick-label">Checklists</span></button><button class="gm-command-quick" type="button" data-gm-dev="Calculadoras"><span class="gm-command-quick-icon">▤</span><span class="gm-command-quick-label">Calculadoras</span></button><button class="gm-command-quick" type="button" data-gm-dev="Favoritos"><span class="gm-command-quick-icon">♡</span><span class="gm-command-quick-label">Favoritos</span></button><button class="gm-command-quick" type="button" data-gm-dev="Lembretes"><span class="gm-command-quick-icon">●</span><span class="gm-command-quick-label">Lembretes</span></button></div>' +
      '<section class="gm-command-module-grid" aria-label="Módulos do GestaMed"><button class="gm-command-module gm-card-blue" type="button" data-gm-module="idade"><span class="gm-command-module-icon">📅</span><span class="gm-command-module-copy"><strong>Idade gestacional</strong></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-pink" type="button" data-gm-module="insulina"><span class="gm-command-module-icon">🩸</span><span class="gm-command-module-copy"><strong>Cálculo de insulina (DMG)</strong></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-green" type="button" data-gm-module="exames"><span class="gm-command-module-icon">📋</span><span class="gm-command-module-copy"><strong>Painel de Exames</strong><small>Pré-natal habitual, baixo risco</small></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-purple" type="button" data-gm-module="peso"><span class="gm-command-module-icon">📈</span><span class="gm-command-module-copy"><strong>Ganho de peso gestacional</strong></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-orange" type="button" data-gm-module="prescricoes"><span class="gm-command-module-icon">💊</span><span class="gm-command-module-copy"><strong>Prescrições por Trimestre</strong><small>Dose e posologia</small></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-pink" type="button" data-gm-module="condutas"><span class="gm-command-module-icon">🩺</span><span class="gm-command-module-copy"><strong>Condutas Obstétricas</strong><small>Emergências e prescrição-modelo</small></span><span class="gm-command-arrow">›</span></button></section>' +
      '<button class="gm-command-cid" type="button"><span class="gm-command-cid-icon">🧪</span><span><strong>Consulta de Exames — CID</strong><small>Acessar resultados laboratoriais da gestante</small></span><span class="gm-command-arrow">›</span></button>' +
      '<section class="gm-command-stats" aria-label="Base de medicamentos"><h3>Base de medicamentos</h3><div class="gm-command-stat-grid"><div class="gm-command-stat"><span class="gm-command-stat-icon">▤</span><span><strong>1.514</strong><small>registros pesquisáveis</small></span></div><div class="gm-command-stat"><span class="gm-command-stat-icon">🧬</span><span><strong>614</strong><small>princípios ativos</small></span></div><div class="gm-command-stat gm-command-stat-review"><span class="gm-command-stat-icon">⏱</span><span><strong>900</strong><small>pendentes de revisão</small></span></div></div></section>' +
      '<section class="gm-command-evidence"><span class="gm-command-evidence-icon">♢</span><span><strong>Conteúdo baseado em evidências</strong><small>Informações atualizadas conforme diretrizes do Ministério da Saúde e FEBRASGO.</small></span><span class="gm-command-evidence-check">✓</span></section>' +
      '<nav class="gm-command-nav" aria-label="Navegação principal"><button class="gm-nav-active" type="button" data-gm-nav="inicio"><span class="gm-command-nav-icon">⌂</span>Início</button><button type="button" data-gm-nav="obstetricia"><span class="gm-command-nav-icon">♧</span>Obstetrícia</button><button class="gm-nav-main" type="button" data-gm-nav="prenatal"><span class="gm-command-nav-icon">♡</span>Pré-natal</button><button type="button" data-gm-nav="protocolos"><span class="gm-command-nav-icon">▤</span>Protocolos</button><button type="button" data-gm-nav="perfil"><span class="gm-command-nav-icon">♙</span>Perfil</button></nav>';
    var search = shell.querySelector('#gm-home-search');
    search.addEventListener('input', function () { var original = findSearchInput(); if (!original) return; original.value = search.value; dispatchInput(original); });
    shell.querySelector('.gm-command-search').addEventListener('submit', function (event) { event.preventDefault(); var original = findSearchInput(); if (!original) { showDevelopmentMessage('Pesquisa de medicamentos'); return; } original.value = search.value; dispatchInput(original); hideFlow(); window.setTimeout(function () { original.focus(); }, 30); });
    shell.querySelector('.gm-command-filter-button').addEventListener('click', function () { if (!activate(['Filtros','Filtrar','Filtro'])) showDevelopmentMessage('Filtros de pesquisa'); });
    var filterActions = {dor:['Dor'],febre:['Febre'],alergia:['Alergia'],nauseas:['Náusea','Náuseas'],vomitos:['Vômitos','Vomitos']};
    shell.querySelectorAll('[data-gm-filter]').forEach(function (button) { button.addEventListener('click', function () { var labels = filterActions[button.getAttribute('data-gm-filter')]; if (!activate(labels)) showDevelopmentMessage(labels[0]); }); });
    shell.querySelectorAll('[data-gm-dev]').forEach(function (button) { button.addEventListener('click', function () { showDevelopmentMessage(button.getAttribute('data-gm-dev')); }); });
    var moduleActions = {idade:['Idade gestacional'],insulina:['Cálculo de insulina','Calculo de insulina','Insulina','DMG'],exames:['Painel de Exames','Painel de exames'],peso:['Ganho de peso gestacional','Ganho de peso'],prescricoes:['Prescrições por Trimestre','Prescricoes por Trimestre','Prescrições'],condutas:['Condutas Obstétricas','Condutas Obstetricas','Condutas']};
    shell.querySelectorAll('[data-gm-module]').forEach(function (button) { button.addEventListener('click', function () { var labels = moduleActions[button.getAttribute('data-gm-module')]; if (!activate(labels)) showDevelopmentMessage(labels[0]); }); });
    shell.querySelector('.gm-command-cid').addEventListener('click', function () { openExternal(CID_URL); });
    shell.querySelector('[data-gm-nav="inicio"]').addEventListener('click', showHome);
    shell.querySelector('[data-gm-nav="obstetricia"]').addEventListener('click', function () { if (!activate(['Obstetrícia','Obstetricia','Condutas Obstétricas','Condutas Obstetricas','Condutas'])) showDevelopmentMessage('Obstetrícia'); });
    shell.querySelector('[data-gm-nav="prenatal"]').addEventListener('click', function () { if (!activate(['Pré-natal','Pre natal'])) showDevelopmentMessage('Pré-natal'); });
    shell.querySelector('[data-gm-nav="protocolos"]').addEventListener('click', function () { showDevelopmentMessage('Protocolos'); });
    shell.querySelector('[data-gm-nav="perfil"]').addEventListener('click', function () { showDevelopmentMessage('Perfil'); });
    screen.appendChild(shell); return screen;
  }

  function buildFlow() {
    removeLegacyEntryLayers(); ensureStyle();
    var flow = document.createElement('div'); flow.id = 'gm-app-flow';
    flow.appendChild(buildWelcome()); flow.appendChild(buildLogin()); flow.appendChild(buildHome());
    document.body.appendChild(flow); setFlowScreen('welcome');
    var antiFlash = document.getElementById('gm-anti-flash');
    if (antiFlash) antiFlash.remove();
    document.addEventListener('click', function (event) { var element = event.target && event.target.closest ? event.target.closest('button,a,[role="button"]') : null; if (!element || element.closest('#gm-app-flow')) return; var text = normalize(element.textContent || element.getAttribute('aria-label') || ''); if (text === 'inicio' || text.indexOf(' inicio') !== -1) window.setTimeout(showHome, 80); }, true);
    function anyModalOpen() { return !!document.querySelector('.modal.open'); }
    var modalObserver = new MutationObserver(function (mutations) { var relevant = mutations.some(function (mutation) { return mutation.target && mutation.target.classList && mutation.target.classList.contains('modal'); }); if (relevant) window.setTimeout(function () { if (!anyModalOpen()) showHome(); }, 60); });
    document.querySelectorAll('.modal').forEach(function (modal) { modalObserver.observe(modal, { attributes: true, attributeFilter: ['class'] }); });
  }

  var attempts = 0;
  function start() { attempts += 1; if (document.body) { buildFlow(); return; } if (attempts < 80) window.setTimeout(start, 150); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
