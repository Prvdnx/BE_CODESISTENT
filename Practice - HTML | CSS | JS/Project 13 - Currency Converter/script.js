// dom elements
const form = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

// event listeners
window.addEventListener("load", fetchCurrencies);
form.addEventListener("submit", convertCurrency);

// fetch currencies
async function fetchCurrencies() {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();

    Object.keys(data.rates).forEach(currency => {
        fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });
}

// convert currency
async function convertCurrency(e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount <= 0) return alert("Please enter a valid amount");

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const converted = (amount * data.rates[to]).toFixed(2);

    resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
}
