(function () {
  'use strict';

  var style = document.getElementById('gm-home-carousel-visibility-fix-style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'gm-home-carousel-visibility-fix-style';
    style.textContent = [
      'html:not(.gm-home-active) #gm-home-filter-carousel{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
      '#gm-home-screen.gm-home-hidden #gm-home-filter-carousel{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
      'html.gm-home-active #gm-home-screen:not(.gm-home-hidden) #gm-home-filter-carousel{display:flex!important;visibility:visible!important;pointer-events:auto!important;}'
    ].join('');
    document.head.appendChild(style);
  }

  function syncVisibility() {
    var home = document.getElementById('gm-home-screen');
    var carousel = document.getElementById('gm-home-filter-carousel');
    if (!carousel) return;
    var visible = document.documentElement.classList.contains('gm-home-active') && home && !home.classList.contains('gm-home-hidden');
    carousel.setAttribute('aria-hidden', visible ? 'false' : 'true');
    carousel.style.display = visible ? 'flex' : 'none';
    carousel.style.pointerEvents = visible ? 'auto' : 'none';
  }

  document.addEventListener('click', function () {
    window.setTimeout(syncVisibility, 0);
    window.setTimeout(syncVisibility, 180);
  }, true);

  var observer = new MutationObserver(syncVisibility);
  observer.observe(document.documentElement, { attributes:true, attributeFilter:['class'], childList:true, subtree:true });
  syncVisibility();
})();
