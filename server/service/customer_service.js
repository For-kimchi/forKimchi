// service/customer_service.js
// import
// exprots로 던지면 require로 받으면됨.
// mapper 등록
const mariaDB = require('../mapper/mapper');
// 자바스크립트에서 기능은 전부 함수.
// 전체조회
const findAll = async()=>{
 let list = await mariaDB.query('selectAll');
 return list;
};
// 단건조회
// 두번쨰 매개변수로 ById값이 들어와야함. custId값이 where=? 여기에 들어갈 값.
// 값은 배열로 들어와서 배열을 벗겨줘야함. 
const findById = async(custId)=>{
  let info = (await mariaDB.query('selectById', custId))[0];
  return info;
};
// insert문은 배열로 값을 넘겨줌

// 등록
const addCustomer = async(custInfo)=>{ // 객체
  let columnliist = ['name', 'email', 'phone', 'address'];
  let addInfo = converterAray(custInfo, columnliist);
  let result = await mariaDB.query('insertInfo', addInfo);
  return result;
};
// 객체를 배열로 바꾸는 방법
const converterAray = (target, list)=> {
  // target = {no : 1, name : 'hong', email: 'h@goog'};
  let aray = [];
  for(let field of list) { 
    let val = target[field]; // 개체값을 가져옴
    aray.push(val);
  }
  return aray;
};

// 수정
const modifyCustomerInfo = async(custInfo, custId)=>{
  let updateInfo = [custInfo, custId];
  let result = await mariaDB.query('updateInfo',updateInfo);
  return result;
};
// 삭제
const removeCustomerInfo = async(custId)=>{
  let result = await mariaDB.query('deleteInfo', custId);
  return result;
};

module.exports = {
  findAll,
  findById,
  addCustomer,
  modifyCustomerInfo,
  removeCustomerInfo,
}