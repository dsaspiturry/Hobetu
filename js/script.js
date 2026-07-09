(() => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form submission (Formspree) — sends directly to Damien's inbox
  const form = document.getElementById('contactForm');
  const panel = document.getElementById('contactPanel');
  const success = document.getElementById('contactSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const errorMsg = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMsg.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          panel.hidden = true;
          success.hidden = false;
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        errorMsg.hidden = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer le message';
      }
    });
  }
})();
