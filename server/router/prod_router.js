const express = require('express');
const router = express.Router();

const prod_service = require('../service/prod_service.js');
// 주문 상세조회
router.get('/orderlisit', async(req, res)=>{
  let orderList = await prod_service.order_list();
  res.send(orderList);
});
// 생산계획조회
router.get('/prodlist', async(req, res)=>{
  let prodList = await prod_service.prodlist();
  res.send(prodList);
});
// 생산계획상세조회
router.get('/proddtlist/:id', async(req, res)=>{
  let orderId = req.params.id
  let prodList = await prod_service.proddtlist(orderId);
  res.send(prodList);
});

module.exports = router;