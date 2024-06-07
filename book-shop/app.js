// express 모듈
const express = require('express');
const app = express();

// dotenv 모듈
// 디렉토리 구조가 달라 최상위 폴더에 .env 파일이 위치하지 않음. path를 통해 경로 재설정
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '.env')});

app.listen(process.env.PORT);

// cors
const cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/category');
const likeRouter = require('./routes/likes');
const cartRouter = require('./routes/carts');
const orderRouter = require('./routes/orders');

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/category", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);