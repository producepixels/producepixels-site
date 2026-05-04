// Mobile nav toggle
const toggle = document.querySelector('.mobile-toggle');
const nav = document.getElementById('primary-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? 'Close' : 'Menu';
  });
}

// Cycling hero word
const cycleEl = document.querySelector('[data-cycle]');
if (cycleEl) {
  const words = cycleEl.dataset.cycle.split('|').map(s => s.trim()).filter(Boolean);
  if (words.length > 1) {
    const measureCycle = () => {
      const measure = cycleEl.cloneNode(false);
      measure.style.position = 'absolute';
      measure.style.visibility = 'hidden';
      measure.style.whiteSpace = 'nowrap';
      measure.style.minWidth = '0';
      measure.style.transform = 'none';
      measure.style.transition = 'none';
      cycleEl.parentNode.appendChild(measure);
      let maxW = 0;
      for (const w of words) {
        measure.textContent = w;
        maxW = Math.max(maxW, measure.offsetWidth);
      }
      measure.remove();
      cycleEl.style.minWidth = Math.ceil(maxW) + 'px';
      cycleEl.style.textAlign = 'center';
    };
    measureCycle();
    let resizeT;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(measureCycle, 150);
    });

    let i = 0;
    setInterval(() => {
      cycleEl.style.opacity = '0';
      cycleEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        i = (i + 1) % words.length;
        cycleEl.textContent = words[i];
        cycleEl.style.opacity = '1';
        cycleEl.style.transform = 'translateY(0)';
      }, 280);
    }, 2400);
  }
}

const supportsHover = window.matchMedia('(hover: hover)').matches;

// Hero cursor glow
if (supportsHover) {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mx', x + '%');
      hero.style.setProperty('--my', y + '%');
    });
  }
}

// Magnetic CTAs
if (supportsHover) {
  document.querySelectorAll('.btn-primary, .nav .cta').forEach(el => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.22;
      const dy = (e.clientY - cy) * 0.22;
      el.style.setProperty('--magX', dx + 'px');
      el.style.setProperty('--magY', dy + 'px');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--magX', '0px');
      el.style.setProperty('--magY', '0px');
    });
  });
}

// Portfolio card 3D tilt
if (supportsHover) {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty('--rx', ((0.5 - py) * 8) + 'deg');
      card.style.setProperty('--ry', ((px - 0.5) * 8) + 'deg');
      card.style.setProperty('--lift', '-3px');
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--lift', '0px');
    });
  });
}

// Scroll reveal
const revealSelectors = '.step, .tier, .section-header, .work-card, .quote-block, .industries-block, .cta-headline, .cta-row, .addons, .callout, .info-block, .form, .fact';
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll(revealSelectors).forEach(el => obs.observe(el));
} else {
  document.querySelectorAll(revealSelectors).forEach(el => el.classList.add('in'));
}
