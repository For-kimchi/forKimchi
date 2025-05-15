const express = require('express');
const router = express.Router();

const prodPlanService = require('../service/prod_plan_service.js');
const prodOrderService = require('../service/prod_order_service.js');

// prodPlanService 생산계획
// 주문조회
router.get('/orderList', async(req, res)=>{
  let orderList = await prodPlanService.order_list();
  res.send(orderList);
});
// 주문 상세조회
router.get('/orderList/:id', async(req, res)=>{
  let orderId = req.params.id
  let orderList = await prodPlanService.orderdtlist(orderId);
  res.send(orderList);
});

// 생산계획조회
router.get('/prodlist', async(req, res)=>{
  let prodList = await prodPlanService.prodlist();
  res.send(prodList);
});
// 생산계획상세조회
router.get('/proddtlist/:id', async(req, res)=>{
  let planId = req.params.id
  let prodList = await prodPlanService.proddtlist(planId);
  res.send(prodList);
});
// 주문서를 통한 생산계획 등록
router.post('/planinsert', async(req, res)=>{
  let planInfo = req.body;
  console.log(planInfo);
  let result = await prodPlanService.orpldtinsert(planInfo);
  res.send(result);
});
// 저장버튼(수정)
router.put('/planDetailSave', async (req, res)=>{
  let planDetailInfo = req.body;
  let result = await prodPlanService.modifypldt(planDetailInfo);
  res.send(result);
});

// pldt 승인버튼(수정)
router.put('/plandtbtn', async(req, res)=>{
  let planDetailList = req.body
  let result = await prodPlanService.pldtperm(planDetailList);
  res.send(result);
});

// prodOrderService 생산지시
// 생산지시 전체조회
router.get('/prodOrder', async(req, res)=>{
  let OrderList = await prodOrderService.selectProdOrderList();
  res.send(OrderList);
});

// 생산지시 등록을 위한 상세 계획 조회
router.get('/planDetailList', async(req, res)=>{
  let PlanDetailList = await prodOrderService.selectProdPlanDetailList();
  res.send(PlanDetailList);
});

// 생산지시 조회
router.get('/prodOrder/:id', async(req, res)=>{
  let planDtId = req.params.id;
  let PlanDetailList = await prodOrderService.selectProdOrderInfoList(planDtId);
  res.send(PlanDetailList);
});

// 생산지시 등록
router.put('/prodOrder', async(req, res)=>{
  let prodOrder = req.body
  let result = await prodOrderService.insertProdOrder(prodOrder);
  res.send(result);
});

// 생산지시 조건 조회 selectProdOrderLists
router.get('/prodOrderList', async(req, res)=>{
  let result = await prodOrderService.selectProdOrderLists();
  res.send(result);
});
// 생산지시자재 요청내역
router.get('/prodMate', async(req, res)=>{
  let result = await prodOrderService.selectProdMateList();
  res.send(result);
});
// 생산지시자재 요청BOM selectProdBomList
router.get('/prodBom/:id', async(req, res)=>{
  let prodid = req.params.id
  let result = await prodOrderService.selectProdBomList(prodid);
  res.send(result);
});
// 생산공정을 위한 지시 조회 selectProdProcess
router.get('/prodProcess', async(req, res)=>{
  let result = await prodOrderService.selectProdProcess();
  res.send(result);
});
// 생산공정을 위한 공정흐름도 조회 selectProdProcFlowInfo
router.get('/prodProcFlow/:id', async(req, res)=>{
  let prodLot = req.params.id
  let result = await prodOrderService.selectProdProcFlowInfo(prodLot);
  res.send(result);
});
// 생산공정LIst selectProdProcInfo
router.put('/prodProcFlowInfo', async(req, res)=>{
  let lot = req.body;
  let result = await prodOrderService.selectProdProcInfo(lot);
  res.send(result);
});
// 생산공정 등록 insertProdProc
router.post('/insertProdProc', async(req, res)=>{
  let procList = req.body;
  let result = await prodOrderService.insertProdProcList(procList);
  res.send(result);
});
// 공정시작 버튼
router.put('/updateStartTime/:id', async(req, res)=>{
  let param = req.params.id;
  let result = await prodOrderService.updateStartTime(param);
  res.send(result);
});
// 공정종료 버튼 updateEndTime
router.put('/updateEndTime/:id', async(req, res)=>{
  let procId = req.params.id;
  let param = req.body;
  let result = await prodOrderService.updateEndTime(param, procId);
  res.send(result);
});
module.exports = router;