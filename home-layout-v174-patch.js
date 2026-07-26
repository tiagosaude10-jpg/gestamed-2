(function(){
'use strict';
var PATCH_ID='gestamed-home-layout-2026-07-26-174';
document.documentElement.setAttribute('data-gm-home-layout',PATCH_ID);
var IMAGE='82C97BF6-BD23-42D5-96F0-3A8D3158D51A.png?v=174';
var CID_URL='https://laboratoriocid.com.br/logins/login';

function pct(el,top,height,left,width){
 if(!el)return;
 if(top!==null)el.style.setProperty('top',top+'%','important');
 if(height!==null)el.style.setProperty('height',height+'%','important');
 if(left!==null)el.style.setProperty('left',left+'%','important');
 if(width!==null)el.style.setProperty('width',width+'%','important');
}
function byLabel(label){return document.querySelector('.gm-home-hotspot[aria-label="'+label+'"]');}
function apply(){
 var canvas=document.getElementById('gm-home-canvas');
 var image=document.getElementById('gm-home-image');
 if(!canvas||!image)return false;
 image.src=IMAGE;
 canvas.style.setProperty('aspect-ratio','832/1792','important');
 image.style.setProperty('object-fit','fill','important');
 var search=document.getElementById('gm-home-search');
 pct(search,25.0,3.9,8.8,79.5);
 var carousel=document.getElementById('gm-home-filter-carousel');
 if(carousel){
  pct(carousel,30.65,4.75,0,100);
  carousel.style.setProperty('background','transparent','important');
  carousel.style.setProperty('padding','0 3.3%','important');
 }
 var map={
  'Agenda':[38.25,7.8,3.2,17.7],
  'Checklists':[38.25,7.8,22.2,17.7],
  'Calculadoras':[38.25,7.8,41.2,17.7],
  'Favoritos':[38.25,7.8,60.2,17.7],
  'Lembretes':[38.25,7.8,79.2,17.0],
  'Idade gestacional':[47.55,6.5,3.0,45.0],
  'Cálculo de insulina':[47.55,6.5,50.2,46.5],
  'Painel de Exames':[55.1,6.5,3.0,45.0],
  'Ganho de peso gestacional':[55.1,6.5,50.2,46.5],
  'Prescrições por Trimestre':[62.65,7.0,3.0,45.0],
  'Condutas Obstétricas':[62.65,7.0,50.2,46.5],
  'Consulta de Exames — CID':[71.85,6.9,3.0,93.5],
  'Início':[94.6,5.0,0,20],
  'Obstetrícia':[94.6,5.0,20,20],
  'Pré-natal':[94.3,5.4,40,20],
  'Protocolos':[94.6,5.0,60,20],
  'Perfil':[94.6,5.0,80,20]
 };
 Object.keys(map).forEach(function(label){var v=map[label];pct(byLabel(label),v[0],v[1],v[2],v[3]);});
 var cid=byLabel('Consulta de Exames — CID');
 if(cid&&!cid.getAttribute('data-v174-cid')){
  cid.setAttribute('data-v174-cid','1');
  cid.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();var w=window.open(CID_URL,'_blank','noopener,noreferrer');if(!w)window.location.href=CID_URL;},true);
 }
 return true;
}
var tries=0;function start(){tries++;if(apply())return;if(tries<120)setTimeout(start,150);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('load',function(){setTimeout(apply,250);});
})();