(function(){
  'use strict';
  var PATCH_ID='gestamed-home-carousel-scroll-indicator-2026-07-25-164';
  if(document.documentElement.getAttribute('data-gm-carousel-scroll-indicator')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-carousel-scroll-indicator',PATCH_ID);

  function ensureStyle(){
    if(document.getElementById('gm-carousel-scroll-indicator-style'))return;
    var style=document.createElement('style');
    style.id='gm-carousel-scroll-indicator-style';
    style.textContent=[
      '#gm-home-filter-scroll-track{position:absolute;z-index:13;left:6%;right:6%;top:35.08%;height:4px;border-radius:999px;background:rgba(181,104,139,.18);overflow:visible;touch-action:none;}',
      '#gm-home-filter-scroll-thumb{position:absolute;left:0;top:-1px;height:6px;min-width:34px;border-radius:999px;background:linear-gradient(90deg,#ee4e8f,#c93678);box-shadow:0 1px 5px rgba(146,39,86,.26);transform:translateX(0);will-change:transform;width:34px;}',
      '#gm-home-filter-scroll-track.gm-scroll-disabled{opacity:.25;pointer-events:none;}',
      '@media(max-width:520px){#gm-home-filter-scroll-track{left:7%;right:7%;top:35.12%;height:3px}#gm-home-filter-scroll-thumb{height:5px;top:-1px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function install(){
    var canvas=document.getElementById('gm-home-canvas');
    var carousel=document.getElementById('gm-home-filter-carousel');
    if(!canvas||!carousel)return false;
    ensureStyle();

    var old=document.getElementById('gm-home-filter-scroll-track');
    if(old)old.remove();

    var track=document.createElement('div');
    track.id='gm-home-filter-scroll-track';
    track.setAttribute('role','scrollbar');
    track.setAttribute('aria-label','Posição da barra de categorias');
    track.setAttribute('aria-orientation','horizontal');
    var thumb=document.createElement('div');
    thumb.id='gm-home-filter-scroll-thumb';
    track.appendChild(thumb);
    canvas.appendChild(track);

    var dragging=false;
    var dragOffset=0;

    function metrics(){
      var maxScroll=Math.max(0,carousel.scrollWidth-carousel.clientWidth);
      var trackWidth=track.clientWidth;
      var visibleRatio=carousel.scrollWidth?carousel.clientWidth/carousel.scrollWidth:1;
      var thumbWidth=Math.max(34,Math.min(trackWidth,trackWidth*visibleRatio));
      var maxThumb=Math.max(0,trackWidth-thumbWidth);
      return {maxScroll:maxScroll,trackWidth:trackWidth,thumbWidth:thumbWidth,maxThumb:maxThumb};
    }

    function update(){
      var m=metrics();
      thumb.style.width=m.thumbWidth+'px';
      var ratio=m.maxScroll?carousel.scrollLeft/m.maxScroll:0;
      var x=m.maxThumb*ratio;
      thumb.style.transform='translateX('+x+'px)';
      track.classList.toggle('gm-scroll-disabled',m.maxScroll<=1);
      track.setAttribute('aria-valuemin','0');
      track.setAttribute('aria-valuemax',String(Math.round(m.maxScroll)));
      track.setAttribute('aria-valuenow',String(Math.round(carousel.scrollLeft)));
    }

    function setFromPointer(clientX,centerThumb){
      var rect=track.getBoundingClientRect();
      var m=metrics();
      var x=clientX-rect.left-(centerThumb?m.thumbWidth/2:dragOffset);
      x=Math.max(0,Math.min(m.maxThumb,x));
      var ratio=m.maxThumb?x/m.maxThumb:0;
      carousel.scrollLeft=ratio*m.maxScroll;
      update();
    }

    thumb.addEventListener('pointerdown',function(event){
      dragging=true;
      var rect=thumb.getBoundingClientRect();
      dragOffset=event.clientX-rect.left;
      try{thumb.setPointerCapture(event.pointerId);}catch(error){}
      event.preventDefault();
    });

    thumb.addEventListener('pointermove',function(event){
      if(!dragging)return;
      setFromPointer(event.clientX,false);
      event.preventDefault();
    });

    function stopDrag(event){
      dragging=false;
      try{thumb.releasePointerCapture(event.pointerId);}catch(error){}
    }
    thumb.addEventListener('pointerup',stopDrag);
    thumb.addEventListener('pointercancel',stopDrag);

    track.addEventListener('pointerdown',function(event){
      if(event.target===thumb)return;
      setFromPointer(event.clientX,true);
      event.preventDefault();
    });

    carousel.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update,{passive:true});
    window.setTimeout(update,50);
    window.setTimeout(update,300);
    return true;
  }

  var attempts=0;
  (function start(){
    attempts+=1;
    if(install()||attempts>=100)return;
    window.setTimeout(start,120);
  })();

  new MutationObserver(function(){
    var carousel=document.getElementById('gm-home-filter-carousel');
    var track=document.getElementById('gm-home-filter-scroll-track');
    if(carousel&&!track)install();
  }).observe(document.documentElement,{childList:true,subtree:true});
})();
