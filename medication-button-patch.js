(function () {
  'use strict';

  var PATCH_ID = 'gestamed-medication-button-2026-07-24-135';
  if (document.documentElement.getAttribute('data-gm-medication-button') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-medication-button', PATCH_ID);

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
      '#searchInput',
      '#search',
      'input[type="search"]:not(#gm-home-search)',
      'input[placeholder*="medicamento" i]:not(#gm-home-search)',
      'input[placeholder*="princípio" i]:not(#gm-home-search)',
      'input[placeholder*="principio" i]:not(#gm-home-search)'
    ];
    for (var i = 0; i < selectors.length; i += 1) {
      var input = document.querySelector(selectors[i]);
      if (input) return input;
    }
    return null;
  }

  function findOriginalMedicationTarget(source) {
    var candidates = Array.prototype.slice.call(document.querySelectorAll('button, a, [role="button"], [onclick]'));
    return candidates.find(function (element) {
      if (element === source) return false;
      if (element.closest && element.closest('#gm-home-screen, #gm-welcome-screen')) return false;
      return isMedicationLabel(element);
    }) || null;
  }

  function openMedication(source) {
    var home = document.getElementById('gm-home-screen');
    var welcome = document.getElementById('gm-welcome-screen');
    if (home) home.classList.add('gm-home-hidden');
    if (welcome) welcome.classList.add('gm-welcome-hidden');
    document.documentElement.classList.remove('gm-home-active');

    var target = findOriginalMedicationTarget(source);
    if (target) {
      try { target.click(); } catch (error) {}
    }

    window.setTimeout(function () {
      var input = originalSearch();
      if (!input) return;
      try {
        input.scrollIntoView({ block: 'center', behavior: 'auto' });
        input.focus();
        input.click();
      } catch (error) {}
    }, 80);
  }

  document.addEventListener('click', function (event) {
    var element = event.target && event.target.closest ? event.target.closest('button, a, [role="button"], [onclick]') : null;
    if (!isMedicationLabel(element)) return;
    if (element && element.getAttribute('data-gm-medication-handled') === 'true') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (element) element.setAttribute('data-gm-medication-handled', 'true');
    openMedication(element);
    window.setTimeout(function () {
      if (element) element.removeAttribute('data-gm-medication-handled');
    }, 300);
  }, true);

  window.GestaMedOpenMedication = function () { openMedication(null); };
})();
