const express = require('express')
const app = express()

// 서버 세팅 : 포트 넘버 1234로 세팅 
app.listen(1234)

// API GET + "http://localhost:3000/test"
app.get('/test', function(req, res) {
  res.send("TEST SUCCESS")
})

// API GET + "http://localhost:3000/test/1"
app.get('/test/1', function(req, res) {
  res.send("One!")
})