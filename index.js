const mysql = require('mysql');
const inquirer = require('inquirer')
const consoleTable = require('console.table');

// node.js driver for mysql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeetrackerdb',
});

// establishes connection
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
