// express 모듈 세팅
const express = require("express");
const app = express();
app.listen(7777);
app.use(express.json());

// 회원
let db = new Map();
var id = 1;

app
  .route('/channels')
  .get((req, res)=>{ // 채널 전체 조회
    if(db.size) {
      let channels = [];
      db.forEach((el, idx) => {
        channels.push(el);
      })
      
      res.status(200).json(channels); // json array는 json 형태로 보낼 수 있다
    } else {
      res.status(404).json({
        message : `조회할 채널이 없습니다.`
      })
    }
  }) 
  .post((req, res)=>{ // 채널 생성 > db에 저장
    if(req.body.channelTitle) {
      db.set(id++, req.body);

      res.status(201).json({
        message : `${db.get(id-1).channelTitle} 채널을 응원합니다!`
      })
    } else {
      res.status(400).json({
        message : `요청 값을 제대로 보내주세요.`
      })
    }
    
  }) 


app
  .route('/channels/:id')
  .get((req, res)=>{ // 채널 개별 조회
    let {id} = req.params;
    id = parseInt(id);

    let channel = db.get(id);
    if(channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
      })
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
      res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
      })
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
      res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
      })
    }
  }) 
