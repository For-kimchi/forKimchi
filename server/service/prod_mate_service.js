const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys');
const converts = require('../utils/converts')

const getPmo = async () => {
  let list = await mariaDB.query("selectPmo");
  return list;
}

const getPmoOne = async (id) => {
  let list = await mariaDB.query("selectPmoOne", [id]);
  return list;
}

const putPmo = async (body) => {

  let res = {
    success: true,
  }

  console.log(body);
  let result = await mariaDB.query("updatePmo", ['3d', body.prod_order_lot]);

  if (result.affectedRows > 0) {
    return res;
  } 

  res.success = false;
  return res;
}

const getPmoOneAll = async () => {}


const postPmo = async (PmoInfo) => {

  let res = {
    success: true,
  }

  let conn;
  
  try {

    conn = await mariaDB.getConnection();
    await conn.beginTransaction();

    const {
      details,
      ...pmo
    } = PmoInfo;

    // let selectedSql = await mariaDB.selectedQuery('selectLastPmo', {});
    // let last = await conn.query(selectedSql, {});

    // let lastId = last[0].pmo_id;

    // let newId = keys.getNextKeyId(lastId);
    // pmo.pmo_id = newId;

    // let column = ['pmo_id', 'prod_order_lot', 'employee_id'];
    // let param = converts.convertObjToAry(pmo, column);

    // selectedSql = await mariaDB.selectedQuery('insertPmo', param);
    // let result = await conn.query(selectedSql, param);

    let column = ['prod_order_lot', 'mate_lot', 'mate_id', 'outbound_amount', 'employee_id'];

    // selectedSql = await mariaDB.selectedQuery('selectLastPmu', {});
    // last = await conn.query(selectedSql, {});

    // lastId = last[0].pmu_id;

    for (let detail of details) {

      let selectedSql = await mariaDB.selectedQuery('selectMateStock', {})
      let mateStock = await conn.query(selectedSql, detail.mate_id);

      let outbound_amount = detail.outbound_amount;

      for (let mate of mateStock) {

        let used_amount = 0;

        if (mate.mate_stock_amount == 0) continue;

        if (outbound_amount >= mate.mate_stock_amount) {
          used_amount = mate.mate_stock_amount;
        } else if (outbound_amount < mate.mate_stock_amount) {
          used_amount = outbound_amount;
        }

        // newId = keys.getNextKeyId(lastId);
        // detail.pmu_id = newId;
        detail.prod_order_lot = pmo.prod_order_lot;
        detail.employee_id = pmo.employee_id;
        detail.outbound_amount = used_amount;
        detail.mate_lot = mate.mate_lot;

        let param = converts.convertObjToAry(detail, column);

        selectedSql = await mariaDB.selectedQuery('insertPmu', param)
        let result = await conn.query(selectedSql, param);

        console.log(result);

        // lastId = newId;

        outbound_amount -= used_amount;

        if (outbound_amount == 0) break;
      }
    }

    selectedSql = await mariaDB.selectedQuery('updatePmo', {});
    let result = await conn.query(selectedSql, ['3d', pmo.prod_order_lot]);
    
    console.log(result);

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
  getPmo,
  getPmoOne,
  getPmoOneAll,
  putPmo,
  postPmo,
}