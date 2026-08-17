(function(){
'use strict';
var ROOT='#gm-app-flow';
function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();}
function homeInput(){return document.querySelector(ROOT+' #gm-home-search');}
function homeIsActive(){var s=document.querySelector(ROOT+' [data-screen="home"]');return !!(s&&s.classList.contains('gm-screen-active'));}
function setName(name){name=String(name||'').replace(/\s+/g,' ').trim();var input=homeInput();if(!input||!name)return false;input.value=name;input.setAttribute('value',name);return true;}
function extract(target){if(!target||!target.closest)return '';var row=target.closest('#gm-med-body .gm-card[data-id],.gm-card[data-id],[data-medication-name]');if(!row)return '';var direct=row.getAttribute('data-medication-name');if(direct)return String(direct).trim();var title=row.querySelector('.gm-drug,strong,h3,h4');return title?String(title.textContent||'').replace(/\s+/g,' ').trim():'';}
function install(){
 if(document.documentElement.getAttribute('data-gm-autocomplete-sync-v219')==='1')return;
 document.documentElement.setAttribute('data-gm-autocomplete-sync-v219','1');
 document.addEventListener('click',function(e){
   if(!homeIsActive())return;
   var input=homeInput();
   if(!input||!String(input.value||'').trim())return;
   if(e.target.closest&&e.target.closest(ROOT+' .gm-command-search'))return;
   var name=extract(e.target);
   if(!name)return;
   setName(name);
   e.preventDefault();
   e.stopPropagation();
   if(e.stopImmediatePropagation)e.stopImmediatePropagation();
   try{input.focus({preventScroll:true});}catch(err){try{input.focus();}catch(_e){}}
 },true);
 ['input','change','search'].forEach(function(type){
   document.addEventListener(type,function(e){
     if(!homeIsActive())return;
     var t=e.target;
     if(!t||t.id==='gm-home-search'||t.tagName!=='INPUT')return;
     if(t.type!=='search'&&t.id!=='gm-med-search'&&t.id!=='searchInput')return;
     var v=String(t.value||'').replace(/\s+/g,' ').trim();
     if(v)setName(v);
   },true);
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();