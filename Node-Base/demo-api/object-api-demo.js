const express = require('express')
const app = express()

app.listen(1234)

// 십오야 : https://www.youtube.com/@15ya.fullmoon
// 침착맨 : https://www.youtube.com/@ChimChakMan_Official
// 테오 : https://www.youtube.com/@TEO_universe


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

app.get('/:nickname', function(req,res) {
  // nickname키의 값으로 req.parmas가 오기 때문에 (type: Object)
  // {nickname}객체에 값을 바로 집어넣는다.
  const {nickname} = req.params  

  if(nickname == "15ya.fullmoon"){
    res.json(youtuber1)
  } else if(nickname == "@ChimChakMan_Official"){
    res.json(youtuber2)
  } else if(nickname == "@TEO_universe"){
    res.json(youtuber3)
  } else {
    res.json({
      message : "저희가 모르는 유튜버입니다."
    })
  }
})

