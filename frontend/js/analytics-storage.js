/**
 * AISCR Global PMO - Analytics Data Storage
 * 
 * Stores analytics data locally for viewing on live site
 * Uses IndexedDB for persistent storage across sessions
 */

// ============================================
// INDEXEDDB SETUP
// ============================================

const DB_NAME = 'AISCR_PMO_Analytics';
const DB_VERSION = 1;
const STORE_NAME = 'analytics_events';

let db = null;

// Database initialization promise
let dbInitPromise = null;

// Initialize IndexedDB
function initAnalyticsDB() {
    // Return existing promise if already initializing
    if (dbInitPromise) {
        return dbInitPromise;
    }

    dbInitPromise = new Promise((resolve, reject) => {
        // Check if IndexedDB is available
        if (typeof indexedDB === 'undefined') {
            console.warn('Analytics DB: IndexedDB not available');
            reject(new Error('IndexedDB not supported'));
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('Analytics DB: Failed to open database', request.error);
            dbInitPromise = null; // Reset promise on error
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            
            // Handle database close event
            db.onclose = () => {
                console.log('Analytics DB: Database connection closed');
                db = null;
                dbInitPromise = null;
            };
            
            // Handle database errors
            db.onerror = (event) => {
                console.error('Analytics DB: Database error', event);
            };
            
            console.log('✅ Analytics DB: Database opened');
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const upgradeDB = event.target.result;
            
            // Create object store if it doesn't exist
            if (!upgradeDB.objectStoreNames.contains(STORE_NAME)) {
                const objectStore = upgradeDB.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true
                });
                
                // Create indexes for efficient querying
                objectStore.createIndex('timestamp', 'timestamp', { unique: false });
                objectStore.createIndex('eventName', 'eventName', { unique: false });
                objectStore.createIndex('eventCategory', 'eventCategory', { unique: false });
                objectStore.createIndex('pagePath', 'pagePath', { unique: false });
                
                console.log('✅ Analytics DB: Object store created');
            }
        };
    });

    return dbInitPromise;
}

// ============================================
// STORAGE FUNCTIONS
// ============================================

// Store event in IndexedDB
async function storeAnalyticsEvent(event) {
    try {
        // Ensure database is initialized
        if (!db) {
            await initAnalyticsDB();
        }

        // Check if database is still open
        if (!db || db.objectStoreNames.length === 0) {
            console.warn('Analytics DB: Database not ready, reinitializing...');
            await initAnalyticsDB();
        }

        return new Promise((resolve, reject) => {
            try {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                
                transaction.onerror = (e) => {
                    console.error('Analytics DB: Transaction error', e);
                    reject(e);
                };
                
                const objectStore = transaction.objectStore(STORE_NAME);
                
                const eventData = {
                    ...event,
                    storedAt: new Date().toISOString()
                };
                
                const request = objectStore.add(eventData);
                
                request.onsuccess = () => {
                    resolve(request.result);
                };
                
                request.onerror = () => {
                    console.error('Analytics DB: Failed to store event', request.error);
                    reject(request.error);
                };
            } catch (error) {
                console.error('Analytics DB: Error creating transaction', error);
                reject(error);
            }
        });
    } catch (error) {
        console.error('Analytics DB: Error in storeAnalyticsEvent', error);
        // Don't throw - just log, so analytics doesn't break the app
        return null;
    }
}

// Get all events from IndexedDB
async function getAllAnalyticsEvents() {
    try {
        // Ensure database is initialized
        if (!db) {
            await initAnalyticsDB();
        }

        // Check if database is still open
        if (!db || db.objectStoreNames.length === 0) {
            console.warn('Analytics DB: Database not ready, reinitializing...');
            await initAnalyticsDB();
        }

        return new Promise((resolve, reject) => {
            try {
                const transaction = db.transaction([STORE_NAME], 'readonly');
                
                transaction.onerror = (e) => {
                    console.error('Analytics DB: Transaction error', e);
                    reject(e);
                };
                
                const objectStore = transaction.objectStore(STORE_NAME);
                const request = objectStore.getAll();
                
                request.onsuccess = () => {
                    resolve(request.result || []);
                };
                
                request.onerror = () => {
                    reject(request.error);
                };
            } catch (error) {
                console.error('Analytics DB: Error creating transaction', error);
                reject(error);
            }
        });
    } catch (error) {
        console.error('Analytics DB: Error in getAllAnalyticsEvents', error);
        return []; // Return empty array instead of throwing
    }
}

// Get events filtered by criteria
async function getFilteredEvents(filter = {}) {
    const allEvents = await getAllAnalyticsEvents();
    
    let filtered = allEvents;
    
    // Filter by category
    if (filter.category) {
        filtered = filtered.filter(e => e.eventCategory === filter.category);
    }
    
    // Filter by event name
    if (filter.eventName) {
        filtered = filtered.filter(e => e.eventName === filter.eventName);
    }
    
    // Filter by date range
    if (filter.startDate) {
        filtered = filtered.filter(e => new Date(e.timestamp) >= new Date(filter.startDate));
    }
    
    if (filter.endDate) {
        filtered = filtered.filter(e => new Date(e.timestamp) <= new Date(filter.endDate));
    }
    
    // Filter by page path
    if (filter.pagePath) {
        filtered = filtered.filter(e => e.pagePath === filter.pagePath);
    }
    
    return filtered;
}

// Get analytics summary
async function getStoredAnalyticsSummary() {
    const allEvents = await getAllAnalyticsEvents();
    
    const pageViews = allEvents.filter(e => e.type === 'page_view').length;
    const totalEvents = allEvents.length;
    const highInterestEvents = allEvents.filter(e => 
        e.eventCategory === 'interest' || 
        e.eventName === 'blocked_access' ||
        e.eventName.includes('interest')
    ).length;
    const engagementEvents = allEvents.filter(e => 
        e.eventCategory === 'engagement'
    ).length;
    
    // Get unique page views
    const uniquePages = new Set(allEvents
        .filter(e => e.type === 'page_view')
        .map(e => e.pagePath)
    ).size;
    
    // Get events by category
    const eventsByCategory = {};
    allEvents.forEach(e => {
        const cat = e.eventCategory || 'general';
        eventsByCategory[cat] = (eventsByCategory[cat] || 0) + 1;
    });
    
    // Get top events
    const eventCounts = {};
    allEvents.forEach(e => {
        const name = e.eventName || 'unknown';
        eventCounts[name] = (eventCounts[name] || 0) + 1;
    });
    const topEvents = Object.entries(eventCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, count]) => ({ name, count }));
    
    return {
        totalEvents,
        pageViews,
        uniquePages,
        highInterestEvents,
        engagementEvents,
        eventsByCategory,
        topEvents,
        lastUpdated: new Date().toISOString()
    };
}

// Clear old events (older than X days)
async function clearOldEvents(daysToKeep = 30) {
    try {
        // Ensure database is initialized
        if (!db) {
            await initAnalyticsDB();
        }

        // Check if database is still open
        if (!db || db.objectStoreNames.length === 0) {
            console.warn('Analytics DB: Database not ready, reinitializing...');
            await initAnalyticsDB();
        }

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

        return new Promise((resolve, reject) => {
            try {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                
                transaction.onerror = (e) => {
                    console.error('Analytics DB: Transaction error', e);
                    reject(e);
                };
                
                const objectStore = transaction.objectStore(STORE_NAME);
                const index = objectStore.index('timestamp');
                const range = IDBKeyRange.upperBound(cutoffDate.toISOString());
                const request = index.openCursor(range);
                
                let deletedCount = 0;
                
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        cursor.delete();
                        deletedCount++;
                        cursor.continue();
                    } else {
                        console.log(`Analytics DB: Deleted ${deletedCount} old events`);
                        resolve(deletedCount);
                    }
                };
                
                request.onerror = () => {
                    reject(request.error);
                };
            } catch (error) {
                console.error('Analytics DB: Error creating transaction', error);
                reject(error);
            }
        });
    } catch (error) {
        console.error('Analytics DB: Error in clearOldEvents', error);
        return 0; // Return 0 instead of throwing
    }
}

// Export all data as JSON
async function exportStoredAnalyticsData() {
    const allEvents = await getAllAnalyticsEvents();
    const summary = await getStoredAnalyticsSummary();
    
    return {
        summary,
        events: allEvents,
        exportedAt: new Date().toISOString()
    };
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize on load (with delay to ensure DOM is ready)
if (typeof indexedDB !== 'undefined') {
    // Wait a bit before initializing to avoid race conditions
    setTimeout(() => {
        initAnalyticsDB().catch(err => {
            // Only log if it's a real error, not browser extension interference
            if (err && err.name !== 'AbortError' && !err.message?.includes('message channel')) {
                console.error('Analytics DB: Initialization failed', err);
            }
        });
        
        // Clean up old events weekly (keep last 30 days)
        const lastCleanup = localStorage.getItem('analytics_last_cleanup');
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        
        if (!lastCleanup || (now - parseInt(lastCleanup)) > oneWeek) {
            // Wait for DB to be ready before cleaning
            initAnalyticsDB().then(() => {
                clearOldEvents(30).then(() => {
                    localStorage.setItem('analytics_last_cleanup', now.toString());
                }).catch(err => {
                    // Suppress extension-related errors
                    if (err && err.name !== 'AbortError' && !err.message?.includes('message channel')) {
                        console.error('Analytics DB: Cleanup failed', err);
                    }
                });
            }).catch(err => {
                // Suppress extension-related errors
                if (err && err.name !== 'AbortError' && !err.message?.includes('message channel')) {
                    console.error('Analytics DB: Could not initialize for cleanup', err);
                }
            });
        }
    }, 100);
} else {
    console.warn('Analytics DB: IndexedDB not available in this browser');
}

// Suppress browser extension errors (these are harmless)
window.addEventListener('error', (event) => {
    // Filter out browser extension errors
    if (event.message && event.message.includes('message channel')) {
        event.preventDefault();
        return false;
    }
}, true);

// Suppress unhandled promise rejections from extensions
window.addEventListener('unhandledrejection', (event) => {
    // Filter out browser extension errors
    if (event.reason && event.reason.message && event.reason.message.includes('message channel')) {
        event.preventDefault();
        return false;
    }
});

// Make functions globally available
window.storeAnalyticsEvent = storeAnalyticsEvent;
window.getAllAnalyticsEvents = getAllAnalyticsEvents;
window.getFilteredEvents = getFilteredEvents;
window.getStoredAnalyticsSummary = getStoredAnalyticsSummary;
window.exportStoredAnalyticsData = exportStoredAnalyticsData;
window.clearOldEvents = clearOldEvents;

