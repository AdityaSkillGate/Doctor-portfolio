/**
 * Main Application Initializer
 * Modern Doctor Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Set Min Date for Appointment Date Pickers to Today
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.setAttribute('min', today);
  });

  // 2. Smooth Scroll for Anchor Links with Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerEl = document.querySelector('.header');
        const headerOffset = headerEl ? headerEl.offsetHeight : 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Scroll to Top Button Visibility & Click
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Newsletter Subscription Handling
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      if (input && input.value) {
        if (window.showDoctorToast) {
          window.showDoctorToast(
            'Subscribed Successfully!',
            'Thank you for subscribing to Dr. Bharath’s monthly heart health tips & wellness updates.'
          );
        }
        newsletterForm.reset();
      }
    });
  }

  console.log('⚡ Modern Doctor Portfolio Initialized Successfully.');
});
