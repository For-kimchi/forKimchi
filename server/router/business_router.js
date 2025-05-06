const express = require('express');
const router = express.Router();
const business_service = require('../service/business_service')

// 주문서 등록
router.post('/order', async(req, res)=>{
  let orderInfo = req.body;
  let result = await business_service.postOrder(orderInfo);
  res.send(result);
});

// 납품대상 조회
router.get('/delivTarget', async(req, res)=>{
  let params = req.query;
  let result = await business_service.getDelivTarget(params);
  res.send(result);
});

// 납품대상 
router.get('/delivProdTarget', async(req, res)=>{
  let params = req.query;
  let result = await business_service.getDelivProdTarget(params);
  res.send(result);
});

// 납품등록
router.post('/deliv', async(req, res)=>{
  let delivInfo = req.body;
  let result = await business_service.postDeilv(delivInfo);
  res.send(result);
});

module.exports = router;