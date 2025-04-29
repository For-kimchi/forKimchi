// 각 테이블 별로 실행한 SQL문을 별도 파일로 작성
const books = require('./sqls/customers.js');
const prod = require('./prod/prod.js');
const material = require('./material/material.js');
const store = require('./material/store.js');

// 기준관리
const basics = require('./basic/basic.js');
// 영업
const business = require('./business/business.js');

module.exports = {
    // 펼침연산자(spread operator, ...)을 활용해 객체의 필드를 다른 객체로 쉽게 복사
    //...books,
    ...basics,
    ...business,
    ...material,
    ...store,
    ...prod,
}