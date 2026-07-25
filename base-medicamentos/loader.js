(function(global){
  'use strict';
  var BASE_URL='base-medicamentos/medicamentos-core.js?v=20260724-139';
  var loading=null;

  function load(){
    if(global.GestaMedMedications)return Promise.resolve(global.GestaMedMedications);
    if(loading)return loading;
    loading=new Promise(function(resolve,reject){
      var script=document.createElement('script');
      script.src=BASE_URL;
      script.async=true;
      script.onload=function(){
        if(global.GestaMedMedications)resolve(global.GestaMedMedications);
        else reject(new Error('A base de medicamentos foi carregada, mas a API não foi encontrada.'));
      };
      script.onerror=function(){reject(new Error('Não foi possível carregar a base de medicamentos.'))};
      document.head.appendChild(script);
    });
    return loading;
  }

  global.GestaMedMedicationLoader={load:load,url:BASE_URL};
})(window);
