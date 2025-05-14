const mariaDB = require('../mapper/mapper.js');
const { convertObjToQuery } = require('../utils/converts');
const keys = require('../utils/keys');
const converts = require('../utils/converts.js');
const { search } = require('../router/material_router.js');

// 입고관리 발주서전체조회(발주승인건만)
const storeMateList = async() => {
  let list = await mariaDB.query('selectStoreMateList');
  return list;
};

// 입고관리 발주상세조회
const mateById = async(mateNo) => {
  let list = await mariaDB.query('selectStoreMateDetail', mateNo);
  return list;
};

// 입고조회페이지 전체리스트
const storeAll = async (searchList) => {
  let param = {
    searchKeyword: ''
  }

  let {
    startDate,
    endDate,
    ...others
  } = searchList;
  
  for (let key of Object.keys(others)) {
    if (others[key]) {
      param.searchKeyword += ` AND LOWER(${key}) LIKE LOWER('%${others[key]}%')`;
    }
  }

  if (startDate && endDate) {
    param.searchKeyword += ` AND inbound_date BETWEEN '${startDate}' AND '${endDate}'`;
  }

    let list = await mariaDB.query('selectStoreList', param);
    return list;
}



// const storeAll = async (searchList) => {
//   let searchKeyword = Object.keys(searchList).length > 0 ? convertObjToQuery(searchList) : '';
//   let list = await mariaDB.query('selectStoreList', searchKeyword);
//   return list;
// };

// 입고조회페이지 입고상세조회(항목클릭시)
// const storeById = async (searchList) => {
//   let param = {
//     searchKeyword: ''
//   }

//   let {
//     vendor_id,
//     inbound_id
//   } = searchList;

//   for (let key of Object.keys(others)) {
//     if(others[key])
//   }
// }

// 입조조회페이지 상세조회
const storedtList = async(storeId) => {
  let list = await mariaDB.query('storeDetailList', storeId);
  return list;
};


// 창고입고조회 (검사완료건만 조회)
const storeWareAll = async() => {
  let list = await mariaDB.query('selectWareStatus');
  return list;
};

// 창고입고 상세조회
const storeById = async (storeId) => {
  let list = await mariaDB.query('selectDetailStore', storeId);
  return list;
};

// 창고조회
const wareAll = async() => {
  let list = await mariaDB.query('selectWarehouses');
  return list;
};

// LOT별 창고조회
const getGroupedByMaterial = async() => {
  let list = await mariaDB.query('groupBywareList');
  return list;
}

// 자재별 합계 창고조회
const getWarehouseList = async() => {
  let list = await mariaDB.query('warehouseLotList');
  return list;
}

// 창고저장
const insertWarehouse = async(wareList) => {
  
  let conn;
  try{
    let columnList = ['mate_lot', 'mate_id', 'inbound_detail_id', 'warehouse_id', 'mate_amount', 'employee_id'];
    
    conn = await mariaDB.getConnection();
    await conn.beginTransaction();

    
    let inbound_id = wareList[0].inbound_id;
    for (let item of wareList) {
      if(item.inbound_type == "입고") {
      // lot 생성 select seletMateLot
      selectedSql = await mariaDB.selectedQuery('seletMateLot');
      let lots = await conn.query(selectedSql);
      lots = lots[0].mate_lot;

      let newLot = keys.getNextKeyId(lots);
      item.mate_lot = newLot;
      
    item.mate_amount = item.inbound_amount;
      
    let values = converterAry(item, columnList);
    selectedSql = await mariaDB.selectedQuery('insertWarehouse', values);
    let result = await conn.query(selectedSql, values);

    selectedSql = await mariaDB.selectedQuery('updateInbound', {});
    let results = await conn.query(selectedSql, ['3p', item.inbound_detail_id ]);
      } else {
        selectedSql = await mariaDB.selectedQuery('updateInbound', {});
        let results = await conn.query(selectedSql, ['4p', item.inbound_detail_id] );
      }
  }
    
    await conn.commit();
  return result;
  //  에러 뜨면 rollback
  }catch(err){
      if(conn) conn.rollback();
  // 커넥션 초기화
  }finally{
      if(conn) conn.release();
  }
  // return { success: true };
};


const converterAry = (target, list) => {
  let ary = [];

  for(let field of list) {
    let val = target[field];
    ary.push(val);
  }
  return ary;
};

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

    selectedSql = await mariaDB.selectedQuery('updateStore', {});
    await conn.query(selectedSql, storeInfo.req_id);

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
  storeById,
  wareAll,
  insertWarehouse,
  storeWareAll,
  storeMateList,
  mateById,
  storeAll,
  getGroupedByMaterial,
  getWarehouseList,
  storedtList,
}