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
const dropDown = async() => {
  let list = await mariaDB.query('qualityViewDropDown');
  return list;
};

// 자재검사조회
const qualityViewAll = async() => {
  let list = await mariaDB.query('qualityViewAll');
  return list;
};

// 자재검사조회 (상세)
const qualityViewDetail = async(detailId) => {
  let list = await mariaDB.query('qualityViewDetail', detailId);
  return list;
}

// const qualityDetail = async() => {
//   let list = await mariaDB.query('qualityViewdetail');
//   return list; 
// };

// const qualityControl = async() => {
//   let list = await mariaDB.query('qualityMatecontrol');
//   return list;
// };

// const qualityMatedetail = async() => {
//   let list = await mariaDB.query('qualityMatedetail', orderId);
//   return list;
// }



module.exports = {
  mateQualityReq,
  mateQualityWait,
  dropDown,
  qualityViewAll,
  qualityViewDetail,

}