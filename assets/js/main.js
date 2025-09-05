// HAyAms – JS interactions
(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });

    // Close menu on link click (mobile)
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Smooth scroll fix for header height (if needed)
  const header = document.querySelector('.site-header');
  const headerH = () => header ? header.getBoundingClientRect().height : 0;
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#' || !document.querySelector(targetId)) return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      const top = target.getBoundingClientRect().top + window.scrollY - headerH() - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form validation (front-end only)
  const form = document.querySelector('.contact-form');
  if (form) {
    const feedback = form.querySelector('.form-feedback');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      let error = '';
      if (!name.value.trim()) error = 'Merci d’indiquer votre nom.';
      else if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) error = 'Merci de saisir un email valide.';
      else if (message.value.trim().length < 10) error = 'Votre message doit contenir au moins 10 caractères.';

      if (error) {
        feedback.textContent = error;
        feedback.style.color = '#BF0B1A';
        return;
      }

      feedback.style.color = '#1a7f37';
      feedback.textContent = 'Merci ! Votre message a bien été préparé. (Demo)';
      form.reset();
    });
  }
})();
