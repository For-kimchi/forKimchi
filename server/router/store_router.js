const express = require('express');
const router = express.Router();

const storeService = require('../service/store_service.js');
const mateService = require('../service/material_service.js');


// 발주서 조회
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

// 입고저장버튼
router.post('/storeSave', async (req, res) => {
  let store_detail_list = req.body;
  let result = await storeService.insertStore(store_detail_list).catch((err) => console.log(err));
  res.send(result);
});

// 입고조회
router.get('/storeList', async(req, res) => {
  let search = req.query;
  let storeList = await storeService.storeAll(search)
                                    .catch(err => console.log(err));
  res.send(storeList);
});

// 입고상세조회
router.get('/storeList/:id', async(req, res) => {
  let storeId = req.params.id;
  let storeInfo = await storeService.storeById(storeId)
                                    .catch(err => console.log(err));
  res.send(storeInfo);
});

// 창고저장
router.post('/insertWarehouse', async (req, res) => {
  let warehouseInfo = req.body;
  let result = await storeService.insertWarehouse(warehouseInfo);
  return result
});

// 창고조회
router.get('/warehouseList', async (req, res) => {
  let search = req.query;
  let wareList = await storeService.wareAll(search);
  res.send(wareList);
});

module.exports = router;