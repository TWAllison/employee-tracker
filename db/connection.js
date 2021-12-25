const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: " ", // enter your my sql password here.
  database: "employee_tracker",
},
  console.log('connected to employee_tracker')
);

module.exports = connection;