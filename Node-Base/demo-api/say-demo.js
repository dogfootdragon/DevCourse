const express = require('express')
const app = express()

app.get('/hello', function(req, res) {
  res.json({
    say : '안녕하세요'
  })
})

app.get('/bye', function(req, res) {
  res.json({
    say : "안녕히가세요"
  })
})

// GET 메소드로, /'nicetomeetyou' 가 날아오면
// 매개변수로 전달받은 콜백 함수를 호출 => 서버에 세팅
app.get('/nicetomeetyou', function(req, res) {
  res.json({
    say : "만나서 반갑습니다"
  })
})


// 서버 세팅 : 포트 넘버 1234로 세팅 
app.listen(1234)