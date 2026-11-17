(() => {
  const root = document.body;
  const documentRoot = document.documentElement;
  const themeChoices = document.querySelectorAll('[data-theme-choice]');
  const toggle = document.querySelector('[data-motion-toggle]');
  const getStoredValue = (key) => {
    try { return localStorage.getItem(key); } catch { return null; }
  };
  const saveValue = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* The site still works when storage is unavailable. */ }
  };
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = getStoredValue('portfolio-theme');
  const setTheme = (mode, remember = false) => {
    const chosenMode = ['light', 'dark', 'system'].includes(mode) ? mode : 'system';
    const theme = chosenMode === 'system' ? (systemTheme.matches ? 'dark' : 'light') : chosenMode;
    documentRoot.dataset.theme = theme;
    documentRoot.dataset.themeMode = chosenMode;
    themeChoices.forEach(choice => {
      const active = choice.dataset.themeChoice === chosenMode;
      choice.classList.toggle('is-active', active);
      choice.setAttribute('aria-pressed', String(active));
    });
    if (remember) saveValue('portfolio-theme', chosenMode);
    document.dispatchEvent(new CustomEvent('portfolio:themechange', { detail: { theme, mode: chosenMode } }));
  };
  setTheme(savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system' ? savedTheme : 'system');
  themeChoices.forEach(choice => choice.addEventListener('click', () => setTheme(choice.dataset.themeChoice, true)));
  systemTheme.addEventListener?.('change', () => {
    if (documentRoot.dataset.themeMode === 'system') setTheme('system');
  });

  const saved = getStoredValue('portfolio-motion');
  const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setMotion = (mode) => {
    root.dataset.motion = mode;
    if (toggle) { toggle.textContent = `Motion: ${mode === 'none' ? 'off' : mode === 'reduced' ? 'reduced' : 'on'}`; toggle.setAttribute('aria-pressed', String(mode !== 'full')); }
    saveValue('portfolio-motion', mode);
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

