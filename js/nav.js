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
})();
