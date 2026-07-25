(function(global){
  'use strict';
  var BASE_URL='medicamentos-core.txt?v=20260725-140';
  var loading=null;

  function execute(code){
    (0,eval)(String(code||''));
    if(!global.GestaMedMedications){
      throw new Error('A base foi lida, mas a API de medicamentos não foi criada.');
    }
    return global.GestaMedMedications;
  }

  function load(){
    if(global.GestaMedMedications)return Promise.resolve(global.GestaMedMedications);
    if(loading)return loading;
    loading=fetch(BASE_URL,{cache:'no-store'})
      .then(function(response){
        if(!response.ok)throw new Error('Falha ao baixar a base de medicamentos.');
        return response.text();
      })
      .then(execute)
      .catch(function(error){loading=null;throw error;});
    return loading;
  }

  global.GestaMedMedicationLoader={load:load,url:BASE_URL};
})(window);