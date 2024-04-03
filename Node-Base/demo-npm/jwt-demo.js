var jwt = require('jsonwebtoken'); // jwt 모듈 불러오기
var dotenv = require('dotenv');

dotenv.config(); // dotenv로 설정 사용

// 서명 = 토큰 발행
var token = jwt.sign({foo : 'bar'}, process.dotenv.PRIVATE_KEY);
// token 생성 = jwt 서명을 함 (페이로드, 나만의 암호키) + SHA256

console.log(token);

// 검증
// 만약 검증에 성공하면, 페이로드 값을 확인할 수 있다
var decoded = jwt.verify(token, process.dotenv.PRIVATE_KEY);
console.log(decoded);


