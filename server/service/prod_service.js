const mariaDB = require('../mapper/mapper');
// 자바스크립트에서 기능은 전부 함수.
// 전체조회
const order_list = async()=>{
 let list = await mariaDB.query('selectorder');
 return list;
};
// 생산계획조회
const prodlist = async()=>{
    let list = await mariaDB.query('selectprod');
    return list;
};
// 생산상세계획조회
const proddtlist = async(orderId)=>{
    let list = await mariaDB.query('selectproddetail', orderId);
    return list;
}

module.exports = {
    order_list,
    prodlist,
    proddtlist,
}