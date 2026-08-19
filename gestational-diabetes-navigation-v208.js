(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';

function getRoot(){return document.getElementById(ROOT_ID);}

function handleBack(){
  if(typeof window.closeGestationalDiabetesModule==='function'){
    window.closeGestationalDiabetesModule();
  }
}

function patchBackButton(){
  var root=getRoot();if(!root)return false;
  var old=root.querySelector('.gm-dmg-new-back');if(!old)return false;
  if(old.getAttribute('data-dmg-nav-v208')==='1')return true;
  var btn=old.cloneNode(true);
  btn.setAttribute('data-dmg-nav-v208','1');
  old.parentNode.replaceChild(btn,old);
  btn.addEventListener('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    handleBack();
  });
  return true;
}

function init(){patchBackButton();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',patchBackButton,{once:true});
})();