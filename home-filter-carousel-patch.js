(function(){
'use strict';
var PATCH_ID='gestamed-home-filter-carousel-2026-07-25-165';
document.documentElement.setAttribute('data-gm-home-filter-carousel',PATCH_ID);

var filters=[
['Dor','🤕',true],['Febre','🌡️',true],['Náuseas','🤢',true],['Vômitos','🤮',true],['Azia/Refluxo','🔥',true],['Alergia','🌿',true],['Constipação','🚻',true],
['Analgésicos','🩹'],['Anti-inflamatórios','🧊'],['Antibióticos','💊'],['Antifúngicos','🍄'],['Antivirais','🛡️'],['Anti-histamínicos','🤧'],['Antieméticos','🤢'],['Anti-hipertensivos','❤️'],['Antidiabéticos','🩸'],['Anticoagulantes','🧬'],['Antiagregantes','🩹'],['Anticonvulsivantes','🧠'],['Antidepressivos','☀️'],['Ansiolíticos','🕊️'],['Antipsicóticos','💭'],['Corticoides','🧪'],['Broncodilatadores','🫁'],['Antiasmáticos','🌬️'],['Antiácidos','🔥'],['Protetores gástricos','🛡️'],['Laxantes','🚻'],['Antidiarreicos','💧'],['Diuréticos','🚰'],['Hormônios','⚗️'],['Vitaminas e suplementos','🍊'],['Medicamentos obstétricos','🤰']
];

var groups={
'Dor':['Paracetamol','Dipirona','Codeína','Tramadol'],
'Febre':['Paracetamol','Dipirona'],
'Náuseas':['Piridoxina','Doxilamina','Metoclopramida','Ondansetrona','Dimenidrinato'],
'Vômitos':['Piridoxina','Doxilamina','Metoclopramida','Ondansetrona','Dimenidrinato'],
'Azia/Refluxo':['Hidróxido de alumínio','Carbonato de cálcio','Famotidina','Omeprazol','Pantoprazol'],
'Alergia':['Loratadina','Cetirizina','Dexclorfeniramina','Fexofenadina','Prometazina'],
'Constipação':['Psyllium','Lactulose','Macrogol','Glicerina','Bisacodil'],
'Analgésicos':['Paracetamol','Dipirona','Codeína','Tramadol'],
'Anti-inflamatórios':['Ibuprofeno','Naproxeno','Diclofenaco','Cetoprofeno','Meloxicam'],
'Antibióticos':['Amoxicilina','Cefalexina','Azitromicina','Nitrofurantoína','Fosfomicina','Clindamicina'],
'Antifúngicos':['Nistatina','Clotrimazol','Miconazol','Fluconazol','Terbinafina'],
'Antivirais':['Aciclovir','Valaciclovir','Oseltamivir','Zidovudina','Tenofovir'],
'Anti-histamínicos':['Loratadina','Cetirizina','Dexclorfeniramina','Fexofenadina','Prometazina'],
'Antieméticos':['Piridoxina','Doxilamina','Metoclopramida','Ondansetrona','Dimenidrinato'],
'Anti-hipertensivos':['Metildopa','Nifedipino','Labetalol','Hidralazina','Amlodipino'],
'Antidiabéticos':['Insulina NPH','Insulina regular','Metformina','Glibenclamida'],
'Anticoagulantes':['Enoxaparina','Heparina não fracionada','Dalteparina','Fondaparinux','Varfarina'],
'Antiagregantes':['Ácido acetilsalicílico','Clopidogrel','Dipiridamol'],
'Anticonvulsivantes':['Lamotrigina','Levetiracetam','Carbamazepina','Fenitoína','Ácido valproico'],
'Antidepressivos':['Sertralina','Fluoxetina','Escitalopram','Amitriptilina','Bupropiona'],
'Ansiolíticos':['Buspirona','Diazepam','Clonazepam','Lorazepam','Hidroxizina'],
'Antipsicóticos':['Quetiapina','Olanzapina','Risperidona','Haloperidol','Aripiprazol'],
'Corticoides':['Prednisona','Prednisolona','Betametasona','Dexametasona','Hidrocortisona'],
'Broncodilatadores':['Salbutamol','Fenoterol','Ipratrópio','Formoterol','Salmeterol'],
'Antiasmáticos':['Budesonida','Beclometasona','Fluticasona','Montelucaste','Salbutamol'],
'Antiácidos':['Hidróxido de alumínio','Hidróxido de magnésio','Carbonato de cálcio','Alginato de sódio'],
'Protetores gástricos':['Omeprazol','Pantoprazol','Esomeprazol','Famotidina','Sucralfato'],
'Laxantes':['Psyllium','Lactulose','Macrogol','Glicerina','Bisacodil'],
'Antidiarreicos':['Sais de reidratação oral','Racecadotrila','Loperamida','Subsalicilato de bismuto'],
'Diuréticos':['Hidroclorotiazida','Furosemida','Espironolactona','Clortalidona'],
'Hormônios':['Levotiroxina','Progesterona','Insulina','Desmopressina'],
'Vitaminas e suplementos':['Ácido fólico','Sulfato ferroso','Cálcio','Vitamina D','Vitamina B12','Iodo'],
'Medicamentos obstétricos':['Ácido fólico','Sulfato ferroso','Cálcio','Ácido acetilsalicílico','Progesterona','Nifedipino','Sulfato de magnésio','Metildopa','Labetal','Hidralazina','Insulina','Oxitocina','Misoprostol','Metilergometrina','Ácido tranexâmico','Betametasona','Dexametasona','Penicilina benzatina','Imunoglobulina anti-D']
};

var classByCategory={
'Dor':'Analgésico','Febre':'Antitérmico','Náuseas':'Antiemético','Vômitos':'Antiemético','Azia/Refluxo':'Tratamento gastrointestinal','Alergia':'Anti-histamínico','Constipação':'Laxante',
'Analgésicos':'Analgésico','Anti-inflamatórios':'Anti-inflamatório','Antibióticos':'Antibiótico','Antifúngicos':'Antifúngico','Antivirais':'Antiviral','Anti-histamínicos':'Anti-histamínico','Antieméticos':'Antiemético','Anti-hipertensivos':'Anti-hipertensivo','Antidiabéticos':'Antidiabético','Anticoagulantes':'Anticoagulante','Antiagregantes':'Antiagregante plaquetário','Anticonvulsivantes':'Anticonvulsivante','Antidepressivos':'Antidepressivo','Ansiolíticos':'Ansiolítico','Antipsicóticos':'Antipsicótico','Corticoides':'Corticoide','Broncodilatadores':'Broncodilatador','Antiasmáticos':'Antiasmático','Antiácidos':'Antiácido','Protetores gástricos':'Protetor gástrico','Laxantes':'Laxante','Antidiarreicos':'Antidiarreico','Diuréticos':'Diurético','Hormônios':'Hormônio','Vitaminas e suplementos':'Vitamina ou suplemento','Medicamentos obstétricos':'Uso obstétrico'
};

function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();}
function first(obj,keys){for(var i=0;i<keys.length;i++){var v=obj&&obj[keys[i]];if(v!==undefined&&v!==null&&String(v).trim())return String(v).trim();}return '';}
function locateData(name){
 var target=norm(name),keys=Object.keys(window),found=null;
 for(var i=0;i<keys.length&&!found;i++){
  var value;try{value=window[keys[i]];}catch(e){continue;}
  if(!Array.isArray(value)||!value.length||value.length>6000)continue;
  for(var j=0;j<value.length;j++){
   var item=value[j];if(!item||typeof item!=='object')continue;
   var candidate=first(item,['nome','name','medicamento','principioAtivo','principio_ativo','drug']);
   if(norm(candidate)===target){found=item;break;}
  }
 }
 return found;
}
function infoFor(name,category,index){
 var data=locateData(name)||{};
 var classe=first(data,['classe','class','categoria','subtitulo','grupo','tipo'])||classByCategory[category]||'Medicamento';
 var status=first(data,['decisao','decisão','status','recomendacao','recomendação','classificacao','classificação','resumoDecisao','resumo_decisao']);
 if(!status)status=index===0?'Preferencial':'Pode ser utilizado';
 if(status.length>42)status=status.slice(0,39)+'…';
 var note=first(data,['orientacao','orientação','observacao','observação','resumo','descricao','descrição','alerta','indicacao','indicação']);
 if(!note)note='Consulte a ficha completa para indicação, dose e segurança em cada período da gestação.';
 if(note.length>155)note=note.slice(0,152)+'…';
 return {classe:classe,status:status,note:note};
}
function tone(status){var s=norm(status);if(s.indexOf('prefer')>=0)return 'preferred';if(s.indexOf('evitar')>=0||s.indexOf('contra')>=0)return 'avoid';if(s.indexOf('especific')>=0||s.indexOf('cautela')>=0)return 'caution';return 'allowed';}
function keepHome(){var h=document.getElementById('gm-home-screen'),w=document.getElementById('gm-welcome-screen');if(w)w.classList.add('gm-welcome-hidden');if(h){h.classList.remove('gm-home-hidden');h.style.setProperty('display','flex','important');}document.documentElement.classList.add('gm-home-active');}
function ensurePanel(){var p=document.getElementById('gm-home-filter-results');if(!p){p=document.createElement('section');p.id='gm-home-filter-results';p.innerHTML='<div class="gm-home-results-head"><button class="gm-category-back" type="button">← Voltar</button><button class="gm-category-close" type="button" aria-label="Fechar">×</button></div><div class="gm-category-body"><h2></h2><div class="gm-category-intro">💊 Medicações que podem ser utilizadas, conforme a necessidade e avaliação médica, para esse quadro na gestação.</div><div class="gm-home-results-list"></div></div>';var close=function(){p.classList.remove('gm-home-results-open');document.documentElement.classList.remove('gm-home-filter-mode');};p.querySelector('.gm-category-back').onclick=close;p.querySelector('.gm-category-close').onclick=close;document.body.appendChild(p);}return p;}
function showGroup(label,button){keepHome();document.documentElement.classList.add('gm-home-filter-mode');document.querySelectorAll('.gm-home-filter-chip').forEach(function(x){x.classList.remove('gm-home-filter-active');});if(button)button.classList.add('gm-home-filter-active');var p=ensurePanel(),list=p.querySelector('.gm-home-results-list'),items=groups[label]||[];p.querySelector('h2').textContent=label;list.innerHTML='';items.forEach(function(name,index){var meta=infoFor(name,label,index),b=document.createElement('button');b.type='button';b.className='gm-home-result-card';b.setAttribute('data-medication-name',name);b.innerHTML='<div class="gm-med-card-top"><strong>'+name+'</strong><span class="gm-med-status '+tone(meta.status)+'">'+meta.status+'</span></div><div class="gm-med-class">'+meta.classe+'</div><p>'+meta.note+'</p>';list.appendChild(b);});p.classList.add('gm-home-results-open');}
function style(){var old=document.getElementById('gm-home-filter-carousel-style');if(old)old.remove();var s=document.createElement('style');s.id='gm-home-filter-carousel-style';s.textContent='#gm-home-filter-results{display:none;position:fixed;z-index:2147483300;inset:0;background:#fff;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}#gm-home-filter-results.gm-home-results-open{display:flex;flex-direction:column}.gm-home-results-head{display:flex;align-items:center;justify-content:space-between;padding:max(18px,env(safe-area-inset-top)) 22px 8px;background:#fff}.gm-category-back{border:0;border-radius:999px;background:#f3f6fa;color:#334155;padding:10px 15px;font-size:15px;font-weight:750}.gm-category-close{width:42px;height:42px;border:0;border-radius:50%;background:#f4f7fb;color:#1681e8;font-size:28px}.gm-category-body{overflow:auto;padding:0 18px 28px}.gm-category-body h2{font-size:25px;margin:4px 0 12px;color:#172033}.gm-category-intro{border:2px solid #6ecafa;background:#dff3ff;border-radius:18px;padding:15px 16px;color:#15577e;font-size:16px;font-weight:750;line-height:1.45;margin-bottom:14px}.gm-home-results-list{display:flex;flex-direction:column;gap:10px}.gm-home-result-card{width:100%;text-align:left;border:1px solid #d9e2ea;background:#fff;border-radius:19px;padding:15px 16px;color:#172033;box-shadow:0 4px 14px rgba(30,41,59,.06)}.gm-med-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.gm-med-card-top strong{font-size:20px;line-height:1.15}.gm-med-status{flex:0 0 auto;border-radius:999px;padding:7px 11px;font-size:13px;font-weight:800}.gm-med-status.preferred{background:#d8fae4;color:#18813d}.gm-med-status.allowed{background:#dff2ff;color:#0873aa}.gm-med-status.caution{background:#fff0d5;color:#bf4a12}.gm-med-status.avoid{background:#ffe0e4;color:#b71932}.gm-med-class{color:#71809a;font-size:15px;margin-top:4px}.gm-home-result-card p{margin:10px 0 0;color:#334155;font-size:15px;line-height:1.42}';document.head.appendChild(s);}
function build(){style();ensurePanel();window.GestaMedShowFilterGroup=showGroup;return true;}
var tries=0;(function start(){tries++;if(build()||tries>100)return;setTimeout(start,120);})();
})();