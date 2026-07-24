(function () {
  'use strict';

  var PATCH_ID = 'gestamed-medication-button-2026-07-24-137';
  if (document.documentElement.getAttribute('data-gm-medication-button') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-medication-button', PATCH_ID);

  var movedRoot = null;
  var placeholder = null;

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isMedicationLabel(element) {
    if (!element) return false;
    var text = normalize(
      (element.getAttribute('aria-label') || '') + ' ' +
      (element.getAttribute('title') || '') + ' ' +
      (element.getAttribute('data-label') || '') + ' ' +
      (element.textContent || '')
    );
    return text === 'medicacao' || text === 'medicacoes' || text === 'medicamento' || text === 'medicamentos' ||
      text.indexOf('consultar medicacao') !== -1 || text.indexOf('pesquisar medicamento') !== -1;
  }

  function originalSearch() {
    var selectors = [
      '#searchInput', '#search-input', '#medicationSearch', '#medication-search',
      'input[type="search"]:not(#gm-home-search)',
      'input[placeholder*="medicamento" i]:not(#gm-home-search)',
      'input[placeholder*="princípio" i]:not(#gm-home-search)',
      'input[placeholder*="principio" i]:not(#gm-home-search)'
    ];
    for (var i = 0; i < selectors.length; i += 1) {
      var input = document.querySelector(selectors[i]);
      if (input && !input.closest('#gm-home-screen,#gm-welcome-screen')) return input;
    }
    return null;
  }

  function findOriginalMedicationTarget(source) {
    var candidates = Array.prototype.slice.call(document.querySelectorAll('button, a, [role="button"], [onclick]'));
    return candidates.find(function (element) {
      if (element === source) return false;
      if (element.closest && element.closest('#gm-home-screen, #gm-welcome-screen, #gm-medication-shell')) return false;
      return isMedicationLabel(element);
    }) || null;
  }

  function fireSearch(input) {
    ['input', 'change', 'keyup'].forEach(function (type) {
      try { input.dispatchEvent(new Event(type, { bubbles: true })); } catch (error) {}
    });
    ['applyFilters', 'filterMedications', 'renderMedications', 'searchMedications', 'performSearch'].forEach(function (name) {
      try { if (typeof window[name] === 'function') window[name](); } catch (error) {}
    });
  }

  function ensureStyle() {
    if (document.getElementById('gm-medication-shell-style')) return;
    var style = document.createElement('style');
    style.id = 'gm-medication-shell-style';
    style.textContent = [
      '#gm-medication-shell{position:fixed;inset:0;z-index:2147483500;background:#fff4f7;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}',
      '#gm-medication-shell.gm-hidden{display:none!important;}',
      '#gm-medication-topbar{height:64px;min-height:64px;background:linear-gradient(135deg,#ef4f91,#d93f80);display:flex;align-items:center;gap:12px;padding:0 16px;color:#fff;box-shadow:0 4px 18px rgba(128,35,82,.22);}',
      '#gm-medication-back{width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.2);color:#fff;font-size:25px;line-height:1;cursor:pointer;}',
      '#gm-medication-title{font-size:19px;font-weight:800;letter-spacing:-.2px;}',
      '#gm-medication-subtitle{font-size:12px;opacity:.9;margin-top:2px;}',
      '#gm-medication-content{flex:1;min-height:0;overflow:auto;-webkit-overflow-scrolling:touch;background:#fff;padding:0;}',
      '#gm-medication-content>[data-gm-medication-root="true"]{display:block!important;visibility:visible!important;position:relative!important;inset:auto!important;width:100%!important;max-width:none!important;min-height:100%!important;margin:0!important;transform:none!important;}',
      'html.gm-medication-active,html.gm-medication-active body{overflow:hidden!important;}'
    ].join('');
    document.head.appendChild(style);
  }

  function chooseMedicationRoot(input) {
    var node = input;
    var best = input.parentElement;
    while (node && node !== document.body) {
      if (node.matches && node.matches('main,[role="main"],section,.screen,.page,.view,.panel,.content,.container')) best = node;
      var text = normalize(node.textContent || '');
      if (text.indexOf('medicamento') !== -1 && node.querySelectorAll && node.querySelectorAll('button,a,input').length >= 2) best = node;
      if (node.parentElement === document.body) break;
      node = node.parentElement;
    }
    if (!best || best === document.body || best.id === 'gm-home-screen' || best.id === 'gm-welcome-screen') best = input.parentElement;
    return best;
  }

  function closeMedication() {
    var shell = document.getElementById('gm-medication-shell');
    if (movedRoot && placeholder && placeholder.parentNode) {
      placeholder.parentNode.insertBefore(movedRoot, placeholder);
      placeholder.remove();
      movedRoot.removeAttribute('data-gm-medication-root');
    }
    movedRoot = null;
    placeholder = null;
    if (shell) shell.remove();
    document.documentElement.classList.remove('gm-medication-active');
    var home = document.getElementById('gm-home-screen');
    if (home) home.classList.remove('gm-home-hidden');
    document.documentElement.classList.add('gm-home-active');
  }

  function mountMedication(input) {
    if (!input || document.getElementById('gm-medication-shell')) return;
    ensureStyle();

    var root = chooseMedicationRoot(input);
    if (!root || !root.parentNode) return;

    placeholder = document.createComment('gestamed-medication-module-placeholder');
    root.parentNode.insertBefore(placeholder, root);
    movedRoot = root;
    movedRoot.setAttribute('data-gm-medication-root', 'true');

    var shell = document.createElement('div');
    shell.id = 'gm-medication-shell';
    shell.innerHTML = '<div id="gm-medication-topbar"><button id="gm-medication-back" type="button" aria-label="Voltar para o início">‹</button><div><div id="gm-medication-title">Medicamentos na gestação</div><div id="gm-medication-subtitle">Consulta por medicamento ou princípio ativo</div></div></div><div id="gm-medication-content"></div>';
    shell.querySelector('#gm-medication-content').appendChild(movedRoot);
    document.body.appendChild(shell);
    document.documentElement.classList.add('gm-medication-active');
    shell.querySelector('#gm-medication-back').addEventListener('click', closeMedication);
  }

  function openMedication(source, initialTerm) {
    var home = document.getElementById('gm-home-screen');
    var welcome = document.getElementById('gm-welcome-screen');
    if (home) home.classList.add('gm-home-hidden');
    if (welcome) welcome.classList.add('gm-welcome-hidden');
    document.documentElement.classList.remove('gm-home-active');

    var target = findOriginalMedicationTarget(source);
    if (target) {
      try { target.click(); } catch (error) {}
    }

    var attempts = 0;
    (function waitForModule() {
      attempts += 1;
      var input = originalSearch();
      if (!input) {
        if (attempts < 40) window.setTimeout(waitForModule, 75);
        return;
      }
      mountMedication(input);
      if (initialTerm) {
        input.value = String(initialTerm).trim();
        fireSearch(input);
      }
      window.setTimeout(function () {
        try { input.scrollIntoView({ block: 'center', behavior: 'auto' }); input.focus(); input.click(); } catch (error) {}
      }, 50);
    })();
  }

  document.addEventListener('click', function (event) {
    var element = event.target && event.target.closest ? event.target.closest('button, a, [role="button"], [onclick]') : null;
    if (!isMedicationLabel(element)) return;
    if (element && element.closest('#gm-medication-shell')) return;
    if (element && element.getAttribute('data-gm-medication-handled') === 'true') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (element) element.setAttribute('data-gm-medication-handled', 'true');
    openMedication(element, '');
    window.setTimeout(function () {
      if (element) element.removeAttribute('data-gm-medication-handled');
    }, 300);
  }, true);

  window.GestaMedOpenMedication = function (term) { openMedication(null, term || ''); };
  window.GestaMedCloseMedication = closeMedication;
})();