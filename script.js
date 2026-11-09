// =========================================================
// MOBILE NAV TOGGLE
// =========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// HERO TERMINAL TYPING EFFECT
// =========================================================
const terminalLines = [
  { text: '$ whoami', cls: '' },
  { text: 'badsha_fahad', cls: 'line-dim' },
  { text: '', cls: '' },
  { text: '$ nmap -sV profile.dev', cls: '' },
  { text: 'PORT     STATE  SERVICE', cls: 'line-dim' },
  { text: '22/tcp   open   linux::kali', cls: '' },
  { text: '443/tcp  open   nmap::scanning', cls: '' },
  { text: '8080/tcp open   wireshark::analysis', cls: '' },
  { text: '', cls: '' },
  { text: '$ cat status.txt', cls: '' },
  { text: 'role: cyber security student', cls: 'line-amber' },
  { text: 'stage: year 1 — actively learning', cls: 'line-amber' },
];

const terminalBody = document.getElementById('terminalBody');
let lineIndex = 0;
let charIndex = 0;

function typeTerminal() {
  if (lineIndex >= terminalLines.length) {
    // finished — leave a blinking cursor on the last line
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    terminalBody.appendChild(cursor);
    return;
  }

  const current = terminalLines[lineIndex];

  if (charIndex === 0) {
    const lineEl = document.createElement('div');
    lineEl.className = current.cls;
    lineEl.dataset.active = 'true';
    terminalBody.appendChild(lineEl);
  }

  const activeLine = terminalBody.querySelector('[data-active="true"]');

  if (charIndex < current.text.length) {
    activeLine.textContent += current.text[charIndex];
    charIndex++;
    setTimeout(typeTerminal, current.text.length ? 18 : 0);
  } else {
    activeLine.removeAttribute('data-active');
    lineIndex++;
    charIndex = 0;
    setTimeout(typeTerminal, current.text === '' ? 80 : 160);
  }
}

// Start typing once the hero terminal is visible
if (terminalBody) {
  const terminalObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeTerminal();
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  terminalObserver.observe(terminalBody);
}

// =========================================================
// SKILL BAR FILL ON SCROLL
// =========================================================
const skillEls = document.querySelectorAll('.skill');

const skillObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const level = el.dataset.level || 0;
      const fill = el.querySelector('.skill__fill');
      fill.style.width = level + '%';
      obs.unobserve(el);
    }
  });
}, { threshold: 0.4 });

skillEls.forEach(el => skillObserver.observe(el));

// =========================================================
// FAQ ACCORDION
// =========================================================
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq__q');
  const answer = item.querySelector('.faq__a');

  btn.addEventListener('click', () => {
    const isOpen = item.getAttribute('data-open') === 'true';

    // Close all other items (accordion behaviour)
    faqItems.forEach(other => {
      other.setAttribute('data-open', 'false');
      other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      other.querySelector('.faq__a').style.maxHeight = null;
    });

    if (!isOpen) {
      item.setAttribute('data-open', 'true');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// =========================================================
// CONTACT FORM (no backend — opens the user's email client)
// =========================================================
const contactForm = document.getElementById('contactForm');
const contactNote = document.getElementById('contactNote');

const CONTACT_EMAIL = 'tumikibokachele69@gmail.com';

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    contactNote.textContent = 'Please fill in every field before sending.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  contactNote.textContent = 'Opening your email app…';
  contactForm.reset();
});

// =========================================================
// NAV BACKGROUND ON SCROLL
// =========================================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 8px 24px -12px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
