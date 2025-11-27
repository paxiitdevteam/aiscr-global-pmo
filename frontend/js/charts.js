// Initialize Charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    // Portfolio Status Chart
    const portfolioCtx = document.getElementById('portfolioChart');
    if (portfolioCtx) {
        new Chart(portfolioCtx, {
            type: 'bar',
            data: {
                labels: ['PMO System', 'Data Analysis', 'IT Infrastructure', 'Marketing Campaign'],
                datasets: [{
                    label: 'Projects',
                    data: [1, 2, 1, 3], // Priority values
                    backgroundColor: [
                        'rgba(0, 255, 0, 0.6)',
                        'rgba(255, 255, 0, 0.6)',
                        'rgba(0, 255, 0, 0.6)',
                        'rgba(255, 0, 0, 0.6)'
                    ],
                    borderColor: [
                        'rgba(0, 255, 0, 1)',
                        'rgba(255, 255, 0, 1)',
                        'rgba(0, 255, 0, 1)',
                        'rgba(255, 0, 0, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    // Donor Funding Chart
    const donorCtx = document.getElementById('donorChart');
    if (donorCtx) {
        new Chart(donorCtx, {
            type: 'bar',
            data: {
                labels: ['Donor A', 'Donor B', 'Donor C', 'Donor D'],
                datasets: [{
                    label: 'Funding ($)',
                    data: [50000, 30000, 40000, 20000],
                    backgroundColor: 'rgba(46, 196, 182, 0.6)',
                    borderColor: 'rgba(46, 196, 182, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Membership Growth Chart
    const membershipCtx = document.getElementById('membershipChart');
    if (membershipCtx) {
        new Chart(membershipCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Membership Growth (%)',
                    data: [15, 18, 20, 22, 23, 25],
                    borderColor: 'rgba(46, 196, 182, 1)',
                    backgroundColor: 'rgba(46, 196, 182, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(46, 196, 182, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

