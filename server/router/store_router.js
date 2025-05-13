const express = require('express');
const router = express.Router();

const storeService = require('../service/store_service.js');
const mateService = require('../service/material_service.js');


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
  let storeInfo = await storeService.storeById(storeId)
                                    .catch(err => console.log(err));
  res.send(storeInfo);
});

// 창고입고(검사완료건만 조회)
router.get('/storeWareStatus', async (req, res) => {
  let search = req.query;
  let storeList = await storeService.storeWareAll(search)
                                    .catch(err => console.log(err));
  res.send(storeList);
});

// 창고저장
router.post('/insertWarehouse', async (req, res) => {
  try {
    let warehouseInfo = req.body;
    let result = await storeService.insertWarehouse(warehouseInfo);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('저장 오류');
  }
});


// 창고조회
// router.get('/warehouseList', async (req, res) => {
//   let addWare = req.body;
//   let result = await storeService.wareAll(addWare);
//   res.send(result);
// });

router.get('/warehouseList', async (req, res) => {
  const type = req.query.type;

  try {
    let result;

    if (type === 'group') {
      result = await storeService.getGroupedByMaterial();
    } else {
      // 기본은 LOT별
      result = await storeService.wareAll();
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;  