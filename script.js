// Get Elements
const form = document.getElementById("transactionForm");
const table = document.getElementById("transactionTable");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const transactionEl = document.getElementById("transactions");

const themeBtn = document.getElementById("themeBtn");
const search = document.getElementById("search");

// Load Data
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Display Transactions
function displayTransactions(list = transactions) {

    table.innerHTML = "";

    list.forEach((item, index) => {

        let row = `
        <tr>
            <td>${item.title}</td>
            <td>₹${item.amount}</td>
            <td>${item.type}</td>
            <td>${item.category}</td>
            <td>${item.date}</td>
            <td>
                <button class="deleteBtn" onclick="deleteTransaction(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

        table.innerHTML += row;
    });

    updateDashboard();
}

// Add Transaction
form.addEventListener("submit", function(e){

    e.preventDefault();

    let transaction = {

        title: document.getElementById("title").value,
        amount: Number(document.getElementById("amount").value),
        type: document.getElementById("type").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value

    };

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();

    form.reset();

});

// Delete Transaction
function deleteTransaction(index){

    transactions.splice(index,1);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();

}

// Update Dashboard
function updateDashboard(){

    let income = 0;
    let expense = 0;

    transactions.forEach(item=>{

        if(item.type==="Income")
            income += item.amount;
        else
            expense += item.amount;

    });

    incomeEl.innerText = "₹" + income;
    expenseEl.innerText = "₹" + expense;
    balanceEl.innerText = "₹" + (income-expense);
    transactionEl.innerText = transactions.length;

}

// Search
search.addEventListener("keyup",function(){

    let value = search.value.toLowerCase();

    let filtered = transactions.filter(item=>{

        return item.title.toLowerCase().includes(value);

    });

    displayTransactions(filtered);

});

// Dark Mode
themeBtn.addEventListener("click",function(){

    document.body.classList.toggle("dark");

});

// Initial Load
displayTransactions();