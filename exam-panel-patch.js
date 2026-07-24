(function () {
  'use strict';

  var detalhe = `
    <div class="exames-trimestre-header t1">
      <span>1️⃣ 1º Trimestre</span>
      <span class="exames-trimestre-sub">— até 13 semanas e 6 dias (idealmente na 1ª consulta)</span>
    </div>

    <div class="gm-exames-grupo rotina">✓ ROTINA / OBRIGATÓRIOS NO PRÉ-NATAL HABITUAL</div>

    <div class="exame-item"><span class="exame-nome">Hemograma completo</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">Avalia anemia, plaquetas e alterações hematológicas. Repetir entre 28 e 30 semanas.</div></div>
    <div class="exame-item"><span class="exame-nome">Tipagem sanguínea ABO + Fator Rh</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">Identifica o grupo sanguíneo e o risco de aloimunização. Se Rh negativo, complementar com Coombs indireto.</div></div>
    <div class="exame-item"><span class="exame-nome">Glicemia de jejum</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">Rastreia diabetes prévio e hiperglicemia detectada no início da gestação. Se não houver diagnóstico, programar TOTG 75 g entre 24 e 28 semanas.</div></div>
    <div class="exame-item"><span class="exame-nome">EAS (urina tipo 1) + Urocultura com antibiograma</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">Pesquisa alterações urinárias e bacteriúria assintomática. A urocultura deve ser repetida entre 28 e 30 semanas.</div></div>
    <div class="exame-item"><span class="exame-nome">Teste rápido para sífilis ou VDRL</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">Detecta sífilis materna e permite tratamento precoce. Repetir no 3º trimestre e no momento do parto ou abortamento.</div></div>
    <div class="exame-item"><span class="exame-nome">Teste rápido para HIV / sorologia</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">Permite diagnóstico e prevenção da transmissão vertical. Repetir no início do 3º trimestre.</div></div>
    <div class="exame-item"><span class="exame-nome">HBsAg ou teste rápido para Hepatite B</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">Identifica infecção pelo vírus B e orienta avaliação materna e profilaxia do recém-nascido.</div></div>
    <div class="exame-item"><span class="exame-nome">Anti-HCV ou teste rápido para Hepatite C</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">Rastreia infecção pelo vírus C e define necessidade de investigação complementar.</div></div>
    <div class="exame-item"><span class="exame-nome">Toxoplasmose (IgG e IgM)</span><span class="exame-quando">1ª consulta</span><div class="exame-desc">IgG−/IgM− indica suscetibilidade e necessidade de prevenção e repetição conforme protocolo. IgM reagente exige investigação de infecção recente.</div></div>

    <div class="gm-exames-grupo indicacao">○ CONFORME INDICAÇÃO, HISTÓRICO OU PROTOCOLO LOCAL</div>

    <div class="exame-item"><span class="exame-nome">Coombs indireto</span><span class="exame-quando">se Rh negativo</span><div class="exame-desc">Pesquisa anticorpos maternos contra hemácias fetais. Se não sensibilizada, repetir conforme o protocolo de aloimunização.</div></div>
    <div class="exame-item"><span class="exame-nome">Sorologia para Rubéola</span><span class="exame-quando">se indicada</span><div class="exame-desc">Solicitar quando houver dúvida sobre imunidade ou conforme protocolo local. Não substitui a avaliação da caderneta de vacinação.</div></div>
    <div class="exame-item"><span class="exame-nome">Citopatológico do colo do útero</span><span class="exame-quando">se necessário</span><div class="exame-desc">Realizar quando o rastreamento estiver indicado ou atrasado, considerando idade, histórico e protocolo vigente.</div></div>
    <div class="exame-item"><span class="exame-nome">Eletroforese de hemoglobina</span><span class="exame-quando">se indicada</span><div class="exame-desc">Investigar quando houver história pessoal ou familiar de hemoglobinopatia ou indicação do protocolo local.</div></div>
    <div class="exame-item"><span class="exame-nome">Parasitológico de fezes</span><span class="exame-quando">se indicação</span><div class="exame-desc">Não é universal. Solicitar diante de sintomas, anemia sem causa definida ou risco epidemiológico.</div></div>
    <div class="exame-item"><span class="exame-nome">Malária, Doença de Chagas e HTLV</span><span class="exame-quando">risco epidemiológico</span><div class="exame-desc">Solicitar conforme residência, viagem, exposição, história clínica e protocolo regional.</div></div>
    <div class="exame-item"><span class="exame-nome">USG obstétrica inicial (preferencialmente transvaginal)</span><span class="exame-quando">quando necessária</span><div class="exame-desc">Útil para localização, viabilidade, datação, número de fetos e corionicidade, especialmente quando há dúvida de idade gestacional, dor ou sangramento.</div></div>
    <div class="exame-item"><span class="exame-nome">USG morfológica do 1º trimestre com translucência nucal</span><span class="exame-quando">11s a 13s6d</span><div class="exame-desc">Avalia anatomia inicial e marcadores de aneuploidias, conforme disponibilidade e protocolo do serviço.</div></div>

    <div class="exames-trimestre-header t2"><span>2️⃣ 2º Trimestre</span><span class="exames-trimestre-sub">— 14 a 27 semanas e 6 dias</span></div>
    <div class="gm-exames-grupo rotina">✓ ROTINA / OBRIGATÓRIOS QUANDO APLICÁVEIS</div>
    <div class="exame-item"><span class="exame-nome">TOTG 75 g</span><span class="exame-quando">24–28 semanas</span><div class="exame-desc">Rastreia diabetes mellitus gestacional quando não houve diagnóstico prévio. Realizar glicemias em jejum, 1 hora e 2 horas após 75 g de glicose.</div></div>
    <div class="exame-item"><span class="exame-nome">Toxoplasmose (IgG e IgM) — repetição</span><span class="exame-quando">se suscetível</span><div class="exame-desc">Repetir em gestante IgG−/IgM− conforme protocolo local e reforçar medidas de prevenção.</div></div>
    <div class="gm-exames-grupo indicacao">○ CONFORME INDICAÇÃO, CONDIÇÃO MATERNA OU DISPONIBILIDADE</div>
    <div class="exame-item"><span class="exame-nome">Coombs indireto seriado</span><span class="exame-quando">se Rh negativo</span><div class="exame-desc">Repetir a cada 4 semanas quando indicado em gestante Rh negativo não sensibilizada.</div></div>
    <div class="exame-item"><span class="exame-nome">USG morfológica do 2º trimestre</span><span class="exame-quando">18–24 semanas</span><div class="exame-desc">Avalia detalhadamente a anatomia fetal, placenta e líquido amniótico. Recomendada conforme disponibilidade do serviço.</div></div>
    <div class="exame-item"><span class="exame-nome">USG transvaginal para cervicometria</span><span class="exame-quando">se indicada</span><div class="exame-desc">Avalia o comprimento do colo uterino em gestantes com fatores de risco para prematuridade ou conforme protocolo.</div></div>
    <div class="exame-item"><span class="exame-nome">USG obstétrica com Doppler</span><span class="exame-quando">se indicada</span><div class="exame-desc">Não é rastreamento universal no baixo risco. Usar diante de suspeita de insuficiência placentária, alteração de crescimento ou outra indicação obstétrica.</div></div>
    <div class="exame-item"><span class="exame-nome">Ecocardiograma fetal</span><span class="exame-quando">se indicado</span><div class="exame-desc">Solicitar diante de achado cardíaco fetal, diabetes prévio, exposição relevante ou antecedentes maternos/familiares específicos.</div></div>
    <div class="exame-item"><span class="exame-nome">Repetição de HIV, sífilis ou hepatites</span><span class="exame-quando">nova exposição/risco</span><div class="exame-desc">Antecipar a repetição quando houver exposição de risco, violência sexual, parceiro com infecção ou outra indicação clínica.</div></div>

    <div class="exames-trimestre-header t3"><span>3️⃣ 3º Trimestre</span><span class="exames-trimestre-sub">— 28 semanas até o parto</span></div>
    <div class="gm-exames-grupo rotina">✓ ROTINA / OBRIGATÓRIOS NO INÍCIO DO 3º TRIMESTRE</div>
    <div class="exame-item"><span class="exame-nome">Hemograma completo — repetição</span><span class="exame-quando">28–30 semanas</span><div class="exame-desc">Reavalia anemia, plaquetas e condições hematológicas antes do parto.</div></div>
    <div class="exame-item"><span class="exame-nome">Glicemia de jejum</span><span class="exame-quando">início do 3º trimestre</span><div class="exame-desc">Reavaliar o metabolismo glicêmico conforme rotina do Ministério da Saúde e resultados anteriores.</div></div>
    <div class="exame-item"><span class="exame-nome">Teste rápido para sífilis ou VDRL — repetição</span><span class="exame-quando">28–30 semanas + parto</span><div class="exame-desc">Repetir no terceiro trimestre e no parto ou abortamento, independentemente do resultado inicial.</div></div>
    <div class="exame-item"><span class="exame-nome">Teste rápido para HIV / sorologia — repetição</span><span class="exame-quando">a partir de 28 semanas</span><div class="exame-desc">Repetir no início do terceiro trimestre para permitir intervenção oportuna e prevenção da transmissão vertical.</div></div>
    <div class="exame-item"><span class="exame-nome">EAS (urina tipo 1)</span><span class="exame-quando">início do 3º trimestre</span><div class="exame-desc">Pesquisa alterações urinárias, proteinúria, hematúria e sinais indiretos de infecção.</div></div>
    <div class="exame-item"><span class="exame-nome">Urocultura com antibiograma — repetição</span><span class="exame-quando">28–30 semanas</span><div class="exame-desc">Repete o rastreamento de bacteriúria assintomática, mesmo na ausência de sintomas.</div></div>
    <div class="exame-item"><span class="exame-nome">Toxoplasmose (IgG e IgM) — repetição</span><span class="exame-quando">se suscetível</span><div class="exame-desc">Repetir conforme protocolo em gestante previamente IgG−/IgM−.</div></div>
    <div class="gm-exames-grupo indicacao">○ CONFORME INDICAÇÃO OU PROTOCOLO MUNICIPAL</div>
    <div class="exame-item"><span class="exame-nome">Coombs indireto seriado</span><span class="exame-quando">se Rh negativo</span><div class="exame-desc">Manter controle conforme protocolo de aloimunização em gestante Rh negativo não sensibilizada.</div></div>
    <div class="exame-item"><span class="exame-nome">Pesquisa de Estreptococo do grupo B</span><span class="exame-quando">35–37 semanas</span><div class="exame-desc">Pode ser ofertada conforme rotina municipal. O resultado orienta a necessidade de antibioticoprofilaxia intraparto.</div></div>
    <div class="exame-item"><span class="exame-nome">HBsAg, Anti-HCV e outros testes infecciosos — repetição</span><span class="exame-quando">se indicada</span><div class="exame-desc">Repetir se não houver resultado confiável, se o pré-natal começou tardiamente ou diante de nova exposição ou fator de risco.</div></div>
    <div class="exame-item"><span class="exame-nome">Função renal, função hepática e coagulograma</span><span class="exame-quando">se suspeita clínica</span><div class="exame-desc">Solicitar diante de hipertensão, pré-eclâmpsia, colestase, sangramento, doença clínica ou outra intercorrência.</div></div>
    <div class="exame-item"><span class="exame-nome">USG obstétrica para avaliação do crescimento fetal</span><span class="exame-quando">se indicada</span><div class="exame-desc">Avalia biometria, crescimento, apresentação, placenta e líquido amniótico. Não é rotina seriada universal no baixo risco.</div></div>
    <div class="exame-item"><span class="exame-nome">USG obstétrica com Doppler</span><span class="exame-quando">se indicada</span><div class="exame-desc">Usar diante de suspeita de restrição de crescimento, insuficiência placentária, hipertensão ou outra indicação obstétrica.</div></div>
    <div class="exame-item"><span class="exame-nome">Perfil biofísico fetal</span><span class="exame-quando">se indicado</span><div class="exame-desc">Avaliação complementar da vitalidade fetal quando houver indicação clínica ou alteração em outros métodos de vigilância.</div></div>
  `;

  function aplicar() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
    var inicio = null;
    var fim = null;
    var no;

    while ((no = walker.nextNode())) {
      var texto = (no.nodeValue || '').trim();
      if (texto === '1º TRIMESTRE') inicio = no;
      if (texto === 'VACINAÇÃO') {
        fim = no;
        break;
      }
    }

    if (!inicio || !fim || inicio.parentNode !== fim.parentNode) return;

    var pai = inicio.parentNode;
    var atual = inicio.nextSibling;
    while (atual && atual !== fim) {
      var proximo = atual.nextSibling;
      pai.removeChild(atual);
      atual = proximo;
    }

    var template = document.createElement('template');
    template.innerHTML = detalhe;
    pai.insertBefore(template.content, fim);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicar, { once: true });
  } else {
    setTimeout(aplicar, 0);
  }
})();