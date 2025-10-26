// School Management System JavaScript
let currentRole = '';

function openLogin(role) {
  currentRole = role;
  const modal = document.getElementById('loginModal');
  const modalTitle = document.getElementById('modalTitle');
  
  const roleNames = {
    'admin': 'Admin Login',
    'teacher': 'Teacher Login',
    'parent': 'Parent Login',
    'student': 'Student Login'
  };
  
  if (modal && modalTitle) {
    modalTitle.textContent = roleNames[role];
    modal.style.display = 'block';
  }
}

function closeModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'none';
}

// Authentication credentials for testing
// Users can login with their name (case-insensitive) and their phone number as password
const validUsers = [
  { username: 'mkonzo shirlean', password: '0716191834' },
  { username: 'john doe', password: '0712345678' },
  { username: 'jane smith', password: '0723456789' }
  // Add more users as needed
];

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
    
    // Check if user exists in the validUsers list (case-insensitive)
    const user = validUsers.find(u => 
      u.username.toLowerCase() === username.toLowerCase().trim() && 
      u.password === password
    );
    
    if (user) {
      alert(`Welcome ${username}! Redirecting to ${currentRole} dashboard...`);
      redirectToDashboard(currentRole);
    } else {
      alert('Invalid credentials! Please try again.\n\nMake sure you enter your full name and correct phone number.');
    }
  });
}

function redirectToDashboard(role) {
  const dashboards = {
    'admin': 'admin-dashboard.html',
    'teacher': 'teacher-dashboard.html',
    'parent': 'parent-dashboard.html',
    'student': 'student-dashboard.html'
  };
  
  // Delay redirect to allow alert to be seen
  setTimeout(() => {
    window.location.href = dashboards[role];
  }, 500);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('loginModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// --- Legacy code preserved below ---

// --- Password Visibility Toggle ---
// Toggles the type attribute of password input between 'password' and 'text'
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('toggle-password-btn');

togglePasswordBtn && passwordInput && togglePasswordBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePasswordBtn.textContent = 'Hide Password';
  } else {
    passwordInput.type = 'password';
    togglePasswordBtn.textContent = 'Show Password';
  }
});

// --- Background Color Changer ---
// Changes background color of the color-changer section to a random color on button click
const colorBtn = document.getElementById('color-btn');
const colorSection = document.getElementById('color-changer');

function getRandomColor() {
  // Generates a random hex color
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

colorBtn && colorSection && colorBtn.addEventListener('click', () => {
  const newColor = getRandomColor();
  colorSection.style.backgroundColor = newColor;
});

// --- Custom Form Validation ---
// Prevents form submission if fields are empty or invalid and shows error message
const form = document.getElementById('custom-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const formMessage = document.getElementById('form-message');

form && usernameInput && emailInput && ageInput && formMessage && form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default submission

  // Clear previous message
  formMessage.textContent = '';

  // Basic validation checks
  if (usernameInput.value.trim() === '') {
    formMessage.textContent = 'Please enter your username.';
    usernameInput.focus();
    return;
  }

  if (!validateEmail(emailInput.value.trim())) {
    formMessage.textContent = 'Please enter a valid email address.';
    emailInput.focus();
    return;
  }

  if (!validateAge(ageInput.value.trim())) {
    formMessage.textContent = 'Please enter a valid age (between 1 and 120).';
    ageInput.focus();
    return;
  }

  // If validation passes, you can proceed (e.g., submit data or show success)
  formMessage.style.color = 'green';
  formMessage.textContent = 'Form submitted successfully!';
  form.reset();
});

// Helper function to validate email format (simple regex)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Helper function to validate age (must be number between 1 and 120)
function validateAge(age) {
  const ageNum = Number(age);
  return ageNum > 0 && ageNum <= 120;
}

// --- Mobile Navigation Toggle ---
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.querySelector('.site-nav');
navToggle && siteNav && navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

// --- Dynamic Year in Footer ---
const yearEl = document.getElementById('year');
yearEl && (yearEl.textContent = new Date().getFullYear());

