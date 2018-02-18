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
    start();
})


function start() {
    inquirer.prompt({
        name: 'entry',
        type: 'list',
        message: `Welcome to Bamazon. \nPlease select an action`,
        choices: ['Browse all products', 'Browse products by department', 'Exit']
    }).then(answers => {

        if (answers.entry === 'Browse all products') {
            console.log('browse all');
            displayAll();
        } else if (answers.entry === 'Browse products by department') {
            console.log('browse by dept')
            displayDept();
        } else {
            process.exit();
        }
    })
}

function displayAll() {
    connection.query('SELECT item_id, department_name, product_name, price FROM products WHERE stock_quantity>1', function (err, res) {
        if (err) throw err;
        console.table(res);
        // res.forEach((prod) => {
        //     ids.push(prod.id)
        // });
        // console.log(ids);
        select();
    })
}

function displayDept() {
    connection.query('SELECT department_name FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function select() {
    inquirer.prompt([{
            name: 'select',
            type: 'input',
            message: 'Please enter the id of the item you wish to purchase'
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'Please enter the quantity you would like to purchase'
        }
    ]).then(answers => {

        connection.query(`SELECT product_name, price, stock_quantity FROM products WHERE item_id=${answers.select}`, function (err, res) {
            var stock = res[0].stock_quantity
            if (err) throw err;
            if (stock >= answers.quantity) {
                connection.query(`UPDATE products SET stock_quantity=stock_quantity-? where ?`, [answers.quantity, {
                    item_id: answers.select
                }], function (err) {
                    if (err) throw err;
                    console.log(`Order Summary: \nThank You! You have successfully ordered a total of ${answers.quantity} $${res[0].product_name}, for a total cost of ${res[0].price * answers.quantity}`);
                    keepShopping();
                })
            } else {
                console.log('Sorry, order could not be fulfilled in this quantity.');
                keepShopping();

            }
        })

    })
}

function keepShopping() {
    inquirer.prompt({
        name: 'continue',
        type: 'confirm',
        message: 'Would you like to continue shopping?'
    }).then(conf => {
        if (conf.continue) {
            displayAll();
        } else {
            console.log('Thank you for shopping with Bamazon');
            process.exit();
        }
    })
}