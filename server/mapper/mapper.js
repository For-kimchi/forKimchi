const mariaDB = require('mariadb/callback');
const sqlList = require('./sqlList.js');
const { queryFormat  } = require('../utils/converts.js');
// DB연결은 가급적 항상 connectionPool을 사용하는걸 추천.
// 사용하지않으면 불안정하게 연결이 됨.
const connectionPool = mariaDB.createPool({
  // 필수
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_LIMIT,
  // 선택
  // 객체를 파라미터에 맞게 수정해줌.wew
  permitSetMultiParamEntries: true,
  // InsertId가 넘어올때 Number타입으로 바꿔달라는 애기.
  insertIdAsNumber: true,
  // bigint는 처리하기가 까다로워서 이것을 number타입으로 바꿔달라는 것
  bigIntAsNumber: true,
  // logger은 결과를 로그찍어줌.
  logger : {
    query : (msg) => console.log(msg),
    error : (err) => console.log(err),
  }
});

// let testSql = `SELECT * FROM customers`;
// 에러가 첫번쨰 매개변수, 결과를 두번쨰 매개변수로
const query = (alias, values) => {
  return new Promise((resolve, reject) => {
    let executeSql = queryFormat(sqlList[alias], values);
    // 등록된 쿼리문을 볼려고 콘솔로그 찍음.
    // console.log(`sql : ${executeSql}`);

    // 이 값은 ajax방식이기 떄문에 프로미스안에 넣음.
    // 첫번쨰 매개변수가 쿼리, 두번쨰매개변수가 ?에 들어가는 값.
    connectionPool.query(executeSql, values, (err, result) => {
      if (err) {
        reject({
          err
        });
      } else {
        resolve(result);
      }
    })
  })
  // 프로미스 안에서 에러가 나면 이걸 .catch로 보내서 에러처리함.
  .catch(err => {
    console.log(err);
    return err;
  })
};

module.exports = {
  query,
}