const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys');
const converts = require('../utils/converts')

const postPmo = async (PmoInfo) => {
  console.log(PmoInfo);

  let res = {
    success: true,
  }

  try {
    conn = await mariaDB.getConnection();
    await conn.beginTransaction();

    const {
      details,
      ...pmo
    } = PmoInfo;

    let selectedSql = await mariaDB.selectedQuery('selectLastPmo', {});
    let last = await conn.query(selectedSql, {});

    console.log(last);

    let lastId = last[0].pmo_id;

    let newId = keys.getNextKeyId(lastId);
    pmo.pmo_id = newId;

    let column = ['pmo_id', 'prod_order_lot', 'employee_id'];
    let param = converts.convertObjToAry(pmo, column);

    selectedSql = await mariaDB.selectedQuery('insertPmo', param);
    let result = await conn.query(selectedSql, param);

    console.log(result);

    column = ['pmh_id', 'pmo_id', 'mate_lot', 'mate_id', 'hold_amount'];

    selectedSql = await mariaDB.selectedQuery('selectLastPmh', {});
    last = await conn.query(selectedSql, {});
    
    console.log(last);

    lastId = last[0].pmh_id;

    for (let detail of details) {

      selectedSql = await mariaDB.selectedQuery('selectMateStock', {})
      let mateStock = await conn.query(selectedSql, detail.mate_id);

      let inbound_amount = detail.inbound_amount;
      
      console.log(inbound_amount);

      for (let mate of mateStock) {

        let hold_amount = 0;

        if (inbound_amount >= mate.mate_stock_amount) {
          hold_amount = mate.mate_stock_amount;
        } else if (inbound_amount < mate.mate_stock_amount ) {
          hold_amount = inbound_amount;
        }

        newId = keys.getNextKeyId(lastId);
        detail.pmh_id = newId;
        detail.pmo_id = pmo.pmo_id;
        detail.hold_amount = hold_amount;
        detail.mate_lot = mate.mate_lot;

        let param = converts.convertObjToAry(detail, column);

        selectedSql = await mariaDB.selectedQuery('insertPmh', param)
        let result = await conn.query(selectedSql, param);

        console.log(result);

        lastId = newId;

        inbound_amount -= hold_amount;

        if (inbound_amount == 0) break;
      }
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
}

module.exports = {
  postPmo,
}