/* ========================================
   AI Data Visualization Tutorial - Main JS
   ======================================== */

// Initialize Reveal.js
document.addEventListener('DOMContentLoaded', function() {
    Reveal.initialize({
        // Presentation settings
        hash: true,
        history: true,
        center: false,
        
        // Slide dimensions - use full viewport
        width: '100%',
        height: '100%',
        margin: 0,
        minScale: 1,
        maxScale: 1,
        
        // Transition effects
        transition: 'slide',
        transitionSpeed: 'default',
        backgroundTransition: 'fade',
        
        // Navigation
        controls: true,
        controlsTutorial: true,
        controlsLayout: 'bottom-right',
        controlsBackArrows: 'faded',
        
        // Progress bar
        progress: true,
        
        // Slide number
        slideNumber: false,
        
        // Keyboard navigation
        keyboard: true,
        
        // Touch navigation
        touch: true,
        
        // Loop presentation
        loop: false,
        
        // Embedded mode
        embedded: false,
        
        // Auto-slide (disabled - user controls navigation)
        autoSlide: 0,
        
        // Pause on hover
        autoSlideStoppable: true,
        
        // View distance (preload)
        viewDistance: 3,
        
        // Mobile view distance
        mobileViewDistance: 2
    });
    
    // Add entrance animation to cards
    addCardAnimations();
});

/**
 * Navigate to a specific slide by ID
 * @param {string} slideId - The ID of the target slide
 */
function navigateTo(slideId) {
    const slideElement = document.getElementById(slideId);
    if (slideElement) {
        const slideIndex = Reveal.getIndices(slideElement);
        Reveal.slide(slideIndex.h, slideIndex.v);
    }
}

/**
 * Add entrance animations to choice cards
 */
function addCardAnimations() {
    const cards = document.querySelectorAll('.choice-card');
    
    // Add staggered animation on page load
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
    
    // Add ripple effect on click
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

/**
 * Create ripple effect on card click
 * @param {Event} e - Click event
 * @param {Element} element - Target element
 */
function createRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out forwards;
        pointer-events: none;
    `;
    
    // Add ripple animation keyframes if not exists
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Utility: Add smooth scroll behavior
 */
function smoothNavigate(direction) {
    if (direction === 'next') {
        Reveal.next();
    } else if (direction === 'prev') {
        Reveal.prev();
    }
}

// Expose functions to global scope for HTML onclick handlers
window.navigateTo = navigateTo;
window.smoothNavigate = smoothNavigate;
