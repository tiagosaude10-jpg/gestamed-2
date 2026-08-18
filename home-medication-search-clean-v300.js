(function(){
'use strict';
var ROOT='#gm-app-flow';
var FORM_ID='gm-med-search-clean-v300';
var INPUT_ID='gm-med-search-clean-input-v300';
var LIST_ID='gm-med-search-clean-list-v300';
var CLEAR_ID='gm-med-search-clean-clear-v300';
var STYLE_ID='gm-med-search-clean-style-v300';
var records=[];

function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();}
function first(obj,keys){for(var i=0;i<keys.length;i++){var v=obj&&obj[keys[i]];if(v!==undefined&&v!==null&&String(v).trim())return String(v).trim();}return '';}
function tone(status){var s=norm(status);if(s.indexOf('prefer')>=0)return 'preferred';if(s.indexOf('especific')>=0||s.indexOf('cautela')>=0)return 'caution';if(s.indexOf('contra')>=0||s.indexOf('evitar')>=0)return 'avoid';if(s.indexOf('pendente')>=0)return 'pending';return 'allowed';}

function buildIndex(){
  var map={};
  function add(name,classe,status){
    name=String(name||'').replace(/\s+/g,' ').trim();
    if(!name||name.length<2||name.length>120)return;
    var key=norm(name);if(!key||map[key])return;
    map[key]={name:name,classe:String(classe||'Medicamento').trim()||'Medicamento',status:String(status||'').trim()};
  }
  document.querySelectorAll('#gm-med-body .gm-card[data-id],#gm-med-body [data-id].gm-card').forEach(function(card){
    var title=card.querySelector('.gm-drug,strong,h3,h4');
    var classe=card.querySelector('.gm-class,.gm-sub,.gm-category,.gm-meta');
    add(title&&title.textContent,classe&&classe.textContent,'');
  });
  Object.keys(window).forEach(function(k){
    var arr;try{arr=window[k];}catch(e){return;}
    if(!Array.isArray(arr)||!arr.length||arr.length>7000)return;
    for(var i=0;i<arr.length;i++){
      var o=arr[i];if(!o||typeof o!=='object'||Array.isArray(o))continue;
      var name=first(o,['nome','name','medicamento','principioAtivo','principio_ativo','drug']);
      if(!name)continue;
      var classe=first(o,['classe','class','categoria','grupo','tipo','subtitulo']);
      var status=first(o,['decisao','decisão','status','recomendacao','recomendação','classificacao','classificação','resumoDecisao','resumo_decisao']);
      var clinical=classe||status||first(o,['indicacao','indicação','dose','posologia','orientacao','orientação','descricao','descrição']);
      if(clinical)add(name,classe,status);
    }
  });
  records=Object.keys(map).map(function(k){return map[k];}).sort(function(a,b){return a.name.localeCompare(b.name,'pt-BR');});
  return records;
}

function ensureStyle(){
  var old=document.getElementById(STYLE_ID);if(old)old.remove();
  var s=document.createElement('style');s.id=STYLE_ID;s.textContent=[
    '#'+FORM_ID+'{box-sizing:border-box!important;position:relative!important;z-index:60!important;display:grid!important;grid-template-columns:minmax(0,1fr) 42px 64px!important;align-items:center!important;width:100%!important;height:54px!important;min-height:54px!important;max-height:54px!important;margin:0 0 12px!important;padding:0!important;overflow:visible!important;border:1px solid rgba(234,93,137,.18)!important;border-radius:22px!important;background:rgba(255,255,255,.94)!important;box-shadow:0 7px 20px rgba(191,42,91,.09)!important;}',
    '#'+FORM_ID+' input{box-sizing:border-box!important;display:block!important;min-width:0!important;width:100%!important;height:52px!important;min-height:52px!important;max-height:52px!important;margin:0!important;padding:0 12px 0 16px!important;border:0!important;outline:0!important;background:transparent!important;color:#342636!important;font:500 17px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;-webkit-appearance:none!important;appearance:none!important;}',
    '#'+FORM_ID+' input::placeholder{color:#aaa1a6!important;}',
    '#'+CLEAR_ID+'{box-sizing:border-box!important;display:none!important;align-items:center!important;justify-content:center!important;width:42px!important;height:52px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:#b66a83!important;font-size:23px!important;line-height:1!important;cursor:pointer!important;}',
    '#'+CLEAR_ID+'.show{display:flex!important;}',
    '#'+FORM_ID+' .gm-clean-search-submit{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:64px!important;height:52px!important;min-height:52px!important;max-height:52px!important;margin:0!important;padding:0!important;border:0!important;border-left:1px solid #f0d7e1!important;border-radius:0 22px 22px 0!important;background:#fff8fb!important;color:#d92762!important;font-size:26px!important;line-height:1!important;cursor:pointer!important;}',
    '#'+LIST_ID+'{display:none!important;position:absolute!important;top:62px!important;left:0!important;right:0!important;z-index:2147483000!important;max-height:300px!important;margin:0!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;background:#fff!important;border:1px solid #efcad8!important;border-radius:18px!important;box-shadow:0 14px 36px rgba(78,31,53,.22)!important;}',
    '#'+LIST_ID+'.open{display:block!important;}',
    '#'+LIST_ID+' .gm-clean-item{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:8px 12px!important;width:100%!important;min-height:72px!important;padding:13px 15px!important;border:0!important;border-bottom:1px solid #f0dde4!important;border-radius:0!important;background:#fff!important;text-align:left!important;color:#2a2028!important;box-sizing:border-box!important;cursor:pointer!important;}',
    '#'+LIST_ID+' .gm-clean-item:last-child{border-bottom:0!important;}',
    '#'+LIST_ID+' .gm-clean-name{font-size:17px!important;font-weight:800!important;line-height:1.18!important;}',
    '#'+LIST_ID+' .gm-clean-class{grid-column:1!important;color:#856a77!important;font-size:13px!important;line-height:1.25!important;}',
    '#'+LIST_ID+' .gm-clean-status{grid-column:2!important;grid-row:1/3!important;align-self:center!important;max-width:145px!important;padding:6px 9px!important;border-radius:999px!important;text-align:center!important;font-size:10.5px!important;font-weight:850!important;line-height:1.1!important;}',
    '#'+LIST_ID+' .preferred,#'+LIST_ID+' .allowed{background:#dff8e9!important;color:#176a40!important;}#'+LIST_ID+' .caution{background:#fff0c9!important;color:#9b5710!important;}#'+LIST_ID+' .pending{background:#e7ecf4!important;color:#54647c!important;}#'+LIST_ID+' .avoid{background:#ffe1e6!important;color:#9a2038!important;}',
    '#'+LIST_ID+' .empty{padding:16px!important;color:#7c6570!important;text-align:center!important;font-size:13px!important;}',
    '@media(max-width:760px){#'+FORM_ID+'{height:54px!important;min-height:54px!important;max-height:54px!important;}#'+FORM_ID+' input,#'+FORM_ID+' .gm-clean-search-submit,#'+CLEAR_ID+'{height:52px!important;min-height:52px!important;max-height:52px!important;}#'+LIST_ID+'{max-height:230px!important;}#'+LIST_ID+' .gm-clean-name{font-size:16px!important;}}'
  ].join('');document.head.appendChild(s);
}

function updateClear(){
  var input=document.getElementById(INPUT_ID),clear=document.getElementById(CLEAR_ID);
  if(!input||!clear)return;
  clear.classList.toggle('show',String(input.value||'').length>0);
}

function render(q){
  var list=document.getElementById(LIST_ID);if(!list)return;
  var query=norm(q);
  updateClear();
  if(query.length<2){list.classList.remove('open');list.innerHTML='';return;}
  if(!records.length)buildIndex();
  var found=records.filter(function(r){return norm(r.name).indexOf(query)>=0;}).sort(function(a,b){
    var an=norm(a.name),bn=norm(b.name),ap=an.indexOf(query),bp=bn.indexOf(query);
    if(ap!==bp)return ap-bp;return a.name.localeCompare(b.name,'pt-BR');
  }).slice(0,8);
  if(!found.length){list.innerHTML='<div class="empty">Nenhum medicamento encontrado.</div>';list.classList.add('open');return;}
  list.innerHTML='';found.forEach(function(r){
    var b=document.createElement('button');b.type='button';b.className='gm-clean-item';b.setAttribute('data-name',r.name);
    var status=r.status||'';
    b.innerHTML='<span class="gm-clean-name"></span><span class="gm-clean-class"></span>'+(status?'<span class="gm-clean-status '+tone(status)+'"></span>':'');
    b.querySelector('.gm-clean-name').textContent=r.name;
    b.querySelector('.gm-clean-class').textContent=r.classe||'Medicamento';
    var ss=b.querySelector('.gm-clean-status');if(ss)ss.textContent=status;
    b.addEventListener('click',function(){var input=document.getElementById(INPUT_ID);if(input)input.value=r.name;updateClear();list.classList.remove('open');try{input&&input.focus();}catch(e){}});
    list.appendChild(b);
  });
  list.classList.add('open');
}

function openSelected(){
  var input=document.getElementById(INPUT_ID);if(!input)return;
  var name=String(input.value||'').replace(/\s+/g,' ').trim();if(!name)return;
  var exact=records.find(function(r){return norm(r.name)===norm(name);});
  if(!exact){var matches=records.filter(function(r){return norm(r.name).indexOf(norm(name))>=0;});if(matches.length===1){exact=matches[0];input.value=exact.name;updateClear();}}
  var chosen=exact?exact.name:name;
  var list=document.getElementById(LIST_ID);if(list)list.classList.remove('open');
  try{input.blur();}catch(e){}
  if(typeof window.GestaMedOpenMedicationDirect==='function'){window.GestaMedOpenMedicationDirect(chosen);return;}
  if(typeof window.GestaMedOpenMedication==='function'){window.GestaMedOpenMedication(chosen);return;}
  var tries=0;(function wait(){tries++;if(typeof window.GestaMedOpenMedicationDirect==='function'){window.GestaMedOpenMedicationDirect(chosen);return;}if(typeof window.GestaMedOpenMedication==='function'){window.GestaMedOpenMedication(chosen);return;}if(tries<80)setTimeout(wait,50);})();
}

function install(){
  var old=document.querySelector(ROOT+' .gm-command-search');if(!old)return false;
  if(document.getElementById(FORM_ID))return true;
  ensureStyle();
  var fresh=document.createElement('form');fresh.id=FORM_ID;fresh.setAttribute('role','search');fresh.setAttribute('autocomplete','off');
  fresh.innerHTML='<input id="'+INPUT_ID+'" type="search" placeholder="Pesquisar medicamento" autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="search"><button id="'+CLEAR_ID+'" type="button" aria-label="Limpar pesquisa" title="Limpar pesquisa">×</button><button class="gm-clean-search-submit" type="submit" aria-label="Pesquisar medicamento" title="Pesquisar medicamento">🔍</button><div id="'+LIST_ID+'" role="listbox" aria-label="Sugestões de medicamentos"></div>';
  old.replaceWith(fresh);
  var input=document.getElementById(INPUT_ID);
  var clear=document.getElementById(CLEAR_ID);
  input.addEventListener('input',function(){render(input.value);});
  input.addEventListener('focus',function(){render(input.value);});
  clear.addEventListener('click',function(){
    input.value='';
    var list=document.getElementById(LIST_ID);if(list){list.classList.remove('open');list.innerHTML='';}
    updateClear();
    try{input.focus();}catch(e){}
  });
  fresh.addEventListener('submit',function(e){e.preventDefault();openSelected();});
  document.addEventListener('pointerdown',function(e){if(!fresh.contains(e.target)){var list=document.getElementById(LIST_ID);if(list)list.classList.remove('open');}},false);
  updateClear();
  setTimeout(buildIndex,250);
  return true;
}

var tries=0;(function boot(){tries++;if(install())return;if(tries<160)setTimeout(boot,75);})();
})();