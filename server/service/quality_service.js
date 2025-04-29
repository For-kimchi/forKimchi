const mariaDB = require('../mapper/mapper');

const quaReqAll = async() => {
  let list = await mariaDB.query('selectQuality');
  return list;
};

const dropDownAll = async() => {
  let list = await mariaDB.query('mate_dropdown');
  return list;
};

module.exports = {
  quaReqAll,
  dropDownAll,
}