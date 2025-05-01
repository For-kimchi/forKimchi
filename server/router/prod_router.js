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
// 주문서를 통한 생산계획 등록
router.post('/planinsert', async(req, res)=>{
  let planInfo = req.body;
  let result = await prod_service.orpldtinsert(planInfo);
  res.send(result);
});
// 저장버튼(수정)
router.put('/plandt/:id', async (req, res)=>{
  let pldtId = req.params.id;
  let pldtInfo = req.body;
  let result = await prod_service.modifypldt(pldtInfo, pldtId);
  res.send(result);
});

// pldt 승인버튼(수정)
router.put('/plandtbtn/:id', async(req, res)=>{
  let planId = req.params.id
  let plInfo = await prod_service.pldtperm(planId);
  res.send(plInfo);
});

module.exports = router;