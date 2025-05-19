/**
 * Interactive Events Showcase - JavaScript
 * This script implements various event handlers, interactive elements,
 * and form validation for the showcase website.
 */

// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
    // =====================
    // EVENT HANDLING SECTION
    // =====================
    
    // Button Click Event
    const clickBtn = document.getElementById('click-btn');
    const clickResult = document.getElementById('click-result');
    let clickCount = 0;
    
    clickBtn.addEventListener('click', function() {
        clickCount++;
        clickResult.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}!`;
        
        // Change button text after 5 clicks
        if (clickCount === 5) {
            clickBtn.textContent = "You're a pro clicker!";
        }
    });
    
    // Hover Effects
    const hoverBox = document.getElementById('hover-box');
    
    hoverBox.addEventListener('mouseenter', function() {
        this.textContent = "I'm being hovered!";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        this.textContent = "Hover over me";
    });
    
    // Keypress Detection
    const keyInput = document.getElementById('key-input');
    const keyDisplay = document.getElementById('key-display');
    
    keyInput.addEventListener('keyup', function(event) {
        keyDisplay.textContent = event.key;
        // Apply a temporary highlight effect
        keyDisplay.style.fontSize = '1.2em';
        setTimeout(() => {
            keyDisplay.style.fontSize = '1em';
        }, 200);
    });
    
    // Secret Action (Double Click)
    const secretBox = document.getElementById('secret-box');
    
    secretBox.addEventListener('dblclick', function() {
        this.classList.add('secret-revealed');
        this.innerHTML = '<p>🎉 Secret Revealed! 🎉</p>';
        
        // Reset after 3 seconds
        setTimeout(() => {
            this.classList.remove('secret-revealed');
            this.innerHTML = '<p>Try double-clicking me</p>';
        }, 3000);
    });
    
    // Bonus: Long press detection
    let pressTimer;
    
    secretBox.addEventListener('mousedown', function() {
        pressTimer = window.setTimeout(function() {
            secretBox.classList.add('secret-revealed');
            secretBox.innerHTML = '<p>🔮 Long Press Detected! 🔮</p>';
            
            // Reset after 3 seconds
            setTimeout(() => {
                secretBox.classList.remove('secret-revealed');
                secretBox.innerHTML = '<p>Try double-clicking me</p>';
            }, 3000);
        }, 1000); // Long press is defined as 1 second
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // =====================
    // INTERACTIVE ELEMENTS SECTION
    // =====================
    
    // Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    const colorChanger = document.querySelector('.color-changer');
    const colors = ['#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#bbdefb', '#b3e5fc', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#dcedc8', '#f0f4c3', '#fff9c4', '#ffecb3', '#ffe0b2', '#ffccbc'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorChanger.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
        
        // Add a small animation
        colorBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            colorBtn.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Image Gallery/Slideshow
    const galleryImg = document.getElementById('gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageCounter = document.getElementById('image-counter');
    
    const images = [
        'https://via.placeholder.com/400x200?text=Image+1',
        'https://via.placeholder.com/400x200?text=Image+2',
        'https://via.placeholder.com/400x200?text=Image+3',
        'https://via.placeholder.com/400x200?text=Image+4'
    ];
    
    let currentImageIndex = 0;
    
    // Function to update the gallery display
    function updateGallery() {
        // Fade out effect
        galleryImg.style.opacity = 0;
        
        setTimeout(() => {
            galleryImg.src = images[currentImageIndex];
            imageCounter.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
            
            // Fade in effect
            galleryImg.style.opacity = 1;
        }, 300);
    }
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
    });
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    });
    
    // Auto-advance the slideshow every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
    }, 5000);
    
    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Toggle the content
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });
    
    // =====================
    // FORM VALIDATION SECTION
    // =====================
    
    const validationForm = document.getElementById('validation-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const formResult = document.getElementById('form-result');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    // Username validation (real-time)
    username.addEventListener('input', function() {
        if (this.value.trim() === '') {
            usernameError.textContent = 'Username is required';
            this.classList.add('error');
            this.classList.remove('valid');
        } else if (this.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            this.classList.add('error');
            this.classList.remove('valid');
        } else {
            usernameError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
    });
    
    // Email validation (real-time)
    email.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() === '') {
            emailError.textContent = 'Email is required';
            this.classList.add('error');
            this.classList.remove('valid');
        } else if (!emailRegex.test(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
            this.classList.add('error');
            this.classList.remove('valid');
        } else {
            emailError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
    });
    
    // Password strength and validation (real-time)
    password.addEventListener('input', function() {
        const value = this.value;
        let strength = 0;
        let tips = [];
        
        // Check for length
        if (value.length >= 8) {
            strength += 25;
        } else {
            tips.push('at least 8 characters');
        }
        
        // Check for uppercase letters
        if (/[A-Z]/.test(value)) {
            strength += 25;
        } else {
            tips.push('uppercase letter');
        }
        
        // Check for lowercase letters
        if (/[a-z]/.test(value)) {
            strength += 25;
        } else {
            tips.push('lowercase letter');
        }
        
        // Check for numbers or special characters
        if (/[0-9!@#$%^&*]/.test(value)) {
            strength += 25;
        } else {
            tips.push('number or special character');
        }
        
        // Update the strength bar
        strengthBar.style.width = strength + '%';
        
        // Set the color based on strength
        if (strength < 25) {
            strengthBar.style.backgroundColor = '#f44336'; // Red
            strengthText.textContent = 'Strength: Very Weak';
        } else if (strength < 50) {
            strengthBar.style.backgroundColor = '#ff9800'; // Orange
            strengthText.textContent = 'Strength: Weak';
        } else if (strength < 75) {
            strengthBar.style.backgroundColor = '#ffc107'; // Amber
            strengthText.textContent = 'Strength: Moderate';
        } else if (strength < 100) {
            strengthBar.style.backgroundColor = '#4caf50'; // Green
            strengthText.textContent = 'Strength: Strong';
        } else {
            strengthBar.style.backgroundColor = '#2e7d32'; // Dark Green
            strengthText.textContent = 'Strength: Very Strong';
        }
        
        // Update error message
        if (value.trim() === '') {
            passwordError.textContent = 'Password is required';
            this.classList.add('error');
            this.classList.remove('valid');
        } else if (value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            this.classList.add('error');
            this.classList.remove('valid');
        } else if (tips.length > 0) {
            passwordError.textContent = `Include: ${tips.join(', ')}`;
            this.classList.add('error');
            this.classList.remove('valid');
        } else {
            passwordError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
    });
    
    // Confirm password validation (real-time)
    confirmPassword.addEventListener('input', function() {
        if (this.value !== password.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            this.classList.add('error');
            this.classList.remove('valid');
        } else {
            confirmPasswordError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
    });
    
    // Form submission
    validationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        
        // Check for required fields
        let isValid = true;
        
        // Username check
        if (username.value.trim() === '') {
            usernameError.textContent = 'Username is required';
            username.classList.add('error');
            isValid = false;
        }
        
        // Email check
        if (email.value.trim() === '') {
            emailError.textContent = 'Email is required';
            email.classList.add('error');
            isValid = false;
        }
        
        // Password check
        if (password.value.trim() === '') {
            passwordError.textContent = 'Password is required';
            password.classList.add('error');
            isValid = false;
        } else if (password.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            password.classList.add('error');
            isValid = false;
        }
        
        // Confirm password check
        if (confirmPassword.value !== password.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPassword.classList.add('error');
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            formResult.textContent = 'Form submitted successfully!';
            formResult.className = 'form-result success';
            
            // Reset the form after 3 seconds
            setTimeout(() => {
                validationForm.reset();
                formResult.style.display = 'none';
                
                // Reset validation styles
                document.querySelectorAll('.form-input').forEach(input => {
                    input.classList.remove('valid');
                });
                
                // Reset error messages
                document.querySelectorAll('.error-message').forEach(error => {
                    error.textContent = '';
                });
                
                // Reset password strength
                strengthBar.style.width = '0%';
                strengthText.textContent = 'Strength: None';
            }, 3000);
        } else {
            formResult.textContent = 'Please fix the errors in the form.';
            formResult.className = 'form-result error';
        }
    });
    
    // Initialize the first accordion item as open
    accordionHeaders[0].click();
});