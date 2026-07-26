(function () {
  'use strict';
  var PATCH_ID = 'gestamed-cid-module-2026-07-26-173';
  document.documentElement.setAttribute('data-gm-cid-module', PATCH_ID);

  function cleanup() {
    var oldStyle = document.getElementById('gm-cid-module-style');
    if (oldStyle) oldStyle.remove();
    var oldButton = document.getElementById('gm-cid-access');
    if (oldButton) oldButton.remove();
    var lowerImage = document.getElementById('gm-home-image-lower');
    if (lowerImage) lowerImage.remove();
  }

  cleanup();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanup, { once: true });
  } else {
    window.setTimeout(cleanup, 0);
  }
})();