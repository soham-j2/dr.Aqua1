// Simplified Rural Water Purifier & Monitoring App Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // Test Scenario Buttons
    const btnGood = document.getElementById('btn-good-water');
    const btnDirty = document.getElementById('btn-dirty-water');
    const btnBroken = document.getElementById('btn-broken-filter');
    const pointPills = document.querySelectorAll('.point-pill');

    // Phone UI Elements
    const locTitle = document.getElementById('loc-title');
    const heroCard = document.getElementById('hero-card');
    const statusIcon = document.getElementById('status-icon');
    const statusBadge = document.getElementById('status-badge');
    const tdsVal = document.getElementById('tds-val');
    const statusDesc = document.getElementById('status-desc');

    const inletTds = document.getElementById('inlet-tds');
    const outletTds = document.getElementById('outlet-tds');

    const filterBadge = document.getElementById('filter-badge');
    const filterStatusIcon = document.getElementById('filter-status-icon');
    const filterStatusTitle = document.getElementById('filter-status-title');
    const filterDesc = document.getElementById('filter-desc');

    // Scenario State Engine
    function setScenario(inletPpm, outletPpm, statusMode, filterHealthy) {
        // 1. Update TDS Display Numbers
        tdsVal.textContent = outletPpm.toLocaleString();
        inletTds.innerHTML = `${inletPpm.toLocaleString()} <small>PPM</small>`;
        outletTds.innerHTML = `${outletPpm.toLocaleString()} <small>PPM</small>`;

        // 2. Update Main Hero Status Traffic Light
        heroCard.className = 'hero-status-card';

        if (statusMode === 'safe') {
            heroCard.classList.add('status-safe');
            statusIcon.textContent = '🟢';
            statusBadge.textContent = 'SAFE TO DRINK';
            statusDesc.textContent = 'Water is clean and safe for drinking (<500 PPM).';
        } else if (statusMode === 'caution') {
            heroCard.classList.add('status-caution');
            statusIcon.textContent = '🟡';
            statusBadge.textContent = 'CAUTION WATER';
            statusDesc.textContent = 'High minerals detected (500–2,000 PPM). Still usable.';
        } else {
            heroCard.classList.add('status-unsafe');
            statusIcon.textContent = '🔴';
            statusBadge.textContent = 'UNSAFE WATER';
            statusDesc.textContent = 'Unsafe water! Do not drink. Replacement filter required.';
        }

        // 3. Update Filter Health Indicator
        if (filterHealthy) {
            filterBadge.className = 'filter-health-badge health-ok';
            filterStatusIcon.textContent = '✅';
            filterStatusTitle.textContent = 'Filter is Healthy';
            filterDesc.textContent = 'UF Membrane (~0.01 micron) physically blocking bacteria & microbes.';
        } else {
            filterBadge.className = 'filter-health-badge health-warn';
            filterStatusIcon.textContent = '🚨';
            filterStatusTitle.textContent = 'Filter Replacement Needed';
            filterDesc.textContent = 'Dual sensors detected filter failure. Outlet quality matches raw dirty water.';
        }
    }

    // Button Click Event Handlers
    function clearActiveButtons() {
        btnGood.classList.remove('active');
        btnDirty.classList.remove('active');
        btnBroken.classList.remove('active');
    }

    btnGood.addEventListener('click', () => {
        clearActiveButtons();
        btnGood.classList.add('active');
        // Clean tap water: 350 raw -> 120 outlet (Safe)
        setScenario(350, 120, 'safe', true);
    });

    btnDirty.addEventListener('click', () => {
        clearActiveButtons();
        btnDirty.classList.add('active');
        // Borewell water: 1450 raw -> 180 outlet (Cleaned successfully by filter)
        setScenario(1450, 180, 'safe', true);
    });

    btnBroken.addEventListener('click', () => {
        clearActiveButtons();
        btnBroken.classList.add('active');
        // Broken filter scenario: 2200 raw -> 2200 outlet (Filter failed, Unsafe alert!)
        setScenario(2200, 2200, 'unsafe', false);
    });

    // Deployment Point Switcher
    pointPills.forEach(pill => {
        pill.addEventListener('click', () => {
            pointPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            locTitle.textContent = pill.getAttribute('data-point');
        });
    });

    // Initialize Default Scenario: Good Water
    setScenario(1250, 120, 'safe', true);
});
