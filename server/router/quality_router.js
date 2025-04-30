const express = require('express');
const router = express.Router();

const mateService = require('../service/quality_service.js');

router.get('/quality', async(req, res)=> {
  let quaList = await mateService.quaReqAll();
  res.send(quaList);
});

router.get('/quality-lot', async(req, res)=> {
  let dropDownList = await mateService.dropDown();
  res.send(dropDownList);
});

router.get('/quality-detail', async(req, res)=> {
  let detailList = await mateService.qualityDetail();
  res.send(detailList);
});

router.get('/quality-mate', async(req, res)=> {
  let mate = await mateService.qualityControl();
  res.send(mate);
})


module.exports = router;