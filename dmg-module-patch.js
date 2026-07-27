(function () {
  'use strict';

  var PATCH_ID = 'gestamed-dmg-module-2026-07-27-186';
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

  function clearWeightField() {
    var weight = document.getElementById('gm-dmg-weight');
    if (!weight) return;
    weight.value = '';
    weight.removeAttribute('aria-invalid');
    weight.focus();
    var warning = document.getElementById('gm-dmg-weight-warning');
    if (warning) {
      warning.textContent = 'Informe um peso válido entre 1 e 300 kg.';
      warning.hidden = true;
    }
    try { localStorage.removeItem('gm-dmg-weight'); } catch (error) {}
  }

  function visible(element) {
    if (!element) return false;
    var style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
  }

  function findLegacyTrigger() {
    var candidates = Array.prototype.slice.call(document.querySelectorAll('button,a,[role="button"],[onclick]'));
    return candidates.find(function (element) {
      if (element.closest && element.closest('#' + MODULE_ID + ',#gm-home-screen,#gm-welcome-screen')) return false;
      var text = normalize((element.getAttribute('aria-label') || '') + ' ' + (element.getAttribute('title') || '') + ' ' + (element.textContent || ''));
      return TARGET_LABELS.some(function (label) { return text.indexOf(normalize(label)) !== -1; });
    }) || null;
  }

  function fillLegacyWeight(value) {
    var inputs = Array.prototype.slice.call(document.querySelectorAll('input')).filter(visible);
    var weightInput = inputs.find(function (input) {
      var context = normalize((input.placeholder || '') + ' ' + (input.getAttribute('aria-label') || '') + ' ' + (input.name || '') + ' ' + (input.id || '') + ' ' + ((input.parentElement && input.parentElement.textContent) || ''));
      return context.indexOf('peso') !== -1 || context.indexOf('68 5') !== -1;
    });
    if (!weightInput) return false;
    weightInput.value = String(value).replace('.', ',');
    ['input', 'change', 'keyup'].forEach(function (type) {
      weightInput.dispatchEvent(new Event(type, { bubbles: true }));
    });
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
    try { calculate.click(); } finally {
      window.setTimeout(function () { bypassIntercept = false; }, 80);
    }
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
    legacyObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
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
    try { trigger.click(); } finally {
      window.setTimeout(function () { bypassIntercept = false; }, 100);
    }

    var attempts = 0;
    function prepareLegacy() {
      attempts += 1;
      if (fillLegacyWeight(value)) {
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
    if (!openLegacyCalculator(value) && warning) {
      warning.textContent = 'A calculadora anterior não foi localizada. Feche e abra o aplicativo novamente.';
      warning.hidden = false;
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
      '.gm-dmg-top{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:6px;padding:max(8px,env(safe-area-inset-top)) 12px 7px;background:rgba(255,250,253,.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(238,78,146,.07);}',
      '.gm-dmg-top button{min-height:34px;border:1px solid #f6c7da;background:#fff;color:#ec2678;border-radius:999px;font-size:13px;font-weight:800;padding:0 11px;display:inline-flex;align-items:center;justify-content:center;gap:5px;box-shadow:0 3px 10px rgba(230,67,132,.04);}',
      '.gm-dmg-top .gm-dmg-close{justify-self:end;width:36px;padding:0;font-size:23px;font-weight:400;}',
      '.gm-dmg-section{padding:9px 12px 18px;}',
      '.gm-dmg-hero-banner,.gm-dmg-footer-banner{width:100%;height:auto;display:block;border-radius:15px;box-shadow:0 5px 15px rgba(105,38,73,.045);}',
      '.gm-dmg-hero-banner{margin:1px 0 10px;}',
      '.gm-dmg-footer-banner{margin:0 0 10px;}',
      '.gm-dmg-card{border-radius:14px;padding:12px 13px;margin:0 0 9px;border:1px solid;box-shadow:0 4px 12px rgba(76,45,70,.025);font-size:12.8px;line-height:1.42;}',
      '.gm-dmg-card-inner{display:grid;grid-template-columns:28px 1fr;gap:9px;align-items:start;}',
      '.gm-dmg-card-icon{font-size:22px;line-height:1;text-align:center;padding-top:1px;}',
      '.gm-dmg-info{background:linear-gradient(135deg,#f7faff,#eef4ff);border-color:#cfddf8;color:#29364d;}',
      '.gm-dmg-info strong,.gm-dmg-info a{color:#1260d6;}',
      '.gm-dmg-info a{display:inline-block;margin-top:9px;font-weight:750;text-underline-offset:3px;}',
      '.gm-dmg-warning{background:linear-gradient(135deg,#fffaf2,#fff6ea);border-color:#f1dab0;color:#302a28;}',
      '.gm-dmg-form{background:linear-gradient(135deg,#fffafd,#fff4f8);border-color:#f2c8d9;padding:12px 13px;}',
      '.gm-dmg-label{display:flex;align-items:center;gap:7px;color:#d92a6b;font-weight:900;font-size:12.5px;text-transform:uppercase;margin-bottom:8px;}',
      '.gm-dmg-input-wrap{position:relative;}',
      '.gm-dmg-input-wrap input{width:100%;height:46px;border:1.3px solid #efbfd2;border-radius:12px;background:#fff;font-size:16px;color:#252d43;padding:0 78px 0 14px;outline:none;box-sizing:border-box;}',
      '.gm-dmg-input-wrap input:focus{border-color:#ec3d83;box-shadow:0 0 0 3px rgba(236,61,131,.08);}',
      '.gm-dmg-unit{position:absolute;right:42px;top:50%;transform:translateY(-50%);color:#e63e7f;background:#fff2f7;border:1px solid #f5cede;border-radius:7px;padding:2px 5px;font-size:11.5px;font-weight:900;}',
      '.gm-dmg-input-clear{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:28px;height:28px;border:0;border-radius:50%;background:#fff0f5;color:#d92a6b;font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center;padding:0;box-shadow:none;}',
      '.gm-dmg-input-clear:active{transform:translateY(-50%) scale(.94);}',
      '#gm-dmg-weight-warning{color:#b42318;font-size:11px;font-weight:700;margin:6px 0 0;}',
      '.gm-dmg-calc{width:100%;height:50px;border:0;border-radius:13px;background:linear-gradient(90deg,#f22c7d,#ec2d75 55%,#ef4389);color:#fff;font-size:15px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 18px rgba(232,42,117,.14);margin:0 0 10px;}',
      '.gm-dmg-calc span{font-size:20px;}',
      '.gm-dmg-diagnosis{margin-top:4px;}',
      '.gm-dmg-stage-title{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:10px 10px 8px;}',
      '.gm-dmg-stage-title h2{margin:0;color:#111;font-size:23px;line-height:1.08;font-weight:950;letter-spacing:-.5px;}',
      '.gm-dmg-stage-title p{margin:5px 0 0;color:#69718a;font-size:13px;font-weight:700;}',
      '.gm-dmg-mother{font-size:54px;line-height:1;filter:saturate(1.25);}',
      '.gm-dmg-topic{display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#fffafd,#fff2f8);border:1px solid #f4c7da;border-radius:14px;padding:11px 12px;margin-bottom:8px;}',
      '.gm-dmg-topic-icon{width:42px;height:42px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#ef1370;color:#fff;font-size:24px;flex:0 0 auto;box-shadow:0 5px 12px rgba(239,19,112,.15);}',
      '.gm-dmg-topic strong{display:block;color:#dd1766;font-size:15px;line-height:1.15;}',
      '.gm-dmg-topic small{display:block;color:#5e667d;font-size:11.5px;margin-top:2px;font-weight:650;}',
      '.gm-dmg-panel{border:1px solid #f3cadd;border-radius:15px;background:linear-gradient(145deg,#fffafd,#fff5f9);padding:10px;margin-bottom:9px;}',
      '.gm-dmg-panel-head{display:flex;align-items:center;gap:8px;color:#db1765;font-weight:900;font-size:15px;margin-bottom:9px;}',
      '.gm-dmg-panel-head span{font-size:22px;}',
      '.gm-dmg-flow{background:#fff;border:1px solid #f1dce5;border-radius:13px;padding:10px;}',
      '.gm-dmg-flow-row{display:grid;grid-template-columns:1fr 68px 1.25fr;gap:7px;align-items:center;margin-bottom:8px;}',
      '.gm-dmg-flow-row:last-child{margin-bottom:0;}',
      '.gm-dmg-flow-source{border:1px solid #f1dce5;border-radius:11px;padding:10px 8px;font-size:12px;font-weight:800;background:#fff;}',
      '.gm-dmg-flow-source em{display:block;color:#e22a72;font-style:normal;font-size:10.5px;margin-top:3px;}',
      '.gm-dmg-value{border-radius:11px;padding:9px 5px;text-align:center;font-weight:950;font-size:13px;line-height:1.25;border:1px solid;}',
      '.gm-dmg-value.pink{color:#d91b64;background:#fff3f8;border-color:#f1aac8;}',
      '.gm-dmg-value.orange{color:#e37400;background:#fff8ef;border-color:#f4c28b;}',
      '.gm-dmg-value.green{color:#148a3d;background:#f1fbf4;border-color:#a9d9b8;}',
      '.gm-dmg-result{font-size:11.2px;line-height:1.32;color:#20263a;}',
      '.gm-dmg-result strong{display:block;font-size:12px;margin-bottom:1px;}',
      '.gm-dmg-result.pink strong{color:#d91b64}.gm-dmg-result.orange strong{color:#e37400}.gm-dmg-result.green strong{color:#168b3f}',
      '.gm-dmg-second-title{text-align:center;color:#df1768;font-size:15px;font-weight:950;margin:0 0 8px;}',
      '.gm-dmg-two-col{display:grid;grid-template-columns:1.2fr .85fr;gap:8px;}',
      '.gm-dmg-mini{background:#fff;border:1px solid #f0dce5;border-radius:12px;padding:10px;font-size:11.4px;line-height:1.38;}',
      '.gm-dmg-mini strong{color:#d91b64;font-size:12px;}',
      '.gm-dmg-mini-icon{font-size:25px;float:left;margin-right:8px;}',
      '.gm-dmg-risk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;}',
      '.gm-dmg-risk{background:#fff;border:1px solid #f0dce5;border-radius:11px;padding:8px 5px;text-align:center;min-height:105px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;}',
      '.gm-dmg-risk span{font-size:29px;line-height:1;margin:1px 0 7px;}',
      '.gm-dmg-risk b{font-size:9.8px;line-height:1.25;color:#22283b;}',
      '.gm-dmg-reminder{display:grid;grid-template-columns:32px 78px 1fr;gap:8px;align-items:center;background:linear-gradient(135deg,#fffafd,#fff2f8);border:1px solid #f4c8db;border-radius:13px;padding:10px 11px;font-size:10.8px;line-height:1.35;}',
      '.gm-dmg-reminder span{font-size:25px}.gm-dmg-reminder strong{color:#dc1767;font-size:13px;}',
      '#gm-dmg-next-block{min-height:14px;scroll-margin-top:64px;}',
      '@media(max-width:360px){.gm-dmg-top{padding-left:9px;padding-right:9px}.gm-dmg-top button{font-size:12px;padding:0 9px}.gm-dmg-section{padding-left:9px;padding-right:9px}.gm-dmg-card{font-size:12.2px;padding:11px}.gm-dmg-card-inner{grid-template-columns:26px 1fr;gap:8px}.gm-dmg-card-icon{font-size:21px}.gm-dmg-calc{font-size:14px;height:48px}.gm-dmg-stage-title h2{font-size:21px}.gm-dmg-risk-grid{grid-template-columns:repeat(2,1fr)}.gm-dmg-two-col{grid-template-columns:1fr}.gm-dmg-flow-row{grid-template-columns:1fr 62px 1.15fr}}'
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
          '<img class="gm-dmg-hero-banner" src="IMG_1612.jpeg?v=186" alt="Diabetes Mellitus Gestacional — Assistente clínico completo">',
          '<section class="gm-dmg-card gm-dmg-info"><div class="gm-dmg-card-inner"><div class="gm-dmg-card-icon" aria-hidden="true">ⓘ</div><div>Conteúdo baseado na <strong>Diretriz da Sociedade Brasileira de Diabetes (SBD) — Edição 2025</strong>, <strong>FEBRASGO</strong> e <strong>Ministério da Saúde</strong>.<br><br>Cada recomendação abaixo traz a classe e o nível de evidência originais.<br><a href="https://doi.org/10.29327/557753.2022-13" target="_blank" rel="noopener noreferrer">Ver diretriz completa ↗</a></div></div></section>',
          '<section class="gm-dmg-card gm-dmg-warning"><div class="gm-dmg-card-inner"><div class="gm-dmg-card-icon" aria-hidden="true">⚠️</div><div>Este módulo é <strong>apoio de referência</strong>, não uma prescrição automática. Toda dose de insulina ou metformina deve ser validada, ajustada e monitorada por médico/enfermeiro obstetra ou endocrinologista responsável pelo caso. <strong>Nunca inicie ou altere tratamento de diabetes gestacional com base apenas neste app.</strong></div></div></section>',
          '<section class="gm-dmg-card gm-dmg-form"><label class="gm-dmg-label" for="gm-dmg-weight"><span aria-hidden="true">⚖️</span> Peso atual da gestante (kg)</label><div class="gm-dmg-input-wrap"><input id="gm-dmg-weight" type="text" inputmode="decimal" autocomplete="off" placeholder="Ex.: 68,5" aria-describedby="gm-dmg-weight-warning"><span class="gm-dmg-unit">kg</span><button type="button" class="gm-dmg-input-clear" id="gm-dmg-weight-clear" aria-label="Limpar peso">×</button></div><p id="gm-dmg-weight-warning" hidden>Informe um peso válido entre 1 e 300 kg.</p></section>',
          '<button type="button" class="gm-dmg-calc" id="gm-dmg-calculate"><span aria-hidden="true">▦</span>Calcular dose de insulina <b aria-hidden="true">→</b></button>',
          '<img class="gm-dmg-footer-banner" src="IMG_1613.jpeg?v=186" alt="Ferramenta educacional para apoiar sua decisão clínica e otimizar o cuidado da gestante com DMG">',
          '<section class="gm-dmg-diagnosis" aria-labelledby="gm-dmg-diagnosis-title">',
            '<div class="gm-dmg-stage-title"><div><h2 id="gm-dmg-diagnosis-title">1. Diagnóstico DMG</h2><p>Como identificar corretamente</p></div><div class="gm-dmg-mother" aria-hidden="true">🤰</div></div>',
            '<div class="gm-dmg-topic"><div class="gm-dmg-topic-icon" aria-hidden="true">🎯</div><div><strong>Ponto diagnóstico do DMG</strong><small>Como identificar corretamente</small></div></div>',
            '<div class="gm-dmg-panel">',
              '<div class="gm-dmg-panel-head"><span aria-hidden="true">🤰</span>Quem deve ser rastreada</div>',
              '<div class="gm-dmg-flow">',
                '<div class="gm-dmg-flow-row"><div class="gm-dmg-flow-source">📅 Todas as gestantes<em>1ª consulta do pré-natal</em></div><div class="gm-dmg-value pink">≥126<br>mg/dL</div><div class="gm-dmg-result pink"><strong>Diabetes manifesto</strong>(diabetes pré-existente)</div></div>',
                '<div class="gm-dmg-flow-row"><div class="gm-dmg-flow-source">🩸 Realizar glicemia de jejum</div><div class="gm-dmg-value orange">92 a 125<br>mg/dL</div><div class="gm-dmg-result orange"><strong>Diabetes Mellitus Gestacional (DMG)</strong>Diagnóstico confirmado na 1ª consulta</div></div>',
                '<div class="gm-dmg-flow-row"><div></div><div class="gm-dmg-value green">&lt;92<br>mg/dL</div><div class="gm-dmg-result green"><strong>Realizar TOTG 75 g entre 24 e 28 semanas</strong>(para gestantes ainda sem DM prévio ou DMG)</div></div>',
              '</div>',
            '</div>',
            '<div class="gm-dmg-panel">',
              '<div class="gm-dmg-second-title">Realizar teste segundo trimestre</div>',
              '<div class="gm-dmg-two-col">',
                '<div class="gm-dmg-mini"><span class="gm-dmg-mini-icon" aria-hidden="true">📅</span><strong>TOTG 75 g entre 24 e 28 semanas</strong><br>Para gestantes não diagnosticadas com DMG ou diabetes pré-existente na 1ª consulta.</div>',
                '<div class="gm-dmg-mini"><span class="gm-dmg-mini-icon" aria-hidden="true">📋</span><strong>Importante</strong><br>Reavaliar o risco e os resultados em todas as consultas do pré-natal.</div>',
              '</div>',
            '</div>',
            '<div class="gm-dmg-panel">',
              '<div class="gm-dmg-panel-head"><span aria-hidden="true">🛡️</span>Alto risco – rastrear já na 1ª consulta do pré-natal</div>',
              '<div class="gm-dmg-risk-grid">',
                '<div class="gm-dmg-risk"><span>🩸</span><b>DMG prévio</b></div>',
                '<div class="gm-dmg-risk"><span>👪</span><b>História familiar de DM (1º grau)</b></div>',
                '<div class="gm-dmg-risk"><span>⚖️</span><b>Obesidade (IMC ≥ 30 kg/m²)</b></div>',
                '<div class="gm-dmg-risk"><span>🩺</span><b>SOP (síndrome dos ovários policísticos)</b></div>',
                '<div class="gm-dmg-risk"><span>💚</span><b>Hipertensão arterial crônica / síndrome metabólica</b></div>',
                '<div class="gm-dmg-risk"><span>35+</span><b>Idade materna ≥ 35 anos</b></div>',
                '<div class="gm-dmg-risk"><span>💧</span><b>Pré-diabetes ou glicemia alterada antes da gestação</b></div>',
                '<div class="gm-dmg-risk"><span>👶</span><b>Antecedente de RN ≥ 4 kg ou macrossomia</b></div>',
              '</div>',
            '</div>',
            '<div class="gm-dmg-reminder"><span aria-hidden="true">💡</span><strong>Lembre-se</strong><div>Rastreamento precoce, diagnóstico correto e acompanhamento contínuo reduzem complicações maternas e fetais.</div></div>',
          '</section>',
          '<div id="gm-dmg-next-block" aria-label="Espaço reservado para a próxima etapa do módulo"></div>',
        '</main>',
      '</div>'
    ].join('');
    document.body.appendChild(module);
    module.querySelectorAll('[data-gm-dmg-close]').forEach(function (button) { button.addEventListener('click', closeModule); });
    module.querySelector('[data-gm-dmg-clear]').addEventListener('click', clearModule);
    module.querySelector('#gm-dmg-calculate').addEventListener('click', calculateDose);
    module.querySelector('#gm-dmg-weight-clear').addEventListener('click', clearWeightField);
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
      window.setTimeout(function () {
        if (legacyActive && !legacyModalIsOpen()) showNewModuleAtSavedPosition();
      }, 180);
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