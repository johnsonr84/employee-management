USE employeeTrackerDB;

INSERT INTO departments (id, name)
VALUES (1, 'Management'), (2, 'Accounting'), (3, 'Sales'), (4, 'Marketing');

INSERT INTO roles (id, title, salary, department_id);  
VALUES (1, 'Sales Manager', '100000', 1), (2, 'Sales Associate', '40000', 3), (3, 'CFO', '120000', 2), (4 'Acountant', '110000', 2), (5, 'COO', '200000', 3), (6, 'Marketing', '90000', 4), (7, 'Contract Coordinator', '85000', 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Mario', 'Bro', 3, 1), ('Luigi', 'Bro', 1, 1), ('Princes', 'Peach', 2, 3), ('Bowser', 'Castle', 7, 3), ('Yoshi', 'Moto', 4, 2), ('Donky', 'Kong', 5, 1), ('Toad', 'Mushroom', 2, 3)
