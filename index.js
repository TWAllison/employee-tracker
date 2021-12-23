// add required packages
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

// create server connection port 3306
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "RelentLess1!",
  database: "employee_tracker",
});
//add err handling if err if not call search function
connection.connect((err) => {
  if (err) throw err;
  searchDb();
});
//create db search function
function searchDb() {
  inquirer
    .prompt({
      name: "selection",
      type: "list",
      message: "Please make a selection!",
      choices: [
        "All Departments",
        "All Employees",
        "View Roles",
        "Add Department",
        "Add Employee",
        "Add Role",
        "Update Employee Information",
        "Cancel",
      ],
    })
    .then(function (response) {
      if (response.selection === "All Employees") {
        viewAllEmployees();
      } else if (response.selection === "All Departments") {
        viewAllDepartments();
      } else if (response.selection === "View Roles") {
        viewRoles();
      } else if (response.selection === "Add Employee") {
        addEmployee();
      } else if (response.selection === "Add Department") {
        addDepartment();
      } else if (response.selection === "Add Role") {
        addRole();
      } else if (response.selection === "Update Employee Information") {
        updateEmployee();
      } else {
        connection.end();
      }
    });
}

// create function to view all employees

function viewAllEmployees() {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id AS title, employee.manager_id, roles.title, roles.salary, department.deptartment_name AS dept FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id";

  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);

    searchDb();
  });
}
// create function to view all departments

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);

    searchDb();
  });
}

//create function to view all roles

function viewRoles() {
  const query =
    "SELECT roles.id, roles.title, roles.salary, roles.department_id, department.id, department.deptartment_name FROM roles LEFT JOIN department on roles.department_id = department.id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);

    searchDb();
  });
}

// add more functionality ? add emloyee, roles etc maybe update ? delete function?
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },

      {
        name: "roleId",
        type: "input",
        message: "What is the employee's job id?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the manager Id?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee ( last_name, first_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.lastName, answer.firstName, answer.roleId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log(
            `Employee record for  ${answer.lastName} ${answer.firstName} has been added!`
          );
          searchDb();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter an employee id",
      },
      {
        name: "roleId",
        type: "input",
        message: "Enter a new role id",
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE employee SET role_id=? WHERE id=?",
        [answer.roleId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log(`Employee information has been updated!`);
          searchDb();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "What is the role title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "deptId",
        type: "input",
        message: "What is the department ID number?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.roleTitle, answer.salary, answer.deptId],
        function (err, res) {
          if (err) throw err;
          console.log("Role added!");
          searchDb();
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department name?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department (deptartment_name) VALUES (?)",
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log("Department added!");
          searchDb();
        }
      );
    });
};
