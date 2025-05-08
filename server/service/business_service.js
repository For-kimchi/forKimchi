const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys');
const converts = require('../utils/converts')

const postOrder = async (orderInfo) => {

  let res = {
    success: true,
  }

  try {
    conn = await mariaDB.getConnection();
    await conn.beginTransaction();

    console.log(orderInfo);

    // 구조 분해 할당 (detail 분리)
    const {
      order_details,
      ...order
    } = orderInfo;

    // 최근 key 정보 조회
    let selectedSql = await mariaDB.selectedQuery('selectLastOrder', {});
    let last = await conn.query(selectedSql, {});
    let lastId = last[0].order_id;

    // deliv key 생성
    let newId = keys.getNextKeyId(lastId);
    order.order_id = newId;

    let column = ['order_id', 'order_date', 'vendor_id', 'employee_id', 'memo'];
    let param = converts.convertObjToAry(order, column);

    selectedSql = await mariaDB.selectedQuery('insertOrder', param);
    let result = await conn.query(selectedSql, param);

    console.log(result);

    column = ['order_detail_id', 'order_id', 'prod_id', 'order_amount', 'deliv_due_date'];

    selectedSql = await mariaDB.selectedQuery('selectLastOrderDetail', {});
    last = await conn.query(selectedSql, {});
    lastId = last[0].order_detail_id;

    for (let detail of order_details) {
      
      let newId = keys.getNextKeyId(lastId);
      detail.order_detail_id = newId;
      detail.order_id = order.order_id;

      param = converts.convertObjToAry(detail, column);

      selectedSql = await mariaDB.selectedQuery('insertOrderDetail', param);
      result = await conn.query(selectedSql, param);

      console.log(result);

      lastId = newId;
    }

    // 정상 완료 시 commit
    conn.commit();

    return res;
  } catch (err) {
    // error 발생 시 console 출력 및 rollback
    console.log(err);
    if (conn) conn.rollback();

    res.success = false;
    return res;
  } finally {
    // connection 반환
    if (conn) conn.release();
  }
};

const getOrder = async(params) => {

  const {
    startDate,
    endDate,
    ...others
  } = params;

  let count = Object.keys(others).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
    }

    keyword = converts.convertObjToQueryLike(others, selected);
  } else {
    keyword = {
      searchKeyword: '',
    };
  }

  keyword.searchKeyword = ` AND order_date BETWEEN '${startDate}' AND '${endDate}'` 
  + keyword.searchKeyword;
  
  let list = await mariaDB.query("selectOrder", keyword);
  return list;
}

const getOrderDetail = async(id) => {
  let list = await mariaDB.query("selectOrderDetail", id);
  return list;
}

const postOrderConfirm = async (orderInfo) => {

  let res = {
    success: true,
  }

  try {
    conn = await mariaDB.getConnection();
    await conn.beginTransaction();

    console.log(orderInfo);

    for (let order of orderInfo) {
  
      let selectedSql = await mariaDB.selectedQuery('updateOrderStatus', {});
      let result = await conn.query(selectedSql, ['2a', order.order_id]);

      selectedSql = await mariaDB.selectedQuery('selectOrderDetail', {});
      result = await conn.query(selectedSql, order.order_id);

      let orderDetail = result;

      for (let detail of orderDetail) {

        let selectedSql = await mariaDB.selectedQuery('updateOrderDetailStatus', {});
        result = await conn.query(selectedSql, ['2z', detail.order_detail_id]);

      }

    }

    conn.commit();

    return res;
  } catch (err) {
    console.log(err);
    if (conn) conn.rollback();

    res.success = false
    return res;
  } finally {
    if (conn) conn.release();
  }
};

const getDelivTarget = async (params) => {

  let column = ['startDate', 'endDate'];

  let arrayParams = converts.convertObjToAry(params, column);

  console.log(arrayParams);

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

      selectedSql = await mariaDB.selectedQuery('insertDelivDetail', delivDetailParam);
      result = await conn.query(selectedSql, delivDetailParam);

      console.log(result);

      // LOT 사용 처리
      if (detail.prod_amount == detail.deliv_amount) {
          selectedSql = await mariaDB.selectedQuery('updatePlotStatus', {});
          result = await conn.query(selectedSql, ['3aa', detail.prod_lot]);
      }

      // deliv detail insert 완료 시 최근 key 정보 갱신
      lastDelivDetailId = newDelivDetailId;
    }

    // 납품 완료 확인
    if (deliv.remain == 0) {
      selectedSql = await mariaDB.selectedQuery('updateOrderDetailStatus', {});
      result = await conn.query(selectedSql, ['4z', deliv.order_detail_id]);
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

const getDeliv = async(params) => {

  const {
    startDate,
    endDate,
    ...others
  } = params;

  let count = Object.keys(others).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
    }

    keyword = converts.convertObjToQueryLike(others, selected);
  } else {
    keyword = {
      searchKeyword: '',
    };
  }

  keyword.searchKeyword = ` AND deliv_date BETWEEN '${startDate}' AND '${endDate}'` 
  + keyword.searchKeyword;
  
  let list = await mariaDB.query("selectDeliv", keyword);
  return list;
}

const getDelivDetail = async(id) => {
  let list = await mariaDB.query("selectDelivDetail", id);
  return list;
}

module.exports = {
  postOrder,
  getOrder,
  getOrderDetail,
  postOrderConfirm,
  getDelivTarget,
  getDelivProdTarget,
  postDeilv,
  getDeliv,
  getDelivDetail,
}