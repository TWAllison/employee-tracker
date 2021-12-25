INSERT INTO department (id, name)
VALUES
(1, 'Management'),
(2, 'Engineering'),
(3,'Marketing'),
(4, 'Production');

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'Manager', 95000, 1),
(2, 'Supervisor', 50000, 4),
(3, 'Engineer', 70000, 2),
(4, 'Marketing', 47000, 3),
(5, 'Human Resources Manager', 57500, 1),
(6, 'Shift Employee', 37000, 4);

INSERT INTO employee (id, last_name, first_name, role_id, manager_id)
VALUES
(1, 'Micheals', 'Mike', 1, 1),
(2, 'Steele', 'Shelby', 5, 1),
(3, 'Smith', 'Morty', 3, 1),
(4, 'Johnson', 'John', 4, 1),
(5, 'Billings', 'Bill', 2, 1),
(6, 'Wayne', 'Thomas', 6, 5),
(7, 'Marie', 'Brooke', 6, 5),
(8, 'Hill', 'Mark', 6, 5);
