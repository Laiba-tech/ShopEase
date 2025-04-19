document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = loginForm.email;
  const passwordInput = loginForm.password;
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let valid = true;

    // Reset error messages
    emailError.classList.add('hidden');
    passwordError.classList.add('hidden');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailError.classList.remove('hidden');
      valid = false;
    }

    // Password validation
    if (!password) {
      passwordError.classList.remove('hidden');
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Check user credentials from localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

    if (!user) {
      alert('Invalid email or password.');
      return;
    }

    // Save logged in user info in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email }));

    alert('Login successful!');

    // Redirect to homepage or dashboard
    window.location.href = 'index.html';
  });
});
