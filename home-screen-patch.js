(function () {
  'use strict';

  var PATCH_ID = 'gestamed-home-screen-2026-07-24-128';
  if (document.documentElement.getAttribute('data-gm-home-screen') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-home-screen', PATCH_ID);

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findTarget(labels) {
    var candidates = Array.prototype.slice.call(document.querySelectorAll('button, a, [role="button"], [onclick]'));
    var wanted = labels.map(normalize);
    return candidates.find(function (element) {
      if (element.closest && element.closest('#gm-home-screen')) return false;
      var text = normalize((element.getAttribute('aria-label') || '') + ' ' + (element.getAttribute('title') || '') + ' ' + (element.textContent || ''));
      return wanted.some(function (label) {
        return text === label || text.indexOf(label) !== -1;
      });
    }) || null;
  }

  function findSearchInput() {
    return document.querySelector('#searchInput, input[type="search"], input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function dispatchInput(input) {
    ['input', 'change', 'keyup'].forEach(function (type) {
      input.dispatchEvent(new Event(type, { bubbles: true }));
    });
    try {
      if (typeof applyFilters === 'function') applyFilters();
    } catch (error) {}
  }

  function hideHome() {
    var home = document.getElementById('gm-home-screen');
    if (home) home.classList.add('gm-home-hidden');
    document.documentElement.classList.remove('gm-home-active');
  }

  function showHome() {
    var home = document.getElementById('gm-home-screen');
    if (home) {
      home.classList.remove('gm-home-hidden');
      home.scrollTop = 0;
    }
    document.documentElement.classList.add('gm-home-active');
  }

  function activate(labels) {
    var target = findTarget(labels);
    if (!target) return false;
    hideHome();
    window.setTimeout(function () {
      try { target.click(); } catch (error) {}
    }, 20);
    return true;
  }

  function showDevelopmentMessage(label) {
    var old = document.getElementById('gm-home-dev-message');
    if (old) old.remove();

    var overlay = document.createElement('div');
    overlay.id = 'gm-home-dev-message';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Módulo em desenvolvimento');
    overlay.innerHTML = '<div class="gm-home-dev-card"><div class="gm-home-dev-icon">🛠️</div><strong>' + label + '</strong><p>Módulo em desenvolvimento.</p><button type="button">Entendi</button></div>';

    function close() { overlay.remove(); }
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay || event.target.tagName === 'BUTTON') close();
    });
    document.addEventListener('keydown', function escape(event) {
      if (event.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escape);
      }
    });

    document.body.appendChild(overlay);
    var button = overlay.querySelector('button');
    if (button) button.focus();
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
    button.setAttribute('title', definition.disabled ? (definition.labels[0] + ' — módulo em desenvolvimento') : (definition.aria || definition.labels[0]));
    if (definition.disabled) button.setAttribute('aria-disabled', 'true');
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (definition.disabled) {
        showDevelopmentMessage(definition.labels[0]);
        return;
      }
      if (!activate(definition.labels)) showDevelopmentMessage(definition.labels[0]);
    });
    parent.appendChild(button);
  }

  function ensureStyle() {
    if (document.getElementById('gm-home-screen-style')) return;
    var style = document.createElement('style');
    style.id = 'gm-home-screen-style';
    style.textContent = [
      '#gm-home-screen{position:fixed;inset:0;z-index:2147483000;background:#fff4f7;overflow:auto;-webkit-overflow-scrolling:touch;display:flex;justify-content:center;align-items:flex-start;}',
      '#gm-home-screen.gm-home-hidden{display:none!important;}',
      '#gm-home-canvas{position:relative;width:min(100vw,832px);aspect-ratio:832/1536;background:#fff4f7;overflow:hidden;box-shadow:0 0 40px rgba(98,37,65,.12);}',
      '#gm-home-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;user-select:none;-webkit-user-drag:none;}',
      '.gm-home-hotspot{position:absolute;z-index:3;border:0;background:transparent;cursor:pointer;border-radius:18px;-webkit-tap-highlight-color:rgba(236,72,153,.12);}',
      '.gm-home-hotspot:focus-visible{outline:3px solid rgba(236,72,153,.45);outline-offset:-2px;background:rgba(255,255,255,.08);}',
      '.gm-home-hotspot-disabled{cursor:not-allowed;background:rgba(255,255,255,.025);}',
      '.gm-home-hotspot-disabled:focus-visible{outline-color:rgba(148,163,184,.55);}',
      '#gm-home-search{position:absolute;z-index:4;left:8.5%;top:24.65%;width:80%;height:4.35%;border:0;background:transparent;color:#3b2333;font:500 clamp(12px,3vw,20px)/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:0 2%;outline:none;}',
      '#gm-home-search::placeholder{color:transparent;}',
      '#gm-home-dev-message{position:fixed;inset:0;z-index:2147483647;background:rgba(45,24,38,.42);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:24px;}',
      '.gm-home-dev-card{width:min(88vw,360px);background:#fff;border-radius:24px;padding:26px 22px;text-align:center;box-shadow:0 24px 70px rgba(82,33,61,.28);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#3b2333;}',
      '.gm-home-dev-card strong{display:block;font-size:20px;margin:4px 0 8px;}',
      '.gm-home-dev-card p{margin:0 0 20px;color:#76576a;font-size:15px;}',
      '.gm-home-dev-icon{font-size:34px;line-height:1;margin-bottom:8px;}',
      '.gm-home-dev-card button{border:0;border-radius:999px;background:#ec4899;color:#fff;font-weight:800;font-size:15px;padding:12px 26px;min-width:130px;cursor:pointer;}',
      '@media(min-width:833px){#gm-home-screen{padding:18px 0;}#gm-home-canvas{border-radius:32px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildHome() {
    if (document.getElementById('gm-home-screen')) return true;
    ensureStyle();

    var home = document.createElement('div');
    home.id = 'gm-home-screen';
    home.setAttribute('role', 'main');
    home.setAttribute('aria-label', 'Tela inicial GestaMed');

    var canvas = document.createElement('div');
    canvas.id = 'gm-home-canvas';

    var image = document.createElement('img');
    image.id = 'gm-home-image';
    image.src = 'IMG_1355.jpeg';
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    canvas.appendChild(image);

    var search = document.createElement('input');
    search.id = 'gm-home-search';
    search.type = 'search';
    search.autocomplete = 'off';
    search.spellcheck = false;
    search.setAttribute('aria-label', 'Pesquisar medicamento ou princípio ativo');
    search.addEventListener('input', function () {
      var original = findSearchInput();
      if (!original) return;
      original.value = search.value;
      dispatchInput(original);
    });
    search.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter') return;
      var original = findSearchInput();
      if (!original) return;
      original.value = search.value;
      dispatchInput(original);
      hideHome();
      window.setTimeout(function () { original.focus(); }, 30);
    });
    canvas.appendChild(search);

    [
      { x:4.2, y:30.55, w:21.4, h:4.45, labels:['Dor'] },
      { x:27.9, y:30.55, w:21.4, h:4.45, labels:['Febre'] },
      { x:51.7, y:30.55, w:21.4, h:4.45, labels:['Alergia'] },
      { x:75.0, y:30.55, w:21.0, h:4.45, labels:['Náusea','Náuseas'] },

      { x:4.0, y:39.55, w:17.7, h:8.0, labels:['Agenda','Calendário'], disabled:true },
      { x:22.8, y:39.55, w:17.7, h:8.0, labels:['Checklists','Checklist'], disabled:true },
      { x:41.6, y:39.55, w:17.7, h:8.0, labels:['Calculadoras','Calculadora'], disabled:true },
      { x:60.4, y:39.55, w:17.7, h:8.0, labels:['Favoritos','Favorito'], disabled:true },
      { x:79.2, y:39.55, w:17.0, h:8.0, labels:['Lembretes','Lembrete'], disabled:true },

      { x:4.0, y:49.45, w:46.5, h:7.15, labels:['Idade gestacional'] },
      { x:52.0, y:49.45, w:44.0, h:7.15, labels:['Cálculo de insulina','Calculo de insulina','Insulina','DMG'] },
      { x:4.0, y:57.45, w:46.5, h:7.15, labels:['Painel de Exames','Painel de exames'] },
      { x:52.0, y:57.45, w:44.0, h:7.15, labels:['Ganho de peso gestacional','Ganho de peso'] },
      { x:4.0, y:65.45, w:46.5, h:7.15, labels:['Prescrições por Trimestre','Prescricoes por Trimestre','Prescrições'] },
      { x:52.0, y:65.45, w:44.0, h:7.15, labels:['Condutas Obstétricas','Condutas Obstetricas','Condutas'] },

      { x:0.0, y:93.55, w:20.0, h:6.45, labels:['Início','Inicio'], aria:'Início' },
      { x:20.0, y:93.55, w:20.0, h:6.45, labels:['Obstetrícia','Obstetricia'], aria:'Obstetrícia' },
      { x:40.0, y:93.15, w:20.0, h:6.85, labels:['Pré-natal','Pre natal'], aria:'Pré-natal' },
      { x:60.0, y:93.55, w:20.0, h:6.45, labels:['Protocolos','Protocolo'], aria:'Protocolos', disabled:true },
      { x:80.0, y:93.55, w:20.0, h:6.45, labels:['Perfil'], aria:'Perfil', disabled:true }
    ].forEach(function (definition) { makeHotspot(canvas, definition); });

    home.appendChild(canvas);
    document.body.appendChild(home);
    document.documentElement.classList.add('gm-home-active');

    document.addEventListener('click', function (event) {
      var element = event.target && event.target.closest ? event.target.closest('button, a, [role="button"]') : null;
      if (!element || element.closest('#gm-home-screen')) return;
      var text = normalize(element.textContent || element.getAttribute('aria-label') || '');
      if (text === 'inicio' || text.indexOf(' inicio') !== -1) {
        window.setTimeout(showHome, 80);
      }
    }, true);

    return true;
  }

  var attempts = 0;
  function start() {
    attempts += 1;
    if (document.body && buildHome()) return;
    if (attempts < 80) window.setTimeout(start, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once:true });
  } else {
    start();
  }
})();