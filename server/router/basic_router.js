const express = require('express');
const router = express.Router();

const basicService = require('../service/basic_service.js');

// 제품 조건 조회
router.get('/basicProd', async(req, res)=>{
  let params = req.query;
  let list = await basicService.selectProd(params);
  res.send(list);
});

router.get('/equips', async(req, res)=>{
  let list = await basicService.findAll();
  res.send(list);
});

// 거래처 조건 조회
router.get('/basicVendor', async(req, res)=>{
  let params = req.query;
  let list = await basicService.selectVendor(params);
  res.send(list);
});

// 코드 조회 (main -> sub)
router.get('/codes/:main_code', async(req, res)=>{
  let mainCode = req.params.main_code;
  let list = await basicService.selectCode(mainCode);
  res.send(list);
});

module.exports = router;