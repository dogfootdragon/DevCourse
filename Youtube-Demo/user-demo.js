// express 모듈 세팅
const express = require("express")
const app = express();
app.listen(7777);
app.use(express.json()); // http외 모듈 json

// 회원
let db = new Map();
var id = 1; // 하나의 객체를 유니크하게 구별하기 위함

// 로그인
app.post('/login', (req, res) => {
  
})

// 회원 가입
app.post('/join', (req, res) => {
  console.log(req.body);

  if (req.body == {}) { // 테스트 중에는 req.body값이 아예 비었거나 세 가지 모두 잘 들어온다는 조건하에
    res.status(400).json({
      message : `입력 값을 다시 확인해주세요.`
    })
  } else {
    db.set(id++, req.body);

    res.status(201).json({
      message : `${db.get(id-1).name}님 환영합니다.`
    })
  }
  
})

app
  ._router('/users/:id')
  .get((req, res) => { // 회원 개별 조회
    let {id} = req.params;
    id = parseInt(id);
  
    const user = db.get(id);
    if (user == undefined) {
      res.status(404).json({
        message : `회원 정보가 없습니다.`
      })
    } else {
      res.status(200).json({
        userId : user.userId,
        name : user.name
      })
    }
  })
  .delete((req, res) => { // 회원 개별 탈퇴
    let {id} = req.params;
    id = parseInt(id);
  
    const user = db.get(id);
    if (user == undefined) {
      res.status(404).json({
        message : `회원 정보가 없습니다.`
      })
    } else {
      db.delete(id);
      res.status(200).json({
        message : `${user.name}님 다음에 또 뵙겠습니다.`
      })
    }
  })

