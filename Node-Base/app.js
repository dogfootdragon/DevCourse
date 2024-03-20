const express = require('express')
const app = express()
const port = 1234

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json()) // json 미들웨어를 사용하면 request로 날아오는 body값을 json으로 읽을 수 있다
app.post('/test', (req, res) => {
  // body에 숨겨져서 들어온 데이터를 화면에 뿌리기
  
  console.log(req.body.message);

  res.send(req.body.message);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})