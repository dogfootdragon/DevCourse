const express = require('express')
const app = express()

// 서버 세팅 : 포트 넘버 1234로 세팅 
app.listen(1234)

// GET + "/"
app.get('/', function (req, res) {
  res.send('Hello World')
})

let book = {
  title : "Node.js를 공부해보자",
  price : 20000,
  dsecription : "이 책 좋습니다"
  }

app.get('/products/1', function(req, res) {
  res.json(book)
  // res.send(20000)
})