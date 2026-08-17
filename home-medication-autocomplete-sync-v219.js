(function(){
'use strict';
var ROOT='#gm-app-flow';
var LAST_SELECTED='';

function clean(v){return String(v||'').replace(/\s+/g,' ').trim();}
function homeInput(){return document.querySelector(ROOT+' #gm-home-search');}
function homeIsActive(){var s=document.querySelector(ROOT+' [data-screen="home"]');return !!(s&&s.classList.contains('gm-screen-active'));}
function setName(name){
  name=clean(name);
  var input=homeInput();
  if(!input||!name)return false;
  LAST_SELECTED=name;
  input.value=name;
  input.setAttribute('value',name);
  try{input.dispatchEvent(new Event('input',{bubbles:true}));}catch(e){}
  return true;
}

function rowFromTarget(target){
  if(!target||!target.closest)return null;
  return target.closest(
    '#gm-med-body .gm-card[data-id],'+
    '#gm-med-body .gm-card,'+
    '.gm-med-list .gm-card[data-id],'+
    '.gm-card[data-id],'+
    '[data-medication-name]'
  );
}

function extractName(row){
  if(!row)return '';
  var direct=clean(row.getAttribute&&row.getAttribute('data-medication-name'));
  if(direct)return direct;
  var selectors=['.gm-drug','.gm-med-name','.med-name','[data-drug-name]','h3','h4','strong'];
  for(var i=0;i<selectors.length;i++){
    var el=row.querySelector&&row.querySelector(selectors[i]);
    if(!el)continue;
    var txt=clean(el.getAttribute&&el.getAttribute('data-drug-name')||el.textContent);
    if(txt && !/^(pode ser utilizado|situa[cç][aã]o espec[ií]fica|pendente de revis[aã]o|evitar|contraindicado)$/i.test(txt)) return txt;
  }
  return '';
}

function captureSelection(e){
  if(!homeIsActive())return;
  var row=rowFromTarget(e.target);
  if(!row)return;
  var name=extractName(row);
  if(!name)return;
  setName(name);
  /* Não bloquear o evento original: o autocomplete antigo continua fechando/selecionando normalmente. */
  window.setTimeout(function(){
    var input=homeInput();
    if(input && LAST_SELECTED && clean(input.value)!==LAST_SELECTED){
      input.value=LAST_SELECTED;
      input.setAttribute('value',LAST_SELECTED);
    }
  },0);
  window.setTimeout(function(){
    var input=homeInput();
    if(input && LAST_SELECTED){
      input.value=LAST_SELECTED;
      input.setAttribute('value',LAST_SELECTED);
    }
  },120);
}

function syncLegacyField(e){
  if(!homeIsActive())return;
  var t=e.target;
  if(!t||t.id==='gm-home-search'||t.tagName!=='INPUT')return;
  if(t.type!=='search'&&t.id!=='gm-med-search'&&t.id!=='searchInput')return;
  var v=clean(t.value);
  if(v)setName(v);
}

function install(){
 if(document.documentElement.getAttribute('data-gm-autocomplete-sync-v220')==='1')return;
 document.documentElement.setAttribute('data-gm-autocomplete-sync-v220','1');
 ['pointerdown','touchstart','click'].forEach(function(type){
   document.addEventListener(type,captureSelection,true);
 });
 ['input','change','search'].forEach(function(type){
   document.addEventListener(type,syncLegacyField,true);
 });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();