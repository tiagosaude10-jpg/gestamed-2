(function () {
  'use strict';

  var PATCH_ID = 'gestamed-home-filter-carousel-2026-07-25-157';
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

  function forceHomeVisible() {
    var home = document.getElementById('gm-home-screen');
    var welcome = document.getElementById('gm-welcome-screen');
    if (welcome) welcome.classList.add('gm-welcome-hidden');
    if (home) {
      home.classList.remove('gm-home-hidden');
      home.style.setProperty('display','flex','important');
      home.style.setProperty('visibility','visible','important');
      home.style.setProperty('opacity','1','important');
    }
    document.documentElement.classList.add('gm-home-active','gm-home-filter-mode');
  }

  function ensureResultsPanel() {
    var canvas = document.getElementById('gm-home-canvas');
    if (!canvas) return null;
    var panel = document.getElementById('gm-home-filter-results');
    if (panel) return panel;
    panel = document.createElement('section');
    panel.id = 'gm-home-filter-results';
    panel.innerHTML = '<div class="gm-home-results-head"><strong>Medicamentos encontrados</strong><button type="button" aria-label="Fechar resultados">×</button></div><div class="gm-home-results-list"></div>';
    panel.querySelector('button').addEventListener('click', function(){
      panel.classList.remove('gm-home-results-open');
      document.documentElement.classList.remove('gm-home-filter-mode');
    });
    canvas.appendChild(panel);
    return panel;
  }

  function collectResultButtons() {
    var excluded = /^(início|inicio|obstetrícia|obstetricia|pré-natal|pre natal|protocolos|perfil|agenda|checklists|calculadoras|favoritos|lembretes|dor|febre|alergia|náusea|náuseas)$/i;
    var seen = {};
    return Array.prototype.slice.call(document.querySelectorAll('button,a,[role="button"]')).filter(function(el){
      if (el.closest && el.closest('#gm-home-screen,#gm-welcome-screen')) return false;
      var text = String(el.innerText || el.textContent || '').replace(/\s+/g,' ').trim();
      if (!text || text.length < 3 || text.length > 180 || excluded.test(text)) return false;
      var rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      var key = text.toLowerCase();
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    }).slice(0,30);
  }

  function renderResults(definition) {
    forceHomeVisible();
    var panel = ensureResultsPanel();
    if (!panel) return;
    var list = panel.querySelector('.gm-home-results-list');
    var items = collectResultButtons();
    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = '<div class="gm-home-results-empty">Nenhum medicamento encontrado para esta categoria.</div>';
    } else {
      items.forEach(function(original){
        var text = String(original.innerText || original.textContent || '').replace(/\s+/g,' ').trim();
        var card = document.createElement('button');
        card.type = 'button';
        card.className = 'gm-home-result-card';
        card.textContent = text;
        card.addEventListener('click', function(){
          var home = document.getElementById('gm-home-screen');
          if (home) {
            home.style.removeProperty('display');
            home.style.removeProperty('visibility');
            home.style.removeProperty('opacity');
            home.classList.add('gm-home-hidden');
          }
          document.documentElement.classList.remove('gm-home-active','gm-home-filter-mode');
          window.setTimeout(function(){ try { original.click(); } catch(error){} }, 30);
        });
        list.appendChild(card);
      });
    }
    panel.querySelector('strong').textContent = definition.label;
    panel.classList.add('gm-home-results-open');
    forceHomeVisible();
  }

  function runFilter(definition, button) {
    var original = findSearchInput();
    var homeSearch = document.getElementById('gm-home-search');
    if (!original) return;
    forceHomeVisible();
    document.querySelectorAll('.gm-home-filter-chip').forEach(function(item){ item.classList.remove('gm-home-filter-active'); });
    button.classList.add('gm-home-filter-active');
    if (homeSearch) homeSearch.value = definition.term;
    original.value = definition.term;
    ['input','change','keyup'].forEach(function(type){ original.dispatchEvent(new Event(type,{bubbles:true})); });
    try { if (typeof applyFilters === 'function') applyFilters(); } catch(error){}
    forceHomeVisible();
    window.setTimeout(function(){ forceHomeVisible(); renderResults(definition); }, 120);
    window.setTimeout(forceHomeVisible, 300);
  }

  function ensureStyle() {
    if (document.getElementById('gm-home-filter-carousel-style')) return;
    var style = document.createElement('style');
    style.id = 'gm-home-filter-carousel-style';
    style.textContent = [
      'html.gm-home-filter-mode #gm-home-screen{display:flex!important;visibility:visible!important;opacity:1!important;z-index:2147483000!important;}',
      'html.gm-home-filter-mode body>*:not(#gm-home-screen):not(#gm-welcome-screen){pointer-events:none!important;}',
      '#gm-home-filter-carousel{position:absolute;z-index:12;left:0;top:29.95%;width:100%;height:5.65%;display:flex;align-items:center;gap:12px;overflow-x:auto;overflow-y:hidden;white-space:nowrap;padding:0 3.6%;box-sizing:border-box;background:linear-gradient(180deg,#fff7f9 0%,#fff4f7 100%);-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;scrollbar-width:none;overscroll-behavior-x:contain;touch-action:pan-x;box-shadow:0 8px 18px -18px rgba(107,45,75,.55);}',
      '#gm-home-filter-carousel::-webkit-scrollbar{display:none;}',
      '.gm-home-filter-chip{flex:0 0 auto;scroll-snap-align:center;display:inline-flex;align-items:center;justify-content:center;gap:7px;height:66%;min-height:34px;padding:0 17px;border:1.6px solid #cdebf4;border-radius:999px;background:#f7fcff;color:#245b78;font:700 clamp(11px,2.45vw,17px)/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 3px 9px rgba(68,86,110,.10);}',
      '.gm-home-filter-chip.gm-home-filter-active{transform:translateY(-1px) scale(1.04);box-shadow:0 0 0 3px rgba(239,79,145,.16),0 6px 13px rgba(63,34,50,.16);}',
      '.gm-home-filter-divider{flex:0 0 2px;width:2px;height:56%;border-radius:999px;background:linear-gradient(180deg,rgba(190,24,93,.12),rgba(190,24,93,.58),rgba(190,24,93,.12));margin:0 3px;}',
      '#gm-home-filter-results{display:none;position:absolute;z-index:30;left:3.2%;right:3.2%;top:35.4%;bottom:6.8%;background:#fff;border:1px solid #f3c8d8;border-radius:24px;box-shadow:0 18px 45px rgba(83,34,60,.22);overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}',
      '#gm-home-filter-results.gm-home-results-open{display:flex;flex-direction:column;}',
      '.gm-home-results-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;background:#fff5f8;border-bottom:1px solid #f4d6e1;color:#7a244f;font-size:18px;}',
      '.gm-home-results-head button{width:36px;height:36px;border:0;border-radius:50%;background:#f8e3eb;color:#a2265d;font-size:28px;line-height:1;}',
      '.gm-home-results-list{overflow:auto;padding:10px;display:flex;flex-direction:column;gap:9px;}',
      '.gm-home-result-card{width:100%;text-align:left;border:1px solid #ead9e1;background:#fff;border-radius:16px;padding:14px 15px;color:#172033;font-size:15px;font-weight:700;box-shadow:0 2px 7px rgba(30,41,59,.06);}',
      '.gm-home-results-empty{padding:28px 18px;text-align:center;color:#76576a;}',
      '@media(max-width:520px){#gm-home-filter-carousel{gap:10px;padding-left:3.3%;padding-right:3.3%;}.gm-home-filter-chip{padding-left:14px;padding-right:14px;}}'
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
    filters.forEach(function(definition,index){
      if (index === 7) {
        var divider = document.createElement('span');
        divider.className = 'gm-home-filter-divider';
        divider.setAttribute('aria-hidden','true');
        strip.appendChild(divider);
      }
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'gm-home-filter-chip';
      button.setAttribute('aria-label',definition.label);
      if (!definition.symptom) {
        button.style.background = definition.bg;
        button.style.borderColor = definition.border;
        button.style.color = definition.text;
      }
      button.innerHTML = '<span aria-hidden="true">'+definition.icon+'</span><span>'+definition.label+'</span>';
      button.addEventListener('click',function(event){ event.preventDefault(); event.stopPropagation(); runFilter(definition,button); });
      strip.appendChild(button);
    });
    canvas.appendChild(strip);
    ensureResultsPanel();
    strip.scrollLeft = 0;
    return true;
  }

  var attempts=0;
  function start(){ attempts+=1; if(buildCarousel()||attempts>=100)return; window.setTimeout(start,120); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
  new MutationObserver(function(){ if(!document.getElementById('gm-home-filter-carousel')) buildCarousel(); }).observe(document.documentElement,{childList:true,subtree:true});
})();