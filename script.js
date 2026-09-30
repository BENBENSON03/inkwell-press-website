/* Inkwell Press: vanilla JS */
(() => {
  'use strict';

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
  const naira = (n) => '₦' + Math.round(n).toLocaleString('en-NG');

  /* ---------- Data ---------- */
  // [icon, name, description, base price per unit]
  const services = [
    ['🪪', 'Business Cards', 'Crisp cards in matte, gloss, foil or soft-touch.', 8],
    ['📄', 'Flyers & Brochures', 'Folded, stapled or single-sheet marketing print.', 6],
    ['🖼️', 'Posters & Banners', 'Bold displays for shops, stages and streets.', 18],
    ['💌', 'Wedding & Event Invitations', 'Elegant stationery with premium stocks.', 35],
    ['📑', 'Business Documents', 'Letterheads, forms, invoices and reports.', 5],
    ['📚', 'Booklets & Magazines', 'Saddle-stitched or perfect-bound publications.', 60],
    ['🏷️', 'Stickers & Labels', 'Die-cut, waterproof and roll labels.', 12],
    ['📦', 'Packaging & Product Printing', 'Boxes, sleeves and mailers built for your brand.', 90],
    ['🎁', 'Branded Merchandise', 'Mugs, totes, tees and desk gifts.', 450],
    ['📐', 'Large-Format Printing', 'Vinyl, canvas and backdrops up to 3m wide.', 120],
  ];

  const tileColors = ['#dbe8ff', '#ffe1ec', '#fff2c4', '#d6f3f8', '#eae4ff'];

  // [name, category, sizes, material/finish, starting price, icon]
  const products = [
    ['Premium Business Cards', 'Business', '90x55mm, 85x55mm', '400gsm matte, soft-touch', 8, '🪪'],
    ['A5 Flyers', 'Marketing', 'A6, A5, DL', '170gsm gloss', 6, '📄'],
    ['Tri-fold Brochures', 'Marketing', 'A4 folded to DL', '200gsm silk', 15, '📰'],
    ['Roll-up Banner', 'Marketing', '85x200cm', 'Blockout vinyl', 18000, '🖼️'],
    ['Wedding Invitations', 'Events', 'A5, 5x7in', '350gsm cotton, foil', 350, '💌'],
    ['Event Posters', 'Events', 'A3, A2, A1', '200gsm satin', 1800, '🎟️'],
    ['Custom Product Boxes', 'Packaging', 'Small, medium, large', 'Kraft or white board', 450, '📦'],
    ['Roll Labels', 'Packaging', '50mm round, 90x50mm', 'Waterproof vinyl', 15, '🏷️'],
    ['Branded Mugs', 'Custom', '330ml', 'Ceramic, full-wrap', 2800, '☕'],
    ['Custom Tote Bags', 'Custom', '38x42cm', 'Cotton canvas', 3200, '👜'],
    ['Letterheads', 'Business', 'A4', '100gsm bond', 12, '📝'],
    ['Company Notebooks', 'Custom', 'A5, A6', 'Hardcover, foil logo', 4200, '📒'],
  ];

  // [category, title, icon]
  const works = [
    ['Branding', 'Kola Coffee brand kit', '☕'],
    ['Flyers', 'Lagos Food Fest flyers', '📄'],
    ['Events', 'Summit lanyards & signage', '🎫'],
    ['Packaging', 'Zuri skincare boxes', '📦'],
    ['Posters', 'Jazz Night poster series', '🎷'],
    ['Brochures', 'Greenfield School prospectus', '📘'],
    ['Invitations', 'Adeyemi wedding suite', '💌'],
    ['Branding', 'Nova Legal stationery', '⚖️'],
    ['Packaging', 'Honey jar labels', '🍯'],
  ];

  const whyUs = [
    ['🎨', 'Premium Print Quality', 'Calibrated colour and quality paper.'],
    ['⚡', 'Fast Turnaround', 'Most jobs ready in 48 hours.'],
    ['💰', 'Competitive Pricing', 'Clear prices, bulk discounts.'],
    ['✨', 'Professional Finishing', 'Foil, laminate, die-cut and more.'],
    ['✏️', 'Custom Designs', 'Designers on hand for your artwork.'],
    ['🚚', 'Reliable Delivery', 'Tracked delivery across Nigeria.'],
    ['👥', 'Experienced Team', '15 years on the press floor.'],
  ];

  // [name, company, rating, review]
  const reviews = [
    ['Amaka Obi', 'Bloom Bakery', 5,
      'Our menus and boxes arrived a day early and the colours matched the proof exactly. Customers keep asking who prints them.'],
    ['Tunde Bello', 'Bello & Co. Consulting', 5,
      'Business cards with spot UV that look far more expensive than they were. The team caught a bleed issue in my file before printing.'],
    ['Grace Eze', 'Greenfield Schools', 4,
      'We order prospectuses and certificates every term. Pricing is fair and the account manager always replies quickly.'],
    ['Ifeanyi Musa', 'Peak Events', 5,
      'Banners, badges and programmes for 800 guests with a 36-hour deadline. Flawless.'],
  ];

  /* ---------- Toasts ---------- */
  function toast(message, type = 'ok') {
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' error' : '');
    el.textContent = message;
    $('#toasts').append(el);
    setTimeout(() => el.remove(), 4000);
  }

  /* ---------- Modal ---------- */
  const modal = $('#modal');
  let lastFocus;

  function openModal(title, body, serviceIndex) {
    lastFocus = document.activeElement;
    $('#mTitle').textContent = title;
    $('#mBody').textContent = body;
    $('#mCta').dataset.opt = serviceIndex || '';
    modal.hidden = false;
    $('.modal-x').focus();
  }

  function closeModal() {
    modal.hidden = true;
    if (lastFocus) lastFocus.focus();
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('.modal-x')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) closeModal();
    closeMenu();
  });

  /* ---------- Mobile navigation ---------- */
  const burger = $('.burger');
  const menu = $('#menu');

  function closeMenu() {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  /* ---------- Render sections ---------- */
  $('#serviceGrid').innerHTML = services
    .map((s, i) => `
      <article class="card svc">
        <div class="ico" aria-hidden="true">${s[0]}</div>
        <h3>${s[1]}</h3>
        <p>${s[2]}</p>
        <button data-svc="${i}">View Service</button>
      </article>`)
    .join('');

  $('#productGrid').innerHTML = products
    .map((p, i) => `
      <article class="card prod" data-cat="${p[1]}">
        <div class="thumb" style="background:${tileColors[i % 5]}" aria-hidden="true">${p[5]}</div>
        <div class="prod-b">
          <h3>${p[0]}</h3>
          <small>Sizes: ${p[2]}</small>
          <small>Finish: ${p[3]}</small>
          <span class="price">From ${naira(p[4])}</span>
          <button class="btn btn-ghost" data-prod="${i}">Request Quote</button>
        </div>
      </article>`)
    .join('');

  $('#portGrid').innerHTML = works
    .map((w, i) => `
      <figure class="work" data-cat="${w[0]}" tabindex="0" style="background:${tileColors[(i + 2) % 5]}">
        <span aria-hidden="true">${w[2]}</span>
        <div>${w[1]}<br><small>${w[0]}</small></div>
      </figure>`)
    .join('');

  $('#whyGrid').innerHTML = whyUs
    .map((w) => `
      <div class="card why">
        <div class="ico" aria-hidden="true">${w[0]}</div>
        <h3>${w[1]}</h3>
        <p>${w[2]}</p>
      </div>`)
    .join('');

  $('#qType').innerHTML = services
    .map((s, i) => `<option value="${i}">${s[1]}</option>`)
    .join('');

  /* ---------- Category filters (products + portfolio) ---------- */
  $$('.filters').forEach((bar) => {
    bar.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;

      $$('.chip', bar).forEach((c) => c.classList.toggle('active', c === chip));

      $$('#' + bar.dataset.target + ' [data-cat]').forEach((item) => {
        const hidden = chip.dataset.f !== 'all' && item.dataset.cat !== chip.dataset.f;
        item.classList.toggle('hide', hidden);
      });
    });
  });

  /* ---------- Service / product actions ---------- */
  function prefillQuote(serviceIndex) {
    $('#qType').value = serviceIndex;
    calculate();
    closeModal();
    $('#quote').scrollIntoView({ behavior: 'smooth' });
  }

  document.addEventListener('click', (e) => {
    const serviceBtn = e.target.closest('[data-svc]');
    const productBtn = e.target.closest('[data-prod]');

    if (serviceBtn) {
      const service = services[serviceBtn.dataset.svc];
      openModal(
        service[1],
        `${service[2]} Prices start from ${naira(service[3])} per unit. Build a quote to see an estimate for your quantity and finish.`,
        serviceBtn.dataset.svc
      );
    }

    if (productBtn) {
      const name = products[productBtn.dataset.prod][0];
      const match = services.findIndex((s) =>
        name.toLowerCase().includes(s[1].split(' ')[0].toLowerCase())
      );
      prefillQuote(match < 0 ? 0 : match);
      $('#qNotes').value = 'Product: ' + name;
      toast(name + ' added to your quote.');
    }
  });

  $('#mCta').addEventListener('click', (e) => {
    e.preventDefault();
    prefillQuote(Number(e.currentTarget.dataset.opt) || 0);
  });

  /* ---------- Quote calculator ---------- */
  const num = (selector) => parseFloat($(selector).value) || 0;

  function calculate() {
    const basePrice = services[num('#qType')][3];
    const qty = Math.max(num('#qQty'), 0);

    // Bulk discount tiers
    let discount = 1;
    if (qty >= 1000) discount = 0.75;
    else if (qty >= 500) discount = 0.85;
    else if (qty >= 250) discount = 0.93;

    const unit =
      basePrice *
      num('#qSize') *
      num('#qPaper') *
      num('#qColor') *
      (1 + num('#qFinish')) *
      discount;

    $('#estTotal').textContent = naira(unit * qty + num('#qDeliv'));
    $('#estUnit').textContent =
      `${naira(unit)} per unit${discount < 1 ? ' (bulk discount applied)' : ''} + delivery`;
  }

  $$('#quoteForm select, #quoteForm input[type=number]').forEach((el) => {
    el.addEventListener('input', calculate);
  });

  /* ---------- Form validation ---------- */
  function validate(form) {
    let valid = true;
    $$('.err', form).forEach((msg) => msg.remove());

    $$('[required]', form).forEach((field) => {
      const empty = !field.value.trim();
      const badEmail = field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      const badNumber = field.type === 'number' && Number(field.value) < Number(field.min);
      const invalid = empty || badEmail || badNumber;

      field.classList.toggle('invalid', invalid);
      field.setAttribute('aria-invalid', String(invalid));

      if (!invalid) return;
      valid = false;

      const msg = document.createElement('span');
      msg.className = 'err';
      if (field.type === 'email' && !empty) msg.textContent = 'Enter a valid email address.';
      else if (field.type === 'number' && !empty) msg.textContent = 'Minimum quantity is ' + field.min + '.';
      else msg.textContent = 'This field is required.';
      field.after(msg);
    });

    if (!valid) {
      toast('Please fix the highlighted fields.', 'error');
      $('.invalid', form).focus();
    }
    return valid;
  }

  $('#quoteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(e.target)) return;
    toast('Quote request sent. We will reply within 2 hours.');
    e.target.reset();
    calculate();
  });

  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(e.target)) return;
    toast('Message sent. Thank you!');
    e.target.reset();
  });

  /* ---------- Testimonial slider ---------- */
  const slidesEl = $('#slides');
  const dotsEl = $('#dotsNav');
  const avatarColors = ['#0a55e6', '#e23a7b', '#00a7c7', '#1c1f26'];
  let current = 0;
  let timer;

  slidesEl.innerHTML = reviews
    .map((r, i) => `
      <figure class="slide">
        <div class="stars" role="img" aria-label="${r[2]} out of 5 stars">${'★'.repeat(r[2])}${'☆'.repeat(5 - r[2])}</div>
        <blockquote>“${r[3]}”</blockquote>
        <figcaption class="who">
          <span class="av" style="background:${avatarColors[i]}" aria-hidden="true">${r[0][0]}</span>
          <span><strong>${r[0]}</strong><small>${r[1]}</small></span>
        </figcaption>
      </figure>`)
    .join('');

  dotsEl.innerHTML = reviews
    .map((_, i) => `<button aria-label="Review ${i + 1}" data-i="${i}"></button>`)
    .join('');

  function showSlide(index) {
    current = (index + reviews.length) % reviews.length;
    $$('.slide').forEach((s, n) => s.classList.toggle('on', n === current));
    $$('button', dotsEl).forEach((d, n) => d.classList.toggle('on', n === current));
  }

  function startAutoplay() {
    clearInterval(timer);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => showSlide(current + 1), 6000);
  }

  $('#prev').addEventListener('click', () => { showSlide(current - 1); startAutoplay(); });
  $('#next').addEventListener('click', () => { showSlide(current + 1); startAutoplay(); });
  dotsEl.addEventListener('click', (e) => {
    if (!e.target.dataset.i) return;
    showSlide(Number(e.target.dataset.i));
    startAutoplay();
  });

  showSlide(0);
  startAutoplay();

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  $$('.reveal').forEach((el) => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);

      const el = entry.target;
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / 1200, 1);
        const plus = progress === 1 && !suffix && end > 100 ? '+' : suffix;
        el.textContent = Math.round(end * progress).toLocaleString() + plus;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  $$('[data-count]').forEach((el) => counterObserver.observe(el));

  /* ---------- Highlight active nav link ---------- */
  const navLinks = $$('.menu a[href^="#"]:not(.btn)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.classList.toggle('on', a.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  navLinks.forEach((a) => {
    const target = $(a.getAttribute('href'));
    if (target) sectionObserver.observe(target);
  });

  /* ---------- Init ---------- */
  $('#yr').textContent = new Date().getFullYear();
  calculate();
})();