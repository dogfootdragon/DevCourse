// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  timezone : 'Asia/Seoul',
  database: 'Youtube',
  dateStrings : true 
});

// A simple SELECT query
connection.query(
  'SELECT * FROM `users`',
  function (err, results, fields) {
    let {id, email, name, created_at} = results[0];
    console.log(id);
    console.log(email);
    console.log(name);
    console.log(created_at);
    // console.log(results[0].email); // results contains rows returned by server
  }
);

// Using placeholders
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function (err, results) {
    console.log(results);
  }
);