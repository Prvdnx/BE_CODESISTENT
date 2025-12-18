// dom elements
const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

// load transactions from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// event listener
transactionFormEl.addEventListener("submit", addTransaction);

// add new transaction
function addTransaction(e) {
  e.preventDefault();
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);
  transactions.push({ id: Date.now(), description, amount });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummary();
  transactionFormEl.reset();
}

// update the transaction list display
function updateTransactionList() {
  transactionListEl.innerHTML = "";
  [...transactions].reverse().forEach((transaction) => {
    transactionListEl.appendChild(createTransactionElement(transaction));
  });
}

// create transaction list item element
function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction", transaction.amount > 0 ? "income" : "expense");
  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>`;
  return li;
}

// calculate and update balance, income, and expenses
function updateSummary() {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}

// format number as currency
function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
}

// remove transaction and update displays
function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummary();
}

// initial render
updateTransactionList();
updateSummary();
