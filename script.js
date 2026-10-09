const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]:not([aria-disabled="true"])')];
const header = document.querySelector('.site-header');
const progressBar = document.querySelector('.reading-progress span');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const storedTheme = localStorage.getItem('theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  themeColor.setAttribute('content', theme === 'dark' ? '#171613' : '#fdfcf9');
}

setTheme(storedTheme || preferredTheme);

themeButton.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
});

document.querySelector('.cv-link').addEventListener('click', (event) => event.preventDefault());
document.querySelector('#year').textContent = new Date().getFullYear();

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
  progressBar.style.setProperty('--read-progress', progress);
  if (!reducedMotion) {
    root.style.setProperty('--art-shift', `${Math.min(window.scrollY * 0.015, 14)}px`);
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if (finePointer && !reducedMotion) {
  document.querySelectorAll('.talk, .teaching-list article').forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const bounds = item.getBoundingClientRect();
      item.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
      item.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
    }, { passive: true });
  });
}

const revealItems = [
  document.querySelector('.about-copy'),
  document.querySelector('.portrait'),
  ...document.querySelectorAll('.section-heading, .talk, .teaching-list article, .cv-section > *')
].filter(Boolean);

revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  if (item.matches('.portrait, .talk, .teaching-list article')) {
    item.style.setProperty('--reveal-delay', `${(index % 2) * 90}ms`);
  }
});

if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach((section) => observer.observe(section));
}
