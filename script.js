const API_URL = 'http://localhost:3000';

/**
 * Fetch Data Utilities
 */
async function fetchReports() {
    try {
        const response = await fetch(`${API_URL}/reports`);
        if (!response.ok) throw new Error('Failed to fetch reports');
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function submitReport(reportData) {
    try {
        const response = await fetch(`${API_URL}/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reportData)
        });
        if (!response.ok) throw new Error('Failed to submit report');
        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function updateReportStatus(id, status) {
    try {
        const response = await fetch(`${API_URL}/update-status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status })
        });
        if (!response.ok) throw new Error('Failed to update status');
        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

/**
 * UI Utilities
 */
function showAlertBanner(message) {
    const existing = document.querySelector('.alert-banner');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.className = 'alert-banner';
    banner.innerHTML = `
        <i class="feather icon-alert-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(banner);

    // trigger animation
    setTimeout(() => banner.classList.add('show'), 50);
    setTimeout(() => {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 400);
    }, 4000);
}

function getPriorityBadgeClass(priority) {
    switch (priority) {
        case 'Red': return 'badge-red';
        case 'Orange': return 'badge-orange';
        case 'Green': return 'badge-green';
        default: return 'badge-green';
    }
}

/**
 * Simulated AI Image Analysis
 */
function simulateAIAnalysis(file) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Fake or real randomly based on some logic (mocked)
            const isFake = Math.random() < 0.2; // 20% chance to be flagged fake
            
            // Random severity and type based on probabilities
            const severities = ['High', 'Medium', 'Low'];
            const randomSev = severities[Math.floor(Math.random() * severities.length)];
            
            const types = ['Fire', 'Flood', 'Earthquake', 'Accident'];
            const randomType = types[Math.floor(Math.random() * types.length)];
            
            resolve({
                detected: randomType,
                severity: randomSev,
                confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
                isPossibleFake: isFake
            });
        }, 1500); // simulate processing delay
    });
}
