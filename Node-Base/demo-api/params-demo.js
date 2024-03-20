const express = require('express')
const app = express()

app.listen(1234)

app.get('/products/:n', function(req,res) {
  // : => URL로 매개변수를 전달받음
  // products/__ 빈칸에 오는 값을 n이라는 변수에 담아줘

  let number = parseInt(req.params.n) - 10;
  console.log(number);

    res.json({
      num : number
    })
})

app.get('/watch', function(req,res) {
  // JS객체(JSON)의 비구조화
  // 객체의 키값과 밸류값을 꺼내서 사용
  const {v, t} = req.query;
  console.log(v);
  console.log(t);

  res.json({
    video : v,
    timeline : t
  })
})