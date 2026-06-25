/* ============================================================
   JIAHAN PORTFOLIO — JavaScript
   Animations, Interactions & Effects
   ============================================================ */

'use strict';

// ── DOM Ready ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavbar();
  initTyped();
  initScrollReveal();
  initSkillBars();
  initPortfolioFilter();
  initContactForm();
  initCounters();
  initBackToTop();
  initSmoothScroll();
  initInfoModal();
});

// ── Loader ─────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1200);
  });
  document.body.style.overflow = 'hidden';
}

// ── Custom Cursor ──────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .portfolio-card, .skill-card, .tool-badge');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform    = 'translate(-50%, -50%) scale(2)';
      follower.style.transform  = 'translate(-50%, -50%) scale(1.5)';
      follower.style.borderColor = 'var(--rose-dark)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform    = 'translate(-50%, -50%) scale(1)';
      follower.style.transform  = 'translate(-50%, -50%) scale(1)';
      follower.style.borderColor = 'var(--rose)';
    });
  });
}



// ── Navbar ─────────────────────────────────────────────────
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ── Typed Text Effect ──────────────────────────────────────
function initTyped() {
  const el = document.getElementById('typedText');
  const phrases = [
    'Fresh Graduate RPL',
    'UI/UX Enthusiast',
    'Software Engineer',
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      el.textContent = current.slice(0, charIdx--);
    } else {
      el.textContent = current.slice(0, charIdx++);
    }

    let delay = isDeleting ? 60 : 110;
    if (!isDeleting && charIdx === current.length + 1) {
      delay = 1800; isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

// ── Scroll Reveal ──────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.style.animationDelay || '0s';
        const ms = parseFloat(delay) * 1000;
        setTimeout(() => el.classList.add('visible'), ms);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
}

// ── Skill Bars ─────────────────────────────────────────────
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill, .soft-skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 300);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ── Counters ───────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 40);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ── Portfolio Filter ───────────────────────────────────────
function initPortfolioFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ── Contact Form ───────────────────────────────────────────
function initContactForm() {
  const form      = document.getElementById('contactForm');
  const overlay   = document.getElementById('formSuccessOverlay');
  const closeBtn  = document.getElementById('closeSuccessBtn');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    const nameVal    = form.querySelector('[name="name"]').value;
    const emailVal   = form.querySelector('[name="email"]').value;
    const subjectVal = form.querySelector('[name="subject"]').value;
    const messageVal = form.querySelector('[name="message"]').value;

    const templateParams = {
      name:       nameVal,       // untuk {{name}} di From Name template
      email:      emailVal,      // untuk {{email}} di Reply To template
      from_name:  nameVal,       // untuk {{from_name}} di body template
      from_email: emailVal,      // untuk {{from_email}} di body template
      subject:    subjectVal,    // untuk {{subject}}
      message:    messageVal,    // untuk {{message}}
    };

    const resetBtn = () => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
      submitBtn.disabled = false;
    };

    const sendMailtoFallback = () => {
      const body = encodeURIComponent(
        `Nama: ${nameVal}\nEmail: ${emailVal}\n\n${messageVal}`
      );
      const mailtoLink = `mailto:jihanjihan3137@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${body}`;
      window.location.href = mailtoLink;
      overlay.classList.add('show');
      form.reset();
      resetBtn();
    };

    // Try EmailJS first, fall back to mailto: if it fails
    if (typeof emailjs !== 'undefined') {
      emailjs.send('service_ffuv5um', 'template_67e4yrh', templateParams)
        .then(() => {
          overlay.classList.add('show');
          form.reset();
          resetBtn();
        })
        .catch((error) => {
          console.warn('EmailJS gagal, menggunakan mailto fallback:', JSON.stringify(error));
          sendMailtoFallback();
        });
    } else {
      sendMailtoFallback();
    }
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
    }
  });
}

// ── Info Modal ─────────────────────────────────────────────
window.showInfoModal = function(title, text) {
  const overlay = document.getElementById('infoOverlay');
  const titleEl = document.getElementById('infoModalTitle');
  const textEl  = document.getElementById('infoModalText');
  
  if (titleEl) titleEl.textContent = title;
  if (textEl) textEl.textContent = text;
  
  if (overlay) overlay.classList.add('show');
}

function initInfoModal() {
  const overlay = document.getElementById('infoOverlay');
  const closeBtn = document.getElementById('closeInfoBtn');
  
  if (!overlay) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('show');
    });
  }
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
    }
  });
}

// ── Back to Top ────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Smooth Scroll ──────────────────────────────────────────
function initSmoothScroll() {
  // Only intercept true in-page anchor links (href starts with '#' + a character)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    // Skip bare '#' links and non-anchor links
    if (!href || href === '#' || href.length < 2) return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Parallax Hero Image (subtle) ───────────────────────────
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-image-wrap');
  if (!heroImg) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});

// ── CV Download ────────────────────────────────────────────
window.downloadCV = function(e) {
  e.preventDefault();
  const link = document.createElement('a');
  link.href = 'cv/CV-JIHAN%20ALIFA%20NAHDA%20%202.pdf';
  link.download = 'CV-Jihan-Alifa-Nahda.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
