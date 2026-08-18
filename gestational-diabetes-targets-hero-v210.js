(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
var STYLE_ID='gm-dmg-targets-hero-v210-style';
function root(){return document.getElementById(ROOT_ID);}
function addStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');s.id=STYLE_ID;
  s.textContent=[
    '#'+ROOT_ID+' .gm-target-hero{min-height:168px;padding:20px 42% 16px 10px!important;background:linear-gradient(135deg,#fff,#fff4f8)!important;}',
    '#'+ROOT_ID+' .gm-target-hero .art{right:8px!important;bottom:6px!important;width:38%!important;height:154px!important;border-radius:24px!important;background:transparent!important;overflow:hidden!important;display:block!important;font-size:0!important;}',
    '#'+ROOT_ID+' .gm-target-hero .art img{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center 32%!important;display:block!important;border-radius:22px!important;box-shadow:0 6px 18px rgba(181,58,105,.10)!important;}',
    '@media(max-width:440px){#'+ROOT_ID+' .gm-target-hero{min-height:160px;padding-right:43%!important;}#'+ROOT_ID+' .gm-target-hero .art{width:39%!important;height:142px!important;right:6px!important;bottom:8px!important;}#'+ROOT_ID+' .gm-target-hero h1{font-size:27px!important;}#'+ROOT_ID+' .gm-target-hero p{font-size:12.5px!important;}}'
  ].join('');
  document.head.appendChild(s);
}
function applyHero(){
  var r=root();if(!r)return;
  var d=r.querySelector('.gm-dmg-new-detail[data-topic="criteria"]');if(!d)return;
  var art=d.querySelector('.gm-target-hero .art');if(!art)return;
  if(art.getAttribute('data-hero-v210')==='1')return;
  art.setAttribute('data-hero-v210','1');
  art.setAttribute('aria-hidden','false');
  art.innerHTML='<img src="gestamed-hero.jpg?v=210" alt="Ilustração de gestante">';
}
function patch(){
  addStyle();var r=root();if(!r)return false;
  var btn=r.querySelector('.gm-dmg-new-card[data-topic="criteria"]');
  if(btn&&btn.getAttribute('data-hero-listener-v210')!=='1'){
    btn.setAttribute('data-hero-listener-v210','1');
    btn.addEventListener('click',function(){window.setTimeout(applyHero,0);});
  }
  applyHero();return true;
}
function init(){patch();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',patch,{once:true});
})();