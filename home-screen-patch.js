(function () {
  'use strict';

  var PATCH_ID = 'gestamed-entry-flow-2026-08-14-184';
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

  function makeHotspot(parent, definition) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'gm-home-hotspot' + (definition.disabled ? ' gm-home-hotspot-disabled' : '');
    button.style.left = definition.x + '%';
    button.style.top = definition.y + '%';
    button.style.width = definition.w + '%';
    button.style.height = definition.h + '%';
    button.setAttribute('aria-label', definition.aria || definition.labels[0]);
    if (definition.disabled) button.setAttribute('aria-disabled', 'true');
    button.addEventListener('click', function (event) {
      event.preventDefault(); event.stopPropagation();
      if (definition.url) { openExternal(definition.url); return; }
      if (definition.disabled) { showDevelopmentMessage(definition.labels[0]); return; }
      if (!activate(definition.labels)) showDevelopmentMessage(definition.labels[0]);
    });
    parent.appendChild(button);
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
      '.gm-screen-shell{position:relative;width:min(100%,520px);min-height:100%;margin:0 auto;background:#fff1f4 url("gestamed-background-clean.jpg?v=184") center/cover no-repeat;overflow:hidden;box-shadow:0 0 40px rgba(98,37,65,.12);}',
      '.gm-welcome-shell{display:flex;flex-direction:column;align-items:center;padding:max(22px,env(safe-area-inset-top)) 28px max(20px,env(safe-area-inset-bottom));}',
      '.gm-brand{text-align:center;}.gm-brand-symbol{display:block;width:74px;height:82px;margin:0 auto -2px;object-fit:cover;mix-blend-mode:multiply;}',
      '.gm-brand-name{margin:0;color:#ef6682;font-size:clamp(42px,11vw,58px);font-weight:300;letter-spacing:-2.8px;line-height:1;}.gm-brand-name b{color:#c7144f;font-weight:650;}',
      '.gm-brand-subtitle{margin:13px 0 0;color:#6d243b;font-size:13px;font-weight:650;line-height:1.42;letter-spacing:1.9px;text-transform:uppercase;}',
      '.gm-heart-divider{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:8px;color:#ed6485;font-size:14px;}.gm-heart-divider:before,.gm-heart-divider:after{content:"";width:45px;height:1px;background:rgba(160,57,88,.25);}',
      '.gm-hero-art{display:block;width:min(100%,355px);aspect-ratio:487/475;margin:3px auto 0;object-fit:cover;mix-blend-mode:multiply;border-radius:48% 48% 44% 44%;}',
      '.gm-welcome-message{margin:4px 0 13px;color:#b71d50;text-align:center;font-size:clamp(21px,5.8vw,28px);font-weight:750;line-height:1.18;}',
      '.gm-features{width:100%;display:grid;grid-template-columns:repeat(3,1fr);margin:0 auto 17px;}.gm-feature{min-width:0;display:flex;flex-direction:column;align-items:center;gap:5px;padding:0 8px;color:#6d2039;text-align:center;font-size:12px;line-height:1.22;}.gm-feature+.gm-feature{border-left:1px solid rgba(177,49,88,.2);}',
      '.gm-feature-icon{width:47px;height:47px;display:grid;place-items:center;border:1.5px solid #cb3f68;border-radius:50%;color:#cb3f68;font-size:24px;font-weight:400;}.gm-welcome-actions{width:100%;margin-top:auto;}',
      '.gm-primary-button{width:100%;min-height:60px;border:0;border-radius:22px;color:#fff;background:linear-gradient(105deg,#d40d4e 0%,#ea3f65 48%,#ff786e 100%);box-shadow:0 10px 24px rgba(194,25,78,.25);cursor:pointer;font-size:21px;font-weight:550;}',
      '.gm-login-link{display:block;margin:16px auto 0;padding:4px 8px;border:0;color:#651b35;background:transparent;cursor:pointer;font-size:15px;}.gm-login-link b{color:#d82f62;}.gm-author{margin:10px 0 0;color:#ce5780;font-size:12px;}',
      '.gm-login-shell{display:grid;place-items:center;padding:70px 28px 32px;}.gm-back-button{position:absolute;z-index:2;top:max(20px,env(safe-area-inset-top));left:22px;width:43px;height:43px;border:1px solid rgba(180,31,79,.16);border-radius:50%;color:#b8184d;background:rgba(255,255,255,.72);box-shadow:0 6px 18px rgba(115,32,59,.08);cursor:pointer;font-size:34px;line-height:1;}',
      '.gm-login-card{width:100%;padding:28px 24px 24px;border:1px solid rgba(255,255,255,.8);border-radius:32px;background:rgba(255,250,251,.78);box-shadow:0 22px 55px rgba(117,34,59,.13);backdrop-filter:blur(12px);text-align:center;}.gm-login-logo{width:104px;height:103px;border-radius:27px;box-shadow:0 8px 22px rgba(184,33,78,.15);}.gm-login-card h1{margin:17px 0 6px;color:#86143d;font-size:26px;letter-spacing:-.6px;}.gm-login-card>p{margin:0;color:#815165;font-size:14px;}.gm-login-card form{margin-top:25px;text-align:left;}.gm-login-card label{display:block;margin:15px 0 7px;color:#6d2039;font-size:13px;font-weight:750;}',
      '.gm-login-card input{box-sizing:border-box;width:100%;height:52px;padding:0 15px;border:1px solid rgba(162,64,96,.2);border-radius:15px;outline:none;color:#5b2035;background:rgba(255,255,255,.88);}.gm-login-card input:focus{border-color:#e4517a;box-shadow:0 0 0 4px rgba(228,81,122,.12);}.gm-password-field{position:relative;}.gm-password-field input{padding-right:78px;}.gm-password-toggle{position:absolute;top:0;right:7px;height:52px;border:0;color:#c92a5d;background:transparent;cursor:pointer;font-size:12px;font-weight:750;}.gm-forgot{display:block;margin:12px 0 0 auto;border:0;color:#bd2857;background:transparent;cursor:pointer;font-size:12px;}.gm-login-submit{min-height:53px;margin-top:19px;border-radius:16px;font-size:17px;}.gm-form-error{display:none;margin:12px 0 0;padding:9px 11px;border-radius:10px;color:#8f183d;background:#ffe1e8;font-size:12px;text-align:left;}.gm-form-error.gm-error-visible{display:block;}.gm-register{margin-top:19px!important;}.gm-register button{border:0;color:#c92458;background:transparent;cursor:pointer;font-weight:750;}',
      '.gm-home-shell{position:relative;width:min(100%,832px);min-height:100%;margin:0 auto;background:#fff4f7;}.gm-home-canvas{position:relative;width:100%;aspect-ratio:832/1792;background:#fff4f7;overflow:hidden;box-shadow:0 0 40px rgba(98,37,65,.12);}.gm-home-image{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;user-select:none;-webkit-user-drag:none;}.gm-home-hotspot{position:absolute;z-index:3;border:0;background:transparent;cursor:pointer;border-radius:22px;-webkit-tap-highlight-color:rgba(236,72,153,.16);}.gm-home-hotspot:focus-visible{outline:3px solid rgba(236,72,153,.48);outline-offset:-2px;background:rgba(255,255,255,.08);}',
      '#gm-home-search{position:absolute;z-index:15;left:9%;top:25.1%;width:79%;height:3.8%;border:0;background:transparent;color:#3b2333;font:500 clamp(12px,3vw,20px)/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:0 2%;outline:none;}#gm-home-search::placeholder{color:transparent;}',
      '#gm-home-dev-message{position:fixed;inset:0;z-index:2147483647;background:rgba(45,24,38,.42);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:24px;}.gm-home-dev-card{width:min(88vw,360px);background:#fff;border-radius:24px;padding:26px 22px;text-align:center;box-shadow:0 24px 70px rgba(82,33,61,.28);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#3b2333;}.gm-home-dev-card strong{display:block;font-size:20px;margin:4px 0 8px;}.gm-home-dev-card p{margin:0 0 20px;color:#76576a;font-size:15px;}.gm-home-dev-icon{font-size:34px;}.gm-home-dev-card button{border:0;border-radius:999px;background:#ec4899;color:#fff;font-weight:800;font-size:15px;padding:12px 26px;}',
      '@media(min-width:700px){.gm-screen-shell,.gm-home-shell{min-height:calc(100% - 48px);margin:24px auto;border-radius:36px;}}',
      '@media(max-height:720px){.gm-welcome-shell{padding-top:12px;padding-bottom:12px;}.gm-brand-symbol{width:55px;height:61px;}.gm-brand-name{font-size:39px;}.gm-brand-subtitle{margin-top:8px;font-size:10px;}.gm-heart-divider{margin-top:4px;}.gm-hero-art{width:255px;}.gm-welcome-message{margin:1px 0 7px;font-size:19px;}.gm-feature-icon{width:39px;height:39px;font-size:20px;}.gm-features{margin-bottom:10px;}.gm-primary-button{min-height:50px;font-size:18px;}.gm-login-link{margin-top:8px;}.gm-author{margin-top:5px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildWelcome() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'welcome'); screen.setAttribute('aria-label', 'Apresentação do GestaMed');
    screen.innerHTML = '<div class="gm-screen-shell gm-welcome-shell">' +
      '<div class="gm-brand"><img class="gm-brand-symbol" src="gestamed-logo-symbol.jpg?v=184" alt="Símbolo GestaMed"><h1 class="gm-brand-name"><b>Gesta</b>Med</h1><p class="gm-brand-subtitle">Apoio clínico para<br>profissionais e estudantes.</p><div class="gm-heart-divider" aria-hidden="true">♥</div></div>' +
      '<img class="gm-hero-art" src="gestamed-hero.jpg?v=184" alt="Ilustração de uma gestante em tons de rosa">' +
      '<p class="gm-welcome-message">Seu apoio prático<br>na rotina da obstetrícia.</p>' +
      '<div class="gm-features" aria-label="Recursos do GestaMed"><div class="gm-feature"><span class="gm-feature-icon">▣</span><span>Protocolos<br>e condutas</span></div><div class="gm-feature"><span class="gm-feature-icon">♡</span><span>Conteúdos<br>confiáveis</span></div><div class="gm-feature"><span class="gm-feature-icon">⌂</span><span>Ferramentas<br>para estudo</span></div></div>' +
      '<div class="gm-welcome-actions"><button id="gm-welcome-start" class="gm-primary-button" type="button">Começar agora</button><button id="gm-welcome-login" class="gm-login-link" type="button">Já tem uma conta? <b>Entrar</b></button></div><p class="gm-author">By Tiago Pereira de Albuquerque</p></div>';
    screen.querySelector('#gm-welcome-start').addEventListener('click', function () { setFlowScreen('login'); });
    screen.querySelector('#gm-welcome-login').addEventListener('click', function () { setFlowScreen('login'); });
    return screen;
  }

  function buildLogin() {
    var screen = document.createElement('section');
    screen.className = 'gm-flow-screen'; screen.setAttribute('data-screen', 'login'); screen.setAttribute('aria-label', 'Login do GestaMed');
    screen.innerHTML = '<div class="gm-screen-shell gm-login-shell"><button class="gm-back-button" type="button" aria-label="Voltar para a apresentação">‹</button><div class="gm-login-card"><img class="gm-login-logo" src="gestamed-icon-rosa-20260724.png?v=184" alt="GestaMed"><h1>Bem-vindo ao GestaMed</h1><p>Acesse sua conta para continuar.</p><form novalidate><label for="gm-login-email">E-mail</label><input id="gm-login-email" name="email" type="email" autocomplete="email" placeholder="seuemail@exemplo.com"><label for="gm-login-password">Senha</label><div class="gm-password-field"><input id="gm-login-password" name="password" type="password" autocomplete="current-password" placeholder="Digite sua senha"><button class="gm-password-toggle" type="button" aria-label="Mostrar senha">Mostrar</button></div><button class="gm-forgot" type="button">Esqueci minha senha</button><p class="gm-form-error" role="alert">Preencha seu e-mail e sua senha para continuar.</p><button class="gm-primary-button gm-login-submit" type="submit">Entrar</button></form><p class="gm-register">Ainda não tem uma conta? <button type="button">Criar conta</button></p></div></div>';
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
    var shell = document.createElement('div'); shell.className = 'gm-home-shell';
    var canvas = document.createElement('div'); canvas.className = 'gm-home-canvas';
    var image = document.createElement('img'); image.className = 'gm-home-image'; image.src = 'F4907271-BC9F-4AC0-AED2-75E16DFBB496.png?v=184'; image.alt = ''; canvas.appendChild(image);
    var search = document.createElement('input'); search.id = 'gm-home-search'; search.type = 'search'; search.autocomplete = 'off'; search.spellcheck = false; search.setAttribute('aria-label', 'Pesquisar medicamento ou princípio ativo');
    search.addEventListener('input', function () { var original = findSearchInput(); if (!original) return; original.value = search.value; dispatchInput(original); });
    search.addEventListener('keydown', function (event) { if (event.key !== 'Enter') return; var original = findSearchInput(); if (!original) return; original.value = search.value; dispatchInput(original); hideFlow(); window.setTimeout(function () { original.focus(); }, 30); });
    canvas.appendChild(search);
    [
      {x:3.5,y:30.2,w:17.5,h:3.9,labels:['Dor']},{x:21.5,y:30.2,w:18.5,h:3.9,labels:['Febre']},{x:40.5,y:30.2,w:19.5,h:3.9,labels:['Alergia']},{x:60.5,y:30.2,w:19.2,h:3.9,labels:['Náusea','Náuseas']},{x:79.8,y:30.2,w:19,h:3.9,labels:['Vômitos','Vomitos']},
      {x:3.2,y:36.7,w:17.2,h:7.7,labels:['Agenda','Calendário'],disabled:true},{x:21.6,y:36.7,w:17.2,h:7.7,labels:['Checklists','Checklist'],disabled:true},{x:40.1,y:36.7,w:17.2,h:7.7,labels:['Calculadoras','Calculadora'],disabled:true},{x:58.6,y:36.7,w:17.2,h:7.7,labels:['Favoritos','Favorito'],disabled:true},{x:77.1,y:36.7,w:19.5,h:7.7,labels:['Lembretes','Lembrete'],disabled:true},
      {x:3.3,y:46.3,w:45.2,h:6.7,labels:['Idade gestacional']},{x:50.6,y:46.3,w:46.1,h:6.7,labels:['Cálculo de insulina','Calculo de insulina','Insulina','DMG']},{x:3.3,y:53.8,w:45.2,h:6.7,labels:['Painel de Exames','Painel de exames']},{x:50.6,y:53.8,w:46.1,h:6.7,labels:['Ganho de peso gestacional','Ganho de peso']},{x:3.3,y:61.4,w:45.2,h:7,labels:['Prescrições por Trimestre','Prescricoes por Trimestre','Prescrições']},{x:50.6,y:61.4,w:46.1,h:7,labels:['Condutas Obstétricas','Condutas Obstetricas','Condutas']},{x:3.3,y:69.9,w:93.4,h:6.9,labels:['Consulta de Exames — CID'],aria:'Consulta de Exames — CID',url:CID_URL},
      {x:0,y:94.5,w:20,h:5.5,labels:['Início','Inicio'],aria:'Início'},{x:20,y:94.5,w:20,h:5.5,labels:['Obstetrícia','Obstetricia'],aria:'Obstetrícia'},{x:40,y:94.2,w:20,h:5.8,labels:['Pré-natal','Pre natal'],aria:'Pré-natal'},{x:60,y:94.5,w:20,h:5.5,labels:['Protocolos','Protocolo'],aria:'Protocolos',disabled:true},{x:80,y:94.5,w:20,h:5.5,labels:['Perfil'],aria:'Perfil',disabled:true}
    ].forEach(function (definition) { makeHotspot(canvas, definition); });
    shell.appendChild(canvas); screen.appendChild(shell); return screen;
  }

  function buildFlow() {
    removeLegacyEntryLayers(); ensureStyle();
    var flow = document.createElement('div'); flow.id = 'gm-app-flow';
    flow.appendChild(buildWelcome()); flow.appendChild(buildLogin()); flow.appendChild(buildHome());
    document.body.appendChild(flow); setFlowScreen('welcome');
    document.addEventListener('click', function (event) { var element = event.target && event.target.closest ? event.target.closest('button,a,[role="button"]') : null; if (!element || element.closest('#gm-app-flow')) return; var text = normalize(element.textContent || element.getAttribute('aria-label') || ''); if (text === 'inicio' || text.indexOf(' inicio') !== -1) window.setTimeout(showHome, 80); }, true);
    function anyModalOpen() { return !!document.querySelector('.modal.open'); }
    var modalObserver = new MutationObserver(function (mutations) { var relevant = mutations.some(function (mutation) { return mutation.target && mutation.target.classList && mutation.target.classList.contains('modal'); }); if (relevant) window.setTimeout(function () { if (!anyModalOpen()) showHome(); }, 60); });
    document.querySelectorAll('.modal').forEach(function (modal) { modalObserver.observe(modal, { attributes: true, attributeFilter: ['class'] }); });
  }

  var attempts = 0;
  function start() { attempts += 1; if (document.body) { buildFlow(); return; } if (attempts < 80) window.setTimeout(start, 150); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
