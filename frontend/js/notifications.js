// Notification System - Clickable Notifications and Alert Management

// Store notifications in memory (can be extended to localStorage)
let notifications = [];

// Initialize notification system
function initNotificationSystem() {
    // Load notifications from localStorage if available
    const savedNotifications = localStorage.getItem('pmo_notifications');
    if (savedNotifications) {
        notifications = JSON.parse(savedNotifications);
    } else {
        // Initialize with sample notifications
        notifications = [
            {
                id: 1,
                type: 'warning',
                title: 'Project Deadline Approaching',
                message: 'Project "Website Redesign" deadline is in 3 days',
                timestamp: new Date().toISOString(),
                read: false,
                action: { type: 'navigate', target: '#portfolio' }
            },
            {
                id: 2,
                type: 'info',
                title: 'New Risk Identified',
                message: 'High priority risk added to "Mobile App Development"',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                read: false,
                action: { type: 'navigate', target: '#risks' }
            },
            {
                id: 3,
                type: 'success',
                title: 'Budget Approved',
                message: 'Budget for "Marketing Campaign" has been approved',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                read: false,
                action: { type: 'navigate', target: '#budget' }
            }
        ];
        saveNotifications();
    }
    
    updateNotificationBadge();
    renderNotifications();
}

// Save notifications to localStorage
function saveNotifications() {
    localStorage.setItem('pmo_notifications', JSON.stringify(notifications));
}

// Add a new notification
function addNotification(type, title, message, action = null) {
    const notification = {
        id: Date.now(),
        type: type || 'info',
        title: title || 'Notification',
        message: message || '',
        timestamp: new Date().toISOString(),
        read: false,
        action: action
    };
    
    notifications.unshift(notification);
    saveNotifications();
    updateNotificationBadge();
    renderNotifications();
    
    // Show toast notification
    showToastNotification(notification);
}

// Show toast notification (temporary popup)
function showToastNotification(notification) {
    const toast = document.createElement('div');
    toast.className = `notification-toast notification-${notification.type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${getNotificationIcon(notification.type)}"></i>
        </div>
        <div class="toast-content">
            <strong>${notification.title}</strong>
            <p>${notification.message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Make clickable
    toast.addEventListener('click', (e) => {
        if (!e.target.closest('.toast-close')) {
            handleNotificationClick(notification);
        }
    });
}

// Get icon for notification type
function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'warning': 'fa-exclamation-triangle',
        'error': 'fa-times-circle',
        'info': 'fa-info-circle'
    };
    return icons[type] || 'fa-bell';
}

// Toggle notification panel
function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.toggle('active');
        
        // Mark all as read when opening
        if (panel.classList.contains('active')) {
            markAllAsRead();
        }
    }
}

// Close notification panel when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('notificationPanel');
    const btn = document.getElementById('notificationBtn');
    
    if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove('active');
    }
});

// Render notifications in the panel
function renderNotifications() {
    const list = document.getElementById('notificationList');
    if (!list) return;
    
    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="no-notifications">
                <i class="fas fa-bell-slash"></i>
                <p>No new notifications</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = notifications.map(notif => `
        <div class="notification-item ${notif.read ? 'read' : ''}" 
             onclick="handleNotificationClickById(${notif.id})">
            <div class="notification-item-icon ${notif.type}">
                <i class="fas ${getNotificationIcon(notif.type)}"></i>
            </div>
            <div class="notification-item-content">
                <div class="notification-item-header">
                    <strong>${notif.title}</strong>
                    <span class="notification-time">${formatTime(notif.timestamp)}</span>
                </div>
                <p>${notif.message}</p>
            </div>
            <button class="notification-delete" onclick="deleteNotification(${notif.id}); event.stopPropagation();">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Handle notification click by ID
function handleNotificationClickById(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        handleNotificationClick(notification);
    }
}

// Handle notification click
function handleNotificationClick(notification) {
    // Mark as read
    markAsRead(notification.id);
    
    // Close panel
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.remove('active');
    }
    
    // Handle action
    if (notification.action) {
        if (notification.action.type === 'navigate') {
            // Navigate to the target
            if (notification.action.target.startsWith('#')) {
                window.location.hash = notification.action.target;
                // Trigger navigation if using hash-based routing
                if (window.handleHashChange) {
                    window.handleHashChange();
                } else if (window.loadPage) {
                    // Alternative navigation method
                    const page = notification.action.target.substring(1);
                    window.loadPage(page);
                }
            } else {
                window.location.href = notification.action.target;
            }
        }
    }
}

// Mark notification as read
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
        notification.read = true;
        saveNotifications();
        updateNotificationBadge();
        renderNotifications();
    }
}

// Mark all as read
function markAllAsRead() {
    let updated = false;
    notifications.forEach(notif => {
        if (!notif.read) {
            notif.read = true;
            updated = true;
        }
    });
    
    if (updated) {
        saveNotifications();
        updateNotificationBadge();
        renderNotifications();
    }
}

// Delete notification
function deleteNotification(id) {
    notifications = notifications.filter(n => n.id !== id);
    saveNotifications();
    updateNotificationBadge();
    renderNotifications();
}

// Clear all notifications
function clearAllNotifications() {
    if (confirm('Are you sure you want to clear all notifications?')) {
        notifications = [];
        saveNotifications();
        updateNotificationBadge();
        renderNotifications();
    }
}

// Update notification badge count
function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        const unreadCount = notifications.filter(n => !n.read).length;
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

// Format time for display
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotificationSystem);
} else {
    initNotificationSystem();
}

