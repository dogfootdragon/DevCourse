// express 모듈 세팅
const express = require("express");
const app = express();
app.listen(7777);
app.use(express.json()); // http외 모듈 json

// 회원
let db = new Map();
var id = 1; // 하나의 객체를 유니크하게 구별하기 위함

// 로그인
app.post('/login', (req, res) => {
  console.log(req.body);

  // userId가 db에 저장된 회원인지 확인
  const {userId, password} = req.body;
  let loginUser = {};

  db.forEach((user, idx) => {
    if(user.userId === userId) {
      loginUser = user;
    } 
  })

  // userId값을 못 찾았으면
  if(isExist(loginUser)) {
    console.log("아이디같음");

    // password 맞는지 비교
    if(loginUser.password == password) {
      console.log("비밀번호 같음");
    } else {
      console.log("비밀번호 다름");
    }
  } else {
    console.log("입력하신 아이디는 없는 아이디 입니다.");
  }

  res.send("테스트중")
})

// 객체가 채워져있으면 true, 비워져있으면 false return
function isExist(obj) {
  if(Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
}

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
  .route('/users/:id')
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

