const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys');
const converts = require('../utils/converts')

const postDeliv = async (delivInfo) => {

  try {
    conn = await mariaDB.getConnection();
    await conn.beginTransaction();

    console.log(delivInfo);

    // 구조 분해 할당 (detail 분리)
    const {
      deliv_details,
      ...deliv
    } = delivInfo;

    // 최근 key 정보 조회
    let selectedSql = await mariaDB.selectedQuery('selectLastDeliv', {});
    let lastDeliv = await conn.query(selectedSql, {});
    let lastDelivId = lastDeliv[0].deliv_id;

    // deliv key 생성
    let newDelivId = keys.getNextKeyId(lastDelivId);
    deliv.deliv_id = newDelivId;

    // deliv column 정보 배열
    let delivColumn = ['deliv_id', 'deliv_date', 'vendor_id', 'employee_id'];
    let delivParam = converts.convertObjToAry(deliv, delivColumn);

    // deliv insert
    selectedSql = await mariaDB.selectedQuery('insertDeliv', delivParam);
    let result = await conn.query(selectedSql, delivParam);

    console.log(result);

    // deliv detail column 정보 배열
    let delivDetailColumn = ['deliv_detail_id', 'deliv_id', 'prod_id', 'deliv_amount', 'deliv_due_date'];

    // 최근 key 정보 조회
    selectedSql = await mariaDB.selectedQuery('selectLastDelivDetail', {});
    let lastdelivDetail = await conn.query(selectedSql, {});
    let lastdelivDetailId = lastdelivDetail[0].deliv_detail_id;

    for (let detail of deliv_details) {
      
      // deliv detail key 생성
      let newDelivDetailId = keys.getNextKeyId(lastdelivDetailId);
      detail.deliv_detail_id = newDelivDetailId;
      detail.deliv_id = newDelivId;

      // deliv detail insert
      let delivDetailParam = converts.convertObjToAry(detail, delivDetailColumn);

      let selectedSql = await mariaDB.selectedQuery('insertDelivDetail', delivDetailParam);
      result = await conn.query(selectedSql, delivDetailParam);

      console.log(result);

      // deliv detail insert 완료 시 최근 key 정보 갱신
      lastdelivDetailId = newDelivDetailId;
    }

    // 정상 완료 시 commit
    conn.commit();

    return result;
  } catch (err) {
    // error 발생 시 console 출력 및 rollback
    console.log(err);
    if (conn) conn.rollback();
  } finally {
    // connection 반환
    if (conn) conn.release();
  }
};

const getDelivTarget = async (params) => {

  let column = ['startDate', 'endDate'];

  let arrayParams = converts.convertObjToAry(params, column);

  let result = await mariaDB.query('selectDelivTarget', arrayParams);

  return result;
}

const getDelivProdTarget = async (params) => {

  let column = ['prod_id'];

  let arrayParams = converts.convertObjToAry(params, column);

  let result = await mariaDB.query('selectDelivProdTarget', arrayParams);

  return result;
}

const postDeilv = async (delivInfo) => {

  try {
    conn = await mariaDB.getConnection();
    await conn.beginTransaction();

    console.log(delivInfo);

    // 구조 분해 할당 (detail 분리)
    const {
      deliv_details,
      ...deliv
    } = delivInfo;

    // 최근 key 정보 조회
    let selectedSql = await mariaDB.selectedQuery('selectLastDeliv', {});
    let lastDeliv = await conn.query(selectedSql, {});
    let lastDelivId = lastDeliv[0].deliv_id;

    // deliv key 생성
    let newDelivId = keys.getNextKeyId(lastDelivId);
    deliv.deliv_id = newDelivId;

    // deliv column 정보 배열
    let delivColumn = ['deliv_id', 'order_detail_id', 'employee_id', 'memo'];
    let delivParam = converts.convertObjToAry(deliv, delivColumn);

    // deliv insert
    selectedSql = await mariaDB.selectedQuery('insertDeliv', delivParam);
    let result = await conn.query(selectedSql, delivParam);

    console.log(result);

    // deliv detail column 정보 배열
    let delivDetailColumn = ['deliv_detail_id', 'prod_lot', 'deliv_id', 'prod_id', 'deliv_amount', 'memo'];

    // // 최근 key 정보 조회
    selectedSql = await mariaDB.selectedQuery('selectLastDelivDetail', {});
    let lastDelivDetail = await conn.query(selectedSql, {});
    let lastDelivDetailId = lastDelivDetail[0].deliv_detail_id;

    for (let detail of deliv_details) {
      
      // deliv detail key 생성
      let newDelivDetailId = keys.getNextKeyId(lastDelivDetailId);
      detail.deliv_detail_id = newDelivDetailId;
      detail.deliv_id = newDelivId;

      // deliv detail insert
      let delivDetailParam = converts.convertObjToAry(detail, delivDetailColumn);

      let selectedSql = await mariaDB.selectedQuery('insertDelivDetail', delivDetailParam);
      result = await conn.query(selectedSql, delivDetailParam);

      console.log(result);

      // deliv detail insert 완료 시 최근 key 정보 갱신
      lastDelivDetailId = newDelivDetailId;
    }

    // 정상 완료 시 commit
    conn.commit();

    return result;
  } catch (err) {
    // error 발생 시 console 출력 및 rollback
    console.log(err);
    if (conn) conn.rollback();
  } finally {
    // connection 반환
    if (conn) conn.release();
  }
};

module.exports = {
  postDeliv,
  getDelivTarget,
  getDelivProdTarget,
  postDeilv,
}