(function(){
'use strict';
var ROOT_ID='gm-gestational-diabetes-screen';
function root(){return document.getElementById(ROOT_ID);}
function patchInsulin(d){
  var cards=d.querySelectorAll('.gm-ins-card');
  cards.forEach(function(card){
    var title=card.querySelector('header strong'),content=card.querySelector('.content');
    if(!title||!content)return;
    var t=title.textContent||'';
    if(t.indexOf('4. Dose total inicial de referência')===0&&!card.getAttribute('data-v255')){
      card.setAttribute('data-v255','1');
      content.innerHTML='<p>Quando se escolhe um esquema completo, <b>0,5 U/kg/dia</b> é uma referência para a <b>dose diária total inicial</b>. O Ministério da Saúde também descreve 0,5 UI/kg/dia pelo peso atual, fracionada em duas a três aplicações; a SBD reforça que a distribuição deve ser individualizada pelo perfil glicêmico.</p><div class="gm-ins-callout info"><span>×</span><div><b>Exemplo: 70 kg</b><small>70 × 0,5 = 35 UI/dia de dose total inicial de referência.</small></div></div><div class="gm-ins-grid"><article><b>NPH 2x/3x no GestaMed</b><span>Quando o profissional seleciona um desses esquemas operacionais com NPH, as 35 UI são distribuídas entre as aplicações previstas, preservando a soma diária total.</span></article><article><b>Basal-prandial</b><span>Quando esse esquema é selecionado, as 35 UI são repartidas entre componente basal e componente prandial; nenhuma unidade é descartada.</span></article></div><div class="gm-ins-callout warn"><span>📊</span><div><b>O perfil glicêmico continua mandando no ajuste</b><small>O cálculo pelo peso é apenas ponto de partida. A SBD recomenda que a distribuição e os ajustes sejam baseados no monitoramento diário, e esquemas simplificados podem ser usados quando a alteração está restrita a um horário.</small></div></div>';
    }
    if(t.indexOf('7. NPH em 2 aplicações')===0&&!card.getAttribute('data-src-v255')){
      card.setAttribute('data-src-v255','1');
      var note=document.createElement('div');note.className='gm-ins-callout warn';note.innerHTML='<span>📚</span><div><b>Fonte e interpretação</b><small>O MS recomenda 0,5 UI/kg/dia fracionada em 2–3 aplicações, mas a redação das frações no manual contém uma inconsistência aritmética. Por segurança, o GestaMed não reproduz literalmente essa frase; o esquema 2/3 + 1/3 é apresentado como modelo operacional e deve ser confirmado pelo profissional conforme o perfil glicêmico.</small></div>';content.appendChild(note);
    }
    if(t.indexOf('8. NPH em 3 aplicações')===0&&!card.getAttribute('data-src-v255')){
      card.setAttribute('data-src-v255','1');
      var note3=document.createElement('div');note3.className='gm-ins-callout warn';note3.innerHTML='<span>📚</span><div><b>Fonte e interpretação</b><small>A divisão 1/2 + 1/4 + 1/4 é uma referência operacional de protocolo assistencial contemporâneo, não uma fração nacional obrigatória da SBD ou do Ministério da Saúde. Ajustar conforme o perfil glicêmico e o protocolo do serviço.</small></div>';content.appendChild(note3);
    }
  });
}
function patch(){var r=root();if(!r)return false;var d=r.querySelector('.gm-dmg-new-detail[data-topic="insulin"]');if(!d||d.hidden)return false;patchInsulin(d);return true;}
function schedule(){setTimeout(patch,0);setTimeout(patch,120);setTimeout(patch,350);}
function init(){var r=root();if(!r){setTimeout(init,150);return;}r.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-master-topic="insulin"]'))schedule();});var obs=new MutationObserver(function(){var d=r.querySelector('.gm-dmg-new-detail[data-topic="insulin"]');if(d&&!d.hidden)schedule();});obs.observe(r,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','data-topic']});schedule();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();window.addEventListener('load',schedule,{once:true});
})();