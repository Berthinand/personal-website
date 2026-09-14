document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const nav = document.querySelector('.nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal (fade-in sections once, on enter) ---------- */
  const revealTargets = document.querySelectorAll('.section, .resume-cta, .final-cta');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => observer.observe(el));
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main [id]');
  const navAnchors = document.querySelectorAll('.nav__links a');

  if ('IntersectionObserver' in window && sections.length && navAnchors.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav__links a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(sec => navObserver.observe(sec));
  }

  /* ---------- Contact form: basic validation + honeypot spam guard ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot: if this hidden field has a value, silently drop the submission
      const honeypot = form.querySelector('#company');
      if (honeypot && honeypot.value.trim() !== '') {
        status.textContent = '';
        form.reset();
        return;
      }

      if (!form.checkValidity()) {
        status.textContent = 'Please fill in all fields before sending.';
        status.style.color = '#e08585';
        form.reportValidity();
        return;
      }

      // No backend is wired up yet — replace this block with your form
      // submission logic (e.g. an API call to Formspree, Netlify Forms, etc.)
      status.style.color = '';
      status.textContent = 'Thanks for reaching out — this form is not yet connected to an inbox.';
      form.reset();
    });
  }

});
