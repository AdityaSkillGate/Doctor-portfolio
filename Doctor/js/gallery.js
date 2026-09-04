/**
 * Clinic Gallery Filtering & Full Lightbox Modal
 * Modern Doctor Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close-btn');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  if (!galleryItems.length) return;

  // 1. Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          item.style.display = 'block';
        } else {
          item.classList.add('hide');
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. Lightbox Functionality
  let currentActiveImages = [];
  let currentLightboxIndex = 0;

  const getVisibleImages = () => {
    return Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
  };

  const openLightbox = (index) => {
    currentActiveImages = getVisibleImages();
    if (!currentActiveImages.length) return;

    currentLightboxIndex = index;
    updateLightboxImage();

    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const updateLightboxImage = () => {
    const currentItem = currentActiveImages[currentLightboxIndex];
    if (!currentItem) return;

    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-item-title')?.textContent || '';
    const category = currentItem.querySelector('.gallery-item-category')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${category ? category + ' — ' : ''}${title}`;
  };

  const showNextImage = () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentActiveImages.length;
    updateLightboxImage();
  };

  const showPrevImage = () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentActiveImages.length) % currentActiveImages.length;
    updateLightboxImage();
  };

  // Open on item click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const visibleList = getVisibleImages();
      const itemIndex = visibleList.indexOf(item);
      if (itemIndex !== -1) {
        openLightbox(itemIndex);
      }
    });
  });

  // Lightbox Controls
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Close when clicking outside image content
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });
});
