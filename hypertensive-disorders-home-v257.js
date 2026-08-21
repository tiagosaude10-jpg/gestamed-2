(function(){
'use strict';

var PATCH_ID='2026.08.20.257';
var SCREEN_NAME='hypertensive-disorders';
var SCREEN_ID='gm-hdp-screen';
var STYLE_ID='gm-hdp-style-v257';
var HOME_CARD_ID='gm-hdp-home-card-v257';

var MODULES=[
  {id:'diagnosis',n:'1',title:'Diagnóstico e Classificação',short:'Diagnóstico',sub:'Classificar a síndrome hipertensiva',icon:'🩺',tone:'rose'},
  {id:'evaluation',n:'2',title:'Avaliação Inicial e Exames',short:'Avaliação e Exames',sub:'Sintomas, exame e laboratório',icon:'🧪',tone:'peach'},
  {id:'preeclampsia',n:'3',title:'Pré-eclâmpsia',short:'Pré-eclâmpsia',sub:'Diagnóstico, gravidade e conduta',icon:'🤰',tone:'pink'},
  {id:'gestational-hypertension',n:'4',title:'Hipertensão Gestacional',short:'Hipertensão Gestacional',sub:'Controle, vigilância e reclassificação',icon:'🫀',tone:'amber'},
  {id:'chronic-hypertension',n:'5',title:'Hipertensão Arterial Crônica',short:'HAC',sub:'Tratamento e vigilância materno-fetal',icon:'❤️',tone:'mint'},
  {id:'superimposed-preeclampsia',n:'6',title:'PE Sobreposta à HAC',short:'PE Sobreposta à HAC',sub:'Reconhecer piora sobre hipertensão crônica',icon:'➕',tone:'violet'},
  {id:'hypertensive-crisis',n:'7',title:'Crise Hipertensiva',short:'Crise Hipertensiva',sub:'PA grave e tratamento urgente',icon:'🚨',tone:'red'},
  {id:'eclampsia',n:'8',title:'Eclâmpsia / MgSO₄',short:'Eclâmpsia / MgSO₄',sub:'Convulsão, magnésio e segurança',icon:'⚡',tone:'red'},
  {id:'hellp',n:'9',title:'Síndrome HELLP',short:'Síndrome HELLP',sub:'Hemólise, fígado e plaquetas',icon:'🩸',tone:'burgundy'},
  {id:'surveillance',n:'10',title:'Vigilância Materno-Fetal',short:'Vigilância Materno-Fetal',sub:'Mãe, crescimento, Doppler e CTG',icon:'📈',tone:'teal'},
  {id:'delivery',n:'11',title:'Parto e Conduta por IG',short:'Parto / Conduta por IG',sub:'Momento da resolução e via de parto',icon:'🗓️',tone:'blue'},
  {id:'postpartum',n:'12',title:'Puerpério e Seguimento',short:'Puerpério',sub:'PA pós-parto, alta e seguimento',icon:'🌷',tone:'green'}
];

function flow(){return document.getElementById('gm-app-flow');}
function screen(name){var f=flow();return f?f.querySelector('.gm-flow-screen[data-screen="'+name+'"]'):null;}
function activate(name){
  var f=flow();if(!f)return;
  f.classList.remove('gm-flow-hidden');
  f.setAttribute('data-screen',name);
  f.querySelectorAll('.gm-flow-screen').forEach(function(el){el.classList.toggle('gm-screen-active',el.getAttribute('data-screen')===name);});
  document.body.classList.add('gm-flow-active');
  var active=screen(name);if(active)active.scrollTop=0;
}
function home(){activate('home');}
function esc(value){return String(value||'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}

function homeGrid(){
  var h=screen('home');
  return h?h.querySelector('.gm-command-module-grid[aria-label="Módulos do GestaMed"]'):null;
}

function ensureHomeCard(){
  var g=homeGrid();if(!g)return false;
  var btn=document.getElementById(HOME_CARD_ID);
  if(!btn){
    btn=document.createElement('button');
    btn.id=HOME_CARD_ID;
    btn.type='button';
    btn.className='gm-command-module gm-card-pink gm-hdp-home-card';
    btn.setAttribute('aria-label','Síndromes Hipertensivas na Gestação');
    btn.setAttribute('title','Síndromes Hipertensivas na Gestação');
    btn.innerHTML='<span class="gm-command-module-icon">🫀</span><span class="gm-command-module-copy"><strong>Síndromes Hipertensivas</strong><small>Diagnóstico, tratamento e emergências</small></span><span class="gm-command-arrow">›</span>';
    btn.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();openMain();});
  }
  var dmg=document.getElementById('gm-dmg-home-card-v244');
  if(dmg&&dmg.parentElement===g){
    if(dmg.nextElementSibling!==btn)dmg.insertAdjacentElement('afterend',btn);
  }else if(btn.parentElement!==g){g.appendChild(btn);}
  return true;
}

function moduleCards(){
  return MODULES.map(function(item){
    return '<button type="button" class="gm-hdp-module gm-hdp-tone-'+item.tone+'" data-hdp-module="'+item.id+'" aria-label="'+esc(item.title)+'">'+
      '<span class="gm-hdp-module-icon" aria-hidden="true">'+item.icon+'</span>'+
      '<span class="gm-hdp-module-copy"><span class="gm-hdp-module-number">'+item.n+'</span><strong>'+esc(item.short)+'</strong><small>'+esc(item.sub)+'</small></span>'+
      '<span class="gm-hdp-chevron" aria-hidden="true">›</span>'+
    '</button>';
  }).join('');
}

function mainMarkup(){
  return '<div class="gm-hdp-shell">'+
    '<header class="gm-hdp-header">'+
      '<button type="button" class="gm-hdp-back" data-hdp-action="home" aria-label="Voltar para a tela de comando">‹</button>'+
      '<div class="gm-hdp-brand"><span class="gm-hdp-brand-icon">🫀</span><div><h1>Síndromes Hipertensivas</h1><p>Diagnóstico • Tratamento • Emergências • Parto</p></div></div>'+
      '<button type="button" class="gm-hdp-home-top" data-hdp-action="home" aria-label="Ir para início">⌂</button>'+
    '</header>'+
    '<main class="gm-hdp-content">'+
      '<section class="gm-hdp-patient-card" aria-label="Resumo clínico">'+
        '<div><span>Resumo clínico</span><strong>Paciente ainda não selecionada</strong></div><small>Os dados clínicos compartilhados serão ativados nos próximos blocos.</small>'+
      '</section>'+
      '<section class="gm-hdp-emergency" aria-label="Atalhos de emergência">'+
        '<button type="button" class="gm-hdp-emergency-btn gm-hdp-emergency-pa" data-hdp-jump="hypertensive-crisis"><span>🚨</span><strong>PA ≥160/110</strong><small>Crise hipertensiva</small></button>'+
        '<button type="button" class="gm-hdp-emergency-btn gm-hdp-emergency-ecl" data-hdp-jump="eclampsia"><span>⚡</span><strong>Convulsão</strong><small>Eclâmpsia</small></button>'+
        '<button type="button" class="gm-hdp-emergency-btn gm-hdp-emergency-mg" data-hdp-jump="eclampsia"><span>💉</span><strong>MgSO₄</strong><small>Acesso rápido</small></button>'+
      '</section>'+
      '<section class="gm-hdp-section-head"><div><span>Módulos clínicos</span><h2>Escolha uma área</h2></div><b>12 módulos</b></section>'+
      '<section class="gm-hdp-grid" aria-label="Módulos de síndromes hipertensivas">'+moduleCards()+'</section>'+
      '<section class="gm-hdp-version"><strong>Protocolo Síndromes Hipertensivas v1.0</strong><span>Estrutura clínica • agosto/2026</span><small>FEBRASGO • Ministério da Saúde</small></section>'+
    '</main>'+
    '<nav class="gm-hdp-bottom-nav" aria-label="Navegação do módulo">'+
      '<button type="button" data-hdp-action="home"><span>⌂</span><small>Início</small></button>'+
      '<button type="button" class="is-active" data-hdp-action="main"><span>▦</span><small>Módulos</small></button>'+
      '<button type="button" data-hdp-action="study"><span>📖</span><small>Estudo</small></button>'+
      '<button type="button" data-hdp-action="profile"><span>👤</span><small>Perfil</small></button>'+
    '</nav>'+
  '</div>';
}

function placeholderMarkup(item){
  var emergency=item.id==='hypertensive-crisis'||item.id==='eclampsia';
  return '<div class="gm-hdp-shell gm-hdp-placeholder-shell">'+
    '<header class="gm-hdp-header">'+
      '<button type="button" class="gm-hdp-back" data-hdp-action="main" aria-label="Voltar aos módulos">‹</button>'+
      '<div class="gm-hdp-brand gm-hdp-brand-compact"><span class="gm-hdp-brand-icon">'+item.icon+'</span><div><h1>'+esc(item.title)+'</h1><p>'+esc(item.sub)+'</p></div></div>'+
      '<button type="button" class="gm-hdp-home-top" data-hdp-action="home" aria-label="Ir para início">⌂</button>'+
    '</header>'+
    '<main class="gm-hdp-content gm-hdp-placeholder-content">'+
      (emergency?'<div class="gm-hdp-emergency-banner">Estrutura de emergência preparada</div>':'')+
      '<section class="gm-hdp-placeholder-card"><span class="gm-hdp-placeholder-icon">'+item.icon+'</span><small>Módulo '+item.n+'</small><h2>'+esc(item.title)+'</h2><p>A navegação e a estrutura visual deste módulo já estão prontas. O conteúdo clínico, campos, calculadoras e regras automáticas serão conectados nos próximos blocos de implantação.</p><button type="button" data-hdp-action="main">Voltar aos 12 módulos</button></section>'+
    '</main>'+
    '<nav class="gm-hdp-bottom-nav" aria-label="Navegação do módulo">'+
      '<button type="button" data-hdp-action="home"><span>⌂</span><small>Início</small></button>'+
      '<button type="button" class="is-active" data-hdp-action="main"><span>▦</span><small>Módulos</small></button>'+
      '<button type="button" data-hdp-action="study"><span>📖</span><small>Estudo</small></button>'+
      '<button type="button" data-hdp-action="profile"><span>👤</span><small>Perfil</small></button>'+
    '</nav>'+
  '</div>';
}

function renderMain(){var root=document.getElementById(SCREEN_ID);if(root)root.innerHTML=mainMarkup();bind(root);}
function openMain(){ensureScreen();renderMain();activate(SCREEN_NAME);}
function openModule(id){
  var item=MODULES.find(function(module){return module.id===id;});if(!item)return;
  var root=document.getElementById(SCREEN_ID);if(!root)return;
  root.innerHTML=placeholderMarkup(item);bind(root);activate(SCREEN_NAME);
}

function openStudy(){
  var target=MODULES[0];
  openModule(target.id);
  var root=document.getElementById(SCREEN_ID);if(!root)return;
  var card=root.querySelector('.gm-hdp-placeholder-card');
  if(card){var note=document.createElement('div');note.className='gm-hdp-study-note';note.textContent='Modo Estudo será conectado à explicação técnica completa durante a implantação do conteúdo clínico.';card.insertBefore(note,card.querySelector('button'));}
}

function openProfile(){
  var f=flow();if(!f)return;
  var profile=f.querySelector('.gm-flow-screen[data-screen="profile"]');
  if(profile){activate('profile');return;}
  home();
}

function bind(root){
  if(!root)return;
  root.querySelectorAll('[data-hdp-action]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var action=btn.getAttribute('data-hdp-action');
      if(action==='home')home();
      else if(action==='main')renderMain();
      else if(action==='study')openStudy();
      else if(action==='profile')openProfile();
    });
  });
  root.querySelectorAll('[data-hdp-module]').forEach(function(btn){btn.addEventListener('click',function(){openModule(btn.getAttribute('data-hdp-module'));});});
  root.querySelectorAll('[data-hdp-jump]').forEach(function(btn){btn.addEventListener('click',function(){openModule(btn.getAttribute('data-hdp-jump'));});});
}

function ensureScreen(){
  var f=flow();if(!f)return false;
  var root=document.getElementById(SCREEN_ID);
  if(!root){
    root=document.createElement('section');
    root.id=SCREEN_ID;
    root.className='gm-flow-screen gm-hdp-screen';
    root.setAttribute('data-screen',SCREEN_NAME);
    root.setAttribute('aria-label','Síndromes Hipertensivas na Gestação');
    f.appendChild(root);
  }
  return true;
}

function ensureStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');s.id=STYLE_ID;
  s.textContent=[
    '#gm-app-flow .gm-hdp-screen{background:#f9edf1!important;color:#17233c!important;}',
    '#gm-app-flow .gm-hdp-shell{box-sizing:border-box;position:relative;width:min(100%,600px);min-height:100%;margin:0 auto;padding-bottom:calc(78px + env(safe-area-inset-bottom,0px));background:linear-gradient(180deg,#fff7f9 0%,#f7fbf6 55%,#fff7f9 100%);box-shadow:0 0 40px rgba(98,37,65,.12);}',
    '#gm-app-flow .gm-hdp-header{position:sticky;top:0;z-index:30;display:grid;grid-template-columns:44px 1fr 44px;gap:10px;align-items:center;padding:calc(10px + env(safe-area-inset-top,0px)) 14px 11px;background:rgba(255,248,250,.94);border-bottom:1px solid rgba(194,40,88,.1);backdrop-filter:blur(14px);}',
    '#gm-app-flow .gm-hdp-back,#gm-app-flow .gm-hdp-home-top{width:42px;height:42px;border:1px solid rgba(190,45,91,.16);border-radius:50%;background:#fff;color:#bd2857;box-shadow:0 5px 16px rgba(99,28,55,.08);font-size:29px;line-height:1;cursor:pointer;}',
    '#gm-app-flow .gm-hdp-home-top{font-size:22px;}',
    '#gm-app-flow .gm-hdp-brand{min-width:0;display:flex;align-items:center;gap:9px;}',
    '#gm-app-flow .gm-hdp-brand>div{min-width:0;flex:1 1 auto;}',
    '#gm-app-flow .gm-hdp-brand-icon{flex:0 0 auto;width:42px;height:42px;display:grid;place-items:center;border-radius:14px;background:linear-gradient(135deg,#ffe0e9,#fff);box-shadow:0 5px 14px rgba(183,33,80,.08);font-size:22px;}',
    '#gm-app-flow .gm-hdp-brand h1{margin:0;color:#8c1e45;font-size:clamp(17px,4.4vw,22px);font-weight:850;letter-spacing:-.35px;line-height:1.05;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#gm-app-flow .gm-hdp-brand p{margin:4px 0 0;color:#7b6570;font-size:9px;font-weight:650;letter-spacing:.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#gm-app-flow .gm-hdp-brand-compact h1{font-size:16px;}',
    '#gm-app-flow .gm-hdp-content{padding:14px 14px 22px;}',
    '#gm-app-flow .gm-hdp-patient-card{display:flex;flex-direction:column;gap:5px;padding:14px 15px;border:1px solid rgba(61,116,88,.12);border-radius:18px;background:linear-gradient(135deg,rgba(240,252,245,.97),rgba(255,255,255,.97));box-shadow:0 8px 20px rgba(70,103,83,.07);}',
    '#gm-app-flow .gm-hdp-patient-card>div{display:flex;align-items:center;justify-content:space-between;gap:12px;}',
    '#gm-app-flow .gm-hdp-patient-card>div>span{color:#47715c;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;}',
    '#gm-app-flow .gm-hdp-patient-card>div>strong{color:#375746;font-size:12px;text-align:right;}',
    '#gm-app-flow .gm-hdp-patient-card>small{color:#738078;font-size:9px;line-height:1.35;}',
    '#gm-app-flow .gm-hdp-emergency{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:11px;}',
    '#gm-app-flow .gm-hdp-emergency-btn{min-width:0;min-height:74px;padding:9px 6px;border:0;border-radius:16px;color:#fff;box-shadow:0 8px 18px rgba(141,31,53,.13);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-align:center;}',
    '#gm-app-flow .gm-hdp-emergency-btn span{font-size:20px;line-height:1;}.gm-hdp-emergency-btn strong{font-size:10px;line-height:1.15}.gm-hdp-emergency-btn small{font-size:8px;opacity:.9}',
    '#gm-app-flow .gm-hdp-emergency-pa{background:linear-gradient(135deg,#c6283e,#ed4c5f);}',
    '#gm-app-flow .gm-hdp-emergency-ecl{background:linear-gradient(135deg,#9f1537,#d52a53);}',
    '#gm-app-flow .gm-hdp-emergency-mg{background:linear-gradient(135deg,#b52f66,#e55286);}',
    '#gm-app-flow .gm-hdp-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:19px 2px 10px;}',
    '#gm-app-flow .gm-hdp-section-head span{display:block;color:#be3b68;font-size:9px;font-weight:850;text-transform:uppercase;letter-spacing:.8px;}',
    '#gm-app-flow .gm-hdp-section-head h2{margin:2px 0 0;color:#592438;font-size:18px;letter-spacing:-.35px;}',
    '#gm-app-flow .gm-hdp-section-head b{padding:5px 8px;border-radius:999px;background:#f8dbe5;color:#ad315a;font-size:9px;white-space:nowrap;}',
    '#gm-app-flow .gm-hdp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;}',
    '#gm-app-flow .gm-hdp-module{position:relative;min-width:0;min-height:90px;padding:11px 25px 11px 10px;border:1px solid rgba(80,64,72,.08);border-radius:18px;background:#fff;box-shadow:0 7px 18px rgba(80,51,62,.07);display:grid;grid-template-columns:35px minmax(0,1fr);gap:8px;align-items:center;text-align:left;cursor:pointer;overflow:hidden;}',
    '#gm-app-flow .gm-hdp-module:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--hdp-accent,#dc5c82);}',
    '#gm-app-flow .gm-hdp-module-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:12px;background:var(--hdp-soft,#fde5ed);font-size:18px;}',
    '#gm-app-flow .gm-hdp-module-copy{min-width:0;display:grid;grid-template-columns:auto 1fr;column-gap:5px;align-items:center;}',
    '#gm-app-flow .gm-hdp-module-number{color:var(--hdp-accent,#c63d67);font-size:9px;font-weight:900;}',
    '#gm-app-flow .gm-hdp-module-copy strong{min-width:0;color:#34313a;font-size:11px;font-weight:850;line-height:1.15;}',
    '#gm-app-flow .gm-hdp-module-copy small{grid-column:1/-1;display:block;margin-top:4px;color:#72747b;font-size:8px;line-height:1.28;}',
    '#gm-app-flow .gm-hdp-chevron{position:absolute;right:8px;top:50%;transform:translateY(-50%);color:var(--hdp-accent,#c63d67);font-size:21px;opacity:.7;}',
    '#gm-app-flow .gm-hdp-tone-rose{--hdp-accent:#d13e72;--hdp-soft:#fde5ed}.gm-hdp-tone-peach{--hdp-accent:#d86f53;--hdp-soft:#ffebe4}.gm-hdp-tone-pink{--hdp-accent:#e34d83;--hdp-soft:#ffe5ef}.gm-hdp-tone-amber{--hdp-accent:#bd7a21;--hdp-soft:#fff0d9}.gm-hdp-tone-mint{--hdp-accent:#44886d;--hdp-soft:#e5f5ee}.gm-hdp-tone-violet{--hdp-accent:#8062aa;--hdp-soft:#eee7f8}.gm-hdp-tone-red{--hdp-accent:#c72c47;--hdp-soft:#ffe2e6}.gm-hdp-tone-burgundy{--hdp-accent:#9d294e;--hdp-soft:#f7e1e9}.gm-hdp-tone-teal{--hdp-accent:#2e7e82;--hdp-soft:#e0f2f3}.gm-hdp-tone-blue{--hdp-accent:#557bad;--hdp-soft:#e7eff9}.gm-hdp-tone-green{--hdp-accent:#548467;--hdp-soft:#e8f4ec}',
    '#gm-app-flow .gm-hdp-version{margin:17px 3px 3px;padding:12px;border-radius:15px;background:rgba(255,255,255,.65);border:1px solid rgba(173,49,90,.08);text-align:center;display:flex;flex-direction:column;gap:2px;}',
    '#gm-app-flow .gm-hdp-version strong{color:#8f3153;font-size:10px}.gm-hdp-version span{color:#6f6e73;font-size:8px}.gm-hdp-version small{color:#81747a;font-size:8px}',
    '#gm-app-flow .gm-hdp-bottom-nav{position:fixed;z-index:40;left:50%;bottom:0;transform:translateX(-50%);width:min(100%,600px);height:calc(64px + env(safe-area-inset-bottom,0px));padding:4px 10px env(safe-area-inset-bottom,0px);box-sizing:border-box;display:grid;grid-template-columns:repeat(4,1fr);background:rgba(255,250,251,.96);border-top:1px solid rgba(173,49,90,.12);box-shadow:0 -7px 20px rgba(91,43,59,.07);backdrop-filter:blur(14px);}',
    '#gm-app-flow .gm-hdp-bottom-nav button{border:0;background:transparent;color:#8a7c82;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;cursor:pointer;font-size:19px}.gm-hdp-bottom-nav button small{font-size:8px;font-weight:750}.gm-hdp-bottom-nav button.is-active{color:#c52f62}',
    '#gm-app-flow .gm-hdp-placeholder-content{min-height:calc(100vh - 145px);display:grid;place-items:center;}',
    '#gm-app-flow .gm-hdp-placeholder-card{width:100%;box-sizing:border-box;padding:28px 22px;border:1px solid rgba(173,49,90,.1);border-radius:24px;background:rgba(255,255,255,.92);box-shadow:0 14px 34px rgba(91,43,59,.09);text-align:center;}',
    '#gm-app-flow .gm-hdp-placeholder-icon{display:grid;place-items:center;width:64px;height:64px;margin:0 auto 9px;border-radius:20px;background:#fde7ee;font-size:31px}.gm-hdp-placeholder-card>small{color:#c13e69;font-size:10px;font-weight:850;text-transform:uppercase}.gm-hdp-placeholder-card h2{margin:6px 0 9px;color:#74233f;font-size:22px}.gm-hdp-placeholder-card p{margin:0 auto 18px;max-width:420px;color:#6d6267;font-size:12px;line-height:1.55}.gm-hdp-placeholder-card button{min-height:45px;padding:0 18px;border:0;border-radius:14px;background:#c93465;color:#fff;font-weight:800;cursor:pointer}',
    '#gm-app-flow .gm-hdp-emergency-banner{width:100%;box-sizing:border-box;margin-bottom:10px;padding:10px;border-radius:13px;background:#ffe0e5;color:#a91f3e;text-align:center;font-size:11px;font-weight:850;}',
    '#gm-app-flow .gm-hdp-study-note{margin:0 0 16px;padding:10px;border-radius:12px;background:#edf7ef;color:#47715a;font-size:10px;line-height:1.4;}',
    '#gm-app-flow .gm-hdp-home-card .gm-command-module-copy small{display:block;margin-top:3px;color:#40506c;font-size:9px;line-height:1.2;}',
    '@media(max-width:390px){#gm-app-flow .gm-hdp-content{padding-left:10px;padding-right:10px}.gm-hdp-grid{gap:7px!important}.gm-hdp-module{min-height:86px!important;padding-left:8px!important}.gm-hdp-module-copy strong{font-size:10px!important}.gm-hdp-module-copy small{font-size:7.5px!important}.gm-hdp-emergency{gap:6px!important}}'
  ].join('');
  document.head.appendChild(s);
}

function apply(){
  ensureStyle();
  ensureScreen();
  ensureHomeCard();
  document.documentElement.setAttribute('data-gm-hypertensive-disorders',PATCH_ID);
  return true;
}

function init(){
  [0,100,250,500,900,1500,2500,4000].forEach(function(ms){window.setTimeout(apply,ms);});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',function(){window.setTimeout(apply,150);},{once:true});

window.openGestaMedHypertensiveDisorders=openMain;
})();