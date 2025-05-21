const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');
const keys = require('../utils/keys');

// 생산계획 실적 조회
// 계획 실적조회
const selectWorkplan = async(searchList)=>{
  let param ={
    searchKeyword: ''
  }
  let {
    start_date,
    end_date,
    vendor_id,
    employee_id,
    manager_id,
    ...others
  } = searchList;

  for (let key of Object.keys(others)) {
    if (others[key]) {
      param.searchKeyword += ` AND LOWER(${key}) LIKE LOWER('%${others[key]}%')`;
    }
  }
  // 테이블 지정해서 검색조건 넣기
  if (employee_id){
    param.searchKeyword += ` AND LOWER(e.employee_name) LIKE LOWER('%${employee_id}%')`;
  }
  if (manager_id){
    param.searchKeyword += ` AND LOWER(m.employee_name) LIKE LOWER('%${manager_id}%')`;
  }
  if (vendor_id){
    param.searchKeyword += ` AND LOWER(v.vendor_name) LIKE LOWER('%${vendor_id}%')`;
  }

  if (start_date && end_date) {
    param.searchKeyword += ` AND t.reg_date BETWEEN '${start_date}' AND '${end_date}'`;
  }
    // let list = await mariaDB.query('selectWorkPlan');
    // return list;
 let list = await mariaDB.query('selectWorkPlan', param);
 return list;
};

// 상세계획 실적조회
const selectWorkPlanDetail = async(planId)=>{
  let list = await mariaDB.query('selectWorkPlanDetail', planId);
  return list;
 };

 // 공정 실적 조회
const selectProdProcessWork = async(searchList)=>{
  let param ={
    searchKeyword: ''
  }
  let {
    start_date,
    end_date,
    employee_id,
    prod_id,
    order_lot,
    ...others
  } = searchList;

  for (let key of Object.keys(others)) {
    if (others[key]) {
      param.searchKeyword += ` AND LOWER(${key}) LIKE LOWER('%${others[key]}%')`;
    }
  }
  // 테이블 지정해서 검색조건 넣기
  if (employee_id){
    param.searchKeyword += ` AND LOWER(e.employee_name) LIKE LOWER('%${employee_id}%')`;
  }
  if (prod_id){
    param.searchKeyword += ` AND LOWER(p.prod_name) LIKE LOWER('%${prod_id}%')`;
  }
  if (order_lot){
    param.searchKeyword += ` AND LOWER(o.prod_order_lot) LIKE LOWER('%${order_lot}%')`;
  }

  if (start_date && end_date) {
    param.searchKeyword += ` AND o.order_date BETWEEN '${start_date}' AND '${end_date}'`;
  }
  let list = await mariaDB.query('selectWorkProdProc', param);
  return list;
 };
module.exports = {
  selectWorkplan,
  selectWorkPlanDetail,
  selectProdProcessWork,
}