(function () {
  'use strict';

  var PATCH_ID = 'gestamed-home-carousel-visibility-2026-07-26-176';
  document.documentElement.setAttribute('data-gm-home-carousel-visibility', PATCH_ID);

  var oldStyle = document.getElementById('gm-home-carousel-visibility-fix-style');
  if (oldStyle) oldStyle.remove();

  var style = document.createElement('style');
  style.id = 'gm-home-carousel-visibility-fix-style';
  style.textContent = [
    'html:not(.gm-home-active) #gm-home-filter-carousel{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
    '#gm-home-screen.gm-home-hidden #gm-home-filter-carousel{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
    'html.gm-home-filter-mode #gm-home-filter-carousel{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
    '#gm-home-filter-results.gm-home-results-open ~ #gm-home-filter-carousel{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
    'body:has(.modal.open) #gm-home-filter-carousel{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
    'html.gm-home-active:not(.gm-home-filter-mode) #gm-home-screen:not(.gm-home-hidden) #gm-home-filter-carousel{display:flex!important;visibility:visible!important;pointer-events:auto!important;}'
  ].join('');
  document.head.appendChild(style);

  function modalOpen() {
    return !!document.querySelector('.modal.open, #gm-home-filter-results.gm-home-results-open');
  }

  function syncVisibility() {
    var home = document.getElementById('gm-home-screen');
    var carousel = document.getElementById('gm-home-filter-carousel');
    if (!carousel) return;

    var visible = document.documentElement.classList.contains('gm-home-active') &&
      !document.documentElement.classList.contains('gm-home-filter-mode') &&
      home && !home.classList.contains('gm-home-hidden') &&
      !modalOpen();

    carousel.setAttribute('aria-hidden', visible ? 'false' : 'true');
    carousel.style.setProperty('display', visible ? 'flex' : 'none', 'important');
    carousel.style.setProperty('visibility', visible ? 'visible' : 'hidden', 'important');
    carousel.style.setProperty('pointer-events', visible ? 'auto' : 'none', 'important');
  }

  document.addEventListener('click', function () {
    window.setTimeout(syncVisibility, 0);
    window.setTimeout(syncVisibility, 80);
    window.setTimeout(syncVisibility, 220);
  }, true);

  var observer = new MutationObserver(syncVisibility);
  observer.observe(document.documentElement, { attributes:true, attributeFilter:['class'], childList:true, subtree:true });

  window.addEventListener('load', function () { window.setTimeout(syncVisibility, 100); });
  syncVisibility();
})();