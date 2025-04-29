const express = require('express');
const router = express.Router();

const mateService = require('../service/quality_service.js');

router.get('/quality', async(req, res)=> {
  let quaList = await mateService.quaReqAll();
  res.send(quaList);
});

router.get('/quality', async(req, res)=> {
  let dropDownList = await mateService.dropDownAll();
  res.send(dropDownList);
});


module.exports = router;