const ensureAuthorization = require('../auth'); // 인증 모듈
const conn = require('../mariadb'); // db 모듈
const {StatusCodes} = require('http-status-codes'); // status code 모듈
var jwt = require('jsonwebtoken');

// 장바구니 담기
const addToCart = (req, res) => {
  let {book_id, quantity} = req.body;

  let authorization = ensureAuthorization(req, res);

  // authorization이 TokenExpiredError 처럼 생겼다면
  if(authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message : `로그인 세션이 만료되었습니다. 다시 로그인 하세요.`
    })
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message : `잘못된 토큰입니다.`
    })
  } else {
    sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES ("${book_id}", "${quantity}", "${authorization.id}");`;

    conn.query(sql, (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      } 

      return res.status(StatusCodes.OK).json(results);
    })
  }
}

// 장바구니 아이템 목록 조회 & 선택한 장바구니 상품 목록 조회
const getCartItems = (req, res) => {
  let {selected} = req.body;

  let authorization = ensureAuthorization(req, res);

  // authorization이 TokenExpiredError 처럼 생겼다면
  if(authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message : `로그인 세션이 만료되었습니다. 다시 로그인 하세요.`
    })
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message : `잘못된 토큰입니다.`
    })
  } else {
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                        FROM cartItems LEFT JOIN books 
                        ON cartItems.book_id = books.id
                        WHERE user_id = "${authorization.id}"`;

    if (selected) { // 주문서 작성 시 '선택한 장바구니 목록 조회'
      sql += ` AND cartItems.id IN (${selected})`
    } 

    conn.query(sql, (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      } 

      return res.status(StatusCodes.OK).json(results);
    })
  }
}

// 장바구니 도서 삭제
const removeCartItem = (req, res) => {
  let authorization = ensureAuthorization(req, res);

  // authorization이 TokenExpiredError 처럼 생겼다면
  if(authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message : `로그인 세션이 만료되었습니다. 다시 로그인 하세요.`
    })
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message : `잘못된 토큰입니다.`
    })
  } else {
    const cartItemId = req.params.id;

    let sql = `DELETE FROM cartItems WHERE id = "${cartItemId}";`;

    conn.query(sql, (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      } 

      return res.status(StatusCodes.OK).json(results);
    })
  }
}

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem
}