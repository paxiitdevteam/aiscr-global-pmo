// Export Utilities - PDF, Word, Excel, Power BI, Tableau

// Export to PDF using jsPDF
function exportToPDF(content, filename = 'PMO_Report.pdf') {
    // Dynamic import of jsPDF
    if (typeof window.jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            generatePDF(content, filename);
        };
        document.head.appendChild(script);
    } else {
        generatePDF(content, filename);
    }
}

function generatePDF(content, filename) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add AISCR branding
    doc.setFillColor(31, 78, 120); // Navy
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('AISCR GLOBAL PMO', 105, 20, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    // Add content
    let yPos = 40;
    const lines = doc.splitTextToSize(content, 180);
    
    lines.forEach(line => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(line, 15, yPos);
        yPos += 7;
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
    
    doc.save(filename);
}

// Export to Word using docx library
function exportToWord(data, filename = 'PMO_Report.docx') {
    if (typeof window.Docx === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/docx/7.8.2/docx.min.js';
        script.onload = () => {
            generateWord(data, filename);
        };
        document.head.appendChild(script);
    } else {
        generateWord(data, filename);
    }
}

function generateWord(data, filename) {
    // Create Word document content
    const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>AISCR GLOBAL PMO Report</title>
        </head>
        <body>
            <h1 style='color: #1F4E78;'>AISCR GLOBAL PMO Report</h1>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            ${data}
        </body>
        </html>
    `;
    
    const blob = new Blob(['\ufeff', content], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// Export to Excel (CSV format)
function exportToExcel(data, filename = 'PMO_Data.csv') {
    let csv = '';
    
    if (Array.isArray(data) && data.length > 0) {
        // Get headers
        const headers = Object.keys(data[0]);
        csv += headers.join(',') + '\n';
        
        // Add data rows
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header] || '';
                return `"${String(value).replace(/"/g, '""')}"`;
            });
            csv += values.join(',') + '\n';
        });
    }
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// Power BI Integration
function openPowerBI(projectId = null) {
    // Power BI embed URL (replace with actual Power BI workspace URL)
    const powerBIUrl = projectId 
        ? `https://app.powerbi.com/view?r=YOUR_REPORT_ID&projectId=${projectId}`
        : 'https://app.powerbi.com/view?r=YOUR_REPORT_ID';
    
    // Open in new window or embed
    window.open(powerBIUrl, '_blank', 'width=1200,height=800');
}

// Embed Power BI Dashboard
function embedPowerBI() {
    // Check if Power BI container exists
    let container = document.getElementById('powerbi-container');
    
    if (!container) {
        // Create modal for Power BI embed
        const modal = document.createElement('div');
        modal.className = 'analytics-modal';
        modal.id = 'powerbi-modal';
        modal.innerHTML = `
            <div class="analytics-modal-content">
                <div class="analytics-modal-header">
                    <h3>Power BI Dashboard</h3>
                    <button class="close-modal" onclick="closeAnalyticsModal('powerbi-modal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="analytics-modal-body">
                    <div id="powerbi-container" style="width: 100%; height: 600px;">
                        <iframe 
                            src="https://app.powerbi.com/view?r=YOUR_REPORT_ID" 
                            frameborder="0" 
                            allowFullScreen="true"
                            style="width: 100%; height: 100%;">
                        </iframe>
                    </div>
                    <p style="margin-top: 15px; color: #666; font-size: 0.9em;">
                        <i class="fas fa-info-circle"></i> 
                        Configure your Power BI report URL in the export.js file to enable embedding.
                    </p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        document.getElementById('powerbi-modal').style.display = 'block';
    }
}

// Tableau Integration
function openTableau(dashboardName = 'PMO_Dashboard') {
    // Tableau embed URL (replace with actual Tableau server URL)
    const tableauUrl = `https://YOUR_TABLEAU_SERVER.com/views/${dashboardName}/Dashboard?:embed=y&:showVizHome=no`;
    
    // Open in new window or embed
    window.open(tableauUrl, '_blank', 'width=1200,height=800');
}

// Embed Tableau Dashboard
function embedTableau() {
    // Check if Tableau container exists
    let container = document.getElementById('tableau-container');
    
    if (!container) {
        // Create modal for Tableau embed
        const modal = document.createElement('div');
        modal.className = 'analytics-modal';
        modal.id = 'tableau-modal';
        modal.innerHTML = `
            <div class="analytics-modal-content">
                <div class="analytics-modal-header">
                    <h3>Tableau Dashboard</h3>
                    <button class="close-modal" onclick="closeAnalyticsModal('tableau-modal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="analytics-modal-body">
                    <div id="tableau-container" style="width: 100%; height: 600px;">
                        <iframe 
                            src="https://YOUR_TABLEAU_SERVER.com/views/PMO_Dashboard/Dashboard?:embed=y&:showVizHome=no" 
                            frameborder="0" 
                            allowFullScreen="true"
                            style="width: 100%; height: 100%;">
                        </iframe>
                    </div>
                    <p style="margin-top: 15px; color: #666; font-size: 0.9em;">
                        <i class="fas fa-info-circle"></i> 
                        Configure your Tableau server URL in the export.js file to enable embedding.
                    </p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        document.getElementById('tableau-modal').style.display = 'block';
    }
}

// Close Analytics Modal
function closeAnalyticsModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Generate Report Content
function generateReportContent(module, data) {
    let content = `<h2>${module.charAt(0).toUpperCase() + module.slice(1)} Report</h2>`;
    content += `<p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>`;
    content += `<hr>`;
    
    if (Array.isArray(data) && data.length > 0) {
        content += '<table border="1" style="border-collapse: collapse; width: 100%;">';
        
        // Headers
        const headers = Object.keys(data[0]);
        content += '<tr style="background: #1F4E78; color: white;">';
        headers.forEach(header => {
            content += `<th style="padding: 10px;">${header}</th>`;
        });
        content += '</tr>';
        
        // Data rows
        data.forEach(row => {
            content += '<tr>';
            headers.forEach(header => {
                content += `<td style="padding: 8px;">${row[header] || ''}</td>`;
            });
            content += '</tr>';
        });
        
        content += '</table>';
    }
    
    return content;
}

// Export Portfolio Report
function exportPortfolioReport(format) {
    const data = window.sampleData ? window.sampleData.portfolio : [];
    const content = generateReportContent('Portfolio', data);
    
    switch(format) {
        case 'pdf':
            exportToPDF(content, 'AISCR_Portfolio_Report.pdf');
            break;
        case 'word':
            exportToWord(content, 'AISCR_Portfolio_Report.docx');
            break;
        case 'excel':
            exportToExcel(data, 'AISCR_Portfolio_Data.csv');
            break;
    }
}

// Export Risk Report
function exportRiskReport(format) {
    const data = window.sampleData ? window.sampleData.risks : [];
    const content = generateReportContent('Risk Register', data);
    
    switch(format) {
        case 'pdf':
            exportToPDF(content, 'AISCR_Risk_Report.pdf');
            break;
        case 'word':
            exportToWord(content, 'AISCR_Risk_Report.docx');
            break;
        case 'excel':
            exportToExcel(data, 'AISCR_Risk_Data.csv');
            break;
    }
}

// Export Budget Report
function exportBudgetReport(format) {
    const data = window.sampleData ? window.sampleData.budget : [];
    const content = generateReportContent('Budget', data);
    
    switch(format) {
        case 'pdf':
            exportToPDF(content, 'AISCR_Budget_Report.pdf');
            break;
        case 'word':
            exportToWord(content, 'AISCR_Budget_Report.docx');
            break;
        case 'excel':
            exportToExcel(data, 'AISCR_Budget_Data.csv');
            break;
    }
}

// Export Volunteer Report
function exportVolunteerReport(format) {
    const data = window.sampleData ? window.sampleData.volunteers : [];
    const content = generateReportContent('Volunteers', data);
    
    switch(format) {
        case 'pdf':
            exportToPDF(content, 'AISCR_Volunteer_Report.pdf');
            break;
        case 'word':
            exportToWord(content, 'AISCR_Volunteer_Report.docx');
            break;
        case 'excel':
            exportToExcel(data, 'AISCR_Volunteer_Data.csv');
            break;
    }
}

// Export Heat Map
function exportHeatMap(format) {
    const canvas = document.getElementById('heatmapCanvas');
    if (!canvas) {
        alert('Heat map not available for export');
        return;
    }
    
    if (format === 'image') {
        // Export as PNG image
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'AISCR_Risk_Heat_Map.png';
            link.click();
            URL.revokeObjectURL(url);
        });
    } else if (format === 'pdf') {
        // Export as PDF
        if (typeof window.jspdf !== 'undefined') {
            const { jsPDF } = window.jspdf;
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const imgWidth = 280;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const x = (297 - imgWidth) / 2; // Center horizontally
            const y = 10;
            
            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            pdf.save('AISCR_Risk_Heat_Map.pdf');
        } else {
            alert('PDF export requires jsPDF library. Exporting as image instead.');
            exportHeatMap('image');
        }
    }
}

// Export Dashboard Summary
function exportDashboardSummary(format) {
    const data = window.sampleData || { portfolio: [], risks: [], budget: [], volunteers: [] };
    const summary = {
        'Total Projects': data.portfolio ? data.portfolio.length : 0,
        'Active Projects': data.portfolio ? data.portfolio.filter(p => p.status === 'Green').length : 0,
        'At Risk Projects': data.portfolio ? data.portfolio.filter(p => p.status === 'Yellow' || p.status === 'Red').length : 0,
        'Total Risks': data.risks ? data.risks.length : 0,
        'Total Budget': data.budget ? data.budget.reduce((sum, item) => sum + (item.estimated || 0), 0) : 0,
        'Total Volunteers': data.volunteers ? data.volunteers.length : 0,
        'Report Date': new Date().toLocaleString()
    };
    
    let content = '<h2>AISCR GLOBAL PMO - Dashboard Summary</h2>';
    content += '<p><strong>Generated:</strong> ' + new Date().toLocaleString() + '</p>';
    content += '<hr>';
    content += '<table border="1" style="border-collapse: collapse; width: 100%;">';
    content += '<tr style="background: #1F4E78; color: white;"><th>Metric</th><th>Value</th></tr>';
    
    Object.entries(summary).forEach(([key, value]) => {
        content += `<tr><td style="padding: 8px;"><strong>${key}</strong></td><td style="padding: 8px;">${value}</td></tr>`;
    });
    
    content += '</table>';
    
    switch(format) {
        case 'pdf':
            exportToPDF(content, 'AISCR_Dashboard_Summary.pdf');
            break;
        case 'word':
            exportToWord(content, 'AISCR_Dashboard_Summary.docx');
            break;
        case 'excel':
            exportToExcel([summary], 'AISCR_Dashboard_Summary.csv');
            break;
    }
}

