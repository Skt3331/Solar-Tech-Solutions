// Solar Calculator Advanced Functions

// Constants
const SOLAR_CONSTANT = 1000; // W/m²
const STANDARD_TEST_TEMP = 25; // °C
const EARTH_TILT = 23.45; // degrees

// Utility Functions
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Solar Position Calculations
function calculateSolarPosition(latitude, longitude, date) {
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const declination = EARTH_TILT * Math.sin(degreesToRadians(360/365 * (dayOfYear - 81)));
    const hourAngle = 15 * (12 - date.getHours());
    
    const altitude = Math.asin(
        Math.sin(degreesToRadians(latitude)) * Math.sin(degreesToRadians(declination)) +
        Math.cos(degreesToRadians(latitude)) * Math.cos(degreesToRadians(declination)) * Math.cos(degreesToRadians(hourAngle))
    );
    
    const azimuth = Math.acos(
        (Math.sin(degreesToRadians(declination)) - Math.sin(altitude) * Math.sin(degreesToRadians(latitude))) /
        (Math.cos(altitude) * Math.cos(degreesToRadians(latitude)))
    );
    
    return { altitude: altitude * 180/Math.PI, azimuth: azimuth * 180/Math.PI };
}

// Performance Calculations
function calculateSystemEfficiency(baseEfficiency, temperature, soilingLoss, wireLosses) {
    const temperatureEffect = (temperature - STANDARD_TEST_TEMP) * -0.004; // -0.4% per degree C above 25°C
    return baseEfficiency * (1 + temperatureEffect) * (1 - soilingLoss/100) * (1 - wireLosses/100);
}

function calculateEnergyProduction(systemSize, efficiency, sunHours, orientation, pitch, shading) {
    const orientationFactor = Math.cos(degreesToRadians(orientation));
    const pitchFactor = Math.cos(degreesToRadians(90 - pitch));
    const shadingFactor = 1 - (shading / 100);
    
    return systemSize * efficiency/100 * sunHours * orientationFactor * pitchFactor * shadingFactor * 365;
}

// Financial Calculations
function calculateLCOE(systemCost, annualProduction, operatingCosts, lifetime, discountRate) {
    let totalCosts = systemCost;
    let totalProduction = 0;
    let discountFactor = 1;
    
    for (let year = 0; year < lifetime; year++) {
        discountFactor = 1 / Math.pow(1 + discountRate/100, year);
        totalCosts += operatingCosts * discountFactor;
        totalProduction += annualProduction * discountFactor;
    }
    
    return totalCosts / totalProduction;
}

function calculateNPV(systemCost, annualSavings, operatingCosts, lifetime, discountRate) {
    let npv = -systemCost;
    for (let year = 1; year <= lifetime; year++) {
        const netCashFlow = annualSavings - operatingCosts;
        npv += netCashFlow / Math.pow(1 + discountRate/100, year);
    }
    return npv;
}

function calculateIRR(systemCost, annualSavings, operatingCosts, lifetime) {
    let irr = 0;
    const step = 0.1;
    const tolerance = 0.0001;
    
    while (Math.abs(calculateNPV(systemCost, annualSavings, operatingCosts, lifetime, irr)) > tolerance) {
        irr += step;
        if (irr > 100) return null; // No solution found
    }
    
    return irr;
}

// Environmental Impact Calculations
function calculateCO2Offset(annualProduction, gridEmissionFactor) {
    return (annualProduction * gridEmissionFactor) / 2204.62; // Convert lbs to metric tons
}

function calculateTreeEquivalent(co2Offset) {
    return co2Offset * 46.296; // Average tree absorbs 48 lbs of CO2 per year
}

// Monthly Production Estimation
function calculateMonthlyProduction(systemSize, efficiency, latitude, orientation, pitch) {
    const months = [];
    for (let month = 0; month < 12; month++) {
        const date = new Date(2024, month, 15, 12, 0, 0); // Use middle of each month at noon
        const solarPosition = calculateSolarPosition(latitude, 0, date);
        
        // Adjust sun hours based on season and location
        const seasonalFactor = 1 + 0.2 * Math.cos(degreesToRadians((month - 6) * 30));
        const latitudeFactor = 1 - Math.abs(latitude) / 90 * 0.3;
        
        const monthlyProduction = systemSize * efficiency/100 * 
            30 * // days in month
            seasonalFactor * 
            latitudeFactor * 
            Math.cos(degreesToRadians(orientation)) *
            Math.cos(degreesToRadians(90 - pitch)) *
            Math.sin(degreesToRadians(solarPosition.altitude));
            
        months.push(Math.max(0, monthlyProduction));
    }
    return months;
}

// Performance Ratio Calculation
function calculatePerformanceRatio(actualProduction, theoreticalProduction) {
    return (actualProduction / theoreticalProduction) * 100;
}

// Energy Yield Calculation
function calculateEnergyYield(annualProduction, systemSizeKWp) {
    return annualProduction / systemSizeKWp;
}

// Export functions for use in the calculator
window.solarCalculator = {
    calculateSystemEfficiency,
    calculateEnergyProduction,
    calculateLCOE,
    calculateNPV,
    calculateIRR,
    calculateCO2Offset,
    calculateTreeEquivalent,
    calculateMonthlyProduction,
    calculatePerformanceRatio,
    calculateEnergyYield
}; 