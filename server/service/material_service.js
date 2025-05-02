const mariaDB = require('../mapper/mapper.js');
const { convertObjToQuery } = require('../utils/converts');


// 전체발주조회
const mateReqAll = async(searchList) => {
  let searchKeyword = Object.keys(searchList).length > 0 ? convertObjToQuery(searchList) : '';
  let list = await mariaDB.query('selectMateReq', searchKeyword);
  return list;
};

// 발주상세조회
const  mateReqById = async(mateNo) => {
  let list = await mariaDB.query('selectMateDetail', mateNo);
  return list;
};

// 회사검색(발주관리페이지)
const vendorId = async() => {
  let list = await mariaDB.query('insertVenId');
  return list;
};

// 자재검색 (발주관리페이지)
const mateList = async(mateId) => {
  let list = await mariaDB.query('searchMateList', mateId);
  return list;
};

module.exports = {
  mateReqAll,
  mateReqById,
  vendorId,
  mateList,
}