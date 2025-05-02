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
router.get('/dropDown', async(req, res)=> {
  let dropDown = await material_service.dropDown();
  res.send(dropDown);
});

// 자재검사조회
router.get('/qualityViewAll', async(req, res)=> {
  let qualityViewAll = await material_service.qualityViewAll();
  res.send(qualityViewAll);
});

// 자재검사조회 (상세)
router.get('/qualityViewDetail/:id', async(req, res) => {
  let detailId = req.params.id;
  let qualityViewDetail = await material_service.qualityViewDetail(detailId);
  res.send(qualityViewDetail);
})


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