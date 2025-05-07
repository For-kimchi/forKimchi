const express = require('express');
const router = express.Router();

const material_service = require('../service/quality_service.js');

//자재검사요청 (요청)
router.get('/mateQualityReq', async(req, res) =>{
  let mateQualityReq = await material_service.mateQualityReq();
  res.send(mateQualityReq);
});

//자재검사요청상세 (대기)
router.get('/mateQualityWait/:id', async(req, res) =>{
  let waitId = req.params.id; 
  let mateQualityWait = await material_service.mateQualityWait(waitId);
  res.send(mateQualityWait);
});

// 자재검사조회 (드롭다운)
router.get('/mateQualityViewDropDown', async(req, res)=> {
  let mateQualityViewDropDown = await material_service.mateQualityViewDropDown();
  res.send(mateQualityViewDropDown);
});

// 자재검사조회
router.get('/mateQualityViewAll', async(req, res)=> {
  let mateQualityViewAll = await material_service.mateQualityViewAll();
  res.send(mateQualityViewAll);
});

// 자재검사조회 (상세)
router.get('/mateQualityViewDetail/:id', async(req, res) => {
  let detailId = req.params.id;
  let mateQualityViewDetail = await material_service.mateQualityViewDetail(detailId);
  res.send(mateQualityViewDetail);
});

// 검사
router.post('/mateQualityViewAll', async(req, res)=>{
  let body = req.body;
  let testList = await basicService.mateQualityViewAll(body);
  res.send(testList);
});

//--------------------------------------------------------

// 제품검사조회 (드롭다운)
router.get('/prodQualityViewDropDown', async(req, res)=> {
  let prodQualityViewDropDown = await material_service.prodQualityViewDropDown();
  res.send(prodQualityViewDropDown);
});

// 제품검사조회
router.get('/prodQualityViewAll', async(req, res)=> {
  let prodQualityViewAll = await material_service.prodQualityViewAll();
  res.send(prodQualityViewAll);
});

// 제품검사조회 (상세)
router.get('/prodQualityViewDetail/:id', async(req, res) => {
  let detailId = req.params.id;
  let prodQualityViewDetail = await material_service.prodQualityViewDetail(detailId);
  res.send(prodQualityViewDetail);
});

// router.get('/qualityDetail', async(req, res)=> {
//   let qualityView = await mateService.qualityDetail();
//   res.send(qualityView);
// });

// router.get('/qualityControl', async(req, res)=> {
//   let mate = await mateService.qualityControl();
//   res.send(mate);
// });

// router.get('/qualityMatedetail/:id', async(req, res)=>{
//   let orderId = req.params.id
//   let mate = await mateService.qualityMatedetail(orderId);
//   res.send(mate);
// });

module.exports = router;