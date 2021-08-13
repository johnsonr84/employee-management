const mysql = require('mysql');
const inquirer = require('inquirer')
const consoleTable = require('console.table');
const roles = [];

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
                        let department = response.action;
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
                findEmployeeManager();
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

const allEmployees = () => {
    connection.query(`
    SELECT CONCAT(e.first_name, " ", e.last_name) AS Employee,title,salary,name,CONCAT(A.first_name, " ",A.last_name) AS ManagerName 
    FROM employee e 
    LEFT JOIN role R 
    on e.role_id = R.id 
    LEFT JOIN department D 
    on r.department_id = D.id 
    LEFT JOIN employee A 
    on e.manager_id = a.id`, (err, res) => {
        if (err) throw err;
        console.table('Current Employees', res);
        start();
    });
};

const employeeByDepartment = (response) => {
    let department = response.action;
    connection.query(`
    SELECT CONCAT(e.first_name, " ", e.last_name) AS Employee,title,salary,name,CONCAT(A.first_name, " ",A.last_name) AS ManagerName 
    FROM employee e 
    LEFT JOIN role r
    on e.role_id = r.id
    LEFT JOIN employee A 
    on e.manager_id = a.id 
    LEFT JOIN department d 
    on r.department_id = d.id 
    where d.name = '${department}'`, (err, res) => {
        if (err) throw err;
        console.table('Current Employees by department', res);
        start();
    });
}

const employeeByManager = () => {

    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the managers first name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the managers last name?'
            }
        ]).then((response) => {
            let managerFirst = response.first_name;
            let managerLast = response.last_name;

            connection.query(`
            SELECT CONCAT(e.first_name, " ", e.last_name) AS Employee,title,salary,name,CONCAT(A.first_name, " ",A.last_name) AS ManagerName 
            FROM employee e 
            LEFT JOIN role r
            on e.role_id = r.id
            LEFT JOIN employee A 
            on e.manager_id = a.id 
            LEFT JOIN department d 
            on r.department_id = d.id
            Where e.manager_id 
            IN (SELECT e.id from employee e where first_name = '${managerFirst}' and last_name = '${managerLast}')`, (err, res) => {
                if (err) throw err;
                console.table('Current Employees by Manager', res);
                start();
            });
        })
}
