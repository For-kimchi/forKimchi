// app.js
require('dotenv').config({path : './mapper/configs/dbConfig.env'})
// console.log(process.env);
const express = require('express');
const app = express();
const session = require('express-session');
const path = require("path");

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// router 등록

// basic
const basicRouter = require('./router/basic_router.js')
const businessRouter = require('./router/business_router.js')
const accountRouter = require('./router/account_router.js')

// 어진 
const materialRouter = require('./router/material_router.js');
const storeRouter = require('./router/store_router.js');

// 혁진
const qualityRouter = require('./router/quality_router.js');

// 유환
const prodRouter = require('./router/plan_router.js');
const { quaReqAll } = require('./service/quality_service.js');

const prodMatreRouter = require('./router/prod_mate_router.js')

// 미들웨어
// 기본적으로 넣어야할 부분이 있음. content-type에 대한 부분.
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}));
// application/json
app.use(express.json());

// Session 설정 객체
let sessionSetting = session({
  secret : '$#@1235TSecdx', // 암호화 키
  resave : false, // 세션을 언제나 저장할 건지
  saveUninitialized : true, // 세션에 저장할 내역이 없어도 처음부터 세션 생성여부
  // 세션 쿠키 설정
  cookie : {
    httpOnly : true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    secure : false,  // https 환경에서만 적용
    maxAge : 60000   // 유효기간(밀리세컨초 기준)
  }
 });
 // Session 설정 등록
app.use(sessionSetting);

app.listen(3000, ()=>{
  console.log('Server Start');
  console.log('http://localhost:3000');
});
// 라우팅

// 루트 등록은 기본적으로 하나 해주는게 좋음.
app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.use('/api', basicRouter);
app.use('/api', businessRouter);
app.use('/api', accountRouter);

// 어진
app.use('/api', materialRouter);
app.use('/api', storeRouter);

// 유환
app.use('/api', prodRouter);
app.use('/api', prodMatreRouter);

// 혁진
app.use('/api', qualityRouter);

// service를 먼저 만들어야함.
// 아직은 구조익숙해지기위해서 거꾸러 작업함.

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./public", "index.html"));
});
