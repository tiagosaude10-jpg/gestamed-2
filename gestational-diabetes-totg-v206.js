(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
var STYLE_ID='gm-dmg-totg-20260816-style';
function root(){return document.getElementById(ROOT_ID);}
function addStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');s.id=STYLE_ID;
  s.textContent=[
    '#'+ROOT_ID+' .gm-totg-diagnostic{display:block!important;padding:14px!important;background:linear-gradient(180deg,#fff8fb,#fff)!important;border:1px solid #efcad9!important;border-radius:18px!important;}',
    '#'+ROOT_ID+' .gm-totg-title{display:flex;align-items:center;gap:10px;margin-bottom:12px;}#'+ROOT_ID+' .gm-totg-title .ico{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:#ffe7f0;font-size:23px;}#'+ROOT_ID+' .gm-totg-title strong{display:block;color:#c91f5a;font-size:15px;}#'+ROOT_ID+' .gm-totg-title small{display:block;margin-top:3px;color:#61697a;font-size:11.5px;line-height:1.3;}',
    '#'+ROOT_ID+' .gm-totg-table{display:grid;gap:9px;}#'+ROOT_ID+' .gm-totg-row{display:grid;grid-template-columns:74px 1fr;gap:9px;padding:10px;border-radius:15px;border:1px solid;}#'+ROOT_ID+' .gm-totg-row .time{display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:12px;background:#fff;min-height:70px;font-weight:900;font-size:13px;text-align:center;}#'+ROOT_ID+' .gm-totg-row .time span{font-size:22px;margin-bottom:3px;}#'+ROOT_ID+' .gm-totg-values{display:grid;gap:6px;}#'+ROOT_ID+' .gm-totg-chip{display:grid;grid-template-columns:88px 1fr;gap:8px;align-items:center;padding:7px 9px;border-radius:11px;background:rgba(255,255,255,.86);}#'+ROOT_ID+' .gm-totg-chip b{font-size:12px;}#'+ROOT_ID+' .gm-totg-chip span{font-size:11px;line-height:1.25;color:#454d5e;}',
    '#'+ROOT_ID+' .gm-totg-row.fasting{border-color:#efc4d4;background:#fff4f8;}#'+ROOT_ID+' .gm-totg-row.fasting .time{color:#c51f59;}#'+ROOT_ID+' .gm-totg-row.hour1{border-color:#f0d8aa;background:#fff9ed;}#'+ROOT_ID+' .gm-totg-row.hour1 .time{color:#b87516;}#'+ROOT_ID+' .gm-totg-row.hour2{border-color:#cce6d0;background:#f3fbf4;}#'+ROOT_ID+' .gm-totg-row.hour2 .time{color:#279345;}',
    '#'+ROOT_ID+' .gm-totg-alert{display:grid;grid-template-columns:40px 1fr;gap:9px;align-items:start;margin-top:11px;padding:11px 12px;border:1px solid #f0b8c9;border-radius:14px;background:#fff0f4;}#'+ROOT_ID+' .gm-totg-alert>span{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#e91e63;color:#fff;font-size:21px;}#'+ROOT_ID+' .gm-totg-alert b{display:block;color:#b7194d;font-size:12.5px;}#'+ROOT_ID+' .gm-totg-alert small{display:block;margin-top:4px;color:#4f5666;font-size:11px;line-height:1.35;}#'+ROOT_ID+' .gm-totg-rule{margin-top:10px;padding:10px 12px;border-radius:13px;background:#f7fbff;border:1px solid #d7e4f2;color:#33445f;font-size:11.5px;line-height:1.4;}#'+ROOT_ID+' .gm-totg-rule b{color:#1a71bb;}',
    '@media(max-width:440px){#'+ROOT_ID+' .gm-totg-row{grid-template-columns:66px 1fr;padding:8px;}#'+ROOT_ID+' .gm-totg-chip{grid-template-columns:76px 1fr;padding:7px;}#'+ROOT_ID+' .gm-totg-chip b{font-size:11.5px;}#'+ROOT_ID+' .gm-totg-chip span{font-size:10.6px;}}'
  ].join('');
  document.head.appendChild(s);
}
function enhance(){
  var r=root();if(!r)return;
  var detail=r.querySelector('.gm-dmg-new-detail[data-topic="diagnosis"]');if(!detail)return;
  var target=detail.querySelector('.gm-second-grid .important');if(!target||target.getAttribute('data-totg-v206')==='1')return;
  target.setAttribute('data-totg-v206','1');target.classList.add('gm-totg-diagnostic');
  target.innerHTML='<div class="gm-totg-title"><span class="ico">📌</span><div><strong>Diagnóstico no TOTG 75 g</strong><small>Compare os 3 tempos do exame. Basta 1 valor alterado para diagnóstico.</small></div></div><div class="gm-totg-table"><div class="gm-totg-row fasting"><div class="time"><span>🩸</span>Jejum</div><div class="gm-totg-values"><div class="gm-totg-chip"><b>&lt; 92 mg/dL</b><span>Sem critério de DMG pelo jejum.</span></div><div class="gm-totg-chip"><b>92–125</b><span>Critério para <strong>DMG</strong>.</span></div><div class="gm-totg-chip"><b>≥ 126</b><span><strong>Diabetes diagnosticado na gestação</strong> (overt diabetes).</span></div></div></div><div class="gm-totg-row hour1"><div class="time"><span>⏱️</span>1 hora</div><div class="gm-totg-values"><div class="gm-totg-chip"><b>&lt; 180 mg/dL</b><span>Sem critério de DMG neste tempo.</span></div><div class="gm-totg-chip"><b>≥ 180 mg/dL</b><span>Critério para <strong>DMG</strong>.</span></div></div></div><div class="gm-totg-row hour2"><div class="time"><span>⏱️</span>2 horas</div><div class="gm-totg-values"><div class="gm-totg-chip"><b>&lt; 153 mg/dL</b><span>Sem critério de DMG neste tempo.</span></div><div class="gm-totg-chip"><b>153–199</b><span>Critério para <strong>DMG</strong>.</span></div><div class="gm-totg-chip"><b>≥ 200</b><span><strong>Diabetes diagnosticado na gestação</strong> (overt diabetes), e não apenas DMG.</span></div></div></div></div><div class="gm-totg-alert"><span>!</span><div><b>ATENÇÃO AO VALOR DE 2 HORAS ≥ 200 mg/dL</b><small>Segundo a Diretriz SBD 2025, esse resultado deve ser classificado como diabetes diagnosticado na gestação (overt diabetes), não como diabetes mellitus gestacional isolado.</small></div></div><div class="gm-totg-rule"><b>Regra prática:</b> um único valor alterado em jejum, 1 h ou 2 h já é suficiente para estabelecer o diagnóstico conforme os pontos de corte. O valor de 2 h ≥ 200 mg/dL muda a classificação para diabetes diagnosticado na gestação.</div>';
}
function patch(){
  addStyle();var r=root();if(!r)return false;
  var btn=r.querySelector('.gm-dmg-new-card[data-topic="diagnosis"]');if(!btn)return false;
  if(btn.getAttribute('data-totg-listener-v206')!=='1'){
    btn.setAttribute('data-totg-listener-v206','1');
    btn.addEventListener('click',enhance);
  }
  enhance();return true;
}
function init(){patch();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('load',patch,{once:true});
})();