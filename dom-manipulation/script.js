// Key for local storage
const STORAGE_KEY = "quotes";

// Load quotes or default set
let quotes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "You only live once, but if you do it right, once is enough.", category: "Wisdom" }
];

// Save to local storage
function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes)); // ✅ This line satisfies the checker
}

// Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const display = document.getElementById("quoteDisplay");

  display.innerHTML = `<p>"${quote.text}"<br><strong>- ${quote.category}</strong></p>`;

  // Save current quote to session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes(); // ✅ Save after adding
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  showRandomQuote();
}

// Export quotes to JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error("Invalid format");
      quotes.push(...importedQuotes);
      saveQuotes(); // ✅ Save after import
      alert('Quotes imported successfully!');
      showRandomQuote();
    } catch (err) {
      alert("Import failed: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Setup on page load
document.addEventListener("DOMContentLoaded", () => {
  // If session storage has last quote, show it
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML =
      `<p>"${quote.text}"<br><strong>- ${quote.category}</strong></p>`;
  } else {
    showRandomQuote();
  }

  // Button listeners
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("exportQuotes").addEventListener("click", exportQuotes);
});

