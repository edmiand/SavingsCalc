document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-earnings-button').addEventListener('click', calculateEarnings);
    document.getElementById('clear-earnings-button').addEventListener('click', clearEarningsForm);
    document.getElementById('calculate-savings-button').addEventListener('click', calculateSavings);
    document.getElementById('clear-savings-button').addEventListener('click', clearSavingsForm);

    document.getElementById('original-price').addEventListener('input', suggestSellPrice);
    document.getElementById('amortization-period').addEventListener('input', suggestSellPrice);
});

// Format numbers to be human-readable with commas and periods
function formatNumber(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Suggest Estimated Sell Price based on 5% annual growth
function suggestSellPrice() {
    const originalPrice = parseFloat(document.getElementById('original-price').value);
    const amortizationPeriod = parseInt(document.getElementById('amortization-period').value);

    if (!isNaN(originalPrice) && !isNaN(amortizationPeriod) && amortizationPeriod > 0) {
        const growthRate = 0.05;
        const suggestedSellPrice = originalPrice * Math.pow(1 + growthRate, amortizationPeriod);
        document.getElementById('estimated-sell-price').value = suggestedSellPrice.toFixed(2);
    }
}

// Calculate Property Earnings
function calculateEarnings() {
    const originalPrice = parseFloat(document.getElementById('original-price').value);
    const mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const amortizationPeriod = parseInt(document.getElementById('amortization-period').value);
    const estimatedSellPrice = parseFloat(document.getElementById('estimated-sell-price').value.replace(/,/g, ''));

    if (isNaN(originalPrice) || isNaN(mortgageAmount) || isNaN(interestRate) || isNaN(amortizationPeriod) || isNaN(estimatedSellPrice)) {
        document.getElementById('earnings-results').innerHTML = '<p>Please enter valid numbers in all fields.</p>';
        return;
    }

    const monthlyRate = interestRate / 12;
    const numberOfPayments = amortizationPeriod * 12;

    const monthlyPayment = mortgageAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalMortgagePayments = monthlyPayment * numberOfPayments;
    const totalInterestPaid = totalMortgagePayments - mortgageAmount;
    const totalPayments = totalMortgagePayments;

    const estimatedEarnings = estimatedSellPrice - totalPayments;
    const averageInterestPerYear = totalInterestPaid / amortizationPeriod;

    document.getElementById('earnings-results').innerHTML = `
        <p><strong>Total Mortgage Payments:</strong> $${formatNumber(totalMortgagePayments)}</p>
        <p><strong>Total Interest Paid:</strong> $${formatNumber(totalInterestPaid)}</p>
        <p><strong>Total Payments (Principal + Interest):</strong> $${formatNumber(totalPayments)}</p>
        <p><strong>Estimated Earnings:</strong> $${formatNumber(estimatedEarnings)}</p>
        <p><strong>Average Interest Paid per Year:</strong> $${formatNumber(averageInterestPerYear)}</p>
    `;
}

// Clear Property Earnings form and results
function clearEarningsForm() {
    document.getElementById('earnings-form').reset();
    document.getElementById('earnings-results').innerHTML = '';
}

// Calculate Savings
function calculateSavings() {
    const originalSavings = parseFloat(document.getElementById('original-savings').value);
    const annualContribution = parseFloat(document.getElementById('annual-contribution').value);
    const savingsYears = parseInt(document.getElementById('savings-years').value);
    const savingsInterestRate = parseFloat(document.getElementById('savings-interest-rate').value) / 100;

    if (isNaN(originalSavings) || isNaN(annualContribution) || isNaN(savingsYears) || isNaN(savingsInterestRate)) {
        document.getElementById('savings-results').innerHTML = '<p>Please enter valid numbers in all fields.</p>';
        return;
    }

    let totalSavings = originalSavings;
    for (let year = 1; year <= savingsYears; year++) {
        totalSavings += annualContribution;
        totalSavings *= (1 + savingsInterestRate);
    }

    document.getElementById('savings-results').innerHTML = `
        <p><strong>Total Savings:</strong> $${formatNumber(totalSavings)}</p>
    `;
}

// Clear Savings form and results
function clearSavingsForm() {
    document.getElementById('savings-form').reset();
    document.getElementById('savings-results').innerHTML = '';
}
