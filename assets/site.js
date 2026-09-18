// Progressive enhancement only. All content and links work without JavaScript.
(() => {
  const menu = document.querySelector('.nav-menu');
  const summary = menu?.querySelector('summary');
  const small = window.matchMedia('(max-width: 720px)');
  const sync = () => { if (menu) menu.open = !small.matches; };
  sync();
  small.addEventListener('change', sync);
  menu?.addEventListener('click', event => {
    if (small.matches && event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && small.matches && menu?.open) { menu.open = false; summary?.focus(); }
  });
  document.addEventListener('click', event => {
    if (small.matches && menu?.open && !menu.contains(event.target)) menu.open = false;
  });
})();
