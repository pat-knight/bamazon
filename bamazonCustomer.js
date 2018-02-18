var mysql = require('mysql');
var inquirer = require('inquirer');


function start() {
    inquirer.prompt({
        name: 'entry',
        type: 'list',
        message: `Welcome to Bamazon. \nPlease select an action`,
        choices: ['Browse all products', 'Browse products by department', 'Exit']
    }).then(answers => {
        switch (answers) {
            case 'Browse all products':
                console.log('browse all');
                break;
            case 'Browse products by department':
                console.log('browse depts');
                break;
            case 'Exit':
                process.exit();
                break;
            default:
                'Browse all products'
                break;
        }
    })
}

start();