const express = require("express");
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator');

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req)

  if(err.isEmpty()) {
    return next(); // 다음 동작으로 넘어감 (현재 콜백함수)
  } else {
    return res.status(400).json(err.array())
  }
}

router
  .route('/')
  .get(
    [
      body('userId').notEmpty().isInt().withMessage('number 입력 필요'),
      validate
    ]
    , (req, res) => { // 채널 전체 조회
      let {userId} = req.body;

      let sql = `SELECT * FROM channels WHERE user_id = ?`;
        conn.query(sql, userId,
          function (err, results) {
            if(err) {
              console.log(err)
              return res.status(400).end();
            }

            if(results.length)
              res.status(200).json(results);
            else
            return res.status(400).end();
          }
        )
  }) 
  .post(
    // validator에게 빈 값이 아니고 int형태인지 유효성 검사를 맡김. withMessage에 메세지를 매개변수로 담음
    [
      body('userId').notEmpty().isInt().withMessage('number 입력 필요'),
      body('name').notEmpty().isString().withMessage('string 입력 필요'),
      validate
    ]
    , (req, res) => {
      const {name, userId} = req.body;

      let sql = `INSERT INTO channels (name, user_id) VALUES (?,?)`;
      let values = [name, userId]; // 쿼리문에 보낼 값이 여러개일때 array사용
      conn.query(sql, values ,
        function(err, results) {
          if(err) {
            console.log(err)
            return res.status(400).end();
          }
          res.status(201).json(results)
        } 
      )  
  }) 


router
  .route('/:id')
  .get(
    [
      param('id').notEmpty().withMessage('채널 id 필요'),
      validate
    ]
    ,(req, res) => { // 채널 개별 조회
      let {id} = req.params;
      id = parseInt(id);

      let sql = `SELECT * FROM channels WHERE id = ?`;
      conn.query(sql, id,
        function (err, results) {
          if(err) {
            console.log(err)
            return res.status(400).end();
          }

          if(results.length)
            res.status(200).json(results)
          else
          return res.status(400).end();
        }
      )
  }) 
  .put(
    [
      param('id').notEmpty().withMessage('채널 id 필요'),
      body('name').notEmpty().isString().withMessage('채널명 오류'),
      validate
    ]
    ,(req, res) => { // 채널 개별 수정
      let {id} = req.params;
      id = parseInt(id);
      let {name} = req.body

      let sql = `UPDATE channels SET name = ?
                  WHERE id = ?`;
      let values = [name, id]
      conn.query(sql, values,
        function (err, results) {
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
  .delete(
    [
      param('id').notEmpty().withMessage('채널 id 필요'),
      validate
    ]
    ,(req, res) => { // 채널 개별 삭제
      let {id} = req.params;
      id = parseInt(id);

      let sql = `DELETE FROM channels WHERE id = ?`;
      conn.query(sql, id,
        function(err, results) {
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