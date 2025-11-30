/**
 * AISCR Global PMO - Visitor Analytics Tracking
 * 
 * Tracks visitor behavior to measure interest in the application
 * Includes both Google Analytics 4 and custom tracking
 */

// ============================================
// CONFIGURATION
// ============================================

// Google Analytics 4 Measurement ID
// Replace with your actual GA4 Measurement ID (format: G-XXXXXXXXXX)
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your GA4 ID

// Custom Analytics Endpoint (optional - for your own tracking)
const CUSTOM_ANALYTICS_ENDPOINT = null; // Set to your endpoint if you have one

// ============================================
// GOOGLE ANALYTICS 4 SETUP
// ============================================

function initializeGoogleAnalytics() {
    if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.log('Google Analytics: Not configured. Set GA4_MEASUREMENT_ID in analytics.js');
        return;
    }

    // Load Google Analytics 4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        'page_path': window.location.pathname,
        'send_page_view': true
    });

    // Make gtag globally available
    window.gtag = gtag;
    
    console.log('Google Analytics 4 initialized');
}

// ============================================
// CUSTOM ANALYTICS TRACKING
// ============================================

// Store analytics data locally (can be sent to your server later)
let analyticsData = {
    pageViews: [],
    events: [],
    sessions: [],
    startTime: Date.now()
};

// Track page view
function trackPageView(pageName, pagePath) {
    const pageView = {
        type: 'page_view',
        timestamp: new Date().toISOString(),
        pageName: pageName,
        pagePath: pagePath || window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language
    };

    analyticsData.pageViews.push(pageView);

    // Store in IndexedDB for live dashboard
    if (typeof storeAnalyticsEvent === 'function') {
        storeAnalyticsEvent(pageView).catch(err => {
            console.log('Analytics: Failed to store page view', err);
        });
    }

    // Send to Google Analytics if available
    if (window.gtag) {
        gtag('event', 'page_view', {
            page_title: pageName,
            page_location: window.location.href,
            page_path: pagePath
        });
    }

    // Log to console (for debugging)
    console.log('📊 Page View:', pageView);

    // Send to custom endpoint if configured
    sendToCustomEndpoint('page_view', pageView);
}

// Track custom event
function trackEvent(eventName, eventCategory, eventLabel, eventValue) {
    const event = {
        type: 'event',
        timestamp: new Date().toISOString(),
        eventName: eventName,
        eventCategory: eventCategory || 'general',
        eventLabel: eventLabel || '',
        eventValue: eventValue || null,
        pagePath: window.location.pathname
    };

    analyticsData.events.push(event);

    // Store in IndexedDB for live dashboard
    if (typeof storeAnalyticsEvent === 'function') {
        storeAnalyticsEvent(event).catch(err => {
            console.log('Analytics: Failed to store event', err);
        });
    }

    // Send to Google Analytics if available
    if (window.gtag) {
        gtag('event', eventName, {
            event_category: eventCategory,
            event_label: eventLabel,
            value: eventValue
        });
    }

    // Log to console (for debugging)
    console.log('📊 Event:', event);

    // Send to custom endpoint if configured
    sendToCustomEndpoint('event', event);
}

// Track button clicks (interest indicators)
function trackButtonClick(buttonName, buttonLocation) {
    trackEvent('button_click', 'engagement', buttonName, null);
    
    // Track specific interest buttons
    const interestButtons = [
        'Launch Web Application',
        'Download Excel System',
        'View Features',
        'Learn More',
        'Get Started',
        'Contact Us'
    ];
    
    if (interestButtons.some(btn => buttonName.includes(btn))) {
        trackEvent('high_interest_click', 'interest', buttonName, null);
    }
}

// Track scroll depth (engagement indicator)
let maxScrollDepth = 0;
function trackScrollDepth() {
    const scrollPercent = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );

    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track milestone scroll depths
        if (scrollPercent >= 25 && maxScrollDepth < 30) {
            trackEvent('scroll_depth', 'engagement', '25%', 25);
        } else if (scrollPercent >= 50 && maxScrollDepth < 55) {
            trackEvent('scroll_depth', 'engagement', '50%', 50);
        } else if (scrollPercent >= 75 && maxScrollDepth < 80) {
            trackEvent('scroll_depth', 'engagement', '75%', 75);
        } else if (scrollPercent >= 90) {
            trackEvent('scroll_depth', 'engagement', '90%', 90);
        }
    }
}

// Track time on page
let pageStartTime = Date.now();
function trackTimeOnPage() {
    setInterval(() => {
        const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000); // seconds
        
        // Track time milestones
        if (timeOnPage === 30) {
            trackEvent('time_on_page', 'engagement', '30 seconds', 30);
        } else if (timeOnPage === 60) {
            trackEvent('time_on_page', 'engagement', '1 minute', 60);
        } else if (timeOnPage === 120) {
            trackEvent('time_on_page', 'engagement', '2 minutes', 120);
        } else if (timeOnPage === 300) {
            trackEvent('time_on_page', 'engagement', '5 minutes', 300);
        }
    }, 1000);
}

// Track exit intent (when user tries to leave)
function trackExitIntent() {
    document.addEventListener('mouseout', (e) => {
        if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
            trackEvent('exit_intent', 'engagement', 'mouse_leave_top', null);
        }
    });

    // Track before unload
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
        trackEvent('page_exit', 'engagement', `time_on_page_${timeOnPage}s`, timeOnPage);
    });
}

// Track section views (which parts of landing page they view)
function trackSectionView(sectionName) {
    trackEvent('section_view', 'content', sectionName, null);
}

// Track form interactions (if any)
function trackFormInteraction(formName, action) {
    trackEvent('form_interaction', 'engagement', `${formName}_${action}`, null);
}

// Track download attempts
function trackDownload(fileName, fileType) {
    trackEvent('download', 'conversion', fileName, null);
    trackEvent('download_attempt', 'interest', fileType, null);
}

// Track blocked access attempts (shows interest)
function trackBlockedAccess(pageName, reason) {
    trackEvent('blocked_access', 'interest', `${pageName}_${reason}`, null);
    trackEvent('high_interest', 'interest', 'attempted_restricted_access', null);
}

// ============================================
// CUSTOM ENDPOINT (Optional)
// ============================================

function sendToCustomEndpoint(type, data) {
    if (!CUSTOM_ANALYTICS_ENDPOINT) return;

    try {
        fetch(CUSTOM_ANALYTICS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                data: data,
                timestamp: new Date().toISOString()
            })
        }).catch(err => {
            console.log('Analytics: Failed to send to custom endpoint', err);
        });
    } catch (err) {
        console.log('Analytics: Error sending to custom endpoint', err);
    }
}

// ============================================
// ANALYTICS DASHBOARD DATA (For Admin View)
// ============================================

function getAnalyticsSummary() {
    const sessionDuration = Math.round((Date.now() - analyticsData.startTime) / 1000);
    
    return {
        sessionStart: new Date(analyticsData.startTime).toISOString(),
        sessionDuration: sessionDuration,
        pageViews: analyticsData.pageViews.length,
        totalEvents: analyticsData.events.length,
        highInterestEvents: analyticsData.events.filter(e => 
            e.eventCategory === 'interest' || e.eventName.includes('interest')
        ).length,
        engagementEvents: analyticsData.events.filter(e => 
            e.eventCategory === 'engagement'
        ).length,
        pageViews: analyticsData.pageViews,
        events: analyticsData.events
    };
}

// Export analytics data (for admin to download)
function exportAnalyticsData() {
    const summary = getAnalyticsSummary();
    const dataStr = JSON.stringify(summary, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// ============================================
// INITIALIZATION
// ============================================

function initializeAnalytics() {
    // Initialize Google Analytics
    initializeGoogleAnalytics();

    // Track initial page view
    const pageName = document.title || 'Unknown Page';
    trackPageView(pageName);

    // Set up scroll tracking
    window.addEventListener('scroll', trackScrollDepth);

    // Set up time tracking
    trackTimeOnPage();

    // Set up exit intent tracking
    trackExitIntent();

    // Auto-track all button clicks
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button, a.btn, .btn, [role="button"]');
        if (button) {
            const buttonText = button.textContent.trim() || button.getAttribute('aria-label') || 'Unknown Button';
            const buttonId = button.id || button.className || 'no-id';
            trackButtonClick(buttonText, buttonId);
        }
    });

    // Track section views (for landing page)
    if (document.querySelector('.hero, .features, .about, .cta')) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.className || entry.target.id || 'section';
                    trackSectionView(sectionName);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section, .section, [data-section]').forEach(section => {
            observer.observe(section);
        });
    }

    console.log('✅ Analytics initialized');
}

// Suppress browser extension errors (harmless - these are from Chrome extensions, not our code)
window.addEventListener('error', (event) => {
    if (event.message && event.message.includes('message channel')) {
        event.preventDefault();
        return false;
    }
}, true);

window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes('message channel')) {
        event.preventDefault();
        return false;
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics);
} else {
    initializeAnalytics();
}

// Make functions globally available
window.trackEvent = trackEvent;
window.trackPageView = trackPageView;
window.trackButtonClick = trackButtonClick;
window.trackDownload = trackDownload;
window.trackBlockedAccess = trackBlockedAccess;
window.getAnalyticsSummary = getAnalyticsSummary;
window.exportAnalyticsData = exportAnalyticsData;

