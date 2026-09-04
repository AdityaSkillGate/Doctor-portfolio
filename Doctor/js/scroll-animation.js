/**
 * Scroll Animations & Dynamic Typing Effect
 * Modern Doctor Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animations Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-pop, .scroll-pop');

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 2. Dynamic Typing Specialty in Hero Section
  const typingElement = document.getElementById('typing-specialty');
  if (typingElement) {
    const phrases = [
      'Senior Consultant Cardiologist',
      'Interventional Heart Specialist',
      'Advanced Cardiac Care Expert',
      'Preventive Heart Health Pioneer'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Brief pause before typing next
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 500);
  }
});
