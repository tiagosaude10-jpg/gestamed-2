(()=>{
'use strict';
function forceSearchLayout(){
  const command=document.querySelector('#command');
  if(!command)return false;
  const titlebox=command.querySelector('.tc-command-titlebox');
  const searchBox=command.querySelector('.tc-search-box');
  const wrap=command.querySelector('.tc-search-input-wrap');
  const input=command.querySelector('#tcGlobalSearch');
  if(!titlebox||!searchBox||!wrap||!input)return false;
  const content=titlebox.lastElementChild;
  const imp=(el,prop,val)=>el&&el.style.setProperty(prop,val,'important');
  imp(titlebox,'display','block');
  imp(titlebox,'width','100%');
  imp(titlebox,'box-sizing','border-box');
  imp(content,'display','block');
  imp(content,'width','100%');
  imp(content,'max-width','none');
  imp(content,'min-width','0');
  imp(searchBox,'display','grid');
  imp(searchBox,'width','100%');
  imp(searchBox,'max-width','none');
  imp(searchBox,'min-width','0');
  imp(wrap,'display','block');
  imp(wrap,'width','100%');
  imp(wrap,'max-width','none');
  imp(wrap,'min-width','0');
  imp(wrap,'box-sizing','border-box');
  imp(input,'display','block');
  imp(input,'width','100%');
  imp(input,'max-width','none');
  imp(input,'min-width','0');
  imp(input,'box-sizing','border-box');
  return true;
}
function applyUntilReady(){
  if(forceSearchLayout()){
    requestAnimationFrame(forceSearchLayout);
    setTimeout(forceSearchLayout,80);
    setTimeout(forceSearchLayout,350);
    return;
  }
  setTimeout(applyUntilReady,40);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyUntilReady,{once:true});
else applyUntilReady();
window.addEventListener('resize',forceSearchLayout);
window.addEventListener('orientationchange',()=>setTimeout(forceSearchLayout,120));
})();
