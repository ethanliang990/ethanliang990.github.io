(() => {
  const root = document.body;
  const toggle = document.querySelector('[data-motion-toggle]');
  const saved = localStorage.getItem('portfolio-motion');
  const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setMotion = (mode) => {
    root.dataset.motion = mode;
    if (toggle) { toggle.textContent = `Motion: ${mode === 'none' ? 'off' : mode === 'reduced' ? 'reduced' : 'on'}`; toggle.setAttribute('aria-pressed', String(mode !== 'full')); }
    localStorage.setItem('portfolio-motion', mode);
  };
  setMotion(saved || (systemReduced ? 'reduced' : 'full'));
  toggle?.addEventListener('click', () => setMotion(root.dataset.motion === 'full' ? 'reduced' : root.dataset.motion === 'reduced' ? 'none' : 'full'));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    reveals.forEach(item => observer.observe(item));
  } else { reveals.forEach(item => item.classList.add('is-visible')); }
  document.querySelector('[data-to-top]')?.addEventListener('click', event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: root.dataset.motion === 'full' ? 'smooth' : 'auto' }); });
})();
