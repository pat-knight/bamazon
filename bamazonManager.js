const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Skeleton24",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    process.stdout.write('\x1B[2J\x1B[0f');
    manager();
})

function manager() {
    inquirer.prompt({
        name: 'manager',
        type: 'list',
        message: `Welcome back to Bamazon Manager. \nWhat can we help you with today?`,
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', new inquirer.Separator(), 'Exit']
    }).then(answer => {

        if (answer.manager === 'View Products for Sale') {
            console.log('View products for sale');
            viewProducts();
        } else if (answer.manager === 'View Low Inventory') {
            console.log('low inv')
            low();
        } else if (answer.manager === 'Add to Inventory') {
            console.log('add to inv')
            addInventory();
        } else if (answer.manager === 'Add New Product') {
            console.log('add new product')
            addProduct();
        } else {
            process.exit();
        }
    })
}

function viewProducts() {
    connection.query('SELECT item_id, department_name, product_name, price FROM products WHERE stock_quantity>1', function (err, res) {
        if (err) throw err;
        console.table(res);
        manager();
    })
}

function low() {
    connection.query('SELECT item_id, department_name, product_name, price FROM products WHERE stock_quantity<4', function (err, res) {
        if (err) throw err;
        if (res[0]) {
            console.table(res);
            lowPrompt();
        } else {
            manager();
        }
    })
}

function addInventory() {
    inquirer.prompt([{
        name: 'supply',
        type: 'input',
        message: 'Please select id of item you would like to add supply to.'
    }, {
        name: 'supQuant',
        type: 'input',
        message: 'How many would you like to add to the current stock?'
    }]).then(answer => {
        connection.query(`UPDATE products SET stock_quantity=stock_quantity+? where ?`, [answers.quantity, {//start here 2/19
            item_id: answers.select
        }], function (err) {
            if (err) throw err;
            console.log(`Stock updated. The new total of  ${answers.quantity} $${res[0].product_name}, for a total cost of ${res[0].price * answers.quantity}`);
            keepShopping();
        })       
    })
}

function addProduct() {

}

function lowPrompt() {
    inquirer.prompt({
        name: 'add',
        type: 'list',
        message: 'How would you like to proceed?',
        choices: ['Add products to inventory', 'Return to main menu', 'Exit']
    }).then(answer => {
        if (answer.add === 'Add products to inventory') {
            addInventory();
        } else if (answer.add === 'Return to main menu') {
            manager();
        } else {
            process.exit();
        }
    })
}