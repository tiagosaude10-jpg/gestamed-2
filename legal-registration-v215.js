(function () {
  'use strict';

  var PATCH_ID = 'gestamed-legal-registration-2026-08-17-215';
  var SUPABASE_URL = 'https://ptymhmvkuedgudhlvcxo.supabase.co';
  var SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SbzuQSBhwR3PXlaRrUsPnw_2plttVAf';
  var TERMS_VERSION = '2026-08-17.1';
  var PRIVACY_VERSION = '2026-08-17.1';

  if (document.documentElement.getAttribute('data-gm-legal-registration') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-legal-registration', PATCH_ID);

  var TERMS_TEXT = [
    'O GestaMed é uma ferramenta educacional e de apoio informacional destinada prioritariamente a profissionais e estudantes da área da saúde.',
    'O aplicativo não substitui avaliação clínica, julgamento profissional, protocolos institucionais, diretrizes oficiais, prescrição individualizada ou atendimento médico. O usuário é responsável por conferir a adequação das informações ao caso concreto e às normas vigentes.',
    'O acesso é pessoal e pode depender de confirmação do endereço eletrônico e aprovação administrativa. É proibido compartilhar credenciais, explorar falhas, acessar áreas sem autorização ou utilizar o serviço para finalidade ilícita.',
    'O GestaMed pode atualizar conteúdos e funcionalidades para correção, segurança ou evolução técnica. Informações clínicas devem ser verificadas em fontes oficiais quando houver dúvida, divergência ou situação de risco.',
    'O usuário compromete-se a fornecer dados cadastrais verdadeiros e manter suas credenciais sob sigilo. Estes termos podem ser atualizados e, quando uma alteração exigir nova manifestação, o sistema poderá solicitar novo aceite.'
  ];

  var PRIVACY_TEXT = [
    'O GestaMed trata dados pessoais necessários ao cadastro, autenticação, segurança, administração de acesso e comunicação com o usuário, incluindo nome, e-mail, telefone e registros de aceite.',
    'As finalidades incluem criar e proteger a conta, confirmar identidade eletrônica, registrar os documentos jurídicos aceitos, permitir análise administrativa, prestar suporte, manter a segurança e cumprir obrigações legais ou regulatórias aplicáveis.',
    'Comunicações promocionais ou educacionais opcionais são separadas do cadastro e podem ser recusadas. Quando o tratamento depender de consentimento, ele poderá ser revogado pelos meios disponibilizados pelo GestaMed.',
    'Os dados podem ser processados por fornecedores de infraestrutura necessários ao funcionamento do serviço, como autenticação, hospedagem e envio de e-mails, observadas medidas de segurança aplicáveis.',
    'O titular pode exercer os direitos previstos na legislação aplicável, incluindo confirmação de tratamento, acesso, correção, informações sobre uso e compartilhamento, anonimização, bloqueio ou eliminação quando cabível, oposição e revogação de consentimento nas hipóteses legais.',
    'Os dados serão mantidos pelo período necessário às finalidades informadas e às obrigações legais, de segurança e de defesa de direitos. O GestaMed não deve ser utilizado para inserir dados identificáveis de pacientes em campos que não tenham sido projetados e autorizados para essa finalidade.'
  ];

  function addStyle() {
    if (document.getElementById('gm-legal-registration-style')) return;
    var style = document.createElement('style');
    style.id = 'gm-legal-registration-style';
    style.textContent = [
      '.gm-legal-register-card{padding-top:24px!important;text-align:left!important}.gm-legal-register-card h1{text-align:left!important;margin:3px 0 6px!important}.gm-legal-register-card>.gm-register-intro{text-align:left;margin:0 0 18px;color:#765a68;font-size:14px;line-height:1.45}',
      '.gm-legal-register-card form{margin-top:10px!important}.gm-legal-register-card label{margin-top:12px!important}.gm-register-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.gm-register-help{margin:6px 0 0;color:#8a7280;font-size:11px;line-height:1.35}.gm-register-legal{margin-top:18px;padding:14px;border:1px solid #f0d6df;border-radius:16px;background:rgba(255,255,255,.76)}',
      '.gm-check-row{display:grid;grid-template-columns:24px 1fr;gap:10px;align-items:start;margin:0;padding:7px 0;color:#493846;font-size:13px;line-height:1.42}.gm-check-row input{width:20px!important;height:20px!important;margin:0!important;accent-color:#d82f62}.gm-check-row+.gm-check-row{border-top:1px solid rgba(220,80,125,.1)}.gm-legal-link{border:0;padding:0;background:transparent;color:#b91f52;font:inherit;font-weight:750;text-decoration:underline;cursor:pointer}.gm-legal-version{display:block;margin-top:3px;color:#967684;font-size:10px}.gm-register-submit{margin-top:15px!important}.gm-register-required{color:#b41d4c;font-size:11px;margin:8px 0 0}',
      '#gm-legal-modal{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(55,24,41,.5);backdrop-filter:blur(5px)}.gm-legal-modal-card{box-sizing:border-box;width:min(94vw,620px);max-height:84vh;overflow:hidden;border-radius:24px;background:#fff;box-shadow:0 24px 70px rgba(70,25,48,.28);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:#382632}.gm-legal-modal-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #f0d8e1;background:#fff7fa}.gm-legal-modal-head h2{margin:0;color:#9f214e;font-size:20px}.gm-legal-modal-close{width:34px;height:34px;border:0;border-radius:50%;background:#ffe7ef;color:#b51f51;font-size:24px;cursor:pointer}.gm-legal-modal-body{max-height:calc(84vh - 70px);overflow:auto;padding:20px}.gm-legal-modal-body p{margin:0 0 13px;color:#51404a;font-size:14px;line-height:1.55}.gm-legal-modal-body .gm-doc-version{margin-bottom:16px;color:#8d6d7a;font-size:12px;font-weight:700}.gm-legal-modal-body h3{margin:21px 0 8px;color:#8e1944;font-size:16px}',
      '@media(max-width:420px){.gm-register-two{grid-template-columns:1fr}.gm-legal-register-card{padding:24px 18px 20px!important}.gm-check-row{font-size:12.5px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function openDocument(type) {
    var old = document.getElementById('gm-legal-modal');
    if (old) old.remove();
    var isTerms = type === 'terms';
    var modal = document.createElement('div');
    modal.id = 'gm-legal-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    var title = isTerms ? 'Termos de Uso do GestaMed' : 'Aviso de Privacidade do GestaMed';
    var version = isTerms ? TERMS_VERSION : PRIVACY_VERSION;
    var paragraphs = isTerms ? TERMS_TEXT : PRIVACY_TEXT;
    modal.innerHTML = '<section class="gm-legal-modal-card"><header class="gm-legal-modal-head"><h2>' + title + '</h2><button class="gm-legal-modal-close" type="button" aria-label="Fechar">×</button></header><div class="gm-legal-modal-body"><div class="gm-doc-version">Versão ' + version + ' • vigente a partir de 17/08/2026</div>' + paragraphs.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '<h3>Registro do aceite</h3><p>Quando você cria a conta, o GestaMed registra no servidor a versão destes documentos, a data e hora do aceite, a declaração de maioridade e sua opção sobre comunicações. Uma confirmação é enviada para o e-mail cadastrado.</p></div></section>';
    function close() { modal.remove(); }
    modal.querySelector('.gm-legal-modal-close').addEventListener('click', close);
    modal.addEventListener('click', function (event) { if (event.target === modal) close(); });
    (document.getElementById('gm-app-flow') || document.body).appendChild(modal);
  }

  function showAccountStatus(email) {
    var flow = document.getElementById('gm-app-flow');
    if (!flow) return;
    flow.setAttribute('data-screen', 'account-status');
    flow.querySelectorAll('.gm-flow-screen').forEach(function (screen) {
      screen.classList.toggle('gm-screen-active', screen.getAttribute('data-screen') === 'account-status');
    });
    var screen = flow.querySelector('[data-screen="account-status"]');
    if (!screen) return;
    var h1 = screen.querySelector('h1');
    var message = screen.querySelector('.gm-account-status-message');
    var reason = screen.querySelector('.gm-account-status-reason');
    var refresh = screen.querySelector('.gm-account-refresh');
    if (h1) h1.textContent = 'Confirme seu e-mail';
    if (message) message.textContent = 'Enviamos a confirmação para ' + email + '. Você também receberá um e-mail separado com o registro dos documentos jurídicos aceitos. Depois de confirmar o endereço eletrônico, sua conta continuará aguardando aprovação administrativa.';
    if (reason) { reason.textContent = ''; reason.hidden = true; }
    if (refresh) refresh.hidden = true;
  }

  function authSignup(email, password, metadata) {
    var redirect = window.location.origin + window.location.pathname;
    return window.fetch(SUPABASE_URL + '/auth/v1/signup?redirect_to=' + encodeURIComponent(redirect), {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, data: metadata })
    }).then(function (response) {
      return response.text().then(function (raw) {
        var data = {};
        try { data = raw ? JSON.parse(raw) : {}; } catch (error) {}
        if (!response.ok) {
          var failure = new Error(data.msg || data.message || data.error_description || 'Não foi possível criar a conta.');
          failure.status = response.status;
          failure.code = data.error_code || data.code || '';
          throw failure;
        }
        return data;
      });
    });
  }

  function friendlyError(error) {
    if (!error) return 'Não foi possível criar a conta agora. Tente novamente.';
    if (error.status === 429) return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
    if (error.code === 'user_already_exists' || error.code === 'email_exists') return 'Já existe uma conta cadastrada com este e-mail.';
    if (error.code === 'weak_password') return 'Escolha uma senha mais forte, com pelo menos 8 caracteres, misturando letras e números.';
    if (error.code === 'email_address_invalid') return 'Digite um endereço de e-mail válido.';
    return 'Não foi possível criar a conta agora. Confira os dados e tente novamente.';
  }

  function patchRegister() {
    var screen = document.querySelector('#gm-app-flow [data-screen="register"]');
    if (!screen || screen.getAttribute('data-gm-legal-patched') === '1') return false;
    screen.setAttribute('data-gm-legal-patched', '1');
    addStyle();

    var card = screen.querySelector('.gm-login-card');
    var form = screen.querySelector('form');
    if (!card || !form) return false;
    card.classList.add('gm-legal-register-card');
    var title = card.querySelector('h1');
    if (title) title.textContent = 'Crie seu acesso ao GestaMed';
    var intro = card.querySelector(':scope > p');
    if (intro) {
      intro.className = 'gm-register-intro';
      intro.textContent = 'Preencha seus dados. O e-mail deverá ser confirmado e o acesso será analisado pela administração.';
    }

    form.innerHTML = '<label for="gm-register-name">Nome completo</label><input id="gm-register-name" name="displayName" type="text" autocomplete="name" maxlength="120" placeholder="Seu nome completo" required>' +
      '<label for="gm-register-email">E-mail</label><input id="gm-register-email" name="email" type="email" autocomplete="email" placeholder="seuemail@exemplo.com" required>' +
      '<label for="gm-register-phone">Telefone com DDD</label><input id="gm-register-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="(69) 99999-9999" required><p class="gm-register-help">Utilizado para identificação e contato relacionado à sua conta.</p>' +
      '<div class="gm-register-two"><div><label for="gm-register-password">Senha</label><div class="gm-password-field"><input id="gm-register-password" name="password" type="password" autocomplete="new-password" minlength="8" placeholder="Mínimo de 8 caracteres" required><button class="gm-password-toggle" type="button" data-target="gm-register-password" aria-label="Mostrar senha">Mostrar</button></div></div><div><label for="gm-register-password-confirm">Confirmar senha</label><div class="gm-password-field"><input id="gm-register-password-confirm" name="passwordConfirm" type="password" autocomplete="new-password" minlength="8" placeholder="Digite novamente" required><button class="gm-password-toggle" type="button" data-target="gm-register-password-confirm" aria-label="Mostrar confirmação">Mostrar</button></div></div></div>' +
      '<section class="gm-register-legal" aria-label="Declarações e preferências"><label class="gm-check-row"><input id="gm-age-confirm" type="checkbox"><span><strong>Declaro que tenho 18 anos ou mais.</strong><span class="gm-legal-version">Declaração obrigatória para criação da conta.</span></span></label><label class="gm-check-row"><input id="gm-legal-confirm" type="checkbox"><span>Li e concordo com os <button class="gm-legal-link" type="button" data-doc="terms">Termos de Uso</button> e declaro ciência do <button class="gm-legal-link" type="button" data-doc="privacy">Aviso de Privacidade</button>.<span class="gm-legal-version">Termos ' + TERMS_VERSION + ' • Privacidade ' + PRIVACY_VERSION + '</span></span></label><label class="gm-check-row"><input id="gm-marketing-opt" type="checkbox"><span>Quero receber novidades, atualizações de conteúdo e materiais educacionais do GestaMed. <strong>Opcional.</strong><span class="gm-legal-version">Você poderá revogar essa preferência posteriormente.</span></span></label></section>' +
      '<p class="gm-register-required">Os itens de maioridade e documentos jurídicos são obrigatórios. A opção de comunicações permanece desmarcada por padrão.</p><p class="gm-form-error" role="alert"></p><button class="gm-primary-button gm-login-submit gm-register-submit" type="submit">Criar meu acesso</button>';

    form.querySelectorAll('.gm-password-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        var input = form.querySelector('#' + button.getAttribute('data-target'));
        if (!input) return;
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        button.textContent = show ? 'Ocultar' : 'Mostrar';
      });
    });
    form.querySelectorAll('[data-doc]').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        openDocument(button.getAttribute('data-doc'));
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var name = String(form.querySelector('#gm-register-name').value || '').replace(/\s+/g, ' ').trim();
      var emailInput = form.querySelector('#gm-register-email');
      var email = String(emailInput.value || '').trim().toLowerCase();
      var phone = String(form.querySelector('#gm-register-phone').value || '').trim();
      var phoneDigits = phone.replace(/\D/g, '');
      var password = form.querySelector('#gm-register-password').value;
      var confirmation = form.querySelector('#gm-register-password-confirm').value;
      var age = form.querySelector('#gm-age-confirm').checked;
      var legal = form.querySelector('#gm-legal-confirm').checked;
      var marketing = form.querySelector('#gm-marketing-opt').checked;
      var error = form.querySelector('.gm-form-error');
      var submit = form.querySelector('.gm-login-submit');

      error.classList.remove('gm-error-visible');
      if (name.length < 3) {
        error.textContent = 'Digite seu nome completo.'; error.classList.add('gm-error-visible'); return;
      }
      if (!email || !emailInput.checkValidity()) {
        error.textContent = 'Digite um e-mail válido.'; error.classList.add('gm-error-visible'); return;
      }
      if (phoneDigits.length < 10 || phoneDigits.length > 13) {
        error.textContent = 'Digite um telefone válido com DDD.'; error.classList.add('gm-error-visible'); return;
      }
      if (password.length < 8) {
        error.textContent = 'A senha precisa ter pelo menos 8 caracteres.'; error.classList.add('gm-error-visible'); return;
      }
      if (password !== confirmation) {
        error.textContent = 'As duas senhas precisam ser iguais.'; error.classList.add('gm-error-visible'); return;
      }
      if (!age) {
        error.textContent = 'Para criar a conta, confirme que você tem 18 anos ou mais.'; error.classList.add('gm-error-visible'); return;
      }
      if (!legal) {
        error.textContent = 'Leia e aceite os Termos de Uso e o Aviso de Privacidade para continuar.'; error.classList.add('gm-error-visible'); return;
      }

      submit.disabled = true;
      submit.textContent = 'Criando acesso…';
      authSignup(email, password, {
        display_name: name,
        phone: phone,
        legal_acceptance: true,
        age_over_18: true,
        terms_version: TERMS_VERSION,
        privacy_version: PRIVACY_VERSION,
        marketing_opt_in: marketing
      }).then(function () {
        showAccountStatus(email);
      }).catch(function (failure) {
        error.textContent = friendlyError(failure);
        error.classList.add('gm-error-visible');
      }).then(function () {
        submit.disabled = false;
        submit.textContent = 'Criar meu acesso';
      });
    }, true);

    return true;
  }

  function boot() {
    if (patchRegister()) return;
    var observer = new MutationObserver(function () {
      if (patchRegister()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(function () { patchRegister(); }, 1500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
