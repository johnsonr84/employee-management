USE employeeTrackerDB;

-- Department Seeds
INSERT INTO department (name)
VALUE ("Management");

INSERT INTO department (name)
VALUE ("Sales");

INSERT INTO department (name)
VALUE ("Accounting");

INSERT INTO department (name)
VALUE ("Product Oversight");

INSERT INTO department (name)
VALUE ("Human Resources");


-- Role Seeds
INSERT INTO role (title, salary, department_id)
VALUE ("Regional Manager", 125000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("General Manager", 110000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Receptionist", 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Representative", 65000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Assistant Manager", 85000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Assistant", 75000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Senior Accountant", 70000, 3);

INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 65000, 3);

INSERT INTO role (title, salary, department_id)
VALUE ("Quality Assurance Specialist", 55500, 4);

INSERT INTO role (title, salary, department_id)
VALUE ("Human Resources Representative", 66000, 5);


-- Employee seeds
INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Michael", "Scott", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Karen", "Filippelli", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Pam","Halpert", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Jim", "Halpert", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Dwight", "Schrute",  5);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Andy", "Bernard", 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Angela", "Martin", 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Kevin", "Malone", 8);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Creed", "Bratton", 9);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Holly", "Flax", 10);