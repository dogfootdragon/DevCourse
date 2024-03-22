// express 모듈 세팅
const express = require("express");
const app = express();
app.listen(1234);

// 데이터 세팅
let youtuber1 = {
  channelTitle : "십오야",
  sub : "593만명",
  videoNum : "993개"
}

let youtuber2 = {
  channelTitle : "침착맨",
  sub : "227만명",
  videoNum : "6600개"
}

let youtuber3 = {
  channelTitle : "테오",
  sub : "54.8만명",
  videoNum : "726개"
}

let db = new Map();
var id = 1;

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

// REST API 설계
app.get('/youtubers', function (req, res) {
  let youtubers = {};

  if(db.size !== 0) {
    db.forEach((v,i) => {
      youtubers[i] = v;
    })
    res.json(youtubers);
  } else {
    res.status(404).json({
      message : "조회할 유튜버가 없습니다."
    })
  }
})

app.get('/youtubers/:id', function (req, res) {
  let {id} = req.params;
  id = parseInt(id); // 항상 타입에 주의

  const youtuber = db.get(id);
  if(youtuber) {
    res.json(youtuber);
  } else {
    res.status(404).json({
      message : "유튜버 정보를 찾을 수 없습니다."
    })
  }
})

app.use(express.json()); // htpp 외 모듈인 미들웨어 json 설정
app.post('/youtubers', (req, res) => {
  const channelTitle = req.body.channelTitle;
  if(channelTitle) {
    db.set(id++, req.body);

    res.status(201).json({
      message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다!`
    });
  } else {
    res.status(400).json({
      message : "요청값을 제대로 보내주세요."
    })
  }
  
})

// 매개변수를 두 개 받는다. path와 callback function(핸들러)
app.delete('/youtubers/:id', (req, res) => {
  let {id} = req.params;
  id = parseInt(id);
  
  let youtuber = db.get(id);
  if(youtuber) {
    const channelTitle = youtuber.channelTitle;
    db.delete(id);

    res.json({
      message : `${channelTitle}님, 아쉽지만 다음에 또 뵙겠습니다.`
    })
  } else {
    res.status(404).json({
      message : `요청하신 ${id}번은 없는 유튜버입니다.`
    })
  }
})

app.delete('/youtubers', (req, res) => {
  // db에 값이 1개 이상이면, 전체 삭제
  // 값이 없으면, "삭제할 유튜버가 없습니다" 출력
  if(db.size >= 1) {
    db.clear();
    res.json({
      message : "전체 유튜버가 삭제되었습니다."
    })
  } else {
    res.status(404).json({
      message : "삭제할 유튜버가 없습니다."
    })
  }
})

app.put('/youtubers/:id', (req, res) => {
  let {id} = req.params;
  id = parseInt(id);

  let youtuber = db.get(id);
  let oldTitle = youtuber.channelTitle;
  
  if(youtuber) {
    let newTitle = req.body.channelTitle;
    youtuber.channelTitle = newTitle;
    db.set(id, youtuber); // .set으로 덮어쓰기

    res.json({
      message : `${oldTitle}님, 채널명이 ${newTitle}로 바뀌었습니다.`
    }) 
  } else {
    res.status(404).json({
      message : `요청하신 ${id}번은 없는 유튜버입니다.`
    }) 
  }
})