const express = require('express');
const router = express.Router();

const storeService = require('../service/store_service.js');
const mateService = require('../service/material_service.js');
const { route } = require('./material_router.js');


// 발주서 조회
// router.get('/materials', async(req, res)=> {
//   let search = req.query;
//   let matList = await mateService.mateReqAll(search)
//                                 .catch(err => console.log(err));
//   res.send(matList);
// });

// 입고관리 발주서조회(발주승인건만)
router.get('/storeMate', async(req, res) => {
  let search = req.query;
  let matList = await storeService.storeMateList(search)
                                .catch(err=> console.log(err));
  res.send(matList);
})

// 발주상세조회
router.get('/storeMate/:id', async(req, res)=> {
  let mateId = req.params.id;
  let mateInfo = await storeService.mateById(mateId)
                                  .catch(err => console.log(err));
  res.send(mateInfo);
});

// 입고저장버튼
router.post('/storeSave', async (req, res) => {
  let store_detail_list = req.body;
  let result = await storeService.insertStore(store_detail_list)
                                .catch((err) => console.log(err));
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
  let storeInfo = await storeService.storedtList(storeId)
                                    .catch(err => console.log(err));
  res.send(storeInfo);
});

//-----------------------------------창고---------------------------------------
// 창고입고(검사완료건만 조회)
router.get('/storeWareStatus', async (req, res) => {
  let search = req.query;
  let storeList = await storeService.storeWareAll(search)
  .catch(err => console.log(err));
  res.send(storeList);
});

// 창고입고상세조회
router.get('/storeWareList/:id', async(req, res) => {
  let storeId = req.params.id;
  let storeInfo = await storeService.storeById(storeId)
                                    .catch(err => console.log(err));
  res.send(storeInfo);
});

// 창고저장
router.post('/insertWarehouse', async (req, res) => {
  try {
    let warehouseInfo = req.body;
    let result = await storeService.insertWarehouse(warehouseInfo);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('저장 오류');
  }
});

// 창고현황페이지에서 warehouse_id(드롭다운) 조회
router.get('/wareId', async (req, res) => {
  let search = req.query;
  let result = await storeService.wareIdAll(search);
  res.send(result);
})

// 창고입고페이지에서 warehouse_id(드롭다운) 조회
router.get('/wareDetailId', async (req, res) => {
  let search = req.query;
  let result = await storeService.wareDtId(search);
  res.send(result);
})

// 창고조회
// router.get('/warehouseList', async (req, res) => {
//   let addWare = req.body;
//   let result = await storeService.wareAll(addWare);
//   res.send(result);
// });

router.get('/warehouseList', async (req, res) => {
  const { type, warehouse_id } = req.query;

  try {
    let result;

    if (type === 'group') {
      result = await storeService.getGroupedByMaterial(warehouse_id);
    } else {
      result = await storeService.wareAll(warehouse_id);
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/warehouse/:id', async (req, res) => {
  let id = req.params.id;
  let list = await storeService.warehouse(id);
  res.send(list);
})

module.exports = router;  