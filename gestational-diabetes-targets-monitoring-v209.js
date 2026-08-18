(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
var STYLE_ID='gm-dmg-targets-monitoring-209-style';
function root(){return document.getElementById(ROOT_ID);}
function showMenu(){var r=root();if(!r)return;var m=r.querySelector('.gm-dmg-new-menu');var d=r.querySelector('.gm-dmg-new-detail');if(m)m.hidden=false;if(d)d.hidden=true;r.scrollTop=0;}
function addStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');s.id=STYLE_ID;
  s.textContent=[
    '#'+ROOT_ID+' .gm-target-page{padding:4px 0 18px;color:#18223a;}',
    '#'+ROOT_ID+' .gm-target-hero{position:relative;min-height:150px;margin:0 0 12px;padding:18px 40% 14px 8px;border-radius:24px;background:linear-gradient(135deg,#fff,#fff3f7);overflow:hidden;}','#'+ROOT_ID+' .gm-target-hero h1{margin:0;color:#111a33;font-size:clamp(27px,7vw,38px);line-height:1.03;letter-spacing:-.8px;}','#'+ROOT_ID+' .gm-target-hero p{margin:8px 0 0;color:#596174;font-size:14px;line-height:1.4;font-weight:600;}','#'+ROOT_ID+' .gm-target-hero .art{position:absolute;right:9px;bottom:8px;display:grid;place-items:center;width:34%;height:130px;border-radius:48% 48% 42% 42%;background:linear-gradient(160deg,#ffe3ed,#fff1f6);font-size:68px;}',
    '#'+ROOT_ID+' .gm-target-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;}','#'+ROOT_ID+' .gm-target-card{min-height:118px;padding:14px;border:1px solid;border-radius:20px;background:#fff;box-shadow:0 5px 14px rgba(85,48,70,.04);}','#'+ROOT_ID+' .gm-target-card .head{display:flex;align-items:center;gap:9px;margin-bottom:13px;}','#'+ROOT_ID+' .gm-target-card .ico{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.75);font-size:22px;}','#'+ROOT_ID+' .gm-target-card strong{color:#dc2468;font-size:13px;line-height:1.25;}','#'+ROOT_ID+' .gm-target-card b{display:block;text-align:center;color:#111a33;font-size:27px;line-height:1.05;}','#'+ROOT_ID+' .gm-target-card b small{font-size:13px;font-weight:700;}','#'+ROOT_ID+' .gm-target-card.pink{background:#fff4f8;border-color:#f0c9d7;}','#'+ROOT_ID+' .gm-target-card.purple{background:#faf5ff;border-color:#e6d3f6;}','#'+ROOT_ID+' .gm-target-card.green{background:#f6fced;border-color:#dcebbf;}','#'+ROOT_ID+' .gm-target-card.yellow{background:#fffaf0;border-color:#f3dfb4;}',
    '#'+ROOT_ID+' .gm-ms-card{margin:12px 0;padding:0;border:1px solid #f0d4df;border-radius:22px;background:#fff;overflow:hidden;box-shadow:0 5px 14px rgba(97,48,70,.045);}','#'+ROOT_ID+' .gm-ms-card>header{display:flex;align-items:center;gap:10px;padding:13px 14px;background:linear-gradient(90deg,#fff1f6,#fff8fb);color:#d71e62;}','#'+ROOT_ID+' .gm-ms-card>header span{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#ed1763;color:#fff;font-size:21px;}','#'+ROOT_ID+' .gm-ms-card>header strong{font-size:17px;}','#'+ROOT_ID+' .gm-ms-body{padding:14px;}',
    '#'+ROOT_ID+' .gm-monitor-lead{padding:13px;border-radius:15px;background:#fff6f9;border:1px solid #f0d1dd;color:#4a5364;font-size:12.5px;line-height:1.45;}','#'+ROOT_ID+' .gm-monitor-lead b{color:#c51f5b;}',
    '#'+ROOT_ID+' .gm-monitor-frequency{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;}','#'+ROOT_ID+' .gm-monitor-frequency article{padding:13px;border:1px solid #eee0e6;border-radius:16px;background:#fff;text-align:left;}','#'+ROOT_ID+' .gm-monitor-frequency .num{display:inline-grid;place-items:center;min-width:48px;height:36px;padding:0 8px;margin-bottom:7px;border-radius:12px;background:#ffe7f0;color:#d61e62;font-size:18px;font-weight:900;}','#'+ROOT_ID+' .gm-monitor-frequency b{display:block;font-size:13px;color:#1f2941;}','#'+ROOT_ID+' .gm-monitor-frequency small{display:block;margin-top:4px;color:#596174;font-size:11px;line-height:1.38;}',
    '#'+ROOT_ID+' .gm-schedule{display:grid;gap:8px;margin-top:12px;}','#'+ROOT_ID+' .gm-schedule h3{margin:0 0 2px;color:#d62264;font-size:15px;}','#'+ROOT_ID+' .gm-schedule-row{display:grid;grid-template-columns:43px 1fr auto;gap:9px;align-items:center;padding:9px 10px;border:1px solid #eee2e7;border-radius:14px;background:#fff;}','#'+ROOT_ID+' .gm-schedule-row .ico{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#fff0f5;font-size:20px;}','#'+ROOT_ID+' .gm-schedule-row b{font-size:12px;}','#'+ROOT_ID+' .gm-schedule-row small{display:block;margin-top:2px;color:#5a6272;font-size:10.6px;line-height:1.25;}','#'+ROOT_ID+' .gm-schedule-row .goal{padding:6px 8px;border-radius:10px;background:#f8fbff;color:#225f93;font-size:10.5px;font-weight:800;white-space:nowrap;}',
    '#'+ROOT_ID+' .gm-technique-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}','#'+ROOT_ID+' .gm-technique-grid article{display:grid;grid-template-columns:34px 1fr;gap:8px;align-items:start;padding:10px;border:1px solid #eee2e7;border-radius:14px;background:#fff;}','#'+ROOT_ID+' .gm-technique-grid span{display:grid;place-items:center;width:32px;height:32px;border-radius:10px;background:#f4efff;font-size:17px;}','#'+ROOT_ID+' .gm-technique-grid b{font-size:11.3px;line-height:1.25;}','#'+ROOT_ID+' .gm-technique-grid small{display:block;margin-top:3px;color:#5a6272;font-size:10px;line-height:1.3;}',
    '#'+ROOT_ID+' .gm-monitor-alert{display:grid;grid-template-columns:40px 1fr;gap:9px;margin-top:12px;padding:12px;border:1px solid #efd1a8;border-radius:15px;background:#fff9ee;}','#'+ROOT_ID+' .gm-monitor-alert>span{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#f0a914;color:#fff;font-size:20px;}','#'+ROOT_ID+' .gm-monitor-alert b{display:block;color:#a6680d;font-size:12.5px;}','#'+ROOT_ID+' .gm-monitor-alert small{display:block;margin-top:4px;color:#505867;font-size:10.8px;line-height:1.4;}',
    '#'+ROOT_ID+' .gm-source-note-209{margin:13px 0 2px;padding:11px 13px;border:1px solid #d8e5f2;border-radius:14px;background:#f8fbff;color:#42516a;font-size:10.6px;line-height:1.38;}','#'+ROOT_ID+' .gm-source-note-209 b{color:#1f6da9;}',
    '@media(max-width:440px){#'+ROOT_ID+' .gm-target-grid{grid-template-columns:1fr 1fr;}#'+ROOT_ID+' .gm-target-card{min-height:108px;padding:11px;}#'+ROOT_ID+' .gm-target-card b{font-size:23px;}#'+ROOT_ID+' .gm-monitor-frequency{grid-template-columns:1fr;}#'+ROOT_ID+' .gm-technique-grid{grid-template-columns:1fr;}#'+ROOT_ID+' .gm-schedule-row{grid-template-columns:40px 1fr;}#'+ROOT_ID+' .gm-schedule-row .goal{grid-column:2;justify-self:start;}}'
  ].join('');
  document.head.appendChild(s);
}
function markup(){
  return '<section class="gm-target-page" aria-label="Metas glicêmicas e monitorização capilar">'+
    '<section class="gm-target-hero"><div><h1>Metas glicêmicas</h1><p>Monitorização capilar</p><p>Manter as glicemias dentro das metas reduz complicações maternas e fetais.</p></div><div class="art" aria-hidden="true">🤰</div></section>'+
    '<section class="gm-target-grid">'+
      '<article class="gm-target-card pink"><div class="head"><span class="ico">🩸</span><strong>Jejum</strong></div><b>&lt; 95 <small>mg/dL</small></b></article>'+
      '<article class="gm-target-card purple"><div class="head"><span class="ico">🕐</span><strong>1 hora pós-prandial</strong></div><b>&lt; 140 <small>mg/dL</small></b></article>'+
      '<article class="gm-target-card green"><div class="head"><span class="ico">🕑</span><strong>2 horas pós-prandial</strong></div><b>&lt; 120 <small>mg/dL</small></b></article>'+
      '<article class="gm-target-card yellow"><div class="head"><span class="ico">🧪</span><strong>HbA1c (quando utilizada)</strong></div><b>&lt; 6,0%</b></article>'+
    '</section>'+
    '<section class="gm-ms-card"><header><span>📱</span><strong>Monitorização capilar</strong></header><div class="gm-ms-body">'+
      '<div class="gm-monitor-lead"><b>Critério do Ministério da Saúde:</b> a automonitorização da glicemia capilar integra o cuidado da pessoa com diabetes gestacional. A frequência não deve ser fixa para todas as gestantes: deve ser definida individualmente conforme situação clínica, plano terapêutico e uso de insulina.</div>'+
      '<div class="gm-monitor-frequency"><article><span class="num">3–4x</span><b>Frequência média descrita pelo MS</b><small>Na norma de automonitorização, a frequência diária média é de 3 a 4 verificações, sempre individualizada.</small></article><article><span class="num">4–6x</span><b>Quando há insulinoterapia intensiva</b><small>Em cenário ideal, o Ministério da Saúde admite monitorização frequente, de 4 a 6 vezes ao dia, especialmente quando são necessários ajustes regulares de insulina.</small></article></div>'+
      '<div class="gm-schedule"><h3>Como organizar as medidas ao longo do dia</h3>'+
        '<div class="gm-schedule-row"><span class="ico">🌅</span><div><b>Ao acordar — jejum</b><small>Antes de comer ou beber calorias.</small></div><span class="goal">meta &lt;95</span></div>'+
        '<div class="gm-schedule-row"><span class="ico">🍽️</span><div><b>Após as refeições principais</b><small>Preferir 1 hora após o início da refeição; quando o serviço utilizar 2 horas, aplicar a meta correspondente.</small></div><span class="goal">1h &lt;140 / 2h &lt;120</span></div>'+
        '<div class="gm-schedule-row"><span class="ico">🌙</span><div><b>Ao deitar — quando indicado</b><small>Útil sobretudo em pacientes em uso de insulina, risco de hipoglicemia ou necessidade de ajuste terapêutico.</small></div><span class="goal">individualizar</span></div>'+
        '<div class="gm-schedule-row"><span class="ico">⏱️</span><div><b>Medidas adicionais</b><small>Podem ser solicitadas antes das refeições ou em horários de maior descontrole, conforme o esquema de insulina e a avaliação da equipe.</small></div><span class="goal">conforme plano</span></div>'+
      '</div>'+
      '<div class="gm-monitor-alert"><span>!</span><div><b>Não transformar “4–6x/dia” em regra universal</b><small>O próprio Ministério da Saúde determina que a frequência seja individualizada. Quatro a seis medidas ao dia fazem mais sentido quando o tratamento exige monitorização intensiva, sobretudo com insulina.</small></div></div>'+
    '</div></section>'+
    '<section class="gm-ms-card"><header><span>🩺</span><strong>Técnica correta da glicemia capilar</strong></header><div class="gm-ms-body"><div class="gm-technique-grid">'+
      '<article><span>🧼</span><div><b>Lavar as mãos</b><small>Água e sabonete; se usar álcool 70% líquido, aguardar secagem completa. Não usar álcool em gel.</small></div></article>'+
      '<article><span>🩸</span><div><b>Puncionar a lateral do dedo</b><small>Evitar a polpa digital. Formar uma gota adequada sem compressão excessiva.</small></div></article>'+
      '<article><span>🧪</span><div><b>Preencher a tira corretamente</b><small>Aplicar sangue suficiente na área reagente e aguardar a leitura indicada pelo aparelho.</small></div></article>'+
      '<article><span>📝</span><div><b>Registrar sempre o resultado</b><small>Anotar valor, horário e relação com a refeição para avaliação pela equipe multiprofissional.</small></div></article>'+
    '</div></div></section>'+
    '<section class="gm-ms-card"><header><span>🎯</span><strong>Como interpretar o acompanhamento</strong></header><div class="gm-ms-body"><div class="gm-monitor-lead">O Ministério da Saúde utiliza como metas na gestação: <b>jejum &lt;95 mg/dL</b>, <b>1 hora pós-prandial &lt;140 mg/dL</b> e <b>2 horas pós-prandial &lt;120 mg/dL</b>. Se o controle não for alcançado após avaliação com orientação nutricional e exercício físico, a terapêutica deve ser reavaliada, com possibilidade de insulinoterapia e encaminhamento ao pré-natal de alto risco.</div></div></section>'+
    '<aside class="gm-source-note-209"><b>Base clínica:</b> Ministério da Saúde — Linha de Cuidado do Pré-natal de Baixo Risco; norma de automonitorização da glicemia capilar; orientação de cuidados com insulinoterapia. A frequência do AMGC deve ser individualizada. Em insulinoterapia intensiva, 4–6 verificações/dia podem ser utilizadas em cenário ideal.</aside>'+
  '</section>';
}
function openTargets(){
  var r=root();if(!r)return;var m=r.querySelector('.gm-dmg-new-menu');var d=r.querySelector('.gm-dmg-new-detail');if(m)m.hidden=true;if(!d)return;d.hidden=false;d.setAttribute('data-topic','criteria');d.innerHTML=markup();r.scrollTop=0;
}
function patch(){
  addStyle();var r=root();if(!r)return false;var old=r.querySelector('.gm-dmg-new-card[data-topic="criteria"]');if(!old)return false;
  var copy=old.querySelector('.gm-dmg-new-copy');if(copy){var strong=copy.querySelector('strong');var small=copy.querySelector('small');if(strong)strong.textContent='Metas glicêmicas';if(small)small.textContent='Monitorização capilar';}
  if(old.getAttribute('data-targets-v209')==='1')return true;
  var btn=old.cloneNode(true);btn.setAttribute('data-targets-v209','1');old.parentNode.replaceChild(btn,old);btn.addEventListener('click',openTargets);return true;
}
function init(){patch();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',patch,{once:true});
})();