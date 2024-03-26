// express 모듈 세팅
const express = require("express");
const router = express.Router();

router.use(express.json());

// const app = express();
// app.listen(7777);
// app.use(express.json());


// 회원
let db = new Map();
var id = 1;

router
  .route('/')
  .get((req, res)=>{ // 채널 전체 조회
    let {userId} = req.body;
    let channels = [];

    if(db.size && userId) {
      db.forEach((el, idx) => {
        if(el.userId === userId) {
          channels.push(el);
        }
      })
      
      if(channels.length) {
        res.status(200).json(channels); // json array는 json 형태로 보낼 수 있다
      } else {
        notFoundChannel();
      }
    } else {
      notFoundChannel();
    }
  }) 
  .post((req, res)=>{ // 채널 생성 > db에 저장
    if(req.body.channelTitle) {
      let channel = req.body;
      db.set(id++, channel);

      res.status(201).json({
        message : `${db.get(id-1).channelTitle} 채널을 응원합니다!`
      })
    } else {
      res.status(400).json({
        message : `요청 값을 제대로 보내주세요.`
      })
    }
    
  }) 


router
  .route('/:id')
  .get((req, res)=>{ // 채널 개별 조회
    let {id} = req.params;
    id = parseInt(id);

    let channel = db.get(id);
    if(channel) {
      res.status(200).json(channel);
    } else {
      notFoundChannel();
    }

    res.send("채널 개별 조회")
  }) 
  .put((req, res)=>{ // 채널 개별 수정
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
  .delete((req, res)=>{ // 채널 개별 삭제
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

  function notFoundChannel() {
    res.status(404).json({
      message : `채널 정보를 찾을 수 없습니다.`
    })
  }

  module.exports = router;