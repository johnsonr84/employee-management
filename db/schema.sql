
DROP DATABASE IF EXISTS employeeTrackerDB;
CREATE database employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL(10,0) NOT NULL, 
    department_id INT NOT NULL, 
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


