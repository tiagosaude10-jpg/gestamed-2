(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
var STYLE_ID='gm-dmg-third-trimester-20260816-style';
function root(){return document.getElementById(ROOT_ID);}
function addStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');s.id=STYLE_ID;
  s.textContent=[
    '#'+ROOT_ID+' .gm-third-trimester{margin-top:12px;}',
    '#'+ROOT_ID+' .gm-third-trimester>header{background:linear-gradient(90deg,#f4f8ff,#fff8fb)!important;}',
    '#'+ROOT_ID+' .gm-third-trimester-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;padding:12px;}',
    '#'+ROOT_ID+' .gm-third-trimester-grid article{padding:12px 10px;border:1px solid #e4e8ef;border-radius:15px;background:#fff;text-align:center;}',
    '#'+ROOT_ID+' .gm-third-trimester-grid article .ico{display:grid;place-items:center;width:44px;height:44px;margin:0 auto 7px;border-radius:13px;background:#eef5ff;font-size:23px;}',
    '#'+ROOT_ID+' .gm-third-trimester-grid article:nth-child(2) .ico{background:#fff0f5;}','#'+ROOT_ID+' .gm-third-trimester-grid article:nth-child(3) .ico{background:#fff7e8;}',
    '#'+ROOT_ID+' .gm-third-trimester-grid b{display:block;color:#20304a;font-size:12.2px;line-height:1.28;}','#'+ROOT_ID+' .gm-third-trimester-grid small{display:block;margin-top:5px;color:#565f70;font-size:10.8px;line-height:1.35;}',
    '#'+ROOT_ID+' .gm-third-trimester-note{margin:0 12px 12px;padding:12px 13px;border:1px solid #d7e5f4;border-radius:14px;background:#f7fbff;color:#354861;font-size:11.5px;line-height:1.45;}','#'+ROOT_ID+' .gm-third-trimester-note b{color:#1d69aa;}',
    '#'+ROOT_ID+' .gm-third-trimester-warning{margin:0 12px 12px;padding:12px 13px;border:1px solid #f1d4a9;border-radius:14px;background:#fff9ed;color:#6e541d;font-size:11.5px;line-height:1.45;}','#'+ROOT_ID+' .gm-third-trimester-warning b{color:#a36912;}',
    '@media(max-width:440px){#'+ROOT_ID+' .gm-third-trimester-grid{grid-template-columns:1fr;}#'+ROOT_ID+' .gm-third-trimester-grid article{display:grid;grid-template-columns:48px 1fr;text-align:left;gap:10px;align-items:center;}#'+ROOT_ID+' .gm-third-trimester-grid article .ico{margin:0;}#'+ROOT_ID+' .gm-third-trimester-grid article div:last-child{min-width:0;}}'
  ].join('');
  document.head.appendChild(s);
}
function patchThirdTrimester(){
  addStyle();
  var r=root();if(!r)return false;
  var detail=r.querySelector('.gm-dmg-new-detail[data-topic="diagnosis"]');if(!detail)return false;
  var cards=detail.querySelectorAll('.gm-clinical-card');var target=null;
  cards.forEach(function(card){var h=card.querySelector('header strong');if(h&&h.textContent.trim()==='E depois de 28 semanas?')target=card;});
  if(!target||target.getAttribute('data-third-trimester-v207')==='1')return !!target;
  target.setAttribute('data-third-trimester-v207','1');target.classList.add('gm-third-trimester');
  target.innerHTML='<header><span>3</span><strong>3ª etapa — terceiro trimestre (28–30 semanas)</strong></header><div class="gm-third-trimester-grid"><article><span class="ico">🩸</span><div><b>Glicemia de jejum de rotina</b><small>O Ministério da Saúde inclui nova glicemia de jejum entre os exames laboratoriais de rotina do 3º trimestre, mesmo quando o rastreamento inicial para DMG já foi realizado.</small></div></article><article><span class="ico">✅</span><div><b>Não substitui o TOTG</b><small>Essa glicemia integra o acompanhamento laboratorial do pré-natal. Ela não substitui o TOTG 75 g indicado entre 24 e 28 semanas para quem ainda não tinha diagnóstico.</small></div></article><article><span class="ico">⏳</span><div><b>Se perdeu a janela do TOTG</b><small>Gestante que chegou após 28 semanas sem investigação adequada deve realizar o TOTG 75 g o quanto antes, conforme protocolo e condições clínicas.</small></div></article></div><div class="gm-third-trimester-note"><b>Fluxo prático:</b> 1ª consulta → glicemia de jejum. Se sem diagnóstico → TOTG 75 g entre 24–28 semanas. No 3º trimestre → repetir glicemia de jejum como exame de rotina do pré-natal, conforme Ministério da Saúde.</div><div class="gm-third-trimester-warning"><b>Importante:</b> não interpretar a glicemia de jejum do 3º trimestre como uma nova rodada universal do TOTG. Se surgirem alterações, sintomas ou suspeita clínica, a investigação deve ser individualizada conforme os critérios diagnósticos vigentes.</div>';
  var summary=detail.querySelector('.gm-reminder p');
  if(summary)summary.textContent='Primeira consulta: glicemia de jejum. Se <92 mg/dL e sem diagnóstico, TOTG 75 g entre 24–28 semanas. No 3º trimestre, repetir glicemia de jejum como exame de rotina do pré-natal; se o TOTG não foi realizado na janela recomendada, investigar o quanto antes.';
  return true;
}
function bind(){
  var r=root();if(!r)return false;
  var btn=r.querySelector('.gm-dmg-new-card[data-topic="diagnosis"]');if(!btn)return false;
  if(btn.getAttribute('data-third-trimester-listener-v207')!=='1'){
    btn.setAttribute('data-third-trimester-listener-v207','1');
    btn.addEventListener('click',function(){window.setTimeout(patchThirdTrimester,0);});
  }
  patchThirdTrimester();return true;
}
function init(){bind();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',bind,{once:true});
})();