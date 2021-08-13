const mysql = require('mysql');
const inquirer = require('inquirer')
const consoleTable = require('console.table');

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeTrackerDB',
});

// Establishes connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    start();
})


//Start inquirer prompts
const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View current employees', 'View current employees by department', 'View current employees by role', 'View current employees by manager', 'Enter new employee', 'Remove current employee', 'Update current employee role', 'Update current employee manager', 'Add new department', 'Add new role', 'I am finished']
        }).then((response) => {
            if (response.action === 'View current employees') {
                allEmployees();
            }
            else if (response.action === 'View current employees by department') {
                inquirer
                    .prompt({
                        name: 'action',
                        type: 'list',
                        message: 'Which department?',
                        choices: depts
                    }).then((response) => {
                        let dept = response.action;
                        employeeByDepartment(response);
                    })
            }
            else if (response.action === 'View current employees by role') {

                inquirer
                    .prompt({
                        name: 'action',
                        type: 'list',
                        message: 'Which role?',
                        choices: roles
                    }).then((response) => {
                        let role = response.action;
                        employeeByRole(response);
                    })
            }
            else if (response.action === 'View current employees by manager') {
                employeeByManager();
            }
            else if (response.action === 'Enter new employee') {
                //ask info to fill in employee info sql create function
                newEmployee();
            }
            else if (response.action === 'Remove current employee') {
                //get employee and delete from sql
                findEmployee();
            }
            else if (response.action === 'Update current employee role') {
                //get employee and update sql role
                findEmployeeRole();
            }
            else if (response.action === 'Update current employee manager') {
                //get employee and update sql manager
                findEmployeeMgr();
            }
            else if (response.action === 'Add new department') {
                addDepartment();
            }
            else if (response.action === 'Add new role') {
                addRole();
            }
            else {
                console.log('Thanks!')
            }
        });
};