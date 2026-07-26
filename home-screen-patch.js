(function () {
  'use strict';

  var PATCH_ID = 'gestamed-home-screen-2026-07-26-173';
  var CID_URL = 'https://laboratoriocid.com.br/logins/login';
  if (document.documentElement.getAttribute('data-gm-home-screen') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-home-screen', PATCH_ID);

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function findTarget(labels) {
    var candidates = Array.prototype.slice.call(document.querySelectorAll('button, a, [role="button"], [onclick]'));
    var wanted = labels.map(normalize);
    return candidates.find(function (element) {
      if (element.closest && element.closest('#gm-home-screen, #gm-welcome-screen')) return false;
      var text = normalize((element.getAttribute('aria-label') || '') + ' ' + (element.getAttribute('title') || '') + ' ' + (element.textContent || ''));
      return wanted.some(function (label) { return text === label || text.indexOf(label) !== -1; });
    }) || null;
  }

  function findSearchInput() {
    return document.querySelector('#searchInput, input[type="search"], input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function dispatchInput(input) {
    ['input', 'change', 'keyup'].forEach(function (type) { input.dispatchEvent(new Event(type, { bubbles: true })); });
    try { if (typeof applyFilters === 'function') applyFilters(); } catch (error) {}
  }

  function hideHome() {
    var home = document.getElementById('gm-home-screen');
    if (home) home.classList.add('gm-home-hidden');
    document.documentElement.classList.remove('gm-home-active');
  }

  function showHome() {
    var welcome = document.getElementById('gm-welcome-screen');
    var home = document.getElementById('gm-home-screen');
    if (welcome) welcome.classList.add('gm-welcome-hidden');
    if (home) { home.classList.remove('gm-home-hidden'); home.scrollTop = 0; }
    document.documentElement.classList.add('gm-home-active');
  }

  function activate(labels) {
    var target = findTarget(labels);
    if (!target) return false;
    hideHome();
    window.setTimeout(function () { try { target.click(); } catch (error) {} }, 20);
    return true;
  }

  function openExternal(url) {
    var opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  }

  function showDevelopmentMessage(label) {
    var old = document.getElementById('gm-home-dev-message');
    if (old) old.remove();
    var overlay = document.createElement('div');
    overlay.id = 'gm-home-dev-message';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = '<div class="gm-home-dev-card"><div class="gm-home-dev-icon">🛠️</div><strong>' + label + '</strong><p>Módulo em desenvolvimento.</p><button type="button">Entendi</button></div>';
    function close() { overlay.remove(); }
    overlay.addEventListener('click', function (event) { if (event.target === overlay || event.target.tagName === 'BUTTON') close(); });
    document.body.appendChild(overlay);
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
    if (definition.disabled) button.setAttribute('aria-disabled', 'true');
    button.addEventListener('click', function (event) {
      event.preventDefault(); event.stopPropagation();
      if (definition.url) { openExternal(definition.url); return; }
      if (definition.disabled) { showDevelopmentMessage(definition.labels[0]); return; }
      if (!activate(definition.labels)) showDevelopmentMessage(definition.labels[0]);
    });
    parent.appendChild(button);
  }

  function ensureStyle() {
    var old = document.getElementById('gm-home-screen-style');
    if (old) old.remove();
    var style = document.createElement('style');
    style.id = 'gm-home-screen-style';
    style.textContent = [
      '#gm-welcome-screen,#gm-home-screen{position:fixed;inset:0;z-index:2147483000;background:#fff4f7;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;display:flex;justify-content:center;align-items:flex-start;}',
      '#gm-welcome-screen{z-index:2147483100;}',
      '#gm-welcome-screen.gm-welcome-hidden,#gm-home-screen.gm-home-hidden{display:none!important;}',
      '#gm-welcome-canvas{position:relative;width:min(100vw,832px);aspect-ratio:832/1536;background:#fff4f7;overflow:hidden;box-shadow:0 0 40px rgba(98,37,65,.12);}',
      '#gm-home-canvas{position:relative;width:min(100vw,832px);aspect-ratio:832/1792;background:#fff4f7;overflow:hidden;box-shadow:0 0 40px rgba(98,37,65,.12);flex:0 0 auto;}',
      '#gm-welcome-image,#gm-home-image{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;user-select:none;-webkit-user-drag:none;}',
      '.gm-welcome-action,.gm-home-hotspot{position:absolute;z-index:3;border:0;background:transparent;cursor:pointer;border-radius:22px;-webkit-tap-highlight-color:rgba(236,72,153,.16);}',
      '.gm-welcome-action:focus-visible,.gm-home-hotspot:focus-visible{outline:3px solid rgba(236,72,153,.48);outline-offset:-2px;background:rgba(255,255,255,.08);}',
      '#gm-welcome-start{left:18.5%;top:81.45%;width:63.5%;height:6%;}',
      '#gm-welcome-login{left:28%;top:88.35%;width:44%;height:3.8%;}',
      '#gm-home-search{position:absolute;z-index:15;left:9%;top:25.1%;width:79%;height:3.8%;border:0;background:transparent;color:#3b2333;font:500 clamp(12px,3vw,20px)/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:0 2%;outline:none;}',
      '#gm-home-search::placeholder{color:transparent;}',
      '#gm-home-dev-message{position:fixed;inset:0;z-index:2147483647;background:rgba(45,24,38,.42);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:24px;}',
      '.gm-home-dev-card{width:min(88vw,360px);background:#fff;border-radius:24px;padding:26px 22px;text-align:center;box-shadow:0 24px 70px rgba(82,33,61,.28);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#3b2333;}',
      '.gm-home-dev-card strong{display:block;font-size:20px;margin:4px 0 8px;}.gm-home-dev-card p{margin:0 0 20px;color:#76576a;font-size:15px;}.gm-home-dev-icon{font-size:34px;}.gm-home-dev-card button{border:0;border-radius:999px;background:#ec4899;color:#fff;font-weight:800;font-size:15px;padding:12px 26px;}',
      '@media(min-width:833px){#gm-welcome-screen,#gm-home-screen{padding:18px 0;}#gm-welcome-canvas,#gm-home-canvas{border-radius:32px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildWelcome() {
    if (document.getElementById('gm-welcome-screen')) return true;
    var welcome = document.createElement('div'); welcome.id = 'gm-welcome-screen';
    var canvas = document.createElement('div'); canvas.id = 'gm-welcome-canvas';
    var image = document.createElement('img'); image.id = 'gm-welcome-image'; image.src = 'gestamed-tela-abertura.jpeg'; image.alt = ''; canvas.appendChild(image);
    ['start','login'].forEach(function(name){ var b=document.createElement('button'); b.type='button'; b.id='gm-welcome-'+name; b.className='gm-welcome-action'; b.setAttribute('aria-label',name==='start'?'Começar agora':'Entrar'); b.onclick=function(e){e.preventDefault();showHome();}; canvas.appendChild(b); });
    welcome.appendChild(canvas); document.body.appendChild(welcome); return true;
  }

  function buildHome() {
    if (document.getElementById('gm-home-screen')) return true;
    ensureStyle();
    var home = document.createElement('div'); home.id='gm-home-screen'; home.className='gm-home-hidden'; home.setAttribute('aria-label','Tela inicial GestaMed');
    var canvas = document.createElement('div'); canvas.id='gm-home-canvas';
    var image = document.createElement('img'); image.id='gm-home-image'; image.src='F4907271-BC9F-4AC0-AED2-75E16DFBB496.png?v=173'; image.alt=''; canvas.appendChild(image);
    var search=document.createElement('input'); search.id='gm-home-search'; search.type='search'; search.autocomplete='off'; search.spellcheck=false; search.setAttribute('aria-label','Pesquisar medicamento ou princípio ativo');
    search.addEventListener('input',function(){var original=findSearchInput();if(!original)return;original.value=search.value;dispatchInput(original);});
    search.addEventListener('keydown',function(event){if(event.key!=='Enter')return;var original=findSearchInput();if(!original)return;original.value=search.value;dispatchInput(original);hideHome();window.setTimeout(function(){original.focus();},30);});
    canvas.appendChild(search);

    [
      {x:3.5,y:30.2,w:17.5,h:3.9,labels:['Dor']},
      {x:21.5,y:30.2,w:18.5,h:3.9,labels:['Febre']},
      {x:40.5,y:30.2,w:19.5,h:3.9,labels:['Alergia']},
      {x:60.5,y:30.2,w:19.2,h:3.9,labels:['Náusea','Náuseas']},
      {x:79.8,y:30.2,w:19.0,h:3.9,labels:['Vômitos','Vomitos']},
      {x:3.2,y:36.7,w:17.2,h:7.7,labels:['Agenda','Calendário'],disabled:true},
      {x:21.6,y:36.7,w:17.2,h:7.7,labels:['Checklists','Checklist'],disabled:true},
      {x:40.1,y:36.7,w:17.2,h:7.7,labels:['Calculadoras','Calculadora'],disabled:true},
      {x:58.6,y:36.7,w:17.2,h:7.7,labels:['Favoritos','Favorito'],disabled:true},
      {x:77.1,y:36.7,w:19.5,h:7.7,labels:['Lembretes','Lembrete'],disabled:true},
      {x:3.3,y:46.3,w:45.2,h:6.7,labels:['Idade gestacional']},
      {x:50.6,y:46.3,w:46.1,h:6.7,labels:['Cálculo de insulina','Calculo de insulina','Insulina','DMG']},
      {x:3.3,y:53.8,w:45.2,h:6.7,labels:['Painel de Exames','Painel de exames']},
      {x:50.6,y:53.8,w:46.1,h:6.7,labels:['Ganho de peso gestacional','Ganho de peso']},
      {x:3.3,y:61.4,w:45.2,h:7.0,labels:['Prescrições por Trimestre','Prescricoes por Trimestre','Prescrições']},
      {x:50.6,y:61.4,w:46.1,h:7.0,labels:['Condutas Obstétricas','Condutas Obstetricas','Condutas']},
      {x:3.3,y:69.9,w:93.4,h:6.9,labels:['Consulta de Exames — CID'],aria:'Consulta de Exames — CID',url:CID_URL},
      {x:0,y:94.5,w:20,h:5.5,labels:['Início','Inicio'],aria:'Início'},
      {x:20,y:94.5,w:20,h:5.5,labels:['Obstetrícia','Obstetricia'],aria:'Obstetrícia'},
      {x:40,y:94.2,w:20,h:5.8,labels:['Pré-natal','Pre natal'],aria:'Pré-natal'},
      {x:60,y:94.5,w:20,h:5.5,labels:['Protocolos','Protocolo'],aria:'Protocolos',disabled:true},
      {x:80,y:94.5,w:20,h:5.5,labels:['Perfil'],aria:'Perfil',disabled:true}
    ].forEach(function(definition){makeHotspot(canvas,definition);});

    home.appendChild(canvas); document.body.appendChild(home);
    document.addEventListener('click',function(event){var element=event.target&&event.target.closest?event.target.closest('button,a,[role="button"]'):null;if(!element||element.closest('#gm-home-screen,#gm-welcome-screen'))return;var text=normalize(element.textContent||element.getAttribute('aria-label')||'');if(text==='inicio'||text.indexOf(' inicio')!==-1)window.setTimeout(showHome,80);},true);
    function anyModalOpen(){return !!document.querySelector('.modal.open');}
    var modalObserver=new MutationObserver(function(mutations){var relevant=mutations.some(function(m){return m.target&&m.target.classList&&m.target.classList.contains('modal');});if(relevant)window.setTimeout(function(){if(!anyModalOpen())showHome();},60);});
    document.querySelectorAll('.modal').forEach(function(modal){modalObserver.observe(modal,{attributes:true,attributeFilter:['class']});});
    return true;
  }

  var attempts=0;
  function start(){attempts+=1;if(document.body){ensureStyle();if(buildHome()&&buildWelcome())return;}if(attempts<80)window.setTimeout(start,150);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();