const express = require('express');
const router = express.Router();

const prod_service = require('../service/plan_service.js');
// 주문조회
router.get('/orderList', async(req, res)=>{
  let orderList = await prod_service.order_list();
  res.send(orderList);
});
// 주문 상세조회
router.get('/orderList/:id', async(req, res)=>{
  let orderId = req.params.id
  let orderList = await prod_service.orderdtlist(orderId);
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
// 주문서를 통한 생산계획 등록
router.post('/planinsert', async(req, res)=>{
  let planInfo = req.body;
  console.log(planInfo);
  let result = await prod_service.orpldtinsert(planInfo);
  res.send(result);
});
// 저장버튼(수정)
router.put('/planDetailSave', async (req, res)=>{
  let planDetailInfo = req.body;
  let result = await prod_service.modifypldt(planDetailInfo);
  res.send(result);
});

// pldt 승인버튼(수정)
router.put('/plandtbtn/:id', async(req, res)=>{
  let planId = req.params.id
  let plInfo = await prod_service.pldtperm(planId);
  res.send(plInfo);
});

module.exports = router;