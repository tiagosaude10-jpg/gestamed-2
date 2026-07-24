(function () {
  'use strict';

  var PATCH_ID = 'gestamed-quick-filter-bar-2026-07-23-121';
  if (document.documentElement.getAttribute('data-gm-quick-filter-patch') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-quick-filter-patch', PATCH_ID);

  var clinicalFilters = [
    { label: 'Vômitos', icon: '🤮', terms: ['vômito', 'êmese', 'antiemético', 'ondansetrona', 'metoclopramida'] },
    { label: 'Azia/Refluxo', icon: '🔥', terms: ['refluxo', 'azia', 'pirose', 'antiácido', 'omeprazol', 'pantoprazol'] },
    { label: 'Constipação', icon: '🚻', terms: ['constipação', 'prisão de ventre', 'laxante', 'lactulose', 'macrogol'] }
  ];

  var therapeuticFilters = [
    { label: 'Analgésicos', icon: '🩹', bg: '#FEE2E2', border: '#DC2626', text: '#7F1D1D', terms: ['analgésico', 'analgesia', 'antálgico'] },
    { label: 'Anti-inflamatórios', icon: '🧊', bg: '#FFEDD5', border: '#EA580C', text: '#7C2D12', terms: ['anti-inflamatório', 'antiinflamatório', 'aine'] },
    { label: 'Antibióticos', icon: '💊', bg: '#FEF3C7', border: '#D97706', text: '#78350F', terms: ['antibiótico', 'antibacteriano', 'antimicrobiano', 'penicilina', 'cefalosporina', 'macrolídeo'] },
    { label: 'Antifúngicos', icon: '🍄', bg: '#ECFCCB', border: '#65A30D', text: '#365314', terms: ['antifúngico', 'antimicótico'] },
    { label: 'Antivirais', icon: '🛡️', bg: '#DCFCE7', border: '#16A34A', text: '#14532D', terms: ['antiviral'] },
    { label: 'Anti-histamínicos', icon: '🤧', bg: '#D1FAE5', border: '#059669', text: '#064E3B', terms: ['anti-histamínico', 'antihistamínico', 'antialérgico'] },
    { label: 'Antieméticos', icon: '🤢', bg: '#CCFBF1', border: '#0D9488', text: '#134E4A', terms: ['antiemético', 'náusea', 'vômito'] },
    { label: 'Anti-hipertensivos', icon: '❤️', bg: '#CFFAFE', border: '#0891B2', text: '#164E63', terms: ['anti-hipertensivo', 'antihipertensivo', 'hipertensão'] },
    { label: 'Antidiabéticos', icon: '🩸', bg: '#DBEAFE', border: '#2563EB', text: '#1E3A8A', terms: ['antidiabético', 'hipoglicemiante', 'diabetes', 'insulina'] },
    { label: 'Anticoagulantes', icon: '🧬', bg: '#E0E7FF', border: '#4F46E5', text: '#312E81', terms: ['anticoagulante', 'heparina'] },
    { label: 'Antiagregantes', icon: '🩹', bg: '#EDE9FE', border: '#7C3AED', text: '#4C1D95', terms: ['antiagregante', 'antiplaquetário', 'antiagregação'] },
    { label: 'Anticonvulsivantes', icon: '🧠', bg: '#F3E8FF', border: '#9333EA', text: '#581C87', terms: ['anticonvulsivante', 'antiepiléptico', 'epilepsia'] },
    { label: 'Antidepressivos', icon: '☀️', bg: '#FAE8FF', border: '#C026D3', text: '#701A75', terms: ['antidepressivo', 'depressão', 'isrs'] },
    { label: 'Ansiolíticos', icon: '🕊️', bg: '#FCE7F3', border: '#DB2777', text: '#831843', terms: ['ansiolítico', 'ansiedade', 'benzodiazepínico'] },
    { label: 'Antipsicóticos', icon: '💭', bg: '#FFE4E6', border: '#E11D48', text: '#881337', terms: ['antipsicótico', 'neuroléptico'] },
    { label: 'Corticoides', icon: '🧪', bg: '#FEF2F2', border: '#B91C1C', text: '#7F1D1D', terms: ['corticoide', 'corticosteroide', 'glicocorticoide'] },
    { label: 'Broncodilatadores', icon: '🫁', bg: '#F0FDFA', border: '#0F766E', text: '#134E4A', terms: ['broncodilatador'] },
    { label: 'Antiasmáticos', icon: '🌬️', bg: '#ECFEFF', border: '#0E7490', text: '#164E63', terms: ['antiasmático', 'asma'] },
    { label: 'Antiácidos', icon: '🔥', bg: '#FFF7ED', border: '#C2410C', text: '#7C2D12', terms: ['antiácido', 'azia', 'pirose'] },
    { label: 'Protetores gástricos', icon: '🛡️', bg: '#F0FDF4', border: '#15803D', text: '#14532D', terms: ['protetor gástrico', 'inibidor da bomba de prótons', 'ibp', 'antiulceroso'] },
    { label: 'Laxantes', icon: '🚻', bg: '#FEFCE8', border: '#A16207', text: '#713F12', terms: ['laxante', 'constipação'] },
    { label: 'Antidiarreicos', icon: '💧', bg: '#EFF6FF', border: '#1D4ED8', text: '#1E3A8A', terms: ['antidiarreico', 'diarreia'] },
    { label: 'Diuréticos', icon: '🚰', bg: '#F0F9FF', border: '#0369A1', text: '#0C4A6E', terms: ['diurético'] },
    { label: 'Hormônios', icon: '⚗️', bg: '#F5F3FF', border: '#6D28D9', text: '#4C1D95', terms: ['hormônio', 'hormonal', 'progesterona', 'levotiroxina'] },
    { label: 'Vitaminas e suplementos', icon: '🍊', bg: '#FFFBEB', border: '#B45309', text: '#78350F', terms: ['vitamina', 'suplemento', 'mineral', 'ácido fólico', 'ferro'] },
    { label: 'Medicamentos obstétricos', icon: '🤰', bg: '#FDF2F8', border: '#BE185D', text: '#831843', terms: ['obstétrico', 'tocolítico', 'uterotônico', 'ocitocina', 'misoprostol', 'sulfato de magnésio'] }
  ];

  function normalize(value) {
    return String(value == null ? '' : value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function wordsOnly(value) {
    return normalize(value)
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function matchesLabel(element, label) {
    var text = wordsOnly(element && element.textContent);
    var wanted = wordsOnly(label);
    return text === wanted || text.slice(-(wanted.length + 1)) === ' ' + wanted;
  }

  function getData() {
    try {
      if (typeof RAW_DATA !== 'undefined' && Array.isArray(RAW_DATA)) return RAW_DATA;
    } catch (error) {}
    try {
      if (typeof GESTMED_DATA !== 'undefined' && Array.isArray(GESTMED_DATA)) return GESTMED_DATA;
    } catch (error) {}
    return [];
  }

  function recordText(record) {
    try {
      if (typeof searchableText === 'function') return normalize(searchableText(record));
    } catch (error) {}
    try {
      return normalize(JSON.stringify(record));
    } catch (error) {
      return '';
    }
  }

  function buildIndex() {
    return getData().map(recordText).filter(Boolean);
  }

  function chooseTerm(definition, index) {
    var bestTerm = definition.terms[0];
    var bestCount = 0;
    definition.terms.forEach(function (term) {
      var normalizedTerm = normalize(term);
      var count = index.reduce(function (total, text) {
        return total + (text.indexOf(normalizedTerm) !== -1 ? 1 : 0);
      }, 0);
      if (count > bestCount) {
        bestCount = count;
        bestTerm = term;
      }
    });
    return { term: bestTerm, count: bestCount };
  }

  function findClickable(label) {
    var elements = document.querySelectorAll('button, [role="button"], a');
    return Array.prototype.find.call(elements, function (element) {
      return matchesLabel(element, label);
    });
  }

  function locateStrip() {
    var dor = findClickable('Dor');
    var febre = findClickable('Febre');
    var alergia = findClickable('Alergia');
    var nauseas = findClickable('Náuseas') || findClickable('Náusea');
    var buttons = [dor, febre, alergia, nauseas].filter(Boolean);
    if (buttons.length < 4) return null;

    var ancestor = dor.parentElement;
    var fallback = null;
    var depth = 0;
    while (ancestor && depth < 8) {
      var containsAll = buttons.every(function (button) { return ancestor.contains(button); });
      if (containsAll) {
        if (!fallback) fallback = ancestor;
        var style = window.getComputedStyle(ancestor);
        var rect = ancestor.getBoundingClientRect();
        var isHorizontal = style.display.indexOf('flex') !== -1 || style.overflowX === 'auto' || style.overflowX === 'scroll' || ancestor.scrollWidth > ancestor.clientWidth;
        if (isHorizontal && rect.height > 0 && rect.height < 160) {
          return { strip: ancestor, template: dor, originals: buttons };
        }
      }
      ancestor = ancestor.parentElement;
      depth += 1;
    }
    return fallback ? { strip: fallback, template: dor, originals: buttons } : null;
  }

  function findSearchInput() {
    return document.querySelector('#searchInput, input[type="search"], input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function runSearch(term, clickedButton, strip) {
    var input = findSearchInput();
    if (!input) return;

    Array.prototype.forEach.call(strip.querySelectorAll('.gm-added-filter'), function (button) {
      button.classList.remove('gm-filter-active');
    });
    clickedButton.classList.add('gm-filter-active');

    input.value = term;
    ['input', 'keyup', 'change'].forEach(function (type) {
      input.dispatchEvent(new Event(type, { bubbles: true }));
    });

    try {
      if (typeof applyFilters === 'function') applyFilters();
    } catch (error) {}
  }

  function cleanClone(template) {
    var clone = template.cloneNode(true);
    clone.removeAttribute('id');
    clone.removeAttribute('onclick');
    clone.removeAttribute('href');
    Array.prototype.slice.call(clone.attributes).forEach(function (attribute) {
      if (attribute.name.indexOf('data-') === 0) clone.removeAttribute(attribute.name);
    });
    clone.textContent = '';
    if (clone.tagName === 'BUTTON') clone.type = 'button';
    return clone;
  }

  function makeButton(template, definition, group, queryInfo, strip) {
    var button = cleanClone(template);
    button.classList.add('gm-added-filter', group === 'class' ? 'gm-class-filter' : 'gm-clinical-filter');
    button.setAttribute('data-gm-added-filter', definition.label);
    button.setAttribute('data-gm-result-count', String(queryInfo.count));
    button.setAttribute('aria-label', definition.label);
    button.setAttribute('title', definition.label);

    if (group === 'class') {
      button.style.setProperty('--gm-filter-bg', definition.bg);
      button.style.setProperty('--gm-filter-border', definition.border);
      button.style.setProperty('--gm-filter-text', definition.text);
    }

    var icon = document.createElement('span');
    icon.className = 'gm-filter-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = definition.icon;

    var label = document.createElement('span');
    label.className = 'gm-filter-label';
    label.textContent = definition.label;

    button.appendChild(icon);
    button.appendChild(label);

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
      runSearch(queryInfo.term, button, strip);
    }, true);

    return button;
  }

  function ensureStyle() {
    var oldStyle = document.getElementById('gm-quick-filter-style');
    if (oldStyle) oldStyle.remove();
    var style = document.createElement('style');
    style.id = 'gm-quick-filter-style';
    style.textContent = [
      '.gm-filter-strip{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:8px!important;overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:none!important;padding-bottom:4px!important;scroll-snap-type:x proximity!important;}',
      '.gm-filter-strip::-webkit-scrollbar{display:none!important;}',
      '.gm-filter-strip>*{flex:0 0 auto!important;scroll-snap-align:start!important;}',
      '.gm-filter-divider{width:2px!important;min-width:2px!important;height:32px!important;background:linear-gradient(180deg,rgba(14,116,144,.18),rgba(14,116,144,.55),rgba(14,116,144,.18))!important;border-radius:999px!important;margin:0 4px!important;align-self:center!important;}',
      '.gm-added-filter{flex:0 0 auto!important;white-space:nowrap!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;min-height:44px!important;padding-left:14px!important;padding-right:14px!important;border-width:1.5px!important;border-style:solid!important;border-radius:999px!important;font-weight:600!important;letter-spacing:.01em!important;box-shadow:0 2px 7px rgba(15,23,42,.08)!important;transition:transform .16s ease,box-shadow .16s ease,filter .16s ease!important;}',
      '.gm-filter-icon{display:inline-flex!important;align-items:center!important;justify-content:center!important;font-size:19px!important;line-height:1!important;min-width:20px!important;filter:saturate(1.08)!important;}',
      '.gm-filter-label{display:inline-block!important;line-height:1.15!important;}',
      '.gm-clinical-filter{box-shadow:0 2px 7px rgba(15,23,42,.08)!important;}',
      '.gm-class-filter{background:var(--gm-filter-bg)!important;border-color:var(--gm-filter-border)!important;color:var(--gm-filter-text)!important;}',
      '.gm-added-filter:active{transform:scale(.97)!important;filter:brightness(.98)!important;}',
      '.gm-added-filter.gm-filter-active{box-shadow:0 0 0 3px rgba(8,145,178,.18),0 4px 10px rgba(15,23,42,.12)!important;transform:translateY(-1px)!important;}',
      '@media (prefers-reduced-motion:reduce){.gm-added-filter{transition:none!important;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function applyPatch() {
    var found = locateStrip();
    if (!found) return false;

    var strip = found.strip;
    var expectedAdded = clinicalFilters.length + therapeuticFilters.length;
    if (strip.getAttribute('data-gm-filter-patch') === PATCH_ID && strip.querySelectorAll('.gm-added-filter').length === expectedAdded) return true;

    ensureStyle();
    strip.classList.add('gm-filter-strip');

    var keep = found.originals;
    var clickables = Array.prototype.slice.call(strip.querySelectorAll('button, [role="button"], a'));
    clickables.forEach(function (element) {
      if (keep.indexOf(element) === -1) element.remove();
    });
    Array.prototype.forEach.call(strip.querySelectorAll('.gm-added-filter, .gm-filter-divider'), function (element) {
      element.remove();
    });

    var index = buildIndex();
    clinicalFilters.forEach(function (definition) {
      strip.appendChild(makeButton(found.template, definition, 'clinical', chooseTerm(definition, index), strip));
    });

    var divider = document.createElement('span');
    divider.className = 'gm-filter-divider';
    divider.setAttribute('aria-hidden', 'true');
    strip.appendChild(divider);

    therapeuticFilters.forEach(function (definition) {
      strip.appendChild(makeButton(found.template, definition, 'class', chooseTerm(definition, index), strip));
    });

    strip.setAttribute('data-gm-filter-patch', PATCH_ID);
    strip.setAttribute('data-gm-filter-groups', 'clinical:7;classes:' + therapeuticFilters.length);
    strip.scrollLeft = 0;
    return true;
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
    observer._gmTimer = window.setTimeout(applyPatch, 150);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();