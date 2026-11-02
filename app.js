/* Pure Prospects — client concept homepage. No external JS dependencies. */
(() => {
  'use strict';

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Mobile navigation
  const menuButton = q('#menu-toggle');
  const nav = q('#main-nav');
  const setMenu = (open) => {
    menuButton.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  menuButton?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  qa('.nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (event) => {
    if (!menuButton?.contains(event.target) && !nav?.contains(event.target)) setMenu(false);
  });

  // Tab filters switch which athlete profiles are shown.
  const filterButtons = qa('.filter');
  const cards = qa('.prospect-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const year = button.dataset.year;
      filterButtons.forEach(tab => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      cards.forEach(card => { card.hidden = year !== 'all' && card.dataset.year !== year; });
      const shown = cards.filter(card => !card.hidden).length;
      const count = q('.prospects-section__bottom>span');
      if (count) count.textContent = `01—0${shown} / FEATURED ATHLETES`;
    });
  });

  // Athlete cards open a functional, native-accessible dialog.
  const athleteData = {
    jayden: {
      name: 'JAYDEN VARPNESS', subtitle: 'CLASS OF 2028 · SHOOTING GUARD · 6\'4" · DONELSON CHRISTIAN ACADEMY',
      photo: 'assets/player-jayden.webp',
      stats: [['15', 'PPG'], ['45%', '3PT'], ['4.2', 'RPG']]
    },
    ean: {
      name: 'EAN HAYES', subtitle: 'CLASS OF 2028 · COMBO GUARD · 6\'4" · WISE CENTRAL HIGH SCHOOL',
      photo: 'assets/player-ean.webp',
      stats: [['20.7', 'PPG'], ['3.6', 'APG'], ['5.1', 'RPG']]
    },
    gavin: {
      name: 'GAVIN GROVES', subtitle: 'CLASS OF 2027 · SHOOTING GUARD · 6\'4" · MUHLENBERG COUNTY',
      photo: 'assets/player-gavin.webp',
      stats: [['16.8', 'PPG'], ['37%', '3PT'], ['4.4', 'RPG']]
    }
  };
  const modal = q('#athlete-modal');
  const closeModal = () => { if (modal?.open) modal.close(); };
  qa('[data-open-athlete]').forEach(button => {
    button.addEventListener('click', () => {
      const player = athleteData[button.dataset.openAthlete];
      if (!player || !modal) return;
      q('#modal-name').textContent = player.name;
      q('#modal-subtitle').textContent = player.subtitle;
      q('#modal-photo').src = player.photo;
      q('#modal-photo').alt = `${player.name}, Pure Prospects player feature`;
      q('#modal-stats').replaceChildren(...player.stats.map(([value, label]) => {
        const item = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = value;
        const span = document.createElement('span');
        span.textContent = label;
        item.append(strong, span);
        return item;
      }));
      q('#modal-inquiry').setAttribute('href', `mailto:ppkyscouts@gmail.com?subject=${encodeURIComponent('Prospect Inquiry: ' + player.name)}`);
      modal.showModal();
    });
  });
  q('#modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Simple non-backend contact: opens the visitor's mail application with a draft.
  q('#contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const interest = String(data.get('interest') || '').trim();
    const gradClass = String(data.get('class') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Pure Prospects Website Inquiry — ${interest}`;
    const body = `Name: ${name}\nEmail: ${email}\nInquiry: ${interest}\nAthlete graduation class: ${gradClass || 'Not provided'}\n\nMessage:\n${message}`;
    const url = `mailto:ppkyscouts@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    q('#form-note').textContent = 'Your email app should open with a prepared draft. Press Send in your email app to complete the inquiry.';
    window.location.href = url;
  });

  // Reveal transitions, with a no-JS/reduced-motion friendly fallback.
  const revealNodes = qa('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 65px 0px', threshold: 0.04 });
    revealNodes.forEach(node => observer.observe(node));
  } else revealNodes.forEach(node => node.classList.add('is-visible'));

  q('#current-year').textContent = String(new Date().getFullYear());
})();
