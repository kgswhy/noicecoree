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

    // Add input event listeners for real-time validation
    fullName.addEventListener('input', () => validateName(fullName.value));
    email.addEventListener('input', () => validateEmail(email.value));
    password.addEventListener('input', () => {
        validatePassword(password.value);
        updateStrengthMeter(password.value);
    });
    dateOfBirth.addEventListener('change', () => validateDateOfBirth(dateOfBirth.value));
    termsAgreement.addEventListener('change', () => validateTerms());

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // 1. Name Validation
    function validateName(name) {
        const errorElement = document.getElementById('fullNameError');
        const formGroup = fullName.closest('.form-group');
        
        // Reset error state
        errorElement.textContent = '';
        formGroup.classList.remove('error', 'success');
        
        // Check if empty
        if (!name.trim()) {
            errorElement.textContent = 'Name is required';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check minimum length
        if (name.trim().length < 2) {
            errorElement.textContent = 'Name must be at least 2 characters long';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check for numbers
        for (let char of name) {
            if ('0123456789'.includes(char)) {
                errorElement.textContent = 'Name cannot contain numbers';
                formGroup.classList.add('error');
                return false;
            }
        }
        
        // Check for special characters
        const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\';
        for (let char of name) {
            if (specialChars.includes(char)) {
                errorElement.textContent = 'Name cannot contain special characters';
                formGroup.classList.add('error');
                return false;
            }
        }
        
        formGroup.classList.add('success');
        return true;
    }

    // 2. Email Validation
    function validateEmail(email) {
        const errorElement = document.getElementById('emailError');
        const formGroup = document.getElementById('email').closest('.form-group');
        
        // Reset error state
        errorElement.textContent = '';
        formGroup.classList.remove('error', 'success');
        
        // Check if empty
        if (!email.trim()) {
            errorElement.textContent = 'Email is required';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check for @ symbol
        const atIndex = email.indexOf('@');
        if (atIndex === -1 || atIndex === 0) {
            errorElement.textContent = 'Invalid email format';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check for domain
        const domainPart = email.substring(atIndex + 1);
        const dotIndex = domainPart.indexOf('.');
        if (dotIndex === -1 || dotIndex === 0 || dotIndex === domainPart.length - 1) {
            errorElement.textContent = 'Invalid email domain';
            formGroup.classList.add('error');
            return false;
        }
        
        formGroup.classList.add('success');
        return true;
    }

    // 3. Password Validation
    function validatePassword(password) {
        const errorElement = document.getElementById('passwordError');
        const formGroup = document.getElementById('password').closest('.form-group');
        
        // Reset error state
        errorElement.textContent = '';
        formGroup.classList.remove('error', 'success');
        
        // Check if empty
        if (!password) {
            errorElement.textContent = 'Password is required';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check minimum length
        if (password.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters long';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check for uppercase
        let hasUpper = false;
        for (let char of password) {
            if (char >= 'A' && char <= 'Z') {
                hasUpper = true;
                break;
            }
        }
        if (!hasUpper) {
            errorElement.textContent = 'Password must contain at least one uppercase letter';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check for lowercase
        let hasLower = false;
        for (let char of password) {
            if (char >= 'a' && char <= 'z') {
                hasLower = true;
                break;
            }
        }
        if (!hasLower) {
            errorElement.textContent = 'Password must contain at least one lowercase letter';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check for numbers
        let hasNumber = false;
        for (let char of password) {
            if (char >= '0' && char <= '9') {
                hasNumber = true;
                break;
            }
        }
        if (!hasNumber) {
            errorElement.textContent = 'Password must contain at least one number';
            formGroup.classList.add('error');
            return false;
        }
        
        formGroup.classList.add('success');
        return true;
    }

    // Update strength meter
    function updateStrengthMeter(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        
        for (let char of password) {
            if (char >= 'A' && char <= 'Z') {
                strength += 25;
                break;
            }
        }
        
        for (let char of password) {
            if (char >= '0' && char <= '9') {
                strength += 25;
                break;
            }
        }
        
        strengthMeter.style.width = strength + '%';
        
        if (strength <= 25) {
            strengthMeter.style.backgroundColor = '#ff4444';
            strengthText.textContent = 'Weak';
        } else if (strength <= 50) {
            strengthMeter.style.backgroundColor = '#ffbb33';
            strengthText.textContent = 'Fair';
        } else if (strength <= 75) {
            strengthMeter.style.backgroundColor = '#00C851';
            strengthText.textContent = 'Good';
        } else {
            strengthMeter.style.backgroundColor = '#007E33';
            strengthText.textContent = 'Strong';
        }
    }

    // 4. Date of Birth Validation
    function validateDateOfBirth(dob) {
        const errorElement = document.getElementById('dateOfBirthError');
        const formGroup = dateOfBirth.closest('.form-group');
        
        // Reset error state
        errorElement.textContent = '';
        formGroup.classList.remove('error', 'success');
        
        // Check if empty
        if (!dob) {
            errorElement.textContent = 'Date of birth is required';
            formGroup.classList.add('error');
            return false;
        }
        
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        // Check if date is in future
        if (birthDate > today) {
            errorElement.textContent = 'Date of birth cannot be in the future';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check minimum age (13 years)
        if (age < 13) {
            errorElement.textContent = 'You must be at least 13 years old';
            formGroup.classList.add('error');
            return false;
        }
        
        // Check maximum age (120 years)
        if (age > 120) {
            errorElement.textContent = 'Please enter a valid date of birth';
            formGroup.classList.add('error');
            return false;
        }
        
        formGroup.classList.add('success');
        return true;
    }

    // 5. Terms Agreement Validation
    function validateTerms() {
        const errorElement = document.getElementById('termsAgreementError');
        const formGroup = termsAgreement.closest('.form-group');
        
        // Reset error state
        errorElement.textContent = '';
        formGroup.classList.remove('error', 'success');
        
        if (!termsAgreement.checked) {
            errorElement.textContent = 'You must accept the terms and conditions';
            formGroup.classList.add('error');
            return false;
        }
        
        formGroup.classList.add('success');
        return true;
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName(fullName.value);
        const isEmailValid = validateEmail(email.value);
        const isPasswordValid = validatePassword(password.value);
        const isDOBValid = validateDateOfBirth(dateOfBirth.value);
        const isTermsValid = validateTerms();
        
        // Validate gender
        const isGenderValid = gender.value !== '';
        if (!isGenderValid) {
            const errorElement = document.getElementById('genderError');
            errorElement.textContent = 'Please select your gender';
            gender.closest('.form-group').classList.add('error');
        }
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPasswordValid && isDOBValid && isTermsValid && isGenderValid) {
            // Show success modal
            modal.style.display = 'flex';
            // Reset form
            form.reset();
            // Reset all success states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success');
            });
        }
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

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