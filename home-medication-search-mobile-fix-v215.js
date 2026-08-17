(function(){
'use strict';
var ROOT='#gm-app-flow';
var INPUT='#gm-home-search';
var PANEL_ID='gm-command-med-search-results';
var INDEX=null;
var SELECTED='';

function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();}
function first(obj,keys){for(var i=0;i<keys.length;i++){var v=obj&&obj[keys[i]];if(v!==undefined&&v!==null&&String(v).trim())return String(v).trim();}return '';}
function extractName(item){return first(item,['nome','name','medicamento','principioAtivo','principio_ativo','drug','principio','principio_ativo_nome']);}
function candidateArrays(){var out=[];try{if(typeof RAW_DATA!=='undefined'&&Array.isArray(RAW_DATA))out.push(RAW_DATA);}catch(e){}try{if(typeof GESTMED_DATA!=='undefined'&&Array.isArray(GESTMED_DATA))out.push(GESTMED_DATA);}catch(e){}if(window.GESTMED_DATA&&Array.isArray(window.GESTMED_DATA))out.push(window.GESTMED_DATA);if(window.RAW_DATA&&Array.isArray(window.RAW_DATA))out.push(window.RAW_DATA);if(!out.length){Object.keys(window).forEach(function(k){var v;try{v=window[k];}catch(e){return;}if(Array.isArray(v)&&v.length>50&&v.length<6000&&v[0]&&typeof v[0]==='object')out.push(v);});}return out;}
function buildIndex(){if(INDEX)return INDEX;var seen={};var list=[];candidateArrays().forEach(function(arr){arr.forEach(function(item){if(!item||typeof item!=='object')return;var name=extractName(item);var n=norm(name);if(!n||seen[n])return;seen[n]=1;list.push({name:name,norm:n});});});INDEX=list;return INDEX;}
function findResults(q){var n=norm(q);if(n.length<2)return [];return buildIndex().filter(function(x){return x.norm.indexOf(n)!==-1;}).sort(function(a,b){var as=a.norm.indexOf(n)===0?0:1,bs=b.norm.indexOf(n)===0?0:1;if(as!==bs)return as-bs;return a.name.localeCompare(b.name,'pt-BR');}).slice(0,8);}
function panel(){var p=document.getElementById(PANEL_ID);if(p)return p;var form=document.querySelector(ROOT+' .gm-command-search');if(!form)return null;p=document.createElement('div');p.id=PANEL_ID;p.setAttribute('role','listbox');p.setAttribute('aria-label','Resultados da pesquisa de medicamentos');form.insertAdjacentElement('afterend',p);return p;}
function close(){var p=document.getElementById(PANEL_ID);if(p){p.classList.remove('open');p.innerHTML='';}}

function openMedication(name){
  name=String(name||'').trim();
  if(!name)return;
  SELECTED=name;
  close();
  var input=document.querySelector(ROOT+' '+INPUT);
  if(input){input.value=name;try{input.blur();}catch(e){}}

  try{
    if(typeof window.GestaMedOpenMedication==='function'){
      window.GestaMedOpenMedication(name);
      return;
    }
  }catch(e){}

  var legacy=document.querySelector('#gm-med-search,#searchInput,input[type="search"]:not(#gm-home-search)');
  if(legacy){
    legacy.value=name;
    ['input','change','keyup'].forEach(function(type){try{legacy.dispatchEvent(new Event(type,{bubbles:true}));}catch(e){}});
    var attempts=0;
    (function clickExact(){
      attempts+=1;
      var cards=Array.prototype.slice.call(document.querySelectorAll('#gm-med-body .gm-card[data-id],.gm-card[data-id]'));
      var target=cards.find(function(card){var t=card.querySelector('.gm-drug,strong,h3,h4');return norm(t?t.textContent:'')===norm(name);});
      if(target){try{target.click();}catch(e){}return;}
      if(attempts<30)setTimeout(clickExact,60);
    })();
  }
}

function selectedOrBest(input){
  var typed=String(input&&input.value||'').trim();
  if(SELECTED&&norm(SELECTED)===norm(typed))return SELECTED;
  var rows=findResults(typed);
  var exact=rows.find(function(r){return norm(r.name)===norm(typed);});
  if(exact)return exact.name;
  if(rows.length)return rows[0].name;
  return '';
}

function render(value){var p=panel();if(!p)return;var rows=findResults(value);p.innerHTML='';if(!rows.length){close();return;}rows.forEach(function(r){var b=document.createElement('button');b.type='button';b.className='gm-command-med-result';b.setAttribute('data-medication-name',r.name);b.setAttribute('role','option');b.innerHTML='<span class="gm-command-med-result-icon">💊</span><span class="gm-command-med-result-name">'+r.name.replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];})+'</span><span class="gm-command-med-result-arrow">›</span>';
  b.addEventListener('pointerdown',function(e){e.preventDefault();});
  b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();SELECTED=r.name;var input=document.querySelector(ROOT+' '+INPUT);if(input){input.value=r.name;input.focus();}close();},true);
  p.appendChild(b);
});p.classList.add('open');}

function style(){if(document.getElementById('gm-command-med-search-v217-style'))return;['gm-command-med-search-v215-style','gm-command-med-search-v216-style'].forEach(function(id){var old=document.getElementById(id);if(old)old.remove();});var s=document.createElement('style');s.id='gm-command-med-search-v217-style';s.textContent=[
'#gm-app-flow .gm-command-search{overflow:visible!important;z-index:80!important;grid-template-columns:minmax(0,1fr) 62px!important;}',
'#gm-app-flow .gm-command-search>button[type="submit"]{grid-column:2!important;grid-row:1!important;display:grid!important;place-items:center!important;width:100%!important;height:100%!important;border-left:1px solid rgba(234,93,137,.12)!important;background:linear-gradient(180deg,#fff7fa,#ffeaf1)!important;color:#e51f63!important;font-size:0!important;}',
'#gm-app-flow .gm-command-search>button[type="submit"]:after{content:"🔍";font-size:23px!important;line-height:1!important;}',
'#gm-app-flow .gm-command-search>input{grid-column:1!important;grid-row:1!important;padding:0 16px!important;}',
'#gm-app-flow .gm-command-filter-button{display:none!important;}',
'#gm-app-flow #gm-command-med-search-results{display:none;position:relative;z-index:79;margin:-5px 0 12px;padding:6px;border:1px solid rgba(229,83,128,.20);border-radius:18px;background:rgba(255,255,255,.98);box-shadow:0 14px 30px rgba(79,35,53,.16);max-height:min(42vh,320px);overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;}',
'#gm-app-flow #gm-command-med-search-results.open{display:block;}',
'#gm-app-flow .gm-command-med-result{box-sizing:border-box;display:grid;grid-template-columns:36px minmax(0,1fr) 24px;align-items:center;gap:9px;width:100%;min-height:50px;padding:7px 9px;border:0;border-bottom:1px solid #f4e2e9;border-radius:11px;background:#fff;color:#202a40;text-align:left;box-shadow:none;cursor:pointer;}',
'#gm-app-flow .gm-command-med-result:last-child{border-bottom:0;}#gm-app-flow .gm-command-med-result:active{background:#fff1f6;}#gm-app-flow .gm-command-med-result-icon{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:#ffe6ef;font-size:18px;}#gm-app-flow .gm-command-med-result-name{font-size:14px;font-weight:750;line-height:1.25;overflow-wrap:anywhere;}#gm-app-flow .gm-command-med-result-arrow{color:#e52e68;font-size:24px;text-align:center;}',
'@media(max-width:600px){#gm-app-flow #gm-command-med-search-results{max-height:min(34vh,260px);margin-bottom:9px;}#gm-app-flow .gm-command-med-result{min-height:48px;}}'
].join('');document.head.appendChild(s);}

function install(){var input=document.querySelector(ROOT+' '+INPUT);var form=document.querySelector(ROOT+' .gm-command-search');if(!input||!form)return false;
  if(input.getAttribute('data-gm-med-search-v217')==='1')return true;
  style();
  input.removeAttribute('data-gm-med-search-v215');input.removeAttribute('data-gm-med-search-v216');
  input.setAttribute('data-gm-med-search-v217','1');
  input.setAttribute('autocomplete','off');input.setAttribute('autocapitalize','none');input.setAttribute('enterkeyhint','search');
  var submit=form.querySelector('button[type="submit"]');
  if(submit){submit.setAttribute('aria-label','Pesquisar e abrir medicamento');submit.setAttribute('title','Pesquisar e abrir medicamento');}
  input.addEventListener('input',function(){SELECTED='';render(input.value);});
  input.addEventListener('focus',function(){if(String(input.value||'').trim().length>=2&&!SELECTED)render(input.value);});
  input.addEventListener('keydown',function(e){
    if(e.key==='Escape'){close();input.blur();return;}
    if(e.key==='Enter'){
      e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
      var name=selectedOrBest(input);if(name)openMedication(name);
    }
  },true);
  form.addEventListener('submit',function(e){
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    var name=selectedOrBest(input);if(name)openMedication(name);
  },true);
  document.addEventListener('pointerdown',function(e){if(!e.target.closest(ROOT+' .gm-command-search')&&!e.target.closest(ROOT+' #'+PANEL_ID))close();},true);
  return true;
}

var tries=0;(function boot(){tries++;if(install())return;if(tries<120)setTimeout(boot,100);})();
})();