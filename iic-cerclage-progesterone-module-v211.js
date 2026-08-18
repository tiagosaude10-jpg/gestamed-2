(function(){
'use strict';

var ROOT_ID='gm-iic-cerclage-screen';
var STYLE_ID='gm-iic-cerclage-style';
var MODULE_BUTTON_ID='gm-iic-cerclage-command-button';

function flow(){return document.getElementById('gm-app-flow');}
function screen(name){var f=flow();return f?f.querySelector('.gm-flow-screen[data-screen="'+name+'"]'):null;}
function activate(name){
  var f=flow();if(!f)return;
  f.classList.remove('gm-flow-hidden');
  f.setAttribute('data-screen',name);
  f.querySelectorAll('.gm-flow-screen').forEach(function(el){el.classList.toggle('gm-screen-active',el.getAttribute('data-screen')===name);});
  document.body.classList.add('gm-flow-active');
  var active=screen(name);if(active)active.scrollTop=0;
}
function home(){activate('home');}
function clickHomeControl(selector){home();window.setTimeout(function(){var el=document.querySelector('#gm-app-flow [data-screen="home"] '+selector);if(el)el.click();},20);}
function escapeHtml(value){return String(value||'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}

var TOPICS={
  iic:{title:'Insuficiência istmocervical',subtitle:'Reconheça a apresentação clássica',icon:'🤰'},
  difference:{title:'Entenda a diferença',subtitle:'IIC × colo curto × trabalho de parto prematuro',icon:'↔'},
  cerclage:{title:'Cerclagem',subtitle:'Indicações, tipos, contraindicações e retirada',icon:'🧵'},
  progesterone:{title:'Progesterona',subtitle:'Quando usar e quais números memorizar',icon:'💊'},
  algorithm:{title:'Algoritmo de conduta',subtitle:'Passo a passo para decidir a conduta',icon:'⌘'},
  reasoning:{title:'Raciocínio rápido',subtitle:'Associações para prova e prática',icon:'⚡'},
  cases:{title:'Casos clínicos',subtitle:'Cinco cenários para fixação',icon:'📚'},
  traps:{title:'Pegadinhas de prova',subtitle:'Erros clássicos que você deve evitar',icon:'⚠'},
  memorize:{title:'O que decorar',subtitle:'10 pontos + resumo de 30 segundos',icon:'🎯'}
};

function card(title,body,accent){return '<section class="gm-iic-card '+(accent||'')+'"><h3>'+title+'</h3>'+body+'</section>';}
function bullet(items){return '<ul>'+items.map(function(item){return '<li>'+item+'</li>';}).join('')+'</ul>';}
function alertBox(title,body,kind){return '<aside class="gm-iic-alert '+(kind||'')+'"><strong>'+title+'</strong><p>'+body+'</p></aside>';}
function arrowFlow(items){return '<div class="gm-iic-flow">'+items.map(function(item,index){return '<div class="gm-iic-flow-item">'+item+'</div>'+(index<items.length-1?'<div class="gm-iic-flow-arrow">↓</div>':'');}).join('')+'</div>';}
function metric(value,label,note){return '<article class="gm-iic-metric"><strong>'+value+'</strong><span>'+label+'</span>'+(note?'<small>'+note+'</small>':'')+'</article>';}

function iicMarkup(){
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">🤰</span><div><h2>Insuficiência istmocervical</h2><p>Como reconhecer o quadro clínico clássico</p></div></div>'+
    card('O que é?','<p>A insuficiência istmocervical, também chamada de <b>insuficiência cervical</b>, é a incapacidade funcional do colo uterino de manter adequadamente a gestação.</p>'+alertBox('Apresentação clássica','<b>Dilatação cervical indolor no segundo trimestre, sem trabalho de parto.</b>','pink')+arrowFlow(['Dilatação cervical','Protrusão das membranas','Rotura das membranas','Perda gestacional tardia ou parto prematuro']))+
    alertBox('Palavra-chave','<b>DILATAÇÃO INDOLOR</b><br>Perda gestacional no segundo trimestre associada a dilatação cervical com pouca ou nenhuma dor e sem contrações significativas deve fazer pensar imediatamente em insuficiência istmocervical.','strong')+
    card('História clínica clássica',bullet(['Abortamento tardio.','Perda gestacional recorrente no segundo trimestre.','Parto prematuro muito precoce.','Dilatação cervical sem dor.','Pouca ou nenhuma atividade uterina.','Pouca hemorragia.','Protrusão das membranas.','Rotura prematura das membranas seguida de expulsão fetal.'])+alertBox('Exemplo','“Na gestação anterior eu estava com 19 semanas, sem contrações e praticamente sem dor. Quando fui examinada, já estava com dilatação cervical e a bolsa estava aparecendo.”<br><br><b>Diagnóstico mais provável: insuficiência istmocervical.</b>','green'))+
    card('Como investigar a história',bullet(['Com quantas semanas aconteceu?','Houve dor?','Houve contrações?','O colo estava dilatado?','A dilatação aconteceu antes das contrações?','Houve protrusão das membranas?','Houve rotura das membranas?','Houve sangramento importante?','Existia infecção?','O feto apresentava malformações?','Como começou o trabalho de parto?'])+alertBox('Lembrete','Não diagnostique insuficiência istmocervical apenas porque a paciente teve um parto prematuro. É necessário compreender <b>como ocorreu o evento obstétrico anterior</b>.','amber'));
}

function differenceMarkup(){
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">↔</span><div><h2>Entenda a diferença</h2><p>IIC, colo curto e trabalho de parto prematuro</p></div></div>'+
    alertBox('Atenção','<b>Colo curto não é sinônimo de insuficiência istmocervical.</b> Essa diferenciação é fundamental.','strong')+
    '<div class="gm-iic-compare">'+
      '<article><span>🤰</span><h3>IIC</h3><b>Dilatação cervical indolor</b><p>Geralmente ocorre no segundo trimestre e pode apresentar perdas gestacionais tardias recorrentes.</p></article>'+
      '<article><span>📏</span><h3>Colo curto</h3><b>Diagnóstico ultrassonográfico</b><p>O comprimento cervical é medido preferencialmente por <b>ultrassonografia transvaginal</b>. No segundo trimestre, considera-se colo curto quando o comprimento cervical é <b>≤ 25 mm</b>. Isso não significa automaticamente IIC.</p></article>'+
      '<article><span>⏱</span><h3>Trabalho de parto prematuro</h3><b>Atividade uterina regular + alteração cervical</b><p>Exemplo: 29 semanas, contrações regulares e colo dilatando progressivamente → pensar em trabalho de parto prematuro, e não em IIC clássica.</p></article>'+
    '</div>';
}

function cerclageMarkup(){
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">🧵</span><div><h2>Cerclagem</h2><p>Quando pensar, quando realizar e quando evitar</p></div></div>'+
    card('O que é?','<p>Cerclagem cervical é um procedimento cirúrgico utilizado em pacientes selecionadas para reforçar mecanicamente o colo uterino e reduzir o risco de perda gestacional ou parto prematuro relacionado à insuficiência cervical.</p>')+
    '<h3 class="gm-iic-section-label">Quando pensar em cerclagem?</h3><div class="gm-iic-stack">'+
      '<article class="gm-iic-scenario"><span class="gm-iic-number">1</span><div><h3>Indicada pela história</h3><p>Também chamada de <b>cerclagem profilática ou eletiva</b>. É realizada preventivamente em paciente com história obstétrica fortemente sugestiva de IIC.</p><div class="gm-iic-example"><b>Exemplo clássico</b><span>Duas perdas anteriores, com 18 e 20 semanas, após dilatação cervical indolor e sem trabalho de parto significativo.</span><strong>Conduta: cerclagem eletiva.</strong></div></div></article>'+
      '<article class="gm-iic-scenario"><span class="gm-iic-number">2</span><div><h3>Indicada por alteração cervical</h3><p>O encurtamento cervical deve ser interpretado juntamente com história obstétrica, idade gestacional, presença ou ausência de dilatação e antecedentes de parto prematuro espontâneo.</p>'+alertBox('Atenção','<b>Colo curto isoladamente não significa indicação automática de cerclagem.</b> Em gestante sem antecedente de parto prematuro espontâneo, com colo entre 10 e 25 mm e sem dilatação cervical, a SMFM recomenda não realizar cerclagem rotineiramente.','amber')+'</div></article>'+
      '<article class="gm-iic-scenario"><span class="gm-iic-number">3</span><div><h3>Cerclagem de emergência</h3><p>Também chamada de <b>cerclagem de resgate</b> ou cerclagem indicada pelo exame físico.</p><div class="gm-iic-example"><b>Exemplo</b><span>21 semanas, colo dilatado, membranas visíveis ou protrusas, ausência de trabalho de parto ativo, ausência de sinais clínicos de infecção e feto vivo.</span><strong>Pode ser considerada cerclagem de emergência/resgate, após avaliação obstétrica criteriosa.</strong></div></div></article>'+
    '</div>'+
    card('Quando realizar a cerclagem eletiva?','<p>Na orientação clássica utilizada pela FEBRASGO: <b>entre 12 e 16 semanas</b>, preferencialmente após avaliação ultrassonográfica do primeiro trimestre demonstrando vitalidade fetal e afastando grandes malformações.</p>'+alertBox('Para prova','<b>IIC conhecida + nova gestação → avaliar 1º trimestre → cerclagem eletiva aproximadamente entre 12 e 16 semanas.</b>','green'))+
    card('Antes de fazer cerclagem de resgate',bullet(['Presença de contrações uterinas.','Trabalho de parto.','Infecção intra-amniótica/corioamnionite.','Sangramento importante.','Integridade das membranas.','Vitalidade fetal.','Idade gestacional.','Grau de dilatação cervical.'])+alertBox('Não é simplesmente','“Colo aberto = fazer cerclagem”.','amber'))+
    card('Quando não fazer cerclagem?',bullet(['Trabalho de parto ativo.','Suspeita de corioamnionite ou infecção intra-amniótica.','Sangramento obstétrico significativo.','Comprometimento fetal importante.','Situações relacionadas à rotura das membranas em que o procedimento não seja apropriado.'])+'<p>A avaliação deve ser individualizada.</p>')+
    card('Técnicas de cerclagem','<div class="gm-iic-techniques"><article><b>McDonald</b><span>Técnica vaginal mais utilizada. Sutura circunferencial ao redor do colo uterino.</span><strong>Para prova: técnica mais utilizada → McDonald.</strong></article><article><b>Shirodkar</b><span>Também realizada por via vaginal e exige maior dissecção dos tecidos cervicais.</span></article><article><b>Transabdominal</b><span>Reservada para casos selecionados e não corresponde à primeira escolha na maioria das pacientes.</span></article></div>')+
    card('Quando retirar a cerclagem?','<p>Na cerclagem vaginal, geralmente <b>por volta de 37 semanas</b>. Pode ser necessário retirar antes em situações como trabalho de parto, necessidade obstétrica e determinadas situações envolvendo rotura das membranas ou comprometimento fetal.</p>')+
    alertBox('Repouso absoluto é obrigatório?','<b>Não.</b> Repouso absoluto rotineiro não é considerado tratamento da insuficiência istmocervical e não deve ser automaticamente prescrito após cerclagem.','green');
}

function progesteroneMarkup(){
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">💊</span><div><h2>Progesterona</h2><p>Prevenção do parto prematuro em situações específicas</p></div></div>'+
    card('Qual é o papel da progesterona?','<p>O principal cenário que você precisa dominar é: <b>gestação única + paciente assintomática + colo curto identificado antes de 24 semanas.</b></p>')+
    '<div class="gm-iic-metrics">'+metric('25 mm','Definição de colo curto','Comprimento cervical ≤25 mm no segundo trimestre.')+metric('20 mm','Progesterona recomendada','Gestação única, assintomática, sem antecedente de parto prematuro e antes de 24 semanas.')+metric('21–25 mm','Considerar progesterona','Decisão clínica compartilhada.')+'</div>'+
    card('Primeiro número para memorizar — 25 mm','<p>Comprimento cervical <b>≤25 mm</b> é utilizado para definir <b>colo curto</b> no segundo trimestre em gestação única, particularmente no contexto de pacientes sem antecedente de parto prematuro espontâneo.</p>')+
    card('Segundo número para memorizar — 20 mm','<p>Paciente com gestação única, assintomática, sem antecedente de parto prematuro, antes de 24 semanas e comprimento cervical <b>≤20 mm</b>.</p>'+alertBox('Conduta','<b>Progesterona vaginal.</b> Essa recomendação possui forte evidência para redução do risco de parto prematuro.','green'))+
    card('E se o colo tiver 21–25 mm?','<p>Em gestação única, assintomática e sem parto prematuro anterior: <b>considerar progesterona vaginal</b>, por meio de decisão clínica compartilhada.</p>')+
    card('Resumo prático — sem antecedente de parto prematuro espontâneo','<div class="gm-iic-decision-list"><article><b>Colo &gt;25 mm</b><span>Não é considerado colo curto por esse critério → acompanhamento conforme risco obstétrico.</span></article><article><b>Colo 21–25 mm</b><span>→ considerar progesterona vaginal.</span></article><article><b>Colo ≤20 mm antes de 24 semanas</b><span>→ progesterona vaginal recomendada.</span></article><article><b>Colo 10–25 mm + sem dilatação cervical</b><span>→ não indicar cerclagem rotineiramente apenas pelo achado de colo curto.</span></article></div>')+
    alertBox('Toda paciente com parto prematuro anterior deve usar progesterona?','<b>Não.</b> Progesterona vaginal não deve ser considerada profilaxia universal simplesmente porque houve parto prematuro espontâneo anterior. Em paciente com antecedente de parto prematuro, gestação única e <b>colo encurtado</b>, a progesterona vaginal pode ser considerada. Na ausência de colo encurtado, sua eficácia não está demonstrada para prevenção da recorrência.','amber')+
    alertBox('E a 17-OH progesterona?','Questões antigas podem mencionar <b>17-alfa-hidroxiprogesterona caproato — 17-OHPC.</b> Atualmente, <b>não é recomendada para prevenção primária do parto prematuro recorrente</b> e também não é recomendada para tratamento de colo curto.','strong');
}

function algorithmMarkup(){
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">⌘</span><div><h2>Algoritmo de conduta</h2><p>Decisão sequencial em quatro passos</p></div></div>'+
    '<div class="gm-iic-steps">'+
      '<article><span>1</span><div><h3>Existe história clássica de IIC?</h3><p>Pergunte: perda no segundo trimestre? dilatação indolor? pouca ou nenhuma contração? repetição do quadro?</p><strong>SIM → pensar em IIC → avaliar indicação de cerclagem eletiva/profilática → quando indicada, programar no início do segundo trimestre após avaliação ultrassonográfica do primeiro trimestre.</strong></div></article>'+
      '<article><span>2</span><div><h3>Não existe história clássica de IIC</h3><p>Avalie o <b>comprimento cervical por ultrassonografia transvaginal</b>.</p></div></article>'+
      '<article><span>3</span><div><h3>Gestação única + sem parto prematuro anterior</h3><div class="gm-iic-decision-list"><article><b>Colo &gt;25 mm</b><span>Não caracteriza colo curto pelo ponto de corte usual.</span></article><article><b>Colo 21–25 mm</b><span>Considerar progesterona vaginal.</span></article><article><b>Colo ≤20 mm antes de 24 semanas</b><span>Progesterona vaginal.</span></article><article><b>Colo 10–25 mm sem dilatação</b><span>Não fazer cerclagem rotineiramente apenas pelo colo curto.</span></article></div></div></article>'+
      '<article><span>4</span><div><h3>Colo já está dilatado no segundo trimestre?</h3><p>Se houver dilatação cervical, ausência de trabalho de parto, ausência de infecção e condições maternas e fetais adequadas → <b>avaliar possibilidade de cerclagem de emergência/resgate.</b></p></div></article>'+
    '</div>';
}

function reasoningMarkup(){
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">⚡</span><div><h2>Raciocínio rápido</h2><p>Pense desta forma</p></div></div><div class="gm-iic-reason-grid">'+
    '<article><b>Perda tardia + dilatação indolor</b><span>→ <strong>IIC</strong><br>→ pense em <strong>cerclagem</strong></span></article>'+
    '<article><b>Colo curto no ultrassom</b><span>→ não significa automaticamente IIC.<br>→ avalie história obstétrica.</span></article>'+
    '<article><b>Sem parto prematuro anterior + colo ≤20 mm</b><span>→ <strong>progesterona vaginal</strong></span></article>'+
    '<article><b>Colo dilatado no segundo trimestre + sem trabalho de parto</b><span>→ considerar <strong>cerclagem de resgate</strong></span></article>'+
    '<article><b>Contrações regulares + alteração cervical</b><span>→ pense em <strong>trabalho de parto prematuro</strong><br>→ não é o cenário clássico para cerclagem.</span></article>'+
  '</div>';
}

function casesMarkup(){
  function c(n,title,data,diagnosis,conduct,extra){return '<article class="gm-iic-case"><span class="gm-iic-case-number">'+n+'</span><h3>'+title+'</h3><p>'+data+'</p><div><b>Diagnóstico</b><span>'+diagnosis+'</span></div><div><b>Conduta</b><span>'+conduct+'</span></div>'+(extra?'<aside>'+extra+'</aside>':'')+'</article>';}
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">📚</span><div><h2>Casos clínicos</h2><p>Fixação do raciocínio diagnóstico e da conduta</p></div></div><div class="gm-iic-cases">'+
    c('1','Gestante, 19 semanas','Primeira gestação. Assintomática. USG transvaginal: <b>colo = 18 mm</b>. Sem dilatação cervical.','<b>Colo curto.</b>','<b>Progesterona vaginal.</b>','Por quê? Paciente sem antecedente de parto prematuro e com colo ≤20 mm antes de 24 semanas.<br><b>Não indicar cerclagem rotineira apenas pelo comprimento cervical.</b>')+
    c('2','Gestante, 12 semanas','Antecedentes: perda com 18 semanas e perda com 20 semanas; ambas após dilatação cervical, ausência de contrações e praticamente sem dor.','<b>Insuficiência istmocervical.</b>','<b>Avaliar cerclagem eletiva/profilática.</b>','')+
    c('3','Gestante, 21 semanas','Colo dilatado 3 cm; membranas visíveis; ausência de contrações; afebril; sem sinais clínicos de infecção; feto vivo.','<b>Insuficiência cervical manifesta.</b>','<b>Avaliação para cerclagem de emergência/resgate.</b>','')+
    c('4','Gestante, 29 semanas','Contrações regulares; três contrações em 10 minutos; colo 3 cm; apagamento cervical.','<b>Trabalho de parto prematuro.</b>','Não confundir com insuficiência istmocervical clássica.','')+
    c('5','A questão clássica','Paciente de 32 anos, G3P1A1. Parto prematuro com 28 semanas e perda gestacional com 17 semanas. Gestação atual: <b>11 semanas</b>. A banca interpreta a história como sugestiva de insuficiência cervical.','História interpretada pela banca como sugestiva de IIC.','<b>Realizar avaliação ultrassonográfica do primeiro trimestre e, se adequada, programar cerclagem eletiva.</b>','<b>Atenção crítica:</b> a questão ficaria tecnicamente melhor se informasse como ocorreram as gestações anteriores. É necessário saber se houve dilatação cervical indolor, contrações, dor, rotura de membranas ou sangramento. Apenas saber que houve perda com 17 semanas e parto com 28 semanas <b>não caracteriza sozinho IIC</b>.')+
  '</div>';
}

function trapsMarkup(){
  var traps=[
    ['“Colo curto significa insuficiência istmocervical.”','ERRADO','Colo curto é achado ultrassonográfico.'],
    ['“Toda gestante com colo curto precisa de cerclagem.”','ERRADO','Paciente sem antecedente de parto prematuro, com colo curto e sem dilatação pode ter indicação de progesterona, e não de cerclagem.'],
    ['“Toda paciente com parto prematuro anterior deve usar progesterona.”','ERRADO','Progesterona vaginal não é profilaxia universal apenas pelo antecedente de parto prematuro.'],
    ['“A apresentação clássica da IIC é dor intensa e contrações.”','ERRADO','A característica clássica é dilatação cervical indolor ou pouco dolorosa.'],
    ['“A cerclagem eletiva é realizada no terceiro trimestre.”','ERRADO','Quando indicada por história de IIC, é realizada precocemente, habitualmente aproximadamente entre 12 e 16 semanas.'],
    ['“Colo dilatado com febre e suspeita de corioamnionite é indicação de cerclagem de emergência.”','ERRADO','Primeiro é necessário reconhecer e tratar a situação infecciosa.']
  ];
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">⚠</span><div><h2>Pegadinhas de prova</h2><p>Os seis erros clássicos</p></div></div><div class="gm-iic-traps">'+traps.map(function(t,i){return '<article><span>'+String(i+1).padStart(2,'0')+'</span><div><h3>'+t[0]+'</h3><b>'+t[1]+'</b><p>'+t[2]+'</p></div></article>';}).join('')+'</div>';
}

function memorizeMarkup(){
  var points=[
    '<b>IIC = dilatação cervical indolor no segundo trimestre.</b>',
    'Perda tardia recorrente, pouca dor e pouca contração sugerem IIC.',
    '<b>Colo curto ≠ IIC.</b>',
    'Comprimento cervical deve ser avaliado preferencialmente por <b>USG transvaginal.</b>',
    '<b>≤25 mm = colo curto.</b>',
    'IIC clássica → pensar em <b>cerclagem</b>.',
    'Cerclagem eletiva → geralmente no início do segundo trimestre, aproximadamente <b>12–16 semanas</b>, conforme contexto clínico.',
    'Sem parto prematuro anterior: <b>colo ≤20 mm antes de 24 semanas → progesterona vaginal.</b>',
    'Colo dilatado no segundo trimestre sem trabalho de parto e sem infecção → considerar <b>cerclagem de emergência/resgate</b>.',
    'Técnica vaginal mais utilizada: <b>McDonald.</b>'
  ];
  return '<div class="gm-iic-topic-intro"><span class="gm-iic-topic-icon">🎯</span><div><h2>O que decorar</h2><p>10 pontos para prova</p></div></div><ol class="gm-iic-memory">'+points.map(function(p){return '<li>'+p+'</li>';}).join('')+'</ol>'+
    card('Resumo de 30 segundos',arrowFlow(['<b>IIC</b><br>Dilatação indolor + perda de 2º trimestre','<b>CERCLAGEM</b><br>História clássica de IIC → cerclagem profilática<br>Dilatação cervical atual sem trabalho de parto → avaliar cerclagem de resgate','<b>PROGESTERONA</b><br>Colo curto, principalmente ≤20 mm antes de 24 semanas em gestação única sem parto prematuro anterior → progesterona vaginal','<b>NÃO CONFUNDA</b><br>Colo curto ≠ IIC<br>Parto prematuro anterior ≠ IIC<br>Contrações + alteração cervical = pensar em trabalho de parto prematuro']))+
    alertBox('Frase para memorizar','<b>Perda tardia + dilatação indolor → pense em IIC → pense em cerclagem.</b><br><br><b>Colo curto sem história clássica → pense em progesterona antes de pensar em cerclagem.</b>','strong')+
    card('Referências-base do módulo','<p>Conteúdo estruturado com base em recomendações e materiais da:</p>'+bullet(['FEBRASGO — insuficiência istmocervical e cerclagem.','Society for Maternal-Fetal Medicine — manejo do colo curto.','ACOG — prevenção do parto prematuro recorrente e uso de progesterona.'])+'<p class="gm-iic-disclaimer">O conteúdo possui finalidade educacional e deve ser interpretado juntamente com protocolos institucionais e avaliação obstétrica individual.</p>');
}

var CONTENT={iic:iicMarkup,difference:differenceMarkup,cerclage:cerclageMarkup,progesterone:progesteroneMarkup,algorithm:algorithmMarkup,reasoning:reasoningMarkup,cases:casesMarkup,traps:trapsMarkup,memorize:memorizeMarkup};

function menuMarkup(){
  return '<section class="gm-iic-hero"><div><span class="gm-iic-eyebrow">MÓDULO OBSTETRÍCIA</span><h1>Cerclagem, IIC e Progesterona</h1><p>Como diferenciar insuficiência istmocervical, colo curto e trabalho de parto prematuro.</p></div><img src="gestamed-hero.jpg?v=211" alt="Ilustração de gestante"></section>'+
    '<section class="gm-iic-objectives"><h2>Ao final deste módulo, você deverá saber</h2>'+bullet(['Reconhecer a insuficiência istmocervical.','Diferenciar insuficiência istmocervical de colo curto.','Identificar quando a cerclagem está indicada.','Diferenciar cerclagem eletiva, indicada por ultrassonografia e de emergência.','Saber quando a progesterona vaginal está indicada.','Interpretar corretamente o comprimento cervical.','Evitar as principais pegadinhas de prova.'])+'</section>'+
    '<div class="gm-iic-core-triad"><article><span>🤰</span><b>IIC</b><small>Dilatação indolor</small></article><article><span>🧵</span><b>Cerclagem</b><small>Indicação correta</small></article><article><span>💊</span><b>Progesterona</b><small>Colo curto</small></article></div>'+
    '<h2 class="gm-iic-menu-title">Escolha um tópico</h2><div class="gm-iic-topic-grid">'+Object.keys(TOPICS).map(function(key){var t=TOPICS[key];return '<button type="button" data-iic-topic="'+key+'"><span class="gm-iic-menu-icon">'+t.icon+'</span><span><b>'+escapeHtml(t.title)+'</b><small>'+escapeHtml(t.subtitle)+'</small></span><i>›</i></button>';}).join('')+'</div>';
}

function showMenu(){
  var root=document.getElementById(ROOT_ID);if(!root)return;
  var menu=root.querySelector('.gm-iic-menu');var detail=root.querySelector('.gm-iic-detail');
  if(menu)menu.hidden=false;if(detail){detail.hidden=true;detail.innerHTML='';}
  root.scrollTop=0;
}
function showTopic(key){
  var root=document.getElementById(ROOT_ID);if(!root||!CONTENT[key])return;
  var menu=root.querySelector('.gm-iic-menu');var detail=root.querySelector('.gm-iic-detail');
  if(menu)menu.hidden=true;if(!detail)return;
  detail.hidden=false;detail.innerHTML='<div class="gm-iic-detail-toolbar"><button type="button" data-iic-detail-back>← <b>Tópicos</b></button><span>'+TOPICS[key].icon+' '+escapeHtml(TOPICS[key].title)+'</span><button type="button" data-iic-detail-home aria-label="Início">⌂</button></div>'+CONTENT[key]();
  detail.querySelector('[data-iic-detail-back]').addEventListener('click',showMenu);
  detail.querySelector('[data-iic-detail-home]').addEventListener('click',home);
  root.scrollTop=0;
}
function openModule(){activate('iic-cerclage');showMenu();}

function ensureStyle(){
  if(document.getElementById(STYLE_ID))return;
  var style=document.createElement('style');style.id=STYLE_ID;
  style.textContent=[
    '#'+ROOT_ID+'{background:#fff4f7!important;color:#17233c;}',
    '#'+ROOT_ID+' .gm-iic-shell{box-sizing:border-box;position:relative;width:min(100%,600px);min-height:100%;margin:0 auto;padding:0 14px 92px;background:linear-gradient(180deg,#fff9fb 0%,#fff 45%,#fff5f8 100%);box-shadow:0 0 40px rgba(98,37,65,.12);}',
    '#'+ROOT_ID+' .gm-iic-top{position:sticky;top:0;z-index:30;display:grid;grid-template-columns:42px 1fr 42px;align-items:center;gap:8px;margin:0 -14px 12px;padding:max(9px,env(safe-area-inset-top)) 14px 9px;background:rgba(255,249,252,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(236,87,137,.14);}',
    '#'+ROOT_ID+' .gm-iic-top button,#'+ROOT_ID+' .gm-iic-detail-toolbar button{height:38px;border:1px solid #f0c8d7;border-radius:13px;background:#fff;color:#c32158;cursor:pointer;font-weight:800;}',
    '#'+ROOT_ID+' .gm-iic-top strong{text-align:center;color:#c51d55;font-size:14px;}',
    '#'+ROOT_ID+' .gm-iic-menu[hidden],#'+ROOT_ID+' .gm-iic-detail[hidden]{display:none!important;}',
    '#'+ROOT_ID+' .gm-iic-hero{position:relative;min-height:205px;margin:0 0 13px;padding:22px 43% 18px 16px;overflow:hidden;border:1px solid #f4d5df;border-radius:28px;background:linear-gradient(135deg,#fff 0%,#ffedf4 100%);box-shadow:0 9px 24px rgba(169,39,83,.08);}',
    '#'+ROOT_ID+' .gm-iic-hero>div{position:relative;z-index:2;}#'+ROOT_ID+' .gm-iic-eyebrow{display:inline-block;margin-bottom:8px;color:#de2b66;font-size:10px;font-weight:900;letter-spacing:1.2px;}#'+ROOT_ID+' .gm-iic-hero h1{margin:0;color:#15203b;font-size:clamp(28px,7vw,39px);line-height:1.02;letter-spacing:-1.2px;}#'+ROOT_ID+' .gm-iic-hero p{margin:10px 0 0;color:#566079;font-size:13px;line-height:1.42;font-weight:600;}#'+ROOT_ID+' .gm-iic-hero img{position:absolute;right:-7px;bottom:-5px;width:47%;height:207px;object-fit:cover;object-position:center 32%;border-radius:48% 48% 42% 42%;mix-blend-mode:multiply;}',
    '#'+ROOT_ID+' .gm-iic-objectives{padding:16px;border:1px solid #f2d7df;border-radius:22px;background:#fff;box-shadow:0 6px 18px rgba(92,49,70,.06);}#'+ROOT_ID+' .gm-iic-objectives h2{margin:0 0 9px;color:#17233c;font-size:17px;}#'+ROOT_ID+' ul{margin:0;padding-left:20px;color:#47536a;font-size:13px;line-height:1.52;}#'+ROOT_ID+' li+li{margin-top:5px;}',
    '#'+ROOT_ID+' .gm-iic-core-triad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0;}#'+ROOT_ID+' .gm-iic-core-triad article{display:flex;min-width:0;flex-direction:column;align-items:center;padding:11px 5px;border-radius:18px;background:#fff1f5;border:1px solid #f4d3df;text-align:center;}#'+ROOT_ID+' .gm-iic-core-triad article span{font-size:24px;}#'+ROOT_ID+' .gm-iic-core-triad article b{margin-top:3px;color:#b51c4c;font-size:12px;}#'+ROOT_ID+' .gm-iic-core-triad article small{margin-top:2px;color:#697085;font-size:9px;}',
    '#'+ROOT_ID+' .gm-iic-menu-title{margin:16px 2px 10px;color:#17233c;font-size:19px;}#'+ROOT_ID+' .gm-iic-topic-grid{display:grid;gap:9px;}#'+ROOT_ID+' .gm-iic-topic-grid button{box-sizing:border-box;width:100%;display:grid;grid-template-columns:46px minmax(0,1fr) 20px;align-items:center;gap:10px;min-height:74px;padding:9px 12px;border:1px solid #f0d5de;border-radius:20px;background:linear-gradient(145deg,#fff,#fff5f8);box-shadow:0 5px 15px rgba(92,49,70,.06);text-align:left;cursor:pointer;color:#17233c;}#'+ROOT_ID+' .gm-iic-menu-icon{display:grid;place-items:center;width:43px;height:43px;border-radius:15px;background:#ffe4ed;font-size:22px;}#'+ROOT_ID+' .gm-iic-topic-grid b{display:block;font-size:14px;}#'+ROOT_ID+' .gm-iic-topic-grid small{display:block;margin-top:3px;color:#687187;font-size:10px;line-height:1.25;}#'+ROOT_ID+' .gm-iic-topic-grid i{color:#d52561;font-size:25px;font-style:normal;}',
    '#'+ROOT_ID+' .gm-iic-detail-toolbar{position:sticky;top:57px;z-index:20;display:grid;grid-template-columns:auto 1fr 38px;align-items:center;gap:8px;margin:0 0 12px;padding:7px;border:1px solid #f1d6df;border-radius:16px;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);}#'+ROOT_ID+' .gm-iic-detail-toolbar>span{text-align:center;color:#7a2945;font-size:11px;font-weight:850;}#'+ROOT_ID+' .gm-iic-detail-toolbar button:first-child{padding:0 10px;}#'+ROOT_ID+' .gm-iic-topic-intro{display:flex;align-items:center;gap:12px;margin:5px 2px 13px;}#'+ROOT_ID+' .gm-iic-topic-icon{display:grid;place-items:center;flex:0 0 52px;height:52px;border-radius:18px;background:#ffe4ed;font-size:27px;}#'+ROOT_ID+' .gm-iic-topic-intro h2{margin:0;color:#151f39;font-size:24px;line-height:1.04;}#'+ROOT_ID+' .gm-iic-topic-intro p{margin:4px 0 0;color:#697184;font-size:12px;}',
    '#'+ROOT_ID+' .gm-iic-card{margin:10px 0;padding:16px;border:1px solid #efd9e1;border-radius:21px;background:#fff;box-shadow:0 6px 18px rgba(82,42,61,.055);}#'+ROOT_ID+' .gm-iic-card>h3{margin:0 0 9px;color:#a91849;font-size:16px;}#'+ROOT_ID+' .gm-iic-card p{margin:0;color:#45516a;font-size:13px;line-height:1.52;}#'+ROOT_ID+' .gm-iic-card p+p{margin-top:8px;}',
    '#'+ROOT_ID+' .gm-iic-alert{margin:10px 0;padding:12px 13px;border-radius:16px;background:#fff2f6;border-left:4px solid #df2b67;color:#563044;}#'+ROOT_ID+' .gm-iic-alert strong{display:block;color:#a91849;font-size:13px;}#'+ROOT_ID+' .gm-iic-alert p{margin:4px 0 0!important;color:#4d5364!important;font-size:12px!important;line-height:1.46!important;}#'+ROOT_ID+' .gm-iic-alert.green{background:#eef9f3;border-left-color:#2b9a65;}#'+ROOT_ID+' .gm-iic-alert.green strong{color:#18764b;}#'+ROOT_ID+' .gm-iic-alert.amber{background:#fff7e7;border-left-color:#e4a126;}#'+ROOT_ID+' .gm-iic-alert.amber strong{color:#9e6811;}#'+ROOT_ID+' .gm-iic-alert.strong{background:linear-gradient(135deg,#a9164a,#df326b);border:0;color:#fff;}#'+ROOT_ID+' .gm-iic-alert.strong strong,#'+ROOT_ID+' .gm-iic-alert.strong p{color:#fff!important;}',
    '#'+ROOT_ID+' .gm-iic-flow{display:grid;justify-items:center;gap:4px;margin:12px 0;}#'+ROOT_ID+' .gm-iic-flow-item{box-sizing:border-box;width:100%;padding:10px 12px;border:1px solid #efd2dd;border-radius:15px;background:#fff6f8;color:#313d56;text-align:center;font-size:12px;line-height:1.4;}#'+ROOT_ID+' .gm-iic-flow-arrow{color:#d42762;font-size:19px;font-weight:900;}',
    '#'+ROOT_ID+' .gm-iic-compare{display:grid;gap:9px;}#'+ROOT_ID+' .gm-iic-compare article{padding:16px;border-radius:20px;border:1px solid #edd7df;background:#fff;}#'+ROOT_ID+' .gm-iic-compare article>span{font-size:28px;}#'+ROOT_ID+' .gm-iic-compare h3{margin:6px 0 4px;color:#ba1d50;}#'+ROOT_ID+' .gm-iic-compare b{color:#17233c;font-size:13px;}#'+ROOT_ID+' .gm-iic-compare p{margin:6px 0 0;color:#535e73;font-size:12px;line-height:1.48;}',
    '#'+ROOT_ID+' .gm-iic-section-label{margin:17px 2px 9px;color:#17233c;font-size:18px;}#'+ROOT_ID+' .gm-iic-stack{display:grid;gap:9px;}#'+ROOT_ID+' .gm-iic-scenario{display:grid;grid-template-columns:36px minmax(0,1fr);gap:11px;padding:15px;border:1px solid #efd7e0;border-radius:21px;background:#fff;}#'+ROOT_ID+' .gm-iic-number{display:grid;place-items:center;width:34px;height:34px;border-radius:12px;background:#d92763;color:#fff;font-size:16px;font-weight:900;}#'+ROOT_ID+' .gm-iic-scenario h3{margin:3px 0 6px;color:#9f1745;font-size:15px;}#'+ROOT_ID+' .gm-iic-scenario p{margin:0;color:#4f5b71;font-size:12px;line-height:1.48;}#'+ROOT_ID+' .gm-iic-example{display:grid;gap:5px;margin-top:9px;padding:10px;border-radius:13px;background:#fff3f7;color:#515a70;font-size:11px;line-height:1.42;}#'+ROOT_ID+' .gm-iic-example b,#'+ROOT_ID+' .gm-iic-example strong{color:#b41d4e;}',
    '#'+ROOT_ID+' .gm-iic-techniques{display:grid;gap:8px;}#'+ROOT_ID+' .gm-iic-techniques article{display:grid;gap:4px;padding:11px;border-radius:14px;background:#fff5f8;color:#526077;font-size:11px;line-height:1.45;}#'+ROOT_ID+' .gm-iic-techniques b{color:#a71747;font-size:13px;}#'+ROOT_ID+' .gm-iic-techniques strong{color:#17744a;}',
    '#'+ROOT_ID+' .gm-iic-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:10px 0;}#'+ROOT_ID+' .gm-iic-metric{min-width:0;padding:11px 6px;border:1px solid #f1d4df;border-radius:17px;background:#fff;text-align:center;}#'+ROOT_ID+' .gm-iic-metric strong{display:block;color:#d72561;font-size:22px;line-height:1;}#'+ROOT_ID+' .gm-iic-metric span{display:block;margin-top:5px;color:#26324a;font-size:10px;font-weight:850;}#'+ROOT_ID+' .gm-iic-metric small{display:block;margin-top:4px;color:#7a8190;font-size:8px;line-height:1.25;}',
    '#'+ROOT_ID+' .gm-iic-decision-list{display:grid;gap:7px;}#'+ROOT_ID+' .gm-iic-decision-list article{display:grid;gap:3px;padding:10px;border-radius:13px;background:#fff4f7;border:1px solid #f2d7e0;}#'+ROOT_ID+' .gm-iic-decision-list b{color:#b31d4d;font-size:12px;}#'+ROOT_ID+' .gm-iic-decision-list span{color:#536077;font-size:11px;line-height:1.42;}',
    '#'+ROOT_ID+' .gm-iic-steps{display:grid;gap:10px;}#'+ROOT_ID+' .gm-iic-steps>article{display:grid;grid-template-columns:42px minmax(0,1fr);gap:11px;padding:15px;border:1px solid #ecd6df;border-radius:21px;background:#fff;}#'+ROOT_ID+' .gm-iic-steps>article>span{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#d92662;color:#fff;font-size:18px;font-weight:900;}#'+ROOT_ID+' .gm-iic-steps h3{margin:1px 0 6px;color:#9f1746;font-size:15px;}#'+ROOT_ID+' .gm-iic-steps p,#'+ROOT_ID+' .gm-iic-steps strong{margin:0;color:#4f5b71;font-size:11px;line-height:1.48;}#'+ROOT_ID+' .gm-iic-steps strong{display:block;margin-top:8px;color:#25334c;}',
    '#'+ROOT_ID+' .gm-iic-reason-grid{display:grid;gap:9px;}#'+ROOT_ID+' .gm-iic-reason-grid article{padding:14px;border:1px solid #efd7e0;border-radius:18px;background:#fff;}#'+ROOT_ID+' .gm-iic-reason-grid b{display:block;color:#a91849;font-size:13px;}#'+ROOT_ID+' .gm-iic-reason-grid span{display:block;margin-top:6px;color:#536077;font-size:12px;line-height:1.5;}#'+ROOT_ID+' .gm-iic-reason-grid strong{color:#c41f56;}',
    '#'+ROOT_ID+' .gm-iic-cases{display:grid;gap:10px;}#'+ROOT_ID+' .gm-iic-case{position:relative;padding:16px 14px 14px 52px;border:1px solid #edd5de;border-radius:21px;background:#fff;}#'+ROOT_ID+' .gm-iic-case-number{position:absolute;left:12px;top:14px;display:grid;place-items:center;width:31px;height:31px;border-radius:11px;background:#d92561;color:#fff;font-weight:900;}#'+ROOT_ID+' .gm-iic-case h3{margin:0 0 6px;color:#991844;font-size:14px;}#'+ROOT_ID+' .gm-iic-case>p{margin:0 0 8px;color:#525e74;font-size:11px;line-height:1.46;}#'+ROOT_ID+' .gm-iic-case>div{display:grid;gap:2px;margin-top:7px;padding:8px 9px;border-radius:12px;background:#fff5f8;}#'+ROOT_ID+' .gm-iic-case>div b{color:#b31d4e;font-size:10px;text-transform:uppercase;}#'+ROOT_ID+' .gm-iic-case>div span{color:#46536a;font-size:11px;line-height:1.42;}#'+ROOT_ID+' .gm-iic-case aside{margin-top:8px;padding:9px;border-radius:12px;background:#fff7e7;color:#695432;font-size:10px;line-height:1.44;}',
    '#'+ROOT_ID+' .gm-iic-traps{display:grid;gap:9px;}#'+ROOT_ID+' .gm-iic-traps article{display:grid;grid-template-columns:36px minmax(0,1fr);gap:10px;padding:13px;border:1px solid #eed6df;border-radius:18px;background:#fff;}#'+ROOT_ID+' .gm-iic-traps article>span{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:#ffe3ec;color:#ba1e51;font-size:11px;font-weight:900;}#'+ROOT_ID+' .gm-iic-traps h3{margin:0 0 5px;color:#343d54;font-size:12px;line-height:1.35;}#'+ROOT_ID+' .gm-iic-traps b{color:#cb204f;font-size:11px;}#'+ROOT_ID+' .gm-iic-traps p{margin:4px 0 0;color:#596477;font-size:10px;line-height:1.42;}',
    '#'+ROOT_ID+' .gm-iic-memory{counter-reset:item;list-style:none;margin:0;padding:0;display:grid;gap:8px;}#'+ROOT_ID+' .gm-iic-memory li{display:grid;grid-template-columns:31px minmax(0,1fr);align-items:center;gap:9px;padding:10px 11px;border:1px solid #eed7df;border-radius:15px;background:#fff;color:#4c5870;font-size:11px;line-height:1.4;}#'+ROOT_ID+' .gm-iic-memory li:before{counter-increment:item;content:counter(item);display:grid;place-items:center;width:29px;height:29px;border-radius:10px;background:#d92561;color:#fff;font-weight:900;}#'+ROOT_ID+' .gm-iic-disclaimer{margin-top:11px!important;padding-top:10px;border-top:1px solid #efdce2;color:#7a6670!important;font-size:10px!important;}',
    '#'+ROOT_ID+' .gm-iic-bottom-nav{position:fixed;z-index:40;left:50%;bottom:0;transform:translateX(-50%);box-sizing:border-box;width:min(100%,600px);display:grid;grid-template-columns:repeat(5,1fr);padding:7px 7px max(7px,env(safe-area-inset-bottom));border-top:1px solid rgba(225,63,112,.14);background:rgba(255,250,252,.97);backdrop-filter:blur(14px);box-shadow:0 -8px 24px rgba(109,40,67,.08);}#'+ROOT_ID+' .gm-iic-bottom-nav button{display:flex;min-width:0;flex-direction:column;align-items:center;gap:2px;padding:3px 1px;border:0;background:transparent;color:#536078;font-size:9px;cursor:pointer;}#'+ROOT_ID+' .gm-iic-bottom-nav span{font-size:18px;color:#d0255e;}#'+ROOT_ID+' .gm-iic-bottom-nav .gm-iic-nav-main span{display:grid;place-items:center;width:38px;height:38px;margin-top:-20px;border-radius:50%;background:linear-gradient(135deg,#d40d4e,#f06b81);color:#fff;box-shadow:0 7px 17px rgba(201,35,84,.25);}',
    '#'+MODULE_BUTTON_ID+' .gm-command-module-copy small{display:block;margin-top:3px;color:#40506c;font-size:9px;line-height:1.2;}',
    '@media(max-width:390px){#'+ROOT_ID+' .gm-iic-hero{padding-right:41%;}#'+ROOT_ID+' .gm-iic-hero h1{font-size:27px;}#'+ROOT_ID+' .gm-iic-metrics{gap:5px;}#'+ROOT_ID+' .gm-iic-metric strong{font-size:19px;}}'
  ].join('');
  document.head.appendChild(style);
}

function buildScreen(){
  if(document.getElementById(ROOT_ID))return;
  var f=flow();if(!f)return;
  var s=document.createElement('section');s.id=ROOT_ID;s.className='gm-flow-screen';s.setAttribute('data-screen','iic-cerclage');s.setAttribute('aria-label','Cerclagem, insuficiência istmocervical e progesterona');
  s.innerHTML='<main class="gm-iic-shell"><header class="gm-iic-top"><button type="button" data-iic-top-back aria-label="Voltar">‹</button><strong>Cerclagem • IIC • Progesterona</strong><button type="button" data-iic-top-home aria-label="Início">⌂</button></header><div class="gm-iic-menu">'+menuMarkup()+'</div><div class="gm-iic-detail" hidden></div><nav class="gm-iic-bottom-nav" aria-label="Navegação principal"><button type="button" data-iic-nav="inicio"><span>⌂</span>Início</button><button type="button" data-iic-nav="obstetricia"><span>♧</span>Obstetrícia</button><button class="gm-iic-nav-main" type="button" data-iic-nav="prenatal"><span>♡</span>Pré-natal</button><button type="button" data-iic-nav="protocolos"><span>▤</span>Protocolos</button><button type="button" data-iic-nav="perfil"><span>♙</span>Perfil</button></nav></main>';
  s.querySelector('[data-iic-top-back]').addEventListener('click',function(){var d=s.querySelector('.gm-iic-detail');if(d&&!d.hidden)showMenu();else home();});
  s.querySelector('[data-iic-top-home]').addEventListener('click',home);
  s.querySelectorAll('[data-iic-topic]').forEach(function(button){button.addEventListener('click',function(){showTopic(button.getAttribute('data-iic-topic'));});});
  s.querySelector('[data-iic-nav="inicio"]').addEventListener('click',home);
  s.querySelector('[data-iic-nav="obstetricia"]').addEventListener('click',function(){clickHomeControl('[data-gm-nav="obstetricia"]');});
  s.querySelector('[data-iic-nav="prenatal"]').addEventListener('click',function(){clickHomeControl('[data-gm-nav="prenatal"]');});
  s.querySelector('[data-iic-nav="protocolos"]').addEventListener('click',function(){clickHomeControl('[data-gm-nav="protocolos"]');});
  s.querySelector('[data-iic-nav="perfil"]').addEventListener('click',function(){clickHomeControl('[data-gm-nav="perfil"]');});
  f.appendChild(s);
}

function injectButton(){
  var grid=document.querySelector('#gm-app-flow [data-screen="home"] .gm-command-module-grid');if(!grid||document.getElementById(MODULE_BUTTON_ID))return false;
  var button=document.createElement('button');button.id=MODULE_BUTTON_ID;button.className='gm-command-module gm-card-purple';button.type='button';button.setAttribute('data-gm-module','iic-cerclage');
  button.innerHTML='<span class="gm-command-module-icon">🧵</span><span class="gm-command-module-copy"><strong>IIC, Cerclagem e Progesterona</strong><small>Colo curto e prevenção da prematuridade</small></span><span class="gm-command-arrow">›</span>';
  button.addEventListener('click',openModule);grid.appendChild(button);return true;
}

function init(){ensureStyle();buildScreen();injectButton();var f=flow();if(!f)return;var observer=new MutationObserver(function(){buildScreen();injectButton();});observer.observe(f,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){window.setTimeout(init,0);},{once:true});else window.setTimeout(init,0);
window.openIicCerclageProgesteroneModule=openModule;
})();
