const crypto = require('crypto');

const password = "123";

// 비밀번호 암호화
const salt = crypto.randomBytes(5).toString('base64');
const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 5, 'sha512').toString('base64');

console.log(salt);
console.log(hashPassword);


// 회원가입시 비밀번호를 암호화해서 암호화된 비밀번호와, salt값을 같이 저장
// 로그인할 때 이메일&비밀번호(날 것) => salt값 꺼내서 비밀번호 암호화 해보고 => DB에 저장된 비밀번호와 비교