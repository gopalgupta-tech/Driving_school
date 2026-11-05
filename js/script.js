/* ============================================================
   SHUKLA CAR DRIVING SCHOOL — Script v2.0
   Vanilla JS: Nav, Form, WhatsApp, Reveal animations
   ============================================================ */
(() => {
  'use strict';

  const cfg = window.SCHOOL_CONFIG || {};
  const waNumber = String(cfg.whatsappNumber || '').replace(/\D/g, '');
  const schoolName = cfg.schoolName || 'Shukla Car Driving School';

  // ---- Utilities ----
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const waUrl = text => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  // ---- Year ----
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- Mobile nav toggle ----
  const toggle = $('#menuToggle');
  const menu   = $('#navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    $$('a', menu).forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // ---- Active nav link on scroll ----
  const sections = $$('main section[id]');
  const navLinks = $$('.nav-link');
  const onScroll = () => {
    const scrollY = window.scrollY + 100;
    let current = '';
    sections.forEach(s => {
      if (s.offsetTop <= scrollY) current = s.id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === `#${current}` || (current === '' && href === '#top'));
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- WhatsApp setup ----
  const buildWaMessage = ({ name = '', mobile = '', car = '', branch = '', message = '' } = {}) => {
    const lines = [
      `Hello ${schoolName},`,
      '',
      'I would like to enquire about driving training.',
      name    ? `Name: ${name}`              : '',
      mobile  ? `Mobile: ${mobile}`          : '',
      car     ? `Preferred car: ${car}`      : '',
      branch  ? `Preferred branch: ${branch}`: '',
      message ? `Message: ${message}`        : '',
      '',
      'Please share available schedules and training details.',
    ].filter((l, i, arr) => !(l === '' && arr[i - 1] === ''));
    return lines.join('\n');
  };

  const setWaLinks = (text) => {
    const url = waNumber ? waUrl(text) : '#contact';
    $$('[id^="wa"]').forEach(el => {
      el.href = url;
      if (waNumber) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    });
  };

  // Default WhatsApp link
  setWaLinks(buildWaMessage());

  // ---- Car card → scroll to contact & pre-select ----
  const carSelect = $('#car');
  $$('.choose-car').forEach(btn => {
    btn.addEventListener('click', () => {
      const carVal = btn.dataset.car || '';
      if (carSelect) {
        const opt = [...carSelect.options].find(o => o.value.toLowerCase().includes(carVal.toLowerCase()));
        if (opt) carSelect.value = opt.value;
      }
      $('#contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---- Enquiry Form ----
  const form  = $('#enquiryForm');
  const errEl = $('#formError');

  const showError = msg => {
    if (errEl) { errEl.textContent = msg; errEl.style.display = msg ? 'block' : 'none'; }
  };

  const validateMobile = str => /^[\d\s\-+]{7,15}$/.test(str.trim());

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showError('');

      const name    = String(form.name?.value   || '').trim();
      const mobile  = String(form.mobile?.value  || '').trim();
      const car     = String(form.car?.value     || '').trim();
      const branch  = String(form.branch?.value  || '').trim();
      const message = String(form.message?.value || '').trim();

      if (!name)   { showError('Please enter your name.'); form.name.focus();   return; }
      if (!mobile) { showError('Please enter your mobile number.'); form.mobile.focus(); return; }
      if (!validateMobile(mobile)) { showError('Please enter a valid mobile number.'); form.mobile.focus(); return; }
      if (!car)    { showError('Please select a preferred car.'); form.car.focus();   return; }
      if (!branch) { showError('Please select a preferred branch.'); form.branch.focus(); return; }

      if (!waNumber) {
        showError('WhatsApp is not configured yet. Please call us directly.');
        return;
      }

      const text = buildWaMessage({ name, mobile, car, branch, message });
      window.open(waUrl(text), '_blank', 'noopener,noreferrer');
    });

    // Live WA link update
    ['name','mobile','car','branch','message'].forEach(id => {
      form[id]?.addEventListener('input', () => {
        const name    = String(form.name?.value   || '').trim();
        const mobile  = String(form.mobile?.value  || '').trim();
        const car     = String(form.car?.value     || '').trim();
        const branch  = String(form.branch?.value  || '').trim();
        const message = String(form.message?.value || '').trim();
        if (name || car || branch) {
          setWaLinks(buildWaMessage({ name, mobile, car, branch, message }));
        }
      });
    });
  }

  // ---- Scroll-reveal ----
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => revealObs.observe(el));
  } else {
    // Fallback: show all
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }

})();
