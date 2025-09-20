// script_animation.js
(() => {
  const { gsap } = window;
  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced-motion users
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-fade-in]').forEach(el => (el.style.opacity = 1));
    return;
  }

  /* =========================
     HERO COMPRESS ON SCROLL
     ========================= */
  gsap.to('.home-page', {
    y: -80,
    // opacity: 0,
    scale: 0.92, // avoid layout jump vs scale:0
    ease: 'none',
    scrollTrigger: {
      trigger: '.home-page',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  /* =========================
     NAVBAR
     ========================= */
  // gsap.to('.navbar', {
  //   y: '10vh',
  //   scrollTrigger: {
  //     trigger: '.border-page',
  //     start: 'top top',
  //     end: 'bottom top',
  //     scrub: true
  //   }
  // });

  /* =========================
     INITIAL HERO REVEALS
     ========================= */
  gsap.from('.gradient-text', { y: 60, opacity: 0, duration: 0.6, delay: 0.15, ease: 'power2.out' });
  gsap.from('.home-page-p',   { y: 60, opacity: 0, duration: 0.6, delay: 0.30, ease: 'power2.out' });
  gsap.from('.custom-button', { y: 60, opacity: 0, duration: 0.6, delay: 0.45, ease: 'power2.out' });

  const reveal = (target, opts = {}) => {
    gsap.from(target, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: opts.trigger || target,
        start: opts.start || 'top 75%',
        end: opts.end || 'bottom top',
        toggleActions: 'play none none reverse',
        once: opts.once ?? false
      },
      ...opts.props
    });
  };

  /* =========================
     SERVICES
     ========================= */
  reveal('#service-head-1', { props: { y: 60 } });
  reveal('#service-head-2', { props: { y: 60, delay: 0.1 } });
  reveal('.service-section', {
    trigger: '#service',
    props: { scale: 0.9, stagger: 0.12, duration: 0.8, transformOrigin: '50% 50%' }
  });

  /* =========================
     CARDS (LOOP 1..6)
     ========================= */
  Array.from({ length: 6 }, (_, i) => `#card-${i + 1}`).forEach(sel => {
    reveal(`${sel} .card-video`,   { trigger: sel, props: { y: 0 } });
    reveal(`${sel} .card-content`, { trigger: sel, props: { y: 0, delay: 0.12 } });
  });

  /* =========================
     PLAN
     ========================= */
  reveal('#plan-head-1', { trigger: '.plan', props: { scale: 0.9, y: 0 } });
  reveal('#plan-head-2', { trigger: '.plan', props: { scale: 0.98, y: 0, delay: 0.1 } });
  reveal('.timeline',     { trigger: '.plan', props: { y: 0, delay: 0.2 } });
  reveal('.plan-img',     { trigger: '.plan', props: { y: 0, delay: 0.3 } });

  /* =========================
     SPECIAL (WHY US)
     ========================= */
  reveal('#special-head-1', { trigger: '.special', props: { scale: 0.9 } });
  reveal('#special-head-2', { trigger: '.special', props: { scale: 0.98, delay: 0.1 } });
  reveal('.special-head-p', { trigger: '.special', props: { y: 0, delay: 0.2 } });
  reveal('#special-sec-1',  { trigger: '.special', props: { y: 0, delay: 0.25 } });
  reveal('#special-sec-2',  { trigger: '.special', props: { y: 0, delay: 0.35 } });

  /* =========================
     REVIEWS
     ========================= */
  reveal('#rewview-head-1', { trigger: '.review', props: { scale: 0.9 } });
  reveal('#rewview-head-2', { trigger: '.review', props: { y: 30, delay: 0.1 } });
  reveal('#slider-track-1', { trigger: '.review', props: { y: 0, delay: 0.15 } });
  reveal('#slider-track-2', { trigger: '.review', props: { y: 0, delay: 0.25 } });

  /* =========================
     FAQ
     ========================= */
  reveal('#question-head-2', { trigger: '.question', props: { y: 30 } });
  ['#acoordion-ani-1', '#acoordion-ani-2', '#acoordion-ani-3'].forEach((id, idx) => {
    reveal(id, { trigger: '.question', props: { y: 0, delay: 0.15 + idx * 0.08 } });
  });

  /* =========================
     RESPONSIVE POLISH
     ========================= */
  const mm = gsap.matchMedia();
  mm.add('(max-width: 768px)', () => {
    // soften scrub on smaller screens
    ScrollTrigger.getAll().forEach(st => st.vars.scrub && (st.vars.scrub = 0.5));
  });
})();