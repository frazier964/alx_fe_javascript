// Initial quotes array
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success usually comes to those who are too busy to be looking for it.", category: "Success" }
];

// Show a random quote from quotes array
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `<p>"${quote.text}"<br><strong>– ${quote.category}</strong></p>`;
}

// Add a new quote from the form inputs
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text === "" || category === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  showRandomQuote(); // Show the newly added quote
}

// Attach event listeners after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

  // Show an initial random quote on page load
  showRandomQuote();
});
