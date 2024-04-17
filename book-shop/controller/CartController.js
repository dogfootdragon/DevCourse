const conn = require('../mariadb'); // db 모듈
const {StatusCodes} = require('http-status-codes'); // status code 모듈

// 장바구니 담기
const addToCart = (req, res) => {
  let {book_id, quantity, user_id} = req.body;
  sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES ("${book_id}", "${quantity}", "${user_id}");`;

  conn.query(sql, (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    } 

    return res.status(StatusCodes.OK).json(results);
  })
}

// 장바구니 아이템 목록 조회 & 선택한 장바구니 상품 목록 조회
const getCartItems = (req, res) => {
  let {user_id, selected} = req.body;
  let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
              FROM cartItems LEFT JOIN books 
              ON cartItems.book_id = books.id
              WHERE user_id = "${user_id}" AND cartItems.id IN (${selected})`;

  conn.query(sql, (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    } 

    return res.status(StatusCodes.OK).json(results);
  })
}

// 장바구니 도서 삭제
const removeCartItem = (req, res) => {
  const {id} = req.params;

  let sql = `DELETE FROM cartItems WHERE id = "${id}";`;

  conn.query(sql, (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    } 

    return res.status(StatusCodes.OK).json(results);
  })
}

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem
}