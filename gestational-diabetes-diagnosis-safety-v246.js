(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
var PATCH='246';
function root(){return document.getElementById(ROOT_ID);}
function num(id){var e=document.getElementById(id);if(!e)return null;var s=String(e.value||'').trim().replace(',','.');if(s==='')return null;var x=Number(s);return Number.isFinite(x)?x:null;}
function alertHtml(title,text){return '<aside class="gm-master-alert warn"><b>'+title+'</b><span>'+text+'</span></aside>';}
function invalidPositive(id){var v=num(id);return v!=null&&v<=0;}
function onClick(e){var b=e.target&&e.target.closest&&e.target.closest('button');if(!b)return;
  if(b.id==='gm-dx-fasting-btn'&&invalidPositive('gm-dx-fasting')){
    e.preventDefault();e.stopImmediatePropagation();
    var out=document.getElementById('gm-dx-fasting-result');if(out)out.innerHTML=alertHtml('Valor inválido','A glicemia deve ser informada em mg/dL com valor maior que zero. Revise o dado antes de interpretar.');return;
  }
  if(b.id==='gm-totg-btn'){
    var ids=['gm-totg0','gm-totg1','gm-totg2'];
    if(ids.some(invalidPositive)){
      e.preventDefault();e.stopImmediatePropagation();
      var out2=document.getElementById('gm-totg-result');if(out2)out2.innerHTML=alertHtml('Valor inválido','Os valores do TOTG devem ser informados em mg/dL e ser maiores que zero. Revise os dados antes de interpretar.');return;
    }
  }
}
function init(){var r=root();if(!r){setTimeout(init,120);return;}if(r.getAttribute('data-dmg-diagnosis-safety-v246')==='1')return;r.setAttribute('data-dmg-diagnosis-safety-v246','1');r.addEventListener('click',onClick,true);document.documentElement.setAttribute('data-gm-dmg-diagnosis-safety',PATCH);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();window.addEventListener('load',init,{once:true});
})();