const express = require('express');
const router = express.Router();

const basicService = require('../service/production_service.js');

router.get('/orderLisit', async(req, res)=>{
  let orderLisit = await production_service.order_list();
  res.send(orderLisit);
});

module.exports = router;