const express = require('express');
const router = express.Router();

const quality_service = require('../service/quality_service.js');


//자재검사요청 (요청)
router.get('/mateQualityReq', async (req, res) => {
  let mateQualityReq = await quality_service.mateQualityReq();
  res.send(mateQualityReq);
});

// 등록
router.post('/mateInsert', async (req, res) => {
  let mateQualityInsert = req.body;
  let result = await quality_service.mateQualityInsert(mateQualityInsert);
  res.send(result);
});

// 검사상태 업데이트 - 대기
router.put(`/mateQuality`, async (req, res) => {
  let id = req.body;
  let result = await quality_service.updateMateQuality(id);
  res.send(result);
});

//자재검사요청상세 (대기)
router.get('/mateQualityWait/:id', async (req, res) => {
  let waitId = req.params.id;
  let mateQualityWait = await quality_service.mateQualityWait(waitId);
  res.send(mateQualityWait);
});

// 자재검사조회 (드롭다운)
router.get('/mateQualityViewDropDown', async (req, res) => {
  let mateQualityViewDropDown = await quality_service.mateQualityViewDropDown();
  res.send(mateQualityViewDropDown);
});

// 자재검사조회
router.get('/mateQualityViewAll', async (req, res) => {
  let mateQualityViewAll = await quality_service.mateQualityViewAll();
  res.send(mateQualityViewAll);
});

// 자재검사조회 (상세)
router.get('/mateQualityViewDetail/:id', async (req, res) => {
  let detailId = req.params.id;
  let mateQualityViewDetail = await quality_service.mateQualityViewDetail(detailId);
  res.send(mateQualityViewDetail);
});

// 검사
router.post('/mateQualityViewAll', async (req, res) => {
  let body = req.body;
  let testList = await quality_service.mateQualityViewAll(body);
  res.send(testList);
});

//--------------------------------------------------------

// 제품검사요청
router.get('/prodQualityReq', async (req, res) => {
  let prodQualityReq = await quality_service.prodQualityReq();
  res.send(prodQualityReq);
})

// 제품검사요청 (대기)
router.get('/prodQualityWait/:id', async (req, res) => {
  let detailId = req.params.id;
  let prodQualityWait = await quality_service.prodQualityWait(detailId);
  res.send(prodQualityWait);
})

// 제품검사조회 (드롭다운)
router.get('/prodQualityViewDropDown', async (req, res) => {
  let prodQualityViewDropDown = await quality_service.prodQualityViewDropDown();
  res.send(prodQualityViewDropDown);
});

// 제품검사조회
router.get('/prodQualityViewAll', async (req, res) => {
  let prodQualityViewAll = await quality_service.prodQualityViewAll();
  res.send(prodQualityViewAll);
});

// 제품검사조회 (상세)
router.get('/prodQualityViewDetail/:id', async (req, res) => {
  let detailId = req.params.id;
  let prodQualityViewDetail = await quality_service.prodQualityViewDetail(detailId);
  res.send(prodQualityViewDetail);
});

// -------------------------

// 검사항목관리

// 검사조회
router.get('/options', async (req, res) => {
  let params = req.query;
  let list = await quality_service.selectOption(params);
  res.send(list);
});

// 검사등록
router.post('/options', async (req, res) => {
  let body = req.body;
  let result = await quality_service.insertOption(body);
  res.send(result);
});

// 검사삭제
router.delete('/options/:id', async (req, res) => {
  let result = await quality_service.deleteOption(req.params.id);
  res.send(result);
});

// 검사수정
router.put('/options/:id', async (req, res) => {
  let id = req.params.id;
  let info = req.body;
  let result = await quality_service.updateOption(info, id);
  res.send(result);
});

// -------------------------

// 검사기준관리

// 검사조회
router.get('/options', async (req, res) => {
  let params = req.query;
  let list = await quality_service.selectOption(params);
  res.send(list);
});

// 검사등록
router.post('/options', async (req, res) => {
  let body = req.body;
  let result = await quality_service.insertOption(body);
  res.send(result);
});

// 검사삭제
router.delete('/options/:id', async (req, res) => {
  let result = await quality_service.deleteOption(req.params.id);
  res.send(result);
});

// 검사수정
router.put('/options/:id', async (req, res) => {
  let id = req.params.id;
  let info = req.body;
  let result = await quality_service.updateOption(info, id);
  res.send(result);
});



module.exports = router;