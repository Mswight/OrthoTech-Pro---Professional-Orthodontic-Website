// OrthoTech Pro - Main JavaScript
// Author: IT Major with Cybersecurity Minor
// Last Updated: 2025

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animated counters for statistics
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.floor(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Trigger counters when in viewport
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseFloat(entry.target.dataset.target);
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.fade-in-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });

    // Form validation helper
    window.validateEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    window.validatePhone = function(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    };

    // Console easter egg for recruiters
    console.log('%c🦷 OrthoTech Pro', 'color: #0066ff; font-size: 24px; font-weight: bold;');
    console.log('%cBuilt with:', 'color: #00d4ff; font-size: 16px;');
    console.log('- HTML5 (Semantic markup)');
    console.log('- CSS3 (Grid, Flexbox, Custom Properties)');
    console.log('- JavaScript ES6+ (Modules, Async/Await)');
    console.log('- Security: CSP, Input Validation, XSS Prevention');
    console.log('- Performance: Lazy Loading, Code Splitting');
    console.log('\n%cDeveloped by an IT Major with Cybersecurity Minor', 'color: #6c5ce7; font-style: italic;');
});