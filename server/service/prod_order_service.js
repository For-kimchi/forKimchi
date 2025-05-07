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
}
// 생산지시 등록
const insertProdOrder = async(prodOrder) =>{

    // let conn;
    // try{
    //     conn = await mariaDB.getConnection();
    //     await conn.beginTransaction();

        console.log(prodOrder);
        let cloumn = ['plan_detail_id', 'prod_order_lot', 'prod_id', 'order_date', 'order_amount'];
        let convert = converts.convertObjToAry(prodOrder, cloumn);
        console.log(convert);
        
        // let insert = await mariaDB.query('insertProdOrderInfo')
        // selectedSql = await mariaDB.selectedQuery('sltPlanKey', {});
        // let lastPlan = await conn.query(selectedSql, {});


    //     conn.commit();
    // }catch(err){
    //     if(conn) conn.rollback();
    // }finally{
    //     if(conn) conn.release();
    // }
}

module.exports = {
    selectProdOrderList,
    selectProdPlanDetailList,
    selectProdOrderInfoList,
    insertProdOrder,
}