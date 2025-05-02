const express = require('express');
const router = express.Router();

const mateService = require('../service/material_service.js');

// 발주전체조회
router.get('/materials', async(req, res)=> {
  let search = req.query;
  let matList = await mateService.mateReqAll(search)
                                .catch(err => console.log(err));
  res.send(matList);
});

// 발주상세조회
router.get('/materials/:id', async(req, res)=> {
  let mateId = req.params.id;
  let mateInfo = await mateService.mateReqById(mateId)
                                  .catch(err => console.log(err));
  res.send(mateInfo);
});

// 회사조회
router.get('/vendors', async(req,res) => {
  let search = req.query;
  let venList = await mateService.vendorId(search)
                                .catch(err => console.log(err));
  res.send(venList);
});

// 자재검색
router.get('/mateList', async(req,res) => {
  const { mate_name } = req.query;
  let mateList = await mateService.mateList(mate_name)
                                  .catch(err => console.log(err));
  res.send(mateList);
});


module.exports = router;