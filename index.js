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

const employeeByRole = (response) => {
    let employeeRole = response.action;
    connection.query(`
            SELECT CONCAT(e.first_name, " ", e.last_name) AS Employee,title,salary,name AS Department,CONCAT(A.first_name, " ",A.last_name) AS ManagerName 
            FROM employee e 
            LEFT JOIN role r
            on e.role_id = r.id
            LEFT JOIN employee A 
            on e.manager_id = a.id 
            LEFT JOIN department d 
            on r.department_id = d.id 
            where r.title = '${employeeRole}'`, (err, res) => {
        if (err) throw err;
        console.table('Current Employees by role', res);
        start();
    });
}

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

const newEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'New employee first name?',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'New employee last name?',
            },
            {
                name: 'role',
                type: 'list',
                message: 'New employee title?',
                choices: roles
            },
            {
                name: 'managerF',
                type: 'input',
                message: 'Manager first name for new employee?',
            },
            {
                name: 'managerL',
                type: 'input',
                message: 'Manager last name for new employee?',
            }

        ]).then((response) => {
            console.log('Inserting New Employee Information\n');
            let role = response.role;
            let managerFirst = response.managerFirst;
            let managerLast = response.managerLast;
            let roleID = "";
            let managerID = "";

            connection.query(`SELECT employee.id, first_name, last_name, title FROM employee LEFT JOIN role on employee.role_id = role.id WHERE employee.first_name = '${mgrF}'  AND employee.last_name = '${mgrL}'`, (err, res) => {

                if (err) throw err;
                managerID = res[0].id
                connection.query(`SELECT id FROM role WHERE title = '${role}'`, (err, res) => {
                    if (err) throw err;
                    roleID = res[0].id;

                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: response.first_name,
                            last_name: response.last_name,
                            role_id: roleID,
                            manager_id: mgrID

                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`${res.affectedRows} employee added !\n`)
                            start();
                        }
                    )
                })
            })

        })
}

const findEmployee = (response => {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the the first name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the last name?'
            }
        ]).then((response) => {
            let first_name = response.first_name;
            let last_name = response.last_name;

            connection.query(`SELECT employee.id, first_name, last_name, title FROM employee LEFT JOIN role on employee.role_id = role.id WHERE employee.first_name = '${first_name}'  AND employee.last_name = '${last_name}'`, (err, res) => {
                if (err) throw err;

                console.table('Matching Employees', res);
                deleteEmp();
            })
        })
})

const deleteEmp = () => {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'number',
                message: 'In the above list, what is the employee id?'
            }
        ]).then((response) => {
            let id = response.id;
            connection.query(`DELETE FROM employee WHERE employee.id = ${id}`, (err, res) => {
                if (err) throw err;
                console.log('This employee has been removed');
                start();
            })
        })
}