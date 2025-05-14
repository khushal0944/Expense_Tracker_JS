const balance = document.querySelector("#balance");
const income = document.querySelector("#money-plus");
const expense = document.querySelector("#money-minus");
const list = document.querySelector("#list");

interface Transaction {
    id: number,
    text: string,
    amount: number,
}

let transactions: Transaction[] = []

const form = document.querySelector("form")

const updateValues = () => {
    const total = transactions.map(transaction => transaction.amount)
    const bal = total.reduce((acc, curr) => (acc += curr), 0)
    if (balance) balance.innerHTML = '$' + String(bal);
    const incomeVal = total.filter(transaction => transaction >= 0).reduce((acc, curr) => (acc += curr), 0)
    if (income) income.innerHTML = "+$" + String(incomeVal);
    const expenseVal = total.filter(transaction => transaction < 0).reduce((acc, curr) => (acc += curr), 0)
    if (expense) expense.innerHTML = "-$" + String(expenseVal);
}

const addTransactionDom = (transaction: Transaction) => {
    const li = document.createElement("li");
    li.classList.add(transaction.amount < 0 ? "minus" : "plus");
    li.innerHTML = `
    ${transaction.text} <span>${transaction.amount < 0 ? "-" : "+"}$${Math.abs(
        transaction.amount
	)}</span><button onClick="deleteTransaction(${transaction.id})" class="delete-btn">x</button>
    `;
    list?.appendChild(li)
    updateValues();
    
}

function deleteTransaction(id: number) {
    transactions = transactions.filter(each => each.id !== id)
    init()
}

function init () {
    if (list) list.innerHTML = "";
	transactions.forEach((each) => addTransactionDom(each));
}
init()


const afterSubmission = (e: any) => {
	e.preventDefault();
	const text = document.querySelector("#text") as HTMLInputElement;
	const amount = document.querySelector("#amount") as HTMLInputElement;
	const transaction: Transaction = {
		id: Math.floor(Math.random() * 100000000),
		text: text?.value,
		amount: Number(amount?.value),
	};
	transactions.push(transaction);
	addTransactionDom(transaction);
	text.value = "";
	amount.value = "";
};

form?.addEventListener("submit", afterSubmission)