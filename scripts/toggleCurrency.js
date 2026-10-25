
const usd = document.getElementById("currencyusd");
const gbp = document.getElementById("currencygbp");

// Load the saved currency, or default to USD
let currency = localStorage.getItem("currency") || "USD";

function setCurrency(newCurrency) {
    currency = newCurrency;
    localStorage.setItem("currency", currency);

    console.log("Currency set to:", currency);

    // Update the active button styling
    usd.classList.toggle("bg-indigo-500", currency === "USD");
    usd.classList.toggle("text-white", currency === "USD");
    usd.classList.toggle("text-gray-400", currency !== "USD");

    gbp.classList.toggle("bg-indigo-500", currency === "GBP");
    gbp.classList.toggle("text-white", currency === "GBP");
    gbp.classList.toggle("text-gray-400", currency !== "GBP");
}

// Listen for clicks
usd.addEventListener("click", () => setCurrency("USD"));
gbp.addEventListener("click", () => setCurrency("GBP"));

// Apply the saved selection on page load
setCurrency(currency);

