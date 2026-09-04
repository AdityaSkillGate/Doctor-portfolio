/**
 * Navbar & Navigation Interactions
 * Modern Doctor Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // 1. Fixed Header Elevation on Scroll
  const handleScroll = () => {
    const scrolled = window.scrollY > 20;
    header.classList.toggle('is-scrolled', scrolled);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Toggle
  const toggleMobileMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
    if (shouldOpen) {
      hamburger.classList.add('is-active');
      mobileDrawer.classList.add('is-open');
      mobileOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    } else {
      hamburger.classList.remove('is-active');
      mobileDrawer.classList.remove('is-open');
      mobileOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 3. Scroll Spy (Active Navigation Item)
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const scrollSpyObserver = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(sec => scrollSpyObserver.observe(sec));
});
