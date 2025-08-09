// Calculator Implementation Functions

// Utility Functions
const formatINR = (number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(number).replace('₹', '');
};

const formatNumber = (number, decimals = 2) => {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    }).format(number);
};

// Savings Calculator
function calculateSavings(monthlyBill, sunHours, electricityRate, efficiency) {
    const monthlyUsage = monthlyBill / electricityRate;
    const dailyUsage = monthlyUsage / 30;
    const systemSize = (dailyUsage / sunHours) / (efficiency / 100);
    const monthlySavings = monthlyBill * (efficiency / 100);
    const annualSavings = monthlySavings * 12;
    const lifetimeSavings = annualSavings * 25;

    return {
        monthlySavings,
        annualSavings,
        lifetimeSavings,
        systemSize: formatNumber(systemSize, 2)
    };
}

// Panel Size Calculator
function calculatePanelSize(monthlyUsage, sunHours, panelWattage, systemLosses) {
    const dailyEnergy = (monthlyUsage * 1000) / 30;
    const requiredPanels = Math.ceil(dailyEnergy / (panelWattage * sunHours * (1 - systemLosses/100)));
    const systemSize = (requiredPanels * panelWattage) / 1000;
    const roofArea = requiredPanels * 17.5;

    return {
        numberOfPanels: requiredPanels,
        systemSize: formatNumber(systemSize, 2),
        roofArea: Math.ceil(roofArea)
    };
}

// Battery Storage Calculator
function calculateBatteryStorage(dailyUsage, backupDays, depthOfDischarge, systemVoltage) {
    const batteryCapacity = (dailyUsage * backupDays) / (depthOfDischarge/100);
    const ampHours = (batteryCapacity * 1000) / systemVoltage;
    const batteryCount = Math.ceil(batteryCapacity / 10);

    return {
        batteryCapacity: formatNumber(batteryCapacity, 2),
        ampHours: Math.ceil(ampHours),
        batteryCount
    };
}

// ROI Calculator
function calculateROI(systemCost, annualSavings, taxCredit, maintenanceCost) {
    const netSystemCost = systemCost * (1 - taxCredit/100);
    const annualNet = annualSavings - maintenanceCost;
    const paybackPeriod = netSystemCost / annualNet;
    const netSavings = (annualNet * 25) - netSystemCost;
    const roi = ((netSavings / netSystemCost) * 100);

    return {
        paybackPeriod: formatNumber(paybackPeriod, 1),
        netSavings,
        roi: formatNumber(roi, 1)
    };
}

// Carbon Offset Calculator
function calculateCarbonOffset(monthlyProduction, systemLife, gridSource) {
    let co2PerKwh;
    switch(gridSource) {
        case 'coal': co2PerKwh = 2.2; break;
        case 'natural_gas': co2PerKwh = 0.9; break;
        default: co2PerKwh = 1.5;
    }

    const annualProduction = monthlyProduction * 12;
    const annualCO2 = (annualProduction * co2PerKwh) / 2000;
    const lifetimeCO2 = annualCO2 * systemLife;
    const treesPlanted = lifetimeCO2 * 46.3;

    return {
        annualCO2: formatNumber(annualCO2, 1),
        lifetimeCO2: formatNumber(lifetimeCO2, 1),
        treesPlanted: Math.round(treesPlanted)
    };
}

// Initialize all calculators
document.addEventListener('DOMContentLoaded', function() {
    // Savings Calculator
    const savingsForm = document.getElementById('savingsCalculator');
    if (savingsForm) {
        savingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {
                monthlyBill: parseFloat(this.monthlyBill.value),
                sunHours: parseFloat(this.sunHours.value),
                electricityRate: parseFloat(this.electricityRate.value),
                efficiency: parseFloat(this.efficiency.value)
            };

            const results = calculateSavings(data.monthlyBill, data.sunHours, data.electricityRate, data.efficiency);
            
            document.getElementById('monthlySavings').textContent = formatINR(results.monthlySavings);
            document.getElementById('annualSavings').textContent = formatINR(results.annualSavings);
            document.getElementById('lifetimeSavings').textContent = formatINR(results.lifetimeSavings);
            document.getElementById('savingsResult').classList.remove('d-none');
        });
    }

    // ROI Calculator
    const roiForm = document.getElementById('roiCalculator');
    if (roiForm) {
        roiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {
                systemCost: parseFloat(this.systemCost.value),
                annualSavings: parseFloat(this.annualSavings.value),
                taxCredit: parseFloat(this.taxCredit.value),
                maintenanceCost: parseFloat(this.maintenanceCost.value)
            };

            const results = calculateROI(data.systemCost, data.annualSavings, data.taxCredit, data.maintenanceCost);
            
            document.getElementById('paybackPeriod').textContent = results.paybackPeriod;
            document.getElementById('netSavings').textContent = formatINR(results.netSavings);
            document.getElementById('roiPercentage').textContent = results.roi;
            document.getElementById('roiResult').classList.remove('d-none');
        });
    }

    // Panel Size Calculator
    const panelSizeForm = document.getElementById('panelSizeCalculator');
    if (panelSizeForm) {
        panelSizeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {
                monthlyUsage: parseFloat(this.monthlyUsage.value),
                sunHours: parseFloat(this.sunHours.value),
                panelWattage: parseFloat(this.panelWattage.value),
                systemLosses: parseFloat(this.systemLosses.value)
            };

            const results = calculatePanelSize(data.monthlyUsage, data.sunHours, data.panelWattage, data.systemLosses);
            
            document.getElementById('numberOfPanels').textContent = results.numberOfPanels;
            document.getElementById('systemSize').textContent = results.systemSize;
            document.getElementById('roofArea').textContent = results.roofArea;
            document.getElementById('panelSizeResult').classList.remove('d-none');
        });
    }

    // Battery Storage Calculator
    const batteryForm = document.getElementById('batteryCalculator');
    if (batteryForm) {
        batteryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {
                dailyUsage: parseFloat(this.dailyUsage.value),
                backupDays: parseFloat(this.backupDays.value),
                depthOfDischarge: parseFloat(this.depthOfDischarge.value),
                systemVoltage: parseFloat(this.systemVoltage.value)
            };

            const results = calculateBatteryStorage(data.dailyUsage, data.backupDays, data.depthOfDischarge, data.systemVoltage);
            
            document.getElementById('batteryCapacity').textContent = results.batteryCapacity;
            document.getElementById('ampHours').textContent = results.ampHours;
            document.getElementById('batteryCount').textContent = results.batteryCount;
            document.getElementById('batteryResult').classList.remove('d-none');
        });
    }

    // Carbon Offset Calculator
    const carbonForm = document.getElementById('carbonCalculator');
    if (carbonForm) {
        carbonForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {
                monthlyProduction: parseFloat(this.monthlyProduction.value),
                systemLife: parseFloat(this.systemLife.value),
                gridSource: this.gridSource.value
            };

            const results = calculateCarbonOffset(data.monthlyProduction, data.systemLife, data.gridSource);
            
            document.getElementById('annualCO2').textContent = results.annualCO2;
            document.getElementById('lifetimeCO2').textContent = results.lifetimeCO2;
            document.getElementById('treesPlanted').textContent = results.treesPlanted;
            document.getElementById('carbonResult').classList.remove('d-none');
        });
    }
}); 