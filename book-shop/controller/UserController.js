const conn = require('../mariadb'); // db 모듈
const {StatusCodes} = require('http-status-codes'); // status code 모듈
const jwt = require('jsonwebtoken'); // jwt 모듈
const crypto = require('crypto'); // crypto 모듈 : 암호화
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '.env')});

// 회원가입
const join = (req, res) => {
  const {email, password} = req.body;
  
  let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';

  // 비밀번호 암호화
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

  // 회원가입시 비밀번호를 암호화해서 암호화된 비밀번호와, salt값을 같이 저장

  let values = [email, hashPassword, salt];
  conn.query(sql, values,
    (err, result) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      
      if(result.affectedRows)
        return res.status(StatusCodes.CREATED).json(result);
      else
        return res.status(StatusCodes.BAD_GATEWAY).end();
  })
}

// 로그인
const login =  (req, res) => {
  const {email, password} = req.body;

  let sql = 'SELECT * FROM users WHERE email = ?'
  conn.query(sql, email, 
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      const loginUser = results[0];

      // salt값 꺼내서 날 것으로 들어온 비밀번호 암호화 해보고
      const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

      // DB에 저장된 비밀번호와 비교
      if(loginUser && loginUser.password == hashPassword) {
        // 토큰 발행
        const token = jwt.sign({
          id : loginUser.id,
          email : loginUser.email
        }, process.env.PRIVATE_KEY, {
          expiresIn : '10m',
          issuer : 'jang'
        })

        // 토큰 쿠키에 담기
        res.cookie("token", token, {
          httpOnly : true
        })
        console.log(token);

        return res.status(StatusCodes.OK).json(results);
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).end(); // 401 : Unauthorized (미인증), 403 : Forbidden (접근 권리 없음)
      }
    })
};

// 비밀번호 초기화 요청
const passwordResetRequest = (req, res) => {
  const {email} = req.body;

  let sql = 'SELECT * FROM users WHERE email = ?'
  conn.query(sql, email, 
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      // 이메일로 유저가 있는지 찾아봄
      const user = results[0];
      if(user) {
        return res.status(StatusCodes.OK).json({
          email : email
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).end();
      }
    }
  )
};

// 비밀번호 초기화(수정)
const passwordReset = (req, res) => {
  const {email, password} = req.body;

  let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';

  // 비밀번호 암호화
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

  let values = [hashPassword, salt, email];

  conn.query(sql, values, 
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if(results.affectedRows == 0) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      } else {
        return res.status(StatusCodes.OK).json(results);
      }
    })
};

module.exports = {
  join,
  login,
  passwordResetRequest,
  passwordReset
};