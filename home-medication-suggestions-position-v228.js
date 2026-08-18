(function(){
'use strict';
var ROOT='#gm-app-flow';
var INPUT='#gm-home-search';
var PANEL='#gm-home-filter-results';
var CLASS='gm-med-suggestions-mobile';

function style(){
  if(document.getElementById('gm-med-suggestions-position-v228-style'))return;
  var s=document.createElement('style');
  s.id='gm-med-suggestions-position-v228-style';
  s.textContent=[
    '@media (max-width: 760px){',
    '#gm-home-filter-results.'+CLASS+'{',
      'position:fixed!important;',
      'inset:auto!important;',
      'z-index:2147482000!important;',
      'border-radius:18px!important;',
      'background:#fff!important;',
      'box-shadow:0 12px 32px rgba(76,31,52,.22)!important;',
      'overflow:hidden!important;',
      'max-height:none!important;',
    '}',
    '#gm-home-filter-results.'+CLASS+' .gm-home-results-head,',
    '#gm-home-filter-results.'+CLASS+' .gm-category-body>h2,',
    '#gm-home-filter-results.'+CLASS+' .gm-category-intro{display:none!important;}',
    '#gm-home-filter-results.'+CLASS+' .gm-category-body{padding:0!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;}',
    '#gm-home-filter-results.'+CLASS+' .gm-home-results-list{gap:0!important;}',
    '#gm-home-filter-results.'+CLASS+' .gm-home-result-card{border:0!important;border-bottom:1px solid #f0dde4!important;border-radius:0!important;box-shadow:none!important;padding:15px 18px!important;}',
    '#gm-home-filter-results.'+CLASS+' .gm-home-result-card:last-child{border-bottom:0!important;}',
    '}'
  ].join('');
  document.head.appendChild(s);
}

function getInput(){return document.querySelector(ROOT+' '+INPUT)||document.querySelector(INPUT);}
function getPanel(){return document.querySelector(PANEL);}

function place(){
  var input=getInput(),panel=getPanel();
  if(!input||!panel)return;
  var value=String(input.value||'').trim();
  var focused=document.activeElement===input;
  if(!focused||value.length<2||!panel.classList.contains('gm-home-results-open')){
    panel.classList.remove(CLASS);
    panel.style.removeProperty('top');
    panel.style.removeProperty('left');
    panel.style.removeProperty('width');
    panel.style.removeProperty('height');
    panel.style.removeProperty('max-height');
    return;
  }
  var r=input.getBoundingClientRect();
  var vv=window.visualViewport;
  var viewportHeight=vv?vv.height:window.innerHeight;
  var gap=8;
  var top=Math.round(r.bottom+gap);
  var left=Math.round(r.left);
  var width=Math.round(r.width);
  var available=Math.max(150,Math.floor(viewportHeight-top-14));
  var maxHeight=Math.min(available,420);
  panel.classList.add(CLASS);
  panel.style.setProperty('top',top+'px','important');
  panel.style.setProperty('left',left+'px','important');
  panel.style.setProperty('width',width+'px','important');
  panel.style.setProperty('height','auto','important');
  panel.style.setProperty('max-height',maxHeight+'px','important');
}

function schedule(){requestAnimationFrame(function(){place();setTimeout(place,40);});}

function install(){
  var input=getInput();
  if(!input)return false;
  style();
  if(input.getAttribute('data-gm-suggestions-position-v228')!=='1'){
    input.setAttribute('data-gm-suggestions-position-v228','1');
    ['input','focus','keyup'].forEach(function(type){input.addEventListener(type,schedule,false);});
    input.addEventListener('blur',function(){setTimeout(function(){var p=getPanel();if(p)p.classList.remove(CLASS);},180);},false);
  }
  document.addEventListener('click',function(e){
    var card=e.target&&e.target.closest?e.target.closest('#gm-home-filter-results .gm-home-result-card'):null;
    if(card){setTimeout(function(){var p=getPanel();if(p)p.classList.remove(CLASS);},0);}
  },false);
  if(window.visualViewport){window.visualViewport.addEventListener('resize',schedule);window.visualViewport.addEventListener('scroll',schedule);}
  window.addEventListener('resize',schedule);
  return true;
}

var tries=0;(function boot(){tries++;if(install())return;if(tries<120)setTimeout(boot,100);})();
})();