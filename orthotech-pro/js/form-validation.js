// Form Validation with Security
// Comprehensive client-side validation

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(el => {
                el.style.display = 'none';
            });
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validation
            let isValid = true;
            
            // Name validation
            if (formData.name.length < 2) {
                showError('name-error', 'Please enter your full name');
                isValid = false;
            }
            
            // Email validation
            if (!validateEmail(formData.email)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (!validatePhone(formData.phone)) {
                showError('phone-error', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Service validation
            if (!formData.service) {
                showError('service-error', 'Please select a service');
                isValid = false;
            }
            
            // Message validation
            if (formData.message.length < 10) {
                showError('message-error', 'Please provide more details (minimum 10 characters)');
                isValid = false;
            }
            
            // Rate limiting check
            if (!rateLimiter.isAllowed('contact-form', 3, 300000)) { // 3 attempts per 5 minutes
                alert('Too many submission attempts. Please wait a few minutes before trying again.');
                return;
            }
            
            if (isValid) {
                // Sanitize inputs
                Object.keys(formData).forEach(key => {
                    formData[key] = sanitizeInput(formData[key]);
                });
                
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call (replace with actual endpoint)
                setTimeout(() => {
                    // Show success message
                    document.getElementById('form-success').style.display = 'block';
                    contactForm.reset();
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Log for development
                    console.log('Form submitted:', formData);
                    
                    // Scroll to success message
                    document.getElementById('form-success').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 1500);
            }
        });
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Real-time validation feedback
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showError('email-error', 'Please enter a valid email address');
            }
        });
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                showError('phone-error', 'Please enter a valid phone number');
            }
        });
    }
});