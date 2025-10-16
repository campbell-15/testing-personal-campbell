/**
 * B10 Website - Modern Interactive JavaScript
 * Inspired by Rosa Hotels design with B10 Char branding
 */

class B10Website {
    constructor() {
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupCounters();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.setupParticleSystem();
        this.setupFormHandling();
        this.setupBackToTop();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
    }

    // ===== PRELOADER =====
    setupPreloader() {
        const preloader = document.getElementById('preloader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1500); // Match the loading animation duration
        });
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        let lastScrollY = window.scrollY;

        // Navbar scroll effect
        window.addEventListener('scroll', this.throttle(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        }, 100));

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', this.throttle(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 100));

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== MOBILE MENU =====
    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    // ===== SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        const scrollButtons = document.querySelectorAll('[data-scroll-to]');
        
        scrollButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('data-scroll-to');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .text-block, .goal-item, .stat-item, .feature-item, .contact-item, .gallery-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }

    // ===== COUNTER ANIMATIONS =====
    setupCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + (target > 1 ? '+' : '');
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // ===== PARALLAX EFFECTS =====
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-particles, .biochar-visual, .carbon-molecule');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 16)); // 60fps
    }

    // ===== PARTICLE SYSTEM =====
    setupParticleSystem() {
        const particleContainer = document.querySelector('.hero-particles');
        if (!particleContainer) return;

        // Create additional floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(0, 255, 136, 0.6)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 4 + 3}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.pointerEvents = 'none';
            
            particleContainer.appendChild(particle);
        }

        // Add CSS for floating particles
        const style = document.createElement('style');
        style.textContent = `
            .floating-particle {
                animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg); 
                    opacity: 0.3; 
                }
                50% { 
                    transform: translateY(-30px) rotate(180deg); 
                    opacity: 0.8; 
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== FORM HANDLING =====
    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Basic validation
                if (!name || !email || !message) {
                    this.showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                if (!this.isValidEmail(email)) {
                    this.showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                // Simulate form submission
                this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#333'};
            color: ${type === 'success' || type === 'error' ? '#000' : '#fff'};
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // ===== BACK TO TOP BUTTON =====
    setupBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');
        
        if (backToTopButton) {
            window.addEventListener('scroll', this.throttle(() => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            }, 100));

            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    setupPerformanceOptimizations() {
        // Lazy load images when they come into view
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    // ===== UTILITY FUNCTIONS =====
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
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
}

// ===== ADDITIONAL FEATURES =====

// Cursor trail effect (desktop only)
class CursorTrail {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-trail';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 255, 136, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;
        document.body.appendChild(this.cursor);

        this.init();
    }

    init() {
        if (window.innerWidth > 768) {
            this.cursor.style.display = 'block';
            document.addEventListener('mousemove', this.throttle((e) => {
                this.cursor.style.left = e.clientX - 10 + 'px';
                this.cursor.style.top = e.clientY - 10 + 'px';
            }, 16));
        }
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main website functionality
    new B10Website();
    
    // Initialize cursor trail (desktop only)
    if (window.innerWidth > 768) {
        new CursorTrail();
    }
});

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Reinitialize cursor trail on resize
    const existingCursor = document.querySelector('.cursor-trail');
    if (existingCursor) {
        existingCursor.remove();
    }
    
    if (window.innerWidth > 768) {
        new CursorTrail();
    }
}, 250));

// ===== SCROLL PERFORMANCE OPTIMIZATION =====
let ticking = false;

function updateScrollEffects() {
    // This function will be called on scroll
    // Add any scroll-based effects here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====

// Skip link functionality
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey && document.activeElement === document.body) {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.focus();
        }
    }
});

// Focus management for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            navToggle.focus();
        }
    }
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// ===== SERVICE WORKER REGISTRATION (for future PWA features) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = B10Website;
}