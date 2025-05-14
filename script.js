var balance = document.querySelector("#balance");
var income = document.querySelector("#money-plus");
var expense = document.querySelector("#money-minus");
var list = document.querySelector("#list");
var transactions = [];
var form = document.querySelector("form");
var updateValues = function () {
    var total = transactions.map(function (transaction) { return transaction.amount; });
    var bal = total.reduce(function (acc, curr) { return (acc += curr); }, 0);
    if (balance)
        balance.innerHTML = '$' + String(bal);
    var incomeVal = total.filter(function (transaction) { return transaction >= 0; }).reduce(function (acc, curr) { return (acc += curr); }, 0);
    if (income)
        income.innerHTML = "+$" + String(incomeVal);
    var expenseVal = total.filter(function (transaction) { return transaction < 0; }).reduce(function (acc, curr) { return (acc += curr); }, 0);
    if (expense)
        expense.innerHTML = "-$" + String(expenseVal);
};
var addTransactionDom = function (transaction) {
    var li = document.createElement("li");
    li.classList.add(transaction.amount < 0 ? "minus" : "plus");
    li.innerHTML = "\n    ".concat(transaction.text, " <span>").concat(transaction.amount < 0 ? "-" : "+", "$").concat(Math.abs(transaction.amount), "</span><button onClick=\"deleteTransaction(").concat(transaction.id, ")\" class=\"delete-btn\">x</button>\n    ");
    list === null || list === void 0 ? void 0 : list.appendChild(li);
    updateValues();
};
function deleteTransaction(id) {
    transactions = transactions.filter(function (each) { return each.id !== id; });
    init();
}
function init() {
    if (list)
        list.innerHTML = "";
    transactions.forEach(function (each) { return addTransactionDom(each); });
}
init();
var afterSubmission = function (e) {
    e.preventDefault();
    var text = document.querySelector("#text");
    var amount = document.querySelector("#amount");
    var transaction = {
        id: Math.floor(Math.random() * 100000000),
        text: text === null || text === void 0 ? void 0 : text.value,
        amount: Number(amount === null || amount === void 0 ? void 0 : amount.value),
    };
    transactions.push(transaction);
    addTransactionDom(transaction);
    text.value = "";
    amount.value = "";
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", afterSubmission);
