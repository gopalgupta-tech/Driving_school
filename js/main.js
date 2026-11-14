/* Shukla Car Driving School — interactions */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '919559164630'; // change here if the WhatsApp number differs

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Footer year */
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Sticky header shadow */
  var header = $('#siteHeader');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile / tablet menu */
  var toggle = $('#navToggle');
  var nav = $('#primaryNav');
  if (toggle && nav) {
    function setMenu(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.innerHTML = '<svg class="i i--lg"><use href="#' + (open ? 'i-close' : 'i-menu') + '"/></svg>';
    }

    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });

    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setMenu(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 899 && nav.classList.contains('is-open')) {
        setMenu(false);
      }
    });
  }

  /* Scroll-spy (top nav + bottom nav) */
  var ids = ['about', 'cars', 'simulator', 'branches', 'contact'];
  var spyLinks = $$('[data-spy]');
  function setActive(id) {
    spyLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-spy') === id); });
  }
  function spy() {
    var y = window.scrollY + (header ? header.offsetHeight : 0) + 120;
    var current = 'top';
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
    setActive(current);
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  /* Reveal on scroll */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Car "Enquire Now" preselects the car in the form */
  var carSel = $('#fCar');
  var branchSel = $('#fBranch');
  var msg = $('#fMsg');
  if (carSel) {
    $$('[data-car]').forEach(function (btn) {
      btn.addEventListener('click', function () { carSel.value = btn.getAttribute('data-car'); });
    });
  }

  /* Simulator: level toggle + Start Learning */
  var level = 'Beginner';
  $$('.seg__btn').forEach(function (b) {
    b.addEventListener('click', function () {
      level = b.getAttribute('data-level');
      $$('.seg__btn').forEach(function (x) {
        var on = x === b;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-pressed', String(on));
      });
    });
  });
  var simStart = $('#simStart');
  if (simStart) {
    simStart.addEventListener('click', function () {
      var b = $('#simBranch').value;
      if (b && branchSel) branchSel.value = b;
      if (msg) msg.value = 'I would like to start with simulator training (' + level + ').';
    });
  }

  /* Enquiry form → WhatsApp */
  var form = $('#enquiryForm');
  function setErr(fieldId, errId, text) {
    var wrap = $('#' + fieldId).closest('.field');
    if (wrap) wrap.classList.toggle('has-error', !!text);
    var el = $('#' + errId);
    if (el) el.textContent = text || '';
  }
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#fName').value.trim();
      var mobile = $('#fMobile').value.replace(/[\s\-+]/g, '').replace(/^91(?=\d{10}$)/, '');
      var ok = true;

      if (name.length < 2) { setErr('fName', 'eName', 'Please enter your name.'); ok = false; } else setErr('fName', 'eName', '');
      if (!/^[6-9]\d{9}$/.test(mobile)) { setErr('fMobile', 'eMobile', 'Enter a valid 10-digit mobile number.'); ok = false; } else setErr('fMobile', 'eMobile', '');
      if (!ok) { (form.querySelector('.has-error input') || {}).focus && form.querySelector('.has-error input').focus(); return; }

      var lines = [
        'Hello Shukla Car Driving School, I would like to enquire about driving training.',
        '',
        'Name: ' + name,
        'Mobile: ' + mobile,
        'Preferred car: ' + (carSel ? (carSel.value || 'Not selected') : 'Not selected'),
        'Preferred branch: ' + (branchSel ? (branchSel.value || 'Not selected') : 'Not selected')
      ];
      var extra = msg ? msg.value.trim() : '';
      if (extra) lines.push('Message: ' + extra);

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }
})();
