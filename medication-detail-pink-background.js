(function(){
  'use strict';
  var PATCH_ID='gestamed-medication-detail-pink-background-2026-07-25-166';
  if(document.documentElement.getAttribute('data-gm-detail-pink-bg')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-detail-pink-bg',PATCH_ID);

  function ensureStyle(){
    if(document.getElementById('gm-detail-pink-background-style'))return;
    var style=document.createElement('style');
    style.id='gm-detail-pink-background-style';
    style.textContent=[
      '#gm-detail-pink-backdrop{display:none;position:fixed;inset:0;z-index:2147482500;background:linear-gradient(180deg,#fff3f7 0%,#ffeef4 48%,#fff8fa 100%);pointer-events:none;}',
      'html.gm-medication-detail-open #gm-detail-pink-backdrop{display:block;}',
      'html.gm-medication-detail-open body{background:#fff3f7!important;}',
      'html.gm-medication-detail-open body>header,html.gm-medication-detail-open .hero,html.gm-medication-detail-open .app-header,html.gm-medication-detail-open .top-hero,html.gm-medication-detail-open [class*="hero"],html.gm-medication-detail-open [class*="banner"]{visibility:hidden!important;}',
      'html.gm-medication-detail-open [role="dialog"],html.gm-medication-detail-open .modal,html.gm-medication-detail-open .drug-modal,html.gm-medication-detail-open .medication-modal,html.gm-medication-detail-open .details-modal{z-index:2147483000!important;}',
      'html.gm-medication-detail-open [role="dialog"]::backdrop{background:rgba(98,42,68,.18)!important;}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureBackdrop(){
    var backdrop=document.getElementById('gm-detail-pink-backdrop');
    if(backdrop)return backdrop;
    backdrop=document.createElement('div');
    backdrop.id='gm-detail-pink-backdrop';
    document.body.appendChild(backdrop);
    return backdrop;
  }

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  }

  function findMedicationDialog(){
    var nodes=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],.modal,.drug-modal,.medication-modal,.details-modal'));
    return nodes.find(function(node){
      if(!node||!node.isConnected)return false;
      var rect=node.getBoundingClientRect();
      if(!rect.width||!rect.height)return false;
      var text=normalize(node.innerText||node.textContent||'');
      return text.indexOf('classificacao por periodo')!==-1 || text.indexOf('decisao resumida')!==-1 || text.indexOf('posologia de referencia')!==-1;
    })||null;
  }

  function updateState(){
    var dialog=findMedicationDialog();
    document.documentElement.classList.toggle('gm-medication-detail-open',!!dialog);
  }

  function install(){
    if(!document.body)return false;
    ensureStyle();
    ensureBackdrop();
    updateState();
    var observer=new MutationObserver(function(){window.requestAnimationFrame(updateState);});
    observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','open','aria-hidden']});
    document.addEventListener('click',function(){setTimeout(updateState,30);setTimeout(updateState,180);},true);
    return true;
  }

  var tries=0;(function start(){tries+=1;if(install()||tries>100)return;setTimeout(start,100);})();
})();