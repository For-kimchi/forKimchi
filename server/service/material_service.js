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

    // detail 분리
    // const {mate_detail_list, ...mateInfosssss} = mateSaveInfo;

    // 마지막 req_detail_id 조회
    selectedSql = await mariaDB.selectedQuery('mateDetailKey', {});
    let lastMateDetail = await conn.query(selectedSql, {});
    let lastMateDetailId = lastMateDetail[0].req_detail_id;

    for(let MateDetailInfo of mate_detail_list) {
      // order key 생성
      let newMateDetailId = keys.getNextKeyId(lastMateDetailId);
      MateDetailInfo.req_detail_id = newMateDetailId;
      // 상위에서 등록한 newMateId 사용
      MateDetailInfo.req_id = newMateId;
      
      // mate_id 조회: mate_name 기반
      let mateName = MateDetailInfo.mateName;
      selectedSql = await mariaDB.selectedQuery('mateCode', mateName);
      let mateResult = await conn.query(selectedSql, mateName);
      
      if (!mateResult[0]) {
        throw new Error(`등록되지 않은 자재명: ${mateName}`);
      }
      MateDetailInfo.mate_id = mateId[0].mate_id;

      // 등록할 컬럼 정의(mateDetail 등록)
      let mateDetailCloumn = ['req_detail_id', 'req_id', 'mate_id', 'req_amount', 'memo'];
      let addInfo = converts.convertObjToQuery(MateDetailInfo, mateDetailCloumn);
      
      // insert 쿼리 실행
      selectedSql = await mariaDB.selectedQuery('insertMateDetail', addInfo);
      await conn.query(selectedSql, addInfo);

      // 다음 detail_id 생성을 위해 저장
      lastMateDetailId = newMateDetailId;
    }

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
  
          await conn.commit();
  
          //  에러 뜨면 rollback
          }catch(err){
              if(conn) conn.rollback();
              console.log('자재발주상세 등록 오류:', err);
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