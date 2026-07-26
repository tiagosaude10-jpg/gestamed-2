(function () {
  'use strict';

  var PATCH_ID = 'gestamed-cid-module-2026-07-26-171';
  if (document.documentElement.getAttribute('data-gm-cid-module') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-cid-module', PATCH_ID);

  var CID_URL = 'https://laboratoriocid.com.br/logins/login';

  function ensureStyle() {
    if (document.getElementById('gm-cid-module-style')) return;
    var style = document.createElement('style');
    style.id = 'gm-cid-module-style';
    style.textContent = [
      '#gm-home-screen{overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;}',
      '#gm-cid-access{position:absolute;z-index:8;left:3.6%;top:72.55%;width:92.8%;height:6.65%;border:1.5px solid rgba(33,129,151,.28);border-radius:22px;background:linear-gradient(105deg,rgba(232,248,251,.98),rgba(241,250,252,.98));box-shadow:0 7px 18px rgba(38,111,130,.14);display:flex;align-items:center;padding:0 3.3%;gap:3%;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:left;color:#102a3a;cursor:pointer;-webkit-tap-highlight-color:rgba(33,129,151,.15);}',
      '#gm-cid-access:active{transform:scale(.992);}',
      '#gm-cid-access:focus-visible{outline:3px solid rgba(33,129,151,.42);outline-offset:2px;}',
      '.gm-cid-icon{width:13%;aspect-ratio:1;border-radius:50%;background:linear-gradient(145deg,#08778b,#1c93a8);display:flex;align-items:center;justify-content:center;font-size:clamp(24px,6vw,46px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.25);flex:0 0 auto;}',
      '.gm-cid-copy{min-width:0;flex:1;display:flex;flex-direction:column;justify-content:center;}',
      '.gm-cid-title{font-weight:800;font-size:clamp(14px,3.7vw,27px);line-height:1.05;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.gm-cid-subtitle{margin-top:3px;font-weight:500;font-size:clamp(10px,2.45vw,18px);line-height:1.15;color:#23637a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.gm-cid-arrow{width:9%;aspect-ratio:1;border-radius:50%;background:#21879d;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:clamp(22px,5vw,38px);line-height:1;flex:0 0 auto;}',
      '@media(max-width:390px){#gm-cid-access{border-radius:18px}.gm-cid-subtitle{font-size:10px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function openCID() {
    var opened = window.open(CID_URL, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = CID_URL;
  }

  function install() {
    ensureStyle();
    var canvas = document.getElementById('gm-home-canvas');
    if (!canvas || document.getElementById('gm-cid-access')) return false;

    var button = document.createElement('button');
    button.type = 'button';
    button.id = 'gm-cid-access';
    button.setAttribute('aria-label', 'Consulta de Exames — CID. Acessar resultados laboratoriais da gestante');
    button.innerHTML = '<span class="gm-cid-icon" aria-hidden="true">🧪</span><span class="gm-cid-copy"><span class="gm-cid-title">Consulta de Exames — CID</span><span class="gm-cid-subtitle">Acessar resultados laboratoriais da gestante</span></span><span class="gm-cid-arrow" aria-hidden="true">›</span>';
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      openCID();
    });
    canvas.appendChild(button);
    return true;
  }

  var attempts = 0;
  function start() {
    attempts += 1;
    if (install()) return;
    if (attempts < 120) window.setTimeout(start, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
