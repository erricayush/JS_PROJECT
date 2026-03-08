// "Q7. Create a personal finance tracker that allows users to manage and analyze their transactions. This assignment will help you practice using array methods, data transformations, and chaining methods.



// 1. Setting Up Transactions:
//    - Create an array `transactions` where each element is an object representing a transaction. Each object should have properties `id`, `amount`, `date`, and `type` (either `""income""` or `""expense""`).

//    Example:
//    const transactions = [
//      { id: 1, amount: 500, date: '2024-01-15', type: 'income' },
//      { id: 2, amount: -150, date: '2024-01-16', type: 'expense' },
//      { id: 3, amount: -50, date: '2024-01-17', type: 'expense' },
//      { id: 4, amount: 300, date: '2024-01-18', type: 'income' }
//    ];

// 2. Using Array Methods:
//    - Map: Create a new array with only the transaction amounts.
//    - Filter: Create a new array with only the expense transactions.
//    - Reduce: Calculate the total balance (income - expenses).

// 3. Data Transformations:
//    - Find: Write a function `findTransactionById(id)` that finds and returns a transaction by its ID.
//    - FindIndex: Write a function `getTransactionIndex(id)` that returns the index of a transaction by its ID.
//    - Some: Check if there are any transactions with an amount greater than a specified value.
//    - Every: Check if all transactions are of type `""income""`.

// 4. Sorting and Chaining:
//    - Sort: Create a function `sortTransactionsByDate()` that sorts transactions by date.
//    - Chaining: Create a function `getRecentExpenses()` that filters the last 30 days of expenses, maps their amounts, and then sorts them by amount.

// 5. Creating and Filling Arrays:
//    - Use the `fill` method to initialize an array with a specific number of empty slots and update it with default transaction values.

// 6. Creating DOM Elements:
//    - Create a simple HTML page that displays the list of transactions. Use JavaScript to dynamically create and insert list items into a `<ul>` element for each transaction.

// 7. Refactoring and Testing:
//    - Refactor your code to ensure it is clean and follows best practices. Test all functions to ensure they work correctly and efficiently."


// 1. Setting Up Transactions:
//    - Create an array `transactions` where each element is an object representing a transaction. Each object should have properties `id`, `amount`, `date`, and `type` (either `""income""` or `""expense""`).

const transaction = [];
function addTransaction(id, amount, date, type) {
    const obj = {
        id: id,
        amount: amount,
        date: new Date(date).toLocaleDateString(),
        type: type
    }
    transaction.push(obj);
    // console.log(obj)
}
console.log(transaction)

addTransaction(1, 3000, '2003-12-21', 'income')
addTransaction(2, 2000, '2026-01-25', 'expense')
addTransaction(3, 2200, '2026-02-12', 'expense')
addTransaction(4, 1000, '2015-01-12', 'expense')
addTransaction(5, 3500, '2026-01-29', 'income')
addTransaction(6, 3200, '2026-01-19', 'expense')



// 2. Using Array Methods:
//    - Map: Create a new array with only the transaction amounts.
//    - Filter: Create a new array with only the expense transactions.
//    - Reduce: Calculate the total balance (income - expenses).

// Map-----------------------------------------
const newArrayWithAmount = transaction.map((amnt) => {
    return amnt.amount;
})

console.log(newArrayWithAmount);


// // filter-----------------------------------------

const newArrayWithexpense = transaction.filter(function (exp) {
    return exp.type === 'expense';
})

console.log(newArrayWithexpense);


// // Reduce-----------------------------------------

const totalBalance = transaction.reduce((acc, current) => {
  if (current.type === 'income') {
    return acc + current.amount;
  } else if (current.type === 'expense') {
    return acc - current.amount;
  }
  return acc;
}, 0);

console.log(`Total Balance: ${totalBalance}`);



// 3. Data Transformations:
//    - Find: Write a function `findTransactionById(id)` that finds and returns a transaction by its ID.
//    - FindIndex: Write a function `getTransactionIndex(id)` that returns the index of a transaction by its ID.
//    - Some: Check if there are any transactions with an amount greater than a specified value.
//    - Every: Check if all transactions are of type `""income""`.


//    - Find: Write a function `findTransactionById(id)` that finds and returns a transaction by its ID.
function findTransactionById(id) {
    return transaction.find((trans) => {
        return trans.id === id;
    })
    
}
console.log(findTransactionById(2))

//    - FindIndex: Write a function `getTransactionIndex(id)` that returns the index of a transaction by its ID.

function getTransactionIndex(id) {
    
    return transaction.findIndex((trans) => {
        return trans.id === id
    })

}
console.log(getTransactionIndex(4));

//    - Some: Check if there are any transactions with an amount greater than a specified value.
const value = transaction.some((amnt) => {
    return amnt.amount > 2000;
})

console.log(value);


//  - Every: Check if all transactions are of type `""income""`.

const typeOfAll = transaction.every((trans) => {
    return trans.type === 'income';
})
console.log(typeOfAll);



// 4. Sorting and Chaining:
//    - Sort: Create a function `sortTransactionsByDate()` that sorts transactions by date.
//    - Chaining: Create a function `getRecentExpenses()` that filters the last 30 days of expenses, maps their amounts, and then sorts them by amount.

function sortTransactionsByDate() {
    return transaction.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    })
}

sortTransactionsByDate();
console.log(transaction);


function getRecentExpenses() {
    const today = new Date();
    const msDay = 1000 * 60 * 60 * 24;

    return transaction.filter((item) => {
        const diff = (today - new Date(item.date)) / msDay;
        return item.type === 'expense' && diff <= 30 && diff >= 0;
    })

        .map((item) => {
            return item.amount
        })
        .sort((a, b) => {
            return a - b;
        });
}

console.log(getRecentExpenses());


// 5. Creating and Filling Arrays:
//    - Use the `fill` method to initialize an array with a specific number of empty slots and update it with default transaction values.
const defaultTransaction = {
    id: 1,
    amount: 0,
    date: new Date().toLocaleDateString
};

const slots = 4;
const arr = Array(slots).fill(0).map((_, ind) => ({
    ...defaultTransaction,
    id: ind + 1
}));
console.log(arr)


// 6. Creating DOM Elements:
//    - Create a simple HTML page that displays the list of transactions. Use JavaScript to dynamically create and insert list items into a `<ul>` element for each transaction.


// const ele=document.createElement('ul');
// const parent=document.querySelector('body');

// parent.append(ele)

// const listItem1=document.createElement('li');
// listItem1.textContent= 'hello'

// const listItem2=document.createElement('li');
// listItem2.textContent='hi!';

// ele.prepend(listItem1);
// ele.append(listItem2);


function displayTransactions() {
    const list = document.querySelector('.trans-list');
    if (!list) return;

    list.innerHTML = ''; 

    transaction.forEach(t => {
        const li = document.createElement('li');
       
        const dateStr = t.date;
        
        li.textContent = `${dateStr} | ${t.type.toUpperCase()}: ${t.amount}`;
        li.style.color = t.type === 'expense' ? 'red' : 'green';
        list.appendChild(li);
    });
}
displayTransactions()


