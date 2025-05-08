const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys.js');
const converts = require('../utils/converts.js');
// 자재검사요청 (요청)
const mateQualityReq = async () => {
  let list = await mariaDB.query('mateQualityReq');
  return list;
};

// 자재검사등록
const mateQualityInsert = async (mateInfo) => {

  try {
    conn = await mariaDB.getConnection();
    await conn.beginTransaction();

    console.log(mateInfo);

    // 구조 분해 할당 (detail 분리)
    const {
      details,
      ...mate
    } = mateInfo;

    // 최근 key 정보 조회
    let selectedSql = await mariaDB.selectedQuery('selectLastmateQuality', {});
    let lastMate = await conn.query(selectedSql, {});
    let lastMateId = lastMate[0].quality_id;

    // deliv key 생성
    let newMateId = keys.getNextKeyId(lastMateId);
    mate.quality_id = newMateId;

    // deliv column 정보 배열
    let mateColumn = ['quality_id', 'inbound_detail_id'];
    let mateParam = converts.convertObjToAry(mate, mateColumn);

    // deliv insert
    selectedSql = await mariaDB.selectedQuery('mateQualityInsert', mateParam);
    let result = await conn.query(selectedSql, mateParam);

    console.log(result);

    // deliv detail column 정보 배열
    let mateDetailColumn = ['quality_detail_id', 'quality_id', 'option_id', 'quality_result_value'];

    // // 최근 key 정보 조회
    selectedSql = await mariaDB.selectedQuery('selectLastmateQualityDetail', {});
    let lastmateDetail = await conn.query(selectedSql, {});
    let lastMateDetailId = lastmateDetail[0].quality_detail_id;

    for (let detail of details) {
      
      // deliv detail key 생성
      let newMateDetailId = keys.getNextKeyId(lastMateDetailId);
      detail.quality_detail_id = newMateDetailId;
      detail.quality_id = newMateId;

      // deliv detail insert
      let mateDetailParam = converts.convertObjToAry(detail, mateDetailColumn);

      selectedSql = await mariaDB.selectedQuery('mateWaitInsert', mateDetailParam);
      result = await conn.query(selectedSql, mateDetailParam);

      console.log(result);

      // deliv detail insert 완료 시 최근 key 정보 갱신
      lastMateDetailId = newMateDetailId;
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

//자재검사요청상세 (대기)
const mateQualityWait = async (waitId) => {
  let list = await mariaDB.query('mateQualityWait', waitId);
  return list;
}


// 자재검사조회 (드롭다운)
const mateQualityViewDropDown = async() => {
  let list = await mariaDB.query('mateQualityViewDropDown');
  return list;
};

// 자재검사조회
const mateQualityViewAll = async() => {
  let list = await mariaDB.query('mateQualityViewAll');
  return list;
};

// 자재검사조회 (상세)
const mateQualityViewDetail = async(detailId) => {
  let list = await mariaDB.query('mateQualityViewDetail', detailId);
  return list;
}

// -------------------------------------------------------------------

// 제품검사조회 (드롭다운)
const prodQualityViewDropDown = async() => {
  let list = await mariaDB.query('prodQualityViewDropDown');
  return list;
};

// 제품검사조회
const prodQualityViewAll = async() => {
  let list = await mariaDB.query('prodQualityViewAll');
  return list;
};

// 제품검사조회 (상세)
const prodQualityViewDetail = async(detailId) => {
  let list = await mariaDB.query('prodQualityViewDetail', detailId);
  return list;
}

module.exports = {
  // 자재
  mateQualityReq,
  mateQualityInsert,
  mateQualityWait,
  mateQualityViewDropDown,
  mateQualityViewAll,
  mateQualityViewDetail,
  // 제품
  prodQualityViewDropDown,
  prodQualityViewAll,
  prodQualityViewDetail,
}