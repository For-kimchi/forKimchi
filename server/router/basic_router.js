const express = require('express');
const router = express.Router();

const basicService = require('../service/basic_service.js');

// 제품 조건 조회
router.get('/basicProd', async(req, res)=>{
  let params = req.query;
  let list = await basicService.getProd(params);
  res.send(list);
});

// 제품 등록
router.post('/basicProd', async(req, res)=>{
  let body = req.body;
  let result = await basicService.postProd(body);
  res.send(result);
});

// 거래처 조건 조회
router.get('/basicVendor', async(req, res)=>{
  let params = req.query;
  let list = await basicService.getVendor(params);
  res.send(list);
});

// 거래처 등록
router.post('/basicVendor', async(req, res)=>{
  let body = req.body;
  let result = await basicService.postVendor(body);
  res.send(result);
});

// 자재 조건 조회
router.get('/basicMate', async(req, res)=>{
  let params = req.query;
  let list = await basicService.getMate(params);
  res.send(list);
});

// 자재 등록
router.post('/basicMate', async(req, res)=>{
  let body = req.body;
  let result = await basicService.postMate(body);
  res.send(result);
});

// 공정 조건 조회
router.get('/basicProc', async(req, res)=>{
  let params = req.query;
  let list = await basicService.getProc(params);
  res.send(list);
});

// 공정 등록
router.post('/basicProc', async(req, res)=>{
  let body = req.body;
  let result = await basicService.postProc(body);
  res.send(result);
});

// BOM 조회 (제품ID)
router.get('/basicBom', async(req, res)=>{
  let params = req.query;
  let bom = await basicService.getBom(params);
  res.send(bom);
});

// BOM 등록
router.post('/basicBom', async(req, res)=>{
  let body = req.body;
  let result = await basicService.postBom(body);
  res.send(result);
});

// 공정흐름도 조회 (제품ID)
router.get('/basicProcFlow', async(req, res)=>{
  let params = req.query;
  let bom = await basicService.getProcFlow(params);
  res.send(bom);
});

// 공정흐름도 등록
router.post('/basicProcFlow', async(req, res)=>{
  let body = req.body;
  let result = await basicService.postProcFlow(body);
  res.send(result);
});

// 코드 조회 (main -> sub)
router.get('/codes/:main_code', async(req, res)=>{
  let mainCode = req.params.main_code;
  let result = await basicService.getCode(mainCode);
  res.send(result);
});

router.get('/equips', async(req, res)=>{
  let result = await basicService.findAll();
  res.send(result);
});

module.exports = router;