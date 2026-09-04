/**
 * Quick Appointment Modal & Toast Notifications
 * Modern Doctor Portfolio
 */

// Global Toast System
window.showDoctorToast = (title, message) => {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.classList.add('toast-container');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <div class="toast-body">
      <span class="toast-title">${title}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('is-show');
  });

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('is-show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
};

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.appointment-modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const openButtons = document.querySelectorAll('[data-open-modal="appointment"]');
  const modalForm = document.getElementById('modal-appointment-form');
  const modalServiceSelect = document.getElementById('modal-service-select');

  if (!modal) return;

  const openModal = (serviceName) => {
    if (serviceName && modalServiceSelect) {
      modalServiceSelect.value = serviceName;
    }
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      openModal(service);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Form Submission Handling inside Modal
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `
        <svg class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Booking Appointment...
      `;
      submitBtn.disabled = true;

      const patientName = modalForm.querySelector('[name="name"]').value;
      const patientPhone = modalForm.querySelector('[name="phone"]').value;
      const patientService = modalForm.querySelector('[name="service"]').value;
      const appointmentDate = modalForm.querySelector('[name="date"]').value;
      const appointmentTime = modalForm.querySelector('[name="time"]').value;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        if (window.openWhatsAppAppointment) {
          window.openWhatsAppAppointment({
            name: patientName,
            phone: patientPhone,
            service: patientService,
            date: appointmentDate,
            time: appointmentTime,
            message: 'Quick appointment request from website popup form.'
          });
        }

        closeModal();
        modalForm.reset();

        if (window.showDoctorToast) {
          window.showDoctorToast(
            'Appointment Requested!',
            `Thank you ${patientName}. Dr. Bharath's desk will confirm your appointment for ${patientService} shortly via SMS/WhatsApp.`
          );
        }
      }, 1200);
    });
  }
});
