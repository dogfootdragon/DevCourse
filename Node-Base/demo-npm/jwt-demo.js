var jwt = require('jsonwebtoken'); // jwt 모듈 불러오기
var dotenv = require('dotenv');
var path = require('path');

// 디렉토리 구조가 달라 최상위 폴더에 .env 파일이 위치하지 않음. path를 통해 경로 재설정
dotenv.config({path: path.resolve(__dirname, '../.env'), debug: true})
console.log(dotenv.config({path: path.resolve(__dirname, '../.env'), debug: true}));

// test code (.env 경로를 재설정했으나 process.env.PRIVATE_KEY < 환경변수 접근이 되지 않아 테스트했던 코드 / 정상실행됨)
// let {PRIVATE_KEY} = process.env;
// console.log(PRIVATE_KEY);

// 서명 = 토큰 발행
// var token = jwt.sign({foo : 'bar'}, PRIVATE_KEY);
var token = jwt.sign({foo : 'bar'}, process.env.PRIVATE_KEY);
// token 생성 = jwt 서명을 함 (페이로드, 나만의 암호키) + SHA256

console.log(token);

// 검증
// 만약 검증에 성공하면, 페이로드 값을 확인할 수 있다
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);


