const mariaDB = require('../mapper/mapper');

// 자재검사요청 (요청)
const mateQualityReq = async () => {
  let list = await mariaDB.query('mateQualityReq');
  return list;
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
  mateQualityWait,
  mateQualityViewDropDown,
  mateQualityViewAll,
  mateQualityViewDetail,
  // 제품
  prodQualityViewDropDown,
  prodQualityViewAll,
  prodQualityViewDetail,
}