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
// 공정흐름도 조회
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
        conn.commit();
        return list;
    }catch(err){
        if(conn) conn.rollback();
    }finally{
        if(conn) conn.release();
    }
}
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
}