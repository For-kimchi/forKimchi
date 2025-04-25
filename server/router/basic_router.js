const express = require('express');
const router = express.Router();

const basicService = require('../service/basic_service.js');

router.get('/equips', async(req, res)=>{
  let equipLisit = await basicService.findAll();
  res.send(equipLisit);
});

module.exports = router;