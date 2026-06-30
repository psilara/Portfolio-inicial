const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const revealElements = document.querySelectorAll('.reveal');
const copyEmailButton = document.getElementById('copyEmail');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const activeNavObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navAnchors.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-45% 0px -45% 0px' }
);

sections.forEach((section) => activeNavObserver.observe(section));

copyEmailButton?.addEventListener('click', async () => {
  const email = 'pablosilesarano@gmail.com';

  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = 'Email copiado';
  } catch {
    copyEmailButton.textContent = email;
  }

  window.setTimeout(() => {
    copyEmailButton.textContent = 'Copiar email';
  }, 2200);
});
