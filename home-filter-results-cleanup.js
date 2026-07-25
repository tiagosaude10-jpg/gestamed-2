(function(){
  'use strict';
  var PATCH_ID='gestamed-home-filter-results-cleanup-2026-07-25-161';
  if(document.documentElement.getAttribute('data-gm-home-filter-results-cleanup')===PATCH_ID)return;
  document.documentElement.setAttribute('data-gm-home-filter-results-cleanup',PATCH_ID);

  var forbidden=[
    'dor','febre','alergia','nausea','nauseas','vomitos','azia refluxo','constipacao',
    'analgesicos','anti inflamatorios','antibioticos','antifungicos','antivirais','anti histaminicos','antiemeticos',
    'anti hipertensivos','antidiabeticos','anticoagulantes','antiagregantes','anticonvulsivantes','antidepressivos',
    'ansioliticos','antipsicoticos','corticoides','broncodilatadores','antiasmaticos','antiacidos','protetores gastricos',
    'laxantes','antidiarreicos','diureticos','hormonios','vitaminas e suplementos','medicamentos obstetricos',
    'agenda','checklists','calculadoras','favoritos','lembretes','inicio','obstetricia','pre natal','protocolos','perfil'
  ];

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  }

  function clean(){
    var list=document.querySelector('#gm-home-filter-results .gm-home-results-list');
    if(!list)return;
    Array.prototype.slice.call(list.querySelectorAll('.gm-home-result-card')).forEach(function(card){
      var text=normalize(card.textContent);
      if(forbidden.indexOf(text)!==-1)card.remove();
    });
    if(!list.querySelector('.gm-home-result-card')&&!list.querySelector('.gm-home-results-empty')){
      var empty=document.createElement('div');
      empty.className='gm-home-results-empty';
      empty.textContent='Nenhum medicamento encontrado para esta categoria.';
      list.appendChild(empty);
    }
  }

  document.addEventListener('click',function(event){
    var chip=event.target&&event.target.closest?event.target.closest('.gm-home-filter-chip'):null;
    if(!chip)return;
    [80,160,280,450].forEach(function(delay){setTimeout(clean,delay);});
  },true);

  new MutationObserver(clean).observe(document.documentElement,{childList:true,subtree:true});
})();
