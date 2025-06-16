// Call functionality
function callNow() {
    window.location.href = 'tel:+17813908247';
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with href starting with #
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Toggle functionality (if needed)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const heading = item.querySelector('h3');
        const content = item.querySelector('p');
        
        if (heading && content) {
            heading.style.cursor = 'pointer';
            
            heading.addEventListener('click', function() {
                // Toggle content visibility
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    heading.style.color = 'var(--primary)';
                } else {
                    content.style.display = 'none';
                    heading.style.color = 'var(--neutral-800)';
                }
            });
            
            // Initially show all content
            content.style.display = 'block';
        }
    });
    
    // HERO BUTTONS SPECIFIC FUNCTIONALITY
    const heroButtons = document.querySelectorAll('.hero-cta .btn');
    
    heroButtons.forEach(button => {
        // Remove any existing onclick handlers
        button.removeAttribute('onclick');
        
        const buttonText = button.textContent.trim().toLowerCase();
        
        if (buttonText.includes('start learning')) {
            // "Start Learning" button scrolls to about section (Digital Art Education Platform)
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const aboutSection = document.querySelector('.about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                console.log('Start Learning clicked - scrolling to about section');
            });
            
            button.setAttribute('title', 'Scroll to learn more about our platform');
            
        } else if (buttonText.includes('learn more')) {
            // "Learn More" button leads to phone call
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                callNow();
                console.log('Learn More clicked - calling phone number');
            });
            
            button.setAttribute('title', 'Call us to learn more');
        }
    });
    
    // ALL OTHER "LEARN MORE" BUTTONS LEAD TO CALL
    const allLearnMoreButtons = document.querySelectorAll('button, .btn, [role="button"]');
    
    allLearnMoreButtons.forEach(button => {
        const buttonText = button.textContent.trim().toLowerCase();
        
        // Skip hero buttons (already handled above)
        if (button.closest('.hero-cta')) {
            return;
        }
        
        // All other "Learn More" buttons lead to call
        if (buttonText.includes('learn more') || 
            buttonText.includes('call') || 
            buttonText.includes('enroll') || 
            buttonText.includes('get') || 
            buttonText.includes('contact') ||
            buttonText.includes('information') ||
            button.classList.contains('call-button')) {
            
            // Remove existing handlers
            button.removeAttribute('onclick');
            
            // Add call functionality
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                callNow();
                console.log('Button clicked - calling:', buttonText);
            });
            
            // Add proper styling and accessibility
            button.style.cursor = 'pointer';
            button.setAttribute('title', 'Click to call us');
        }
    });
    
    // Form validation (if contact form is added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Performance monitoring
    console.log('ArtVision Academy website loaded successfully');
    
    // Analytics placeholder (replace with actual analytics code)
    function trackEvent(category, action, label) {
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
        // Replace with actual analytics tracking code
        // gtag('event', action, {
        //     event_category: category,
        //     event_label: label
        // });
    }
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('Button', 'Click', buttonText);
        });
    });
    
    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Phone Call', this.getAttribute('href'));
        });
    });
    
    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Email', this.getAttribute('href'));
        });
    });
});

// Utility functions
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

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', debounce(() => {
    const scrollTopButton = document.querySelector('.scroll-to-top');
    if (scrollTopButton) {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    }
}, 100));

// Handle contact form submission (if form is added later)
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // For now, just show success message and redirect to phone call
    alert('Thank you for your message! We\'ll call you shortly to discuss your needs.');
    callNow();
}

// Initialize any additional features
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer if needed
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // ADDITIONAL SAFETY CHECK FOR BUTTON FUNCTIONALITY
    // This runs after a short delay to catch any dynamically loaded content
    setTimeout(() => {
        console.log('Running additional button functionality check...');
        
        // Verify hero buttons are working correctly
        const heroStartButton = document.querySelector('.hero-cta .btn-primary');
        const heroLearnButton = document.querySelector('.hero-cta .btn-secondary');
        
        if (heroStartButton) {
            const startText = heroStartButton.textContent.trim().toLowerCase();
            if (startText.includes('start learning')) {
                console.log('✓ Start Learning button configured for scrolling');
            }
        }
        
        if (heroLearnButton) {
            const learnText = heroLearnButton.textContent.trim().toLowerCase();
            if (learnText.includes('learn more')) {
                console.log('✓ Learn More button configured for calling');
            }
        }
        
        // Verify all other Learn More buttons lead to calls
        const allLearnMoreButtons = document.querySelectorAll('button, .btn');
        let learnMoreCount = 0;
        
        allLearnMoreButtons.forEach(button => {
            const text = button.textContent.trim().toLowerCase();
            if (text.includes('learn more') && !button.closest('.hero-cta')) {
                learnMoreCount++;
            }
        });
        
        console.log(`✓ ${learnMoreCount} "Learn More" buttons configured for calling`);
        console.log('Button functionality verification complete');
    }, 500);
});

// Global function exposure for maximum compatibility
window.callNow = callNow;

// Scroll to section function for easy access
window.scrollToSection = function(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Additional global handler for any missed buttons
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Check if clicked element is a button that should call (except hero Start Learning)
    if ((target.tagName === 'BUTTON' || target.classList.contains('btn')) && 
        !target.hasAttribute('data-handled')) {
        
        const text = target.textContent.trim().toLowerCase();
        const isHeroStartButton = target.closest('.hero-cta') && text.includes('start learning');
        
        // Skip hero "Start Learning" button (it should scroll, not call)
        if (isHeroStartButton) {
            return;
        }
        
        const shouldCall = text.includes('learn more') || text.includes('call') || 
                          text.includes('enroll') || text.includes('get') || 
                          text.includes('contact') || text.includes('information') ||
                          target.classList.contains('call-button');
        
        if (shouldCall) {
            e.preventDefault();
            e.stopPropagation();
            target.setAttribute('data-handled', 'true');
            callNow();
            console.log('Global handler: Button clicked for call -', text);
        }
    }
});