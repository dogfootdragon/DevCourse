const express = require("express");
const router = express.Router(); // express의 router로 사용할 수 있게 만듦

const conn = require('../mariadb'); // db 모듈 연결

router.use(express.json()); // http외 모듈 json

// 로그인
router.post('/login', (req, res) => {
  // email이 db에 저장된 회원인지 확인
  const {email, password} = req.body;
  
  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email,
    function(err, results) { // err, result, fields 순서대로 받음. fields는 생략
      let loginUser = results[0]; // result[0]가 없으면 loginUser = undefind

      if(loginUser && loginUser.password == password) {
        res.status(200).json({
          message : `${loginUser.name}님 로그인 되었습니다.`
        })
      } else {
        res.status(404).json({
          message : `이메일 또는 비밀번호가 틀렸습니다.`
        })
      }
    }
  )
})

// 회원 가입
router.post('/join', (req, res) => {
  if (req.body == {}) { // 테스트 중에는 req.body값이 아예 비었거나 세 가지 모두 잘 들어온다는 조건하에
    res.status(400).json({
      message : `입력 값을 다시 확인해주세요.`
    })
  } else {
    const {email, name, password, contact} = req.body;

    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`;
    let values = [email, name, password, contact]; // 쿼리문에 보낼 값이 여러개일때 array사용
    conn.query(sql, values ,
      function(err, results) {
        res.status(201).json({
          message : `${email}님 환영합니다.`
        })
      } 
    )  
  }
})

router
  .route('/users')
  .get((req, res) => { // 회원 개별 조회
    let {email} = req.body;
  
    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, // ?에 들어갈 값은 email 변수 값이다라고 지정
      function (err, results, fields) { // result는 json array형태로 받아짐
        if(results.length) {
          res.status(200).json(results)
        } else {
          res.status(404).json({
            message : `회원 정보가 없습니다.`
          })
        }
      }
    )
  })
  .delete((req, res) => { // 회원 개별 탈퇴
    let {email} = req.body;
  
    let sql = `DELETE FROM users WHERE email = ?`;
    conn.query(sql, email,
      function(err, results, fields) {
        res.status(200).json(results);
      }
    )
  })

module.exports = router;