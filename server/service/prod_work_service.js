const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');
const keys = require('../utils/keys');

// 생산계획 실적 조회
// 계획 실적조회
const selectWorkplan = async(searchList)=>{
  console.log(searchList);
  let param ={
    searchKeyword: ''
  }
  console.log(param);
  let {
    start_date,
    end_date,
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
    param.searchKeyword += ` AND LOWER(t.employee_id) LIKE LOWER('%${employee_id}%')`;
  }

  if (start_date && end_date) {
    param.searchKeyword += ` AND reg_date BETWEEN '${start_date}' AND '${end_date}'`;
  }

  console.log(param);


 let list = await mariaDB.query('selectWorkPlan', param);
 return list;
};

// 상세계획 실적조회
const selectWorkPlanDetail = async(planId)=>{
  let list = await mariaDB.query('selectWorkPlanDetail', planId);
  return list;
 };

module.exports = {
  selectWorkplan,
  selectWorkPlanDetail,
}