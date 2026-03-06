// Main JavaScript File
// Initialize all modules when DOM is ready

document.addEventListener('DOMContentLoaded', () => {
    console.log('iFlow CLI - Initializing...');
    
    // Initialize Intersection Observer for scroll animations
    initScrollAnimations();
    
    // Initialize scroll indicator
    initScrollIndicator();
    
    console.log('iFlow CLI - Initialized successfully');
});

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Add stagger animation to children if they exist
                const children = entry.target.querySelectorAll('.card, .tool-icon');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                });
            }
        });
    }, observerOptions);
    
    // Observe all fade-in sections
    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollDownBtn = document.getElementById('scrollDownBtn');
    
    if (!scrollIndicator || !scrollDownBtn) return;
    
    // Hide scroll indicator after scrolling down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });
    
    // Scroll to next section on click
    scrollDownBtn.addEventListener('click', () => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            window.scrollTo({
                top: heroHeight,
                behavior: 'smooth'
            });
        }
    });
}

// Utility function: Debounce
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

// Utility function: Throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Utility function: Get element by selector with error handling
function getElement(selector, context = document) {
    const element = context.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
    return element;
}

// Utility function: Get elements by selector
function getElements(selector, context = document) {
    const elements = context.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn(`No elements found: ${selector}`);
        return [];
    }
    return Array.from(elements);
}

// Export utility functions for other modules
window.iFlowUtils = {
    debounce,
    throttle,
    getElement,
    getElements
};