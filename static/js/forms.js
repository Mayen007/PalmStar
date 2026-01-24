/**
 * Forms Module
 * Handles form validation, submission, and user feedback
 */

/**
 * Form validation and submission handler
 */
class FormHandler {
  constructor(formId, options = {}) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.options = {
      showSuccessMessage: true,
      resetAfterSubmit: true,
      successMessage: 'Thank you! Your submission has been received.',
      errorMessage: 'Please fill in all required fields correctly.',
      ...options
    };

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Add real-time validation
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Set minimum date for date inputs to today
    this.setMinDate();
  }

  setMinDate() {
    const dateInputs = this.form.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
      input.setAttribute('min', today);
    });
  }

  validateField(field) {
    const isValid = field.checkValidity();

    if (!isValid) {
      this.showFieldError(field, field.validationMessage);
      return false;
    }

    // Additional custom validations
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        this.showFieldError(field, 'Please enter a valid email address.');
        return false;
      }
    }

    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(field.value)) {
        this.showFieldError(field, 'Please enter a valid phone number.');
        return false;
      }
    }

    // Validate checkout date is after checkin date
    if (field.id === 'checkout-date' || field.id === 'footer-checkout-date') {
      const checkinField = field.id.includes('footer')
        ? document.getElementById('footer-checkin-date')
        : document.getElementById('checkin-date');

      if (checkinField && checkinField.value && field.value) {
        if (new Date(field.value) <= new Date(checkinField.value)) {
          this.showFieldError(field, 'Check-out date must be after check-in date.');
          return false;
        }
      }
    }

    this.clearFieldError(field);
    return true;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);

    field.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentElement.querySelector('.invalid-feedback');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const inputs = this.form.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (input.hasAttribute('required') || input.value) {
        if (!this.validateField(input)) {
          isValid = false;
        }
      }
    });

    if (!isValid) {
      this.showMessage(this.options.errorMessage, 'danger');
      return;
    }

    // Collect form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

    try {
      // Simulate API call (replace with actual endpoint)
      await this.submitData(data);

      // Success
      if (this.options.showSuccessMessage) {
        this.showMessage(this.options.successMessage, 'success');
      }

      if (this.options.resetAfterSubmit) {
        this.form.reset();
      }

      // Close modal if form is in a modal
      const modal = this.form.closest('.modal');
      if (modal) {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
          setTimeout(() => bsModal.hide(), 2000);
        }
      }

    } catch (error) {
      this.showMessage('An error occurred. Please try again later.', 'danger');
      console.error('Form submission error:', error);
    } finally {
      // Restore button state
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  }

  async submitData(data) {
    // Simulate API call - replace with actual backend endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', data);
        // Store in localStorage for demo purposes
        const submissions = JSON.parse(localStorage.getItem('palmstar_submissions') || '[]');
        submissions.push({
          ...data,
          timestamp: new Date().toISOString(),
          formType: this.form.id
        });
        localStorage.setItem('palmstar_submissions', JSON.stringify(submissions));
        resolve();
      }, 1500);
    });
  }

  showMessage(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = this.form.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert at top of form
    this.form.insertBefore(alert, this.form.firstChild);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 150);
    }, 5000);
  }
}

/**
 * Authentication handler for login/signup forms
 */
class AuthHandler {
  constructor() {
    this.initLoginForm();
    this.initSignupForm();
  }

  initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const remember = document.getElementById('remember').checked;

      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';

      try {
        await this.login(email, password, remember);
        this.showAlert(loginForm, 'Login successful! Redirecting...', 'success');

        // Redirect to dashboard (or home page)
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 1500);

      } catch (error) {
        this.showAlert(loginForm, error.message, 'danger');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }

  initSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;

    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const terms = document.getElementById('terms').checked;

      if (!terms) {
        this.showAlert(signupForm, 'Please accept the terms and conditions.', 'warning');
        return;
      }

      const submitButton = signupForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';

      try {
        await this.signup(name, email, password);
        this.showAlert(signupForm, 'Account created successfully! Please login.', 'success');

        // Switch to login tab
        setTimeout(() => {
          document.querySelector('.tab').click();
        }, 1500);

      } catch (error) {
        this.showAlert(signupForm, error.message, 'danger');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }

  async login(email, password, remember) {
    // Simulate API call - replace with actual authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('palmstar_users') || '[]');
        const user = users.find(u => u.email === email);

        if (user && user.password === password) {
          // Store session
          const session = { email, name: user.name, loggedIn: true };
          if (remember) {
            localStorage.setItem('palmstar_session', JSON.stringify(session));
          } else {
            sessionStorage.setItem('palmstar_session', JSON.stringify(session));
          }
          resolve(session);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 1000);
    });
  }

  async signup(name, email, password) {
    // Simulate API call - replace with actual user registration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('palmstar_users') || '[]');

        if (users.some(u => u.email === email)) {
          reject(new Error('Email already registered.'));
          return;
        }

        users.push({ name, email, password, createdAt: new Date().toISOString() });
        localStorage.setItem('palmstar_users', JSON.stringify(users));
        resolve();
      }, 1000);
    });
  }

  showAlert(form, message, type) {
    const existingAlerts = form.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    form.insertBefore(alert, form.firstChild);

    setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 150);
    }, 5000);
  }
}

/**
 * Initialize all forms when DOM is ready
 */
function initializeForms() {
  // Booking forms
  new FormHandler('bookingModal', {
    successMessage: 'Your booking request has been received! We\'ll contact you shortly.'
  });

  // Contact form
  new FormHandler('contactForm', {
    successMessage: 'Thank you for contacting us! We\'ll respond within 24 hours.'
  });

  // Authentication
  new AuthHandler();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeForms);
} else {
  initializeForms();
}
