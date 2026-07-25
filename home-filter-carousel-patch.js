(function(){
'use strict';
var PATCH_ID='gestamed-home-filter-carousel-2026-07-25-162';
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
'Medicamentos obstétricos':['Ácido fólico','Sulfato ferroso','Cálcio','Ácido acetilsalicílico','Progesterona','Nifedipino','Sulfato de magnésio','Metildopa','Labetalol','Hidralazina','Insulina','Oxitocina','Misoprostol','Metilergometrina','Ácido tranexâmico','Betametasona','Dexametasona','Penicilina benzatina','Imunoglobulina anti-D']
};

function findSearchInput(){return document.querySelector('#searchInput, input[type="search"]:not(#gm-home-search), input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');}
function keepHome(){var h=document.getElementById('gm-home-screen'),w=document.getElementById('gm-welcome-screen');if(w)w.classList.add('gm-welcome-hidden');if(h){h.classList.remove('gm-home-hidden');h.style.setProperty('display','flex','important');}document.documentElement.classList.add('gm-home-active');}
function openMedicine(name){var original=findSearchInput(),homeSearch=document.getElementById('gm-home-search'),home=document.getElementById('gm-home-screen');if(!original)return;if(homeSearch)homeSearch.value=name;original.value=name;['input','change','keyup'].forEach(function(t){original.dispatchEvent(new Event(t,{bubbles:true}));});try{if(typeof applyFilters==='function')applyFilters();}catch(e){}if(home){home.style.removeProperty('display');home.classList.add('gm-home-hidden');}document.documentElement.classList.remove('gm-home-active','gm-home-filter-mode');setTimeout(function(){try{original.focus();}catch(e){}},30);}
function ensurePanel(){var canvas=document.getElementById('gm-home-canvas');if(!canvas)return null;var p=document.getElementById('gm-home-filter-results');if(!p){p=document.createElement('section');p.id='gm-home-filter-results';p.innerHTML='<div class="gm-home-results-head"><strong></strong><button type="button" aria-label="Fechar resultados">×</button></div><div class="gm-home-results-list"></div>';p.querySelector('button').onclick=function(){p.classList.remove('gm-home-results-open');document.documentElement.classList.remove('gm-home-filter-mode');};canvas.appendChild(p);}return p;}
function showGroup(label,button){keepHome();document.documentElement.classList.add('gm-home-filter-mode');document.querySelectorAll('.gm-home-filter-chip').forEach(function(x){x.classList.remove('gm-home-filter-active');});button.classList.add('gm-home-filter-active');var p=ensurePanel(),list=p.querySelector('.gm-home-results-list'),items=groups[label]||[];p.querySelector('strong').textContent=label;list.innerHTML='';items.forEach(function(name){var b=document.createElement('button');b.type='button';b.className='gm-home-result-card';b.textContent=name;b.onclick=function(){openMedicine(name);};list.appendChild(b);});p.classList.add('gm-home-results-open');}
function style(){if(document.getElementById('gm-home-filter-carousel-style'))document.getElementById('gm-home-filter-carousel-style').remove();var s=document.createElement('style');s.id='gm-home-filter-carousel-style';s.textContent='#gm-home-filter-carousel{position:absolute;z-index:12;left:0;top:29.95%;width:100%;height:5.65%;display:flex;align-items:center;gap:10px;overflow-x:auto;overflow-y:hidden;padding:0 3.3%;box-sizing:border-box;background:linear-gradient(180deg,#fff7f9,#fff4f7);-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;scrollbar-width:none}#gm-home-filter-carousel::-webkit-scrollbar{display:none}.gm-home-filter-chip{flex:0 0 auto;scroll-snap-align:center;display:inline-flex;align-items:center;gap:7px;height:66%;min-height:34px;padding:0 15px;border:1.6px solid #cdebf4;border-radius:999px;background:#f7fcff;color:#245b78;font:700 clamp(11px,2.45vw,17px)/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 3px 9px rgba(68,86,110,.10)}.gm-home-filter-active{transform:scale(1.04);box-shadow:0 0 0 3px rgba(239,79,145,.16),0 6px 13px rgba(63,34,50,.16)}.gm-home-filter-divider{flex:0 0 2px;width:2px;height:56%;background:#d88baa;border-radius:9px;margin:0 2px}#gm-home-filter-results{display:none;position:absolute;z-index:30;left:3.2%;right:3.2%;top:35.4%;bottom:6.8%;background:#fff;border:1px solid #f3c8d8;border-radius:24px;box-shadow:0 18px 45px rgba(83,34,60,.22);overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}#gm-home-filter-results.gm-home-results-open{display:flex;flex-direction:column}.gm-home-results-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;background:#fff5f8;border-bottom:1px solid #f4d6e1;color:#8a2857;font-size:18px}.gm-home-results-head button{width:40px;height:40px;border:0;border-radius:50%;background:#f8e3eb;color:#a2265d;font-size:28px}.gm-home-results-list{overflow:auto;padding:12px;display:flex;flex-direction:column;gap:9px}.gm-home-result-card{width:100%;text-align:left;border:1px solid #ead9e1;background:#fff;border-radius:16px;padding:15px;color:#172033;font-size:16px;font-weight:750;box-shadow:0 2px 7px rgba(30,41,59,.06)}';document.head.appendChild(s);}
function build(){var canvas=document.getElementById('gm-home-canvas');if(!canvas)return false;var old=document.getElementById('gm-home-filter-carousel');if(old)old.remove();var oldPanel=document.getElementById('gm-home-filter-results');if(oldPanel)oldPanel.remove();style();var strip=document.createElement('div');strip.id='gm-home-filter-carousel';filters.forEach(function(f,i){if(i===7){var d=document.createElement('span');d.className='gm-home-filter-divider';strip.appendChild(d);}var b=document.createElement('button');b.type='button';b.className='gm-home-filter-chip';b.setAttribute('aria-label',f[0]);b.innerHTML='<span>'+f[1]+'</span><span>'+f[0]+'</span>';b.onclick=function(e){e.preventDefault();e.stopPropagation();showGroup(f[0],b);};strip.appendChild(b);});canvas.appendChild(strip);ensurePanel();return true;}
var tries=0;(function start(){tries++;if(build()||tries>100)return;setTimeout(start,120);})();
})();