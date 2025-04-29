const mariaDB = require('../mapper/mapper.js');
const { convertObjToQuery } = require('../utils/converts');

const mateReqAll = async(searchList) => {
  let searchKeyword = Object.keys(searchList).length > 0 ? convertObjToQuery(searchList) : '';
  let list = await mariaDB.query('selectMateReq', searchKeyword);
  return list;
};

const  mateReqById = async(mateNo) => {
  let list = await mariaDB.query('selectMateDetail', mateNo);
  return list;
};


module.exports = {
  mateReqAll,
  mateReqById,
}