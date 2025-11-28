// Environment Detection and Demo Mode
// Detects if running in production (live site) vs local development

(function() {
    'use strict';
    
    // Detect environment
    const isProduction = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.hostname.startsWith('192.168.') &&
                        !window.location.hostname.startsWith('10.') &&
                        window.location.hostname !== '';
    
    // Demo mode configuration
    const DEMO_MODE = {
        enabled: isProduction,
        message: "🔒 DEMO MODE - This is a demonstration version with limited functionality. Full features available in development.",
        limitedFeatures: true,
        readOnly: true, // Disable create/edit/delete in demo mode
        maxItems: 5, // Limit number of items displayed
        showWatermark: true
    };
    
    // Export to window
    window.ENV = {
        isProduction: isProduction,
        isLocal: !isProduction,
        demoMode: DEMO_MODE.enabled,
        config: DEMO_MODE
    };
    
    // Show demo notice if in production
    if (DEMO_MODE.enabled) {
        console.log('%c🔒 DEMO MODE ACTIVE', 'color: #FF6B6B; font-size: 16px; font-weight: bold;');
        console.log('%cThis is a demonstration version. Full features are disabled for security.', 'color: #666; font-size: 12px;');
        
        // Add demo banner to page
        const demoBanner = document.createElement('div');
        demoBanner.id = 'demo-banner';
        demoBanner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
            color: white;
            padding: 12px 20px;
            text-align: center;
            font-weight: bold;
            z-index: 10001;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            font-size: 0.9em;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        `;
        demoBanner.innerHTML = `
            <i class="fas fa-shield-alt"></i>
            <span>DEMO MODE - Limited functionality for security. This is a demonstration version.</span>
            <button onclick="this.parentElement.style.display='none'" 
                    style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                <i class="fas fa-times"></i>
            </button>
        `;
        document.body.insertBefore(demoBanner, document.body.firstChild);
        
        // Adjust body padding to account for banner
        document.body.style.paddingTop = '50px';
    }
})();

