// Risk Heat Map Visualization
// Displays risks on a probability (1-5) vs impact (1-5) matrix

function initializeHeatMap() {
    const canvas = document.getElementById('heatmapCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const risks = window.sampleData ? window.sampleData.risks : [];
    
    // Set canvas size
    canvas.width = 600;
    canvas.height = 600;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawHeatMapGrid(ctx, canvas.width, canvas.height);
    
    // Draw risks
    if (risks.length > 0) {
        drawRisks(ctx, risks, canvas.width, canvas.height);
    } else {
        // Show empty state
        drawEmptyState(ctx, canvas.width, canvas.height);
    }
    
    // Draw legend
    drawLegend(ctx, canvas.width);
}

function drawHeatMapGrid(ctx, width, height) {
    const padding = 80;
    const gridWidth = width - (padding * 2);
    const gridHeight = height - (padding * 2);
    const cellWidth = gridWidth / 5;
    const cellHeight = gridHeight / 5;
    
    // Draw grid cells with color coding
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const x = padding + (j * cellWidth);
            const y = padding + ((4 - i) * cellHeight); // Flip Y axis
            
            // Calculate risk level (probability * impact)
            const riskLevel = (j + 1) * (i + 1);
            
            // Color based on risk level
            let color;
            if (riskLevel <= 5) {
                color = 'rgba(0, 255, 0, 0.3)'; // Green - Low
            } else if (riskLevel <= 10) {
                color = 'rgba(255, 255, 0, 0.3)'; // Yellow - Medium
            } else if (riskLevel <= 15) {
                color = 'rgba(255, 165, 0, 0.3)'; // Orange - Medium-High
            } else {
                color = 'rgba(255, 0, 0, 0.3)'; // Red - High
            }
            
            // Draw cell
            ctx.fillStyle = color;
            ctx.fillRect(x, y, cellWidth, cellHeight);
            
            // Draw border
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cellWidth, cellHeight);
        }
    }
    
    // Draw axes labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    
    // X-axis (Probability)
    ctx.save();
    ctx.translate(width / 2, height - 20);
    ctx.fillText('Probability', 0, 0);
    ctx.restore();
    
    for (let i = 1; i <= 5; i++) {
        const x = padding + ((i - 0.5) * cellWidth);
        ctx.fillText(i.toString(), x, height - 30);
    }
    
    // Y-axis (Impact)
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Impact', 0, 0);
    ctx.restore();
    
    for (let i = 1; i <= 5; i++) {
        const y = padding + ((5 - i + 0.5) * cellHeight);
        ctx.fillText(i.toString(), 30, y + 5);
    }
    
    // Draw axis lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // X-axis line
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Y-axis line
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
}

function drawRisks(ctx, risks, width, height) {
    const padding = 80;
    const gridWidth = width - (padding * 2);
    const gridHeight = height - (padding * 2);
    const cellWidth = gridWidth / 5;
    const cellHeight = gridHeight / 5;
    
    risks.forEach((risk, index) => {
        const prob = risk.probability || 1;
        const impact = risk.impact || 1;
        
        // Calculate position (subtract 1 to convert to 0-based index)
        const x = padding + ((prob - 1) * cellWidth) + (cellWidth / 2);
        const y = padding + ((5 - impact) * cellHeight) + (cellHeight / 2);
        
        // Determine color based on status
        let color;
        switch(risk.status) {
            case 'Red':
                color = '#FF0000';
                break;
            case 'Yellow':
                color = '#FFFF00';
                break;
            case 'Green':
                color = '#00FF00';
                break;
            default:
                color = '#666';
        }
        
        // Draw risk circle
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw risk ID
        ctx.fillStyle = '#333';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(risk.id || `R${index + 1}`, x, y + 4);
        
        // Store risk data for tooltip
        risk._heatmapX = x;
        risk._heatmapY = y;
    });
}

function drawEmptyState(ctx, width, height) {
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('No risks to display', width / 2, height / 2);
    ctx.fillText('Add risks in the Risk Register', width / 2, height / 2 + 25);
}

function drawLegend(ctx, width) {
    const legendY = 20;
    const legendX = width - 200;
    
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    
    // Legend title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Risk Status', legendX, legendY);
    
    // Legend items
    const legendItems = [
        { color: '#00FF00', label: 'Green (Low)' },
        { color: '#FFFF00', label: 'Yellow (Medium)' },
        { color: '#FF0000', label: 'Red (High)' }
    ];
    
    legendItems.forEach((item, index) => {
        const y = legendY + 25 + (index * 25);
        
        // Draw colored circle
        ctx.beginPath();
        ctx.arc(legendX + 10, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = item.color;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText(item.label, legendX + 25, y + 4);
    });
}

// Handle canvas click for risk details
function setupHeatMapInteractivity() {
    const canvas = document.getElementById('heatmapCanvas');
    if (!canvas) return;
    
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const risks = window.sampleData ? window.sampleData.risks : [];
        const clickedRisk = risks.find(risk => {
            if (!risk._heatmapX || !risk._heatmapY) return false;
            const distance = Math.sqrt(
                Math.pow(x - risk._heatmapX, 2) + 
                Math.pow(y - risk._heatmapY, 2)
            );
            return distance <= 15;
        });
        
        if (clickedRisk) {
            showRiskDetails(clickedRisk);
        }
    });
    
    // Add hover effect
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const risks = window.sampleData ? window.sampleData.risks : [];
        const hoveredRisk = risks.find(risk => {
            if (!risk._heatmapX || !risk._heatmapY) return false;
            const distance = Math.sqrt(
                Math.pow(x - risk._heatmapX, 2) + 
                Math.pow(y - risk._heatmapY, 2)
            );
            return distance <= 15;
        });
        
        canvas.style.cursor = hoveredRisk ? 'pointer' : 'default';
    });
}

function showRiskDetails(risk) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2>Risk Details: ${risk.id}</h2>
                <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="detail-item">
                    <label>Description:</label>
                    <p>${risk.description || 'N/A'}</p>
                </div>
                <div class="detail-item">
                    <label>Probability:</label>
                    <span>${risk.probability || 'N/A'}/5</span>
                </div>
                <div class="detail-item">
                    <label>Impact:</label>
                    <span>${risk.impact || 'N/A'}/5</span>
                </div>
                <div class="detail-item">
                    <label>Risk Score:</label>
                    <span><strong>${risk.score || (risk.probability * risk.impact) || 'N/A'}</strong></span>
                </div>
                <div class="detail-item">
                    <label>Owner:</label>
                    <span>${risk.owner || 'N/A'}</span>
                </div>
                <div class="detail-item">
                    <label>Status:</label>
                    <span class="status-badge status-${(risk.status || 'Green').toLowerCase()}">${risk.status || 'Green'}</span>
                </div>
                ${risk.mitigation ? `
                <div class="detail-item">
                    <label>Mitigation Strategy:</label>
                    <p>${risk.mitigation}</p>
                </div>
                ` : ''}
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="modalManager.openModal('risks', 'edit', ${window.sampleData.risks.findIndex(r => r.id === risk.id)}); this.closest('.modal-overlay').remove();">
                    <i class="fas fa-edit"></i> Edit Risk
                </button>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                    Close
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

// Filter risks for heat map
function filterHeatMap(filterType) {
    // This will be called when filter buttons are clicked
    initializeHeatMap();
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initializeHeatMap();
            setupHeatMapInteractivity();
        }, 500);
    });
} else {
    setTimeout(() => {
        initializeHeatMap();
        setupHeatMapInteractivity();
    }, 500);
}

// Export for use in other modules
window.initializeHeatMap = initializeHeatMap;
window.filterHeatMap = filterHeatMap;

