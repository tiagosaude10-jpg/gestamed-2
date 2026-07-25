(function () {
  'use strict';

  var PATCH_ID = 'gestamed-home-filter-carousel-2026-07-25-154';
  if (document.documentElement.getAttribute('data-gm-home-filter-carousel') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-home-filter-carousel', PATCH_ID);

  var filters = [
    { label:'Dor', icon:'🤕', term:'dor', symptom:true },
    { label:'Febre', icon:'🌡️', term:'febre', symptom:true },
    { label:'Náuseas', icon:'🤢', term:'náusea', symptom:true },
    { label:'Vômitos', icon:'🤮', term:'vômito', symptom:true },
    { label:'Azia/Refluxo', icon:'🔥', term:'refluxo', symptom:true },
    { label:'Alergia', icon:'🌿', term:'alergia', symptom:true },
    { label:'Constipação', icon:'🚻', term:'constipação', symptom:true },

    { label:'Analgésicos', icon:'🩹', term:'analgésico', bg:'#FEE2E2', border:'#DC2626', text:'#7F1D1D' },
    { label:'Anti-inflamatórios', icon:'🧊', term:'anti-inflamatório', bg:'#FFEDD5', border:'#EA580C', text:'#7C2D12' },
    { label:'Antibióticos', icon:'💊', term:'antibiótico', bg:'#FEF3C7', border:'#D97706', text:'#78350F' },
    { label:'Antifúngicos', icon:'🍄', term:'antifúngico', bg:'#ECFCCB', border:'#65A30D', text:'#365314' },
    { label:'Antivirais', icon:'🛡️', term:'antiviral', bg:'#DCFCE7', border:'#16A34A', text:'#14532D' },
    { label:'Anti-histamínicos', icon:'🤧', term:'anti-histamínico', bg:'#D1FAE5', border:'#059669', text:'#064E3B' },
    { label:'Antieméticos', icon:'🤢', term:'antiemético', bg:'#CCFBF1', border:'#0D9488', text:'#134E4A' },
    { label:'Anti-hipertensivos', icon:'❤️', term:'anti-hipertensivo', bg:'#CFFAFE', border:'#0891B2', text:'#164E63' },
    { label:'Antidiabéticos', icon:'🩸', term:'antidiabético', bg:'#DBEAFE', border:'#2563EB', text:'#1E3A8A' },
    { label:'Anticoagulantes', icon:'🧬', term:'anticoagulante', bg:'#E0E7FF', border:'#4F46E5', text:'#312E81' },
    { label:'Antiagregantes', icon:'🩹', term:'antiagregante', bg:'#EDE9FE', border:'#7C3AED', text:'#4C1D95' },
    { label:'Anticonvulsivantes', icon:'🧠', term:'anticonvulsivante', bg:'#F3E8FF', border:'#9333EA', text:'#581C87' },
    { label:'Antidepressivos', icon:'☀️', term:'antidepressivo', bg:'#FAE8FF', border:'#C026D3', text:'#701A75' },
    { label:'Ansiolíticos', icon:'🕊️', term:'ansiolítico', bg:'#FCE7F3', border:'#DB2777', text:'#831843' },
    { label:'Antipsicóticos', icon:'💭', term:'antipsicótico', bg:'#FFE4E6', border:'#E11D48', text:'#881337' },
    { label:'Corticoides', icon:'🧪', term:'corticoide', bg:'#FEF2F2', border:'#B91C1C', text:'#7F1D1D' },
    { label:'Broncodilatadores', icon:'🫁', term:'broncodilatador', bg:'#F0FDFA', border:'#0F766E', text:'#134E4A' },
    { label:'Antiasmáticos', icon:'🌬️', term:'antiasmático', bg:'#ECFEFF', border:'#0E7490', text:'#164E63' },
    { label:'Antiácidos', icon:'🔥', term:'antiácido', bg:'#FFF7ED', border:'#C2410C', text:'#7C2D12' },
    { label:'Protetores gástricos', icon:'🛡️', term:'protetor gástrico', bg:'#F0FDF4', border:'#15803D', text:'#14532D' },
    { label:'Laxantes', icon:'🚻', term:'laxante', bg:'#FEFCE8', border:'#A16207', text:'#713F12' },
    { label:'Antidiarreicos', icon:'💧', term:'antidiarreico', bg:'#EFF6FF', border:'#1D4ED8', text:'#1E3A8A' },
    { label:'Diuréticos', icon:'🚰', term:'diurético', bg:'#F0F9FF', border:'#0369A1', text:'#0C4A6E' },
    { label:'Hormônios', icon:'⚗️', term:'hormônio', bg:'#F5F3FF', border:'#6D28D9', text:'#4C1D95' },
    { label:'Vitaminas e suplementos', icon:'🍊', term:'vitamina', bg:'#FFFBEB', border:'#B45309', text:'#78350F' },
    { label:'Medicamentos obstétricos', icon:'🤰', term:'obstétrico', bg:'#FDF2F8', border:'#BE185D', text:'#831843' }
  ];

  function findSearchInput() {
    return document.querySelector('#searchInput, input[type="search"]:not(#gm-home-search), input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function runFilter(definition, button) {
    var original = findSearchInput();
    var homeSearch = document.getElementById('gm-home-search');
    if (!original) return;

    document.querySelectorAll('.gm-home-filter-chip').forEach(function (item) {
      item.classList.remove('gm-home-filter-active');
    });
    button.classList.add('gm-home-filter-active');

    if (homeSearch) homeSearch.value = definition.term;
    original.value = definition.term;
    ['input','change','keyup'].forEach(function (type) {
      original.dispatchEvent(new Event(type, { bubbles:true }));
    });
    try { if (typeof applyFilters === 'function') applyFilters(); } catch (error) {}

    window.setTimeout(function () {
      var home = document.getElementById('gm-home-screen');
      if (home) home.classList.add('gm-home-hidden');
      document.documentElement.classList.remove('gm-home-active');
      try { original.focus(); } catch (error) {}
    }, 130);
  }

  function ensureStyle() {
    if (document.getElementById('gm-home-filter-carousel-style')) return;
    var style = document.createElement('style');
    style.id = 'gm-home-filter-carousel-style';
    style.textContent = [
      '#gm-home-filter-carousel{position:absolute;z-index:12;left:0;top:29.95%;width:100%;height:5.65%;display:flex;align-items:center;gap:12px;overflow-x:auto;overflow-y:hidden;white-space:nowrap;padding:0 3.6%;box-sizing:border-box;background:linear-gradient(180deg,#fff7f9 0%,#fff4f7 100%);-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;scrollbar-width:none;overscroll-behavior-x:contain;touch-action:pan-x;box-shadow:0 8px 18px -18px rgba(107,45,75,.55);}',
      '#gm-home-filter-carousel::-webkit-scrollbar{display:none;}',
      '.gm-home-filter-chip{flex:0 0 auto;scroll-snap-align:center;display:inline-flex;align-items:center;justify-content:center;gap:7px;height:66%;min-height:34px;padding:0 17px;border:1.6px solid #cdebf4;border-radius:999px;background:#f7fcff;color:#245b78;font:700 clamp(11px,2.45vw,17px)/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 3px 9px rgba(68,86,110,.10);transition:transform .16s ease,box-shadow .16s ease,filter .16s ease;}',
      '.gm-home-filter-chip span:first-child{font-size:1.17em;line-height:1;}',
      '.gm-home-filter-chip:active{transform:scale(.97);filter:brightness(.98);}',
      '.gm-home-filter-chip.gm-home-filter-active{transform:translateY(-1px) scale(1.04);box-shadow:0 0 0 3px rgba(239,79,145,.16),0 6px 13px rgba(63,34,50,.16);}',
      '.gm-home-filter-divider{flex:0 0 2px;width:2px;height:56%;border-radius:999px;background:linear-gradient(180deg,rgba(190,24,93,.12),rgba(190,24,93,.58),rgba(190,24,93,.12));margin:0 3px;}',
      '@media(max-width:520px){#gm-home-filter-carousel{gap:10px;padding-left:3.3%;padding-right:3.3%;}.gm-home-filter-chip{padding-left:14px;padding-right:14px;}}',
      '@media(prefers-reduced-motion:reduce){.gm-home-filter-chip{transition:none;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildCarousel() {
    var canvas = document.getElementById('gm-home-canvas');
    if (!canvas) return false;
    if (document.getElementById('gm-home-filter-carousel')) return true;

    ensureStyle();
    var strip = document.createElement('div');
    strip.id = 'gm-home-filter-carousel';
    strip.setAttribute('role','navigation');
    strip.setAttribute('aria-label','Filtros rápidos de medicamentos');

    filters.forEach(function (definition, index) {
      if (index === 7) {
        var divider = document.createElement('span');
        divider.className = 'gm-home-filter-divider';
        divider.setAttribute('aria-hidden','true');
        strip.appendChild(divider);
      }

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'gm-home-filter-chip';
      button.setAttribute('aria-label', definition.label);
      button.setAttribute('title', definition.label);
      if (!definition.symptom) {
        button.style.background = definition.bg;
        button.style.borderColor = definition.border;
        button.style.color = definition.text;
      }
      button.innerHTML = '<span aria-hidden="true">' + definition.icon + '</span><span>' + definition.label + '</span>';
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        runFilter(definition, button);
      });
      strip.appendChild(button);
    });

    canvas.appendChild(strip);
    strip.scrollLeft = 0;
    return true;
  }

  var attempts = 0;
  function start() {
    attempts += 1;
    if (buildCarousel() || attempts >= 100) return;
    window.setTimeout(start, 120);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();

  var observer = new MutationObserver(function () {
    if (!document.getElementById('gm-home-filter-carousel')) buildCarousel();
  });
  observer.observe(document.documentElement, { childList:true, subtree:true });
})();