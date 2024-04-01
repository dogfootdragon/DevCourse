// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1', // connect ECONNREFUSED error가 나면 localhost > 127.0.0.1 변경
  user: 'root',
  password: 'root',
  // timezone : 'Asia/Seoul',
  database: 'Youtube',
  dateStrings : true 
});

// db 모듈화
module.exports = connection;