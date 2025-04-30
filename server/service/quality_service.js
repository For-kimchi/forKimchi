const mariaDB = require('../mapper/mapper');

const quaReqAll = async() => {
  let list = await mariaDB.query('selectQuality');
  return list;
};

const dropDown = async() => {
  let list = await mariaDB.query('mate_dropdown');
  return list;
};

const qualityDetail = async() => {
  let detailList = await mariaDB.query('quality_detail');
  return detailList; 
}

module.exports = {
  quaReqAll,
  dropDown,
  qualityDetail,
}