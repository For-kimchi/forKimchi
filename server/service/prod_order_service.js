const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');
const keys = require('../utils/keys');

// let conn;
//     try{
//                 conn = await mariaDB.getConnection();
//                 await conn.beginTransaction();
                
//                 conn.commit();
//     }catch(err){
//         if(conn) conn.rollback();
//     }finally{
//         if(conn) conn.release();
//     }

// 생산지시 전체조회
const selectProdOrderList = async()=>{
 let list = await mariaDB.query('selectOrders');
 return list;
};
// 생산지시등록을 위한 계획 조회
const selectProdPlanDetailList = async()=>{
    let list = await mariaDB.query('selectPlanDetail');
    return list;
};
// 생산계획을 통한 생산지시 조회
const selectProdOrderInfoList = async(planDtId) =>{
    let list = await mariaDB.query('selectplanOrderInfo', planDtId);
    return list;
};
// 생산지시리스트
const selectProdOrderLists = async() =>{
    let list = await mariaDB.query('selectProdOrderList');
    return list;
};
// 생산지시자재 요청내역
const selectProdMateList = async() =>{
    let list = await mariaDB.query('selectProdMate');
    return list;
};
// 생산지시자재 BOM
const selectProdBomList = async(prodid) =>{
    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        // prod_name = prod_id
        selectedSql = await mariaDB.selectedQuery('selectProdName', prodid);
        let prodId = await conn.query(selectedSql, prodid);
        prodId = prodId[0].prod_id;
        
        selectedSql = await mariaDB.selectedQuery('selectBomsBomDetail', prodId);
        let result = await conn.query(selectedSql, prodId);
        conn.commit();
        return result;
    }catch(err){
        if(conn) conn.rollback();
    }finally{
        if(conn) conn.release();
    }
};

// 생산지시 등록
const insertProdOrder = async(prodOrder) =>{

    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
                
        selectedSql = await mariaDB.selectedQuery('updatePlanDetailStatus', prodOrder.plan_detail_id);
        let status = await conn.query(selectedSql, prodOrder.plan_detail_id);

        selectedSql = await mariaDB.selectedQuery('selectProdOrderLimit', {});
        let lastLot = await conn.query(selectedSql, {});

        let prodName = prodOrder.prod_id
        selectedSql = await mariaDB.selectedQuery('selectProdName', prodName);
        let prodId = await conn.query(selectedSql, prodName);
        prodId = prodId[0].prod_id
        let lastOrderLot = lastLot[0].prod_order_lot;
        let newOrderLot = keys.getNextKeyId(lastOrderLot);

        prodOrder.prod_order_lot = newOrderLot;
        prodOrder.prod_id = prodId;

        let cloumn = ['plan_detail_id', 'prod_order_lot', 'prod_id', 'order_date', 'order_amount'];
        let convert = converts.convertObjToAry(prodOrder, cloumn);
        
        selectedSql = await mariaDB.selectedQuery('insertProdOrderInfo', convert);
        let lastPlan = await conn.query(selectedSql, convert);


        conn.commit();
    }catch(err){
        if(conn) conn.rollback();
    }finally{
        if(conn) conn.release();
    }
};
// 생산공정
// 생산공정을 위한 지시 조회 selectProdProcess
const selectProdProcess = async() =>{
    let list = await mariaDB.query('selectProdProcess');
    return list;
};
// 공정흐름도 조회 + 공정수
const selectProdProcFlowInfo = async(prodId) =>{
    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        selectedSql = await mariaDB.selectedQuery('prodCode', prodId);
        let prodid = await conn.query(selectedSql, prodId);

         // prod_id 처리
        prodId =  prodid[0].prod_id;
        
        selectedSql = await mariaDB.selectedQuery('selectProdProcFlowInfo', prodId);
        let list = await conn.query(selectedSql, prodId);

        // 각 합계 구하기
        // selectSumProdProcList
        selectedSql = await mariaDB.selectedQuery('selectSumProdProcList', prodId);
        list = await conn.query(selectedSql, prodId);
        
        conn.commit();
        return list;
    }catch(err){
        if(conn) conn.rollback();
    }finally{
        if(conn) conn.release();
    }
};
// 생산공정 조회 조건 = 생산lot + 공정ID
const selectProdProcInfo = async(lot) =>{
    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();

        let lotInfo = [lot.lot, lot.prodId];

        selectedSql = await mariaDB.selectedQuery('selectProdProcList', lotInfo);
        let result = await conn.query(selectedSql, lotInfo);
        conn.commit();
        return result;
    }catch(err){
        if(conn) conn.rollback();
    }finally{
        if(conn) conn.release();
    }
};
// 생산 공정 등록 insertProdProcList
const insertProdProcList = async(procList) =>{
     let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        let result;
        // for문
        for(let prodProc of procList){
            // prodProcId 생성
            selectedSql = await mariaDB.selectedQuery('selectProdProcessId');
            let prodProcId = await conn.query(selectedSql);
            
            prodProcId = prodProcId[0].prod_proc_id;
            let newProcId = keys.getNextKeyId(prodProcId);
            prodProc.prod_proc_id = newProcId;
            
            
            // convert employee_id 추가해야함.
            let cloumn = ['prod_proc_id', 'prod_order_lot', 'proc_id', 'proc_order_amount', 'input_amount'];
            let convert = converts.convertObjToAry(prodProc, cloumn);
            
            // console.log(convert);

            // 실제 등록
            selectedSql = await mariaDB.selectedQuery('insertProdProc', convert);
            result = await conn.query(selectedSql, convert);
            // console.log('여기까지 도달?');
            };
            conn.commit();
            return result;
            }catch(err){
                if(conn) conn.rollback();
            }finally{
                if(conn) conn.release();
            }
};
// 공정 시작시간 업데이트 updateStartTime
const updateStartTime = async(param) =>{
    let list = await mariaDB.query('updateStartTime', param);
    return list;
};
// 공정 종료결과 업데이트 updateEndTime
const updateEndTime = async(param, procId) =>{
    let list = [param, procId];
    let result = await mariaDB.query('updateEndTime', list);
    return result;
};
module.exports = {
    selectProdOrderList,
    selectProdPlanDetailList,
    selectProdOrderInfoList,
    insertProdOrder,
    selectProdMateList,
    selectProdOrderLists,
    selectProdBomList,
    selectProdProcess,
    selectProdProcFlowInfo,
    selectProdProcInfo,
    insertProdProcList,
    updateStartTime,
    updateEndTime,
}