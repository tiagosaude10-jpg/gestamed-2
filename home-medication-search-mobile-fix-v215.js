(function(){
'use strict';
var ROOT='#gm-app-flow';
var INPUT='#gm-home-search';

function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();}

function removeDuplicateSearch(){
  var duplicate=document.getElementById('gm-command-med-search-results');
  if(duplicate)duplicate.remove();
  var oldStyle=document.getElementById('gm-command-med-search-v216-style');
  if(oldStyle)oldStyle.remove();
  var older=document.getElementById('gm-command-med-search-v215-style');
  if(older)older.remove();
}

function openMedication(name){
  name=String(name||'').trim();
  if(!name)return;
  var input=document.querySelector(ROOT+' '+INPUT);
  if(input){input.value=name;try{input.blur();}catch(e){}}

  try{
    if(typeof window.GestaMedOpenMedication==='function'){
      window.GestaMedOpenMedication(name);
      return;
    }
  }catch(e){}

  var legacy=document.querySelector('#gm-med-search,#searchInput,input[type="search"]:not(#gm-home-search)');
  if(!legacy)return;
  legacy.value=name;
  ['input','change','keyup','search'].forEach(function(type){try{legacy.dispatchEvent(new Event(type,{bubbles:true}));}catch(e){}});

  var attempts=0;
  (function clickExact(){
    attempts+=1;
    var cards=Array.prototype.slice.call(document.querySelectorAll('#gm-med-body .gm-card[data-id],.gm-card[data-id]'));
    var target=cards.find(function(card){var t=card.querySelector('.gm-drug,strong,h3,h4');return norm(t?t.textContent:'')===norm(name);});
    if(target){try{target.click();}catch(e){}return;}
    if(attempts<40)setTimeout(clickExact,60);
  })();
}

function currentChosenName(){
  var input=document.querySelector(ROOT+' '+INPUT);
  return input?String(input.value||'').trim():'';
}

function doSearch(){
  var name=currentChosenName();
  if(name)openMedication(name);
}

function ensureStyle(){
  var old=document.getElementById('gm-command-search-single-v218-style');
  if(old)old.remove();
  var s=document.createElement('style');
  s.id='gm-command-search-single-v218-style';
  s.textContent=[
    '#gm-app-flow .gm-command-search{grid-template-columns:minmax(0,1fr) 64px!important;overflow:visible!important;}',
    '#gm-app-flow .gm-command-search>button[type="submit"]:first-child{display:none!important;}',
    '#gm-app-flow .gm-command-search input{padding-left:18px!important;padding-right:8px!important;}',
    '#gm-app-flow .gm-command-filter-button{display:flex!important;align-items:center!important;justify-content:center!important;width:64px!important;height:100%!important;border-left:1px solid rgba(234,93,137,.16)!important;background:#fff8fb!important;color:#d91f5c!important;font-size:0!important;}',
    '#gm-app-flow .gm-command-filter-button:after{content:"🔍";font-size:25px;line-height:1;}',
    '#gm-app-flow .gm-command-filter-button:active{background:#ffeaf1!important;transform:scale(.98);}',
    '#gm-app-flow #gm-command-med-search-results{display:none!important;}'
  ].join('');
  document.head.appendChild(s);
}

function install(){
  var input=document.querySelector(ROOT+' '+INPUT);
  var form=document.querySelector(ROOT+' .gm-command-search');
  var button=document.querySelector(ROOT+' .gm-command-filter-button');
  if(!input||!form||!button)return false;

  removeDuplicateSearch();
  ensureStyle();
  input.setAttribute('autocomplete','off');
  input.setAttribute('autocapitalize','none');
  input.setAttribute('enterkeyhint','search');

  if(button.getAttribute('data-gm-search-go-v218')!=='1'){
    button.setAttribute('data-gm-search-go-v218','1');
    button.setAttribute('aria-label','Pesquisar e abrir medicamento');
    button.setAttribute('title','Pesquisar medicamento');
    button.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
      doSearch();
    },true);
  }

  if(form.getAttribute('data-gm-search-submit-v218')!=='1'){
    form.setAttribute('data-gm-search-submit-v218','1');
    form.addEventListener('submit',function(e){
      e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
      doSearch();
    },true);
  }

  if(input.getAttribute('data-gm-search-key-v218')!=='1'){
    input.setAttribute('data-gm-search-key-v218','1');
    input.addEventListener('keydown',function(e){
      if(e.key==='Enter'){
        e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
        doSearch();
      }
    },true);
  }

  return true;
}

var tries=0;
(function boot(){
  tries+=1;
  if(install())return;
  if(tries<120)setTimeout(boot,100);
})();
})();