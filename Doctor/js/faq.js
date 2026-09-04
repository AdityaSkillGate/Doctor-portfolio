/**
 * FAQ Accordion Animation Logic
 * Modern Doctor Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerWrapper = item.querySelector('.faq-answer-wrapper');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherWrapper = otherItem.querySelector('.faq-answer-wrapper');
          otherWrapper.style.maxHeight = null;
          otherItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('is-open');
        answerWrapper.style.maxHeight = null;
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        answerWrapper.style.maxHeight = answerWrapper.scrollHeight + 'px';
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Open first FAQ item by default
  if (faqItems[0]) {
    const firstBtn = faqItems[0].querySelector('.faq-question-btn');
    const firstWrapper = faqItems[0].querySelector('.faq-answer-wrapper');
    faqItems[0].classList.add('is-open');
    firstWrapper.style.maxHeight = firstWrapper.scrollHeight + 'px';
    firstBtn.setAttribute('aria-expanded', 'true');
  }
});
