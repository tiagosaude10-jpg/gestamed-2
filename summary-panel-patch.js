(function () {
  'use strict';

  var STYLE_ID = 'gmPainelExamesRestaurado';

  function garantirEstilos() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '#fatalError{display:none!important}',
      '.exames-resumo-usg .gm-usg-title{margin:0 0 4px;color:var(--trim-color);font-weight:900;font-size:10.5px}',
      '.exames-resumo-usg .gm-usg-list{margin:0;padding:0;list-style:none}',
      '.exames-resumo-usg .gm-usg-list li{position:relative;padding:4px 2px 4px 13px;border-bottom:1px dashed rgba(148,163,184,.42)}',
      '.exames-resumo-usg .gm-usg-list li:last-child{border-bottom:0}',
      '.exames-resumo-usg .gm-usg-list li:before{content:"•";position:absolute;left:2px;top:2px;color:var(--trim-color);font-size:14px;font-weight:900}',
      '.gm-exames-grupo{margin:14px 0 9px;padding:9px 12px;border-radius:12px;font-size:11px;font-weight:900;letter-spacing:.02em}',
      '.gm-exames-grupo.rotina{background:#ecfdf5;border:1px solid #6ee7b7;color:#047857}',
      '.gm-exames-grupo.indicacao{background:#f8fafc;border:1px solid #cbd5e1;color:#475569}'
    ].join('');
    document.head.appendChild(style);
  }

  function normalizar(texto) {
    return String(texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function blocoUltrassons(itens) {
    return '<div class="gm-usg-title">ULTRASSONOGRAFIAS</div>' +
      '<ul class="gm-usg-list">' +
      itens.map(function (item) { return '<li>' + item + '</li>'; }).join('') +
      '</ul>';
  }

  function localizarCaixas() {
    var caixas = Array.prototype.slice.call(document.querySelectorAll('.exames-resumo-usg'));
    if (caixas.length >= 3) return caixas.slice(0, 3);

    var candidatos = Array.prototype.slice.call(document.querySelectorAll('div'));
    return candidatos.filter(function (el) {
      var texto = normalizar(el.textContent);
      return texto.indexOf('usg:') === 0 && el.children.length <= 8;
    }).slice(0, 3);
  }

  function removerTshDoResumo() {
    var raiz = document.querySelector('.exames-resumo-v2') || document.body;
    Array.prototype.slice.call(raiz.querySelectorAll('li')).forEach(function (item) {
      var texto = normalizar(item.textContent);
      if (texto === 'tsh' || texto.indexOf('tsh —') === 0 || texto.indexOf('tsh -') === 0) {
        item.remove();
      }
    });
  }

  function aplicar() {
    garantirEstilos();
    removerTshDoResumo();

    var caixas = localizarCaixas();
    if (caixas.length < 3) return false;

    caixas[0].classList.add('exames-resumo-usg');
    caixas[0].innerHTML = blocoUltrassons([
      '<strong>USG obstétrica inicial (preferencialmente transvaginal)</strong> — localização, viabilidade, datação e número de fetos.',
      '<strong>USG morfológica do 1º trimestre com translucência nucal</strong> — 11s a 13s6d.'
    ]);

    caixas[1].classList.add('exames-resumo-usg');
    caixas[1].innerHTML = blocoUltrassons([
      '<strong>USG morfológica do 2º trimestre</strong> — 18 a 24 semanas.',
      '<strong>USG transvaginal para cervicometria</strong> — conforme indicação clínica/obstétrica.',
      '<strong>USG obstétrica com Doppler</strong> — conforme indicação clínica/obstétrica.'
    ]);

    caixas[2].classList.add('exames-resumo-usg');
    caixas[2].innerHTML = blocoUltrassons([
      '<strong>USG obstétrica para avaliação do crescimento fetal</strong> — biometria, apresentação, placenta e líquido amniótico, conforme indicação/protocolo.',
      '<strong>USG obstétrica com Doppler</strong> — conforme indicação clínica/obstétrica.',
      '<strong>Perfil biofísico fetal</strong> — quando indicado para avaliação complementar da vitalidade fetal.'
    ]);

    return true;
  }

  function iniciar() {
    var tentativas = 0;
    function tentar() {
      tentativas += 1;
      if (aplicar() || tentativas >= 20) return;
      setTimeout(tentar, 150);
    }
    tentar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  } else {
    iniciar();
  }
})();