(function(){
'use strict';
var PATCH_ID='gestamed-home-layout-2026-07-27-178';
document.documentElement.setAttribute('data-gm-home-layout',PATCH_ID);
var IMAGE='3FF61B8D-8296-4F2B-AF20-F20C6BE58930.png?v=178';
var CID_URL='https://laboratoriocid.com.br/logins/login';

function pct(el,top,height,left,width){
 if(!el)return;
 if(top!==null)el.style.setProperty('top',top+'%','important');
 if(height!==null)el.style.setProperty('height',height+'%','important');
 if(left!==null)el.style.setProperty('left',left+'%','important');
 if(width!==null)el.style.setProperty('width',width+'%','important');
}
function byLabel(label){return document.querySelector('.gm-home-hotspot[aria-label="'+label+'"]');}
function ensureFixStyle(){
 var old=document.getElementById('gm-home-layout-v178-style');
 if(old)old.remove();
 var style=document.createElement('style');
 style.id='gm-home-layout-v178-style';
 style.textContent=[
  '#gm-home-filter-carousel{z-index:40!important;box-sizing:border-box!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow-x:auto!important;overflow-y:hidden!important;} ',
  '#gm-home-filter-carousel .gm-home-filter-chip{height:72%!important;min-height:34px!important;margin:0!important;} ',
  '#gm-home-filter-carousel::before,#gm-home-filter-carousel::after{display:none!important;} ',
  '#gm-home-screen .gm-filter-strip{visibility:hidden!important;pointer-events:none!important;}'
 ].join('');
 document.head.appendChild(style);
}
function syncCanvasRatio(canvas,image){
 function setRatio(){
  if(image.naturalWidth&&image.naturalHeight){
   canvas.style.setProperty('aspect-ratio',image.naturalWidth+'/'+image.naturalHeight,'important');
  }
 }
 if(image.complete)setRatio();
 image.addEventListener('load',setRatio,{once:true});
}
function apply(){
 var canvas=document.getElementById('gm-home-canvas');
 var image=document.getElementById('gm-home-image');
 if(!canvas||!image)return false;
 ensureFixStyle();
 image.src=IMAGE;
 image.style.setProperty('object-fit','fill','important');
 syncCanvasRatio(canvas,image);
 var search=document.getElementById('gm-home-search');
 pct(search,24.8,4.0,8.8,79.5);
 var carousel=document.getElementById('gm-home-filter-carousel');
 if(carousel){
  pct(carousel,29.7,4.1,0,100);
  carousel.style.setProperty('padding','0 3.3%','important');
  carousel.style.setProperty('gap','10px','important');
 }
 var map={
  'Agenda':[39.0,7.5,3.2,17.7],
  'Checklists':[39.0,7.5,22.2,17.7],
  'Calculadoras':[39.0,7.5,41.2,17.7],
  'Favoritos':[39.0,7.5,60.2,17.7],
  'Lembretes':[39.0,7.5,79.2,17.0],
  'Idade gestacional':[47.6,6.4,3.0,45.0],
  'Cálculo de insulina':[47.6,6.4,50.2,46.5],
  'Painel de Exames':[54.9,6.4,3.0,45.0],
  'Ganho de peso gestacional':[54.9,6.4,50.2,46.5],
  'Prescrições por Trimestre':[62.2,6.8,3.0,45.0],
  'Condutas Obstétricas':[62.2,6.8,50.2,46.5],
  'Consulta de Exames — CID':[70.8,6.8,3.0,93.5],
  'Início':[95.0,4.6,0,20],
  'Obstetrícia':[95.0,4.6,20,20],
  'Pré-natal':[94.7,5.0,40,20],
  'Protocolos':[95.0,4.6,60,20],
  'Perfil':[95.0,4.6,80,20]
 };
 Object.keys(map).forEach(function(label){var v=map[label];pct(byLabel(label),v[0],v[1],v[2],v[3]);});
 var cid=byLabel('Consulta de Exames — CID');
 if(cid&&!cid.getAttribute('data-v178-cid')){
  cid.setAttribute('data-v178-cid','1');
  cid.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();var w=window.open(CID_URL,'_blank','noopener,noreferrer');if(!w)window.location.href=CID_URL;},true);
 }
 return true;
}
var tries=0;function start(){tries++;if(apply())return;if(tries<120)setTimeout(start,150);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('load',function(){setTimeout(apply,250);});
})();