const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys');
const converts = require('../utils/converts')

const postOrder = async (orderInfo) => {

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
    let lastOrder = await conn.query(selectedSql, {});
    let lastOrderId = lastOrder[0].order_id;

    // order key 생성
    let newOrderId = keys.getNextKeyId(lastOrderId);
    order.order_id = newOrderId;

    // order column 정보 배열
    let orderColumn = ['order_id', 'order_date', 'vendor_id', 'employee_id'];
    let orderParam = converts.convertObjToAry(order, orderColumn);

    // order insert
    selectedSql = await mariaDB.selectedQuery('insertOrder', orderParam);
    let result = await conn.query(selectedSql, orderParam);

    console.log(result);

    // order detail column 정보 배열
    let orderDetailColumn = ['order_detail_id', 'order_id', 'prod_id', 'order_amount', 'deliv_due_date'];

    // 최근 key 정보 조회
    selectedSql = await mariaDB.selectedQuery('selectLastOrderDetail', {});
    let lastOrderDetail = await conn.query(selectedSql, {});
    let lastOrderDetailId = lastOrderDetail[0].order_detail_id;

    for (let detail of order_details) {
      
      // order detail key 생성
      let newOrderDetailId = keys.getNextKeyId(lastOrderDetailId, 'OD');
      detail.order_detail_id = newOrderDetailId;
      detail.order_id = newOrderId;

      // order detail insert
      let orderDetailParam = converts.convertObjToAry(detail, orderDetailColumn);

      let selectedSql = await mariaDB.selectedQuery('insertOrderDetail', orderDetailParam);
      result = await conn.query(selectedSql, orderDetailParam);

      console.log(result);

      // order detail insert 완료 시 최근 key 정보 갱신
      lastOrderDetailId = newOrderDetailId;
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

module.exports = {
  postOrder,
  getDelivTarget,
  getDelivProdTarget,
}