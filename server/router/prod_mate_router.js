const express = require('express');
const router = express.Router();

const prodMateService = require('../service/prod_mate_service.js');

// 자재 요청
router.post('/prodMateOrder', async(req, res)=>{  
  let body = req.body;
  let list = await prodMateService.postPmo(body);
  res.send(list);
});

module.exports = router;