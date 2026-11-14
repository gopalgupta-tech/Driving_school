/* Shukla Car Driving School — interactions */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '919559164630';

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

  /* Mobile / tablet menu
     Icons are swapped with CSS (aria-expanded) — never replace the button's
     children, otherwise the click target is detached and the document-level
     "outside click" handler closes the menu instantly. */
  var toggle = $('#navToggle');
  var nav = $('#primaryNav');
  if (toggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 899 && nav.classList.contains('is-open')) setMenu(false);
    });
  }

  /* Hero video: start unmuted and provide a single accessible toggle. */
  var vid = $('#heroVideo');
  if (vid) {
    var tag = $('.hero__tag');
    if (tag) {
      var muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.className = 'hero__tag btn';
      muteButton.setAttribute('aria-label', 'Mute video');
      muteButton.setAttribute('title', 'Mute video');
      muteButton.innerHTML = '<svg class="i" aria-hidden="true" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
      tag.replaceWith(muteButton);

      muteButton.addEventListener('click', function () {
        vid.muted = !vid.muted;
        var muted = vid.muted;
        muteButton.setAttribute('aria-label', muted ? 'Unmute video' : 'Mute video');
        muteButton.setAttribute('title', muted ? 'Unmute video' : 'Mute video');
        muteButton.innerHTML = muted
          ? '<svg class="i" aria-hidden="true" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="m16 9 5 6m0-6-5 6"/></svg>'
          : '<svg class="i" aria-hidden="true" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
      });
    }

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      vid.removeAttribute('autoplay');
      vid.pause();
    } else {
      vid.removeAttribute('muted');
      vid.muted = false;
      var tryPlay = vid.play && vid.play();
      if (tryPlay && tryPlay.catch) tryPlay.catch(function () {});
    }
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
      var simBranch = $('#simBranch');
      var b = simBranch ? simBranch.value : '';
      if (b && branchSel) branchSel.value = b;
      if (msg) msg.value = 'I would like to start with simulator training (' + level + ').';
    });
  }

  /* Enquiry form → WhatsApp */
  var form = $('#enquiryForm');
  function setErr(fieldId, errId, text) {
    var input = $('#' + fieldId);
    var wrap = input ? input.closest('.field') : null;
    if (wrap) wrap.classList.toggle('has-error', !!text);
    var el = $('#' + errId);
    if (el) el.textContent = text || '';
  }
  // Strip control characters and cap length before putting text in the URL.
  function clean(str, max) {
    return String(str || '').replace(/[\u0000-\u001F\u007F]+/g, ' ').trim().slice(0, max);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = clean($('#fName').value, 60);
      var mobile = $('#fMobile').value.replace(/[\s\-+]/g, '').replace(/^91(?=\d{10}$)/, '');
      var ok = true;

      if (name.length < 2) { setErr('fName', 'eName', 'Please enter your name.'); ok = false; } else setErr('fName', 'eName', '');
      if (!/^[6-9]\d{9}$/.test(mobile)) { setErr('fMobile', 'eMobile', 'Enter a valid 10-digit mobile number.'); ok = false; } else setErr('fMobile', 'eMobile', '');
      if (!ok) {
        var bad = form.querySelector('.has-error input');
        if (bad) bad.focus();
        return;
      }

      var lines = [
        'Hello Shukla Car Driving School, I would like to enquire about driving training.',
        '',
        'Name: ' + name,
        'Mobile: ' + mobile,
        'Preferred car: ' + (carSel && carSel.value ? clean(carSel.value, 60) : 'Not selected'),
        'Preferred branch: ' + (branchSel && branchSel.value ? clean(branchSel.value, 60) : 'Not selected')
      ];
      var extra = msg ? clean(msg.value, 500) : '';
      if (extra) lines.push('Message: ' + extra);

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
})();
