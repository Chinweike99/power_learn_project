document.addEventListener('DOMContentLoaded', function() {
    // Load saved preferences
    loadPreferences();
    
    // Set up event listeners
    document.getElementById('savePref').addEventListener('click', savePreferences);
    document.getElementById('animateBtn').addEventListener('click', toggleAnimation);
    
    // Apply saved theme
    applyTheme();
});

function loadPreferences() {
    const username = localStorage.getItem('username');
    const theme = localStorage.getItem('theme');
    
    if (username) {
        document.getElementById('username').value = username;
    }
    
    if (theme) {
        document.getElementById('theme').value = theme;
    }
}

function savePreferences() {
    const username = document.getElementById('username').value;
    const theme = document.getElementById('theme').value;
    
    localStorage.setItem('username', username);
    localStorage.setItem('theme', theme);
    
    applyTheme();
    
    // Show a confirmation with animation
    const saveBtn = document.getElementById('savePref');
    saveBtn.textContent = 'Saved!';
    saveBtn.style.backgroundColor = '#2ecc71';
    
    setTimeout(() => {
        saveBtn.textContent = 'Save Preferences';
        saveBtn.style.backgroundColor = '#3498db';
    }, 2000);
}

function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
}

function toggleAnimation() {
    const box = document.getElementById('box');
    const animateBtn = document.getElementById('animateBtn');
    
    if (box.classList.contains('bounce-animation')) {
        box.classList.remove('bounce-animation');
        box.classList.add('spin-animation');
        animateBtn.textContent = 'Switch to Bounce';
    } else {
        box.classList.remove('spin-animation');
        box.classList.add('bounce-animation');
        animateBtn.textContent = 'Switch to Spin';
    }
}