/**
 * Contact Form & WhatsApp Quick Connect Logic
 * Modern Doctor Portfolio
 */

const doctorWhatsAppNumber = '919876543210'; // Replace with actual doctor clinic number

window.openWhatsAppAppointment = (bookingData = {}) => {
  const {
    name = 'Patient',
    phone = 'Not provided',
    service = 'Cardiology Consultation',
    date = 'Not specified',
    time = 'Not specified',
    message = ''
  } = bookingData;

  const appointmentText = [
    'Hello Dr. Bharath Kumar, I would like to book an appointment.',
    `Patient Name: ${name}`,
    `Phone Number: ${phone}`,
    `Service: ${service}`,
    `Preferred Date: ${date}`,
    `Preferred Time: ${time}`
  ];

  if (message) {
    appointmentText.push(`Additional Details: ${message}`);
  }

  const whatsappUrl = `https://wa.me/${doctorWhatsAppNumber}?text=${encodeURIComponent(appointmentText.join('\n'))}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

document.addEventListener('DOMContentLoaded', () => {
  const mainBookingForm = document.getElementById('main-booking-form');
  const whatsappButtons = document.querySelectorAll('.whatsapp-trigger-btn');

  // 1. Main Booking Form Submission
  if (mainBookingForm) {
    mainBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = mainBookingForm.querySelector('[name="name"]').value;
      const phone = mainBookingForm.querySelector('[name="phone"]').value;
      const service = mainBookingForm.querySelector('[name="service"]').value;
      const date = mainBookingForm.querySelector('[name="date"]').value;
      const time = mainBookingForm.querySelector('[name="time"]').value;
      const message = mainBookingForm.querySelector('[name="message"]')?.value || '';

      const submitBtn = mainBookingForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Submitting Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        mainBookingForm.reset();

        if (window.openWhatsAppAppointment) {
          window.openWhatsAppAppointment({ name, phone, service, date, time, message });
        }

        if (window.showDoctorToast) {
          window.showDoctorToast(
            'Appointment Booked Successfully!',
            `Dear ${name}, your consultation request for ${service} on ${date} (${time}) has been received. Our clinic team will reach out at ${phone}.`
          );
        }
      }, 1000);
    });
  }

  // 2. WhatsApp Direct Appointment Trigger
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const defaultText = encodeURIComponent(
        'Hello Dr. Bharath Kumar, I would like to schedule a cardiology consultation / health inquiry. Please let me know available slots.'
      );
      const whatsappUrl = `https://wa.me/${doctorWhatsAppNumber}?text=${defaultText}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });
});
