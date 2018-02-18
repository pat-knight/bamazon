const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

//list a set of menu options
//view products for sale
//view low inventory
//add to inventory
//add new product

//inquirer
    //view products for sale
    //view low inventory
    //add to inventory
    //add new product
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
                console.log('browse all');
                displayAll();
            } else if (answer.manager === 'View Low Inventory') {
                console.log('browse by dept')
                displayDept();
            } else if (answer.manager === 'Add to Inventory') {
                console.log('browse by dept')
                displayDept();
            } else if (answer.manager === 'Add New Product') {
                console.log('browse by dept')
                displayDept();
            } 
            else {
                process.exit();
            }
        })
    }