const express = require("express");
const router = express.Router();
const conn = require('../mariadb');

router.use(express.json());

router
  .route('/')
  .get((req, res) => { // 채널 전체 조회
    let {userId} = req.body;

    let sql = `SELECT * FROM channels WHERE user_id = ?`;
    if(userId) {
      conn.query(sql, userId,
        function (err, results) {
          if(results.length) {
            res.status(200).json(results);
          } else {
            notFoundChannel(res);
          }
        }
      )
    } else {
      res.status(400).end(); // .end() 값을 보내지 않고 끝냄
    }
  }) 
  .post((req, res) => { // 채널 생성 > db에 저장
    let {name, userId} = req.body;
    if(name && userId) { // 유효성 검사 추가해야함
      let sql = `INSERT INTO channels (name, user_id) VALUES (?,?)`;
      let values = [name, userId]; // 쿼리문에 보낼 값이 여러개일때 array사용
      conn.query(sql, values ,
        function(err, results) {
          res.status(201).json(results)
        } 
      )  
    } else {
      res.status(400).json({
        message : `요청 값을 제대로 보내주세요.`
      })
    }
    
  }) 


router
  .route('/:id')
  .get((req, res) => { // 채널 개별 조회
    let {id} = req.params;
    id = parseInt(id);

    let sql = `SELECT * FROM channels WHERE id = ?`;
    conn.query(sql, id,
      function (err, results) {
        if(results.length)
          res.status(200).json(results)
        else
          notFoundChannel(res);
      }
    )
  }) 
  .put((req, res) => { // 채널 개별 수정
    let {id} = req.params;
    id = parseInt(id);

    let channel = db.get(id);
    let oldTitle = channel.channelTitle; // 수정 전 타이틀
    if(channel) {
      let newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;
      db.set(id, channel);

      res.json({
        message : `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 수정 ${newTitle}`
      })
    } else {
      notFoundChannel();
    }
  }) 
  .delete((req, res) => { // 채널 개별 삭제
    let {id} = req.params;
    id = parseInt(id);

    let channel = db.get(id);
    if(channel) {
      db.delete(id);

      res.status(200).json({
        message : `${channel.channelTitle}이 정상적으로 삭제되었습니다.`
      })
    } else {
      notFoundChannel();
    }
  }) 

  function notFoundChannel(res) {
    res.status(404).json({
      message : `채널 정보를 찾을 수 없습니다.`
    })
  }

  module.exports = router;