(() => {
  const canvas = document.getElementById('field');
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return;
  const pointer = { x: innerWidth * .72, y: innerHeight * .46 };
  let particles = [];
  const create = () => {
    const count = Math.min(110, Math.floor((innerWidth * innerHeight) / 11500));
    particles = Array.from({ length: count }, (_, id) => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16, size: Math.random() * 1.8 + .5, tone: id % 9 === 0 ? '#c6f55b' : id % 5 === 0 ? '#9b9cf5' : '#e9ece4' }));
  };
  const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); create(); };
  const draw = () => {
    context.clearRect(0, 0, innerWidth, innerHeight);
    const motion = document.body.dataset.motion === 'full';
    particles.forEach((p, index) => {
      const dx = pointer.x - p.x, dy = pointer.y - p.y, d = Math.hypot(dx, dy);
      if (motion && d < 190) { p.vx -= dx / 220000; p.vy -= dy / 220000; }
      if (motion) { p.x += p.vx; p.y += p.vy; p.vx *= .994; p.vy *= .994; }
      if (p.x < -10 || p.x > innerWidth + 10 || p.y < -10 || p.y > innerHeight + 10) { p.x = Math.random() * innerWidth; p.y = Math.random() * innerHeight; }
      context.fillStyle = p.tone; context.globalAlpha = .25 + (index % 5) * .08; context.beginPath(); context.arc(p.x, p.y, p.size, 0, Math.PI * 2); context.fill();
    });
    context.globalAlpha = 1;
    requestAnimationFrame(draw);
  };
  addEventListener('pointermove', event => { pointer.x = event.clientX; pointer.y = event.clientY; }); addEventListener('resize', resize); resize(); draw();
})();
