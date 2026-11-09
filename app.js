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

  const searchToggle = q('#search-toggle');
  const searchBar = q('#search-bar');
  const searchInput = q('#site-search');
  searchToggle?.addEventListener('click', () => {
    const isHidden = searchBar.hidden;
    searchBar.hidden = !isHidden;
    searchToggle.setAttribute('aria-expanded', String(isHidden));
    if (isHidden) searchInput?.focus();
  });
  searchInput?.addEventListener('input', event => {
    const term = event.target.value.toLowerCase().trim();
    qa('.story-card,.interview-card,.spotlight-card,.latest-list a').forEach(item => {
      item.hidden = Boolean(term) && !item.textContent.toLowerCase().includes(term);
    });
  });

  const tabs = qa('.tab');
  const panels = qa('[data-profile-panel]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(item => { const active = item === tab; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
    panels.forEach(panel => panel.classList.toggle('active', panel.dataset.profilePanel === target));
  }));

  const rankFilters = qa('.rank-filter');
  rankFilters.forEach(filter => filter.addEventListener('click', () => {
    rankFilters.forEach(item => item.classList.toggle('active', item === filter));
  }));

  qa('img').forEach(image => {
    const placeholder = document.createElement('div');
    placeholder.className = 'media-placeholder';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', `${image.alt || 'Image'} placeholder`);
    placeholder.innerHTML = '<span>IMAGE PLACEHOLDER</span><b>Visual asset coming soon</b>';
    image.replaceWith(placeholder);
  });

  q('#current-year').textContent = String(new Date().getFullYear());
})();
