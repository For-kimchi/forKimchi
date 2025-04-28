const mariaDB = require('../mapper/mapper');
// 자바스크립트에서 기능은 전부 함수.
// 전체조회
const order_list = async()=>{
 let list = await mariaDB.query('selectorder');
 return list;
};

module.exports = {
    order_list,
}