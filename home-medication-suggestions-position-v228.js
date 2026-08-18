(function(){
'use strict';
var INPUT='#gm-home-search';
var PANEL='#gm-home-filter-results';
var CANVAS='#gm-home-canvas';
var CLASS='gm-med-suggestions-mobile';

function style(){
  var old=document.getElementById('gm-med-suggestions-position-v228-style');
  if(old)old.remove();
  var s=document.createElement('style');
  s.id='gm-med-suggestions-position-v228-style';
  s.textContent=[
    '@media (max-width:760px){',
      '#gm-home-filter-results.'+CLASS+'{',
        'position:absolute!important;',
        'inset:auto!important;',
        'z-index:80!important;',
        'border:1px solid #efcad8!important;',
        'border-radius:18px!important;',
        'background:#fff!important;',
        'box-shadow:0 10px 28px rgba(76,31,52,.18)!important;',
        'overflow:hidden!important;',
        'margin:0!important;',
        'transform:none!important;',
      '}',
      '#gm-home-filter-results.'+CLASS+' .gm-home-results-head,',
      '#gm-home-filter-results.'+CLASS+' .gm-category-body>h2,',
      '#gm-home-filter-results.'+CLASS+' .gm-category-intro{display:none!important;}',
      '#gm-home-filter-results.'+CLASS+' .gm-category-body{padding:0!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;max-height:inherit!important;}',
      '#gm-home-filter-results.'+CLASS+' .gm-home-results-list{gap:0!important;}',
      '#gm-home-filter-results.'+CLASS+' .gm-home-result-card{border:0!important;border-bottom:1px solid #f0dde4!important;border-radius:0!important;box-shadow:none!important;padding:13px 16px!important;min-height:74px!important;}',
      '#gm-home-filter-results.'+CLASS+' .gm-home-result-card:last-child{border-bottom:0!important;}',
      '#gm-home-filter-results.'+CLASS+' .gm-med-card-top strong{font-size:17px!important;}',
      '#gm-home-filter-results.'+CLASS+' .gm-med-class{font-size:13px!important;}',
      '#gm-home-filter-results.'+CLASS+' .gm-med-status{font-size:11px!important;padding:6px 9px!important;}',
      '#gm-home-filter-results.'+CLASS+' .gm-home-result-card p{display:none!important;}',
    '}'
  ].join('');
  document.head.appendChild(s);
}

function getInput(){return document.querySelector('#gm-app-flow '+INPUT)||document.querySelector(INPUT);}
function getPanel(){return document.querySelector(PANEL);}
function getCanvas(){return document.querySelector(CANVAS);}

function clearPosition(panel){
  if(!panel)return;
  panel.classList.remove(CLASS);
  ['top','left','right','bottom','width','height','max-height'].forEach(function(prop){panel.style.removeProperty(prop);});
}

function place(){
  var input=getInput(),panel=getPanel(),canvas=getCanvas();
  if(!input||!panel||!canvas)return;

  var value=String(input.value||'').trim();
  var focused=document.activeElement===input;
  if(!focused||value.length<2||!panel.classList.contains('gm-home-results-open')){
    clearPosition(panel);
    return;
  }

  var ir=input.getBoundingClientRect();
  var cr=canvas.getBoundingClientRect();

  /* O canvas do GestaMed é redimensionado visualmente no celular.
     getBoundingClientRect() retorna coordenadas já escaladas, enquanto top/left
     absolutos são aplicados no sistema interno do canvas. Corrigir pelo scale
     evita a lista subir e cobrir a barra de pesquisa no Safari/iPhone. */
  var rawW=canvas.offsetWidth||cr.width;
  var rawH=canvas.offsetHeight||cr.height;
  var scaleX=cr.width/rawW;
  var scaleY=cr.height/rawH;
  if(!isFinite(scaleX)||scaleX<=0)scaleX=1;
  if(!isFinite(scaleY)||scaleY<=0)scaleY=1;

  var gapPx=10;
  var top=(ir.bottom-cr.top+gapPx)/scaleY;
  var left=(ir.left-cr.left)/scaleX;
  var width=ir.width/scaleX;

  left=Math.max(10,left);
  width=Math.min(width,rawW-left-10);

  var vv=window.visualViewport;
  var keyboardOpen=!!(vv&&window.innerHeight-vv.height>120);
  var desiredPx=keyboardOpen?225:310;
  var maxHeight=desiredPx/scaleY;

  panel.classList.add(CLASS);
  panel.style.setProperty('top',Math.round(top)+'px','important');
  panel.style.setProperty('left',Math.round(left)+'px','important');
  panel.style.setProperty('width',Math.round(width)+'px','important');
  panel.style.setProperty('height','auto','important');
  panel.style.setProperty('max-height',Math.round(maxHeight)+'px','important');
  panel.style.setProperty('right','auto','important');
  panel.style.setProperty('bottom','auto','important');
}

function schedule(){requestAnimationFrame(function(){place();setTimeout(place,30);});}

function install(){
  var input=getInput();
  if(!input)return false;
  style();
  if(input.getAttribute('data-gm-suggestions-position-v230')!=='1'){
    input.setAttribute('data-gm-suggestions-position-v230','1');
    ['input','focus','keyup'].forEach(function(type){input.addEventListener(type,schedule,false);});
    input.addEventListener('blur',function(){setTimeout(function(){clearPosition(getPanel());},180);},false);
  }
  if(document.documentElement.getAttribute('data-gm-suggestions-global-v230')!=='1'){
    document.documentElement.setAttribute('data-gm-suggestions-global-v230','1');
    if(window.visualViewport){
      window.visualViewport.addEventListener('resize',schedule);
      window.visualViewport.addEventListener('scroll',schedule);
    }
    window.addEventListener('resize',schedule);
  }
  return true;
}

var tries=0;(function boot(){tries++;if(install())return;if(tries<120)setTimeout(boot,100);})();
})();