var jwt = require('jsonwebtoken'); // jwt 모듈 불러오기
const express = require('express');
const app = express();
const dotenv = require('dotenv');
var path = require('path');

// 디렉토리 구조가 달라 최상위 폴더에 .env 파일이 위치하지 않음. path를 통해 경로 재설정
dotenv.config({path: path.resolve(__dirname, '../.env')});

// 서버 세팅 : 포트 넘버 1234로 세팅 
app.listen(1234);

// GET + "/jwt" : 토큰 발행
app.get('/jwt', function (req, res) {
const token = jwt.sign({
    username : "jang sr"
  }, process.env.PRIVATE_KEY, {
    expiresIn : '5m',
    issuer : 'jang'
  })

  res.cookie("jwt", token, {
    httpOnly : true
  });
  res.send("토큰 발행 완료");
})

// GET + "/jwt/decoded" : 토큰을 검증
app.get('/jwt/decoded', function (req, res) {
  let receivedJwt = req.headers["authorization"]
  console.log("req로 전달받은 jwt", receivedJwt)

  var decoded = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);

  // jwt 유효기간이 지났다면, 500 에러를 낼 게 아니라
  // 예외(개발자가 생각하지 못한 에러) 처리를 해준다
  // 유효기간이 지난 토큰 => '로그인(인증) 세션이 만료되었습니다. 다시 로그인 하세요.'

  

  res.send(decoded);
})

