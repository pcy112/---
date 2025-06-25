function login() {
    // Implement login functionality here
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");

    // Simulate a successful login for demonstration purposes
    if (username && password) {
        localStorage.setItem('user', username);
        location.href = 'loginAfter.html';
    } else {
        alert("Please enter valid credentials.");
    }
}

function signUp() {
    // Implement signup functionality here
    const username = prompt("Choose a username:");
    const password = prompt("Choose a password:");

    // Simulate a successful signup for demonstration purposes
    if (username && password) {
        alert("Signup successful! You can now log in.");
        location.href = 'login.html';
    } else {
        alert("Please enter valid information.");
    }
}

function homePage() {
    location.href = 'index.html';
}

function popupPage() {
    alert("Welcome to the web application!");
}