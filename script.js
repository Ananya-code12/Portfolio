/* ============================================================
   PORTFOLIO — script.js
   ============================================================ */
 
/* ── Navbar: active link highlight ──────────────────────── */
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
 
/* ── Mobile hamburger ────────────────────────────────────── */
const toggle   = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
 
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });
 
  /* close menu when a link is clicked */
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}
 
/* ── Navbar shrink on scroll ─────────────────────────────── */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,0.4)'
      : 'none';
  }, { passive: true });
}
 
/* ── Scroll fade-in observer ─────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
 
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
 
/* ── Skill bars animation ────────────────────────────────── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
 
document.querySelectorAll('.skills-categories').forEach(el => barObserver.observe(el));
 
/* ── Typewriter effect (hero page only) ─────────────────── */
const roleEl = document.querySelector('.role-text');
const roles  = ['Full-Stack Developer', 'Problem Solver', 'Open Source Enthusiast', 'CSE Student'];
let   rIdx   = 0, cIdx = 0, deleting = false;
 
function typeWriter() {
  if (!roleEl) return;
 
  const current = roles[rIdx];
 
  if (!deleting) {
    roleEl.textContent = current.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    roleEl.textContent = current.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
    }
  }
 
  setTimeout(typeWriter, deleting ? 60 : 100);
}
 
if (roleEl) typeWriter();
 
/* ── Smooth scroll for in-page anchor links ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 68;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});
 
/* ── Contact form (static submit) ────────────────────────── */
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#5dffce';
    btn.style.color = '#0a0c10';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
 
/* ── Stagger children on page load ──────────────────────── */
window.addEventListener('load', () => {
  document.querySelectorAll('.stagger-child').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    el.classList.add('visible');
  });
});