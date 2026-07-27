(function () {
  'use strict';

  var PATCH_ID = 'gestamed-dmg-module-2026-07-27-179';
  var MODULE_ID = 'gm-dmg-module';
  var TARGET_LABELS = ['cálculo de insulina', 'calculo de insulina', 'diabetes mellitus gestacional', 'dmg'];

  if (document.documentElement.getAttribute('data-gm-dmg-module') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-dmg-module', PATCH_ID);

  function normalize(value) {
    return String(value || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function showHome() {
    var home = document.getElementById('gm-home-screen');
    if (home) {
      home.classList.remove('gm-home-hidden');
      home.scrollTop = 0;
    }
    document.documentElement.classList.add('gm-home-active');
  }

  function hideHome() {
    var home = document.getElementById('gm-home-screen');
    if (home) home.classList.add('gm-home-hidden');
    document.documentElement.classList.remove('gm-home-active');
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
    if (weight) {
      weight.value = '';
      weight.focus();
    }
    try { localStorage.removeItem('gm-dmg-weight'); } catch (error) {}
  }

  function calculateDose() {
    var weight = document.getElementById('gm-dmg-weight');
    var value = Number(String(weight && weight.value || '').replace(',', '.'));
    if (!Number.isFinite(value) || value <= 0 || value > 300) {
      if (weight) {
        weight.setAttribute('aria-invalid', 'true');
        weight.focus();
      }
      var warning = document.getElementById('gm-dmg-weight-warning');
      if (warning) warning.hidden = false;
      return;
    }
    weight.removeAttribute('aria-invalid');
    var warning = document.getElementById('gm-dmg-weight-warning');
    if (warning) warning.hidden = true;
    try { localStorage.setItem('gm-dmg-weight', String(value)); } catch (error) {}
    var future = document.getElementById('gm-dmg-next-block');
    if (future) future.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function ensureStyle() {
    if (document.getElementById('gm-dmg-module-style')) return;
    var style = document.createElement('style');
    style.id = 'gm-dmg-module-style';
    style.textContent = [
      '#' + MODULE_ID + '{position:fixed;inset:0;z-index:2147483550;background:#fff7fa;display:none;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#111831;}',
      '#' + MODULE_ID + '.gm-dmg-open{display:block;}',
      '.gm-dmg-shell{width:min(100%,760px);min-height:100%;margin:0 auto;background:linear-gradient(180deg,#fffafd 0%,#fff 45%,#fff6fa 100%);box-shadow:0 0 44px rgba(124,34,77,.10);}',
      '.gm-dmg-top{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;padding:max(16px,env(safe-area-inset-top)) 28px 12px;background:rgba(255,250,253,.94);backdrop-filter:blur(16px);border-bottom:1px solid rgba(238,78,146,.08);}',
      '.gm-dmg-top button{min-height:46px;border:1.5px solid #f6c5d9;background:rgba(255,255,255,.92);color:#ec2678;border-radius:999px;font-size:17px;font-weight:800;padding:0 18px;display:inline-flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 5px 16px rgba(230,67,132,.05);}',
      '.gm-dmg-top .gm-dmg-close{justify-self:end;width:48px;padding:0;font-size:30px;font-weight:400;}',
      '.gm-dmg-section{padding:28px 30px 34px;}',
      '.gm-dmg-hero{display:grid;grid-template-columns:122px minmax(0,1fr) 150px;align-items:center;gap:20px;margin-bottom:26px;}',
      '.gm-dmg-drop{width:116px;height:116px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,#fff 0,#fff1f6 55%,#fde3ed 100%);box-shadow:inset 0 0 0 1px rgba(238,51,126,.06);}',
      '.gm-dmg-drop span{font-size:67px;filter:saturate(1.1);}',
      '.gm-dmg-title h1{margin:0;font-size:clamp(31px,5.2vw,46px);line-height:1.08;letter-spacing:-.035em;color:#10162e;}',
      '.gm-dmg-title h1 em{display:block;color:#ee3b83;font-style:normal;}',
      '.gm-dmg-title p{margin:17px 0 0;color:#ef3f86;font-size:clamp(16px,2.8vw,22px);font-weight:800;letter-spacing:.015em;}',
      '.gm-dmg-mother{width:150px;height:230px;position:relative;align-self:end;}',
      '.gm-dmg-mother:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 58% 26%,transparent 0 20px,#ef4f91 21px 23px,transparent 24px),radial-gradient(ellipse at 50% 59%,transparent 0 48px,#ef4f91 49px 51px,transparent 52px),radial-gradient(circle at 48% 64%,#ef4f91 0 13px,transparent 14px);opacity:.88;}',
      '.gm-dmg-mother:after{content:"";position:absolute;left:14px;right:0;bottom:0;height:76px;background:radial-gradient(ellipse at center,#e8f0d7 0 4px,transparent 5px) 0 0/28px 28px;opacity:.55;}',
      '.gm-dmg-card{border-radius:23px;padding:26px 28px;margin:0 0 24px;border:1.5px solid;box-shadow:0 10px 28px rgba(76,45,70,.045);font-size:clamp(17px,2.8vw,22px);line-height:1.48;}',
      '.gm-dmg-card-inner{display:grid;grid-template-columns:58px 1fr;gap:20px;align-items:start;}',
      '.gm-dmg-card-icon{font-size:43px;line-height:1;text-align:center;padding-top:2px;}',
      '.gm-dmg-info{background:linear-gradient(135deg,#f6f9ff,#eef4ff);border-color:#cbdcff;color:#26334a;}',
      '.gm-dmg-info strong,.gm-dmg-info a{color:#1260d6;}',
      '.gm-dmg-info a{display:inline-block;margin-top:25px;font-weight:700;text-underline-offset:5px;}',
      '.gm-dmg-warning{background:linear-gradient(135deg,#fffaf0,#fff5e8);border-color:#f5d8a5;color:#312b2a;}',
      '.gm-dmg-form{background:linear-gradient(135deg,#fffafd,#fff4f8);border-color:#f4c7d9;padding:25px 24px;}',
      '.gm-dmg-label{display:flex;align-items:center;gap:11px;color:#d92a6b;font-weight:900;font-size:clamp(16px,2.6vw,20px);text-transform:uppercase;margin-bottom:15px;}',
      '.gm-dmg-input-wrap{position:relative;}',
      '.gm-dmg-input-wrap input{width:100%;height:76px;border:1.8px solid #efbfd2;border-radius:18px;background:#fff;font-size:clamp(21px,4vw,29px);color:#252d43;padding:0 70px 0 22px;outline:none;box-sizing:border-box;}',
      '.gm-dmg-input-wrap input:focus{border-color:#ec3d83;box-shadow:0 0 0 4px rgba(236,61,131,.10);}',
      '.gm-dmg-unit{position:absolute;right:18px;top:50%;transform:translateY(-50%);color:#e63e7f;background:#fff2f7;border:1px solid #f5cede;border-radius:9px;padding:5px 7px;font-weight:900;}',
      '#gm-dmg-weight-warning{color:#b42318;font-size:14px;font-weight:700;margin:9px 0 0;}',
      '.gm-dmg-calc{width:100%;height:86px;border:0;border-radius:20px;background:linear-gradient(90deg,#f22c7d,#ec2d75 55%,#ef4389);color:white;font-size:clamp(20px,3.8vw,28px);font-weight:900;display:flex;align-items:center;justify-content:center;gap:15px;box-shadow:0 16px 30px rgba(232,42,117,.20);margin:2px 0 27px;}',
      '.gm-dmg-calc span{font-size:32px;}',
      '.gm-dmg-footer-card{display:grid;grid-template-columns:52px 1fr 60px;align-items:center;gap:15px;background:linear-gradient(135deg,#fff3f7,#fcebf2);border:1px solid #f4d4e0;border-radius:23px;padding:24px 26px;color:#617089;font-size:clamp(15px,2.5vw,19px);line-height:1.45;}',
      '.gm-dmg-footer-card .shield,.gm-dmg-footer-card .book{font-size:38px;color:#ef4f91;text-align:center;}',
      '#gm-dmg-next-block{min-height:24px;scroll-margin-top:92px;}',
      '@media(max-width:560px){.gm-dmg-top{padding-left:18px;padding-right:18px}.gm-dmg-top button{min-height:42px;padding:0 14px;font-size:15px}.gm-dmg-section{padding:23px 18px 30px}.gm-dmg-hero{grid-template-columns:83px 1fr 92px;gap:12px}.gm-dmg-drop{width:80px;height:80px}.gm-dmg-drop span{font-size:48px}.gm-dmg-mother{width:92px;height:154px}.gm-dmg-card{padding:20px 18px;border-radius:20px}.gm-dmg-card-inner{grid-template-columns:42px 1fr;gap:13px}.gm-dmg-card-icon{font-size:33px}.gm-dmg-input-wrap input{height:66px}.gm-dmg-calc{height:72px;border-radius:18px}.gm-dmg-footer-card{grid-template-columns:40px 1fr 43px;padding:19px 17px}.gm-dmg-footer-card .shield,.gm-dmg-footer-card .book{font-size:30px}}',
      '@media(max-width:365px){.gm-dmg-top{grid-template-columns:1fr 1fr auto}.gm-dmg-top button{font-size:14px;padding:0 11px}.gm-dmg-hero{grid-template-columns:68px 1fr}.gm-dmg-mother{display:none}.gm-dmg-drop{width:66px;height:66px}.gm-dmg-drop span{font-size:39px}}'
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
          '<section class="gm-dmg-hero" aria-labelledby="gm-dmg-title">',
            '<div class="gm-dmg-drop" aria-hidden="true"><span>🩸</span></div>',
            '<div class="gm-dmg-title"><h1 id="gm-dmg-title">Diabetes Mellitus <em>Gestacional (DMG)</em></h1><p>ASSISTENTE CLÍNICO COMPLETO</p></div>',
            '<div class="gm-dmg-mother" aria-hidden="true"></div>',
          '</section>',
          '<section class="gm-dmg-card gm-dmg-info">',
            '<div class="gm-dmg-card-inner"><div class="gm-dmg-card-icon" aria-hidden="true">ⓘ</div><div>Conteúdo baseado na <strong>Diretriz da Sociedade Brasileira de Diabetes (SBD) — Edição 2025</strong>, <strong>FEBRASGO</strong> e <strong>Ministério da Saúde</strong>.<br><br>Cada recomendação abaixo traz a classe e o nível de evidência originais.<br><a href="https://doi.org/10.29327/557753.2022-13" target="_blank" rel="noopener noreferrer">Ver diretriz completa ↗</a></div></div>',
          '</section>',
          '<section class="gm-dmg-card gm-dmg-warning">',
            '<div class="gm-dmg-card-inner"><div class="gm-dmg-card-icon" aria-hidden="true">⚠️</div><div>Este módulo é <strong>apoio de referência</strong>, não uma prescrição automática. Toda dose de insulina ou metformina deve ser validada, ajustada e monitorada por médico/enfermeiro obstetra ou endocrinologista responsável pelo caso. <strong>Nunca inicie ou altere tratamento de diabetes gestacional com base apenas neste app.</strong></div></div>',
          '</section>',
          '<section class="gm-dmg-card gm-dmg-form">',
            '<label class="gm-dmg-label" for="gm-dmg-weight"><span aria-hidden="true">⚖️</span> Peso atual da gestante (kg)</label>',
            '<div class="gm-dmg-input-wrap"><input id="gm-dmg-weight" type="text" inputmode="decimal" autocomplete="off" placeholder="Ex.: 68,5" aria-describedby="gm-dmg-weight-warning"><span class="gm-dmg-unit">kg</span></div>',
            '<p id="gm-dmg-weight-warning" hidden>Informe um peso válido entre 1 e 300 kg.</p>',
          '</section>',
          '<button type="button" class="gm-dmg-calc" id="gm-dmg-calculate"><span aria-hidden="true">▦</span>Calcular dose de insulina <b aria-hidden="true">→</b></button>',
          '<section class="gm-dmg-footer-card"><div class="shield" aria-hidden="true">♢</div><div>Ferramenta educacional para apoiar sua decisão clínica e otimizar o cuidado da gestante com DMG.</div><div class="book" aria-hidden="true">▤</div></section>',
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
      if (warning) warning.hidden = true;
    });
  }

  function openModule() {
    buildModule();
    hideHome();
    var module = document.getElementById(MODULE_ID);
    module.classList.add('gm-dmg-open');
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
    var target = event.target && event.target.closest ? event.target.closest('button,a,[role="button"],[onclick]') : null;
    if (!target || target.closest('#' + MODULE_ID)) return;
    if (!isDmgTrigger(target)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    openModule();
  }, true);

  function start() {
    if (!document.body) { window.setTimeout(start, 100); return; }
    ensureStyle();
    buildModule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();