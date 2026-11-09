(() => {
  'use strict';
  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];

  const menuButton = q('#menu-toggle');
  const nav = q('#main-nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  qa('.main-nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('is-open')));

  const tabs = qa('.tab');
  const panels = qa('[data-panel]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(item => { const active = item === tab; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', String(active)); });
    panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.panel === target));
  }));

  const filters = qa('.filter');
  const cards = qa('.prospect-card');
  filters.forEach(filter => filter.addEventListener('click', () => {
    filters.forEach(item => { const active = item === filter; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { card.hidden = filter.dataset.year !== 'all' && card.dataset.year !== filter.dataset.year; });
  }));

  q('#current-year').textContent = String(new Date().getFullYear());
})();
