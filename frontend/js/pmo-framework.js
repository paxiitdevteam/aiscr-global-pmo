/**
 * AISCR Global PMO - PMO Framework & Standards Module
 * 
 * Displays PMO governance structure, 8 project standards, and process flows
 */

// PMO Framework Data
const pmoFrameworkData = {
    charter: {
        title: "PMO Charter",
        description: "AISCR Global is building a unified Project Management Office to guide all projects under its continental mandate. The PMO creates one structured system for planning, delivery, risk control, volunteer engagement, and documentation.",
        purpose: "Provide one structured way of working, support every team, improve delivery, and strengthen results across the continent."
    },
    standards: [
        {
            id: 1,
            name: "Project Initiation Standards",
            description: "Defines how projects are formally initiated, including project intake, approval processes, and initiation package requirements.",
            keyRequirements: [
                "Formal project intake process",
                "10-criteria scoring matrix evaluation",
                "Project initiation package preparation",
                "Portfolio registration",
                "PM and Analyst assignment"
            ],
            relatedModules: ["portfolio", "project-intake"],
            icon: "fa-rocket"
        },
        {
            id: 2,
            name: "Project Planning Standards",
            description: "Establishes requirements for comprehensive project planning, including scope definition, resource planning, and timeline development.",
            keyRequirements: [
                "Scope document creation",
                "Work Breakdown Structure (WBS)",
                "Resource allocation planning",
                "Timeline and milestone definition",
                "Budget planning"
            ],
            relatedModules: ["portfolio", "timeline", "budget"],
            icon: "fa-tasks"
        },
        {
            id: 3,
            name: "Execution Standards",
            description: "Defines how approved plans are delivered, including weekly reporting, issue management, and change control processes.",
            keyRequirements: [
                "Weekly status reporting (Friday submissions)",
                "Monthly dashboard generation",
                "Issue management and escalation",
                "Change control process",
                "Stakeholder engagement"
            ],
            relatedModules: ["monitoring", "issues", "change-requests"],
            icon: "fa-cogs"
        },
        {
            id: 4,
            name: "Monitoring and Control Standards",
            description: "Establishes project monitoring requirements, including status tracking, performance measurement, and control mechanisms.",
            keyRequirements: [
                "Regular status reviews",
                "Performance metrics tracking",
                "Variance analysis",
                "Corrective action management",
                "Progress reporting"
            ],
            relatedModules: ["monitoring", "portfolio", "reports"],
            icon: "fa-chart-line"
        },
        {
            id: 5,
            name: "Risk Management Standards",
            description: "Defines comprehensive risk management processes, including risk identification, assessment, mitigation, and monitoring.",
            keyRequirements: [
                "Risk register maintenance",
                "Risk scoring (Probability × Impact)",
                "Risk heat map visualization",
                "Mitigation plan development",
                "Risk review and monitoring"
            ],
            relatedModules: ["risks", "heatmap"],
            icon: "fa-exclamation-triangle"
        },
        {
            id: 6,
            name: "Technical Review Standards (CCPS-Aligned)",
            description: "CCPS-aligned technical review procedures ensuring accuracy, quality, and validation of project deliverables.",
            keyRequirements: [
                "Review checkpoint definition",
                "Quality gate requirements",
                "Reviewer assignment",
                "Review outcomes (Pass/Fail/Conditional)",
                "Deliverable blocking until review passed"
            ],
            relatedModules: ["technical-reviews", "stage-gate"],
            icon: "fa-clipboard-check"
        },
        {
            id: 7,
            name: "Stakeholder Engagement Standards",
            description: "Defines stakeholder management and engagement processes, including communication plans and relationship management.",
            keyRequirements: [
                "Stakeholder identification and analysis",
                "Influence/Interest matrix",
                "Engagement strategy development",
                "Communication planning",
                "Stakeholder relationship tracking"
            ],
            relatedModules: ["stakeholders"],
            icon: "fa-handshake"
        },
        {
            id: 8,
            name: "Project Closure Standards",
            description: "Establishes project closure requirements, including final reporting, lessons learned, and knowledge transfer.",
            keyRequirements: [
                "Final project report",
                "Lessons learned documentation",
                "Knowledge transfer completion",
                "Resource release",
                "Project archive"
            ],
            relatedModules: ["reports", "lessons-learned"],
            icon: "fa-flag-checkered"
        }
    ],
    governance: {
        structure: "The PMO provides governance over every project and ensures alignment with AISCR strategy.",
        roles: [
            {
                role: "PMO Director",
                responsibility: "Overall PMO governance, strategic alignment, and decision-making"
            },
            {
                role: "Project Manager (PM)",
                responsibility: "Project execution, team coordination, and delivery"
            },
            {
                role: "Project Analyst",
                responsibility: "Data analysis, reporting, and project support"
            },
            {
                role: "Subject Matter Expert (SME)",
                responsibility: "Technical expertise and domain knowledge"
            },
            {
                role: "Volunteer",
                responsibility: "Project contributions and task execution"
            }
        ]
    },
    processFlows: [
        {
            name: "Project Lifecycle",
            steps: ["Initiation", "Planning", "Execution", "Monitoring & Control", "Closure"],
            description: "Standard project lifecycle from idea to completion"
        },
        {
            name: "Project Intake Process",
            steps: ["Idea Submission", "Screening", "Scoring (10-criteria)", "Decision", "Initiation Package", "Portfolio Registration"],
            description: "Formal process for submitting and approving new projects"
        },
        {
            name: "Execution Workflow",
            steps: ["Weekly Reporting", "Issue Management", "Change Control", "Technical Reviews", "Monthly Dashboard"],
            description: "Ongoing project execution and monitoring workflow"
        }
    ]
};

// Load PMO Framework Page
function loadPMOFrameworkData() {
    displayStandards();
    displayGovernance();
    displayProcessFlows();
    displayQuickReference();
}

// Display 8 Project Standards
function displayStandards() {
    const container = document.getElementById('standards-container');
    if (!container) return;

    container.innerHTML = pmoFrameworkData.standards.map(standard => {
        const relatedModulesHTML = standard.relatedModules.map(module => {
            const moduleNames = {
                'portfolio': 'Portfolio',
                'project-intake': 'Project Intake',
                'timeline': 'Timeline',
                'budget': 'Budget',
                'monitoring': 'Monitoring',
                'issues': 'Issues',
                'change-requests': 'Change Requests',
                'risks': 'Risks',
                'heatmap': 'Risk Heat Map',
                'technical-reviews': 'Technical Reviews',
                'stage-gate': 'Stage-Gate',
                'stakeholders': 'Stakeholders',
                'reports': 'Reports',
                'lessons-learned': 'Lessons Learned'
            };
            return `<span class="module-badge" onclick="navigateToModule('${module}')">${moduleNames[module] || module}</span>`;
        }).join('');

        return `
            <div class="standard-card" style="margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #2EC4B6;">
                <div style="display: flex; align-items: start; gap: 15px;">
                    <div style="font-size: 2em; color: #2EC4B6; min-width: 50px; text-align: center;">
                        <i class="fas ${standard.icon}"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: #1F4E78; margin-bottom: 10px; font-size: 1.2em;">
                            ${standard.id}. ${standard.name}
                        </h4>
                        <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
                            ${standard.description}
                        </p>
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #1F4E78; display: block; margin-bottom: 8px;">Key Requirements:</strong>
                            <ul style="margin-left: 20px; color: #666; line-height: 1.8;">
                                ${standard.keyRequirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <strong style="color: #1F4E78; display: block; margin-bottom: 8px;">Related Modules:</strong>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${relatedModulesHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add CSS for module badges
    if (!document.getElementById('pmo-framework-styles')) {
        const style = document.createElement('style');
        style.id = 'pmo-framework-styles';
        style.textContent = `
            .module-badge {
                display: inline-block;
                padding: 5px 12px;
                background: #1F4E78;
                color: white;
                border-radius: 5px;
                font-size: 0.85em;
                cursor: pointer;
                transition: all 0.3s;
            }
            .module-badge:hover {
                background: #2EC4B6;
                transform: translateY(-2px);
            }
            .standard-card {
                transition: transform 0.3s, box-shadow 0.3s;
            }
            .standard-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
    }
}

// Display Governance Structure
function displayGovernance() {
    const container = document.getElementById('governance-container');
    if (!container) return;

    container.innerHTML = `
        <p style="line-height: 1.8; color: #555; margin-bottom: 20px;">
            ${pmoFrameworkData.governance.structure}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            ${pmoFrameworkData.governance.roles.map(role => `
                <div style="padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd;">
                    <h5 style="color: #1F4E78; margin-bottom: 8px; font-size: 1.1em;">
                        <i class="fas fa-user-tie"></i> ${role.role}
                    </h5>
                    <p style="color: #666; font-size: 0.9em; line-height: 1.6;">
                        ${role.responsibility}
                    </p>
                </div>
            `).join('')}
        </div>
    `;
}

// Display Process Flows
function displayProcessFlows() {
    const container = document.getElementById('process-flows-container');
    if (!container) return;

    container.innerHTML = pmoFrameworkData.processFlows.map(flow => `
        <div style="margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
            <h4 style="color: #1F4E78; margin-bottom: 10px;">
                <i class="fas fa-route"></i> ${flow.name}
            </h4>
            <p style="color: #666; margin-bottom: 15px; font-size: 0.9em;">
                ${flow.description}
            </p>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                ${flow.steps.map((step, index) => `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="padding: 8px 15px; background: #1F4E78; color: white; border-radius: 5px; font-weight: 600; font-size: 0.9em;">
                            ${step}
                        </div>
                        ${index < flow.steps.length - 1 ? '<i class="fas fa-arrow-right" style="color: #2EC4B6;"></i>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Display Quick Reference
function displayQuickReference() {
    const container = document.getElementById('quick-reference-container');
    if (!container) return;

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
            <div style="padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd; cursor: pointer;" onclick="navigateToModule('portfolio')">
                <i class="fas fa-briefcase" style="color: #2EC4B6; font-size: 1.5em; margin-bottom: 10px;"></i>
                <h5 style="color: #1F4E78; margin-bottom: 5px;">Portfolio Management</h5>
                <p style="color: #666; font-size: 0.85em;">View all projects</p>
            </div>
            <div style="padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd; cursor: pointer;" onclick="navigateToModule('risks')">
                <i class="fas fa-exclamation-triangle" style="color: #2EC4B6; font-size: 1.5em; margin-bottom: 10px;"></i>
                <h5 style="color: #1F4E78; margin-bottom: 5px;">Risk Management</h5>
                <p style="color: #666; font-size: 0.85em;">Manage project risks</p>
            </div>
            <div style="padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd; cursor: pointer;" onclick="navigateToModule('budget')">
                <i class="fas fa-dollar-sign" style="color: #2EC4B6; font-size: 1.5em; margin-bottom: 10px;"></i>
                <h5 style="color: #1F4E78; margin-bottom: 5px;">Budget Management</h5>
                <p style="color: #666; font-size: 0.85em;">Track project budgets</p>
            </div>
            <div style="padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd; cursor: pointer;" onclick="navigateToModule('monitoring')">
                <i class="fas fa-tasks" style="color: #2EC4B6; font-size: 1.5em; margin-bottom: 10px;"></i>
                <h5 style="color: #1F4E78; margin-bottom: 5px;">Project Monitoring</h5>
                <p style="color: #666; font-size: 0.85em;">Monitor project status</p>
            </div>
        </div>
    `;
}

// Navigate to related module
function navigateToModule(moduleName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    
    // Show target module page
    const targetPage = document.getElementById(`${moduleName}-page`);
    if (targetPage) {
        targetPage.style.display = 'block';
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        const navItem = document.querySelector(`[data-page="${moduleName}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }
        
        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            const titles = {
                'portfolio': 'Project Portfolio',
                'risks': 'Risk Register',
                'budget': 'Budget Management',
                'monitoring': 'Project Monitoring',
                'timeline': 'Project Timeline',
                'issues': 'Issues Register',
                'stakeholders': 'Stakeholder Register',
                'volunteers': 'Volunteer Management',
                'reports': 'Reports & Analytics'
            };
            pageTitle.textContent = titles[moduleName] || 'Dashboard';
        }
        
        // Load module-specific data if needed
        if (moduleName === 'monitoring') {
            if (typeof updateMonitoringDates === 'function') {
                updateMonitoringDates();
            }
        }
        if (moduleName === 'heatmap') {
            if (typeof loadHeatMapData === 'function') {
                loadHeatMapData();
            }
        }
    } else {
        // Module not implemented yet - show coming soon
        if (typeof showComingSoon === 'function') {
            showComingSoon(moduleName);
        }
    }
}

// Make function globally available
window.loadPMOFrameworkData = loadPMOFrameworkData;
window.navigateToModule = navigateToModule;

