// router/customer_router.js
// 라우터 모듈 = 라우팅을 모아둔
const express = require('express');
// 라우터 객체를 따로 만들어줘야함.
const router = express.Router();
// service 등록
const custService = require('../service/customer_service.js');

// 전체조회와 단건조회는 같은 조회라서 GET을 사용. 이걸로 인해서 충돌이남.
// 전체조회는 그냥 조회문이라 변경안하고 단건조회쪽을 바꾸는게 좋음

// customers
// 전체조회 : GET + '/customers'
router.get('/customers', async(req, res)=>{
  let custList = await custService.findAll();
  res.send(custList);
});
// 단건조회 : GET + '/customers/:id'
router.get('/customers/:id',async (req, res)=>{
  // 콜론에서 가져오는 값은 항상 params
let custId = req.params.id;
let custInfo = await custService.findById(custId);
res.send(custInfo);
});

// 등록 : POST + '/customers' + JSON
router.post('/customers', async (req, res)=>{
  let addCust = req.body;
  let result = await custService.addCustomer(addCust);
  res.send(result);
});

// 수정 : PUT + '/customers/:id' + JSON
router.put('/customers/:id', async (req, res)=>{
  
  let custId = req.params.id; // 파라메터값 가져오기
  let custUpInfo = req.body; // body에서 사용자가 입력한 값을 가져옴
  // 값을 넘겨주는 순서는 쿼리문을 기준으로...
  let result = await custService.modifyCustomerInfo(custUpInfo, custId);
  res.send(result);
});

// 삭제 : DELETE + '/customers/:id'
router.delete('/customers/:id', async (req, res)=>{
let custId = req.params.id
let result = await custService.removeCustomerInfo(custId);
res.send(result);
});


// 라우터 객체들을 exports 해줌.
module.exports = router;