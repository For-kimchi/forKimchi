const mariaDB = require('../mapper/mapper.js');
const { convertObjToQuery } = require('../utils/converts');
const keys = require('../utils/keys');
const converterAray = require('../utils/converts.js');

// 전체발주조회
const mateReqAll = async(searchList) => {
  let searchKeyword = Object.keys(searchList).length > 0 ? convertObjToQuery(searchList) : '';
  let list = await mariaDB.query('selectMateReq', searchKeyword);
  return list;
};

// 발주상세조회
const  mateReqById = async(mateNo) => {
  let list = await mariaDB.query('selectMateDetail', mateNo);
  return list;
};

// 회사검색(발주관리페이지)
const vendorId = async() => {
  let list = await mariaDB.query('insertVenId');
  return list;
};

// 자재검색 (발주관리페이지)
const mateList = async(mateName) => {
  let list = await mariaDB.query('searchMateList', mateName);
  return list;
};

// 발주저장버튼
const insertMates = async (mateSaveInfo) => {
  console.log(mateSaveInfo)
  let list = ['mate_id','mate_name'];
  // let result = await mariaDB.query('insertMate', addList);
  // let addList = converterAray.convertObjToAry(mateSaveInfo, list);
  let conn;
  try{
    conn = await mariaDB.getConnection();
    await conn.beginTransaction();
    selectedSql = await mariaDB.selectedQuery()
    // for(let mateSave of mateSaveInfo){
    //   // let mateParam ={mate_req_id: mateSave.req_id,
    //   //                 mate_vendor_id: mateSave.vendor_id,                                  
    //   //                 mate_employee_id: mateSave.employee_id};
    //   // let mateSaveInfos = [mateParam];
    //   // console.log('mateSave = ' + mateSave);
    //   //         let addList = converterAray.convertObjToAry(mateSave, list);
    //   //         console.log('addList = ' + addList);
    //   //         selectedSql = await mariaDB.selectedQuery('insertMates',addList);
    //   //         let result = await conn.query(selectedSql, addList);
    //           // let results = await mariaDB.query('insertMate', addList);
    //       };
  
          conn.commit();
  
          //  에러 뜨면 rollback
          }catch(err){
              if(conn) conn.rollback();
              console.log(err);
          // 커넥션 초기화
          }finally{
              if(conn) conn.release();
          }
};

module.exports = {
  mateReqAll,
  mateReqById,
  vendorId,
  mateList,
  insertMates,
}