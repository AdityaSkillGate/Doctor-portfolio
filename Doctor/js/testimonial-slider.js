/**
 * Patient Testimonial Slider
 * Modern Doctor Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let itemsPerView = 3;

  // Calculate items visible per view based on viewport
  const updateItemsPerView = () => {
    if (window.innerWidth < 768) {
      itemsPerView = 1;
    } else if (window.innerWidth < 1024) {
      itemsPerView = 2;
    } else {
      itemsPerView = 3;
    }
  };

  const getMaxIndex = () => Math.max(0, slides.length - itemsPerView);

  // Generate pagination dots
  const createDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    
    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  };

  const updateDots = () => {
    const dots = dotsContainer?.querySelectorAll('.carousel-dot');
    if (!dots) return;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    const maxIndex = getMaxIndex();
    if (index < 0) {
      currentIndex = maxIndex;
    } else if (index > maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const slideWidthPercentage = 100 / itemsPerView;
    track.style.transform = `translateX(-${currentIndex * slideWidthPercentage}%)`;
    updateDots();
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  // Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Autoplay Logic
  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 5000);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayTimer);
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  // Touch Swipe Support
  let startX = 0;
  let currentX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    const diffX = startX - currentX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoplay();
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    updateItemsPerView();
    createDots();
    goToSlide(0);
  });

  // Initialize
  updateItemsPerView();
  createDots();
  startAutoplay();
});
