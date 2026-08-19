(function(){
'use strict';

var ROOT_ID='gm-gestational-diabetes-screen';
var PATCH_ATTR='data-gm-top-back-v245';

function apply(){
  var root=document.getElementById(ROOT_ID);
  if(!root)return false;
  var back=root.querySelector('.gm-dmg-new-back');
  if(!back)return false;

  back.onclick=function(event){
    if(event){event.preventDefault();event.stopPropagation();}
    if(typeof window.closeGestationalDiabetesModule==='function'){
      window.closeGestationalDiabetesModule();
    }
  };
  back.setAttribute(PATCH_ATTR,'1');
  return true;
}

[0,100,300,700].forEach(function(ms){window.setTimeout(apply,ms);});
})();