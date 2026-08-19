(function(){
'use strict';

var ROOT_ID='gm-gestational-diabetes-screen';
var STYLE_ID='gm-gestational-diabetes-style';

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
function triggerHome(selector){home();var el=document.querySelector('#gm-app-flow [data-screen="home"] '+selector);if(el)el.click();}
function toast(message){
  var old=document.getElementById('gm-gestational-diabetes-toast');if(old)old.remove();
  var el=document.createElement('div');el.id='gm-gestational-diabetes-toast';el.textContent=message;document.body.appendChild(el);
  requestAnimationFrame(function(){el.classList.add('show');});
  window.setTimeout(function(){el.classList.remove('show');window.setTimeout(function(){el.remove();},180);},2200);
}

var TOPICS={
  diagnosis:{title:'Diagnóstico do DMG',subtitle:'Como identificar corretamente',icon:'🎯'},
  criteria:{title:'Critérios diagnósticos',subtitle:'IADPSG / OMS / SBD 2025',icon:'📋'},
  totg:{title:'TOTG 75 g (24–28 semanas)',subtitle:'Como interpretar',icon:'🗓️'},
  fasting:{title:'Glicemia de jejum',subtitle:'Quando pode ser usado',icon:'🩸'},
  early:{title:'Diagnóstico precoce',subtitle:'Antes de 24 semanas',icon:'⏱️'},
  previous:{title:'DM prévio x DMG',subtitle:'Como diferenciar',icon:'♀'},
  flowchart:{title:'Fluxograma completo',subtitle:'Fluxo diagnóstico do diabetes gestacional',icon:'⌘'}
};

function openGestationalDiabetesModule(){activate('gestational-diabetes');showMenu();}
function closeGestationalDiabetesModule(){home();}
function showMenu(){
  var root=document.getElementById(ROOT_ID);if(!root)return;
  var menu=root.querySelector('.gm-dmg-new-menu');var detail=root.querySelector('.gm-dmg-new-detail');
  if(menu)menu.hidden=false;if(detail)detail.hidden=true;root.scrollTop=0;
}
function placeholderDetail(data,key){
  return '<div class="gm-dmg-placeholder"><span class="gm-dmg-placeholder-icon">'+data.icon+'</span><h2>'+data.title+'</h2><p>'+data.subtitle+'</p><div class="gm-dmg-placeholder-card"><strong>Tela conectada e funcionando.</strong><span>O conteúdo clínico desta seção será inserido na próxima etapa.</span></div></div>';
}
function diagnosisMarkup(){
  return '<section class="gm-diagnosis-page" aria-label="Diagnóstico do diabetes gestacional">'+
    '<div class="gm-diagnosis-toolbar"><button type="button" data-diagnosis-back>← <b>Voltar</b></button><button type="button" data-diagnosis-clear>🗑 <b>Limpar</b></button><button class="gm-diagnosis-close" type="button" data-diagnosis-close aria-label="Fechar">×</button></div>'+
    '<section class="gm-diagnosis-hero"><div><h1>Diagnóstico do DMG</h1><p>Como identificar corretamente</p></div><img src="gestamed-hero.jpg?v=204" alt="Ilustração de gestante"></section>'+
    '<section class="gm-clinical-card gm-track-card"><header><span>🎯</span><strong>Quem deve ser rastreada</strong></header><div class="gm-track-grid"><div class="gm-track-copy"><article><span class="gm-risk-icon pink">📅</span><div><b>Todas as gestantes</b><small>entre 24 e 28 semanas.</small></div></article><article><span class="gm-risk-icon pink">⚠</span><div><b>Antes de 24 semanas</b><small>em mulheres com alto risco.</small></div></article></div><div class="gm-clipboard-art" aria-hidden="true"><span class="clip">📋</span><span class="pen">✏️</span><span class="plant">🌱</span></div></div></section>'+
    '<section class="gm-clinical-card"><header><span>🛡️</span><strong>Fatores de alto risco</strong></header><div class="gm-risk-columns"><div><article><span class="gm-risk-icon pink">🩸</span><p><b>DMG prévio</b></p></article><article><span class="gm-risk-icon orange">👨‍👩‍👧</span><p><b>História familiar de DM</b><small>(1º grau)</small></p></article><article><span class="gm-risk-icon green">⚖️</span><p><b>Obesidade</b><small>(IMC ≥ 30 kg/m²)</small></p></article><article><span class="gm-risk-icon pink">💓</span><p><b>Hipertensão arterial prévia</b></p></article><article><span class="gm-risk-icon purple">🧬</span><p><b>SOP</b><small>(síndrome dos ovários policísticos)</small></p></article></div><div><article><span class="gm-risk-icon blue">👶</span><p><b>Antecedente de RN ≥ 4 kg ou macrossomia</b></p></article><article><span class="gm-risk-icon orange">💧</span><p><b>Intolerância à glicose prévia</b><small>(pré-diabetes)</small></p></article><article><span class="gm-risk-icon green">🩺</span><p><b>Outras condições associadas</b><small>dislipidemia, doença tireoidiana, acantose nigricans, entre outras.</small></p></article></div></div></section>'+
    '<aside class="gm-info-note"><span>ⓘ</span><p>A presença de um ou mais fatores de risco justifica o <b>rastreamento precoce</b>.</p></aside>'+
    '<section class="gm-point-title"><span>🎯</span><div><h2>Ponto diagnóstico do DMG</h2><p>Como identificar corretamente</p></div></section>'+
    '<section class="gm-clinical-card gm-flow-card"><header><span>🤰</span><strong>Quem deve ser rastreada</strong></header><div class="gm-diagnostic-flow"><div class="gm-flow-start"><div class="gm-flow-box"><span class="gm-risk-icon pink">📅</span><div><b>Todas as gestantes</b><small>1ª consulta do pré-natal</small></div></div><div class="gm-down-arrow">↓</div><div class="gm-flow-box"><span class="gm-risk-icon pink">🩸</span><div><b>Realizar glicemia de jejum</b></div></div></div><div class="gm-flow-branches"><article class="red"><b>≥126<br><small>mg/dL</small></b><p><strong>Diabetes manifesto</strong><span>(diabetes pré-existente)</span></p></article><article class="amber"><b>92 a 125<br><small>mg/dL</small></b><p><strong>Diabetes Mellitus Gestacional (DMG)</strong><span>Diagnóstico confirmado na 1ª consulta</span></p></article><article class="green"><b>&lt;92<br><small>mg/dL</small></b><p><strong>Realizar TOTG 75 g entre 24 e 28 semanas</strong><span>(para gestantes ainda sem DM prévio ou DMG)</span></p></article></div></div></section>'+
    '<section class="gm-clinical-card gm-second-trimester"><h3>Realizar teste segundo trimestre</h3><div class="gm-second-grid"><article><span class="gm-risk-icon pink">📅</span><p><b>TOTG 75 g entre 24 e 28 semanas</b><small>Para gestantes não diagnosticadas com DMG ou diabetes pré-existente na 1ª consulta.</small></p></article><article class="important"><span class="gm-risk-icon pink">📋</span><p><b>Importante</b><small>Reavaliar o risco e os resultados em todas as consultas do pré-natal.</small></p></article></div></section>'+
    '<section class="gm-clinical-card gm-high-risk"><header><span>🛡️</span><strong>Alto risco – rastrear já na 1ª consulta do pré-natal</strong></header><div class="gm-high-risk-grid"><article><span>🩸</span><b>DMG prévio</b></article><article><span>👨‍👩‍👧</span><b>História familiar de DM (1º grau)</b></article><article><span>⚖️</span><b>Obesidade<br><small>(IMC ≥ 30 kg/m²)</small></b></article><article><span>♀</span><b>SOP<br><small>(síndrome dos ovários policísticos)</small></b></article><article><span>💚</span><b>Hipertensão arterial crônica / síndrome metabólica</b></article><article><span>35+</span><b>Idade materna<br>≥ 35 anos</b></article><article><span>💧</span><b>Pré-diabetes ou glicemia alterada antes da gestação</b></article><article><span>👶</span><b>Antecedente de RN ≥ 4 kg ou macrossomia</b></article></div></section>'+
    '<aside class="gm-reminder"><span>💡</span><strong>Lembre-se</strong><p>Rastreamento precoce, diagnóstico correto e acompanhamento contínuo reduzem complicações maternas e fetais.</p></aside>'+
  '</section>';
}
function openTopic(key){
  var root=document.getElementById(ROOT_ID);var data=TOPICS[key];if(!root||!data)return;
  var menu=root.querySelector('.gm-dmg-new-menu');var detail=root.querySelector('.gm-dmg-new-detail');
  if(menu)menu.hidden=true;if(!detail)return;
  detail.hidden=false;detail.setAttribute('data-topic',key);
  detail.innerHTML=key==='diagnosis'?diagnosisMarkup():placeholderDetail(data,key);
  if(key==='diagnosis')bindDiagnosis(detail);else bindPlaceholder(detail);
  root.scrollTop=0;
}
function bindPlaceholder(detail){
  var back=document.createElement('button');back.type='button';back.className='gm-dmg-detail-back';back.textContent='‹ Voltar aos tópicos';back.addEventListener('click',showMenu);detail.insertBefore(back,detail.firstChild);
}
function bindDiagnosis(detail){
  var back=detail.querySelector('[data-diagnosis-back]');var clear=detail.querySelector('[data-diagnosis-clear]');var close=detail.querySelector('[data-diagnosis-close]');
  if(back)back.addEventListener('click',showMenu);
  if(clear)clear.addEventListener('click',function(){var root=document.getElementById(ROOT_ID);if(root)root.scrollTo({top:0,behavior:'smooth'});toast('Tela reposicionada no início.');});
  if(close)close.addEventListener('click',closeGestationalDiabetesModule);
}

window.openGestationalDiabetesModule=openGestationalDiabetesModule;
window.closeGestationalDiabetesModule=closeGestationalDiabetesModule;
window.openDmgDiagnosis=function(){openTopic('diagnosis');};
window.openDmgCriteria=function(){openTopic('criteria');};
window.openDmgTotg=function(){openTopic('totg');};
window.openDmgFastingGlucose=function(){openTopic('fasting');};
window.openDmgEarlyDiagnosis=function(){openTopic('early');};
window.openDmgPreviousVsGestational=function(){openTopic('previous');};
window.openDmgFlowchart=function(){openTopic('flowchart');};

function ensureStyle(){
  if(document.getElementById(STYLE_ID))return;
  var style=document.createElement('style');style.id=STYLE_ID;
  style.textContent=[
    '#'+ROOT_ID+'{background:#fff4f7!important;}',
    '#'+ROOT_ID+' .gm-dmg-new-shell{box-sizing:border-box;position:relative;width:min(100%,600px);min-height:100%;margin:0 auto;padding:0 14px 88px;background:linear-gradient(180deg,#fff8fb 0%,#fff 46%,#fff7fa 100%);box-shadow:0 0 40px rgba(98,37,65,.12);color:#17233c;}',
    '#'+ROOT_ID+' .gm-dmg-new-top{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;margin:0 -14px 12px;padding:max(10px,env(safe-area-inset-top)) 14px 10px;background:rgba(255,249,252,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(236,87,137,.12);}',
    '#'+ROOT_ID+' .gm-dmg-new-back,#'+ROOT_ID+' .gm-dmg-detail-back{height:38px;padding:0 12px;border:1px solid #f0c8d7;border-radius:13px;background:#fff;color:#b71d50;font-weight:800;cursor:pointer;}',
    '#'+ROOT_ID+' .gm-dmg-new-brand{text-align:center;color:#e32668;font-size:15px;font-weight:850;}',
    '#'+ROOT_ID+' .gm-dmg-new-actions{display:flex;gap:7px;justify-content:flex-end;}',
    '#'+ROOT_ID+' .gm-dmg-new-action{display:grid;place-items:center;min-width:38px;height:38px;padding:0 9px;border:1px solid #f0c8d7;border-radius:13px;background:#fff;color:#d72b66;cursor:pointer;font-size:15px;font-weight:750;}',
    '#'+ROOT_ID+' .gm-dmg-new-menu[hidden],#'+ROOT_ID+' .gm-dmg-new-detail[hidden]{display:none!important;}',
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
    '#'+ROOT_ID+' .gm-dmg-new-detail{padding:2px 0 22px;}',
    '#'+ROOT_ID+' .gm-dmg-placeholder{padding:8px 0 20px;text-align:center;}#'+ROOT_ID+' .gm-dmg-placeholder-icon{display:grid;place-items:center;width:68px;height:68px;margin:8px auto 12px;border-radius:20px;background:#ffe1ea;font-size:34px;}#'+ROOT_ID+' .gm-dmg-placeholder h2{margin:0;color:#111a33;font-size:25px;}#'+ROOT_ID+' .gm-dmg-placeholder>p{margin:6px 0 16px;color:#6a6270;}#'+ROOT_ID+' .gm-dmg-placeholder-card{padding:18px;border:1px solid #f0ccd9;border-radius:20px;background:#fff;text-align:left;}#'+ROOT_ID+' .gm-dmg-placeholder-card strong,#'+ROOT_ID+' .gm-dmg-placeholder-card span{display:block;}#'+ROOT_ID+' .gm-dmg-placeholder-card span{margin-top:5px;color:#596174;line-height:1.45;}',
    '#'+ROOT_ID+' .gm-diagnosis-page{padding:0 2px 12px;}#'+ROOT_ID+' .gm-diagnosis-toolbar{position:sticky;top:0;z-index:35;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;margin:0 -2px 8px;padding:10px 1px;background:rgba(255,250,252,.97);backdrop-filter:blur(12px);}#'+ROOT_ID+' .gm-diagnosis-toolbar button{height:40px;padding:0 13px;border:1px solid #f1cbd9;border-radius:18px;background:#fff;color:#e11d62;font-size:13px;cursor:pointer;}#'+ROOT_ID+' .gm-diagnosis-toolbar button:nth-child(2){justify-self:center;}#'+ROOT_ID+' .gm-diagnosis-toolbar .gm-diagnosis-close{width:40px;padding:0;border-radius:50%;font-size:26px;font-weight:300;}',
    '#'+ROOT_ID+' .gm-diagnosis-hero{position:relative;min-height:145px;display:flex;align-items:flex-start;padding:14px 40% 10px 8px;}#'+ROOT_ID+' .gm-diagnosis-hero h1{margin:0;color:#0e142a;font-size:clamp(28px,7vw,39px);line-height:1.05;letter-spacing:-1px;}#'+ROOT_ID+' .gm-diagnosis-hero p{margin:7px 0 0;color:#5b5f6d;font-size:16px;font-weight:650;}#'+ROOT_ID+' .gm-diagnosis-hero img{position:absolute;right:0;bottom:0;width:39%;height:145px;object-fit:cover;object-position:center 31%;border-radius:46% 46% 34% 34%;mix-blend-mode:multiply;}',
    '#'+ROOT_ID+' .gm-clinical-card{margin:12px 0;padding:0;border:1px solid #f0d4df;border-radius:20px;background:#fff;box-shadow:0 5px 14px rgba(97,48,70,.045);overflow:hidden;}#'+ROOT_ID+' .gm-clinical-card>header{display:flex;align-items:center;gap:10px;padding:13px 14px;background:linear-gradient(90deg,#fff2f7,#fff8fb);color:#d71e62;font-size:17px;}#'+ROOT_ID+' .gm-clinical-card>header>span{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#ed1763;color:#fff;font-size:21px;}#'+ROOT_ID+' .gm-track-grid{display:grid;grid-template-columns:1fr 42%;gap:10px;align-items:center;padding:14px;}#'+ROOT_ID+' .gm-track-copy article{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px dashed #eadde2;}#'+ROOT_ID+' .gm-track-copy article:last-child{border-bottom:0;}#'+ROOT_ID+' .gm-track-copy b,#'+ROOT_ID+' .gm-track-copy small{display:block;}#'+ROOT_ID+' .gm-track-copy small{margin-top:3px;color:#4d5261;}',
    '#'+ROOT_ID+' .gm-risk-icon{display:grid;place-items:center;flex:0 0 44px;width:44px;height:44px;border-radius:12px;font-size:23px;background:#fff0f5;}#'+ROOT_ID+' .gm-risk-icon.pink{background:#fff0f5;}#'+ROOT_ID+' .gm-risk-icon.orange{background:#fff6e9;}#'+ROOT_ID+' .gm-risk-icon.green{background:#effaf2;}#'+ROOT_ID+' .gm-risk-icon.blue{background:#eef6ff;}#'+ROOT_ID+' .gm-risk-icon.purple{background:#f7efff;}#'+ROOT_ID+' .gm-clipboard-art{position:relative;display:grid;place-items:center;min-height:170px;font-size:84px;}#'+ROOT_ID+' .gm-clipboard-art .clip{filter:saturate(1.2);}#'+ROOT_ID+' .gm-clipboard-art .pen{position:absolute;right:3px;bottom:25px;font-size:46px;}#'+ROOT_ID+' .gm-clipboard-art .plant{position:absolute;right:0;bottom:0;font-size:34px;}',
    '#'+ROOT_ID+' .gm-risk-columns{display:grid;grid-template-columns:1fr 1fr;padding:0 10px 10px;}#'+ROOT_ID+' .gm-risk-columns>div:first-child{border-right:1px solid #eee2e7;}#'+ROOT_ID+' .gm-risk-columns article{display:flex;align-items:center;gap:10px;min-height:68px;padding:8px;border-bottom:1px solid #eee2e7;}#'+ROOT_ID+' .gm-risk-columns article:last-child{border-bottom:0;}#'+ROOT_ID+' .gm-risk-columns p{margin:0;font-size:12.5px;line-height:1.3;}#'+ROOT_ID+' .gm-risk-columns small{display:block;margin-top:2px;color:#4f5668;}',
    '#'+ROOT_ID+' .gm-info-note{display:grid;grid-template-columns:42px 1fr;align-items:center;gap:10px;margin:14px 0;padding:13px 14px;border:1px solid #d5e2f2;border-radius:15px;background:#f7fbff;color:#263246;}#'+ROOT_ID+' .gm-info-note>span{color:#1684df;font-size:31px;}#'+ROOT_ID+' .gm-info-note p{margin:0;line-height:1.42;}',
    '#'+ROOT_ID+' .gm-point-title{display:flex;align-items:center;gap:12px;margin:18px 0 10px;padding:10px 12px;border:1px solid #f0d5df;border-radius:16px;background:#fff6f9;}#'+ROOT_ID+' .gm-point-title>span{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#ef1763;color:#fff;font-size:24px;}#'+ROOT_ID+' .gm-point-title h2{margin:0;color:#d91f64;font-size:22px;}#'+ROOT_ID+' .gm-point-title p{margin:3px 0 0;color:#636876;font-size:13px;}',
    '#'+ROOT_ID+' .gm-diagnostic-flow{display:grid;grid-template-columns:42% 58%;gap:12px;padding:14px;}#'+ROOT_ID+' .gm-flow-start{display:flex;flex-direction:column;justify-content:center;}#'+ROOT_ID+' .gm-flow-box{display:flex;align-items:center;gap:9px;padding:11px;border:1px solid #f0dfe6;border-radius:16px;background:#fff;}#'+ROOT_ID+' .gm-flow-box small{display:block;margin-top:4px;color:#d92867;font-weight:750;}#'+ROOT_ID+' .gm-down-arrow{text-align:center;color:#f04f8b;font-size:34px;line-height:1.1;}#'+ROOT_ID+' .gm-flow-branches{display:grid;gap:8px;}#'+ROOT_ID+' .gm-flow-branches article{display:grid;grid-template-columns:82px 1fr;align-items:center;gap:10px;padding:8px;border-radius:15px;border:1px solid;}#'+ROOT_ID+' .gm-flow-branches article>b{display:grid;place-items:center;min-height:57px;border-radius:12px;background:#fff;text-align:center;font-size:16px;}#'+ROOT_ID+' .gm-flow-branches article p{margin:0;font-size:12.5px;line-height:1.28;}#'+ROOT_ID+' .gm-flow-branches article strong,#'+ROOT_ID+' .gm-flow-branches article span{display:block;}#'+ROOT_ID+' .gm-flow-branches article span{margin-top:3px;color:#4e5664;}#'+ROOT_ID+' .gm-flow-branches .red{border-color:#f2c3d2;background:#fff4f7;color:#c92255;}#'+ROOT_ID+' .gm-flow-branches .amber{border-color:#f1d9ad;background:#fff9ed;color:#c47b15;}#'+ROOT_ID+' .gm-flow-branches .green{border-color:#cfe9d0;background:#f4fbf3;color:#2e9a43;}',
    '#'+ROOT_ID+' .gm-second-trimester{padding:13px;}#'+ROOT_ID+' .gm-second-trimester h3{margin:0 0 10px;text-align:center;color:#db2467;font-size:17px;}#'+ROOT_ID+' .gm-second-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;}#'+ROOT_ID+' .gm-second-grid article{display:flex;align-items:flex-start;gap:8px;padding:10px;border:1px solid #f0dfe6;border-radius:15px;background:#fff;}#'+ROOT_ID+' .gm-second-grid article.important{background:#fff4f8;}#'+ROOT_ID+' .gm-second-grid p{margin:0;font-size:12px;line-height:1.35;}#'+ROOT_ID+' .gm-second-grid small{display:block;margin-top:4px;color:#4f5665;}',
    '#'+ROOT_ID+' .gm-high-risk>header strong{font-size:15px;}#'+ROOT_ID+' .gm-high-risk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;padding:10px;}#'+ROOT_ID+' .gm-high-risk-grid article{min-height:112px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:7px;padding:9px 6px;border:1px solid #f0dfe6;border-radius:14px;background:#fff;text-align:center;}#'+ROOT_ID+' .gm-high-risk-grid article>span{display:grid;place-items:center;min-width:42px;height:42px;padding:0 4px;border-radius:12px;background:#fff1f6;color:#e32668;font-size:21px;font-weight:900;}#'+ROOT_ID+' .gm-high-risk-grid b{font-size:10.5px;line-height:1.28;}#'+ROOT_ID+' .gm-high-risk-grid small{font-size:9.5px;}',
    '#'+ROOT_ID+' .gm-reminder{display:grid;grid-template-columns:40px auto 1fr;align-items:center;gap:9px;margin:14px 0 4px;padding:12px 14px;border:1px solid #f0d7e1;border-radius:15px;background:#fff6f9;}#'+ROOT_ID+' .gm-reminder>span{font-size:27px;}#'+ROOT_ID+' .gm-reminder>strong{color:#db2367;font-size:16px;}#'+ROOT_ID+' .gm-reminder p{margin:0;color:#3f4656;font-size:11.5px;line-height:1.35;}',
    '#'+ROOT_ID+' .gm-dmg-new-nav{position:sticky;bottom:max(0px,env(safe-area-inset-bottom));z-index:20;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));align-items:end;margin:14px -3px 0;padding:7px 3px 6px;border:1px solid rgba(236,133,166,.16);border-radius:21px;background:rgba(255,255,255,.97);box-shadow:0 -7px 22px rgba(102,42,67,.08);}#'+ROOT_ID+' .gm-dmg-new-nav button{min-width:0;padding:2px;border:0;background:transparent;color:#40475a;cursor:pointer;font-size:10px;}#'+ROOT_ID+' .gm-dmg-new-nav span{display:block;margin-bottom:3px;color:#c05b81;font-size:22px;line-height:1;}#'+ROOT_ID+' .gm-dmg-new-nav .active{color:#ef1760;font-weight:760;}',
    '#gm-gestational-diabetes-toast{position:fixed;left:50%;bottom:90px;z-index:2147483647;max-width:min(86vw,360px);padding:11px 15px;border-radius:13px;background:#261920;color:#fff;font-size:12px;text-align:center;opacity:0;transform:translate(-50%,10px);transition:.18s;}#gm-gestational-diabetes-toast.show{opacity:1;transform:translate(-50%,0);}',
    '@media(max-width:440px){#'+ROOT_ID+' .gm-dmg-new-shell{padding-left:10px;padding-right:10px;}#'+ROOT_ID+' .gm-dmg-new-hero{padding-right:44%;min-height:155px;}#'+ROOT_ID+' .gm-dmg-new-hero img{height:158px;width:48%;}#'+ROOT_ID+' .gm-dmg-new-card{grid-template-columns:52px 36px minmax(0,1fr) 22px;gap:7px;padding:9px;}#'+ROOT_ID+' .gm-dmg-new-icon{width:49px;height:49px;font-size:25px;}#'+ROOT_ID+' .gm-dmg-new-copy strong{font-size:15px;}#'+ROOT_ID+' .gm-track-grid{grid-template-columns:1fr 36%;padding:10px;}#'+ROOT_ID+' .gm-clipboard-art{min-height:135px;font-size:64px;}#'+ROOT_ID+' .gm-clipboard-art .pen{font-size:35px;}#'+ROOT_ID+' .gm-clipboard-art .plant{font-size:27px;}#'+ROOT_ID+' .gm-diagnostic-flow{grid-template-columns:1fr;padding:10px;}#'+ROOT_ID+' .gm-flow-branches article{grid-template-columns:72px 1fr;}#'+ROOT_ID+' .gm-high-risk-grid{grid-template-columns:repeat(2,1fr);}#'+ROOT_ID+' .gm-reminder{grid-template-columns:36px 1fr;}#'+ROOT_ID+' .gm-reminder p{grid-column:2;}#'+ROOT_ID+' .gm-risk-columns{grid-template-columns:1fr;}#'+ROOT_ID+' .gm-risk-columns>div:first-child{border-right:0;}#'+ROOT_ID+' .gm-second-grid{grid-template-columns:1fr;}}'
  ].join('');
  document.head.appendChild(style);
}

function buildScreen(){
  var f=flow();if(!f||document.getElementById(ROOT_ID))return false;
  var s=document.createElement('section');s.id=ROOT_ID;s.className='gm-flow-screen';s.setAttribute('data-screen','gestational-diabetes');s.setAttribute('aria-label','Diabetes Gestacional');
  s.innerHTML='<main class="gm-dmg-new-shell"><header class="gm-dmg-new-top"><button class="gm-dmg-new-back" type="button">‹ Voltar</button><div class="gm-dmg-new-brand">GestaMed</div><div class="gm-dmg-new-actions"><button class="gm-dmg-new-action gm-dmg-new-notices" type="button" aria-label="Abrir avisos">🔔</button><button class="gm-dmg-new-action gm-dmg-new-logout" type="button" aria-label="Sair">Sair</button></div></header><section class="gm-dmg-new-menu"><section class="gm-dmg-new-hero"><h1>Diabetes<br>Gestacional</h1><p>Selecione o tópico desejado</p><img src="gestamed-hero.jpg?v=204" alt="Ilustração de gestante"></section><div class="gm-dmg-new-list"><button class="gm-dmg-new-card" type="button" data-topic="diagnosis"><span class="gm-dmg-new-icon">🔬</span><span class="gm-dmg-new-num">1</span><span class="gm-dmg-new-copy"><strong>Diagnóstico do DMG</strong></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c2" type="button" data-topic="criteria"><span class="gm-dmg-new-icon">📋</span><span class="gm-dmg-new-num">2</span><span class="gm-dmg-new-copy"><strong>Critérios diagnósticos</strong><small>IADPSG / OMS / SBD 2025</small></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c3" type="button" data-topic="totg"><span class="gm-dmg-new-icon">🗓️</span><span class="gm-dmg-new-num">3</span><span class="gm-dmg-new-copy"><strong>TOTG 75 g (24–28 semanas)</strong><small>Como interpretar</small></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c4" type="button" data-topic="fasting"><span class="gm-dmg-new-icon">🩸</span><span class="gm-dmg-new-num">4</span><span class="gm-dmg-new-copy"><strong>Glicemia de jejum</strong><small>Quando pode ser usado</small></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c5" type="button" data-topic="early"><span class="gm-dmg-new-icon">⏱️</span><span class="gm-dmg-new-num">5</span><span class="gm-dmg-new-copy"><strong>Diagnóstico precoce</strong><small>Antes de 24 semanas</small></span><span class="gm-dmg-new-chevron">›</span></button><button class="gm-dmg-new-card c6" type="button" data-topic="previous"><span class="gm-dmg-new-icon">♀</span><span class="gm-dmg-new-num">6</span><span class="gm-dmg-new-copy"><strong>DM prévio x DMG</strong><small>Como diferenciar</small></span><span class="gm-dmg-new-chevron">›</span></button></div><button class="gm-dmg-new-flow" type="button" data-topic="flowchart"><span class="gm-dmg-new-flow-icon">⌘</span><span>Ver fluxograma completo</span><span>↗</span></button></section><section class="gm-dmg-new-detail" hidden></section><nav class="gm-dmg-new-nav"><button class="active" type="button" data-home-nav="inicio"><span>⌂</span>Início</button><button type="button" data-home-nav="obstetricia"><span>♧</span>Obstetrícia</button><button type="button" data-home-nav="prenatal"><span>♡</span>Pré-natal</button><button type="button" data-home-nav="protocolos"><span>▤</span>Protocolos</button><button type="button" data-home-nav="perfil"><span>♙</span>Perfil</button></nav></main>';
  f.appendChild(s);
  s.querySelector('.gm-dmg-new-back').addEventListener('click',closeGestationalDiabetesModule);
  s.querySelector('.gm-dmg-new-notices').addEventListener('click',function(){triggerHome('.gm-command-notices');});
  s.querySelector('.gm-dmg-new-logout').addEventListener('click',function(){triggerHome('.gm-command-logout');});
  s.querySelectorAll('[data-topic]').forEach(function(btn){btn.addEventListener('click',function(){openTopic(btn.getAttribute('data-topic'));});});
  s.querySelectorAll('[data-home-nav]').forEach(function(btn){btn.addEventListener('click',function(){var key=btn.getAttribute('data-home-nav');if(key==='inicio'){home();return;}triggerHome('[data-gm-nav="'+key+'"]');});});
  return true;
}

function retitleHomeCard(){
  var button=document.querySelector('#gm-app-flow [data-gm-module="insulina"]');if(!button)return false;
  button.setAttribute('aria-label','Diabetes Gestacional');button.setAttribute('title','Diabetes Gestacional');
  var copy=button.querySelector('.gm-command-module-copy');if(!copy)return false;
  var subtitle=copy.querySelector('.gm-dmg-new-subtitle');
  if(!subtitle){subtitle=document.createElement('small');subtitle.className='gm-dmg-new-subtitle';subtitle.textContent='Diagnóstico, rastreio e critérios';copy.appendChild(subtitle);}
  button.onclick=function(event){if(event){event.preventDefault();event.stopPropagation();}openGestationalDiabetesModule();};
  return true;
}
function init(){ensureStyle();buildScreen();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',function(){if(!document.getElementById(ROOT_ID))buildScreen();},{once:true});
})();