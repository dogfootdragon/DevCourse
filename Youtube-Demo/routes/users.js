const express = require("express");
const router = express.Router(); // express의 router로 사용할 수 있게 만듦
const conn = require('../mariadb'); // db 모듈 연결
const {body, param, validationResult} = require('express-validator');

router.use(express.json()); // http외 모듈 json

const validate = (req, res, next) => { //req, res, next 값은 express가 넣어준다
  const err = validationResult(req)

  if(err.isEmpty()) {
    return next(); // 다음 동작으로 넘어감 (현재 콜백함수)
  } else {
    return res.status(400).json(err.array())
  }
}

// 로그인
router.post(
  '/login',
  [
    body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
    body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    validate
  ],
   (req, res) => {
  const {email, password} = req.body;
  
  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email,
    function(err, results) { // err, result, fields 순서대로 받음. fields는 생략
      if(err) {
        console.log(err)
        return res.status(400).end();
      }

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
router.post(
  '/join',
  [
    body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
    body('name').notEmpty().isString().withMessage('이름 확인 필요'),
    body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    body('contact').notEmpty().isString().withMessage('연락처 확인 필요'),
    validate
  ]
  , (req, res) => {
    const {email, name, password, contact} = req.body;

    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`;
    let values = [email, name, password, contact]; // 쿼리문에 보낼 값이 여러개일때 array사용
    conn.query(sql, values ,
      function(err, results) {
        if(err) {
          console.log(err)
          return res.status(400).end();
        }
        res.status(201).json({
          message : `${email}님 환영합니다.`
        })
      } 
    )  
})


router
  .route('/users')
  .get( // 회원 개별 조회
    [
      body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
      validate
    ]
    ,(req, res) => { 
    let {email} = req.body;
  
    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, // ?에 들어갈 값은 email 변수 값이다라고 지정
      function (err, results, fields) { // result는 json array형태로 받아짐
        if(err) {
          console.log(err)
          return res.status(400).end();
        }
        res.status(200).json(results)
      }
    )
  })
  .delete( // 회원 개별 탈퇴
    [
      body('email').notEmpty().isString().withMessage('비밀번호 확인 필요'),
      validate
    ]
    ,(req, res) => { 
    let {email} = req.body;
  
    let sql = `DELETE FROM users WHERE email = ?`;
    conn.query(sql, email,
      function(err, results, fields) {
        if(err) {
          console.log(err)
          return res.status(400).end();
        }

        if(results.affectedRows == 0) {
          return res.status(400).end();
        } else {
          res.status(200).json(results)
        }
      }
    )
  })

module.exports = router;