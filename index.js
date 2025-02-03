// Expense Tracker script
const expenseArray = JSON.parse(localStorage.getItem("expenses")) || [];
const categories = [];

const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const descriptionInp = document.getElementById("descriptionInp");
const categoryInp = document.getElementById("categoryInp");
const amountInp = document.getElementById("amountInp");

class newExpense {
    constructor(description, amount, category) {
        this.description = description,
        this.amount = amount,
        this.category = category
     }
 }

addExpenseBtn.addEventListener("click", event => {
    if(descriptionInp.value != "" && categoryInp.value != "" && amountInp.value != ""){
        event.preventDefault() //prevents the defualt behaviour of the botton to reload page
            
        const anExpense = new newExpense(descriptionInp.value, amountInp.value, categoryInp.value);
        expenseArray.push(anExpense);
    
        updateLocalStorage();
    }
        descriptionInp.value = "";
        amountInp.value = "";
        categoryInp.value = "";
    
    updateExpenseListUI()
})
document.addEventListener("DOMContentLoaded", function() {
    updateExpenseListUI()
})


function createCategoryDiv(){
    expenseArray.forEach((expense, index) => {
        if(!categories.includes(expense.category)){
            categories.push(expense.category);
        }
    })

    categories.forEach(category => {
        const article = document.createElement("article");
        const h1 = document.createElement("h1");

        article.className = "category";
        article.id = category;
        h1.className = "categoryHead";

        h1.textContent = `${category}`;

        article.appendChild(h1);
        expenseList.appendChild(article);
    })
}

function createExpenseElement(expense){
    const div = document.createElement("div");
    const p = document.createElement("p");
    const button = document.createElement("button");
    const ul = document.createElement("ul");
    const li = document.createElement("li");

    p.innerHTML = `${expense.description} <br> $${expense.amount}`;
    button.innerHTML = "x"

    div.className = "categoryList";
    button.className = "cancelExp";

    button.addEventListener("click", () => {deleteExpense(expense.description)})

    const category = document.getElementById(expense.category);

    div.appendChild(p)
    div.appendChild(button);
    li.appendChild(div);
    ul.appendChild(li);
    category.appendChild(ul);
}

function deleteExpense(description){
    const expenseToDelete = expenseArray.findIndex(expense => {
        if(expense.description == description){
            return expense;
        }
    })

    expenseArray.forEach((expense, index) => {
        if(categories.includes(expense.category)){
            categories.splice(index, 1);
        }
    })
    expenseArray.splice(expenseToDelete, 1)
    updateLocalStorage();
    updateExpenseListUI();
}

function updateLocalStorage(){
    localStorage.setItem("expenses", JSON.stringify(expenseArray));
}

function updateExpenseListUI(){
    expenseList.textContent = "";

    createCategoryDiv();
    expenseArray.forEach(expense => {
        createExpenseElement(expense);
    })
}