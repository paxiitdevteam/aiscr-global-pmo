// Coming Soon Handler for Undeveloped Features
// This script handles "coming soon" messages for features not yet implemented

function showComingSoon(featureName, description = '') {
    const defaultMessage = `The ${featureName} feature is currently under development and will be available soon.`;
    const message = description || defaultMessage;
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s;
    `;
    
    modal.innerHTML = `
        <div style="width: 100px; height: 100px; margin: 0 auto 20px; background: linear-gradient(135deg, #1F4E78 0%, #2EC4B6 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-clock" style="font-size: 50px; color: white;"></i>
        </div>
        <h2 style="color: #1F4E78; margin-bottom: 15px;">${featureName}</h2>
        <div style="background: linear-gradient(135deg, #2EC4B6 0%, #1F4E78 100%); color: white; padding: 8px 20px; border-radius: 20px; display: inline-block; margin-bottom: 20px; font-weight: bold;">
            <i class="fas fa-hourglass-half"></i> Coming Soon
        </div>
        <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">${message}</p>
        <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" 
                style="background: linear-gradient(135deg, #1F4E78 0%, #2EC4B6 100%); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: transform 0.3s;"
                onmouseover="this.style.transform='translateY(-2px)'"
                onmouseout="this.style.transform='translateY(0)'">
            <i class="fas fa-check"></i> Got it
        </button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Add coming soon handlers to undeveloped features
document.addEventListener('DOMContentLoaded', function() {
    // Features not yet implemented
    const comingSoonFeatures = {
        'charter': {
            name: 'Project Charter',
            description: 'The Project Charter feature will allow you to create, manage, and export project charter documents. This feature is currently under development.'
        },
        'wbs': {
            name: 'Work Breakdown Structure (WBS)',
            description: 'The WBS feature will provide interactive hierarchical visualization of project work breakdown structures. This feature is currently under development.'
        },
        'change-requests': {
            name: 'Change Requests',
            description: 'The Change Requests module will allow you to track and manage project change requests. This feature is currently under development.'
        },
        'lessons-learned': {
            name: 'Lessons Learned',
            description: 'The Lessons Learned repository will help you capture and share project knowledge. This feature is currently under development.'
        },
        'assignments': {
            name: 'Assignments',
            description: 'The Assignments feature will help you manage task assignments and resource allocation. This feature is currently under development.'
        },
        'contributions': {
            name: 'Contributions',
            description: 'The Contributions tracking feature will help you monitor volunteer and team contributions. This feature is currently under development.'
        },
        'stage-gate': {
            name: 'Stage-Gate Calculator',
            description: 'The Stage-Gate Calculator will help you evaluate projects at different stages. This feature is currently under development.'
        }
    };
    
    // Add click handlers for coming soon features
    Object.keys(comingSoonFeatures).forEach(feature => {
        const element = document.querySelector(`[data-page="${feature}"]`);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const featureInfo = comingSoonFeatures[feature];
                showComingSoon(featureInfo.name, featureInfo.description);
            });
        }
    });
});

