const mariaDB = require('../mapper/mapper');
const {
  convertObjToQuery, convertObjToQueryLike
} = require('../utils/converts');

// 제품 조건 조회
const selectProd = async (params) => {
  let count = Object.keys(params).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
    }

    keyword = convertObjToQueryLike(params, selected);
  } else {
    keyword = '';
  }

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