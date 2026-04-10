// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // jQuery Validate initialization
        if (typeof $.fn.validate !== 'undefined') {
            $(contactForm).validate({
                rules: {
                    firstName: {
                        required: true,
                        minlength: 2
                    },
                    lastName: {
                        required: true,
                        minlength: 2
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    subject: {
                        required: true
                    },
                    message: {
                        required: true,
                        minlength: 10
                    }
                },
                messages: {
                    firstName: {
                        required: "Please enter your first name",
                        minlength: "First name must be at least 2 characters"
                    },
                    lastName: {
                        required: "Please enter your last name",
                        minlength: "Last name must be at least 2 characters"
                    },
                    email: {
                        required: "Please enter your email address",
                        email: "Please enter a valid email address"
                    },
                    subject: {
                        required: "Please select a subject"
                    },
                    message: {
                        required: "Please enter your message",
                        minlength: "Message must be at least 10 characters"
                    }
                },
                errorElement: 'div',
                errorClass: 'invalid-feedback',
                highlight: function(element) {
                    $(element).addClass('is-invalid').removeClass('is-valid');
                },
                unhighlight: function(element) {
                    $(element).removeClass('is-invalid').addClass('is-valid');
                },
                submitHandler: function(form) {
                    handleFormSubmit(form);
                }
            });
        } else {
            // Fallback to native validation
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (contactForm.checkValidity()) {
                    handleFormSubmit(contactForm);
                } else {
                    contactForm.classList.add('was-validated');
                }
            });
        }
    }
});

function handleFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success
        submitButton.innerHTML = '<i class="fas fa-check me-2"></i> Message Sent!';
        submitButton.classList.remove('btn-primary');
        submitButton.classList.add('btn-success');
        
        // Show success notification
        showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            form.classList.remove('was-validated');
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-primary');
        }, 3000);
        
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification-popup`;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} fa-2x me-3"></i>
            <div>${message}</div>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 350px;
        max-width: 500px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);