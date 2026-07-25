(function(){
  'use strict';
  var PATCH_ID='gestamed-medication-detail-pink-background-2026-07-25-167';
  document.documentElement.setAttribute('data-gm-detail-pink-bg',PATCH_ID);

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  }

  function ensureStyle(){
    var old=document.getElementById('gm-detail-pink-background-style');
    if(old)old.remove();
    var style=document.createElement('style');
    style.id='gm-detail-pink-background-style';
    style.textContent=[
      '#gm-detail-pink-backdrop{display:none;position:fixed!important;inset:0!important;z-index:2147482500!important;background:linear-gradient(180deg,#fff4f8 0%,#ffeef5 52%,#fff9fb 100%)!important;pointer-events:none!important;}',
      'html.gm-medication-detail-open #gm-detail-pink-backdrop{display:block!important;}',
      'html.gm-medication-detail-open body,html.gm-medication-detail-open #app,html.gm-medication-detail-open main{background:#fff4f8!important;}',
      'html.gm-medication-detail-open .gm-detected-medication-dialog{position:relative;z-index:2147483000!important;}',
      'html.gm-medication-detail-open [role="dialog"],html.gm-medication-detail-open .modal,html.gm-medication-detail-open .drug-modal,html.gm-medication-detail-open .medication-modal,html.gm-medication-detail-open .details-modal{z-index:2147483000!important;}',
      'html.gm-medication-detail-open body>header,html.gm-medication-detail-open .hero,html.gm-medication-detail-open .app-header,html.gm-medication-detail-open .top-hero,html.gm-medication-detail-open [class*="hero"],html.gm-medication-detail-open [class*="banner"]{visibility:hidden!important;opacity:0!important;}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureBackdrop(){
    var backdrop=document.getElementById('gm-detail-pink-backdrop');
    if(!backdrop){
      backdrop=document.createElement('div');
      backdrop.id='gm-detail-pink-backdrop';
      document.body.appendChild(backdrop);
    }
    return backdrop;
  }

  function visible(node){
    if(!node||!node.isConnected)return false;
    var rect=node.getBoundingClientRect();
    if(rect.width<40||rect.height<80)return false;
    var cs=getComputedStyle(node);
    return cs.display!=='none'&&cs.visibility!=='hidden'&&Number(cs.opacity||1)>0;
  }

  function hasDetailText(node){
    var text=normalize(node.innerText||node.textContent||'');
    return text.indexOf('decisao resumida')!==-1&&
      (text.indexOf('classificacao por periodo')!==-1||text.indexOf('posologia de referencia')!==-1);
  }

  function findMedicationDialog(){
    var preferred=Array.prototype.slice.call(document.querySelectorAll('[role="dialog"],dialog,.modal,.drug-modal,.medication-modal,.details-modal,[class*="sheet"],[class*="drawer"]'));
    var found=preferred.find(function(node){return visible(node)&&hasDetailText(node);});
    if(found)return found;

    var textNodes=Array.prototype.slice.call(document.querySelectorAll('section,article,div'))
      .filter(function(node){return visible(node)&&hasDetailText(node);})
      .sort(function(a,b){return a.getBoundingClientRect().height-b.getBoundingClientRect().height;});
    found=textNodes[0]||null;
    if(!found)return null;

    var current=found;
    while(current&&current!==document.body){
      var cs=getComputedStyle(current);
      if(cs.position==='fixed'||cs.position==='absolute')return current;
      current=current.parentElement;
    }
    return found;
  }

  function updateState(){
    document.querySelectorAll('.gm-detected-medication-dialog').forEach(function(node){node.classList.remove('gm-detected-medication-dialog');});
    var dialog=findMedicationDialog();
    if(dialog)dialog.classList.add('gm-detected-medication-dialog');
    document.documentElement.classList.toggle('gm-medication-detail-open',!!dialog);
  }

  function install(){
    if(!document.body)return false;
    ensureStyle();
    ensureBackdrop();
    updateState();
    var scheduled=false;
    var observer=new MutationObserver(function(){
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(function(){scheduled=false;updateState();});
    });
    observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','open','aria-hidden']});
    document.addEventListener('click',function(){setTimeout(updateState,20);setTimeout(updateState,120);setTimeout(updateState,350);},true);
    return true;
  }

  var tries=0;(function start(){tries+=1;if(install()||tries>100)return;setTimeout(start,100);})();
})();