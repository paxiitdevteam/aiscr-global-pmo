// Modal Management System
class ModalManager {
    constructor() {
        this.currentModal = null;
        this.currentData = null;
        this.currentIndex = null;
        this.currentModule = null;
    }

    openModal(module, action = 'create', index = null) {
        this.currentModule = module;
        this.currentAction = action;
        this.currentIndex = index;
        
        // Get data if editing
        if (action === 'edit' && index !== null) {
            this.currentData = JSON.parse(JSON.stringify(sampleData[module][index]));
        } else {
            this.currentData = this.getDefaultData(module);
        }
        
        // Create and show modal
        const modal = this.createModal(module, action);
        document.body.appendChild(modal);
        this.currentModal = modal;
        modal.style.display = 'flex';
        
        // Fill form if editing, otherwise set default dates
        if (action === 'edit') {
            this.fillForm(module, this.currentData);
        } else {
            // Set default dates for new items
            setTimeout(() => this.setDefaultDates(module), 10);
        }
    }

    closeModal() {
        if (this.currentModal) {
            this.currentModal.remove();
            this.currentModal = null;
            this.currentData = null;
            this.currentIndex = null;
        }
    }

    getDefaultData(module) {
        const defaults = {
            portfolio: { project: "", category: "", status: "Green", startDate: "", endDate: "", pm: "", priority: 1, acceptingVolunteers: false, volunteers: 0, scope: "" },
            risks: { id: "", description: "", probability: 1, impact: 1, owner: "", mitigation: "", status: "Green", score: 0 },
            budget: { category: "", description: "", estimated: 0, actual: 0, notes: "" },
            timeline: { task: "", startDate: "", endDate: "", status: "Not Started" },
            issues: { id: "", description: "", impact: "Low", owner: "", dueDate: "", status: "Open", notes: "" },
            volunteers: { name: "", skill: "", level: "Intermediate", availability: "Part-time", notes: "" },
            stakeholders: { name: "", role: "", influence: "Medium", interest: "Medium", strategy: "" }
        };
        return defaults[module] || {};
    }

    createModal(module, action) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${action === 'create' ? 'Create New' : 'Edit'} ${this.getModuleName(module)}</h2>
                    <button class="modal-close" onclick="modalManager.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.getFormHTML(module)}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="modalManager.closeModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="modalManager.saveData('${module}')">
                        ${action === 'create' ? 'Create' : 'Update'}
                    </button>
                </div>
            </div>
        `;
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        return modal;
    }

    getModuleName(module) {
        const names = {
            portfolio: 'Project',
            risks: 'Risk',
            budget: 'Budget Item',
            timeline: 'Task',
            issues: 'Issue',
            volunteers: 'Volunteer',
            stakeholders: 'Stakeholder'
        };
        return names[module] || module;
    }

    getFormHTML(module) {
        const forms = {
            portfolio: `
                <div class="form-group">
                    <label>Project Name *</label>
                    <input type="text" id="form-project" required>
                </div>
                <div class="form-group">
                    <label>Category *</label>
                    <select id="form-category" required>
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
                    <textarea id="form-scope" rows="4" required placeholder="Describe the project scope, objectives, and expected outcomes..."></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Status *</label>
                        <select id="form-status" required>
                            <option value="Green">Green</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Red">Red</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Priority *</label>
                        <select id="form-priority" required>
                            <option value="1">1 - Highest</option>
                            <option value="2">2 - High</option>
                            <option value="3">3 - Medium</option>
                            <option value="4">4 - Low</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date *</label>
                        <input type="date" id="form-startDate" required>
                    </div>
                    <div class="form-group">
                        <label>End Date *</label>
                        <input type="date" id="form-endDate" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Project Manager *</label>
                    <input type="text" id="form-pm" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Accepting Volunteers</label>
                        <select id="form-acceptingVolunteers">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Current Volunteers</label>
                        <input type="number" id="form-volunteers" min="0" value="0">
                    </div>
                </div>
            `,
            risks: `
                <div class="form-group">
                    <label>Risk ID *</label>
                    <input type="text" id="form-id" required placeholder="R001">
                </div>
                <div class="form-group">
                    <label>Description *</label>
                    <textarea id="form-description" rows="3" required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Probability (1-5) *</label>
                        <input type="number" id="form-probability" min="1" max="5" required>
                    </div>
                    <div class="form-group">
                        <label>Impact (1-5) *</label>
                        <input type="number" id="form-impact" min="1" max="5" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Owner *</label>
                    <input type="text" id="form-owner" required>
                </div>
                <div class="form-group">
                    <label>Mitigation Strategy</label>
                    <textarea id="form-mitigation" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Status *</label>
                    <select id="form-status" required>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Red">Red</option>
                    </select>
                </div>
            `,
            budget: `
                <div class="form-group">
                    <label>Category *</label>
                    <select id="form-category" required>
                        <option value="">Select Category</option>
                        <option value="Personnel">Personnel</option>
                        <option value="Technology">Technology</option>
                        <option value="Operations">Operations</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Description *</label>
                    <input type="text" id="form-description" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Estimated Cost ($) *</label>
                        <input type="number" id="form-estimated" min="0" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>Actual Cost ($)</label>
                        <input type="number" id="form-actual" min="0" step="0.01" value="0">
                    </div>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea id="form-notes" rows="3"></textarea>
                </div>
            `,
            timeline: `
                <div class="form-group">
                    <label>Task Name *</label>
                    <input type="text" id="form-task" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date *</label>
                        <input type="date" id="form-startDate" required>
                    </div>
                    <div class="form-group">
                        <label>End Date *</label>
                        <input type="date" id="form-endDate" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Status *</label>
                    <select id="form-status" required>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Complete">Complete</option>
                    </select>
                </div>
            `,
            issues: `
                <div class="form-group">
                    <label>Issue ID *</label>
                    <input type="text" id="form-id" required placeholder="I001">
                </div>
                <div class="form-group">
                    <label>Description *</label>
                    <textarea id="form-description" rows="3" required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Impact *</label>
                        <select id="form-impact" required>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Owner *</label>
                        <input type="text" id="form-owner" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Due Date *</label>
                        <input type="date" id="form-dueDate" required>
                    </div>
                    <div class="form-group">
                        <label>Status *</label>
                        <select id="form-status" required>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea id="form-notes" rows="3"></textarea>
                </div>
            `,
            volunteers: `
                <div class="form-group">
                    <label>Volunteer Name *</label>
                    <input type="text" id="form-name" required>
                </div>
                <div class="form-group">
                    <label>Skill *</label>
                    <input type="text" id="form-skill" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Level *</label>
                        <select id="form-level" required>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Availability *</label>
                        <select id="form-availability" required>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="On-call">On-call</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea id="form-notes" rows="3"></textarea>
                </div>
            `,
            stakeholders: `
                <div class="form-group">
                    <label>Stakeholder Name *</label>
                    <input type="text" id="form-name" required>
                </div>
                <div class="form-group">
                    <label>Role *</label>
                    <input type="text" id="form-role" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Influence *</label>
                        <select id="form-influence" required>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Interest *</label>
                        <select id="form-interest" required>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Engagement Strategy *</label>
                    <textarea id="form-strategy" rows="3" required></textarea>
                </div>
            `
        };
        return forms[module] || '';
    }

    fillForm(module, data) {
        const fieldMap = {
            portfolio: { 'form-project': 'project', 'form-category': 'category', 'form-status': 'status', 
                         'form-priority': 'priority', 'form-startDate': 'startDate', 'form-endDate': 'endDate', 
                         'form-pm': 'pm', 'form-scope': 'scope', 'form-acceptingVolunteers': 'acceptingVolunteers', 'form-volunteers': 'volunteers' },
            risks: { 'form-id': 'id', 'form-description': 'description', 'form-probability': 'probability', 
                    'form-impact': 'impact', 'form-owner': 'owner', 'form-mitigation': 'mitigation', 'form-status': 'status' },
            budget: { 'form-category': 'category', 'form-description': 'description', 'form-estimated': 'estimated', 
                    'form-actual': 'actual', 'form-notes': 'notes' },
            timeline: { 'form-task': 'task', 'form-startDate': 'startDate', 'form-endDate': 'endDate', 'form-status': 'status' },
            issues: { 'form-id': 'id', 'form-description': 'description', 'form-impact': 'impact', 
                     'form-owner': 'owner', 'form-dueDate': 'dueDate', 'form-status': 'status', 'form-notes': 'notes' },
            volunteers: { 'form-name': 'name', 'form-skill': 'skill', 'form-level': 'level', 
                         'form-availability': 'availability', 'form-notes': 'notes' },
            stakeholders: { 'form-name': 'name', 'form-role': 'role', 'form-influence': 'influence', 
                          'form-interest': 'interest', 'form-strategy': 'strategy' }
        };

        const mapping = fieldMap[module];
        for (const [formId, dataKey] of Object.entries(mapping)) {
            const element = document.getElementById(formId);
            if (element && data[dataKey] !== undefined) {
                if (element.tagName === 'SELECT' && (dataKey === 'acceptingVolunteers')) {
                    element.value = data[dataKey] ? 'true' : 'false';
                } else {
                    element.value = data[dataKey];
                }
            }
        }
    }

    saveData(module) {
        const form = this.currentModal.querySelector('.modal-body');
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        // Validate required fields
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#FF0000';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }

        // Collect form data
        const newData = this.collectFormData(module);
        
        // Calculate derived fields
        if (module === 'risks') {
            newData.score = newData.probability * newData.impact;
        }
        if (module === 'budget') {
            newData.variance = newData.actual - newData.estimated;
            newData.status = newData.variance < 0 ? 'Green' : 'Red';
        }
        if (module === 'timeline') {
            const start = new Date(newData.startDate);
            const end = new Date(newData.endDate);
            newData.duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        }

        // Save to data
        if (this.currentAction === 'create') {
            sampleData[module].push(newData);
        } else {
            sampleData[module][this.currentIndex] = newData;
        }

        // Reload table
        this.reloadTable(module);
        this.closeModal();
        
        // Show success message
        const action = this.currentAction === 'create' ? 'created' : 'updated';
        if (typeof addNotification === 'function') {
            addNotification('success', 
                `${this.getModuleName(module)} ${action} successfully!`,
                `The ${this.getModuleName(module).toLowerCase()} has been ${action} successfully.`,
                { type: 'navigate', target: `#${module}` }
            );
        } else {
            this.showNotification(`${this.getModuleName(module)} ${action} successfully!`);
        }
    }

    collectFormData(module) {
        const data = {};
        const fieldMap = {
            portfolio: { 'form-project': 'project', 'form-category': 'category', 'form-status': 'status', 
                         'form-priority': 'priority', 'form-startDate': 'startDate', 'form-endDate': 'endDate', 
                         'form-pm': 'pm', 'form-scope': 'scope', 'form-acceptingVolunteers': 'acceptingVolunteers', 'form-volunteers': 'volunteers' },
            risks: { 'form-id': 'id', 'form-description': 'description', 'form-probability': 'probability', 
                    'form-impact': 'impact', 'form-owner': 'owner', 'form-mitigation': 'mitigation', 'form-status': 'status' },
            budget: { 'form-category': 'category', 'form-description': 'description', 'form-estimated': 'estimated', 
                     'form-actual': 'actual', 'form-notes': 'notes' },
            timeline: { 'form-task': 'task', 'form-startDate': 'startDate', 'form-endDate': 'endDate', 'form-status': 'status' },
            issues: { 'form-id': 'id', 'form-description': 'description', 'form-impact': 'impact', 
                     'form-owner': 'owner', 'form-dueDate': 'dueDate', 'form-status': 'status', 'form-notes': 'notes' },
            volunteers: { 'form-name': 'name', 'form-skill': 'skill', 'form-level': 'level', 
                         'form-availability': 'availability', 'form-notes': 'notes' },
            stakeholders: { 'form-name': 'name', 'form-role': 'role', 'form-influence': 'influence', 
                          'form-interest': 'interest', 'form-strategy': 'strategy' }
        };

        const mapping = fieldMap[module];
        for (const [formId, dataKey] of Object.entries(mapping)) {
            const element = document.getElementById(formId);
            if (element) {
                if (element.type === 'number') {
                    data[dataKey] = parseFloat(element.value) || 0;
                } else if (element.type === 'checkbox') {
                    data[dataKey] = element.checked;
                } else if (element.tagName === 'SELECT' && (dataKey === 'acceptingVolunteers')) {
                    data[dataKey] = element.value === 'true';
                } else {
                    data[dataKey] = element.value.trim();
                }
            }
        }

        // Set defaults for volunteers
        if (module === 'volunteers') {
            data.score = 0; // Will be calculated later
        }

        return data;
    }

    reloadTable(module) {
        const loadFunctions = {
            portfolio: loadPortfolioData,
            risks: loadRisksData,
            budget: loadBudgetData,
            timeline: loadTimelineData,
            issues: loadIssuesData,
            volunteers: loadVolunteersData,
            stakeholders: loadStakeholdersData
        };
        
        if (loadFunctions[module]) {
            loadFunctions[module]();
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    deleteItem(module, index) {
        if (confirm(`Are you sure you want to delete this ${this.getModuleName(module)}?`)) {
            sampleData[module].splice(index, 1);
            this.reloadTable(module);
            if (typeof addNotification === 'function') {
                addNotification('success',
                    `${this.getModuleName(module)} deleted successfully!`,
                    `The ${this.getModuleName(module).toLowerCase()} has been removed from the system.`
                );
            } else {
                this.showNotification(`${this.getModuleName(module)} deleted successfully!`);
            }
        }
    }
    
    setDefaultDates(module) {
        const today = new Date().toISOString().split('T')[0];
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        const futureDateStr = futureDate.toISOString().split('T')[0];
        
        // Set default dates for date inputs
        const startDateInput = document.getElementById('form-startDate');
        const endDateInput = document.getElementById('form-endDate');
        const dueDateInput = document.getElementById('form-dueDate');
        
        if (startDateInput && !startDateInput.value) {
            startDateInput.value = today;
        }
        if (endDateInput && !endDateInput.value) {
            endDateInput.value = futureDateStr;
        }
        if (dueDateInput && !dueDateInput.value) {
            dueDateInput.value = futureDateStr;
        }
    }
}

// Initialize modal manager
const modalManager = new ModalManager();

