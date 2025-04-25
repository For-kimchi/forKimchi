const mariaDB = require('../mapper/mapper');
// 자바스크립트에서 기능은 전부 함수.
// 전체조회
const findAll = async()=>{
 let list = await mariaDB.query('selectAllEquip');
 return list;
};

module.exports = {
  findAll,
}