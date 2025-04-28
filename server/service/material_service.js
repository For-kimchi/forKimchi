const mariaDB = require('../mapper/mapper');

const mateReqAll = async() => {
  let list = await mariaDB.query('selectMateReq');
  return list;
};

module.exports = {
  mateReqAll,
}