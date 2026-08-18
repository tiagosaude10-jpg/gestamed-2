(function(){
'use strict';
var ROOT='#gm-app-flow';
function cleanup(){
  var root=document.querySelector(ROOT);
  if(!root)return;
  var stacks=Array.prototype.slice.call(root.querySelectorAll('.gm-resource-access-stack'));
  if(stacks.length>1){
    stacks.slice(1).forEach(function(node){node.remove();});
  }
  root.querySelectorAll('.gm-command-cid-restored').forEach(function(node){node.remove();});
  var stack=root.querySelector('.gm-resource-access-stack');
  if(!stack)return;
  ['cid','labor'].forEach(function(kind){
    var buttons=Array.prototype.slice.call(stack.querySelectorAll('.gm-command-resource-restored.'+kind));
    if(buttons.length>1)buttons.slice(1).forEach(function(node){node.remove();});
  });
}
cleanup();
[120,350,800,1500].forEach(function(ms){window.setTimeout(cleanup,ms);});
window.addEventListener('load',cleanup,{once:true});
})();