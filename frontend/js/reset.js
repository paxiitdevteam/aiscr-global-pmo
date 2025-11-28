// Reset/Clear Data System - Reset all app data to zero/empty

// Reset all data to empty/zero
function resetAllData() {
    // Confirm action
    const confirmed = confirm(
        '⚠️ WARNING: This will delete ALL data!\n\n' +
        'This action will:\n' +
        '• Clear all projects, risks, budget, timeline, issues\n' +
        '• Remove all volunteers and stakeholders\n' +
        '• Clear all notifications\n' +
        '• Reset dashboard statistics to zero\n\n' +
        'This action CANNOT be undone!\n\n' +
        'Are you sure you want to continue?'
    );
    
    if (!confirmed) {
        return;
    }
    
    // Double confirmation for safety
    const doubleConfirm = confirm(
        '⚠️ FINAL CONFIRMATION\n\n' +
        'You are about to DELETE ALL DATA.\n' +
        'Click OK to proceed or Cancel to abort.'
    );
    
    if (!doubleConfirm) {
        return;
    }
    
    // Reset all sample data to empty arrays
    // Access sampleData - window.sampleData should be the same reference as sampleData
    let dataSource = null;
    
    // Try to get sampleData from window first
    if (window.sampleData) {
        dataSource = window.sampleData;
    } 
    // If not in window, try to access it from the global scope
    else if (typeof sampleData !== 'undefined') {
        dataSource = sampleData;
        // Also set window.sampleData for consistency
        window.sampleData = sampleData;
    }
    
    if (!dataSource) {
        console.error('sampleData not found! Cannot reset data.');
        alert('Error: Could not find data to reset. Please refresh the page.');
        return;
    }
    
    // Clear all arrays
    dataSource.portfolio.length = 0;
    dataSource.risks.length = 0;
    dataSource.budget.length = 0;
    dataSource.timeline.length = 0;
    dataSource.issues.length = 0;
    dataSource.volunteers.length = 0;
    dataSource.stakeholders.length = 0;
    
    console.log('Data reset - arrays cleared:', {
        portfolio: dataSource.portfolio.length,
        risks: dataSource.risks.length,
        budget: dataSource.budget.length,
        timeline: dataSource.timeline.length,
        issues: dataSource.issues.length,
        volunteers: dataSource.volunteers.length,
        stakeholders: dataSource.stakeholders.length
    });
    
    // Clear localStorage data
    localStorage.removeItem('pmo_notifications');
    // Keep currency preference, but can clear if needed
    // localStorage.removeItem('pmo_currency');
    
    // Reset notifications
    // Clear notifications from localStorage
    localStorage.removeItem('pmo_notifications');
    
    // Clear notifications - try multiple methods
    // Method 1: Use clearAllNotifications function if available (but skip confirmation)
    // We'll manually clear instead to avoid confirmation dialog
    
    // Method 2: Manually clear notification display and badge
    const notificationList = document.getElementById('notificationList');
    if (notificationList) {
        notificationList.innerHTML = `
            <div class="no-notifications">
                <i class="fas fa-bell-slash"></i>
                <p>No new notifications</p>
            </div>
        `;
    }
    
    // Update badge
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        badge.textContent = '0';
        badge.style.display = 'none';
    }
    
    // Method 3: Reinitialize notification system to clear the array
    if (typeof initNotificationSystem === 'function') {
        // This will reload from localStorage (which is now empty) and reset the array
        setTimeout(() => {
            if (typeof initNotificationSystem === 'function') {
                initNotificationSystem();
            }
        }, 100);
    }
    
    // Reload all data displays
    reloadAllData();
    
    // Show success notification
    if (typeof addNotification === 'function') {
        addNotification('success',
            'Data Reset Complete',
            'All data has been cleared. Dashboard reset to zero.',
            null
        );
    } else if (typeof modalManager !== 'undefined' && modalManager.showNotification) {
        modalManager.showNotification('All data has been reset successfully!');
    }
}

// Reset data but keep structure (set to zero values)
function resetDataToZero() {
    // Block reset in demo mode
    if (window.ENV && window.ENV.demoMode) {
        alert('🔒 DEMO MODE\n\nReset operations are disabled in the demonstration version for security.\n\nFull functionality is available in the development environment.');
        return;
    }
    const confirmed = confirm(
        '⚠️ Reset Data to Zero\n\n' +
        'This will reset all numeric values to zero but keep the data structure.\n\n' +
        'Are you sure you want to continue?'
    );
    
    if (!confirmed) {
        return;
    }
    
    // Access sampleData from both window and local scope
    const dataSource = window.sampleData || (typeof sampleData !== 'undefined' ? sampleData : null);
    
    if (!dataSource) {
        console.error('sampleData not found! Cannot reset data.');
        alert('Error: Could not find data to reset. Please refresh the page.');
        return;
    }
    
    // Reset budget values to zero
    if (dataSource.budget && dataSource.budget.length > 0) {
        dataSource.budget.forEach(item => {
            item.estimated = 0;
            item.actual = 0;
            item.variance = 0;
            item.status = 'Green';
        });
    }
    
    // Reset volunteer scores to zero
    if (dataSource.volunteers && dataSource.volunteers.length > 0) {
        dataSource.volunteers.forEach(volunteer => {
            volunteer.score = 0;
        });
    }
    
    // Reset project volunteer counts
    if (dataSource.portfolio && dataSource.portfolio.length > 0) {
        dataSource.portfolio.forEach(project => {
            project.volunteers = 0;
        });
    }
    
    // Update window.sampleData reference
    if (window.sampleData) {
        window.sampleData = dataSource;
    }
    
    // Reload all data displays
    reloadAllData();
    
    // Show success notification
    if (typeof addNotification === 'function') {
        addNotification('success',
            'Data Reset to Zero',
            'All numeric values have been reset to zero.',
            null
        );
    }
}

// Reload all data displays
function reloadAllData() {
    console.log('Reloading all data displays...');
    
    // Force reload all table data with a small delay to ensure DOM is ready
    setTimeout(() => {
        try {
            // Reload all table data
            if (typeof loadPortfolioData === 'function') {
                console.log('Reloading portfolio data...');
                loadPortfolioData();
            }
            if (typeof loadRisksData === 'function') {
                console.log('Reloading risks data...');
                loadRisksData();
            }
            if (typeof loadBudgetData === 'function') {
                console.log('Reloading budget data...');
                loadBudgetData();
            }
            if (typeof loadTimelineData === 'function') {
                console.log('Reloading timeline data...');
                loadTimelineData();
            }
            if (typeof loadIssuesData === 'function') {
                console.log('Reloading issues data...');
                loadIssuesData();
            }
            if (typeof loadVolunteersData === 'function') {
                console.log('Reloading volunteers data...');
                loadVolunteersData();
            }
            if (typeof loadStakeholdersData === 'function') {
                console.log('Reloading stakeholders data...');
                loadStakeholdersData();
            }
            if (typeof loadDashboardData === 'function') {
                console.log('Reloading dashboard data...');
                loadDashboardData();
            }
            if (typeof loadMonitoringData === 'function') {
                console.log('Reloading monitoring data...');
                loadMonitoringData();
            }
            if (typeof updateMonitoringDates === 'function') {
                console.log('Updating monitoring dates...');
                updateMonitoringDates();
            }
            
            // Update dashboard KPIs if currency system is loaded
            if (typeof updateDashboardKPIs === 'function') {
                console.log('Updating dashboard KPIs...');
                updateDashboardKPIs();
            }
            
            // Reload charts if they exist
            if (typeof initializeCharts === 'function') {
                console.log('Reloading charts...');
                initializeCharts();
            }
            
            // Also update filteredPortfolio if it exists
            if (typeof window.filteredPortfolio !== 'undefined') {
                window.filteredPortfolio = [];
                if (window.sampleData && window.sampleData.portfolio) {
                    window.filteredPortfolio = [...window.sampleData.portfolio];
                }
            }
            
            console.log('All data displays reloaded!');
        } catch (error) {
            console.error('Error reloading data:', error);
        }
    }, 150);
}

// Reset to default sample data
function resetToDefaultData() {
    const confirmed = confirm(
        '🔄 Reset to Default Data\n\n' +
        'This will restore all default sample data.\n\n' +
        'Are you sure you want to continue?'
    );
    
    if (!confirmed) {
        return;
    }
    
    // Reinitialize sample data
    if (typeof initializeSampleData === 'function') {
        const defaultData = initializeSampleData();
        const dataSource = window.sampleData || (typeof sampleData !== 'undefined' ? sampleData : null);
        
        if (dataSource) {
            dataSource.portfolio = [...defaultData.portfolio];
            dataSource.risks = [...defaultData.risks];
            dataSource.budget = [...defaultData.budget];
            dataSource.timeline = [...defaultData.timeline];
            dataSource.issues = [...defaultData.issues];
            dataSource.volunteers = [...defaultData.volunteers];
            dataSource.stakeholders = [...defaultData.stakeholders];
            
            // Update window.sampleData reference
            if (window.sampleData) {
                window.sampleData = dataSource;
            }
        } else {
            console.error('sampleData not found! Cannot restore defaults.');
            alert('Error: Could not find data to restore. Please refresh the page.');
            return;
        }
    }
    
    // Reload all data displays
    reloadAllData();
    
    // Show success notification
    if (typeof addNotification === 'function') {
        addNotification('success',
            'Default Data Restored',
            'All default sample data has been restored.',
            null
        );
    }
}

// Show reset options modal
function showResetOptions() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2><i class="fas fa-exclamation-triangle" style="color: #ffc107;"></i> Reset Data Options</h2>
                <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p style="margin-bottom: 20px; color: #666;">
                    Choose a reset option. All actions require confirmation.
                </p>
                
                <div class="reset-options">
                    <button class="reset-option-btn danger" onclick="resetAllData(); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-trash-alt"></i>
                        <div>
                            <strong>Clear All Data</strong>
                            <span>Delete everything - start from scratch</span>
                        </div>
                    </button>
                    
                    <button class="reset-option-btn warning" onclick="resetDataToZero(); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-zero"></i>
                        <div>
                            <strong>Reset to Zero</strong>
                            <span>Set all numbers to zero, keep structure</span>
                        </div>
                    </button>
                    
                    <button class="reset-option-btn info" onclick="resetToDefaultData(); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-undo"></i>
                        <div>
                            <strong>Restore Defaults</strong>
                            <span>Restore original sample data</span>
                        </div>
                    </button>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Export functions
window.resetAllData = resetAllData;
window.resetDataToZero = resetDataToZero;
window.resetToDefaultData = resetToDefaultData;
window.showResetOptions = showResetOptions;

