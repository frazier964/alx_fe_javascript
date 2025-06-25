const STORAGE_KEY_QUOTES = "quotes";
const STORAGE_KEY_FILTER = "selectedCategory";

let quotes = JSON.parse(localStorage.getItem(STORAGE_KEY_QUOTES)) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is really simple, but we insist on making it complicated.", category: "Life" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" }
];

function saveQuotes() {
  localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify(quotes));
}

function saveSelectedCategory(category) {
  localStorage.setItem(STORAGE_KEY_FILTER, category);
}

function getSelectedCategory() {
  return localStorage.getItem(STORAGE_KEY_FILTER) || "all";
}

function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const uniqueCategories = Array.from(new Set(quotes.map(q => q.category)));

  // Clear current options except "All"
  select.innerHTML = `<option value="all">All Categories</option>`;

  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  // Restore last selected category
  select.value = getSelectedCategory();
}

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  saveSelectedCategory(selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML =
    `<p>"${quote.text}"<br><strong>- ${quote.category}</strong></p>`;
}

function showRandomQuote() {
  filterQuotes(); // Reuse filter logic
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories(); // Update dropdown
  showRandomQuote();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

function createAddQuoteForm() {
  const formDiv = document.getElementById("formContainer");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  formDiv.appendChild(inputText);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  createAddQuoteForm();
  populateCategories();
  showRandomQuote();
});



