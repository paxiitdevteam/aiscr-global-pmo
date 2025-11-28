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
        showWatermark: true,
        blockDashboard: true // Block dashboard access completely
    };
    
    // Export to window
    window.ENV = {
        isProduction: isProduction,
        isLocal: !isProduction,
        demoMode: DEMO_MODE.enabled,
        config: DEMO_MODE
    };
    
    // Block dashboard and download page access in production
    if (DEMO_MODE.enabled && DEMO_MODE.blockDashboard) {
        // Check if we're on the dashboard page
        const isDashboard = window.location.pathname.includes('/dashboard') || 
                           window.location.pathname.includes('frontend/index.html') ||
                           window.location.pathname.includes('frontend/') ||
                           document.querySelector('.dashboard-container') !== null ||
                           document.getElementById('dashboard-page') !== null ||
                           document.querySelector('.sidebar') !== null;
        
        // Check if we're on the download page
        const isDownload = window.location.pathname.includes('/download') || 
                          window.location.pathname.includes('download.html') ||
                          document.querySelector('.download-section') !== null ||
                          document.title.includes('Download');
        
        if (isDashboard || isDownload) {
            // Redirect to landing page immediately
            const pageType = isDownload ? 'DOWNLOAD' : 'DASHBOARD';
            console.log(`%c🔒 ${pageType} ACCESS BLOCKED`, 'color: #FF6B6B; font-size: 16px; font-weight: bold;');
            console.log(`%c${pageType === 'DOWNLOAD' ? 'Download' : 'Dashboard'} page is not available in demo mode. Redirecting to landing page...`, 'color: #666; font-size: 12px;');
            
            // Show access denied message
            document.documentElement.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Restricted - AISCR PMO</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #1F4E78 0%, #2EC4B6 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .access-denied {
            background: white;
            padding: 50px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
            margin: 20px;
        }
        .icon {
            font-size: 64px;
            margin-bottom: 20px;
            color: #FF6B6B;
        }
        h1 {
            color: #1F4E78;
            margin-bottom: 15px;
            font-size: 28px;
        }
        p {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .info {
            color: #999;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .btn-home {
            display: inline-block;
            background: #1F4E78;
            color: white;
            padding: 12px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: background 0.3s;
            margin-top: 10px;
        }
        .btn-home:hover {
            background: #2EC4B6;
        }
        .countdown {
            color: #999;
            margin-top: 20px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="access-denied">
        <div class="icon">🔒</div>
        <h1>Access Restricted</h1>
        <p>` + (isDownload ? 'The download page' : 'The dashboard') + ` is not available in the demonstration version for security reasons.</p>
        <p class="info">Full ` + (isDownload ? 'download' : 'dashboard') + ` functionality is available in the development environment.</p>
        <a href="/" class="btn-home">
            <i class="fas fa-home"></i> Return to Home
        </a>
        <p class="countdown">Redirecting automatically in <span id="countdown">5</span> seconds...</p>
    </div>
    <script>
        let countdown = 5;
        const countdownEl = document.getElementById('countdown');
        const redirectInterval = setInterval(() => {
            countdown--;
            if (countdownEl) countdownEl.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(redirectInterval);
                window.location.href = '/';
            }
        }, 1000);
        setTimeout(() => {
            window.location.href = '/';
        }, 5000);
    </script>
</body>
</html>`;
            
            return; // Stop execution
        }
    }
    
    // For other pages, show demo banner
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
        if (document.querySelector('.main-content')) {
            document.querySelector('.main-content').style.paddingTop = '50px';
        } else {
            document.body.style.paddingTop = '50px';
        }
    }
})();
