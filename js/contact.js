// Contact form: validates in the page and sends to Formspree without leaving the site.
// Without JavaScript the form still posts to Formspree as a normal HTML form.
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('cf-status');
  const button = form.querySelector('button[type="submit"]');
  const buttonLabel = button.textContent;

  // Texts per page language (<html lang>). Swedish is the default.
  const texts = {
    sv: {
      fields: {
        name: 'Skriv gärna ditt namn.',
        email: 'Skriv en mejladress jag kan svara till, t.ex. namn@exempel.se.',
        message: 'Skriv några ord om din idé.',
      },
      required: 'Fyll i det här fältet.',
      notConnected: 'Formuläret är inte kopplat än. Lägg in Formspree-formulärets id i index.html.',
      sending: 'Skickar…',
      thanks: function (name) { return name ? 'Tack, ' + name + '.' : 'Tack.'; },
      sent: 'Din förfrågan är skickad. Jag svarar via mejl, och du kan skicka bilder på väggen i ditt svar.',
      failed: 'Meddelandet kunde inte skickas. ',
      retry: ' Försök igen om en stund.',
      offline: 'Kontrollera din internetanslutning och försök igen.',
    },
    en: {
      fields: {
        name: 'Please tell me your name.',
        email: 'Please enter an email address I can reply to, like name@example.com.',
        message: 'Please write a few words about your idea.',
      },
      required: 'Please fill in this field.',
      notConnected: 'The form is not connected yet. Add the Formspree form ID in index.html.',
      sending: 'Sending…',
      thanks: function (name) { return name ? 'Thank you, ' + name + '.' : 'Thank you.'; },
      sent: 'Your enquiry has been sent. I’ll reply by email, and you can send photos of the wall in your reply.',
      failed: 'Your message could not be sent. ',
      retry: ' Please try again in a moment.',
      offline: 'Please check your internet connection and try again.',
    },
  };
  const t = texts[(document.documentElement.lang || 'sv').slice(0, 2)] || texts.sv;
  const messages = t.fields;

  function setError(input, text) {
    let err = input.parentElement.querySelector('.fieldError');
    if (!text) {
      input.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
      if (err) err.remove();
      return;
    }
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
    if (!err) {
      err = document.createElement('p');
      err.className = 'fieldError';
      err.id = input.id + '-error';
      input.parentElement.appendChild(err);
      input.setAttribute('aria-describedby', err.id);
    }
    err.textContent = text;
  }

  function check(input) {
    const ok = input.checkValidity();
    setError(input, ok ? '' : messages[input.name] || t.required);
    return ok;
  }

  form.querySelectorAll('[required]').forEach(function (input) {
    input.addEventListener('blur', function () { if (input.value) check(input); });
    input.addEventListener('input', function () { if (input.classList.contains('invalid')) check(input); });
  });

  function showStatus(text, isError) {
    status.textContent = text;
    status.classList.toggle('error', !!isError);
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const required = Array.from(form.querySelectorAll('[required]'));
    const invalid = required.filter(function (input) { return !check(input); });
    if (invalid.length) {
      invalid[0].focus();
      showStatus('', false);
      return;
    }

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      showStatus(t.notConnected, true);
      return;
    }

    button.disabled = true;
    button.textContent = t.sending;
    showStatus('', false);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        const data = await response.json().catch(function () { return {}; });
        const detail = data.errors ? data.errors.map(function (e) { return e.message; }).join(' ') : '';
        throw new Error(detail);
      }
      const name = (document.getElementById('cf-name').value || '').trim().split(' ')[0];
      const done = document.createElement('div');
      done.className = 'formDone';
      done.setAttribute('role', 'status');
      done.tabIndex = -1;
      const title = document.createElement('h3');
      title.textContent = t.thanks(name);
      const text = document.createElement('p');
      text.textContent = t.sent;
      done.append(title, text);
      form.replaceWith(done);
      done.focus();
    } catch (error) {
      button.disabled = false;
      button.textContent = buttonLabel;
      showStatus(t.failed + (error.message ? error.message + t.retry : t.offline), true);
    }
  });
})();
