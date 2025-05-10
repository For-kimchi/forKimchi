const mariaDB = require('../mapper/mapper.js');
const { convertObjToQuery } = require('../utils/converts');
const keys = require('../utils/keys');
const converts = require('../utils/converts.js');

// 입고조회
const storeAll = async (searchList) => {
  let searchKeyword = Object.keys(searchList).length > 0 ? convertObjToQuery(searchList) : '';
  let list = await mariaDB.query('selectStore', searchKeyword);
  return list;
};

// 입고상세조회
const storeById = async (storeId) => {
  let list = await mariaDB.query('selectDetailStore', storeId);
  return list;
};

// 창고조회
const wareAll = async() => {
  let list = await mariaDB.query('selectWarehouses');
  return list;
};

// 창고저장
// const insertWarehouse = async() => {
//   let list = await mariaDB.query('selectWarehouse')
// }


// 입고 저장
const insertStore = async(storeSaveInfo) => {
  let conn;

  try{
    conn = await mariaDB.getConnection();
        await conn.beginTransaction();

    // detail 분리
    const { store_detail_list, ...storeInfo} = storeSaveInfo;

    let selectedSql = await mariaDB.selectedQuery('storePlanKey', {});
    let lastStore = await conn.query(selectedSql, {});
    let lastStroreId = lastStore[0].inbound_id;

    // 부모 key 생성
    let newStoreId = keys.getNextKeyId(lastStroreId);
    storeInfo.inbound_id = newStoreId;

    for(let data of store_detail_list) {
      storeInfo.req_id = data.req_id;
    }

    // 부모테이블 column 정보 배열
    let storeCloumn = ['inbound_id', 'req_id', 'employee_id', 'vendor_id']
    let storeAdd = converts.convertObjToAry(storeInfo, storeCloumn);

    // 부모테이블 INSERT
    selectedSql = await mariaDB.selectedQuery('insertStoreMain', storeAdd);
    let result = await conn.query(selectedSql, storeAdd);

    // 마지막 inbound_detail_id 조회
    selectedSql = await mariaDB.selectedQuery('storeDetailKey', {});
    let lastStoreDetail = await conn.query(selectedSql, {});
    let lastStoreDetailId = lastStoreDetail[0].inbound_detail_id;
    console.log(lastStoreDetailId);

    for(let StoreDetailInfo of store_detail_list) {
      // order key 생성
      let newStoreDetailId = keys.getNextKeyId(lastStoreDetailId);
      StoreDetailInfo.inbound_detail_id = newStoreDetailId;

      // 상위에서 등록한 newStoreId 사용
      StoreDetailInfo.inbound_id = newStoreId;

      let storeDetailCloumn = ['inbound_detail_id', 'inbound_id', 'mate_id', 'inbound_amount', 'memo'];
      let addInfo = converts.convertObjToAry(StoreDetailInfo, storeDetailCloumn);

      // 자식테이블 INSERT
      selectedSql = await mariaDB.selectedQuery('insertStoreDetail', addInfo);
      await conn.query(selectedSql, addInfo);

      // 다음 detail_id 생성을 위해 저장
      lastStoreDetailId = newStoreDetailId;
    }

    await conn.commit();

    return result;

    }catch(err){
      if(conn) conn.rollback();
      console.log('자재발주상세 등록 오류:', err);
          // 커넥션 초기화
    }finally{
        if(conn) conn.release();
    }
};


module.exports = {
  insertStore,
  storeAll,
  storeById,
  wareAll,
  
}