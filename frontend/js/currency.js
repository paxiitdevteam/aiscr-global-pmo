// Global Currency System - Support for Multiple Currencies including CFA Franc

// Currency definitions
const currencies = {
    USD: {
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
        position: 'before',
        decimals: 2,
        locale: 'en-US'
    },
    EUR: {
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
        position: 'before',
        decimals: 2,
        locale: 'de-DE'
    },
    GBP: {
        code: 'GBP',
        name: 'British Pound',
        symbol: '£',
        position: 'before',
        decimals: 2,
        locale: 'en-GB'
    },
    XAF: {
        code: 'XAF',
        name: 'Central African CFA Franc',
        symbol: 'FCFA',
        position: 'after',
        decimals: 0,
        locale: 'fr-FR'
    },
    XOF: {
        code: 'XOF',
        name: 'West African CFA Franc',
        symbol: 'CFA',
        position: 'after',
        decimals: 0,
        locale: 'fr-FR'
    },
    NGN: {
        code: 'NGN',
        name: 'Nigerian Naira',
        symbol: '₦',
        position: 'before',
        decimals: 2,
        locale: 'en-NG'
    },
    ZAR: {
        code: 'ZAR',
        name: 'South African Rand',
        symbol: 'R',
        position: 'before',
        decimals: 2,
        locale: 'en-ZA'
    },
    GHS: {
        code: 'GHS',
        name: 'Ghanaian Cedi',
        symbol: '₵',
        position: 'before',
        decimals: 2,
        locale: 'en-GH'
    },
    KES: {
        code: 'KES',
        name: 'Kenyan Shilling',
        symbol: 'KSh',
        position: 'before',
        decimals: 2,
        locale: 'en-KE'
    },
    EGP: {
        code: 'EGP',
        name: 'Egyptian Pound',
        symbol: 'E£',
        position: 'before',
        decimals: 2,
        locale: 'ar-EG'
    }
};

// Default currency (can be changed)
let currentCurrency = 'USD';

// Initialize currency system
function initCurrencySystem() {
    // Load saved currency preference
    const savedCurrency = localStorage.getItem('pmo_currency');
    if (savedCurrency && currencies[savedCurrency]) {
        currentCurrency = savedCurrency;
    }
    
    // Update currency selector if it exists
    updateCurrencySelector();
    
    // Update all currency displays
    updateAllCurrencyDisplays();
}

// Format amount with currency
function formatCurrency(amount, currencyCode = null) {
    const currency = currencyCode ? currencies[currencyCode] : currencies[currentCurrency];
    if (!currency) return amount.toString();
    
    // Format number with locale
    const formattedAmount = new Intl.NumberFormat(currency.locale, {
        minimumFractionDigits: currency.decimals,
        maximumFractionDigits: currency.decimals
    }).format(amount);
    
    // Add currency symbol
    if (currency.position === 'before') {
        return `${currency.symbol}${formattedAmount}`;
    } else {
        return `${formattedAmount} ${currency.symbol}`;
    }
}

// Format currency for compact display (e.g., $1.2K, $1.5M)
function formatCurrencyCompact(amount, currencyCode = null) {
    const currency = currencyCode ? currencies[currencyCode] : currencies[currentCurrency];
    if (!currency) return amount.toString();
    
    const absAmount = Math.abs(amount);
    let formatted;
    
    if (absAmount >= 1000000) {
        formatted = (amount / 1000000).toFixed(1) + 'M';
    } else if (absAmount >= 1000) {
        formatted = (amount / 1000).toFixed(1) + 'K';
    } else {
        formatted = amount.toFixed(currency.decimals);
    }
    
    if (currency.position === 'before') {
        return `${currency.symbol}${formatted}`;
    } else {
        return `${formatted} ${currency.symbol}`;
    }
}

// Get currency symbol
function getCurrencySymbol(currencyCode = null) {
    const currency = currencyCode ? currencies[currencyCode] : currencies[currentCurrency];
    return currency ? currency.symbol : '$';
}

// Set current currency
function setCurrency(currencyCode) {
    if (currencies[currencyCode]) {
        currentCurrency = currencyCode;
        localStorage.setItem('pmo_currency', currencyCode);
        updateCurrencySelector();
        updateAllCurrencyDisplays();
        
        // Show notification
        if (typeof addNotification === 'function') {
            addNotification('info',
                'Currency Updated',
                `Currency changed to ${currencies[currencyCode].name} (${currencyCode})`
            );
        }
    }
}

// Get current currency
function getCurrentCurrency() {
    return currentCurrency;
}

// Get currency info
function getCurrencyInfo(currencyCode = null) {
    return currencyCode ? currencies[currencyCode] : currencies[currentCurrency];
}

// Update currency selector dropdown
function updateCurrencySelector() {
    const selector = document.getElementById('currencySelector');
    if (selector) {
        selector.value = currentCurrency;
        
        // Update display
        const display = document.getElementById('currencyDisplay');
        if (display) {
            const currency = currencies[currentCurrency];
            display.innerHTML = `
                <i class="fas fa-coins"></i>
                <span>${currency.symbol} ${currency.code}</span>
                <i class="fas fa-chevron-down"></i>
            `;
        }
    }
}

// Update all currency displays on the page
function updateAllCurrencyDisplays() {
    // Update dashboard KPI cards
    updateDashboardKPIs();
    
    // Update budget table
    if (typeof loadBudgetData === 'function') {
        loadBudgetData();
    }
    
    // Update charts if they contain currency data
    if (typeof updateCharts === 'function') {
        updateCharts();
    }
    
    // Update any other currency displays
    updateCurrencyElements();
}

// Update dashboard KPI cards
function updateDashboardKPIs() {
    // Calculate totals from sample data
    if (window.sampleData && window.sampleData.budget) {
        const totalFunding = window.sampleData.budget.reduce((sum, item) => sum + (item.estimated || 0), 0);
        const totalActual = window.sampleData.budget.reduce((sum, item) => sum + (item.actual || 0), 0);
        const variance = totalFunding - totalActual;
        
        // Update Total Funding
        const totalFundingEl = document.getElementById('totalFunding');
        if (totalFundingEl) {
            totalFundingEl.textContent = formatCurrency(totalFunding);
        }
        
        // Update funding change if element exists
        const fundingChangeEl = document.querySelector('#totalFunding').parentElement.querySelector('.kpi-change');
        if (fundingChangeEl && variance !== 0) {
            const change = formatCurrencyCompact(Math.abs(variance));
            fundingChangeEl.textContent = `${variance > 0 ? '+' : '-'}${change} variance`;
            fundingChangeEl.className = `kpi-change ${variance > 0 ? 'positive' : 'negative'}`;
        }
    }
}

// Update currency elements throughout the page
function updateCurrencyElements() {
    // Find all elements with data-currency attribute
    document.querySelectorAll('[data-currency]').forEach(el => {
        const amount = parseFloat(el.getAttribute('data-currency')) || 0;
        el.textContent = formatCurrency(amount);
    });
    
    // Update elements with class 'currency-amount'
    document.querySelectorAll('.currency-amount').forEach(el => {
        const amount = parseFloat(el.textContent.replace(/[^\d.-]/g, '')) || 0;
        if (amount > 0) {
            el.textContent = formatCurrency(amount);
        }
    });
}

// Create currency selector HTML
function createCurrencySelector() {
    const currency = currencies[currentCurrency];
    return `
        <button class="currency-display" id="currencyDisplay" onclick="toggleCurrencyDropdown()">
            <i class="fas fa-coins"></i>
            <span>${currency.symbol} ${currentCurrency}</span>
            <i class="fas fa-chevron-down"></i>
        </button>
        <div class="currency-dropdown" id="currencyDropdown">
            <div class="currency-dropdown-header">
                <h4>Select Currency</h4>
            </div>
            <div class="currency-list">
                ${Object.values(currencies).map(currency => `
                    <div class="currency-option ${currency.code === currentCurrency ? 'active' : ''}" 
                         onclick="selectCurrency('${currency.code}')">
                        <div class="currency-option-info">
                            <strong>${currency.code}</strong>
                            <span>${currency.name}</span>
                        </div>
                        <div class="currency-option-symbol">${currency.symbol}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Toggle currency dropdown
function toggleCurrencyDropdown() {
    const dropdown = document.getElementById('currencyDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Select currency
function selectCurrency(currencyCode) {
    setCurrency(currencyCode);
    const dropdown = document.getElementById('currencyDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Close currency dropdown when clicking outside
document.addEventListener('click', (e) => {
    const container = document.getElementById('currencySelectorContainer');
    const dropdown = document.getElementById('currencyDropdown');
    
    if (container && dropdown && !container.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Initialize currency selector in header
function initCurrencySelector() {
    const container = document.getElementById('currencySelectorContainer');
    if (container && !container.querySelector('.currency-display')) {
        container.className = 'currency-selector';
        container.innerHTML = createCurrencySelector();
        updateCurrencySelector();
    }
}

// Initialize on page load
function initializeCurrency() {
    initCurrencySystem();
    
    // Wait a bit for DOM to be ready, then add selector
    setTimeout(() => {
        initCurrencySelector();
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCurrency);
} else {
    initializeCurrency();
}

// Export for use in other modules
window.formatCurrency = formatCurrency;
window.formatCurrencyCompact = formatCurrencyCompact;
window.setCurrency = setCurrency;
window.getCurrentCurrency = getCurrentCurrency;
window.getCurrencySymbol = getCurrencySymbol;

