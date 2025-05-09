// 각 테이블 별로 실행한 SQL문을 별도 파일로 작성
const material = require('./material/material.js');
const store = require('./material/store.js');

// 기준관리
const bom = require('./basic/bom.js');
const employee = require('./basic/employee.js');
const etc = require('./basic/etc.js');
const mate = require('./basic/mate.js');
const proc = require('./basic/proc.js');
const product = require('./basic/prod.js');
const vendor = require('./basic/vendor.js');
// 영업
const order = require('./business/order.js');
const deliv = require('./business/deliv.js');
// 생산
const plan = require('./production/prodPlan.js');
const prodOrder = require('./production/prodOrder.js');
const prodMate = require('./production/prodMate.js')
// 검사
const quality = require('./quality/quality.js');
module.exports = {
    // 펼침연산자(spread operator, ...)을 활용해 객체의 필드를 다른 객체로 쉽게 복사

    
    ...material,
    ...store,

    //기준관리
    ...bom,
    ...employee,
    ...etc,
    ...mate,
    ...proc,
    ...product,
    ...vendor,
    //영업
    ...order,
    ...deliv,
    // 생산
    ...plan,
    ...prodOrder,
    ...prodMate,
    //검사
    ...quality,
}