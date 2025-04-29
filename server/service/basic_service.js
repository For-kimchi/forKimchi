const mariaDB = require('../mapper/mapper');
const {
  convertObjToQuery,
} = require('../utils/converts');

// 제품 조건 조회
const selectProd = async (params) => {
  let keyword = Object.keys(params).length > 0 ? convertObjToQuery(params) : '';
  let list = await mariaDB.query("selectProd", keyword);
  return list;
};



// 코드 조회
const selectCode = async (mainCode) => {
  let list = await mariaDB.query("selectCode", mainCode);
  return list;
}

module.exports = {
  selectProd,
  selectCode,
}