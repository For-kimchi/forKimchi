const express = require('express');
const router = express.Router();

const mateService = require('../service/material_service.js');

router.get('/materials', async(req, res)=> {
  let search = req.query;
  let matList = await mateService.mateReqAll(search)
                                .catch(err => console.log(err));
  res.send(matList);
});

router.get('/materials/:id', async(req, res)=> {
  let mateId = req.params.id;
  let mateInfo = await mateService.mateReqById(mateId)
                                  .catch(err => console.log(err));
  res.send(mateInfo);
})

module.exports = router;