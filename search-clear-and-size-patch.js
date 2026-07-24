(function () {
  'use strict';

  var PATCH_ID = 'gestamed-search-clear-size-2026-07-23-122';
  if (document.documentElement.getAttribute('data-gm-search-clear-size') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-search-clear-size', PATCH_ID);

  function normalize(value) {
    return String(value == null ? '' : value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function matchesLabel(element, label) {
    var text = normalize(element && element.textContent);
    var wanted = normalize(label);
    return text === wanted || text.slice(-(wanted.length + 1)) === ' ' + wanted;
  }

  function findSearchInput() {
    return document.querySelector(
      '#searchInput, input[type="search"], input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]'
    );
  }

  function ensureStyle() {
    var oldStyle = document.getElementById('gm-search-clear-size-style');
    if (oldStyle) oldStyle.remove();

    var style = document.createElement('style');
    style.id = 'gm-search-clear-size-style';
    style.textContent = [
      '.gm-filter-strip .gm-original-filter{flex:0 0 auto!important;white-space:nowrap!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;min-height:44px!important;padding-left:14px!important;padding-right:14px!important;border-width:1.5px!important;border-style:solid!important;border-radius:999px!important;font-weight:600!important;letter-spacing:.01em!important;box-shadow:0 2px 7px rgba(15,23,42,.08)!important;line-height:1.15!important;}',
      '.gm-filter-strip .gm-original-filter:active{transform:scale(.97)!important;filter:brightness(.98)!important;}',
      '.gm-search-clear-host{position:relative!important;}',
      '.gm-search-clear-input{padding-right:66px!important;}',
      '.gm-search-clear-button{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important;padding:0!important;margin:0!important;border:0!important;border-radius:999px!important;background:transparent!important;color:#64748b!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;font:700 27px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;cursor:pointer!important;z-index:20!important;-webkit-tap-highlight-color:transparent!important;transition:background .15s ease,color .15s ease,transform .15s ease!important;}',
      '.gm-search-clear-button.gm-has-value{background:#eef2f7!important;color:#0f172a!important;}',
      '.gm-search-clear-button:active{transform:translateY(-50%) scale(.93)!important;background:#e2e8f0!important;}',
      '.gm-search-clear-button:focus-visible{outline:3px solid rgba(14,116,144,.28)!important;outline-offset:1px!important;}',
      '@media (prefers-reduced-motion:reduce){.gm-search-clear-button,.gm-filter-strip .gm-original-filter{transition:none!important;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function sizeOriginalFilters() {
    var strip = document.querySelector('.gm-filter-strip');
    if (!strip) return false;

    var labels = ['Dor', 'Febre', 'Alergia', 'Náuseas', 'Náusea'];
    var clickables = strip.querySelectorAll('button, [role="button"], a');
    var count = 0;

    Array.prototype.forEach.call(clickables, function (element) {
      if (labels.some(function (label) { return matchesLabel(element, label); })) {
        element.classList.add('gm-original-filter');
        count += 1;
      }
    });

    return count >= 4;
  }

  function iconCandidate(element) {
    if (!element || element.id === 'gm-search-clear-button') return false;
    if (element.querySelector && element.querySelector('input')) return false;

    var text = String(element.textContent || '');
    var label = String(element.getAttribute && (element.getAttribute('aria-label') || element.getAttribute('title')) || '');
    var className = typeof element.className === 'string' ? element.className : '';
    var combined = normalize(label + ' ' + className);

    return /[🔍🔎]/.test(text) || /(^| )(pesquisar|buscar|search|lupa)( |$)/.test(combined);
  }

  function chooseHost(input) {
    var current = input.parentElement;
    var fallback = current;
    var depth = 0;

    while (current && depth < 4) {
      var candidates = Array.prototype.filter.call(
        current.querySelectorAll('button, [role="button"], span, i, svg, div'),
        iconCandidate
      );
      if (candidates.length) return { host: current, icons: candidates };
      current = current.parentElement;
      depth += 1;
    }

    return { host: fallback, icons: [] };
  }

  function hideOriginalMagnifier(hostInfo) {
    hostInfo.icons.forEach(function (icon) {
      icon.setAttribute('data-gm-hidden-search-icon', 'true');
      icon.style.setProperty('display', 'none', 'important');
    });

    Array.prototype.forEach.call(hostInfo.host.childNodes, function (node) {
      if (node.nodeType === Node.TEXT_NODE && /[🔍🔎]/.test(node.nodeValue || '')) {
        node.nodeValue = String(node.nodeValue || '').replace(/[🔍🔎]/g, '');
      }
    });
  }

  function dispatchSearchReset(input) {
    ['input', 'change', 'search'].forEach(function (type) {
      input.dispatchEvent(new Event(type, { bubbles: true }));
    });

    try {
      input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Escape', code: 'Escape' }));
    } catch (error) {
      input.dispatchEvent(new Event('keyup', { bubbles: true }));
    }

    try {
      if (typeof applyFilters === 'function') applyFilters();
    } catch (error) {}
  }

  function clearActiveFilters() {
    var strip = document.querySelector('.gm-filter-strip');
    if (!strip) return;

    Array.prototype.forEach.call(strip.querySelectorAll('.gm-filter-active'), function (element) {
      element.classList.remove('gm-filter-active');
    });
    Array.prototype.forEach.call(strip.querySelectorAll('[aria-pressed="true"]'), function (element) {
      element.setAttribute('aria-pressed', 'false');
    });
  }

  function updateButtonState(input, button) {
    var hasValue = String(input.value || '').trim().length > 0;
    button.classList.toggle('gm-has-value', hasValue);
    button.setAttribute('aria-label', hasValue ? 'Limpar pesquisa' : 'Cancelar pesquisa');
    button.setAttribute('title', hasValue ? 'Limpar pesquisa' : 'Cancelar pesquisa');
  }

  function ensureClearButton() {
    var input = findSearchInput();
    if (!input) return false;

    var hostInfo = chooseHost(input);
    if (!hostInfo.host) return false;

    hideOriginalMagnifier(hostInfo);
    hostInfo.host.classList.add('gm-search-clear-host');
    input.classList.add('gm-search-clear-input');

    var button = hostInfo.host.querySelector('#gm-search-clear-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'gm-search-clear-button';
      button.className = 'gm-search-clear-button';
      button.type = 'button';
      button.textContent = '×';

      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();

        input.value = '';
        clearActiveFilters();
        dispatchSearchReset(input);
        updateButtonState(input, button);
        input.focus({ preventScroll: true });
      }, true);

      hostInfo.host.appendChild(button);
    }

    if (!input.getAttribute('data-gm-clear-listener')) {
      input.setAttribute('data-gm-clear-listener', 'true');
      input.addEventListener('input', function () {
        updateButtonState(input, button);
      });
    }

    updateButtonState(input, button);
    return true;
  }

  function applyPatch() {
    ensureStyle();
    var sized = sizeOriginalFilters();
    var clearReady = ensureClearButton();
    return sized && clearReady;
  }

  var attempts = 0;
  function start() {
    attempts += 1;
    if (applyPatch() || attempts >= 60) return;
    window.setTimeout(start, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  var observer = new MutationObserver(function () {
    window.clearTimeout(observer._gmTimer);
    observer._gmTimer = window.setTimeout(applyPatch, 160);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();