// --- DOM Element Selection ---
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const dashboard = document.getElementById('dashboard');
const logoutButton = document.getElementById('logout-button');

const loginMessage = document.getElementById('login-message');
const signupMessage = document.getElementById('signup-message');

// Dashboard elements for displaying profile data
const welcomeMessage = document.getElementById('welcome-message');
const profileEmail = document.getElementById('profile-email');


// --- Mock User Storage (Simulated Database) ---
// Initialize with one default user for testing
const users = [
    { username: 'AdminUser', email: 'admin@test.com', password: 'password123' }
];
let loggedInUser = null; // Stores the object of the currently logged-in user

// --- Toggling Logic ---
function switchForm(formToShow) {
    // Hide all forms and the dashboard
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    dashboard.classList.add('hidden');
    loginMessage.textContent = '';
    signupMessage.textContent = '';

    // Clear logged-in user on logout
    if (formToShow === 'login') {
        loggedInUser = null;
    }

    // Update tab styles
    loginTab.classList.remove('active');
    signupTab.classList.remove('active');

    // Show the requested area
    if (formToShow === 'login') {
        loginForm.classList.remove('hidden');
        loginTab.classList.add('active');
    } else if (formToShow === 'signup') {
        signupForm.classList.remove('hidden');
        signupTab.classList.add('active');
    } else if (formToShow === 'dashboard') {
        dashboard.classList.remove('hidden');
        // Function call to update profile data
        updateDashboardProfile(loggedInUser); 
    }
}

loginTab.addEventListener('click', () => switchForm('login'));
signupTab.addEventListener('click', () => switchForm('signup'));
logoutButton.addEventListener('click', () => switchForm('login'));

// --- Function to update the dashboard with user data ---
function updateDashboardProfile(user) {
    if (user) {
        welcomeMessage.textContent = `Welcome, ${user.username}!`;
        profileEmail.textContent = user.email;
    }
}


// --- SIGN UP Logic (Simulated Registration) ---
signupForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    // Basic Validation
    if (password !== confirm) {
        signupMessage.textContent = 'Error: Passwords do not match.';
        signupMessage.className = 'message error';
        return;
    }
    if (users.find(u => u.email === email)) {
        signupMessage.textContent = 'Error: Account with this email already exists.';
        signupMessage.className = 'message error';
        return;
    }

    // SIMULATED BACKEND: Store new user
    const newUser = { username, email, password };
    users.push(newUser);

    signupMessage.textContent = `Success! Account created for ${username}. Logging you in...`;
    signupMessage.className = 'message success';

    // Set loggedInUser and simulate immediate login
    loggedInUser = newUser; 

    setTimeout(() => {
        switchForm('dashboard');
        signupForm.reset();
    }, 1500);
});


// --- LOGIN Logic (Simulated Authentication) ---
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // SIMULATED BACKEND: Check credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        loginMessage.textContent = 'Success! Logging in...';
        loginMessage.className = 'message success';
        
        // Set loggedInUser
        loggedInUser = user;

        // Simulate successful login
        setTimeout(() => {
            switchForm('dashboard');
            loginForm.reset();
        }, 1500);
    } else {
        loginMessage.textContent = 'Error: Invalid email or password.';
        loginMessage.className = 'message error';
    }
});