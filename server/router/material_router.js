const express = require('express');
const router = express.Router();

const mateService = require('../service/material_service.js');

router.get('/materials', async(req, res)=> {
  let custList = await mateService.mateReqAll();
  res.send(custList);
});

module.exports = router;