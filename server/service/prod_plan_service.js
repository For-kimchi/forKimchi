const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');
const keys = require('../utils/keys');
// 생산지시 전체조회
const selectProdOrderList = async()=>{
 let list = await mariaDB.query('selectOrder');
 return list;
};
// 생산지시등록을 위한 계획 조회
const selectProdPlanDetailList = async()=>{
    let list = await mariaDB.query('selectPlanDetail');
    return list;
};
// 생상계획을 통한 생산지시 조회
const selectProdOrderInfoList = async(planDtId) =>{
    let list = await mariaDB.query('selectplanOrderInfo', planDtId);
    return list;
}

module.exports = {
    selectProdOrderList,
    selectProdPlanDetailList,
    selectProdOrderInfoList,
}