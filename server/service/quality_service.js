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
    
    selectedSql = await mariaDB.selectedQuery('updateMate', {});
      result = await conn.query(selectedSql, mate.inbound_detail_id);
    

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
};

// 자재최종입고
const insertResult = async (body) => {
  let list = ['inbound_id'];
  let params = converts.convertObjToAry(body, list);
  console.log(params);
  let result = await mariaDB.query('insertResult', params);
  return result;
};

// 자재상세
const updateMateQuality = async(id) => {
  console.log(id);
  let mateColumn = ['option_id', 'quality_detail_id'];
  let params =  converts.convertObjToAry(id[0], mateColumn);
  console.log(params);
  let result = await mariaDB.query('updateMateQuality', params);
  return result;
};


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

//제품검사요청
const prodQualityReq = async() => {
  let list = await mariaDB.query('prodQualityReq');
  return list;
}

//제품검사요청 (대기)
const prodQualityWait = async(detailId) => {
  let list = await mariaDB.query('prodQualityWait', detailId);
  return list;
}

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

// ---------------------------------------------

// 검사항목조회
const selectOption = async (params) => {
  let count = Object.keys(params).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
      
    }

    keyword = converts.convertObjToQueryLike(params, selected);
  } else {
    keyword = {};
  }

  let list = await mariaDB.query("selectOption", keyword);
  return list;
};

// 검사항목 등록/수정
const insertOption = async (body) => {

  console.log(body);

  let result;
  if (body.option_id) {

    result = await mariaDB.query("updateOption", [body, body.option_id]);

  } else {

    let lastOpt = await mariaDB.query("selectLastOption", {});
    let lastOptionId = lastOpt[0].option_id;

    let newOptId = keys.getNextUniqueId(lastOptionId);

    body.option_id = newOptId;

    let optionColumn = ['option_id', 'option_name', 'option_standard', 'option_operator', 'option_method'];
    let optionParam = converts.convertObjToAry(body, optionColumn);

    result = await mariaDB.query("insertOption", optionParam);

  }

  return result;
};
// 검사항목 삭제
const deleteOption = async(id) => {
  let list = await mariaDB.query('deleteOption', id);
  return list;
};

// -------------------------------------------------------

// 검사기준조회
const selectOptionControl = async (params) => {
  let count = Object.keys(params).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
      
    }

    keyword = converts.convertObjToQueryLike(params, selected);
  } else {
    keyword = {};
  }

  let list = await mariaDB.query("selectOption", keyword);
  return list;
};

// 검사기준관리 (검사항목 등록)
  const insertOptionControl = async(params)=>{
    let columnlist = ['option_id', 'option_name', 'option_standard', 'option_method'];
    let addInfo = converts.convertObjToAry(params, columnlist);
    let result = await mariaDB.query('insertOption', addInfo);
    return result;
  };
// 검사기준 업데이트
const updateOptionControl = async(info, id) => {
  let updateOpt = [info.option_id, info.option_name, info.option_standard, info.option_method, id];
  let result = await mariaDB.query('updateOption', updateOpt);
  return result;
};
// 검사기준 삭제
const deleteOptionControl = async(id) => {
  let list = await mariaDB.query('deleteOption', id);
  return list;
};

// 검사기준관리
// 검사기준조회
const getStds = async(params) => {
  let target_id = params.target_id;

  let list = await mariaDB.query('selectStd', target_id);

  let std;

  if (list.length > 0) {
    std = list[0];

    if (std.std_id) {
      list = await mariaDB.query('selectStdDetail', std.std_id);
    }

    std.std_details = list;

  } else {

    std = {
      target_id: target_id,
      std_details: [],
    }
  }

  return list;
};

module.exports = {
  // 자재
  mateQualityReq,
  mateQualityInsert,
  mateQualityWait,
  mateQualityViewDropDown,
  mateQualityViewAll,
  mateQualityViewDetail,
  updateMateQuality,
  insertResult,
  // 제품
  prodQualityReq,
  prodQualityWait,
  prodQualityViewDropDown,
  prodQualityViewAll,
  prodQualityViewDetail,
  // 검사항목
  selectOption,
  insertOption,
  deleteOption,
  //검사기준
  selectOptionControl,
  insertOptionControl,
  updateOptionControl,
  deleteOptionControl
}