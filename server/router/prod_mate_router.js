const express = require('express');
const router = express.Router();

const prodMateService = require('../service/prod_mate_service.js');

// 자재요청/완료 현황 목록 조회
router.get('/prodMateOrder', async(req, res)=>{
  let list = await prodMateService.getPmo();
  res.send(list);
});

// 자재요청 현황 조회
router.get('/prodMateOrderReq', async(req, res)=>{
  let list = await prodMateService.getPmoReq();
  res.send(list);
});

// 생산완료 현황 조회
router.get('/prodMateOrderDone', async(req, res)=>{
  let list = await prodMateService.getPmoDone();
  res.send(list);
});


// 자재요청 현황 목록 상세 조회
router.get('/prodMateOrder/:id', async(req, res)=>{
  let id = req.params.id
  let list = await prodMateService.getPmoOne(id);
  res.send(list);
});

// 자재 요청 목록 상세 조회 + 재고
router.get('/prodMateOrderAll/:id', async(req, res)=>{
  let id = req.params.id
  let list = await prodMateService.getPmoOneAll(id);
  res.send(list);
});

// 자재 요청 상태 갱신
router.put('/prodMateOrder', async(req, res)=>{
  let body = req.body;
  let list = await prodMateService.putPmo(body);
  res.send(list);
});

// 자재 요청 완료 처리
router.post('/prodMateOrder', async(req, res)=>{  
  let body = req.body;
  let result = await prodMateService.postPmo(body);
  res.send(result);
});

module.exports = router;