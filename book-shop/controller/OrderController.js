const conn = require('../mariadb'); // db 모듈
const {StatusCodes} = require('http-status-codes'); // status code 모듈

// 주문하기
const order = (req, res) => {
  let {items, delivery, totalQuantity, totalPrice, userId, firstBookTitle} = req.body;
  let delivery_id = 3;
  let order_id = 1;
  sql = `INSERT INTO delivery (address, receiver, contact) VALUES ("${delivery.address}", "${delivery.receiver}", "${delivery.contact}");`;

  // conn.query(sql, (err, results) => {
  //   if(err) {
  //     console.log(err);
  //     return res.status(StatusCodes.BAD_REQUEST).end();
  //   } 

  //   delivery_id = results.insertId;
  //   return res.status(StatusCodes.OK).json(results);
  // })

  sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
         VALUES ("${firstBookTitle}", ${totalQuantity}, ${totalPrice}, ${userId}, ${delivery_id});`;
  // conn.query(sql, (err, results) => {
  //   if(err) {
  //     console.log(err);
  //     return res.status(StatusCodes.BAD_REQUEST).end();
  //   } 

  //   order_id = results.insertId;
  //   console.log(order_id)
  //   return res.status(StatusCodes.OK).json(results);
  // })

  sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`

  // items 배열 요소 forEach
  let values = [];
  items.forEach((item) => {
    values.push([order_id, item.book_id, item.quantity]);
    console.log(values);
  })
  conn.query(sql, [values], (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    } 

    order_id = results.insertId;
    console.log(order_id)
    return res.status(StatusCodes.OK).json(results);
  })
}

// 주문 목록 조회
const getOrders = (req, res) => {
  res.json('주문 목록 조회');
}

// 주문 상세 조회
const getOrderDetail = (req, res) => {
  res.json('주문 상세 조회');
}

module.exports = {
  order,
  getOrders,
  getOrderDetail
}