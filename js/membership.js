document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('membershipForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const gender = document.getElementById('gender');
    const dateOfBirth = document.getElementById('dateOfBirth');
    const password = document.getElementById('password');
    const termsAgreement = document.getElementById('termsAgreement');
    const togglePassword = document.getElementById('togglePassword');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        if (password.type === 'password') {
            password.type = 'text';
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            password.type = 'password';
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });

    // Password strength meter
    password.addEventListener('input', updateStrengthMeter);

    function updateStrengthMeter() {
        const value = password.value;
        const strength = calculatePasswordStrength(value);
        
        // Update the meter fill width
        strengthMeter.style.width = `${strength}%`;
        
        // Update color and text based on strength
        if (strength < 25) {
            strengthMeter.style.backgroundColor = '#e74c3c'; // Red
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#e74c3c';
        } else if (strength < 50) {
            strengthMeter.style.backgroundColor = '#f39c12'; // Orange
            strengthText.textContent = 'Fair';
            strengthText.style.color = '#f39c12';
        } else if (strength < 75) {
            strengthMeter.style.backgroundColor = '#3498db'; // Blue
            strengthText.textContent = 'Good';
            strengthText.style.color = '#3498db';
        } else {
            strengthMeter.style.backgroundColor = '#2ecc71'; // Green
            strengthText.textContent = 'Strong';
            strengthText.style.color = '#2ecc71';
        }
    }

    function calculatePasswordStrength(password) {
        if (!password) return 0;
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) {
            strength += 25;
        } else if (password.length >= 6) {
            strength += 15;
        } else if (password.length >= 4) {
            strength += 5;
        }
        
        // Uppercase letters check
        if (password.match(/[A-Z]/)) {
            strength += 25;
        }
        
        // Lowercase letters check
        if (password.match(/[a-z]/)) {
            strength += 15;
        }
        
        // Numbers check
        if (password.match(/[0-9]/)) {
            strength += 20;
        }
        
        // Special characters check
        if (password.match(/[^A-Za-z0-9]/)) {
            strength += 15;
        }
        
        return Math.min(100, strength);
    }

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Reset all error states
        resetFormErrors();
        
        // Validate name (Validation type 1: Required field)
        if (!validateRequired(fullName, 'fullNameError', 'Full name is required')) {
            isValid = false;
        } else if (!validateNameFormat(fullName, 'fullNameError')) {
            isValid = false;
        }
        
        // Validate email (Validation type 2: Email format)
        if (!validateRequired(email, 'emailError', 'Email is required')) {
            isValid = false;
        } else if (!validateEmailFormat(email, 'emailError')) {
            isValid = false;
        }
        
        // Validate gender (Validation type 3: Select/dropdown)
        if (!validateSelect(gender, 'genderError', 'Please select your gender')) {
            isValid = false;
        }
        
        // Validate date of birth (Validation type 4: Date validation)
        if (!validateRequired(dateOfBirth, 'dateOfBirthError', 'Date of birth is required')) {
            isValid = false;
        } else if (!validateDateOfBirth(dateOfBirth, 'dateOfBirthError')) {
            isValid = false;
        }
        
        // Validate password (Validation type 5: Password strength)
        if (!validateRequired(password, 'passwordError', 'Password is required')) {
            isValid = false;
        } else if (!validatePasswordStrength(password, 'passwordError')) {
            isValid = false;
        }
        
        // Validate terms agreement
        if (!validateCheckbox(termsAgreement, 'termsAgreementError', 'You must agree to the terms and conditions')) {
            isValid = false;
        }
        
        // If form is valid, show success modal
        if (isValid) {
            // Show success modal
            modal.classList.add('show');
            
            // Reset form
            form.reset();
        }
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Validation functions
    function resetFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const formGroups = document.querySelectorAll('.form-group');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
        });
    }

    function validateRequired(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        const formGroup = input.closest('.form-group');
        
        if (input.value.trim() === '') {
            errorElement.textContent = message;
            formGroup.classList.add('error');
            return false;
        }
        
        formGroup.classList.add('success');
        return true;
    }

    function validateNameFormat(input, errorId) {
        const errorElement = document.getElementById(errorId);
        const formGroup = input.closest('.form-group');
        const value = input.value.trim();
        
        // Check if name contains only letters and spaces
        if (!/^[A-Za-z\s]+$/.test(value)) {
            errorElement.textContent = 'Name should contain only letters and spaces';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        // Check if name has at least 2 characters
        if (value.length < 2) {
            errorElement.textContent = 'Name should be at least 2 characters long';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        return true;
    }

    function validateEmailFormat(input, errorId) {
        const errorElement = document.getElementById(errorId);
        const formGroup = input.closest('.form-group');
        const value = input.value.trim();
        
        // Basic email validation without regex
        const hasAtSymbol = value.includes('@');
        const hasDomain = value.split('@')[1] && value.split('@')[1].includes('.');
        const hasExtension = value.split('.').pop().length >= 2;
        const hasNoSpaces = !value.includes(' ');
        const hasUsername = value.split('@')[0].length > 0;
        
        if (!hasAtSymbol || !hasDomain || !hasExtension || !hasNoSpaces || !hasUsername) {
            errorElement.textContent = 'Please enter a valid email address';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        return true;
    }

    function validateSelect(select, errorId, message) {
        const errorElement = document.getElementById(errorId);
        const formGroup = select.closest('.form-group');
        
        if (select.value === '') {
            errorElement.textContent = message;
            formGroup.classList.add('error');
            return false;
        }
        
        formGroup.classList.add('success');
        return true;
    }

    function validateDateOfBirth(input, errorId) {
        const errorElement = document.getElementById(errorId);
        const formGroup = input.closest('.form-group');
        const selectedDate = new Date(input.value);
        const today = new Date();
        
        // Check if date is in the future
        if (selectedDate > today) {
            errorElement.textContent = 'Date of birth cannot be in the future';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        // Check if user is at least 13 years old
        const minAgeDate = new Date();
        minAgeDate.setFullYear(today.getFullYear() - 13);
        
        if (selectedDate > minAgeDate) {
            errorElement.textContent = 'You must be at least 13 years old to register';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        // Check if user's age is reasonable (less than 120 years)
        const maxAgeDate = new Date();
        maxAgeDate.setFullYear(today.getFullYear() - 120);
        
        if (selectedDate < maxAgeDate) {
            errorElement.textContent = 'Please enter a valid date of birth';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        return true;
    }

    function validatePasswordStrength(input, errorId) {
        const errorElement = document.getElementById(errorId);
        const formGroup = input.closest('.form-group');
        const value = input.value;
        
        // Password must be at least 8 characters
        if (value.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters long';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        // Password must contain at least one uppercase letter
        if (!/[A-Z]/.test(value)) {
            errorElement.textContent = 'Password must contain at least one uppercase letter';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        // Password must contain at least one lowercase letter
        if (!/[a-z]/.test(value)) {
            errorElement.textContent = 'Password must contain at least one lowercase letter';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        // Password must contain at least one number
        if (!/[0-9]/.test(value)) {
            errorElement.textContent = 'Password must contain at least one number';
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        }
        
        return true;
    }

    function validateCheckbox(checkbox, errorId, message) {
        const errorElement = document.getElementById(errorId);
        const formGroup = checkbox.closest('.form-group');
        
        if (!checkbox.checked) {
            errorElement.textContent = message;
            formGroup.classList.add('error');
            return false;
        }
        
        formGroup.classList.add('success');
        return true;
    }

    // Add animation when form comes into view
    const formContainer = document.querySelector('.form-container');
    
    const revealForm = () => {
        const formTop = formContainer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (formTop < windowHeight - 150) {
            formContainer.style.opacity = '1';
            formContainer.style.transform = 'translateY(0)';
            window.removeEventListener('scroll', revealForm);
        }
    };
    
    // Initialize styles for reveal animation
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(30px)';
    formContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Call reveal function on scroll and on load
    window.addEventListener('scroll', revealForm);
    revealForm(); // Initial check
}); 