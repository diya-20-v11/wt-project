/**
 * Form Validation Library for Interior Designer Firm Portfolio
 * Implements all 5 required JS validation rules specified in university guidelines:
 * Fig 1.1: All fields are required
 * Fig 1.2: Password Length (minimum 8 characters)
 * Fig 1.3: Email Pattern (standard regex email pattern)
 * Fig 1.4: Password Pattern (upper, lower, digit, special char)
 * Fig 1.5: Phone number patterns (10 digits numeric)
 */

const Validator = {
  // Regex Patterns
  patterns: {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]{10}$/,
    passwordUpper: /[A-Z]/,
    passwordLower: /[a-z]/,
    passwordDigit: /[0-9]/,
    passwordSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  },

  // 1. All fields required check
  isNotEmpty(value) {
    return value !== null && value !== undefined && value.trim().length > 0;
  },

  // 2. Password length (min 8)
  hasValidPasswordLength(password, min = 8) {
    return typeof password === 'string' && password.length >= min;
  },

  // 3. Email Pattern
  isValidEmail(email) {
    return this.patterns.email.test(String(email).toLowerCase());
  },

  // 4. Password Pattern (strong password rule)
  isValidPasswordPattern(password) {
    return (
      this.hasValidPasswordLength(password, 8) &&
      this.patterns.passwordUpper.test(password) &&
      this.patterns.passwordLower.test(password) &&
      this.patterns.passwordDigit.test(password) &&
      this.patterns.passwordSpecial.test(password)
    );
  },

  // 5. Phone number pattern (10 digits)
  isValidPhone(phone) {
    // Strip non-digits for checking
    const cleaned = String(phone).replace(/\D/g, '');
    return cleaned.length === 10;
  },

  // UI Helper: mark field as valid or invalid
  setFieldStatus(inputEl, isValid, errorMessage = '') {
    if (!inputEl) return;
    const parent = inputEl.closest('.form-group') || inputEl.parentElement;
    let feedback = parent.querySelector('.invalid-feedback');

    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      parent.appendChild(feedback);
    }

    if (isValid) {
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
      feedback.textContent = '';
      feedback.style.display = 'none';
    } else {
      inputEl.classList.remove('is-valid');
      inputEl.classList.add('is-invalid');
      feedback.textContent = errorMessage;
      feedback.style.display = 'block';
    }
  },

  clearFieldStatus(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-valid', 'is-invalid');
    const parent = inputEl.closest('.form-group') || inputEl.parentElement;
    const feedback = parent.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = '';
      feedback.style.display = 'none';
    }
  }
};

