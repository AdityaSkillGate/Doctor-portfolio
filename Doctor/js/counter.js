/**
 * Statistics Count-Up Animation
 * Modern Doctor Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    // Easing function (easeOutExpo)
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutExpo(frame / totalFrames);
      const currentCount = Math.round(target * progress);

      if (target >= 1000) {
        el.textContent = currentCount.toLocaleString();
      } else {
        el.textContent = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval(counter);
        if (target >= 1000) {
          el.textContent = target.toLocaleString();
        } else {
          el.textContent = target;
        }
      }
    }, frameDuration);
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCount(el);
        observerInstance.unobserve(el); // Only animate once
      }
    });
  }, {
    threshold: 0.2
  });

  statNumbers.forEach(num => observer.observe(num));
});
