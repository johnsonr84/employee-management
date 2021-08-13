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
connection.connect(function (err) {
    if (err) throw err;
    start();
  });

  