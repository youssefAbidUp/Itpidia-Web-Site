/**
 * ITPidia Website JavaScript
 * Handles mobile navigation, smooth scrolling, form validation, and animations
 */

/* ===== DOM Content Loaded Event ===== */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init('PWdMc6VhouKY7jc_w');
    
    // Initialize all functionality when DOM is ready
    initMobileNavigation();
    initSmoothScrolling();
    initFormValidation();
    initScrollAnimations();
    initHeroAnimation();
    initThemeToggle();
});

/* ===== Mobile Navigation Toggle ===== */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu when hamburger is clicked
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        // Toggle aria-expanded attribute for accessibility
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle menu visibility
        navMenu.classList.toggle('nav__menu--open');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
    
    // Close menu when navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('nav__menu--open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('nav__menu--open')) {
            navMenu.classList.remove('nav__menu--open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize - close mobile menu and reset styles
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            navMenu.classList.remove('nav__menu--open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

/* ===== Theme Toggle (Light/Dark Mode) ===== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button state
    updateThemeToggleIcon(savedTheme);
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button icon
        updateThemeToggleIcon(newTheme);
        
        // Add smooth transition effect
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
}

function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const sunIcon = themeToggle.querySelector('.theme-toggle__icon--sun');
    const moonIcon = themeToggle.querySelector('.theme-toggle__icon--moon');
    
    // The CSS handles the visibility - just update aria-label for accessibility
    if (theme === 'dark') {
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

/* ===== Smooth Scrolling for Internal Links ===== */
function initSmoothScrolling() {
    // Select all links that point to sections on the same page
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Don't scroll if href is just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                // Calculate offset to account for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra spacing
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
                
                // Focus the target element for accessibility
                targetElement.focus();
                targetElement.setAttribute('tabindex', '-1');
            }
        });
    });
}

/* ===== Contact Form Validation ===== */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    // Real-time validation as user types
    if (nameField) {
        nameField.addEventListener('blur', () => validateName(nameField));
        nameField.addEventListener('input', () => clearError(nameField));
    }
    
    if (emailField) {
        emailField.addEventListener('blur', () => validateEmail(emailField));
        emailField.addEventListener('input', () => clearError(emailField));
    }
    
    if (messageField) {
        messageField.addEventListener('blur', () => validateMessage(messageField));
        messageField.addEventListener('input', () => clearError(messageField));
    }
    
    // Form submission handling
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isNameValid = validateName(nameField);
        const isEmailValid = validateEmail(emailField);
        const isMessageValid = validateMessage(messageField);
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // All validation passed - handle form submission
            handleFormSubmission(form);
        } else {
            // Focus first invalid field
            const firstInvalidField = form.querySelector('.form__input--error, .form__textarea--error');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });
}

/* ===== Form Validation Helper Functions ===== */
function validateName(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById('name-error');
    
    if (value === '') {
        showError(field, errorElement, 'Name is required');
        return false;
    }
    
    if (value.length < 2) {
        showError(field, errorElement, 'Name must be at least 2 characters');
        return false;
    }
    
    clearError(field, errorElement);
    return true;
}

function validateEmail(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById('email-error');
    
    if (value === '') {
        showError(field, errorElement, 'Email is required');
        return false;
    }
    
    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(value)) {
        showError(field, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    clearError(field, errorElement);
    return true;
}

function validateMessage(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById('message-error');
    
    if (value === '') {
        showError(field, errorElement, 'Message is required');
        return false;
    }
    
    if (value.length < 10) {
        showError(field, errorElement, 'Message must be at least 10 characters');
        return false;
    }
    
    clearError(field, errorElement);
    return true;
}

function showError(field, errorElement, message) {
    field.classList.add('form__input--error', 'form__textarea--error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.setAttribute('aria-live', 'polite');
    }
}

function clearError(field, errorElement) {
    field.classList.remove('form__input--error', 'form__textarea--error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.removeAttribute('aria-live');
    }
}

/* ===== Form Submission Handler ===== */
function handleFormSubmission(form) {
    const submitButton = form.querySelector('.form__submit');
    
    // Disable submit button during processing
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Collect form data for EmailJS template
    const now = new Date();
    const templateParams = {
        to_email: 'youssef.abidup@gmail.com',
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        message: form.querySelector('#message').value.trim(),
        time: now.toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        })
    };
    
    // Send email via EmailJS
    emailjs.send('service_082wrcg', 'template_aelbg9n', templateParams)
        .then(function() {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        })
        .catch(function(error) {
            console.error('EmailJS Error:', error);
            showErrorMessage('Failed to send message. Please try again or email us directly at contact@itpidia.com');
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
}

function showSuccessMessage() {
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'notification notification--success';
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">✓</span>
            <span class="notification__text">Thank you! Your message has been sent. We'll get back to you soon.</span>
            <button class="notification__close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Handle close button
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'notification notification--error';
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">✕</span>
            <span class="notification__text">${message}</span>
            <button class="notification__close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ef4444;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 7000);
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.25rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0.25rem;
        }
    `;
    document.head.appendChild(style);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .value-card, .founder, .about__stats');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/* ===== Hero Animation ===== */
function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero__title');
    
    if (!heroTitle) return;
    
    // Add typewriter effect to hero title
    const titleMain = heroTitle.querySelector('.hero__title-main');
    const titleSub = heroTitle.querySelector('.hero__title-sub');
    
    if (titleMain && titleSub) {
        // Initially hide sub-title
        titleSub.style.opacity = '0';
        titleSub.style.transform = 'translateY(20px)';
        
        // Animate sub-title after main title
        setTimeout(() => {
            titleSub.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            titleSub.style.opacity = '1';
            titleSub.style.transform = 'translateY(0)';
        }, 500);
    }
}

/* ===== Header Scroll Effect ===== */
// Add scroll effect to header shadow only (respects theme)
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

/* ===== Utility Functions ===== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/* ===== Accessibility Improvements ===== */

// Handle keyboard navigation for mobile menu
document.addEventListener('keydown', function(event) {
    const navMenu = document.querySelector('.nav__menu');
    const navToggle = document.querySelector('.nav__toggle');
    
    // Close mobile menu on Escape key
    if (event.key === 'Escape' && navMenu && navMenu.classList.contains('nav__menu--open')) {
        navMenu.classList.remove('nav__menu--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
    }
});

// Focus management for modal-like mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/* ===== Error Handling ===== */

// Global error handler for graceful degradation
window.addEventListener('error', function(event) {
    console.warn('JavaScript error detected, but site functionality should continue to work:', event.error);
});

// Handle cases where JavaScript fails to load
document.addEventListener('DOMContentLoaded', function() {
    // Add a class to indicate JavaScript is working
    document.documentElement.classList.add('js-loaded');
});

/* ===== Performance Optimization ===== */

// Lazy load images when they come into view
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);