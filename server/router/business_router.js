const express = require('express');
const router = express.Router();
const business_service = require('../service/business_service')

// 주문서 등록
router.post('/order', async(req, res)=>{
  let orderInfo = req.body;
  let result = await business_service.postOrder(orderInfo);
  res.send(result);
});

// 주문서 조회
router.get('/order', async(req, res)=>{
  let params = req.query;
  let result = await business_service.getOrder(params);
  res.send(result);
});

// 주문서 상세 조회
router.get('/order/:id', async(req, res)=>{
  let id = req.params.id;
  let result = await business_service.getOrderDetail(id);
  res.send(result);
});

router.post('/orderConfirm', async(req, res)=>{
  let orderInfo = req.body;
  let result = await business_service.postOrderConfirm(orderInfo);
  res.send(result);
});

router.delete('/order', async(req, res)=>{
  let query = req.query;
  let result = await business_service.deleteOrder(query);
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


router.get('/deliv', async(req, res)=>{
  let params = req.query;
  let result = await business_service.getDeliv(params);
  res.send(result);
});

router.get('/deliv/:id', async(req, res)=>{
  let id = req.params.id;
  let result = await business_service.getDelivDetail(id);
  res.send(result);
});

router.get('/orderOne', async(req, res)=>{
  let id = req.query.order_id;
  let result = await business_service.getOrderOne(id);
  res.send(result);
});

// 제품 입고
router.post('/prodWarehouse', async(req, res) => {
  let body = req.body;
  let result = await business_service.postProdWarehouse(body);
  res.send(result);
});

module.exports = router;