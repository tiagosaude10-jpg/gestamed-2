(function(){
'use strict';

var ROOT_ID='gm-gestational-diabetes-screen';
var BRIDGE_ID='gm-gestational-diabetes-entry';
var STYLE_ID='gm-gestational-diabetes-style';

function flow(){return document.getElementById('gm-app-flow');}
function screen(name){var f=flow();return f?f.querySelector('.gm-flow-screen[data-screen="'+name+'"]'):null;}
function activate(name){
  var f=flow(); if(!f)return;
  f.classList.remove('gm-flow-hidden');
  f.setAttribute('data-screen',name);
  f.querySelectorAll('.gm-flow-screen').forEach(function(el){el.classList.toggle('gm-screen-active',el.getAttribute('data-screen')===name);});
  document.body.classList.add('gm-flow-active');
  var active=screen(name); if(active)active.scrollTop=0;
}
function home(){activate('home');}
function triggerHome(selector){
  home();
  var el=document.querySelector('#gm-app-flow [data-screen="home"] '+selector);
  if(el)el.click();
}
function toast(message){
  var old=document.getElementById('gm-gestational-diabetes-toast'); if(old)old.remove();
  var el=document.createElement('div'); el.id='gm-gestational-diabetes-toast'; el.textContent=message; document.body.appendChild(el);
  requestAnimationFrame(function(){el.classList.add('show');});
  window.setTimeout(function(){el.classList.remove('show');window.setTimeout(function(){el.remove();},180);},2200);
}
function openTopic(title){toast(title+' — conteúdo será inserido na próxima etapa.');}
function openGestationalDiabetesModule(){activate('gestational-diabetes');}
function closeGestationalDiabetesModule(){home();}

window.openGestationalDiabetesModule=openGestationalDiabetesModule;
window.closeGestationalDiabetesModule=closeGestationalDiabetesModule;
window.openDmgDiagnosis=function(){openTopic('Diagnóstico do DMG');};
window.openDmgCriteria=function(){openTopic('Critérios diagnósticos');};
window.openDmgTotg=function(){openTopic('TOTG 75 g (24–28 semanas)');};
window.openDmgFastingGlucose=function(){openTopic('Glicemia de jejum');};
window.openDmgEarlyDiagnosis=function(){openTopic('Diagnóstico precoce');};
window.openDmgPreviousVsGestational=function(){openTopic('DM prévio x DMG');};
window.openDmgFlowchart=function(){toast('Fluxograma em construção.');};

function ensureStyle(){
  if(document.getElementById(STYLE_ID))return;
  var style=document.createElement('style'); style.id=STYLE_ID;
  style.textContent=[
    '#gm-app-flow [data-gm-module="insulina"] .gm-command-module-copy strong{font-size:0!important;}',
    '#gm-app-flow [data-gm-module="insulina"] .gm-command-module-copy strong:before{content:"Diabetes Gestacional";font-size:13px;line-height:1.18;font-weight:800;}',
    '#gm-app-flow [data-gm-module="insulina"] .gm-command-module-copy small.gm-dmg-new-subtitle{display:block;margin-top:3px;color:#40506c;font-size:9px;line-height:1.2;}',
    '#'+ROOT_ID+'{background:#fff4f7!important;}',
    '#'+ROOT_ID+' .gm-dmg-new-shell{box-sizing:border-box;position:relative;width:min(100%,600px);min-height:100%;margin:0 auto;padding:0 14px 88px;background:linear-gradient(180deg,#fff8fb 0%,#fff 46%,#fff7fa 100%);box-shadow:0 0 40px rgba(98,37,65,.12);color:#17233c;}',
    '#'+ROOT_ID+' .gm-dmg-new-top{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;margin:0 -14px 12px;padding:max(10px,env(safe-area-inset-top)) 14px 10px;background:rgba(255,249,252,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(236,87,137,.12);}',
    '#'+ROOT_ID+' .gm-dmg-new-back{height:38px;padding:0 12px;border:1px solid #f0c8d7;border-radius:13px;background:#fff;color:#b71d50;font-weight:800;cursor:pointer;}',
    '#'+ROOT_ID+' .gm-dmg-new-brand{text-align:center;color:#e32668;font-size:15px;font-weight:850;}',
    '#'+ROOT_ID+' .gm-dmg-new-actions{display:flex;gap:7px;justify-content:flex-end;}',
    '#'+ROOT_ID+' .gm-dmg-new-action{display:grid;place-items:center;width:38px;height:38px;padding:0;border:1px solid #f0c8d7;border-radius:13px;background:#fff;color:#d72b66;cursor:pointer;font-size:17px;}',
    '#'+ROOT_ID+' .gm-dmg-new-hero{position:relative;min-height:168px;padding:18px 45% 8px 3px;margin-bottom:12px;overflow:hidden;border-radius:24px;background:linear-gradient(135deg,#fff,#fff0f5);}',
    '#'+ROOT_ID+' .gm-dmg-new-hero h1{margin:0;color:#111a33;font-size:clamp(30px,7.6vw,42px);line-height:1.02;letter-spacing:-1.2px;}',
    '#'+ROOT_ID+' .gm-dmg-new-hero p{margin:10px 0 0;color:#596174;font-size:14px;font-weight:600;}',
    '#'+ROOT_ID+' .gm-dmg-new-hero img{position:absolute;right:-5px;bottom:-2px;width:47%;height:170px;object-fit:cover;object-position:center 31%;border-radius:48% 48% 40% 40%;mix-blend-mode:multiply;}',
    '#'+ROOT_ID+' .gm-dmg-new-list{display:grid;gap:9px;}',
    '#'+ROOT_ID+' .gm-dmg-new-card{--bg:#fff1f6;--bd:#f3cad9;--accent:#ed1763;--icon:#ffe1ea;box-sizing:border-box;width:100%;min-height:92px;display:grid;grid-template-columns:58px 38px minmax(0,1fr) 24px;align-items:center;gap:9px;padding:10px 12px;border:1px solid var(--bd);border-radius:20px;background:linear-gradient(135deg,rgba(255,255,255,.82),var(--bg));box-shadow:0 6px 16px rgba(76,42,63,.05);text-align:left;color:#111a33;cursor:pointer;}',
    '#'+ROOT_ID+' .gm-dmg-new-card:active{transform:scale(.993);}',
    '#'+ROOT_ID+' .gm-dmg-new-icon{display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:var(--icon);font-size:28px;}',
    '#'+ROOT_ID+' .gm-dmg-new-num{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;background:var(--accent);color:#fff;font-size:19px;font-weight:900;}',
    '#'+ROOT_ID+' .gm-dmg-new-copy strong{display:block;font-size:16px;line-height:1.16;font-weight:900;}',
    '#'+ROOT_ID+' .gm-dmg-new-copy small{display:block;margin-top:4px;color:#596174;font-size:12px;line-height:1.22;font-weight:600;}',
    '#'+ROOT_ID+' .gm-dmg-new-chevron{color:#ed1763;font-size:29px;text-align:center;}',
    '#'+ROOT_ID+' .c2{--bg:#faf2ff;--bd:#ead8f8;--accent:#a855e8;--icon:#f0e2fb;}#'+ROOT_ID+' .c3{--bg:#f2fae9;--bd:#d9edbd;--accent:#35c83c;--icon:#e4f8d3;}#'+ROOT_ID+' .c4{--bg:#fff9e9;--bd:#f3e1ae;--accent:#f7b900;--icon:#fff0bd;}#'+ROOT_ID+' .c5{--bg:#edf6ff;--bd:#cfe2f7;--accent:#4b9df0;--icon:#dceeff;}#'+ROOT_ID+' .c6{--bg:#fff2ef;--bd:#f4d1c9;--accent:#ff7665;--icon:#ffe0da;}',
    '#'+ROOT_ID+' .gm-dmg-new-flow{width:100%;min-height:64px;margin-top:11px;display:grid;grid-template-columns:52px 1fr 30px;align-items:center;gap:9px;padding:7px 12px;border:1px solid #f2c1d3;border-radius:20px;background:linear-gradient(135deg,#fff3f8,#ffe4ef);color:#e31e65;text-align:left;font-size:16px;font-weight:900;cursor:pointer;}',
    '#'+ROOT_ID+' .gm-dmg-new-flow-icon{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#fff;font-size:25px;}',
    '#'+ROOT_ID+' .gm-dmg-new-nav{position:sticky;bottom:max(0px,env(safe-area-inset-bottom));z-index:20;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));align-items:end;margin:14px -3px 0;padding:7px 3px 6px;border:1px solid rgba(236,133,166,.16);border-radius:21px;background:rgba(255,255,255,.97);box-shadow:0 -7px 22px rgba(102,42,67,.08);}',
    '#'+ROOT_ID+' .gm-dmg-new-nav button{min-width:0;padding:2px;border:0;background:transparent;color:#40475a;cursor:pointer;font-size:10px;}#'+ROOT_ID+' .gm-dmg-new-nav span{display:block;margin-bottom:3px;color:#c05b81;font-size:22px;line-height:1;}#'+ROOT_ID+' .gm-dmg-new-nav .active{color:#ef1760;font-weight:760;}',
    '#gm-gestational-diabetes-toast{position:fixed;left:50%;bottom:90px;z-index:2147483647;max-width:min(86vw,360px);padding:11px 15px;border-radius:13px;background:#261920;color:#fff;font-size:12px;text-align:center;opacity:0;transform:translate(-50%,10px);transition:.18s;}#gm-gestational-diabetes-toast.show{opacity:1;transform:translate(-50%,0);}',
    '@media(max-width:390px){#'+ROOT_ID+' .gm-dmg-new-shell{padding-left:10px;padding-right:10px;}#'+ROOT_ID+' .gm-dmg-new-hero{padding-right:44%;min-height:155px;}#'+ROOT_ID+' .gm-dmg-new-hero img{height:158px;width:48%;}#'+ROOT_ID+' .gm-dmg-new-card{grid-template-columns:52px 36px minmax(0,1fr) 22px;gap:7px;padding:9px;}#'+ROOT_ID+' .gm-dmg-new-icon{width:49px;height:49px;font-size:25px;}#'+ROOT_ID+' .gm-dmg-new-copy strong{font-size:15px;}}'
  ].join('');
  document.head.appendChild(style);
}

function buildScreen(){
  var f=flow(); if(!f||document.getElementById(ROOT_ID))return;
  var s=document.createElement('section'); s.id=ROOT_ID; s.className='gm-flow-screen'; s.setAttribute('data-screen','gestational-diabetes'); s.setAttribute('aria-label','Diabetes Gestacional');
  s.innerHTML='<main class="gm-dmg-new-shell"><header class="gm-dmg-new-top"><button class="gm-dmg-new-back" type="button" aria-label="Voltar para a tela de comando">‹ Voltar</button><div class="gm-dmg-new-brand">GestaMed</div><div class="gm-dmg-new-actions"><button class="gm-dmg-new-action gm-dmg-new-notices" type="button" aria-label="Abrir avisos">🔔</button><button class="gm-dmg-new-action gm-dmg-new-logout" type="button" aria-label="Sair">Sair</button></div></header><section class="gm-dmg-new-hero"><h1>Diabetes<br>Gestacional</h1><p>Selecione o tópico desejado</p><img src="gestamed-hero.jpg?v=204" alt="Ilustração de gestante"></section><div class="gm-dmg-new-list"><button class="gm-dmg-new-card" type="button" data-topic="diagnosis" aria-label="Diagnóstico do DMG"><span class="gm-dmg-new-icon">🔬</span><span class="gm-dmg-new-num">1</span><span class="gm-dmg-new-copy"><strong>Diagnóstico do DMG</strong></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c2" type="button" data-topic="criteria" aria-label="Critérios diagnósticos"><span class="gm-dmg-new-icon">📋</span><span class="gm-dmg-new-num">2</span><span class="gm-dmg-new-copy"><strong>Critérios diagnósticos</strong><small>IADPSG / OMS / SBD 2025</small></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c3" type="button" data-topic="totg" aria-label="TOTG 75 g de 24 a 28 semanas"><span class="gm-dmg-new-icon">🗓️</span><span class="gm-dmg-new-num">3</span><span class="gm-dmg-new-copy"><strong>TOTG 75 g (24–28 semanas)</strong><small>Como interpretar</small></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c4" type="button" data-topic="fasting" aria-label="Glicemia de jejum"><span class="gm-dmg-new-icon">🩸</span><span class="gm-dmg-new-num">4</span><span class="gm-dmg-new-copy"><strong>Glicemia de jejum</strong><small>Quando pode ser usado</small></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c5" type="button" data-topic="early" aria-label="Diagnóstico precoce"><span class="gm-dmg-new-icon">⏱️</span><span class="gm-dmg-new-num">5</span><span class="gm-dmg-new-copy"><strong>Diagnóstico precoce</strong><small>Antes de 24 semanas</small></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c6" type="button" data-topic="previous" aria-label="DM prévio versus DMG"><span class="gm-dmg-new-icon">♀</span><span class="gm-dmg-new-num">6</span><span class="gm-dmg-new-copy"><strong>DM prévio x DMG</strong><small>Como diferenciar</small></span><span class="gm-dmg-new-chevron">›</span></button></div><button class="gm-dmg-new-flow" type="button" aria-label="Ver fluxograma completo"><span class="gm-dmg-new-flow-icon">⌘</span><span>Ver fluxograma completo</span><span>↗</span></button><nav class="gm-dmg-new-nav" aria-label="Navegação principal"><button class="active" type="button" data-home-nav="inicio"><span>⌂</span>Início</button><button type="button" data-home-nav="obstetricia"><span>♧</span>Obstetrícia</button><button type="button" data-home-nav="prenatal"><span>♡</span>Pré-natal</button><button type="button" data-home-nav="protocolos"><span>▤</span>Protocolos</button><button type="button" data-home-nav="perfil"><span>♙</span>Perfil</button></nav></main>';
  f.appendChild(s);
  s.querySelector('.gm-dmg-new-back').addEventListener('click',closeGestationalDiabetesModule);
  s.querySelector('.gm-dmg-new-notices').addEventListener('click',function(){triggerHome('.gm-command-notices');});
  s.querySelector('.gm-dmg-new-logout').addEventListener('click',function(){triggerHome('.gm-command-logout');});
  var topicMap={diagnosis:window.openDmgDiagnosis,criteria:window.openDmgCriteria,totg:window.openDmgTotg,fasting:window.openDmgFastingGlucose,early:window.openDmgEarlyDiagnosis,previous:window.openDmgPreviousVsGestational};
  s.querySelectorAll('[data-topic]').forEach(function(btn){btn.addEventListener('click',function(){var fn=topicMap[btn.getAttribute('data-topic')];if(fn)fn();});});
  s.querySelector('.gm-dmg-new-flow').addEventListener('click',window.openDmgFlowchart);
  s.querySelectorAll('[data-home-nav]').forEach(function(btn){btn.addEventListener('click',function(){var key=btn.getAttribute('data-home-nav'); if(key==='inicio'){home();return;} triggerHome('[data-gm-nav="'+key+'"]');});});
}

function retitleHomeCard(){
  var button=document.querySelector('#gm-app-flow [data-gm-module="insulina"]'); if(!button)return;
  button.setAttribute('aria-label','Diabetes Gestacional'); button.setAttribute('title','Diabetes Gestacional');
  var copy=button.querySelector('.gm-command-module-copy'); if(!copy)return;
  var subtitle=copy.querySelector('.gm-dmg-new-subtitle');
  if(!subtitle){subtitle=document.createElement('small');subtitle.className='gm-dmg-new-subtitle';subtitle.textContent='Diagnóstico, rastreio e critérios';copy.appendChild(subtitle);}
}

function createBridge(){
  if(document.getElementById(BRIDGE_ID))return;
  var bridge=document.createElement('button'); bridge.id=BRIDGE_ID; bridge.type='button'; bridge.setAttribute('aria-label','DMG'); bridge.setAttribute('title','Diabetes Gestacional');
  bridge.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
  bridge.addEventListener('click',openGestationalDiabetesModule);
  document.body.insertBefore(bridge,document.body.firstChild);
}

function init(){ensureStyle();buildScreen();retitleHomeCard();createBridge();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();