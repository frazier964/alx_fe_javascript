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
fetchQuotesFromServer
  https://jsonplaceholder.typicode.com/posts
  syncQuotes
  setInterval
  Quotes synced with server!
  
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

/*****************************************************************
 *  SYNC LAYER – Mock server via JSONPlaceholder                 *
 *****************************************************************/

// ---- adjustable knobs ----------------------------------------
const SERVER_URL    = "https://jsonplaceholder.typicode.com";
const ENDPOINT_GET  = `${SERVER_URL}/posts?userId=1`;  // pretend posts are quotes
const ENDPOINT_POST = `${SERVER_URL}/posts`;           // will just return 201
const SYNC_INTERVAL_MS = 30_000;                       // 30-second polling

// ---- tiny toast helper ---------------------------------------
function toast(msg, ms = 3000) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), ms);
}

// ---- merge + conflict-resolution ------------------------------
// rule: if same text exists but categories differ -> take server's
function mergeServerQuotes(serverQuotes) {
  let merged = [...quotes];                     // start with local

  serverQuotes.forEach(sq => {
    const exists = merged.find(lq => lq.text === sq.text);
    if (!exists) {
      merged.push(sq);                          // new item → add
    } else if (exists.category !== sq.category) {
      // conflict: server wins, but keep a copy of local for user review
      exists._conflictWith = exists.category;   // keep old cat
      exists.category = sq.category;            // adopt server cat
      toast(`Conflicting category for “${sq.text}” — server version kept.`);
    }
  });

  quotes = merged;
  saveQuotes();                // reuse your existing saver
  populateCategories();        // dropdown refresh
  filterQuotes();              // refresh current view
}

// ---- pull -----------------------------------------------------
async function pullQuotesFromServer() {
  try {
    const res = await fetch(ENDPOINT_GET);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Bad payload");
    // Map JSONPlaceholder "posts" → {text, category}
    const serverQuotes = data.map(p => ({
      text: p.title,
      category: "Server"        // single category for demo
    }));
    mergeServerQuotes(serverQuotes);
    toast("🟢 Pulled latest quotes from server");
  } catch (err) {
    toast("🔴 Pull failed: " + err.message);
  }
}

// ---- push -----------------------------------------------------
let unsyncedLocal = []; // holds quotes added since last push

async function pushLocalQuotes() {
  if (unsyncedLocal.length === 0) return;
  try {
    // simulate POST for each new quote
    await Promise.all(
      unsyncedLocal.map(q =>
        fetch(ENDPOINT_POST, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: 1, title: q.text, body: q.category })
        })
      )
    );
    unsyncedLocal = [];      // clear queue
    toast("🟢 Local quotes synced to server");
  } catch (err) {
    toast("🔴 Push fa

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



