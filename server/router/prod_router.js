const express = require('express');
const router = express.Router();

const prod_service = require('../service/prod_service.js');

router.get('/orderlisit', async(req, res)=>{
  let orderList = await prod_service.order_list();
  res.send(orderList);
});

module.exports = router;