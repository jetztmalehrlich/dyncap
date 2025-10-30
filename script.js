const logo = document.querySelector('.logo');
const cta = document.querySelector('.cta');
const footer = document.querySelector('.site-footer');

if (logo) {
  const maxOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--logo-max-offset')) || 24;
  const maxDistance = 2000;
  const pointer = { x: 0, y: 0 };
  let raf = 0;
  let active = false;

  const setAberration = (x, y) => {
    logo.style.setProperty('--logo-aberration-x', x + 'px');
    logo.style.setProperty('--logo-aberration-y', y + 'px');
  };

  const positionButton = () => {
    if (!cta || !footer) return;
    const logoRect = logo.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const logoBottom = logoRect.bottom;
    const footerTop = footerRect.top;
    const midpoint = logoBottom + ((footerTop - logoBottom) / 2);
    cta.style.top = midpoint + 'px';
  };

  const update = () => {
    raf = 0;
    if (!active) return;
    
    const rect = logo.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = pointer.x - cx;
    const dy = pointer.y - cy;
    const distance = Math.hypot(dx, dy);
    
    if (distance > maxDistance) {
      setAberration(0, 0);
      logo.style.setProperty('--logo-warp-intensity', '0');
      logo.style.setProperty('--logo-warp-angle', '0deg');
      return;
    }
    
    const normalizedDistance = distance / maxDistance;
    const intensity = Math.pow(1 - normalizedDistance, 2.5);
    const angle = Math.atan2(dy, dx);
    const pushAngle = angle + Math.PI;
    const offset = intensity * maxOffset;
    
    const warpIntensity = intensity;
    const warpAngle = (angle * 180 / Math.PI) + 'deg';
    
    logo.style.setProperty('--logo-warp-intensity', warpIntensity.toFixed(3));
    logo.style.setProperty('--logo-warp-angle', warpAngle);
    
    setAberration(
      Math.cos(pushAngle) * offset,
      Math.sin(pushAngle) * offset
    );
  };

  const queue = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  window.addEventListener('resize', () => {
    positionButton();
    if (active) queue();
  });

  const finePointer = matchMedia('(pointer: fine)').matches;
  
  if (finePointer) {
    window.addEventListener('mousemove', event => {
      active = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      queue();
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      active = false;
      setAberration(0, 0);
    });
  } else {
    // Mobile: Effekt beim Scrollen und Touch
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollTimeout;
    
    const updateScrollEffect = () => {
      const rect = logo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Effekt basierend auf Scroll-Geschwindigkeit
      const intensity = Math.min(Math.abs(scrollVelocity) / 50, 1);
      const direction = scrollVelocity > 0 ? 1 : -1;
      
      const offset = intensity * maxOffset * 0.6; // Etwas subtiler auf Mobile
      
      logo.style.setProperty('--logo-warp-intensity', intensity.toFixed(3));
      logo.style.setProperty('--logo-warp-angle', (direction * 90) + 'deg');
      
      setAberration(0, offset * direction);
      
      // Reset nach kurzer Zeit
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        logo.style.setProperty('--logo-warp-intensity', '0');
        setAberration(0, 0);
      }, 150);
    };
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      
      requestAnimationFrame(updateScrollEffect);
    }, { passive: true });
    
    // Touch-basierter Effekt
    let touchStart = { x: 0, y: 0 };
    
    window.addEventListener('touchstart', event => {
      if (event.touches.length > 0) {
        touchStart.x = event.touches[0].clientX;
        touchStart.y = event.touches[0].clientY;
      }
    }, { passive: true });
    
    window.addEventListener('touchmove', event => {
      if (event.touches.length > 0) {
        active = true;
        pointer.x = event.touches[0].clientX;
        pointer.y = event.touches[0].clientY;
        queue();
      }
    }, { passive: true });
    
    window.addEventListener('touchend', () => {
      setTimeout(() => {
        active = false;
        setAberration(0, 0);
        logo.style.setProperty('--logo-warp-intensity', '0');
      }, 200);
    }, { passive: true });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      requestAnimationFrame(positionButton);
    });
  } else {
    setTimeout(positionButton, 100);
  }

  positionButton();
}
