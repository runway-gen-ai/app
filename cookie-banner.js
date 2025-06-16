// Cookie Banner Management System
class CookieBanner {
    constructor() {
        this.cookieConsent = this.getCookieConsent();
        this.init();
    }

    init() {
        // Only show banner if no consent has been given
        if (!this.cookieConsent.hasConsent) {
            this.createBanner();
            this.showBanner();
        }
        
        // Apply current cookie settings
        this.applyCookieSettings();
    }

    getCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            try {
                return JSON.parse(consent);
            } catch (e) {
                console.error('Error parsing cookie consent:', e);
            }
        }
        
        return {
            hasConsent: false,
            essential: true, // Always true, cannot be disabled
            functional: false,
            analytics: false,
            marketing: false,
            timestamp: null
        };
    }

    setCookieConsent(consent) {
        const consentData = {
            ...consent,
            hasConsent: true,
            essential: true, // Always true
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        this.cookieConsent = consentData;
        this.applyCookieSettings();
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie Consent');
        banner.setAttribute('aria-describedby', 'cookie-banner-description');
        
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h3>We Value Your Privacy</h3>
                    <p id="cookie-banner-description">
                        We use cookies to enhance your experience, analyze site usage, and assist in marketing. 
                        You can customize your preferences or learn more in our 
                        <a href="cookie-policy.html" target="_blank" rel="noopener">Cookie Policy</a>.
                    </p>
                </div>
                <div class="cookie-banner-actions">
                    <button class="cookie-btn cookie-btn-accept" onclick="cookieBanner.acceptAll()" aria-label="Accept all cookies">
                        Accept All
                    </button>
                    <button class="cookie-btn cookie-btn-reject" onclick="cookieBanner.rejectAll()" aria-label="Reject non-essential cookies">
                        Reject All
                    </button>
                    <button class="cookie-btn cookie-btn-customize" onclick="cookieBanner.showCustomizer()" aria-label="Customize cookie preferences">
                        Customize
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        this.createCustomizer();
    }

    createCustomizer() {
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.id = 'cookieModal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'cookie-modal-title');
        
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h3 id="cookie-modal-title">Cookie Preferences</h3>
                    <p>Manage your cookie preferences below. Essential cookies cannot be disabled as they are necessary for the website to function properly.</p>
                </div>
                <div class="cookie-modal-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4 class="cookie-category-title">Essential Cookies</h4>
                            <label class="cookie-toggle disabled">
                                <input type="checkbox" checked disabled aria-label="Essential cookies (always enabled)">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-category-description">
                            These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services.
                        </p>
                        <p class="cookie-category-details">
                            Examples: Authentication, security, load balancing, session management
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4 class="cookie-category-title">Functional Cookies</h4>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="functionalCookies" aria-label="Enable functional cookies">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-category-description">
                            These cookies enable enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.
                        </p>
                        <p class="cookie-category-details">
                            Examples: Language preferences, theme settings, user interface customizations, video player settings
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4 class="cookie-category-title">Analytics Cookies</h4>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analyticsCookies" aria-label="Enable analytics cookies">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-category-description">
                            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website performance.
                        </p>
                        <p class="cookie-category-details">
                            Examples: Google Analytics, page views, user behavior tracking, performance monitoring
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4 class="cookie-category-title">Marketing Cookies</h4>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketingCookies" aria-label="Enable marketing cookies">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-category-description">
                            These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement.
                        </p>
                        <p class="cookie-category-details">
                            Examples: Targeted advertising, retargeting, social media integration, conversion tracking
                        </p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button class="cookie-btn cookie-btn-reject" onclick="cookieBanner.rejectAll()" aria-label="Reject all non-essential cookies">
                        Reject All
                    </button>
                    <button class="cookie-btn cookie-btn-accept" onclick="cookieBanner.savePreferences()" aria-label="Save cookie preferences">
                        Save Preferences
                    </button>
                    <button class="cookie-btn cookie-btn-accept" onclick="cookieBanner.acceptAll()" aria-label="Accept all cookies">
                        Accept All
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideCustomizer();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.hideCustomizer();
            }
        });
    }

    showBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            // Small delay to ensure smooth animation
            setTimeout(() => {
                banner.classList.add('show');
                banner.classList.add('animate');
            }, 100);
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                if (banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, 300);
        }
    }

    showCustomizer() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            // Set current preferences
            document.getElementById('functionalCookies').checked = this.cookieConsent.functional;
            document.getElementById('analyticsCookies').checked = this.cookieConsent.analytics;
            document.getElementById('marketingCookies').checked = this.cookieConsent.marketing;
            
            modal.classList.add('show');
            
            // Focus management for accessibility
            const firstFocusable = modal.querySelector('input, button');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    hideCustomizer() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    acceptAll() {
        this.setCookieConsent({
            functional: true,
            analytics: true,
            marketing: true
        });
        
        this.hideBanner();
        this.hideCustomizer();
        
        // Track acceptance
        this.trackEvent('Cookie Consent', 'Accept All');
        
        // Show confirmation (optional)
        this.showNotification('All cookies accepted. Thank you!');
    }

    rejectAll() {
        this.setCookieConsent({
            functional: false,
            analytics: false,
            marketing: false
        });
        
        this.hideBanner();
        this.hideCustomizer();
        
        // Track rejection
        this.trackEvent('Cookie Consent', 'Reject All');
        
        // Show confirmation (optional)
        this.showNotification('Only essential cookies will be used.');
    }

    savePreferences() {
        const functional = document.getElementById('functionalCookies').checked;
        const analytics = document.getElementById('analyticsCookies').checked;
        const marketing = document.getElementById('marketingCookies').checked;
        
        this.setCookieConsent({
            functional: functional,
            analytics: analytics,
            marketing: marketing
        });
        
        this.hideBanner();
        this.hideCustomizer();
        
        // Track custom preferences
        this.trackEvent('Cookie Consent', 'Custom Preferences', {
            functional: functional,
            analytics: analytics,
            marketing: marketing
        });
        
        // Show confirmation
        this.showNotification('Your cookie preferences have been saved.');
    }

    applyCookieSettings() {
        // Apply functional cookies
        if (this.cookieConsent.functional) {
            this.enableFunctionalCookies();
        } else {
            this.disableFunctionalCookies();
        }
        
        // Apply analytics cookies
        if (this.cookieConsent.analytics) {
            this.enableAnalyticsCookies();
        } else {
            this.disableAnalyticsCookies();
        }
        
        // Apply marketing cookies
        if (this.cookieConsent.marketing) {
            this.enableMarketingCookies();
        } else {
            this.disableMarketingCookies();
        }
    }

    enableFunctionalCookies() {
        // Enable functional features like theme preferences, language settings, etc.
        console.log('Functional cookies enabled');
        
        // Example: Enable theme persistence
        document.body.classList.add('functional-cookies-enabled');
    }

    disableFunctionalCookies() {
        // Disable functional features
        console.log('Functional cookies disabled');
        
        // Remove functional cookie data
        this.removeCookiesByCategory('functional');
        document.body.classList.remove('functional-cookies-enabled');
    }

    enableAnalyticsCookies() {
        // Enable analytics tracking (Google Analytics, etc.)
        console.log('Analytics cookies enabled');
        
        // Example: Initialize Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
        
        document.body.classList.add('analytics-cookies-enabled');
    }

    disableAnalyticsCookies() {
        // Disable analytics tracking
        console.log('Analytics cookies disabled');
        
        // Example: Disable Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
        
        // Remove analytics cookies
        this.removeCookiesByCategory('analytics');
        document.body.classList.remove('analytics-cookies-enabled');
    }

    enableMarketingCookies() {
        // Enable marketing and advertising cookies
        console.log('Marketing cookies enabled');
        
        // Example: Enable advertising features
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
        
        document.body.classList.add('marketing-cookies-enabled');
    }

    disableMarketingCookies() {
        // Disable marketing and advertising cookies
        console.log('Marketing cookies disabled');
        
        // Example: Disable advertising features
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
        
        // Remove marketing cookies
        this.removeCookiesByCategory('marketing');
        document.body.classList.remove('marketing-cookies-enabled');
    }

    removeCookiesByCategory(category) {
        // Remove cookies based on category
        const cookies = document.cookie.split(';');
        
        cookies.forEach(cookie => {
            const [name] = cookie.split('=');
            const cookieName = name.trim();
            
            // Define cookie patterns for each category
            const patterns = {
                functional: ['theme', 'lang', 'ui_', 'pref_'],
                analytics: ['_ga', '_gid', '_gat', 'analytics', '_utm'],
                marketing: ['_fbp', '_fbc', 'ads', 'marketing', 'retargeting']
            };
            
            if (patterns[category]) {
                patterns[category].forEach(pattern => {
                    if (cookieName.includes(pattern)) {
                        // Remove cookie
                        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
                        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
                    }
                });
            }
        });
    }

    trackEvent(category, action, data = null) {
        // Only track if analytics cookies are enabled
        if (this.cookieConsent.analytics && typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                custom_data: data
            });
        }
        
        // Console log for debugging
        console.log(`Event tracked: ${category} - ${action}`, data);
    }

    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1002;
            font-size: 14px;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Method to reset consent (for testing or user request)
    resetConsent() {
        localStorage.removeItem('cookieConsent');
        this.cookieConsent = this.getCookieConsent();
        location.reload();
    }

    // Method to get current consent status (for external use)
    getConsentStatus() {
        return this.cookieConsent;
    }
}

// Initialize cookie banner when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cookieBanner = new CookieBanner();
});

// Expose methods globally for button onclick handlers
window.cookieBanner = window.cookieBanner || {};