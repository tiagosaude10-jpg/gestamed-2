(function(){
'use strict';
var INPUT='#gm-home-search';
var PANEL='#gm-home-filter-results';
var FORM='.gm-command-search';
var CLASS='gm-med-suggestions-mobile';
var ORIGINAL={parent:null,next:null};

function style(){
  var old=document.getElementById('gm-med-suggestions-position-v228-style');
  if(old)old.remove();
  var s=document.createElement('style');
  s.id='gm-med-suggestions-position-v228-style';
  s.textContent=[
    '@media (max-width:760px){',
      '#gm-app-flow .gm-command-search{position:relative!important;overflow:visible!important;z-index:120!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+'{',
        'display:flex!important;',
        'flex-direction:column!important;',
        'position:absolute!important;',
        'top:calc(100% + 8px)!important;',
        'left:0!important;',
        'right:0!important;',
        'bottom:auto!important;',
        'width:100%!important;',
        'height:auto!important;',
        'max-height:250px!important;',
        'z-index:2147483000!important;',
        'border:1px solid #efcad8!important;',
        'border-radius:18px!important;',
        'background:#fff!important;',
        'box-shadow:0 12px 30px rgba(76,31,52,.22)!important;',
        'overflow:hidden!important;',
        'transform:none!important;',
      '}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-home-results-head,',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-category-body>h2,',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-category-intro{display:none!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-category-body{padding:0!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;max-height:250px!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-home-results-list{gap:0!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-home-result-card{border:0!important;border-bottom:1px solid #f0dde4!important;border-radius:0!important;box-shadow:none!important;padding:13px 16px!important;min-height:74px!important;background:#fff!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-home-result-card:last-child{border-bottom:0!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-med-card-top strong{font-size:17px!important;line-height:1.2!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-med-class{font-size:13px!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-med-status{font-size:11px!important;padding:6px 9px!important;}',
      '#gm-app-flow .gm-command-search #gm-home-filter-results.'+CLASS+' .gm-home-result-card p{display:none!important;}',
    '}'
  ].join('');
  document.head.appendChild(s);
}

function input(){return document.querySelector('#gm-app-flow '+INPUT)||document.querySelector(INPUT);}
function panel(){return document.querySelector(PANEL);}
function form(){return document.querySelector('#gm-app-flow '+FORM)||document.querySelector(FORM);}

function rememberPanel(p){
  if(!p||ORIGINAL.parent)return;
  ORIGINAL.parent=p.parentNode;
  ORIGINAL.next=p.nextSibling;
}

function moveIntoSearch(){
  var i=input(),p=panel(),f=form();
  if(!i||!p||!f)return;
  rememberPanel(p);
  var value=String(i.value||'').trim();
  var active=document.activeElement===i;
  var open=p.classList.contains('gm-home-results-open');
  if(!active||value.length<2||!open){
    p.classList.remove(CLASS);
    return;
  }
  if(p.parentNode!==f)f.appendChild(p);
  p.classList.add(CLASS);
}

function restore(){
  var p=panel();
  if(!p)return;
  p.classList.remove(CLASS);
  if(ORIGINAL.parent&&p.parentNode!==ORIGINAL.parent){
    if(ORIGINAL.next&&ORIGINAL.next.parentNode===ORIGINAL.parent)ORIGINAL.parent.insertBefore(p,ORIGINAL.next);
    else ORIGINAL.parent.appendChild(p);
  }
}

function schedule(){requestAnimationFrame(function(){moveIntoSearch();setTimeout(moveIntoSearch,30);});}

function install(){
  var i=input();
  if(!i)return false;
  style();
  if(i.getAttribute('data-gm-suggestions-position-v231')!=='1'){
    i.setAttribute('data-gm-suggestions-position-v231','1');
    ['input','focus','keyup'].forEach(function(type){i.addEventListener(type,schedule,false);});
    i.addEventListener('blur',function(){setTimeout(function(){var p=panel();if(p&&!p.matches(':hover'))restore();},220);},false);
  }
  document.addEventListener('click',function(e){
    var card=e.target&&e.target.closest?e.target.closest('#gm-home-filter-results .gm-home-result-card'):null;
    if(card)setTimeout(restore,0);
  },false);
  return true;
}

var tries=0;(function boot(){tries++;if(install())return;if(tries<120)setTimeout(boot,100);})();
})();