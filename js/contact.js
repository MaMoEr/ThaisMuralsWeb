// Contact form: validates in the page and sends to Formspree without leaving the site.
// Without JavaScript the form still posts to Formspree as a normal HTML form.
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('cf-status');
  const button = form.querySelector('button[type="submit"]');

  const messages = {
    name: 'Please tell me your name.',
    email: 'Please enter an email address I can reply to, like name@example.com.',
    message: 'Please write a few words about your idea.',
  };

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
    setError(input, ok ? '' : messages[input.name] || 'Please fill in this field.');
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
      showStatus('The form is not connected yet. Add the Formspree form ID in index.html.', true);
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';
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
      title.textContent = name ? 'Thank you, ' + name + '.' : 'Thank you.';
      const text = document.createElement('p');
      text.textContent = 'Your enquiry has been sent. I’ll reply by email, and you can send photos of the wall in your reply.';
      done.append(title, text);
      form.replaceWith(done);
      done.focus();
    } catch (error) {
      button.disabled = false;
      button.textContent = 'Send enquiry →';
      showStatus('Your message could not be sent. ' + (error.message ? error.message + ' Please try again in a moment.' : 'Please check your internet connection and try again.'), true);
    }
  });
})();
