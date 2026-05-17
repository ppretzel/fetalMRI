(() => {
  const toggle   = document.querySelector('.sidebar-toggle');
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!toggle || !sidebar || !backdrop) return;

  const setOpen = (open) => {
    sidebar.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
  };

  toggle.addEventListener('click', () => setOpen(!sidebar.classList.contains('open')));
  backdrop.addEventListener('click', () => setOpen(false));
  sidebar.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

  const mobile = window.matchMedia('(max-width: 600px)');
  document.querySelectorAll('[data-action="open-sidebar"]').forEach(el =>
    el.addEventListener('click', () => {
      sidebar.querySelectorAll('details.sidebar-section').forEach(d => d.open = true);
      if (mobile.matches) {
        sidebar.classList.add('open');
        toggle.classList.add('open');
      } else {
        el.classList.add('is-arrow');
        el.textContent = '←';
      }
    })
  );
})();
