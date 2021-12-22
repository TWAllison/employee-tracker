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

// create function to view all departments

//create function to view all roles

// add more functionality ? add emloyee, roles etc maybe update ? delete function?
