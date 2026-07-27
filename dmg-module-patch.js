(function () {
  'use strict';

  var PATCH_ID = 'gestamed-dmg-module-2026-07-27-182';
  var MODULE_ID = 'gm-dmg-module';
  var TARGET_LABELS = ['cálculo de insulina', 'calculo de insulina', 'diabetes mellitus gestacional', 'dmg'];
  var bypassIntercept = false;
  var legacyActive = false;
  var legacyObserver = null;

  if (document.documentElement.getAttribute('data-gm-dmg-module') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-dmg-module', PATCH_ID);

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function showHome() {
    var home = document.getElementById('gm-home-screen');
    if (home) { home.classList.remove('gm-home-hidden'); home.scrollTop = 0; }
    document.documentElement.classList.add('gm-home-active');
  }

  function hideHome() {
    var home = document.getElementById('gm-home-screen');
    if (home) home.classList.add('gm-home-hidden');
    document.documentElement.classList.remove('gm-home-active');
  }

  function showNewModuleAtSavedPosition() {
    var module = document.getElementById(MODULE_ID);
    if (!module) return;
    hideHome();
    module.classList.add('gm-dmg-open');
    module.style.display = '';
    document.documentElement.classList.add('gm-dmg-active');
    document.body.style.overflow = 'hidden';
    legacyActive = false;
  }

  function closeModule() {
    var module = document.getElementById(MODULE_ID);
    if (module) module.classList.remove('gm-dmg-open');
    document.documentElement.classList.remove('gm-dmg-active');
    document.body.style.overflow = '';
    showHome();
  }

  function clearModule() {
    var weight = document.getElementById('gm-dmg-weight');
    if (weight) { weight.value = ''; weight.focus(); }
    try { localStorage.removeItem('gm-dmg-weight'); } catch (error) {}
  }

  function findLegacyTrigger() {
    var candidates = Array.prototype.slice.call(document.querySelectorAll('button,a,[role="button"],[onclick]'));
    return candidates.find(function (element) {
      if (element.closest && element.closest('#' + MODULE_ID + ',#gm-home-screen,#gm-welcome-screen')) return false;
      var text = normalize((element.getAttribute('aria-label') || '') + ' ' + (element.getAttribute('title') || '') + ' ' + (element.textContent || ''));
      return TARGET_LABELS.some(function (label) { return text.indexOf(normalize(label)) !== -1; });
    }) || null;
  }

  function visible(element) {
    if (!element) return false;
    var style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
  }

  function fillLegacyWeight(value) {
    var inputs = Array.prototype.slice.call(document.querySelectorAll('input')).filter(visible);
    var weightInput = inputs.find(function (input) {
      var context = normalize((input.placeholder || '') + ' ' + (input.getAttribute('aria-label') || '') + ' ' + (input.name || '') + ' ' + (input.id || '') + ' ' + ((input.parentElement && input.parentElement.textContent) || ''));
      return context.indexOf('peso') !== -1 || context.indexOf('68 5') !== -1;
    });
    if (!weightInput) return false;
    weightInput.value = String(value).replace('.', ',');
    ['input','change','keyup'].forEach(function (type) { weightInput.dispatchEvent(new Event(type, { bubbles: true })); });
    return true;
  }

  function clickLegacyCalculate() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('button,a,[role="button"]')).filter(visible);
    var calculate = buttons.find(function (button) {
      if (button.closest && button.closest('#' + MODULE_ID)) return false;
      var text = normalize((button.textContent || '') + ' ' + (button.getAttribute('aria-label') || ''));
      return text.indexOf('calcular') !== -1 && (text.indexOf('insulina') !== -1 || text.indexOf('dose') !== -1);
    });
    if (!calculate) return false;
    bypassIntercept = true;
    try { calculate.click(); } finally { window.setTimeout(function () { bypassIntercept = false; }, 80); }
    return true;
  }

  function legacyModalIsOpen() {
    return Array.prototype.slice.call(document.querySelectorAll('.modal,.sheet,[role="dialog"]')).some(function (element) {
      return element.id !== MODULE_ID && visible(element);
    });
  }

  function watchLegacyClose() {
    if (legacyObserver) legacyObserver.disconnect();
    legacyObserver = new MutationObserver(function () {
      if (!legacyActive) return;
      window.setTimeout(function () {
        if (legacyActive && !legacyModalIsOpen()) showNewModuleAtSavedPosition();
      }, 80);
    });
    legacyObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class','style','hidden'] });
  }

  function openLegacyCalculator(value) {
    var trigger = findLegacyTrigger();
    if (!trigger) return false;
    var module = document.getElementById(MODULE_ID);
    if (module) module.style.display = 'none';
    document.documentElement.classList.remove('gm-dmg-active');
    document.body.style.overflow = '';
    legacyActive = true;
    watchLegacyClose();
    bypassIntercept = true;
    try { trigger.click(); } finally { window.setTimeout(function () { bypassIntercept = false; }, 100); }

    var attempts = 0;
    function prepareLegacy() {
      attempts += 1;
      var filled = fillLegacyWeight(value);
      if (filled) {
        window.setTimeout(clickLegacyCalculate, 100);
        return;
      }
      if (attempts < 40) window.setTimeout(prepareLegacy, 100);
      else showNewModuleAtSavedPosition();
    }
    window.setTimeout(prepareLegacy, 120);
    return true;
  }

  function calculateDose() {
    var weight = document.getElementById('gm-dmg-weight');
    var value = Number(String(weight && weight.value || '').replace(',', '.'));
    var warning = document.getElementById('gm-dmg-weight-warning');
    if (!Number.isFinite(value) || value <= 0 || value > 300) {
      if (weight) { weight.setAttribute('aria-invalid', 'true'); weight.focus(); }
      if (warning) warning.hidden = false;
      return;
    }
    weight.removeAttribute('aria-invalid');
    if (warning) warning.hidden = true;
    try { localStorage.setItem('gm-dmg-weight', String(value)); } catch (error) {}
    if (!openLegacyCalculator(value)) {
      if (warning) { warning.textContent = 'A calculadora anterior não foi localizada. Feche e abra o aplicativo novamente.'; warning.hidden = false; }
    }
  }

  function ensureStyle() {
    var old = document.getElementById('gm-dmg-module-style');
    if (old) old.remove();
    var style = document.createElement('style');
    style.id = 'gm-dmg-module-style';
    style.textContent = [
      '#' + MODULE_ID + '{position:fixed;inset:0;z-index:2147483550;background:#fff7fa;display:none;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#12182d;}',
      '#' + MODULE_ID + '.gm-dmg-open{display:block;}',
      '.gm-dmg-shell{width:min(100%,430px);min-height:100%;margin:0 auto;background:linear-gradient(180deg,#fffafd 0%,#fff 52%,#fff7fa 100%);box-shadow:0 0 28px rgba(124,34,77,.08);}',
      '.gm-dmg-top{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;padding:max(10px,env(safe-area-inset-top)) 14px 9px;background:rgba(255,250,253,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(238,78,146,.07);}',
      '.gm-dmg-top button{min-height:38px;border:1px solid #f6c7da;background:#fff;color:#ec2678;border-radius:999px;font-size:14px;font-weight:800;padding:0 13px;display:inline-flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 3px 10px rgba(230,67,132,.04);}',
      '.gm-dmg-top .gm-dmg-close{justify-self:end;width:40px;padding:0;font-size:26px;font-weight:400;}',
      '.gm-dmg-section{padding:12px 14px 24px;}',
      '.gm-dmg-hero-banner,.gm-dmg-footer-banner{width:100%;height:auto;display:block;border-radius:18px;box-shadow:0 7px 20px rgba(105,38,73,.06);}',
      '.gm-dmg-hero-banner{margin:2px 0 14px;}',
      '.gm-dmg-footer-banner{margin:0 0 4px;}',
      '.gm-dmg-card{border-radius:17px;padding:16px;margin:0 0 13px;border:1px solid;box-shadow:0 6px 18px rgba(76,45,70,.035);font-size:14px;line-height:1.46;}',
      '.gm-dmg-card-inner{display:grid;grid-template-columns:34px 1fr;gap:11px;align-items:start;}',
      '.gm-dmg-card-icon{font-size:27px;line-height:1;text-align:center;padding-top:1px;}',
      '.gm-dmg-info{background:linear-gradient(135deg,#f7faff,#eef4ff);border-color:#cfddf8;color:#29364d;}',
      '.gm-dmg-info strong,.gm-dmg-info a{color:#1260d6;}',
      '.gm-dmg-info a{display:inline-block;margin-top:13px;font-weight:750;text-underline-offset:4px;}',
      '.gm-dmg-warning{background:linear-gradient(135deg,#fffaf2,#fff6ea);border-color:#f1dab0;color:#302a28;}',
      '.gm-dmg-form{background:linear-gradient(135deg,#fffafd,#fff4f8);border-color:#f2c8d9;padding:15px;}',
      '.gm-dmg-label{display:flex;align-items:center;gap:8px;color:#d92a6b;font-weight:900;font-size:14px;text-transform:uppercase;margin-bottom:10px;}',
      '.gm-dmg-input-wrap{position:relative;}',
      '.gm-dmg-input-wrap input{width:100%;height:54px;border:1.4px solid #efbfd2;border-radius:14px;background:#fff;font-size:18px;color:#252d43;padding:0 55px 0 16px;outline:none;box-sizing:border-box;}',
      '.gm-dmg-input-wrap input:focus{border-color:#ec3d83;box-shadow:0 0 0 3px rgba(236,61,131,.09);}',
      '.gm-dmg-unit{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#e63e7f;background:#fff2f7;border:1px solid #f5cede;border-radius:8px;padding:3px 6px;font-size:13px;font-weight:900;}',
      '#gm-dmg-weight-warning{color:#b42318;font-size:12px;font-weight:700;margin:7px 0 0;}',
      '.gm-dmg-calc{width:100%;height:58px;border:0;border-radius:15px;background:linear-gradient(90deg,#f22c7d,#ec2d75 55%,#ef4389);color:#fff;font-size:17px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 10px 22px rgba(232,42,117,.16);margin:1px 0 14px;}',
      '.gm-dmg-calc span{font-size:23px;}',
      '#gm-dmg-next-block{min-height:18px;scroll-margin-top:74px;}',
      '@media(max-width:360px){.gm-dmg-top{padding-left:10px;padding-right:10px}.gm-dmg-top button{font-size:13px;padding:0 10px}.gm-dmg-section{padding-left:10px;padding-right:10px}.gm-dmg-card{font-size:13px;padding:14px}.gm-dmg-card-inner{grid-template-columns:30px 1fr;gap:9px}.gm-dmg-card-icon{font-size:24px}.gm-dmg-calc{font-size:16px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildModule() {
    if (document.getElementById(MODULE_ID)) return;
    ensureStyle();
    var module = document.createElement('div');
    module.id = MODULE_ID;
    module.setAttribute('role', 'dialog');
    module.setAttribute('aria-modal', 'true');
    module.setAttribute('aria-label', 'Diabetes Mellitus Gestacional');
    module.innerHTML = [
      '<div class="gm-dmg-shell">',
        '<header class="gm-dmg-top">',
          '<button type="button" data-gm-dmg-close aria-label="Voltar para a tela inicial">← Voltar</button>',
          '<button type="button" data-gm-dmg-clear aria-label="Limpar dados">🗑 Limpar</button>',
          '<button type="button" class="gm-dmg-close" data-gm-dmg-close aria-label="Fechar">×</button>',
        '</header>',
        '<main class="gm-dmg-section">',
          '<img class="gm-dmg-hero-banner" src="IMG_1612.jpeg?v=182" alt="Diabetes Mellitus Gestacional — Assistente clínico completo">',
          '<section class="gm-dmg-card gm-dmg-info"><div class="gm-dmg-card-inner"><div class="gm-dmg-card-icon" aria-hidden="true">ⓘ</div><div>Conteúdo baseado na <strong>Diretriz da Sociedade Brasileira de Diabetes (SBD) — Edição 2025</strong>, <strong>FEBRASGO</strong> e <strong>Ministério da Saúde</strong>.<br><br>Cada recomendação abaixo traz a classe e o nível de evidência originais.<br><a href="https://doi.org/10.29327/557753.2022-13" target="_blank" rel="noopener noreferrer">Ver diretriz completa ↗</a></div></div></section>',
          '<section class="gm-dmg-card gm-dmg-warning"><div class="gm-dmg-card-inner"><div class="gm-dmg-card-icon" aria-hidden="true">⚠️</div><div>Este módulo é <strong>apoio de referência</strong>, não uma prescrição automática. Toda dose de insulina ou metformina deve ser validada, ajustada e monitorada por médico/enfermeiro obstetra ou endocrinologista responsável pelo caso. <strong>Nunca inicie ou altere tratamento de diabetes gestacional com base apenas neste app.</strong></div></div></section>',
          '<section class="gm-dmg-card gm-dmg-form"><label class="gm-dmg-label" for="gm-dmg-weight"><span aria-hidden="true">⚖️</span> Peso atual da gestante (kg)</label><div class="gm-dmg-input-wrap"><input id="gm-dmg-weight" type="text" inputmode="decimal" autocomplete="off" placeholder="Ex.: 68,5" aria-describedby="gm-dmg-weight-warning"><span class="gm-dmg-unit">kg</span></div><p id="gm-dmg-weight-warning" hidden>Informe um peso válido entre 1 e 300 kg.</p></section>',
          '<button type="button" class="gm-dmg-calc" id="gm-dmg-calculate"><span aria-hidden="true">▦</span>Calcular dose de insulina <b aria-hidden="true">→</b></button>',
          '<img class="gm-dmg-footer-banner" src="IMG_1617.png?v=182" alt="Ferramenta educacional para apoiar sua decisão clínica e otimizar o cuidado da gestante com DMG">',
          '<div id="gm-dmg-next-block" aria-label="Espaço reservado para a próxima etapa do módulo"></div>',
        '</main>',
      '</div>'
    ].join('');
    document.body.appendChild(module);
    module.querySelectorAll('[data-gm-dmg-close]').forEach(function (button) { button.addEventListener('click', closeModule); });
    module.querySelector('[data-gm-dmg-clear]').addEventListener('click', clearModule);
    module.querySelector('#gm-dmg-calculate').addEventListener('click', calculateDose);
    module.querySelector('#gm-dmg-weight').addEventListener('input', function () {
      this.removeAttribute('aria-invalid');
      var warning = document.getElementById('gm-dmg-weight-warning');
      if (warning) { warning.textContent = 'Informe um peso válido entre 1 e 300 kg.'; warning.hidden = true; }
    });
  }

  function openModule() {
    buildModule();
    hideHome();
    var module = document.getElementById(MODULE_ID);
    module.classList.add('gm-dmg-open');
    module.style.display = '';
    module.scrollTop = 0;
    document.documentElement.classList.add('gm-dmg-active');
    document.body.style.overflow = 'hidden';
    var saved = '';
    try { saved = localStorage.getItem('gm-dmg-weight') || ''; } catch (error) {}
    var input = document.getElementById('gm-dmg-weight');
    if (input && saved) input.value = saved.replace('.', ',');
  }

  function isDmgTrigger(element) {
    if (!element) return false;
    var text = normalize((element.getAttribute('aria-label') || '') + ' ' + (element.getAttribute('title') || '') + ' ' + (element.textContent || ''));
    return TARGET_LABELS.some(function (label) { return text.indexOf(normalize(label)) !== -1; });
  }

  document.addEventListener('click', function (event) {
    if (bypassIntercept) return;
    var target = event.target && event.target.closest ? event.target.closest('button,a,[role="button"],[onclick]') : null;
    if (!target || target.closest('#' + MODULE_ID)) return;
    if (!isDmgTrigger(target)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    openModule();
  }, true);

  document.addEventListener('click', function (event) {
    if (!legacyActive) return;
    var button = event.target && event.target.closest ? event.target.closest('button,a,[role="button"]') : null;
    if (!button || button.closest('#' + MODULE_ID)) return;
    var text = normalize((button.textContent || '') + ' ' + (button.getAttribute('aria-label') || '') + ' ' + (button.getAttribute('title') || ''));
    if (text === 'x' || text.indexOf('fechar') !== -1 || text.indexOf('voltar') !== -1 || text.indexOf('cancelar') !== -1) {
      window.setTimeout(function () { if (legacyActive && !legacyModalIsOpen()) showNewModuleAtSavedPosition(); }, 180);
    }
  }, true);

  function start() {
    if (!document.body) { window.setTimeout(start, 100); return; }
    ensureStyle();
    buildModule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();