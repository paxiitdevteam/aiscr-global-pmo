// Date Utility Functions - Auto-update to current date
function getDateString(daysFromToday = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return date.toISOString().split('T')[0];
}

function getFutureDate(daysFromToday) {
    return getDateString(daysFromToday);
}

function getPastDate(daysAgo) {
    return getDateString(-daysAgo);
}

// Function to initialize sample data with current dates
function initializeSampleData() {
    return {
    portfolio: [
        { project: "PMO System", category: "Technology", status: "Green", startDate: getPastDate(30), endDate: getFutureDate(150), pm: "John Doe", priority: 1, acceptingVolunteers: true, volunteers: 3, scope: "Develop comprehensive PMO management system with automated workflows and reporting capabilities." },
        { project: "Data Analysis", category: "Analytics", status: "Yellow", startDate: getPastDate(20), endDate: getFutureDate(120), pm: "Jane Smith", priority: 2, acceptingVolunteers: true, volunteers: 2, scope: "Analyze project data to identify trends and improve decision-making processes." },
        { project: "IT Infrastructure", category: "Technology", status: "Green", startDate: getPastDate(15), endDate: getFutureDate(90), pm: "Bob Johnson", priority: 1, acceptingVolunteers: false, volunteers: 5, scope: "Upgrade IT infrastructure to support PMO operations and improve system reliability." },
        { project: "Marketing Campaign", category: "Marketing", status: "Red", startDate: getPastDate(10), endDate: getFutureDate(60), pm: "Alice Brown", priority: 3, acceptingVolunteers: true, volunteers: 1, scope: "Launch marketing campaign to promote PMO services and attract new members." },
        { project: "Training Program", category: "Education", status: "Green", startDate: getDateString(0), endDate: getFutureDate(120), pm: "John Doe", priority: 2, acceptingVolunteers: true, volunteers: 0, scope: "Develop comprehensive training program for PMO team members and volunteers." },
        { project: "Quality Assurance", category: "Operations", status: "Yellow", startDate: getPastDate(5), endDate: getFutureDate(90), pm: "Jane Smith", priority: 1, acceptingVolunteers: false, volunteers: 4, scope: "Implement quality assurance processes to ensure project deliverables meet standards." }
    ],
    risks: [
        { id: "R001", description: "Resource unavailability", probability: 3, impact: 4, score: 12, owner: "PM", status: "Yellow" },
        { id: "R002", description: "Budget overrun", probability: 2, impact: 5, score: 10, owner: "Finance", status: "Red" },
        { id: "R003", description: "Scope creep", probability: 4, impact: 3, score: 12, owner: "PM", status: "Yellow" },
        { id: "R004", description: "Technology failure", probability: 2, impact: 4, score: 8, owner: "IT", status: "Green" }
    ],
    budget: [
        { category: "Personnel", description: "Staff salaries", estimated: 50000, actual: 48000, variance: -2000, status: "Green" },
        { category: "Technology", description: "Software licenses", estimated: 10000, actual: 12000, variance: 2000, status: "Red" },
        { category: "Operations", description: "Office supplies", estimated: 5000, actual: 4500, variance: -500, status: "Green" },
        { category: "Marketing", description: "Promotional materials", estimated: 8000, actual: 7500, variance: -500, status: "Green" }
    ],
    timeline: [
        { task: "Initiation", startDate: getPastDate(45), endDate: getPastDate(15), duration: 30, status: "Complete" },
        { task: "Planning", startDate: getPastDate(14), endDate: getFutureDate(16), duration: 30, status: "In Progress" },
        { task: "Execution", startDate: getFutureDate(17), endDate: getFutureDate(107), duration: 90, status: "Not Started" },
        { task: "Closure", startDate: getFutureDate(108), endDate: getFutureDate(138), duration: 30, status: "Not Started" }
    ],
    issues: [
        { id: "I001", description: "Resource shortage", impact: "High", owner: "PM", dueDate: getFutureDate(30), status: "Open" },
        { id: "I002", description: "Budget approval delay", impact: "Medium", owner: "Finance", dueDate: getFutureDate(45), status: "In Progress" },
        { id: "I003", description: "System downtime", impact: "High", owner: "IT", dueDate: getPastDate(2), status: "Open" },
        { id: "I004", description: "Training needed", impact: "Low", owner: "HR", dueDate: getFutureDate(60), status: "Closed" }
    ],
    volunteers: [
        { name: "John Doe", skill: "Project Management", level: "Expert", availability: "Full-time", score: 92.5 },
        { name: "Jane Smith", skill: "Data Analysis", level: "Intermediate", availability: "Part-time", score: 78.3 },
        { name: "Bob Johnson", skill: "IT Support", level: "Expert", availability: "Full-time", score: 88.7 },
        { name: "Alice Brown", skill: "Marketing", level: "Intermediate", availability: "Part-time", score: 75.2 }
    ],
    stakeholders: [
        { name: "Executive Board", role: "Sponsor", influence: "High", interest: "High", strategy: "Regular updates" },
        { name: "Project Manager", role: "Leader", influence: "High", interest: "High", strategy: "Daily communication" },
        { name: "Volunteers", role: "Team", influence: "Medium", interest: "High", strategy: "Weekly meetings" },
        { name: "Donors", role: "External", influence: "High", interest: "Medium", strategy: "Quarterly reports" }
    ]
    };
}

// Initialize sample data with current dates
const sampleData = initializeSampleData();
// Make sampleData globally accessible for export functions
window.sampleData = sampleData;

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeButtons();
    loadDashboardData();
    loadPortfolioData();
    loadRisksData();
    loadBudgetData();
    loadTimelineData();
    loadIssuesData();
    loadVolunteersData();
    loadStakeholdersData();
    updateMonitoringDates();
    updateFooterYear();
    updateCurrentDate();
    setDefaultDates();
    
    // Update date display every minute
    setInterval(updateCurrentDate, 60000);
    
    // Close tools dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const toolsMenu = document.querySelector('.tools-menu');
        const toolsDropdown = document.getElementById('toolsDropdown');
        
        if (toolsMenu && toolsDropdown && !toolsMenu.contains(e.target)) {
            toolsDropdown.classList.remove('active');
        }
    });
    
    // Handle hash navigation from landing page
    function handleHashNavigation() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const hashPageElement = document.getElementById(`${hash}-page`);
            if (hashPageElement) {
                // Hide all pages
                document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
                // Show target page
                hashPageElement.style.display = 'block';
                // Update navigation
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                const hashNavItem = document.querySelector(`[data-page="${hash}"]`);
                if (hashNavItem) {
                    hashNavItem.classList.add('active');
                    const pageTitle = document.getElementById('pageTitle');
                    const titles = {
                        'dashboard': 'Dashboard',
                        'portfolio': 'Project Portfolio',
                        'risks': 'Risk Register',
                        'budget': 'Budget Management',
                        'timeline': 'Project Timeline',
                        'issues': 'Issues Register',
                        'volunteers': 'Volunteer Management',
                        'stakeholders': 'Stakeholder Register',
                        'monitoring': 'Project Monitoring',
                        'heatmap': 'Risk Heat Map',
                        'reports': 'Reports & Analytics'
                    };
                    if (pageTitle) {
                        pageTitle.textContent = titles[hash] || 'Dashboard';
                    }
                    
                    // Load specific data for certain pages
                    if (hash === 'monitoring') {
                        updateMonitoringDates();
                    } else if (hash === 'heatmap') {
                        setTimeout(() => {
                            if (typeof loadHeatMapData === 'function') {
                                loadHeatMapData();
                            }
                        }, 100);
                    }
                }
                // Clear hash after navigation
                window.history.replaceState(null, null, window.location.pathname);
            }
        }
    }
    
    // Handle initial hash
    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    // Sidebar toggle
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
});

// Initialize currency system when app loads
if (typeof initCurrencySystem !== 'undefined') {
    // Currency system will auto-initialize
}

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('pageTitle');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page
            pages.forEach(page => page.style.display = 'none');
            const targetPageElement = document.getElementById(`${targetPage}-page`);
            if (targetPageElement) {
                targetPageElement.style.display = 'block';
                
                // Update dates if monitoring page
                if (targetPage === 'monitoring') {
                    updateMonitoringDates();
                }
                
                // Load heat map data if heat map page
                if (targetPage === 'heatmap') {
                    loadHeatMapData();
                }
            }
            
            // Clear hash after navigation
            if (window.location.hash) {
                window.history.replaceState(null, null, ' ');
            }
            
            // Update page title
            if (pageTitle) {
                const titles = {
                    'dashboard': 'Dashboard',
                    'portfolio': 'Project Portfolio',
                    'risks': 'Risk Register',
                    'budget': 'Budget Management',
                    'timeline': 'Project Timeline',
                    'issues': 'Issues Register',
                    'volunteers': 'Volunteer Management',
                    'stakeholders': 'Stakeholder Register',
                    'monitoring': 'Project Monitoring',
                    'heatmap': 'Risk Heat Map',
                    'reports': 'Reports & Analytics'
                };
                pageTitle.textContent = titles[targetPage] || 'Dashboard';
            }
        });
    });
}

function loadDashboardData() {
    // Update currency displays
    if (typeof updateDashboardKPIs === 'function') {
        updateDashboardKPIs();
    }
    
    // Calculate and update project stats
    const totalProjects = sampleData.portfolio.length;
    const activeProjects = sampleData.portfolio.filter(p => p.status === 'Green').length;
    const atRiskProjects = sampleData.portfolio.filter(p => p.status === 'Yellow').length;
    const criticalProjects = sampleData.portfolio.filter(p => p.status === 'Red').length;
    
    // Update KPI cards
    const totalProjectsEl = document.getElementById('totalProjects');
    if (totalProjectsEl) totalProjectsEl.textContent = totalProjects;
    
    const activeProjectsEl = document.getElementById('activeProjects');
    if (activeProjectsEl) activeProjectsEl.textContent = activeProjects;
    
    const atRiskProjectsEl = document.getElementById('atRiskProjects');
    if (atRiskProjectsEl) atRiskProjectsEl.textContent = atRiskProjects;
    
    const criticalProjectsEl = document.getElementById('criticalProjects');
    if (criticalProjectsEl) criticalProjectsEl.textContent = criticalProjects;
    
    console.log('Dashboard loaded');
}

let currentFilter = 'all';
let filteredPortfolio = [...sampleData.portfolio];
// Make filteredPortfolio globally accessible for reset functions
window.filteredPortfolio = filteredPortfolio;

function filterProjects(filter) {
    currentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-filter') === filter) {
            tab.classList.add('active');
        }
    });
    
    // Filter projects
    switch(filter) {
        case 'all':
            filteredPortfolio = [...sampleData.portfolio];
            break;
        case 'accepting-volunteers':
            filteredPortfolio = sampleData.portfolio.filter(p => p.acceptingVolunteers === true);
            break;
        case 'active':
            filteredPortfolio = sampleData.portfolio.filter(p => p.status === 'Green' || p.status === 'Yellow');
            break;
        case 'at-risk':
            filteredPortfolio = sampleData.portfolio.filter(p => p.status === 'Yellow' || p.status === 'Red');
            break;
        case 'completed':
            filteredPortfolio = sampleData.portfolio.filter(p => p.status === 'Complete');
            break;
        default:
            filteredPortfolio = [...sampleData.portfolio];
    }
    
    loadPortfolioTable();
}

function searchProjects() {
    const searchTerm = document.getElementById('projectSearch').value.toLowerCase();
    
    if (!searchTerm) {
        filterProjects(currentFilter);
        return;
    }
    
    filteredPortfolio = sampleData.portfolio.filter(p => 
        p.project.toLowerCase().includes(searchTerm) ||
        p.pm.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
    
    loadPortfolioTable();
}

function loadPortfolioTable() {
    const tbody = document.getElementById('portfolioTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (filteredPortfolio.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px; color: #666;">No projects found matching your criteria.</td></tr>';
        return;
    }
    
    filteredPortfolio.forEach((item, index) => {
        const originalIndex = sampleData.portfolio.findIndex(p => p.project === item.project);
        const volunteerBadge = item.acceptingVolunteers 
            ? '<span class="volunteer-badge" title="Accepting Volunteers"><i class="fas fa-user-plus"></i></span>'
            : '';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${item.project}</strong>
                ${volunteerBadge}
                <button class="view-details-btn" onclick="viewProjectDetails(${originalIndex})" title="View Details">
                    <i class="fas fa-info-circle"></i>
                </button>
            </td>
            <td>${item.category}</td>
            <td><span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span></td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td>${item.pm}</td>
            <td>${item.priority}</td>
            <td>
                <span class="volunteer-count">${item.volunteers || 0}</span>
                ${item.acceptingVolunteers ? '<button class="btn-apply" onclick="applyAsVolunteer(' + originalIndex + ')" title="Apply as Volunteer"><i class="fas fa-hand-paper"></i></button>' : ''}
            </td>
            <td>
                <div class="action-buttons">
                    ${(window.ENV && window.ENV.demoMode) ? '' : `
                    <button class="action-btn edit" onclick="modalManager.openModal('portfolio', 'edit', ${originalIndex})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="modalManager.deleteItem('portfolio', ${originalIndex})"><i class="fas fa-trash"></i></button>
                    `}
                    ${(window.ENV && window.ENV.demoMode) ? '<span style="color: #999; font-size: 0.85em;">View Only</span>' : ''}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadPortfolioData() {
    filterProjects('all');
}

function viewProjectDetails(index) {
    const project = sampleData.portfolio[index];
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2>${project.project} - Project Details</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="project-detail-section">
                    <h3><i class="fas fa-info-circle"></i> Project Information</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Category:</label>
                            <span>${project.category}</span>
                        </div>
                        <div class="detail-item">
                            <label>Status:</label>
                            <span class="status-badge status-${project.status.toLowerCase()}">${project.status}</span>
                        </div>
                        <div class="detail-item">
                            <label>Priority:</label>
                            <span>${project.priority}</span>
                        </div>
                        <div class="detail-item">
                            <label>Project Manager:</label>
                            <span>${project.pm}</span>
                        </div>
                        <div class="detail-item">
                            <label>Start Date:</label>
                            <span>${project.startDate}</span>
                        </div>
                        <div class="detail-item">
                            <label>End Date:</label>
                            <span>${project.endDate}</span>
                        </div>
                    </div>
                </div>
                <div class="project-detail-section">
                    <h3><i class="fas fa-file-alt"></i> Project Scope</h3>
                    <p>${project.scope || 'No scope information available.'}</p>
                </div>
                <div class="project-detail-section">
                    <h3><i class="fas fa-users"></i> Team Information</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Current Volunteers:</label>
                            <span>${project.volunteers || 0}</span>
                        </div>
                        <div class="detail-item">
                            <label>Accepting Volunteers:</label>
                            <span>${project.acceptingVolunteers ? '<span style="color: green;">Yes</span>' : '<span style="color: red;">No</span>'}</span>
                        </div>
                    </div>
                    ${project.acceptingVolunteers ? '<button class="btn btn-primary" onclick="applyAsVolunteer(' + index + '); this.closest(\'.modal-overlay\').remove();" style="margin-top: 15px;"><i class="fas fa-hand-paper"></i> Apply as Volunteer</button>' : ''}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
                <button class="btn btn-primary" onclick="modalManager.openModal('portfolio', 'edit', ${index}); this.closest('.modal-overlay').remove();">Edit Project</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function applyAsVolunteer(projectIndex) {
    const project = sampleData.portfolio[projectIndex];
    if (confirm(`Apply to volunteer for "${project.project}"?\n\nYou will be notified once your application is reviewed.`)) {
        if (typeof addNotification === 'function') {
            addNotification('success',
                'Volunteer Application Submitted',
                `Application submitted for ${project.project}! The project manager will review your application.`,
                { type: 'navigate', target: '#volunteers' }
            );
        } else {
            modalManager.showNotification(`Application submitted for ${project.project}! The project manager will review your application.`);
        }
    }
}

function openProjectProposal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>Propose a New Project</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Project Name *</label>
                    <input type="text" id="proposal-project" required>
                </div>
                <div class="form-group">
                    <label>Category *</label>
                    <select id="proposal-category" required>
                        <option value="">Select Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Project Scope *</label>
                    <textarea id="proposal-scope" rows="4" required placeholder="Describe the project scope, objectives, and expected outcomes..."></textarea>
                </div>
                <div class="form-group">
                    <label>Proposed Project Manager</label>
                    <input type="text" id="proposal-pm" placeholder="Your name or suggested PM">
                </div>
                <div class="form-group">
                    <label>Estimated Duration (months)</label>
                    <input type="number" id="proposal-duration" min="1" max="24" placeholder="e.g., 6">
                </div>
                <div class="form-group">
                    <label>Justification *</label>
                    <textarea id="proposal-justification" rows="3" required placeholder="Why is this project needed? What value will it bring?"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="submitProjectProposal()">Submit Proposal</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function submitProjectProposal() {
    const project = document.getElementById('proposal-project').value;
    const category = document.getElementById('proposal-category').value;
    const scope = document.getElementById('proposal-scope').value;
    const justification = document.getElementById('proposal-justification').value;
    
    if (!project || !category || !scope || !justification) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (typeof addNotification === 'function') {
        addNotification('success',
            'Project Proposal Submitted',
            'Project proposal submitted successfully! It will be reviewed by the PMO team.',
            { type: 'navigate', target: '#portfolio' }
        );
    } else {
        modalManager.showNotification('Project proposal submitted successfully! It will be reviewed by the PMO team.');
    }
    document.querySelector('.modal-overlay').remove();
}

// Update monitoring page dates dynamically (auto-updates with current date)
function updateMonitoringDates() {
    // Refresh sample data to get current dates
    const refreshedData = initializeSampleData();
    const projects = refreshedData.portfolio.slice(0, 4); // First 4 projects for monitoring
    
    projects.forEach((project, index) => {
        const dueDateElement = document.querySelector(`#monitor-details-${index} .monitor-due-date`);
        if (dueDateElement) {
            dueDateElement.textContent = `Due: ${project.endDate}`;
        }
    });
    
    // Also update the sampleData for consistency
    sampleData.portfolio = refreshedData.portfolio;
    sampleData.timeline = refreshedData.timeline;
    sampleData.issues = refreshedData.issues;
}

// Update footer year to current year (auto-updates)
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.footer-year, [data-year]').forEach(el => {
        if (el.textContent.includes('2024') || el.textContent.includes('2025')) {
            el.textContent = el.textContent.replace(/\d{4}/, currentYear);
        }
    });
}

// Display current date in header (auto-updates)
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Set default date values for date inputs (today's date)
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    // This will be called when modals open
    window.defaultStartDate = today;
    window.defaultEndDate = getFutureDate(30); // Default end date 30 days from today
}

function loadHeatMapData() {
    // Update risk summary statistics
    const risks = sampleData.risks || [];
    const statsContainer = document.getElementById('riskSummaryStats');
    
    if (statsContainer) {
        const redRisks = risks.filter(r => r.status === 'Red').length;
        const yellowRisks = risks.filter(r => r.status === 'Yellow').length;
        const greenRisks = risks.filter(r => r.status === 'Green').length;
        const totalRisks = risks.length;
        const avgScore = risks.length > 0 
            ? (risks.reduce((sum, r) => sum + (r.score || 0), 0) / risks.length).toFixed(1)
            : 0;
        
        statsContainer.innerHTML = `
            <div class="summary-stat red">
                <span class="summary-stat-value">${redRisks}</span>
                <span class="summary-stat-label">High Risk</span>
            </div>
            <div class="summary-stat yellow">
                <span class="summary-stat-value">${yellowRisks}</span>
                <span class="summary-stat-label">Medium Risk</span>
            </div>
            <div class="summary-stat green">
                <span class="summary-stat-value">${greenRisks}</span>
                <span class="summary-stat-label">Low Risk</span>
            </div>
            <div class="summary-stat">
                <span class="summary-stat-value">${totalRisks}</span>
                <span class="summary-stat-label">Total Risks</span>
            </div>
            <div class="summary-stat">
                <span class="summary-stat-value">${avgScore}</span>
                <span class="summary-stat-label">Avg Risk Score</span>
            </div>
            <div class="summary-stat">
                <span class="summary-stat-value">${risks.filter(r => (r.score || 0) > 10).length}</span>
                <span class="summary-stat-label">Critical Risks</span>
            </div>
        `;
    }
    
    // Initialize heat map visualization
    if (typeof initializeHeatMap === 'function') {
        setTimeout(() => {
            initializeHeatMap();
        }, 100);
    }
}

function loadRisksData() {
    const tbody = document.getElementById('risksTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleData.risks.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>${item.description}</td>
            <td>${item.probability}</td>
            <td>${item.impact}</td>
            <td><strong>${item.score}</strong></td>
            <td>${item.owner}</td>
            <td><span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="modalManager.openModal('risks', 'edit', ${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="modalManager.deleteItem('risks', ${index})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadBudgetData() {
    const tbody = document.getElementById('budgetTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleData.budget.forEach((item, index) => {
        const varianceClass = item.variance < 0 ? 'status-green' : 'status-red';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.description}</td>
            <td>${window.formatCurrency ? window.formatCurrency(item.estimated) : '$' + item.estimated.toLocaleString()}</td>
            <td>${window.formatCurrency ? window.formatCurrency(item.actual) : '$' + item.actual.toLocaleString()}</td>
            <td><span class="status-badge ${varianceClass}">${window.formatCurrency ? window.formatCurrency(item.variance) : '$' + item.variance.toLocaleString()}</span></td>
            <td><span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="modalManager.openModal('budget', 'edit', ${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="modalManager.deleteItem('budget', ${index})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add total row
    const totalRow = document.createElement('tr');
    const totalEstimated = sampleData.budget.reduce((sum, item) => sum + item.estimated, 0);
    const totalActual = sampleData.budget.reduce((sum, item) => sum + item.actual, 0);
    const totalVariance = totalActual - totalEstimated;
    totalRow.innerHTML = `
        <td><strong>TOTAL</strong></td>
        <td></td>
        <td><strong>${window.formatCurrency ? window.formatCurrency(totalEstimated) : '$' + totalEstimated.toLocaleString()}</strong></td>
        <td><strong>${window.formatCurrency ? window.formatCurrency(totalActual) : '$' + totalActual.toLocaleString()}</strong></td>
        <td><strong>${window.formatCurrency ? window.formatCurrency(totalVariance) : '$' + totalVariance.toLocaleString()}</strong></td>
        <td></td>
        <td></td>
    `;
    tbody.appendChild(totalRow);
}

function loadTimelineData() {
    const tbody = document.getElementById('timelineTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleData.timeline.forEach((item, index) => {
        const statusClass = item.status === 'Complete' ? 'status-green' : 
                           item.status === 'In Progress' ? 'status-blue' : 'status-yellow';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.task}</strong></td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td>${item.duration} days</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="modalManager.openModal('timeline', 'edit', ${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="modalManager.deleteItem('timeline', ${index})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadIssuesData() {
    const tbody = document.getElementById('issuesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleData.issues.forEach((item, index) => {
        const dueDate = new Date(item.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today && item.status !== 'Closed';
        const row = document.createElement('tr');
        row.style.backgroundColor = isOverdue ? '#ffe6e6' : '';
        row.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>${item.description}</td>
            <td>${item.impact}</td>
            <td>${item.owner}</td>
            <td>${item.dueDate} ${isOverdue ? '<span style="color: red;">⚠️</span>' : ''}</td>
            <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="modalManager.openModal('issues', 'edit', ${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="modalManager.deleteItem('issues', ${index})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadVolunteersData() {
    const tbody = document.getElementById('volunteersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleData.volunteers.forEach((item, index) => {
        const scoreClass = item.score >= 80 ? 'status-green' : 
                          item.score >= 50 ? 'status-yellow' : 'status-red';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.skill}</td>
            <td>${item.level}</td>
            <td>${item.availability}</td>
            <td><span class="status-badge ${scoreClass}">${item.score ? item.score.toFixed(1) : '0.0'}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="modalManager.openModal('volunteers', 'edit', ${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="modalManager.deleteItem('volunteers', ${index})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadStakeholdersData() {
    const tbody = document.getElementById('stakeholdersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Limit items in demo mode
    let displayData = sampleData.stakeholders;
    if (window.ENV && window.ENV.demoMode && window.ENV.config.maxItems) {
        displayData = sampleData.stakeholders.slice(0, window.ENV.config.maxItems);
    }
    
    const isDemoMode = window.ENV && window.ENV.demoMode;
    displayData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.role}</td>
            <td>${item.influence}</td>
            <td>${item.interest}</td>
            <td>${item.strategy}</td>
            <td>
                <div class="action-buttons">
                    ${isDemoMode ? '' : `
                    <button class="action-btn edit" onclick="modalManager.openModal('stakeholders', 'edit', ${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="modalManager.deleteItem('stakeholders', ${index})"><i class="fas fa-trash"></i></button>
                    `}
                    ${isDemoMode ? '<span style="color: #999; font-size: 0.85em;">View Only</span>' : ''}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Wire up all "New" buttons
function initializeButtons() {
    // Portfolio
    const portfolioBtn = document.querySelector('#portfolio-page .btn-primary');
    if (portfolioBtn) {
        portfolioBtn.onclick = () => modalManager.openModal('portfolio', 'create');
    }
    
    // Risks
    const risksBtn = document.querySelector('#risks-page .btn-primary');
    if (risksBtn) {
        risksBtn.onclick = () => modalManager.openModal('risks', 'create');
    }
    
    // Budget
    const budgetBtn = document.querySelector('#budget-page .btn-primary');
    if (budgetBtn) {
        budgetBtn.onclick = () => modalManager.openModal('budget', 'create');
    }
    
    // Timeline
    const timelineBtn = document.querySelector('#timeline-page .btn-primary');
    if (timelineBtn) {
        timelineBtn.onclick = () => modalManager.openModal('timeline', 'create');
    }
    
    // Issues
    const issuesBtn = document.querySelector('#issues-page .btn-primary');
    if (issuesBtn) {
        issuesBtn.onclick = () => modalManager.openModal('issues', 'create');
    }
    
    // Volunteers
    const volunteersBtn = document.querySelector('#volunteers-page .btn-primary');
    if (volunteersBtn) {
        volunteersBtn.onclick = () => modalManager.openModal('volunteers', 'create');
    }
    
    // Stakeholders
    const stakeholdersBtn = document.querySelector('#stakeholders-page .btn-primary');
    if (stakeholdersBtn) {
        stakeholdersBtn.onclick = () => modalManager.openModal('stakeholders', 'create');
    }
    
    // Monitoring
    const monitoringBtn = document.querySelector('#monitoring-page .btn-primary');
    if (monitoringBtn) {
        monitoringBtn.onclick = () => {
            // Navigate to portfolio to create new project
            const portfolioNav = document.querySelector('[data-page="portfolio"]');
            if (portfolioNav) {
                portfolioNav.click();
                setTimeout(() => {
                    const portfolioBtn = document.querySelector('#portfolio-page .btn-primary');
                    if (portfolioBtn) portfolioBtn.click();
                }, 100);
            }
        };
    }
}

