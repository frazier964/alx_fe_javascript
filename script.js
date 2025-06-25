const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.",           category: "Life" },
  { text: "If you want something you've never had, you must do something you've never done.", category: "Motivation" },
];



const quoteBox  = document.getElementById("quoteBox");   
const controls  = document.getElementById("controls");   


const el = (tag, options = {}) => Object.assign(document.createElement(tag), options);



window.addEventListener("DOMContentLoaded", () => {
  createCategorySelect();
  createRandomButton();
  createAddQuoteForm();
});



function createCategorySelect() {
  const select = el("select", { id: "categorySelect" });
  refreshCategoryOptions(select);

  select.addEventListener("change", () => {
    const chosen = select.value;
    if (chosen === "__all__") showRandomQuote();           // “All” → random from any category
    else                     showRandomQuote(chosen);
  });

  controls.appendChild(select);
}

function refreshCategoryOptions(select) {
  
  select.innerHTML = "";
  const categories = [...new Set(quotes.map(q => q.category))].sort();

  
  select.appendChild(el("option", { value: "__all__", innerText: "All Categories" }));

  categories.forEach(cat => {
    select.appendChild(el("option", { value: cat, innerText: cat }));
  });
}



function createRandomButton() {
  const btn = el("button", { id: "randomBtn", innerText: "Random Quote" });

  btn.addEventListener("click", () => showRandomQuote());

  controls.appendChild(btn);
}

function showRandomQuote(category = null) {
  
  const pool = category ? quotes.filter(q => q.category === category) : quotes;
  if (pool.length === 0) {
    quoteBox.textContent = `No quotes available in “${category}”.`;
    return;
  }
  const { text, category: cat } = pool[Math.floor(Math.random() * pool.length)];
  quoteBox.innerHTML = `<em>"${text}"</em><br><strong>— ${cat}</strong>`;
}



function createAddQuoteForm() {
  const form = el("form", { id: "addQuoteForm", style: "display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1.5rem;" });

  const txtInput   = el("input", { type: "text", id: "newQuoteText",     placeholder: "Enter a new quote",       required: true, style:"flex:2 1 200px;" });
  const catInput   = el("input", { type: "text", id: "newQuoteCategory", placeholder: "Enter quote category",    required: true, style:"flex:1 1 150px;" });
  const addBtn     = el("button", { innerText: "Add Quote", type: "submit" });

  form.append(txtInput, catInput, addBtn);
  controls.appendChild(form);


  form.addEventListener("submit", e => {
    e.preventDefault();

    const text = txtInput.value.trim();
    const category = catInput.value.trim() || "Uncategorized";
    if (!text) return;

    
    quotes.push({ text, category });

    
    const select = document.getElementById("categorySelect");
    if ([...select.options].every(o => o.value !== category)) {
      refreshCategoryOptions(select);
    }

    
    form.reset();
    showRandomQuote(category);          
  });
}
