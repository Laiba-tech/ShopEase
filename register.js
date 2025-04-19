document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const emailInput = registerForm.email;
  const passwordInput = registerForm.password;
  const confirmPasswordInput = registerForm['confirm-password'];
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    let valid = true;

    // Reset error messages
    emailError.classList.add('hidden');
    passwordError.classList.add('hidden');
    confirmPasswordError.classList.add('hidden');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailError.classList.remove('hidden');
      valid = false;
    }

    // Password validation (min 6 chars)
    if (!password || password.length < 6) {
      passwordError.classList.remove('hidden');
      valid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      confirmPasswordError.classList.remove('hidden');
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Check if user already exists
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
      alert('User with this email already exists.');
      return;
    }

    // Save new user
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now login.');

    // Redirect to login page
    window.location.href = 'login.html';
  });
});
