const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Get data from Local Storage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add transaction to page
function addTransactionDOM(transaction) {

    const sign = transaction.amount < 0 ? "minus" : "";

    const item = document.createElement("li");

    item.classList.add(sign);

    item.innerHTML = `
        ${transaction.text}
        <span>₹${transaction.amount}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

// Update balance
function updateValues() {

    const amounts = transactions.map(item => item.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    const expense = (
        amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balance.innerText = `₹${total}`;
    moneyPlus.innerText = `₹${income}`;
    moneyMinus.innerText = `₹${expense}`;
}

// Save to Local Storage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initialize App
function init() {

    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);

    updateValues();
}

init();

// Add Transaction
form.addEventListener("submit", function(e){

    e.preventDefault();

    if(text.value.trim()==="" || amount.value===""){
        alert("Please enter all fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    updateLocalStorage();

    init();

    text.value="";
    amount.value="";
});

// Delete Transaction
function removeTransaction(id){

    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}