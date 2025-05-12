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

// 자재발주조회 페이지에서 검색결과에 따른 조회
router.post('/orderSearch', async (req, res) => {
  try {
    const { company, startDate, endDate, orderStatus, supplier } = req.body;
    
    // 서비스 레이어 호출
    const result = await orderSearchService.searchOrder(company, startDate, endDate, orderStatus, supplier);
    
    // 성공적인 응답 반환
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
// 입고관리 발주서조회(발주승인건만)
// router.get('/storeMate', async(req, res) => {
//   let search = req.query;
//   let matList = await mateService.storeMateAll(search)
//                                 .catch(err=> console.log(err));
//   res.send(matList);
// })

// 발주상세조회
router.get('/materials/:id', async(req, res)=> {
  let mateId = req.params.id;
  let mateInfo = await mateService.mateReqById(mateId)
                                  .catch(err => console.log(err));
  res.send(mateInfo);
});

// 자재발주관리페이지 발주서전체조회
router.get('/materialList', async (req, res) => {
  let search = req.query;
  let matList = await mateService.mateAll(search)
                                .catch(err=>console.log(err));
  res.send(matList);
})



// 자재발주관리페이지 발주서 삭제
// router.delete('/materialList/:Id', async (req, res) => {
//   try {
//     let reqId= req.params.id;
//     await mateService.deleteMaterial(reqId); 
//     res.status(200).send('삭제 완료');
//   } catch (err) {
//     console.error('삭제 에러:', err);
//     res.status(500).send('삭제 중 오류 발생');
//   }
// });
// 자재발주관리페이지 발주서 삭제
router.delete('/materialList/:reqId', async (req,res) => {
  let reqId = req.params.reqId;
  let result = await mateService.deleteMaterial(reqId);
  res.send(result);
});


// 회사조회
router.get('/vendors', async(req,res) => {
  let search = req.query;
  let venList = await mateService.vendorId(search)
                                .catch(err => console.log(err));
  res.send(venList);
});

// 자재검색
router.get('/mateList', async (req, res) => {
  const { mate_name } = req.query;
  try {
    let mateList = await mateService.mateList(mate_name);
    // mate_name이 있을 경우 대소문자 구분 없이 포함된 항목만 필터링
    if (mate_name) {
      mateList = mateList.filter(mate => mate.mate_name.toLowerCase().includes(mate_name.toLowerCase()));
    }
    res.send(mateList);
  } catch (err) {
    console.error('Error fetching mate list:', err);
    res.status(500).send('Internal Server Error');
  }
});

// 자재발주 저장버튼
router.post('/mateSave', async (req, res) => {
  const mate_detail_list = req.body;
  let result = await mateService.insertMates(mate_detail_list).catch((err) => console.log(err));
  res.send(result);
}); 


module.exports = router;