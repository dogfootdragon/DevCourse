// mysql 모듈 소환
const mariadb = require('mysql2');

// DB와 연결 통로 생성
const conn = mariadb.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'Bookshop',
    dateStrings : true
});

module.exports = conn;