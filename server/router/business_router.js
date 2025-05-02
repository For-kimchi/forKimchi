const express = require('express');
const router = express.Router();
const business_service = require('../service/business_service')

// 주문서를 통한 생산계획 등록
router.post('/order', async(req, res)=>{
  let orderInfo = req.body;
  let result = await business_service.postOrder(orderInfo);
  res.send(result);
});

router.get('/delivTarget', async(req, res)=>{
  let params = req.query;
  let result = await business_service.getDelivTarget(params);
  res.send(result);
});

router.get('/delivProdTarget', async(req, res)=>{
  let params = req.query;
  let result = await business_service.getDelivProdTarget(params);
  res.send(result);
});

module.exports = router;