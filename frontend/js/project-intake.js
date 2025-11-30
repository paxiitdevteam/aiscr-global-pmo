/**
 * AISCR Global PMO - Project Intake System
 * 
 * Handles project intake form submission, intake register, screening, scoring, and decision workflow
 */

// Intake Data Storage (using localStorage for now, will migrate to backend)
const INTAKE_STORAGE_KEY = 'pmo_intake_submissions';
const INTAKE_DRAFT_KEY = 'pmo_intake_draft';

// Intake Workflow Stages
const INTAKE_STAGES = {
    SUBMITTED: 'Submitted',
    SCREENING: 'Screening',
    SCORING: 'Scoring',
    DECISION: 'Decision',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    DEFERRED: 'Deferred',
    CONDITIONAL: 'Conditional'
};

// 10-Criteria Scoring Matrix
const SCORING_CRITERIA = [
    { id: 1, name: 'Strategic Alignment', maxScore: 5 },
    { id: 2, name: 'Resource Availability', maxScore: 5 },
    { id: 3, name: 'Technical Feasibility', maxScore: 5 },
    { id: 4, name: 'Financial Viability', maxScore: 5 },
    { id: 5, name: 'Risk Assessment', maxScore: 5 },
    { id: 6, name: 'Stakeholder Support', maxScore: 5 },
    { id: 7, name: 'Timeline Realism', maxScore: 5 },
    { id: 8, name: 'Impact Potential', maxScore: 5 },
    { id: 9, name: 'Organizational Capacity', maxScore: 5 },
    { id: 10, name: 'Compliance Requirements', maxScore: 5 }
];

const APPROVAL_THRESHOLD = 35; // Minimum score out of 50

// 10 Screening Questions
const SCREENING_QUESTIONS = [
    { id: 1, question: 'Does this project align with AISCR Global strategic objectives?', category: 'Strategic Alignment' },
    { id: 2, question: 'Are required resources (human, financial, technical) available or obtainable?', category: 'Resource Availability' },
    { id: 3, question: 'Is the project technically feasible with current or available technology?', category: 'Technical Feasibility' },
    { id: 4, question: 'Is the project financially viable and within budget constraints?', category: 'Financial Viability' },
    { id: 5, question: 'Are project risks acceptable and manageable?', category: 'Risk Assessment' },
    { id: 6, question: 'Is there adequate stakeholder support and buy-in?', category: 'Stakeholder Support' },
    { id: 7, question: 'Is the proposed timeline realistic and achievable?', category: 'Timeline Realism' },
    { id: 8, question: 'Will this project deliver meaningful impact and value?', category: 'Impact Potential' },
    { id: 9, question: 'Does the organization have capacity to execute this project?', category: 'Organizational Capacity' },
    { id: 10, question: 'Does the project meet all compliance and regulatory requirements?', category: 'Compliance Requirements' }
];

const SCREENING_FAIL_THRESHOLD = 3; // Fail if 3+ questions answered "No"

// Initialize Intake System
function initIntakeSystem() {
    loadIntakeDraft();
    setupIntakeForm();
    loadIntakeRegister();
}

// Setup Intake Form
function setupIntakeForm() {
    const form = document.getElementById('project-intake-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitIntakeForm();
    });

    // Auto-save draft on input
    const formInputs = form.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            saveIntakeDraft();
        });
    });
}

// Save Intake Draft
function saveIntakeDraft() {
    const form = document.getElementById('project-intake-form');
    if (!form) return;

    const formData = new FormData(form);
    const draft = {};
    for (let [key, value] of formData.entries()) {
        draft[key] = value;
    }
    
    localStorage.setItem(INTAKE_DRAFT_KEY, JSON.stringify(draft));
    console.log('✅ Draft saved');
}

// Load Intake Draft
function loadIntakeDraft() {
    const draft = localStorage.getItem(INTAKE_DRAFT_KEY);
    if (!draft) return;

    try {
        const draftData = JSON.parse(draft);
        const form = document.getElementById('project-intake-form');
        if (!form) return;

        Object.keys(draftData).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = draftData[key];
            }
        });

        console.log('✅ Draft loaded');
    } catch (error) {
        console.error('Error loading draft:', error);
    }
}

// Submit Intake Form
function submitIntakeForm() {
    const form = document.getElementById('project-intake-form');
    if (!form) return;

    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const submission = {
        id: generateIntakeId(),
        projectName: formData.get('projectName'),
        projectDescription: formData.get('projectDescription'),
        strategicPillar: formData.get('strategicPillar'),
        countryRegion: formData.get('countryRegion'),
        projectCategory: formData.get('projectCategory') || '',
        estimatedBudget: parseFloat(formData.get('estimatedBudget')) || 0,
        estimatedDuration: parseInt(formData.get('estimatedDuration')) || 0,
        submittedBy: formData.get('submittedBy'),
        submissionDate: new Date().toISOString(),
        status: INTAKE_STAGES.SUBMITTED,
        currentStage: 'Intake',
        score: null,
        screeningResults: null,
        scoringResults: null,
        decision: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Save to storage
    const submissions = getIntakeSubmissions();
    submissions.push(submission);
    saveIntakeSubmissions(submissions);

    // Clear draft
    localStorage.removeItem(INTAKE_DRAFT_KEY);

    // Reset form
    form.reset();

    // Show success message
    alert('✅ Project intake submitted successfully! Your submission has been added to the Intake Register.');

    // Navigate to Intake Register
    navigateToModule('intake-register');
}

// Generate Unique Intake ID
function generateIntakeId() {
    return 'INTAKE-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Get Intake Submissions
function getIntakeSubmissions() {
    const stored = localStorage.getItem(INTAKE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Save Intake Submissions
function saveIntakeSubmissions(submissions) {
    localStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(submissions));
}

// Load Intake Register
function loadIntakeRegister() {
    const submissions = getIntakeSubmissions();
    const tbody = document.getElementById('intake-register-tbody');
    const emptyState = document.getElementById('intake-register-empty');
    
    if (!tbody) return;

    if (submissions.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Sort by submission date (newest first)
    submissions.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

    tbody.innerHTML = submissions.map(submission => {
        const statusClass = getStatusClass(submission.status);
        const scoreDisplay = submission.score !== null ? `${submission.score}/50` : '-';
        const scoreColor = submission.score !== null && submission.score >= APPROVAL_THRESHOLD ? '#28a745' : 
                           submission.score !== null ? '#dc3545' : '#666';

        return `
            <tr>
                <td>${formatDate(submission.submissionDate)}</td>
                <td><strong>${submission.projectName}</strong></td>
                <td>${submission.strategicPillar}</td>
                <td>${submission.countryRegion}</td>
                <td><span class="status-badge ${statusClass}">${submission.status}</span></td>
                <td>${submission.currentStage}</td>
                <td style="color: ${scoreColor}; font-weight: 600;">${scoreDisplay}</td>
                <td>
                    <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                        <button class="btn-icon" onclick="viewIntakeSubmission('${submission.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${submission.status === 'Submitted' || submission.status === INTAKE_STAGES.SUBMITTED ? `
                            <button class="btn-icon" onclick="startScreening('${submission.id}')" title="Start Screening" style="background: #28a745;">
                                <i class="fas fa-clipboard-check"></i> <span style="margin-left: 5px; font-size: 0.85em;">Screening</span>
                            </button>
                        ` : ''}
                        ${submission.status === 'Screening' || submission.status === INTAKE_STAGES.SCREENING ? `
                            <button class="btn-icon" onclick="startScoring('${submission.id}')" title="Start Scoring" style="background: #7b1fa2;">
                                <i class="fas fa-calculator"></i> <span style="margin-left: 5px; font-size: 0.85em;">Scoring</span>
                            </button>
                        ` : ''}
                        ${submission.status === 'Scoring' || submission.status === INTAKE_STAGES.SCORING ? `
                            <button class="btn-icon" onclick="makeDecision('${submission.id}')" title="Make Decision" style="background: #388e3c;">
                                <i class="fas fa-gavel"></i> <span style="margin-left: 5px; font-size: 0.85em;">Decision</span>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Add CSS for status badges if not already added
    if (!document.getElementById('intake-status-styles')) {
        const style = document.createElement('style');
        style.id = 'intake-status-styles';
        style.textContent = `
            .status-badge {
                padding: 5px 12px;
                border-radius: 5px;
                font-size: 0.85em;
                font-weight: 600;
                display: inline-block;
            }
            .status-badge.submitted { background: #e3f2fd; color: #1976d2; }
            .status-badge.screening { background: #fff3e0; color: #f57c00; }
            .status-badge.scoring { background: #f3e5f5; color: #7b1fa2; }
            .status-badge.decision { background: #e8f5e9; color: #388e3c; }
            .status-badge.approved { background: #c8e6c9; color: #2e7d32; }
            .status-badge.rejected { background: #ffcdd2; color: #c62828; }
            .status-badge.deferred { background: #fff9c4; color: #f57f17; }
            .status-badge.conditional { background: #e1bee7; color: #6a1b9a; }
            .btn-icon {
                padding: 8px 12px;
                border: none;
                background: #1F4E78;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.3s;
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            .btn-icon:hover {
                background: #2EC4B6;
                transform: translateY(-2px);
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
        `;
        document.head.appendChild(style);
    }
}

// Get Status Class
function getStatusClass(status) {
    const statusMap = {
        'Submitted': 'submitted',
        'Screening': 'screening',
        'Scoring': 'scoring',
        'Decision': 'decision',
        'Approved': 'approved',
        'Rejected': 'rejected',
        'Deferred': 'deferred',
        'Conditional': 'conditional'
    };
    return statusMap[status] || 'submitted';
}

// Filter Intake Register
function filterIntakeRegister() {
    const statusFilter = document.getElementById('filter-status')?.value || '';
    const pillarFilter = document.getElementById('filter-pillar')?.value || '';
    const searchTerm = document.getElementById('search-intake')?.value.toLowerCase() || '';

    const submissions = getIntakeSubmissions();
    let filtered = submissions;

    if (statusFilter) {
        filtered = filtered.filter(s => s.status === statusFilter);
    }

    if (pillarFilter) {
        filtered = filtered.filter(s => s.strategicPillar === pillarFilter);
    }

    if (searchTerm) {
        filtered = filtered.filter(s => 
            s.projectName.toLowerCase().includes(searchTerm) ||
            s.projectDescription.toLowerCase().includes(searchTerm) ||
            s.countryRegion.toLowerCase().includes(searchTerm)
        );
    }

    // Update table with filtered results
    const tbody = document.getElementById('intake-register-tbody');
    const emptyState = document.getElementById('intake-register-empty');
    
    if (!tbody) return;

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    filtered.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

    tbody.innerHTML = filtered.map(submission => {
        const statusClass = getStatusClass(submission.status);
        const scoreDisplay = submission.score !== null ? `${submission.score}/50` : '-';
        const scoreColor = submission.score !== null && submission.score >= APPROVAL_THRESHOLD ? '#28a745' : 
                           submission.score !== null ? '#dc3545' : '#666';

        return `
            <tr>
                <td>${formatDate(submission.submissionDate)}</td>
                <td><strong>${submission.projectName}</strong></td>
                <td>${submission.strategicPillar}</td>
                <td>${submission.countryRegion}</td>
                <td><span class="status-badge ${statusClass}">${submission.status}</span></td>
                <td>${submission.currentStage}</td>
                <td style="color: ${scoreColor}; font-weight: 600;">${scoreDisplay}</td>
                <td>
                    <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                        <button class="btn-icon" onclick="viewIntakeSubmission('${submission.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${submission.status === 'Submitted' || submission.status === INTAKE_STAGES.SUBMITTED ? `
                            <button class="btn-icon" onclick="startScreening('${submission.id}')" title="Start Screening" style="background: #28a745;">
                                <i class="fas fa-clipboard-check"></i> <span style="margin-left: 5px; font-size: 0.85em;">Screening</span>
                            </button>
                        ` : ''}
                        ${submission.status === 'Screening' || submission.status === INTAKE_STAGES.SCREENING ? `
                            <button class="btn-icon" onclick="startScoring('${submission.id}')" title="Start Scoring" style="background: #7b1fa2;">
                                <i class="fas fa-calculator"></i> <span style="margin-left: 5px; font-size: 0.85em;">Scoring</span>
                            </button>
                        ` : ''}
                        ${submission.status === 'Scoring' || submission.status === INTAKE_STAGES.SCORING ? `
                            <button class="btn-icon" onclick="makeDecision('${submission.id}')" title="Make Decision" style="background: #388e3c;">
                                <i class="fas fa-gavel"></i> <span style="margin-left: 5px; font-size: 0.85em;">Decision</span>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// View Intake Submission
function viewIntakeSubmission(id) {
    const submissions = getIntakeSubmissions();
    const submission = submissions.find(s => s.id === id);
    
    if (!submission) {
        alert('Submission not found');
        return;
    }

    // Show detailed submission info
    const info = `
Project: ${submission.projectName}
Status: ${submission.status}
Current Stage: ${submission.currentStage}
Strategic Pillar: ${submission.strategicPillar}
Country/Region: ${submission.countryRegion}
Score: ${submission.score !== null ? submission.score + '/50' : 'Not scored yet'}
Submitted By: ${submission.submittedBy}
Submission Date: ${formatDate(submission.submissionDate)}

${submission.status === 'Submitted' || submission.status === INTAKE_STAGES.SUBMITTED ? 
    '✅ Ready for Screening - Click "Screening" button to start' : 
    submission.status === 'Screening' || submission.status === INTAKE_STAGES.SCREENING ?
    '✅ Ready for Scoring - Click "Scoring" button to start' :
    submission.status === 'Scoring' || submission.status === INTAKE_STAGES.SCORING ?
    '✅ Ready for Decision - Click "Decision" button to start' :
    'Status: ' + submission.status
}
    `;
    
    alert(info);
}

// Start Screening
function startScreening(id) {
    const submissions = getIntakeSubmissions();
    const submission = submissions.find(s => s.id === id);
    
    if (!submission) {
        alert('Submission not found');
        return;
    }

    // Open screening modal
    openScreeningModal(submission);
}

// Open Screening Modal
function openScreeningModal(submission) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'screening-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        overflow-y: auto;
    `;

    // Get existing screening results if any
    const existingScreening = submission.screeningResults || {};

    modal.innerHTML = `
        <div class="modal-content" style="background: white; border-radius: 10px; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 30px; position: relative;">
            <button onclick="closeScreeningModal()" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 1.5em; cursor: pointer; color: #666;">&times;</button>
            
            <h2 style="color: #1F4E78; margin-bottom: 10px;">
                <i class="fas fa-clipboard-check"></i> Screening: ${submission.projectName}
            </h2>
            <p style="color: #666; margin-bottom: 30px;">Evaluate the project against 10 screening criteria</p>

            <form id="screening-form">
                ${SCREENING_QUESTIONS.map((q, index) => {
                    const existingAnswer = existingScreening[`question${q.id}`] || '';
                    return `
                        <div class="screening-question" style="margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #2EC4B6;">
                            <div style="display: flex; align-items: start; gap: 15px; margin-bottom: 15px;">
                                <div style="background: #1F4E78; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">
                                    ${q.id}
                                </div>
                                <div style="flex: 1;">
                                    <h4 style="color: #1F4E78; margin-bottom: 5px; font-size: 1em;">${q.category}</h4>
                                    <p style="color: #333; font-weight: 600; margin: 0;">${q.question}</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px 15px; background: white; border: 2px solid #ddd; border-radius: 5px; flex: 1; min-width: 120px; transition: all 0.3s;" 
                                       onmouseover="this.style.borderColor='#2EC4B6'" 
                                       onmouseout="this.style.borderColor='${existingAnswer === 'Yes' ? '#2EC4B6' : '#ddd'}'">
                                    <input type="radio" name="question${q.id}" value="Yes" ${existingAnswer === 'Yes' ? 'checked' : ''} 
                                           onchange="updateScreeningAnswer(${q.id}, 'Yes', this)">
                                    <span style="color: #28a745; font-weight: 600;"><i class="fas fa-check-circle"></i> Yes</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px 15px; background: white; border: 2px solid #ddd; border-radius: 5px; flex: 1; min-width: 120px; transition: all 0.3s;"
                                       onmouseover="this.style.borderColor='#2EC4B6'" 
                                       onmouseout="this.style.borderColor='${existingAnswer === 'Partial' ? '#2EC4B6' : '#ddd'}'">
                                    <input type="radio" name="question${q.id}" value="Partial" ${existingAnswer === 'Partial' ? 'checked' : ''}
                                           onchange="updateScreeningAnswer(${q.id}, 'Partial', this)">
                                    <span style="color: #ffc107; font-weight: 600;"><i class="fas fa-exclamation-circle"></i> Partial</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px 15px; background: white; border: 2px solid #ddd; border-radius: 5px; flex: 1; min-width: 120px; transition: all 0.3s;"
                                       onmouseover="this.style.borderColor='#2EC4B6'" 
                                       onmouseout="this.style.borderColor='${existingAnswer === 'No' ? '#dc3545' : '#ddd'}'">
                                    <input type="radio" name="question${q.id}" value="No" ${existingAnswer === 'No' ? 'checked' : ''}
                                           onchange="updateScreeningAnswer(${q.id}, 'No', this)">
                                    <span style="color: #dc3545; font-weight: 600;"><i class="fas fa-times-circle"></i> No</span>
                                </label>
                            </div>
                            <div style="margin-top: 10px;">
                                <textarea name="comment${q.id}" placeholder="Add comments or notes (optional)" 
                                          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.9em; resize: vertical; min-height: 60px;"
                                          onchange="updateScreeningComment(${q.id}, this.value)">${existingScreening[`comment${q.id}`] || ''}</textarea>
                            </div>
                        </div>
                    `;
                }).join('')}

                <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                    <h4 style="color: #1F4E78; margin-bottom: 15px;">
                        <i class="fas fa-comment-alt"></i> Overall Screening Notes
                    </h4>
                    <textarea id="screening-notes" placeholder="Add overall screening notes or observations..."
                              style="width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 5px; font-size: 1em; resize: vertical; min-height: 100px;">${existingScreening.notes || ''}</textarea>
                </div>

                <div id="screening-results" style="margin-top: 20px; padding: 15px; border-radius: 8px; display: none;">
                    <!-- Results will be displayed here -->
                </div>

                <div style="display: flex; gap: 15px; justify-content: flex-end; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
                    <button type="button" class="btn btn-secondary" onclick="closeScreeningModal()">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="saveScreeningDraft('${submission.id}')">
                        <i class="fas fa-save"></i> Save Draft
                    </button>
                    <button type="button" class="btn btn-primary" onclick="submitScreening('${submission.id}')">
                        <i class="fas fa-check"></i> Complete Screening
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Calculate and display results
    calculateScreeningResults(submission.id);
}

// Update Screening Answer
function updateScreeningAnswer(questionId, answer, element) {
    // Update visual state
    const labels = element.closest('.screening-question').querySelectorAll('label');
    labels.forEach(label => {
        const input = label.querySelector('input[type="radio"]');
        if (input.checked) {
            label.style.borderColor = '#2EC4B6';
            label.style.background = '#f0f9ff';
        } else {
            label.style.borderColor = '#ddd';
            label.style.background = 'white';
        }
    });

    // Recalculate results
    const modal = document.getElementById('screening-modal');
    if (modal) {
        const form = modal.querySelector('#screening-form');
        const submissionId = form.querySelector('button[onclick*="submitScreening"]').getAttribute('onclick').match(/'([^']+)'/)[1];
        calculateScreeningResults(submissionId);
    }
}

// Update Screening Comment
function updateScreeningComment(questionId, comment) {
    // Comment is saved automatically
}

// Calculate Screening Results
function calculateScreeningResults(submissionId) {
    const modal = document.getElementById('screening-modal');
    if (!modal) return;

    const form = modal.querySelector('#screening-form');
    const resultsDiv = modal.querySelector('#screening-results');
    
    let yesCount = 0;
    let partialCount = 0;
    let noCount = 0;
    const answers = {};

    SCREENING_QUESTIONS.forEach(q => {
        const answer = form.querySelector(`input[name="question${q.id}"]:checked`)?.value;
        if (answer) {
            answers[`question${q.id}`] = answer;
            if (answer === 'Yes') yesCount++;
            else if (answer === 'Partial') partialCount++;
            else if (answer === 'No') noCount++;
        }
    });

    const totalAnswered = yesCount + partialCount + noCount;
    const failCount = noCount;
    const passed = failCount < SCREENING_FAIL_THRESHOLD && totalAnswered === SCREENING_QUESTIONS.length;

    if (totalAnswered > 0) {
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
            <h4 style="color: #1F4E78; margin-bottom: 15px;">
                <i class="fas fa-chart-bar"></i> Screening Results
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px;">
                <div style="text-align: center; padding: 15px; background: #e8f5e9; border-radius: 8px;">
                    <div style="font-size: 2em; font-weight: bold; color: #28a745;">${yesCount}</div>
                    <div style="color: #666; font-size: 0.9em;">Yes</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #fff9c4; border-radius: 8px;">
                    <div style="font-size: 2em; font-weight: bold; color: #ffc107;">${partialCount}</div>
                    <div style="color: #666; font-size: 0.9em;">Partial</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #ffcdd2; border-radius: 8px;">
                    <div style="font-size: 2em; font-weight: bold; color: #dc3545;">${noCount}</div>
                    <div style="color: #666; font-size: 0.9em;">No</div>
                </div>
            </div>
            <div style="padding: 15px; background: ${passed ? '#e8f5e9' : '#ffcdd2'}; border-radius: 8px; border-left: 4px solid ${passed ? '#28a745' : '#dc3545'};">
                <strong style="color: ${passed ? '#28a745' : '#dc3545'};">
                    ${passed ? 
                        `✅ Screening Passed - Project can proceed to scoring stage` : 
                        `❌ Screening Failed - Project has ${failCount} "No" answers (threshold: ${SCREENING_FAIL_THRESHOLD})`
                    }
                </strong>
                ${!passed ? '<p style="margin-top: 10px; color: #666; font-size: 0.9em;">Projects failing screening will be automatically rejected unless exceptional circumstances apply.</p>' : ''}
            </div>
        `;
    } else {
        resultsDiv.style.display = 'none';
    }
}

// Save Screening Draft
function saveScreeningDraft(submissionId) {
    const modal = document.getElementById('screening-modal');
    if (!modal) return;

    const form = modal.querySelector('#screening-form');
    const notes = modal.querySelector('#screening-notes').value;
    
    const screeningResults = {
        notes: notes,
        savedAt: new Date().toISOString()
    };

    SCREENING_QUESTIONS.forEach(q => {
        const answer = form.querySelector(`input[name="question${q.id}"]:checked`)?.value;
        const comment = form.querySelector(`textarea[name="comment${q.id}"]`)?.value;
        
        if (answer) {
            screeningResults[`question${q.id}`] = answer;
        }
        if (comment) {
            screeningResults[`comment${q.id}`] = comment;
        }
    });

    // Save to submission
    const submissions = getIntakeSubmissions();
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
        submission.screeningResults = screeningResults;
        submission.updatedAt = new Date().toISOString();
        saveIntakeSubmissions(submissions);
        
        alert('✅ Screening draft saved');
    }
}

// Submit Screening
function submitScreening(submissionId) {
    const modal = document.getElementById('screening-modal');
    if (!modal) return;

    const form = modal.querySelector('#screening-form');
    const notes = modal.querySelector('#screening-notes').value;
    
    // Check all questions answered
    let allAnswered = true;
    SCREENING_QUESTIONS.forEach(q => {
        if (!form.querySelector(`input[name="question${q.id}"]:checked`)) {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        alert('⚠️ Please answer all screening questions before submitting.');
        return;
    }

    const screeningResults = {
        notes: notes,
        completedAt: new Date().toISOString()
    };

    let yesCount = 0;
    let partialCount = 0;
    let noCount = 0;

    SCREENING_QUESTIONS.forEach(q => {
        const answer = form.querySelector(`input[name="question${q.id}"]:checked`).value;
        const comment = form.querySelector(`textarea[name="comment${q.id}"]`)?.value;
        
        screeningResults[`question${q.id}`] = answer;
        if (comment) {
            screeningResults[`comment${q.id}`] = comment;
        }

        if (answer === 'Yes') yesCount++;
        else if (answer === 'Partial') partialCount++;
        else if (answer === 'No') noCount++;
    });

    screeningResults.summary = {
        yes: yesCount,
        partial: partialCount,
        no: noCount,
        total: SCREENING_QUESTIONS.length
    };

    // Determine if passed
    const passed = noCount < SCREENING_FAIL_THRESHOLD;

    // Update submission
    const submissions = getIntakeSubmissions();
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
        submission.screeningResults = screeningResults;
        
        if (passed) {
            submission.status = INTAKE_STAGES.SCREENING;
            submission.currentStage = 'Ready for Scoring';
            alert('✅ Screening completed successfully! Project passed screening and can proceed to scoring stage.');
        } else {
            submission.status = INTAKE_STAGES.REJECTED;
            submission.currentStage = 'Rejected - Failed Screening';
            submission.decision = {
                type: 'Rejected',
                reason: `Failed screening: ${noCount} "No" answers (threshold: ${SCREENING_FAIL_THRESHOLD})`,
                date: new Date().toISOString()
            };
            alert(`❌ Screening failed. Project has been rejected due to ${noCount} "No" answers.`);
        }
        
        submission.updatedAt = new Date().toISOString();
        saveIntakeSubmissions(submissions);
        
        // Close modal and refresh register
        closeScreeningModal();
        loadIntakeRegister();
    }
}

// Close Screening Modal
function closeScreeningModal() {
    const modal = document.getElementById('screening-modal');
    if (modal) {
        modal.remove();
    }
}

// Start Scoring
function startScoring(id) {
    // TODO: Implement 10-criteria scoring matrix
    alert('10-Criteria Scoring Matrix will be implemented next.');
}

// Make Decision
function makeDecision(id) {
    // TODO: Implement decision workflow
    alert('Decision workflow will be implemented next. This will include Approve/Reject/Defer/Conditional options.');
}

// Export Intake Register
function exportIntakeRegister() {
    const submissions = getIntakeSubmissions();
    // TODO: Implement export to Excel/PDF
    alert('Export functionality will be implemented next.');
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Make functions globally available
window.initIntakeSystem = initIntakeSystem;
window.saveIntakeDraft = saveIntakeDraft;
window.filterIntakeRegister = filterIntakeRegister;
window.viewIntakeSubmission = viewIntakeSubmission;
window.startScreening = startScreening;
window.startScoring = startScoring;
window.makeDecision = makeDecision;
window.exportIntakeRegister = exportIntakeRegister;
window.openScreeningModal = openScreeningModal;
window.closeScreeningModal = closeScreeningModal;
window.updateScreeningAnswer = updateScreeningAnswer;
window.updateScreeningComment = updateScreeningComment;
window.saveScreeningDraft = saveScreeningDraft;
window.submitScreening = submitScreening;
window.calculateScreeningResults = calculateScreeningResults;

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntakeSystem);
} else {
    initIntakeSystem();
}

