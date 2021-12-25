const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "RelentLess1!",
  database: "employee_tracker",
},
  console.log('connected to employee_tracker')
);

module.exports = connection;