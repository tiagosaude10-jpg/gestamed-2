(function () {
  'use strict';

  var PATCH_ID = 'gestamed-entry-flow-2026-08-15-203';
  var CID_URL = 'https://laboratoriocid.com.br/logins/login';
  var LABOR_ANALISE_URL = '';
  var SUPABASE_URL = 'https://ptymhmvkuedgudhlvcxo.supabase.co';
  var SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SbzuQSBhwR3PXlaRrUsPnw_2plttVAf';
  var PROFILE_STORAGE_KEY = 'gestamed-display-profiles-v1';
  var NOTICES_STORAGE_KEY = 'gestamed-notices-v1';
  var SESSION_STORAGE_KEY = 'gestamed-supabase-session-v1';
  var activeDisplayName = 'Profissional';
  var activeProfile = null;
  var activeSession = null;
  var serverNotices = [];
  var recoveryAccessToken = '';
  var commandFilters = [
    { id:'dor', label:'Dor', icon:'🤕', group:'clinical' },
    { id:'febre', label:'Febre', icon:'🌡️', group:'clinical' },
    { id:'nauseas', label:'Náuseas', icon:'🤢', group:'clinical' },
    { id:'vomitos', label:'Vômitos', icon:'🤮', group:'clinical' },
    { id:'azia-refluxo', label:'Azia/Refluxo', icon:'🔥', group:'clinical' },
    { id:'alergia', label:'Alergia', icon:'🌿', group:'clinical' },
    { id:'constipacao', label:'Constipação', icon:'🚻', group:'clinical' },
    { id:'analgesicos', label:'Analgésicos', icon:'🩹', group:'class' },
    { id:'anti-inflamatorios', label:'Anti-inflamatórios', icon:'🧊', group:'class' },
    { id:'antibioticos', label:'Antibióticos', icon:'💊', group:'class' },
    { id:'antifungicos', label:'Antifúngicos', icon:'🍄', group:'class' },
    { id:'antivirais', label:'Antivirais', icon:'🛡️', group:'class' },
    { id:'anti-histaminicos', label:'Anti-histamínicos', icon:'🤧', group:'class' },
    { id:'antiemeticos', label:'Antieméticos', icon:'🤢', group:'class' },
    { id:'anti-hipertensivos', label:'Anti-hipertensivos', icon:'❤️', group:'class' },
    { id:'antidiabeticos', label:'Antidiabéticos', icon:'🩸', group:'class' },
    { id:'anticoagulantes', label:'Anticoagulantes', icon:'🧬', group:'class' },
    { id:'antiagregantes', label:'Antiagregantes', icon:'🩹', group:'class' },
    { id:'anticonvulsivantes', label:'Anticonvulsivantes', icon:'🧠', group:'class' },
    { id:'antidepressivos', label:'Antidepressivos', icon:'☀️', group:'class' },
    { id:'ansioliticos', label:'Ansiolíticos', icon:'🕊️', group:'class' },
    { id:'antipsicoticos', label:'Antipsicóticos', icon:'💭', group:'class' },
    { id:'corticoides', label:'Corticoides', icon:'🧪', group:'class' },
    { id:'broncodilatadores', label:'Broncodilatadores', icon:'🫁', group:'class' },
    { id:'antiasmaticos', label:'Antiasmáticos', icon:'🌬️', group:'class' },
    { id:'antiacidos', label:'Antiácidos', icon:'🔥', group:'class' },
    { id:'protetores-gastricos', label:'Protetores gástricos', icon:'🛡️', group:'class' },
    { id:'laxantes', label:'Laxantes', icon:'🚻', group:'class' },
    { id:'antidiarreicos', label:'Antidiarreicos', icon:'💧', group:'class' },
    { id:'diureticos', label:'Diuréticos', icon:'🚰', group:'class' },
    { id:'hormonios', label:'Hormônios', icon:'⚗️', group:'class' },
    { id:'vitaminas-suplementos', label:'Vitaminas e suplementos', icon:'🍊', group:'class' },
    { id:'medicamentos-obstetricos', label:'Medicamentos obstétricos', icon:'🤰', group:'class' }
  ];
  if (document.documentElement.getAttribute('data-gm-entry-flow') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-entry-flow', PATCH_ID);

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function cleanDisplayName(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 24);
  }

  function readDisplayProfiles() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
      return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
    } catch (error) { return {}; }
  }

  function saveDisplayProfile(email, displayName) {
    var profiles = readDisplayProfiles();
    profiles[String(email || '').trim().toLowerCase()] = cleanDisplayName(displayName);
    try { window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles)); } catch (error) {}
  }

  function displayNameForEmail(email) {
    var profiles = readDisplayProfiles();
    return cleanDisplayName(profiles[String(email || '').trim().toLowerCase()]) || 'Profissional';
  }

  function updateGreeting() {
    var name = document.querySelector('#gm-app-flow [data-gm-display-name]');
    if (name) name.textContent = cleanDisplayName(activeDisplayName) || 'Profissional';
  }

  function readNotices() {
    var stored = [];
    try { stored = JSON.parse(window.localStorage.getItem(NOTICES_STORAGE_KEY) || '[]'); } catch (error) {}
    var systemNotices = Array.isArray(window.GESTAMED_NOTICES) ? window.GESTAMED_NOTICES : [];
    return serverNotices.concat(systemNotices, Array.isArray(stored) ? stored : []).filter(function (notice) { return notice && (notice.title || notice.message); });
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

  function showHome() {
    if (!activeProfile || activeProfile.account_status !== 'approved') { routeProfile(); return; }
    activeDisplayName = cleanDisplayName(activeProfile.display_name) || 'Profissional';
    updateGreeting();
    updateHomeAccountControls();
    syncFlowSearchInput();
    setFlowScreen('home');
    loadServerNotices();
  }

  function syncFlowSearchInput() {
    var flowSearch = document.getElementById('gm-flow-home-search');
    var original = findSearchInput();
    if (flowSearch) flowSearch.value = original ? original.value : '';
  }

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

  function recoveryRedirectUrl() {
    return window.location.origin + window.location.pathname + '?password-recovery=1';
  }

  function supabaseAuthRequest(path, options) {
    options = options || {};
    var headers = Object.assign({
      'apikey': SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json'
    }, options.headers || {});
    return window.fetch(SUPABASE_URL + '/auth/v1/' + path, {
      method: options.method || 'POST',
      headers: headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    }).then(function (response) {
      return response.text().then(function (raw) {
        var data = {};
        try { data = raw ? JSON.parse(raw) : {}; } catch (error) {}
        if (!response.ok) {
          var failure = new Error(data.msg || data.message || data.error_description || 'Falha na solicitação.');
          failure.status = response.status;
          failure.code = data.error_code || data.code || '';
          throw failure;
        }
        return data;
      });
    });
  }

  var AUTH_ERROR_MESSAGES = {
    weak_password: 'Essa senha é fraca ou muito comum (ou já vazou em outros sites). Escolha uma senha mais forte, com pelo menos 8 caracteres, misturando letras e números.',
    user_already_exists: 'Já existe uma conta cadastrada com este e-mail.',
    email_exists: 'Já existe uma conta cadastrada com este e-mail.',
    email_address_invalid: 'Este endereço de e-mail não é válido.',
    signup_disabled: 'Os cadastros estão temporariamente desativados. Tente novamente mais tarde.',
    invalid_credentials: 'E-mail ou senha incorretos, ou e-mail ainda não confirmado.',
    over_email_send_rate_limit: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
    over_request_rate_limit: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
  };

  function translateAuthError(failure, fallback) {
    if (failure && failure.code && AUTH_ERROR_MESSAGES[failure.code]) return AUTH_ERROR_MESSAGES[failure.code];
    if (failure && failure.status === 429) return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
    return fallback;
  }

  function readSession() {
    try {
      var value = JSON.parse(window.localStorage.getItem(SESSION_STORAGE_KEY) || 'null');
      return value && value.access_token && value.refresh_token ? value : null;
    } catch (error) { return null; }
  }

  function saveSession(session) {
    activeSession = session && session.access_token ? session : null;
    try {
      if (activeSession) window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(activeSession));
      else window.localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {}
  }

  function normalizeSession(data) {
    if (!data || !data.access_token) return null;
    data.expires_at = data.expires_at || Math.floor(Date.now() / 1000) + Number(data.expires_in || 3600);
    return data;
  }

  function refreshSessionIfNeeded() {
    activeSession = activeSession || readSession();
    if (!activeSession) return Promise.reject(new Error('Sessão não encontrada.'));
    if (Number(activeSession.expires_at || 0) > Math.floor(Date.now() / 1000) + 60) return Promise.resolve(activeSession);
    return supabaseAuthRequest('token?grant_type=refresh_token', { body: { refresh_token: activeSession.refresh_token } }).then(function (data) {
      var refreshed = normalizeSession(data);
      saveSession(refreshed);
      return refreshed;
    }).catch(function (error) { saveSession(null); throw error; });
  }

  function supabaseRestRequest(path, options) {
    options = options || {};
    return refreshSessionIfNeeded().then(function (session) {
      var headers = Object.assign({
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Authorization': 'Bearer ' + session.access_token,
        'Content-Type': 'application/json'
      }, options.headers || {});
      return window.fetch(SUPABASE_URL + '/rest/v1/' + path, {
        method: options.method || 'GET',
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : undefined
      }).then(function (response) {
        return response.text().then(function (raw) {
          var data = null;
          try { data = raw ? JSON.parse(raw) : null; } catch (error) {}
          if (!response.ok) {
            var failure = new Error((data && (data.message || data.hint)) || 'Falha ao consultar o serviço.');
            failure.status = response.status;
            throw failure;
          }
          return data;
        });
      });
    });
  }

  function loadCurrentProfile() {
    return refreshSessionIfNeeded().then(function (session) {
      var userId = session.user && session.user.id;
      if (userId) return userId;
      return supabaseAuthRequest('user', { method:'GET', headers:{ 'Authorization':'Bearer ' + session.access_token } }).then(function (user) {
        activeSession.user = user; saveSession(activeSession); return user.id;
      });
    }).then(function (userId) {
      return supabaseRestRequest('profiles?id=eq.' + encodeURIComponent(userId) + '&select=id,email,display_name,is_admin,account_status,cid_access,labor_access,status_reason,created_at');
    }).then(function (rows) {
      if (!rows || !rows.length) throw new Error('Perfil ainda não foi criado.');
      activeProfile = rows[0];
      activeDisplayName = cleanDisplayName(activeProfile.display_name) || 'Profissional';
      return activeProfile;
    });
  }

  function routeProfile() {
    if (!activeProfile) { setFlowScreen('login'); return; }
    if (activeProfile.account_status === 'approved') { showHome(); return; }
    renderAccountStatus();
    setFlowScreen('account-status');
  }

  function clearAccount() {
    activeProfile = null;
    activeDisplayName = 'Profissional';
    serverNotices = [];
    saveSession(null);
  }

  function readRecoveryCallback() {
    var params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    if (params.get('type') !== 'recovery' || !params.get('access_token')) return false;
    recoveryAccessToken = params.get('access_token');
    return true;
  }

  function readAuthenticationCallback() {
    var params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    if (!params.get('access_token') || params.get('type') === 'recovery') return false;
    saveSession(normalizeSession({
      access_token: params.get('access_token'),
      refresh_token: params.get('refresh_token'),
      expires_in: Number(params.get('expires_in') || 3600),
      token_type: params.get('token_type') || 'bearer'
    }));
    try { window.history.replaceState({}, document.title, window.location.pathname); } catch (error) {}
    return true;
  }

  function clearRecoveryCallback() {
    recoveryAccessToken = '';
    try { window.history.replaceState({}, document.title, window.location.pathname); } catch (error) {}
  }

  function commandFilterMarkup() {
    return commandFilters.map(function (filter, index) {
      var divider = index === 7 ? '<span class="gm-command-filter-divider" aria-hidden="true"></span>' : '';
      return divider + '<button class="gm-command-filter-chip gm-command-filter-' + filter.group + '" type="button" data-gm-command-filter="' + filter.id + '" aria-label="' + filter.label + '"><span aria-hidden="true">' + filter.icon + '</span><span>' + filter.label + '</span></button>';
    }).join('');
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

  function showNotices() {
    var old = document.getElementById('gm-home-notices');
    if (old) old.remove();
    var notices = readNotices();
    var overlay = document.createElement('div');
    overlay.id = 'gm-home-notices'; overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true'); overlay.setAttribute('aria-labelledby', 'gm-notices-title');
    var card = document.createElement('section'); card.className = 'gm-notices-card';
    var header = document.createElement('header');
    var title = document.createElement('h2'); title.id = 'gm-notices-title'; title.textContent = 'Avisos';
    var closeButton = document.createElement('button'); closeButton.type = 'button'; closeButton.setAttribute('aria-label', 'Fechar avisos'); closeButton.textContent = '×';
    header.appendChild(title); header.appendChild(closeButton); card.appendChild(header);
    var list = document.createElement('div'); list.className = 'gm-notices-list';
    if (!notices.length) {
      var empty = document.createElement('p'); empty.className = 'gm-notices-empty'; empty.textContent = 'Nenhum aviso novo no momento.'; list.appendChild(empty);
    } else {
      notices.forEach(function (notice) {
        var item = document.createElement('article'); item.className = 'gm-notice-item';
        var itemTitle = document.createElement('strong'); itemTitle.textContent = cleanDisplayName(notice.title) || 'Aviso';
        var message = document.createElement('p'); message.textContent = String(notice.message || '');
        item.appendChild(itemTitle); item.appendChild(message); list.appendChild(item);
      });
    }
    card.appendChild(list); overlay.appendChild(card);
    function close() { overlay.remove(); }
    closeButton.addEventListener('click', close);
    overlay.addEventListener('click', function (event) { if (event.target === overlay) close(); });
    (document.getElementById('gm-app-flow') || document.body).appendChild(overlay); closeButton.focus();
    if (activeSession && serverNotices.some(function (notice) { return notice.id && !notice.read_at; })) {
      supabaseRestRequest('notifications?recipient_id=eq.' + encodeURIComponent(activeProfile.id) + '&read_at=is.null', {
        method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: { read_at: new Date().toISOString() }
      }).then(function () {
        serverNotices.forEach(function (notice) { notice.read_at = notice.read_at || new Date().toISOString(); });
        updateHomeAccountControls();
      }).catch(function () {});
    }
  }

  function loadServerNotices() {
    if (!activeProfile) return Promise.resolve([]);
    return supabaseRestRequest('notifications?recipient_id=eq.' + encodeURIComponent(activeProfile.id) + '&select=id,type,title,message,created_at,read_at&order=created_at.desc&limit=30').then(function (rows) {
      serverNotices = Array.isArray(rows) ? rows : [];
      updateHomeAccountControls();
      return serverNotices;
    }).catch(function () { return []; });
  }

  function updateHomeAccountControls() {
    var home = document.querySelector('#gm-app-flow [data-screen="home"]');
    if (!home) return;
    var adminButton = home.querySelector('.gm-command-admin');
    if (adminButton) adminButton.hidden = !(activeProfile && activeProfile.is_admin);
    var badge = home.querySelector('.gm-command-action-badge');
    var count = serverNotices.filter(function (notice) { return !notice.read_at; }).length;
    if (badge) {
      badge.textContent = Math.min(count, 9);
      badge.hidden = !count;
    }
    updateGreeting();
  }

  function logout() {
    var token = activeSession && activeSession.access_token;
    if (token) supabaseAuthRequest('logout', { headers: { 'Authorization': 'Bearer ' + token } }).catch(function () {});
    clearAccount();
    var email = document.getElementById('gm-login-email');
    var password = document.getElementById('gm-login-password');
    if (email) email.value = '';
    if (password) password.value = '';
    setFlowScreen('login');
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
      '.gm-screen-shell{box-sizing:border-box;position:relative;width:min(100%,520px);min-height:100%;margin:0 auto;background:#fff1f4 url("gestamed-background-clean.jpg?v=199") center/cover no-repeat;overflow:hidden;box-shadow:0 0 40px rgba(98,37,65,.12);}',
      '.gm-welcome-shell{display:flex;flex-direction:column;align-items:center;padding:max(22px,env(safe-area-inset-top)) 28px max(20px,env(safe-area-inset-bottom));}',
      '.gm-brand{text-align:center;}.gm-brand-symbol{display:block;width:105px;height:110px;margin:0 auto -4px;object-fit:contain;}',
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
      '.gm-login-card input{box-sizing:border-box;width:100%;height:52px;padding:0 15px;border:1px solid rgba(162,64,96,.2);border-radius:15px;outline:none;color:#5b2035;background:rgba(255,255,255,.88);}.gm-login-card input:focus{border-color:#e4517a;box-shadow:0 0 0 4px rgba(228,81,122,.12);}.gm-password-field{position:relative;}.gm-password-field input{padding-right:78px;}.gm-password-toggle{position:absolute;top:0;right:7px;height:52px;border:0;color:#c92a5d;background:transparent;cursor:pointer;font-size:12px;font-weight:750;}.gm-forgot{display:block;margin:12px 0 0 auto;border:0;color:#bd2857;background:transparent;cursor:pointer;font-size:12px;}.gm-forgot:disabled{opacity:.6;cursor:wait;}.gm-login-submit{min-height:53px;margin-top:19px;border-radius:16px;font-size:17px;}.gm-form-error,.gm-recovery-status{display:none;margin:12px 0 0;padding:9px 11px;border-radius:10px;color:#8f183d;background:#ffe1e8;font-size:12px;text-align:left;line-height:1.4;}.gm-form-error.gm-error-visible,.gm-recovery-status.gm-status-visible{display:block;}.gm-recovery-status.gm-status-success{color:#17603b;background:#def7e9;}.gm-register{margin-top:19px!important;}.gm-register button{border:0;color:#c92458;background:transparent;cursor:pointer;font-weight:750;}.gm-reset-card form{margin-top:20px;}.gm-reset-card .gm-primary-button:disabled{opacity:.65;cursor:wait;}',
      '.gm-home-shell{box-sizing:border-box;position:relative;width:min(100%,600px);min-height:100%;margin:0 auto;padding:0 14px max(18px,env(safe-area-inset-bottom));background:#fff4f7 url("gestamed-background-clean.jpg?v=199") center top/cover no-repeat;box-shadow:0 0 40px rgba(98,37,65,.12);color:#17233c;}',
      '.gm-command-header{box-sizing:border-box;position:relative;display:grid;grid-template-columns:minmax(0,60%) minmax(0,40%);grid-template-rows:auto 1fr;grid-template-areas:"brand clinician" "greeting clinician";min-height:216px;margin:0 -14px 12px;padding:13px 14px 10px;overflow:hidden;border-radius:0 0 26px 26px;background:linear-gradient(135deg,rgba(255,251,252,.78),rgba(255,224,235,.76));box-shadow:0 8px 22px rgba(174,53,94,.08);}.gm-command-header:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 84% 24%,rgba(255,255,255,.42),transparent 34%),radial-gradient(circle at 7% 4%,rgba(242,119,154,.12),transparent 25%);pointer-events:none;}.gm-command-brand-area{grid-area:brand;position:relative;z-index:3;min-width:0;text-align:center;}.gm-command-brand-row{display:flex;align-items:center;justify-content:center;gap:5px;}.gm-command-logo{width:48px;height:56px;object-fit:contain;}.gm-command-name{margin:0;color:#ef6d90;font-size:clamp(29px,8vw,45px);font-weight:300;letter-spacing:-1.8px;line-height:1;white-space:nowrap;}.gm-command-name b{color:#d40b50;font-weight:720;}.gm-command-tagline{margin:2px 0 0;color:#92506a;font-size:clamp(8px,2.1vw,12px);font-weight:750;line-height:1.35;letter-spacing:.3px;text-transform:uppercase;}.gm-command-heart{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:3px;color:#ef4c82;font-size:11px;}.gm-command-heart:before,.gm-command-heart:after{content:"";width:28px;height:1px;background:#ecabc0;}.gm-command-clinician{grid-area:clinician;position:relative;z-index:1;align-self:stretch;min-width:0;pointer-events:none;}.gm-command-clinician img{position:absolute;right:-4px;bottom:-13px;width:118%;height:calc(100% + 8px);object-fit:contain;object-position:right bottom;user-select:none;-webkit-user-drag:none;}.gm-command-greeting{grid-area:greeting;position:relative;z-index:2;align-self:end;min-width:0;padding:8px 3px 0;}.gm-command-greeting h2{margin:0;color:#121b31;font-size:clamp(18px,5vw,27px);line-height:1.08;white-space:normal;}.gm-command-greeting h2 span{color:#f04c80;}.gm-command-greeting h2 [data-gm-display-name]{overflow-wrap:anywhere;}.gm-command-greeting p{max-width:245px;margin:5px 0 0;color:#26324a;font-size:clamp(11px,3.15vw,15px);line-height:1.35;}',
      '.gm-command-actions{position:absolute;left:3px;bottom:-37px;display:flex;align-items:center;gap:7px;}.gm-command-action{position:relative;display:grid;place-items:center;width:30px;height:30px;padding:0;border:1px solid rgba(218,49,101,.18);border-radius:11px;background:rgba(255,255,255,.86);box-shadow:0 4px 10px rgba(128,42,72,.08);color:#c92b60;cursor:pointer;font-size:15px;line-height:1;}.gm-command-action:active{transform:scale(.95);}.gm-command-action-badge{position:absolute;top:-3px;right:-3px;display:grid;place-items:center;min-width:14px;height:14px;padding:0 3px;border:2px solid #fff;border-radius:999px;background:#e92764;color:#fff;font-size:8px;font-weight:800;}',
      '.gm-command-search{box-sizing:border-box;position:relative;z-index:4;display:flex;align-items:center;width:100%;height:54px;margin:0 0 12px;border:1px solid rgba(234,93,137,.18);border-radius:22px;background:rgba(255,255,255,.94);box-shadow:0 7px 20px rgba(191,42,91,.09);overflow:hidden;}.gm-command-search input{box-sizing:border-box;min-width:0;width:100%;height:100%;padding:0 18px;border:0;outline:0;background:transparent;color:#26324a;font-size:14px;}.gm-command-search input::placeholder{color:#a59ea3;text-overflow:ellipsis;}',
      '.gm-command-filter-row{display:flex;align-items:center;gap:8px;margin:0 -1px 14px;padding:2px 1px 7px;overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scroll-snap-type:x proximity;scrollbar-width:thin;scrollbar-color:rgba(221,48,101,.5) rgba(221,48,101,.1);-webkit-overflow-scrolling:touch;}.gm-command-filter-row::-webkit-scrollbar{height:4px;}.gm-command-filter-row::-webkit-scrollbar-track{border-radius:999px;background:rgba(221,48,101,.1);}.gm-command-filter-row::-webkit-scrollbar-thumb{border-radius:999px;background:rgba(221,48,101,.5);}.gm-command-filter-chip{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-width:88px;height:40px;padding:0 12px;border:1px solid rgba(116,151,174,.24);border-radius:21px;background:rgba(255,255,255,.9);box-shadow:0 4px 12px rgba(92,49,70,.06);color:#1b2336;font-size:13px;font-weight:720;cursor:pointer;white-space:nowrap;scroll-snap-align:start;}.gm-command-filter-class{border-color:rgba(220,38,99,.22);background:rgba(255,242,247,.94);color:#7d2444;}.gm-command-filter-divider{flex:0 0 2px;width:2px;height:30px;margin:0 3px;border-radius:999px;background:linear-gradient(180deg,rgba(219,52,103,.12),rgba(219,52,103,.55),rgba(219,52,103,.12));}',
      '.gm-command-section-title{margin:11px 2px 9px;color:#182139;font-size:19px;line-height:1.1;}.gm-command-quick-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;margin-bottom:14px;}.gm-command-quick{--gm-quick-bg:#f7f9fc;--gm-quick-border:#e2e8f0;--gm-quick-accent:#526176;--gm-quick-icon-bg:#edf1f6;box-sizing:border-box;min-width:0;min-height:68px;padding:7px 2px 6px;border:1px solid var(--gm-quick-border);border-radius:15px;background:linear-gradient(155deg,rgba(255,255,255,.96),var(--gm-quick-bg));box-shadow:0 4px 11px rgba(78,45,62,.07);color:#172138;cursor:pointer;transition:transform .15s ease,box-shadow .15s ease;}.gm-command-quick:active{transform:scale(.97);box-shadow:0 2px 7px rgba(78,45,62,.06);}.gm-command-quick-icon{display:grid;place-items:center;width:32px;height:32px;margin:0 auto 4px;border-radius:11px;background:var(--gm-quick-icon-bg);color:var(--gm-quick-accent);font-size:20px;font-weight:800;line-height:1;}.gm-command-quick-label{display:block;overflow:hidden;text-overflow:ellipsis;color:#263047;font-size:9.5px;font-weight:750;line-height:1.1;white-space:nowrap;}.gm-quick-agenda{--gm-quick-bg:#edf6ff;--gm-quick-border:#cfe4fb;--gm-quick-accent:#2878c8;--gm-quick-icon-bg:#dceeff;}.gm-quick-checklists{--gm-quick-bg:#eefaf3;--gm-quick-border:#ccebd8;--gm-quick-accent:#258a52;--gm-quick-icon-bg:#daf2e4;}.gm-quick-calculadoras{--gm-quick-bg:#fff6e9;--gm-quick-border:#f6dfb7;--gm-quick-accent:#d67a12;--gm-quick-icon-bg:#ffebc9;}.gm-quick-favoritos{--gm-quick-bg:#fff0f5;--gm-quick-border:#f8cedc;--gm-quick-accent:#df3f73;--gm-quick-icon-bg:#ffe0ea;}.gm-quick-lembretes{--gm-quick-bg:#f6f1ff;--gm-quick-border:#dfd2f5;--gm-quick-accent:#8055bf;--gm-quick-icon-bg:#eadffd;}',
      '.gm-command-module-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:12px;}.gm-command-module{box-sizing:border-box;display:grid;grid-template-columns:46px minmax(0,1fr) 26px;align-items:center;gap:7px;min-height:88px;padding:9px;border:1px solid var(--gm-card-border,rgba(68,122,184,.13));border-radius:18px;background:var(--gm-card-bg,#fff);box-shadow:0 5px 14px rgba(88,41,65,.04);color:#172138;text-align:left;cursor:pointer;overflow:hidden;}.gm-command-module-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--gm-icon-bg,#e4f2ff);font-size:25px;}.gm-command-module-copy{min-width:0;}.gm-command-module-copy strong{display:block;font-size:13px;line-height:1.18;overflow-wrap:anywhere;}.gm-command-module-copy small{display:block;margin-top:3px;color:#40506c;font-size:9px;line-height:1.2;}.gm-command-arrow{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:var(--gm-accent,#1689ed);color:#fff;font-size:21px;line-height:1;}.gm-card-blue{--gm-card-bg:rgba(231,243,255,.9);--gm-accent:#1689ed;--gm-icon-bg:#d9efff;}.gm-card-pink{--gm-card-bg:rgba(255,231,238,.88);--gm-accent:#f43776;--gm-icon-bg:#ffd4df;}.gm-card-green{--gm-card-bg:rgba(237,248,238,.9);--gm-accent:#31b43c;--gm-icon-bg:#dbf3df;}.gm-card-purple{--gm-card-bg:rgba(243,235,255,.9);--gm-accent:#a54ef2;--gm-icon-bg:#ebdcff;}.gm-card-orange{--gm-card-bg:rgba(255,246,229,.9);--gm-accent:#ffa000;--gm-icon-bg:#ffedc7;}',
      '.gm-command-stats{margin-bottom:12px;padding:12px 14px;border:1px solid rgba(236,133,166,.14);border-radius:19px;background:rgba(255,255,255,.78);}.gm-command-stats h3{margin:0 0 10px;font-size:14px;}.gm-command-stat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));}.gm-command-stat{display:grid;grid-template-columns:38px 1fr;align-items:center;gap:7px;min-width:0;padding:4px 8px;}.gm-command-stat+.gm-command-stat{border-left:1px solid rgba(232,105,145,.18);}.gm-command-stat-icon{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#05889e;color:#fff;font-size:20px;}.gm-command-stat strong{display:block;font-size:17px;}.gm-command-stat small{display:block;color:#40506c;font-size:9px;line-height:1.25;}.gm-command-stat-review{border-radius:12px;background:#fff1d9;}.gm-command-stat-review .gm-command-stat-icon{background:transparent;color:#704016;font-size:25px;}.gm-command-stat-review strong,.gm-command-stat-review small{color:#7b380a;}',
      '.gm-command-evidence{display:grid;grid-template-columns:54px 1fr 58px;align-items:center;gap:10px;margin-bottom:12px;padding:11px 13px;border:1px solid rgba(236,133,166,.18);border-radius:19px;background:rgba(255,235,242,.82);}.gm-command-evidence-icon,.gm-command-evidence-check{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:#f33878;color:#fff;font-size:29px;}.gm-command-evidence-check{background:#53b92d;font-size:31px;}.gm-command-evidence strong{display:block;color:#e22662;font-size:14px;}.gm-command-evidence small{display:block;margin-top:3px;color:#29344b;font-size:10px;line-height:1.35;}',
      '.gm-command-nav{position:sticky;z-index:20;bottom:max(0px,env(safe-area-inset-bottom));display:grid;grid-template-columns:repeat(5,minmax(0,1fr));align-items:end;margin:4px -3px 0;padding:7px 3px 6px;border:1px solid rgba(236,133,166,.16);border-radius:21px;background:rgba(255,255,255,.96);box-shadow:0 -7px 22px rgba(102,42,67,.08);backdrop-filter:blur(14px);}.gm-command-nav button{min-width:0;padding:2px;border:0;background:transparent;color:#40475a;cursor:pointer;font-size:10px;}.gm-command-nav-icon{display:block;margin-bottom:3px;color:#c05b81;font-size:22px;line-height:1;}.gm-command-nav .gm-nav-active{color:#ef1760;font-weight:760;}.gm-command-nav .gm-nav-active .gm-command-nav-icon{color:#ef1760;}.gm-command-nav .gm-nav-main{transform:translateY(-8px);}.gm-command-nav .gm-nav-main .gm-command-nav-icon{display:grid;place-items:center;width:48px;height:48px;margin:-10px auto 2px;border-radius:50%;background:linear-gradient(145deg,#f8568b,#ed1f63);box-shadow:0 8px 18px rgba(229,35,99,.28);color:#fff;font-size:28px;}',
      '#gm-home-dev-message{position:fixed;inset:0;z-index:2147483647;background:rgba(45,24,38,.42);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:24px;}.gm-home-dev-card{width:min(88vw,360px);background:#fff;border-radius:24px;padding:26px 22px;text-align:center;box-shadow:0 24px 70px rgba(82,33,61,.28);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#3b2333;}.gm-home-dev-card strong{display:block;font-size:20px;margin:4px 0 8px;}.gm-home-dev-card p{margin:0 0 20px;color:#76576a;font-size:15px;}.gm-home-dev-icon{font-size:34px;}.gm-home-dev-card button{border:0;border-radius:999px;background:#ec4899;color:#fff;font-weight:800;font-size:15px;padding:12px 26px;}',
      '#gm-home-notices{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-start;justify-content:center;padding:max(74px,env(safe-area-inset-top)) 20px 24px;background:rgba(45,24,38,.38);backdrop-filter:blur(5px);}.gm-notices-card{box-sizing:border-box;width:min(92vw,420px);max-height:min(72vh,560px);overflow:hidden;border:1px solid rgba(238,105,149,.2);border-radius:24px;background:#fffafb;box-shadow:0 24px 70px rgba(82,33,61,.25);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#262037;}.gm-notices-card header{display:flex;align-items:center;justify-content:space-between;padding:16px 17px 12px;border-bottom:1px solid #f4dce5;}.gm-notices-card h2{margin:0;color:#a91f51;font-size:20px;}.gm-notices-card header button{display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:#fff0f5;color:#cf2c61;font-size:25px;cursor:pointer;}.gm-notices-list{max-height:calc(min(72vh,560px) - 62px);padding:13px;overflow-y:auto;}.gm-notices-empty{margin:14px 8px 18px;color:#775b69;text-align:center;font-size:14px;}.gm-notice-item{padding:12px 13px;border:1px solid #f2d7e1;border-radius:15px;background:#fff;}.gm-notice-item+.gm-notice-item{margin-top:9px;}.gm-notice-item strong{display:block;color:#9f214e;font-size:14px;}.gm-notice-item p{margin:5px 0 0;color:#4c3a45;font-size:13px;line-height:1.4;}',
      '#gm-app-flow [hidden]{display:none!important;}#gm-app-flow button:disabled{opacity:.58;cursor:wait;}.gm-status-card{max-width:390px;}.gm-status-icon{margin:18px auto 0;font-size:36px;}.gm-status-card .gm-account-status-message{margin-top:11px;line-height:1.5;}.gm-account-status-reason{margin-top:13px!important;padding:10px;border-radius:12px;background:#fff0d8;color:#7b4b13!important;line-height:1.4;}.gm-account-refresh{min-height:52px;margin-top:22px;border-radius:16px;font-size:16px;}.gm-secondary-button{width:100%;min-height:45px;margin-top:10px;border:1px solid #edb7c9;border-radius:15px;background:#fff;color:#a91f51;font-weight:750;cursor:pointer;}',
      '.gm-admin-shell{box-sizing:border-box;width:min(100%,600px);min-height:100%;margin:0 auto;padding:max(18px,env(safe-area-inset-top)) 14px max(24px,env(safe-area-inset-bottom));background:#fff4f7 url("gestamed-background-clean.jpg?v=202") center/cover fixed;color:#17233c;}.gm-admin-shell>header{display:flex;align-items:center;gap:12px;padding:6px 3px 15px;}.gm-admin-back{display:grid;place-items:center;width:42px;height:42px;border:1px solid #f2c4d3;border-radius:50%;background:#fff;color:#b91f53;font-size:32px;line-height:1;}.gm-admin-shell h1{margin:0;color:#941843;font-size:25px;}.gm-admin-shell header p{margin:3px 0 0;color:#765467;font-size:12px;}.gm-admin-tabs{display:flex;gap:7px;padding:2px 1px 10px;overflow-x:auto;}.gm-admin-tabs button{flex:0 0 auto;padding:9px 13px;border:1px solid #edc7d4;border-radius:999px;background:#fff;color:#71364c;font-weight:700;}.gm-admin-tabs .gm-admin-tab-active{border-color:#e92c66;background:#e92c66;color:#fff;}.gm-admin-user-list{display:grid;gap:10px;padding:3px 0 20px;}.gm-admin-user-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:3px 10px;padding:14px;border:1px solid #f0d7df;border-radius:17px;background:rgba(255,255,255,.92);box-shadow:0 5px 16px rgba(97,43,65,.06);}.gm-admin-user-card>strong{font-size:16px;}.gm-admin-user-card>span{grid-column:1;color:#6e5b66;font-size:12px;overflow-wrap:anywhere;}.gm-admin-status{grid-column:2;grid-row:1/3;align-self:start;padding:5px 8px;border-radius:999px;background:#fff0ca;color:#805200;font-size:10px;font-style:normal;font-weight:800;}.gm-admin-status-approved,.gm-admin-status-pending{background:#dcf7e8;color:#17683f;}.gm-admin-status-blocked,.gm-admin-status-denied{background:#ffe2e6;color:#9d1c34;}.gm-admin-user-actions{grid-column:1/-1;display:flex;align-items:center;gap:7px;margin-top:9px;flex-wrap:wrap;}.gm-admin-user-actions button{padding:8px 11px;border:1px solid #edbfd0;border-radius:10px;background:#fff5f8;color:#a51d50;font-weight:750;}.gm-admin-user-actions small{color:#8b5267;}.gm-admin-loading,.gm-admin-error{padding:24px 12px;text-align:center;color:#765467;}.gm-admin-error{color:#a61c45;}',
      '.gm-simple-shell{position:relative;padding:max(64px,calc(env(safe-area-inset-top) + 44px)) 24px 32px;min-height:100%;box-sizing:border-box;}.gm-simple-title{margin:0 0 4px;color:#86143d;font-size:24px;}.gm-simple-sub{margin:0 0 20px;color:#815165;font-size:13px;word-break:break-word;}',
      '.gm-profile-card{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px;margin-bottom:12px;border:1px solid rgba(180,31,79,.14);border-radius:18px;background:rgba(255,255,255,.85);}.gm-profile-card strong{font-size:14px;color:#3b2333;}',
      '.gm-profile-action{border:0;border-radius:12px;padding:10px 16px;font-size:12px;font-weight:750;cursor:pointer;white-space:nowrap;}.gm-profile-request{background:#ec4899;color:#fff;}.gm-profile-pending{background:#f1e4e8;color:#8a6b76;}.gm-profile-action.gm-primary-button{width:auto;min-height:0;padding:10px 18px;font-size:13px;}',
      '.gm-profile-loading{color:#815165;font-size:13px;}',
      '.gm-profile-logout{margin-top:24px;width:100%;border:1px solid rgba(180,31,79,.2);border-radius:14px;padding:13px;background:transparent;color:#8f183d;font-weight:750;cursor:pointer;}',
      '#gm-toast{position:fixed;left:50%;bottom:28px;z-index:2147483647;transform:translate(-50%,20px);opacity:0;transition:opacity .2s,transform .2s;max-width:min(88vw,360px);padding:13px 18px;border-radius:14px;background:#1f1522;color:#fff;font-size:13px;text-align:center;box-shadow:0 12px 30px rgba(0,0,0,.28);}#gm-toast.gm-toast-visible{opacity:1;transform:translate(-50%,0);}',
      '@media(min-width:700px){.gm-screen-shell,.gm-home-shell{min-height:calc(100% - 48px);margin:24px auto;border-radius:36px;}}',
      '@media(max-width:430px){.gm-home-shell{padding-left:12px;padding-right:12px;}.gm-command-header{grid-template-columns:minmax(0,61%) minmax(0,39%);min-height:204px;margin-left:-12px;margin-right:-12px;padding:10px 12px 9px;}.gm-command-logo{width:43px;height:51px;}.gm-command-name{font-size:clamp(28px,8vw,34px);}.gm-command-clinician img{right:-7px;bottom:-12px;width:127%;height:calc(100% + 9px);}.gm-command-greeting{padding-top:6px;}.gm-command-greeting h2{font-size:clamp(18px,5vw,21px);}.gm-command-greeting p{font-size:clamp(11px,3.15vw,13px);}.gm-command-quick-grid{gap:5px;}.gm-command-quick-label{font-size:9px;}.gm-command-module-grid{gap:8px;}.gm-command-module{grid-template-columns:40px minmax(0,1fr) 23px;gap:5px;min-height:84px;padding:7px;}.gm-command-module-icon{width:38px;height:38px;font-size:22px;}.gm-command-arrow{width:23px;height:23px;font-size:19px;}.gm-command-module-copy strong{font-size:11px;}.gm-command-module-copy small{font-size:8px;}.gm-command-stat{grid-template-columns:31px 1fr;padding:3px 5px;}.gm-command-stat-icon{width:30px;height:30px;font-size:17px;}.gm-command-stat strong{font-size:14px;}.gm-command-stat small{font-size:8px;}}',
      '@media(max-width:350px){.gm-command-header{grid-template-columns:minmax(0,64%) minmax(0,36%);}.gm-command-name{font-size:27px;}.gm-command-greeting h2{font-size:17px;}.gm-command-module-grid{grid-template-columns:1fr;}.gm-command-stat-grid{grid-template-columns:1fr;}.gm-command-stat+.gm-command-stat{border-left:0;border-top:1px solid rgba(232,105,145,.18);}}',
      '@media(max-height:900px){.gm-welcome-shell{padding-top:max(10px,env(safe-area-inset-top));padding-bottom:max(10px,env(safe-area-inset-bottom));}.gm-brand-symbol{width:84px;height:88px;margin-bottom:-5px;}.gm-brand-name{font-size:42px;}.gm-brand-subtitle{margin-top:7px;font-size:10px;line-height:1.3;letter-spacing:1.45px;}.gm-heart-divider{margin-top:4px;}.gm-hero-art{width:min(76vw,285px);margin-top:0;}.gm-welcome-start-slot{margin:1px 0 8px;}.gm-primary-button{min-height:52px;font-size:19px;}.gm-features{margin-bottom:8px;}.gm-feature{gap:3px;font-size:11px;}.gm-feature-icon{width:40px;height:40px;font-size:21px;}.gm-welcome-message{margin-bottom:7px;font-size:20px;}.gm-login-link{margin-top:7px;}.gm-author{margin-top:4px;font-size:11px;}}',
      '@media(max-height:720px){.gm-welcome-shell{padding-top:12px;padding-bottom:12px;}.gm-brand-symbol{width:72px;height:76px;}.gm-brand-name{font-size:39px;}.gm-brand-subtitle{margin-top:8px;font-size:10px;}.gm-heart-divider{margin-top:4px;}.gm-hero-art{width:255px;}.gm-welcome-start-slot{margin:1px 0 7px;}.gm-welcome-message{margin:0 0 7px;font-size:19px;}.gm-feature-icon{width:39px;height:39px;font-size:20px;}.gm-features{margin-bottom:10px;}.gm-primary-button{min-height:50px;font-size:18px;}.gm-login-link{margin-top:8px;}.gm-author{margin-top:5px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildWelcome() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'welcome'); screen.setAttribute('aria-label', 'Apresentação do GestaMed');
    screen.innerHTML = '<div class="gm-screen-shell gm-welcome-shell">' +
      '<div class="gm-brand"><img class="gm-brand-symbol" src="gestamed-logo-cutout-v190.png?v=199" alt="Símbolo GestaMed"><h1 class="gm-brand-name"><b>Gesta</b>Med</h1><p class="gm-brand-subtitle">Apoio clínico para<br>profissionais e estudantes.</p><div class="gm-heart-divider" aria-hidden="true">♥</div></div>' +
      '<img class="gm-hero-art" src="gestamed-hero.jpg?v=199" alt="Ilustração de uma gestante em tons de rosa">' +
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
    screen.innerHTML = '<div class="gm-screen-shell gm-login-shell"><button class="gm-back-button" type="button" aria-label="Voltar para a apresentação">‹</button><div class="gm-login-card"><img class="gm-login-logo" src="gestamed-icon-rosa-20260724.png?v=202" alt="GestaMed"><h1>Bem-vindo ao GestaMed</h1><p>Acesse sua conta para continuar.</p><form novalidate><label for="gm-login-email">E-mail</label><input id="gm-login-email" name="email" type="email" autocomplete="email" placeholder="seuemail@exemplo.com"><label for="gm-login-password">Senha</label><div class="gm-password-field"><input id="gm-login-password" name="password" type="password" autocomplete="current-password" placeholder="Digite sua senha"><button class="gm-password-toggle" type="button" aria-label="Mostrar senha">Mostrar</button></div><button class="gm-forgot" type="button">Esqueci minha senha</button><p class="gm-recovery-status" role="status" aria-live="polite"></p><p class="gm-form-error" role="alert">Preencha seu e-mail e sua senha para continuar.</p><button class="gm-primary-button gm-login-submit" type="submit">Entrar</button></form><p class="gm-register">Ainda não tem uma conta? <button type="button">Criar conta</button></p></div></div>';
    screen.querySelector('.gm-back-button').addEventListener('click', function () { setFlowScreen('welcome'); });
    var password = screen.querySelector('#gm-login-password');
    var toggle = screen.querySelector('.gm-password-toggle');
    toggle.addEventListener('click', function () { var show = password.type === 'password'; password.type = show ? 'text' : 'password'; toggle.textContent = show ? 'Ocultar' : 'Mostrar'; toggle.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha'); });
    var forgot = screen.querySelector('.gm-forgot');
    var recoveryStatus = screen.querySelector('.gm-recovery-status');
    forgot.addEventListener('click', function () {
      var emailInput = screen.querySelector('#gm-login-email');
      var email = emailInput.value.trim();
      recoveryStatus.className = 'gm-recovery-status gm-status-visible';
      if (!email || !emailInput.checkValidity()) {
        recoveryStatus.textContent = 'Digite um e-mail válido para receber o link de recuperação.';
        emailInput.focus();
        return;
      }
      forgot.disabled = true;
      forgot.textContent = 'Enviando…';
      recoveryStatus.className = 'gm-recovery-status';
      supabaseAuthRequest('recover?redirect_to=' + encodeURIComponent(recoveryRedirectUrl()), { body: { email: email } }).then(function () {
        recoveryStatus.textContent = 'Se existir uma conta com este e-mail, você receberá um link para criar uma nova senha.';
        recoveryStatus.className = 'gm-recovery-status gm-status-visible gm-status-success';
      }).catch(function (error) {
        recoveryStatus.textContent = error.status === 429 ? 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' : 'Não foi possível enviar o e-mail agora. Verifique sua conexão e tente novamente.';
        recoveryStatus.className = 'gm-recovery-status gm-status-visible';
      }).then(function () {
        forgot.disabled = false;
        forgot.textContent = 'Esqueci minha senha';
      });
    });
    screen.querySelector('form').addEventListener('submit', function (event) {
      event.preventDefault();
      var emailInput = screen.querySelector('#gm-login-email');
      var email = emailInput.value.trim();
      var value = password.value;
      var error = screen.querySelector('.gm-form-error');
      var submit = screen.querySelector('.gm-login-submit');
      if (!email || !emailInput.checkValidity() || !value) { error.textContent = 'Preencha um e-mail válido e sua senha.'; error.classList.add('gm-error-visible'); return; }
      error.classList.remove('gm-error-visible'); submit.disabled = true; submit.textContent = 'Entrando…';
      supabaseAuthRequest('token?grant_type=password', { body: { email: email, password: value } }).then(function (data) {
        saveSession(normalizeSession(data));
        return loadCurrentProfile();
      }).then(routeProfile).catch(function (failure) {
        clearAccount();
        error.textContent = failure.status === 400 ? 'E-mail ou senha incorretos, ou e-mail ainda não confirmado.' : 'Não foi possível entrar agora. Verifique sua conexão e tente novamente.';
        error.classList.add('gm-error-visible');
      }).then(function () { submit.disabled = false; submit.textContent = 'Entrar'; });
    });
    screen.querySelector('.gm-register button').addEventListener('click', function () { setFlowScreen('register'); });
    return screen;
  }

  function buildResetPassword() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'reset-password'); screen.setAttribute('aria-label', 'Criar nova senha do GestaMed');
    screen.innerHTML = '<div class="gm-screen-shell gm-login-shell"><div class="gm-login-card gm-reset-card"><img class="gm-login-logo" src="gestamed-icon-rosa-20260724.png?v=201" alt="GestaMed"><h1>Criar nova senha</h1><p>Escolha uma senha segura para acessar sua conta.</p><form novalidate><label for="gm-reset-password">Nova senha</label><input id="gm-reset-password" name="password" type="password" autocomplete="new-password" minlength="8" placeholder="Mínimo de 8 caracteres" required><label for="gm-reset-confirm">Confirmar nova senha</label><input id="gm-reset-confirm" name="passwordConfirm" type="password" autocomplete="new-password" minlength="8" placeholder="Digite novamente" required><p class="gm-form-error" role="alert"></p><button class="gm-primary-button gm-login-submit" type="submit">Salvar nova senha</button></form></div></div>';
    var form = screen.querySelector('form');
    var submit = screen.querySelector('button[type="submit"]');
    var error = screen.querySelector('.gm-form-error');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var password = screen.querySelector('#gm-reset-password').value;
      var confirmation = screen.querySelector('#gm-reset-confirm').value;
      error.classList.remove('gm-error-visible');
      if (password.length < 8) { error.textContent = 'A nova senha precisa ter pelo menos 8 caracteres.'; error.classList.add('gm-error-visible'); return; }
      if (password !== confirmation) { error.textContent = 'As duas senhas precisam ser iguais.'; error.classList.add('gm-error-visible'); return; }
      if (!recoveryAccessToken) { error.textContent = 'Este link expirou ou já foi usado. Solicite um novo e-mail de recuperação.'; error.classList.add('gm-error-visible'); return; }
      submit.disabled = true; submit.textContent = 'Salvando…';
      supabaseAuthRequest('user', { method: 'PUT', headers: { 'Authorization': 'Bearer ' + recoveryAccessToken }, body: { password: password } }).then(function () {
        clearRecoveryCallback();
        setFlowScreen('login');
        var status = document.querySelector('#gm-app-flow .gm-recovery-status');
        if (status) { status.textContent = 'Senha alterada com sucesso. Agora você já pode entrar.'; status.className = 'gm-recovery-status gm-status-visible gm-status-success'; }
      }).catch(function (failure) {
        error.textContent = translateAuthError(failure, 'Não foi possível alterar a senha. O link pode ter expirado; solicite um novo e-mail.');
        error.classList.add('gm-error-visible');
      }).then(function () { submit.disabled = false; submit.textContent = 'Salvar nova senha'; });
    });
    return screen;
  }

  function buildRegister() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'register'); screen.setAttribute('aria-label', 'Cadastro do GestaMed');
    screen.innerHTML = '<div class="gm-screen-shell gm-login-shell"><button class="gm-back-button" type="button" aria-label="Voltar para o login">‹</button><div class="gm-login-card"><img class="gm-login-logo" src="gestamed-icon-rosa-20260724.png?v=202" alt="GestaMed"><h1>Criar conta</h1><p>Seu acesso será liberado pela administração.</p><form novalidate><label for="gm-register-name">Nome na tela inicial</label><input id="gm-register-name" name="displayName" type="text" autocomplete="name" maxlength="24" placeholder="Ex.: Tiago" required><label for="gm-register-email">E-mail</label><input id="gm-register-email" name="email" type="email" autocomplete="email" placeholder="seuemail@exemplo.com" required><label for="gm-register-password">Senha</label><div class="gm-password-field"><input id="gm-register-password" name="password" type="password" autocomplete="new-password" minlength="8" placeholder="Mínimo de 8 caracteres" required><button class="gm-password-toggle" type="button" aria-label="Mostrar senha">Mostrar</button></div><p class="gm-form-error" role="alert"></p><button class="gm-primary-button gm-login-submit" type="submit">Solicitar acesso</button></form><p class="gm-register">Já tem uma conta? <button type="button">Entrar</button></p></div></div>';
    screen.querySelector('.gm-back-button').addEventListener('click', function () { setFlowScreen('login'); });
    var password = screen.querySelector('#gm-register-password');
    var toggle = screen.querySelector('.gm-password-toggle');
    toggle.addEventListener('click', function () { var show = password.type === 'password'; password.type = show ? 'text' : 'password'; toggle.textContent = show ? 'Ocultar' : 'Mostrar'; toggle.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha'); });
    screen.querySelector('form').addEventListener('submit', function (event) {
      event.preventDefault();
      var displayName = cleanDisplayName(screen.querySelector('#gm-register-name').value);
      var emailInput = screen.querySelector('#gm-register-email');
      var email = emailInput.value.trim();
      var value = password.value;
      var error = screen.querySelector('.gm-form-error');
      var submit = screen.querySelector('.gm-login-submit');
      if (!displayName || !email || !emailInput.checkValidity() || value.length < 8) { error.textContent = 'Preencha o nome, um e-mail válido e uma senha com pelo menos 8 caracteres.'; error.classList.add('gm-error-visible'); return; }
      error.classList.remove('gm-error-visible'); submit.disabled = true; submit.textContent = 'Criando conta…';
      supabaseAuthRequest('signup?redirect_to=' + encodeURIComponent(window.location.origin + window.location.pathname), {
        body: { email: email, password: value, data: { display_name: displayName } }
      }).then(function (data) {
        saveDisplayProfile(email, displayName);
        if (data.access_token) {
          saveSession(normalizeSession(data));
          return loadCurrentProfile().then(routeProfile);
        }
        renderAccountStatus('Confirme seu e-mail', 'Enviamos uma mensagem para ' + email + '. Depois de confirmar o e-mail, volte ao GestaMed. Seu cadastro ficará aguardando a liberação da administração.');
        setFlowScreen('account-status');
      }).catch(function (failure) {
        error.textContent = translateAuthError(failure, 'Não foi possível criar a conta agora. Tente novamente em instantes.');
        error.classList.add('gm-error-visible');
      }).then(function () { submit.disabled = false; submit.textContent = 'Solicitar acesso'; });
    });
    screen.querySelector('.gm-register button').addEventListener('click', function () { setFlowScreen('login'); });
    return screen;
  }

  function renderAccountStatus(customTitle, customMessage) {
    var screen = document.querySelector('#gm-app-flow [data-screen="account-status"]');
    if (!screen) return;
    var status = activeProfile && activeProfile.account_status;
    var content = {
      pending: ['Cadastro em análise', 'Seu cadastro foi recebido. Assim que a administração liberar seu acesso, o painel ficará disponível.'],
      denied: ['Cadastro não aprovado', 'A administração não aprovou este cadastro. Entre em contato com o responsável pelo GestaMed.'],
      blocked: ['Acesso bloqueado', 'Seu acesso foi bloqueado pela administração. Entre em contato com o responsável pelo GestaMed.']
    }[status] || ['Confirme seu e-mail', 'Abra a mensagem enviada para seu e-mail e confirme o cadastro para continuar.'];
    screen.querySelector('h1').textContent = customTitle || content[0];
    screen.querySelector('.gm-account-status-message').textContent = customMessage || content[1];
    var reason = screen.querySelector('.gm-account-status-reason');
    reason.textContent = activeProfile && activeProfile.status_reason ? activeProfile.status_reason : '';
    reason.hidden = !reason.textContent;
    screen.querySelector('.gm-account-refresh').hidden = !activeSession;
  }

  function buildAccountStatus() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'account-status'); screen.setAttribute('aria-label', 'Situação do cadastro');
    screen.innerHTML = '<div class="gm-screen-shell gm-login-shell"><div class="gm-login-card gm-status-card"><img class="gm-login-logo" src="gestamed-icon-rosa-20260724.png?v=202" alt="GestaMed"><div class="gm-status-icon">⏳</div><h1>Cadastro em análise</h1><p class="gm-account-status-message"></p><p class="gm-account-status-reason" hidden></p><button class="gm-primary-button gm-account-refresh" type="button">Atualizar situação</button><button class="gm-secondary-button gm-account-exit" type="button">Sair</button></div></div>';
    screen.querySelector('.gm-account-refresh').addEventListener('click', function () {
      var button = this; button.disabled = true; button.textContent = 'Atualizando…';
      loadCurrentProfile().then(routeProfile).catch(function () { renderAccountStatus('Não foi possível atualizar', 'Verifique sua conexão e tente novamente.'); }).then(function () { button.disabled = false; button.textContent = 'Atualizar situação'; });
    });
    screen.querySelector('.gm-account-exit').addEventListener('click', logout);
    return screen;
  }

  function statusLabel(status) {
    return { pending:'Pendente', approved:'Aprovado', denied:'Negado', blocked:'Bloqueado' }[status] || status;
  }

  function resourceLabel(resource) {
    return resource === 'cid' ? 'Consulta de Exames — CID' : 'Laboratório Labor Análise';
  }

  function showToast(message) {
    var old = document.getElementById('gm-toast');
    if (old) old.remove();
    var toast = document.createElement('div');
    toast.id = 'gm-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(function () { toast.classList.add('gm-toast-visible'); }, 10);
    window.setTimeout(function () { toast.remove(); }, 3200);
  }

  function fetchMyAccessRequests() {
    if (!activeProfile) return Promise.resolve({});
    return supabaseRestRequest('access_requests?user_id=eq.' + encodeURIComponent(activeProfile.id) + '&select=resource,status').then(function (rows) {
      var map = {};
      (rows || []).forEach(function (row) { map[row.resource] = row.status; });
      return map;
    }).catch(function () { return {}; });
  }

  function requestAccess(resource) {
    return supabaseRestRequest('rpc/request_resource_access', { method: 'POST', body: { p_resource: resource } });
  }

  function renderProfile() {
    var emailLine = document.getElementById('gm-profile-email');
    if (emailLine && activeProfile) emailLine.textContent = activeProfile.email;
    var body = document.getElementById('gm-profile-body');
    if (!body || !activeProfile) return;
    body.innerHTML = '<p class="gm-profile-loading">Carregando...</p>';
    fetchMyAccessRequests().then(function (requests) {
      function card(resource, url) {
        var granted = activeProfile[resource === 'cid' ? 'cid_access' : 'labor_access'];
        var status = requests[resource];
        var actionHtml;
        if (granted) {
          actionHtml = url
            ? '<button type="button" class="gm-profile-action gm-primary-button" data-action="open" data-url="' + url + '">Acessar</button>'
            : '<button type="button" class="gm-profile-action gm-profile-pending" disabled>Em breve</button>';
        } else if (status === 'pending') {
          actionHtml = '<button type="button" class="gm-profile-action gm-profile-pending" disabled>Aguardando aprovação</button>';
        } else {
          actionHtml = '<button type="button" class="gm-profile-action gm-profile-request" data-action="request" data-resource="' + resource + '">Solicitar acesso</button>';
        }
        return '<div class="gm-profile-card"><strong>' + resourceLabel(resource) + '</strong>' + actionHtml + '</div>';
      }
      body.innerHTML = card('cid', CID_URL) + card('labor_analise', LABOR_ANALISE_URL);
      body.querySelectorAll('[data-action="request"]').forEach(function (button) {
        button.addEventListener('click', function () {
          button.disabled = true; button.textContent = 'Enviando...';
          requestAccess(button.getAttribute('data-resource')).then(function () {
            showToast('Pedido enviado! Você será avisado quando for autorizado.');
            renderProfile();
          }).catch(function () {
            showToast('Não foi possível enviar o pedido. Tente novamente.');
            renderProfile();
          });
        });
      });
      body.querySelectorAll('[data-action="open"]').forEach(function (button) {
        button.addEventListener('click', function () { openExternal(button.getAttribute('data-url')); });
      });
    }).catch(function () {
      body.innerHTML = '<p class="gm-profile-loading">Não foi possível carregar suas permissões.</p>';
    });
  }

  function buildProfile() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'profile'); screen.setAttribute('aria-label', 'Perfil');
    screen.innerHTML = '<div class="gm-screen-shell"><button class="gm-back-button" type="button" aria-label="Voltar">‹</button><div class="gm-simple-shell"><h1 class="gm-simple-title">Perfil</h1><p class="gm-simple-sub" id="gm-profile-email"></p><div id="gm-profile-body"></div><button type="button" class="gm-profile-logout">Sair</button></div></div>';
    screen.querySelector('.gm-back-button').addEventListener('click', showHome);
    screen.querySelector('.gm-profile-logout').addEventListener('click', logout);
    return screen;
  }

  function loadAccessRequests() {
    var list = document.querySelector('#gm-app-flow .gm-admin-user-list');
    if (!list) return;
    list.innerHTML = '<p class="gm-admin-loading">Carregando pedidos…</p>';
    supabaseRestRequest('access_requests?status=eq.pending&select=id,resource,requested_at,profiles(email,display_name)&order=requested_at.asc').then(function (rows) {
      list.innerHTML = '';
      if (!rows || !rows.length) { list.innerHTML = '<p class="gm-admin-loading">Nenhum pedido de acesso pendente.</p>'; return; }
      rows.forEach(function (row) {
        var card = document.createElement('article'); card.className = 'gm-admin-user-card';
        var title = document.createElement('strong'); title.textContent = (row.profiles && (row.profiles.display_name || row.profiles.email)) || 'Usuário';
        var email = document.createElement('span'); email.textContent = (row.profiles && row.profiles.email) || '';
        var badge = document.createElement('em'); badge.className = 'gm-admin-status gm-admin-status-pending'; badge.textContent = resourceLabel(row.resource);
        var actions = document.createElement('div'); actions.className = 'gm-admin-user-actions';
        [['approved','Aprovar'],['denied','Negar']].forEach(function (choice) {
          var button = document.createElement('button'); button.type = 'button'; button.textContent = choice[1];
          button.addEventListener('click', function () { decideAccessRequest(row.id, choice[0], button); });
          actions.appendChild(button);
        });
        card.appendChild(title); card.appendChild(email); card.appendChild(badge); card.appendChild(actions); list.appendChild(card);
      });
    }).catch(function () { list.innerHTML = '<p class="gm-admin-error">Não foi possível carregar os pedidos.</p>'; });
  }

  function decideAccessRequest(requestId, decision, button) {
    button.parentNode.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
    supabaseRestRequest('rpc/admin_decide_request', { method: 'POST', body: { request_id: requestId, decision: decision } }).then(function () {
      loadAccessRequests();
    }).catch(function () {
      window.alert('Não foi possível decidir o pedido. Tente novamente.');
      button.parentNode.querySelectorAll('button').forEach(function (b) { b.disabled = false; });
    });
  }

  function loadAdminUsers(status) {
    var list = document.querySelector('#gm-app-flow .gm-admin-user-list');
    if (!list) return;
    list.innerHTML = '<p class="gm-admin-loading">Carregando cadastros…</p>';
    var filter = status && status !== 'all' ? '&account_status=eq.' + encodeURIComponent(status) : '';
    supabaseRestRequest('profiles?select=id,email,display_name,is_admin,account_status,status_reason,created_at&order=created_at.desc' + filter).then(function (rows) {
      list.innerHTML = '';
      if (!rows || !rows.length) { list.innerHTML = '<p class="gm-admin-loading">Nenhum cadastro nesta categoria.</p>'; return; }
      rows.forEach(function (profile) {
        var card = document.createElement('article'); card.className = 'gm-admin-user-card';
        var title = document.createElement('strong'); title.textContent = profile.display_name || 'Sem nome';
        var email = document.createElement('span'); email.textContent = profile.email || '';
        var badge = document.createElement('em'); badge.className = 'gm-admin-status gm-admin-status-' + profile.account_status; badge.textContent = statusLabel(profile.account_status);
        var actions = document.createElement('div'); actions.className = 'gm-admin-user-actions';
        if (profile.is_admin) {
          var root = document.createElement('small'); root.textContent = 'Administrador raiz — acesso permanente'; actions.appendChild(root);
        } else {
          [['approved','Aprovar'],['denied','Negar'],['blocked','Bloquear']].forEach(function (choice) {
            if (choice[0] === profile.account_status || (choice[0] === 'denied' && profile.account_status === 'approved')) return;
            var button = document.createElement('button'); button.type = 'button'; button.textContent = choice[0] === 'approved' && profile.account_status === 'blocked' ? 'Reativar' : choice[1];
            button.setAttribute('data-status', choice[0]);
            button.addEventListener('click', function () { decideAccount(profile, choice[0], button); });
            actions.appendChild(button);
          });
        }
        card.appendChild(title); card.appendChild(email); card.appendChild(badge); card.appendChild(actions); list.appendChild(card);
      });
    }).catch(function () { list.innerHTML = '<p class="gm-admin-error">Não foi possível carregar os cadastros.</p>'; });
  }

  function decideAccount(profile, status, button) {
    var reason = '';
    if (status === 'denied' || status === 'blocked') reason = window.prompt('Motivo (opcional):', '') || '';
    button.disabled = true;
    supabaseRestRequest('profiles?id=eq.' + encodeURIComponent(profile.id), {
      method:'PATCH', headers:{ 'Prefer':'return=minimal' }, body:{ account_status:status, status_reason:reason || null }
    }).then(function () { loadAdminUsers(document.querySelector('.gm-admin-tab-active').getAttribute('data-status')); loadServerNotices(); }).catch(function () {
      window.alert('Não foi possível alterar o acesso. Tente novamente.'); button.disabled = false;
    });
  }

  function showAdmin() {
    if (!activeProfile || !activeProfile.is_admin) return;
    setFlowScreen('admin'); loadAdminUsers('pending');
  }

  function buildAdmin() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'admin'); screen.setAttribute('aria-label', 'Administração de acessos');
    screen.innerHTML = '<main class="gm-admin-shell"><header><button class="gm-admin-back" type="button" aria-label="Voltar">‹</button><div><h1>Administração</h1><p>Cadastros e permissões de acesso</p></div></header><div class="gm-admin-tabs"><button class="gm-admin-tab-active" data-status="pending" type="button">Pendentes</button><button data-status="approved" type="button">Aprovados</button><button data-status="blocked" type="button">Bloqueados</button><button data-status="denied" type="button">Negados</button><button data-status="all" type="button">Todos</button><button data-status="access-requests" type="button">Acessos (CID/Labor)</button></div><section class="gm-admin-user-list" aria-live="polite"></section></main>';
    screen.querySelector('.gm-admin-back').addEventListener('click', showHome);
    screen.querySelectorAll('.gm-admin-tabs button').forEach(function (button) {
      button.addEventListener('click', function () {
        screen.querySelectorAll('.gm-admin-tabs button').forEach(function (item) { item.classList.remove('gm-admin-tab-active'); });
        button.classList.add('gm-admin-tab-active');
        var status = button.getAttribute('data-status');
        if (status === 'access-requests') loadAccessRequests(); else loadAdminUsers(status);
      });
    });
    return screen;
  }

  function buildHome() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'home'); screen.setAttribute('aria-label', 'Tela inicial GestaMed');
    var shell = document.createElement('main'); shell.className = 'gm-home-shell';
    shell.innerHTML = '<header class="gm-command-header"><div class="gm-command-brand-area"><div class="gm-command-brand-row"><img class="gm-command-logo" src="gestamed-logo-cutout-v190.png?v=202" alt="Símbolo GestaMed"><h1 class="gm-command-name"><b>Gesta</b>Med</h1></div><p class="gm-command-tagline">Cuidar com conhecimento,<br>decidir com segurança.</p><div class="gm-command-heart" aria-hidden="true">♥</div><div class="gm-command-actions"><button class="gm-command-action gm-command-admin" type="button" aria-label="Abrir administração" hidden>⚙</button><button class="gm-command-action gm-command-notices" type="button" aria-label="Abrir avisos">🔔<span class="gm-command-action-badge" hidden></span></button><button class="gm-command-action gm-command-logout" type="button" aria-label="Sair da conta">↪</button></div></div><div class="gm-command-clinician" aria-hidden="true"><img src="gestamed-clinician-cutout-v190.png?v=202" alt=""></div><div class="gm-command-greeting"><h2>Olá, <span data-gm-display-name>Profissional</span>! <span aria-hidden="true">♥</span></h2><p>Acesse conteúdos confiáveis para apoiar sua prática com excelência.</p></div></header>' +
      '<form class="gm-command-search" role="search"><input id="gm-flow-home-search" type="search" autocomplete="off" spellcheck="false" placeholder="Pesquisar medicamento ou princípio ativo" aria-label="Pesquisar medicamento ou princípio ativo"></form>' +
      '<div class="gm-command-filter-row" aria-label="Filtros por sintomas e classes farmacêuticas">' + commandFilterMarkup() + '</div>' +
      '<h2 class="gm-command-section-title">Acesso rápido</h2><div class="gm-command-quick-grid"><button class="gm-command-quick gm-quick-agenda" type="button" data-gm-dev="Agenda"><span class="gm-command-quick-icon">▦</span><span class="gm-command-quick-label">Agenda</span></button><button class="gm-command-quick gm-quick-checklists" type="button" data-gm-dev="Checklists"><span class="gm-command-quick-icon">✓</span><span class="gm-command-quick-label">Checklists</span></button><button class="gm-command-quick gm-quick-calculadoras" type="button" data-gm-dev="Calculadoras"><span class="gm-command-quick-icon">∑</span><span class="gm-command-quick-label">Calculadoras</span></button><button class="gm-command-quick gm-quick-favoritos" type="button" data-gm-dev="Favoritos"><span class="gm-command-quick-icon">♥</span><span class="gm-command-quick-label">Favoritos</span></button><button class="gm-command-quick gm-quick-lembretes" type="button" data-gm-dev="Lembretes"><span class="gm-command-quick-icon">!</span><span class="gm-command-quick-label">Lembretes</span></button></div>' +
      '<section class="gm-command-module-grid" aria-label="Módulos do GestaMed"><button class="gm-command-module gm-card-blue" type="button" data-gm-module="idade"><span class="gm-command-module-icon">📅</span><span class="gm-command-module-copy"><strong>Idade gestacional</strong></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-pink" type="button" data-gm-module="insulina"><span class="gm-command-module-icon">🩸</span><span class="gm-command-module-copy"><strong>Cálculo de insulina (DMG)</strong></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-green" type="button" data-gm-module="exames"><span class="gm-command-module-icon">📋</span><span class="gm-command-module-copy"><strong>Painel de Exames</strong><small>Pré-natal habitual, baixo risco</small></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-purple" type="button" data-gm-module="peso"><span class="gm-command-module-icon">📈</span><span class="gm-command-module-copy"><strong>Ganho de peso gestacional</strong></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-orange" type="button" data-gm-module="prescricoes"><span class="gm-command-module-icon">💊</span><span class="gm-command-module-copy"><strong>Prescrições por Trimestre</strong><small>Dose e posologia</small></span><span class="gm-command-arrow">›</span></button><button class="gm-command-module gm-card-pink" type="button" data-gm-module="condutas"><span class="gm-command-module-icon">🩺</span><span class="gm-command-module-copy"><strong>Condutas Obstétricas</strong><small>Emergências e prescrição-modelo</small></span><span class="gm-command-arrow">›</span></button></section>' +
      '<section class="gm-command-stats" aria-label="Base de medicamentos"><h3>Base de medicamentos</h3><div class="gm-command-stat-grid"><div class="gm-command-stat"><span class="gm-command-stat-icon">▤</span><span><strong>1.514</strong><small>registros pesquisáveis</small></span></div><div class="gm-command-stat"><span class="gm-command-stat-icon">🧬</span><span><strong>614</strong><small>princípios ativos</small></span></div><div class="gm-command-stat gm-command-stat-review"><span class="gm-command-stat-icon">⏱</span><span><strong>900</strong><small>pendentes de revisão</small></span></div></div></section>' +
      '<section class="gm-command-evidence"><span class="gm-command-evidence-icon">♢</span><span><strong>Conteúdo baseado em evidências</strong><small>Informações atualizadas conforme diretrizes do Ministério da Saúde e FEBRASGO.</small></span><span class="gm-command-evidence-check">✓</span></section>' +
      '<nav class="gm-command-nav" aria-label="Navegação principal"><button class="gm-nav-active" type="button" data-gm-nav="inicio"><span class="gm-command-nav-icon">⌂</span>Início</button><button type="button" data-gm-nav="obstetricia"><span class="gm-command-nav-icon">♧</span>Obstetrícia</button><button class="gm-nav-main" type="button" data-gm-nav="prenatal"><span class="gm-command-nav-icon">♡</span>Pré-natal</button><button type="button" data-gm-nav="protocolos"><span class="gm-command-nav-icon">▤</span>Protocolos</button><button type="button" data-gm-nav="perfil"><span class="gm-command-nav-icon">♙</span>Perfil</button></nav>';
    var search = shell.querySelector('#gm-flow-home-search');
    shell.querySelector('.gm-command-notices').addEventListener('click', showNotices);
    shell.querySelector('.gm-command-admin').addEventListener('click', showAdmin);
    shell.querySelector('.gm-command-logout').addEventListener('click', logout);
    search.addEventListener('input', function () {
      var original = findSearchInput();
      if (!original) return;
      original.value = search.value;
      dispatchInput(original);
      if (search.value.trim()) {
        hideFlow();
        window.setTimeout(function () { original.focus(); }, 30);
      }
    });
    shell.querySelector('.gm-command-search').addEventListener('submit', function (event) { event.preventDefault(); var original = findSearchInput(); if (!original) { showDevelopmentMessage('Pesquisa de medicamentos'); return; } original.value = search.value; dispatchInput(original); hideFlow(); window.setTimeout(function () { original.focus(); }, 30); });
    shell.querySelectorAll('[data-gm-command-filter]').forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = commandFilters.find(function (item) { return item.id === button.getAttribute('data-gm-command-filter'); });
        if (!filter) return;
        if (!activate([filter.label])) showDevelopmentMessage(filter.label);
      });
    });
    shell.querySelectorAll('[data-gm-dev]').forEach(function (button) { button.addEventListener('click', function () { showDevelopmentMessage(button.getAttribute('data-gm-dev')); }); });
    var moduleActions = {idade:['Idade gestacional'],insulina:['Cálculo de insulina','Calculo de insulina','Insulina','DMG'],exames:['Painel de Exames','Painel de exames'],peso:['Ganho de peso gestacional','Ganho de peso'],prescricoes:['Prescrições por Trimestre','Prescricoes por Trimestre','Prescrições'],condutas:['Condutas Obstétricas','Condutas Obstetricas','Condutas']};
    shell.querySelectorAll('[data-gm-module]').forEach(function (button) { button.addEventListener('click', function () { var labels = moduleActions[button.getAttribute('data-gm-module')]; if (!activate(labels)) showDevelopmentMessage(labels[0]); }); });
    shell.querySelector('[data-gm-nav="inicio"]').addEventListener('click', showHome);
    shell.querySelector('[data-gm-nav="obstetricia"]').addEventListener('click', function () { if (!activate(['Obstetrícia','Obstetricia','Condutas Obstétricas','Condutas Obstetricas','Condutas'])) showDevelopmentMessage('Obstetrícia'); });
    shell.querySelector('[data-gm-nav="prenatal"]').addEventListener('click', function () { if (!activate(['Pré-natal','Pre natal'])) showDevelopmentMessage('Pré-natal'); });
    shell.querySelector('[data-gm-nav="protocolos"]').addEventListener('click', function () { showDevelopmentMessage('Protocolos'); });
    shell.querySelector('[data-gm-nav="perfil"]').addEventListener('click', function () { setFlowScreen('profile'); renderProfile(); });
    screen.appendChild(shell); return screen;
  }

  function buildFlow() {
    removeLegacyEntryLayers(); ensureStyle();
    var flow = document.createElement('div'); flow.id = 'gm-app-flow';
    flow.appendChild(buildWelcome()); flow.appendChild(buildLogin()); flow.appendChild(buildRegister()); flow.appendChild(buildResetPassword()); flow.appendChild(buildAccountStatus()); flow.appendChild(buildAdmin()); flow.appendChild(buildHome()); flow.appendChild(buildProfile());
    document.body.appendChild(flow);
    if (readRecoveryCallback()) {
      setFlowScreen('reset-password');
    } else {
      readAuthenticationCallback();
      activeSession = activeSession || readSession();
      if (activeSession) {
        setFlowScreen('account-status');
        renderAccountStatus('Verificando acesso', 'Aguarde enquanto verificamos sua conta.');
        loadCurrentProfile().then(routeProfile).catch(function () { clearAccount(); setFlowScreen('login'); });
      } else {
        setFlowScreen('welcome');
      }
    }
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
