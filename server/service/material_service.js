const mariaDB = require('../mapper/mapper.js');
const { convertObjToQuery } = require('../utils/converts');
const keys = require('../utils/keys');
const converts = require('../utils/converts.js');

// 전체발주조회
const mateReqAll = async(searchList) => {
  let searchKeyword = Object.keys(searchList).length > 0 ? convertObjToQuery(searchList) : '';
  let list = await mariaDB.query('selectStore', searchKeyword);
  return list;
};

// 입고관리 발주서전체조회(발주승인건만)
const storeMateAll = async() => {
  let list = await mariaDB.query('selectMateStore');
  return list;
};

// 발주상세조회
const mateReqById = async(mateNo) => {
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
  let list = ['mate_id','mate_name'];
  // let result = await mariaDB.query('insertMate', addList);
  // let addList = converterAray.convertObjToAry(mateSaveInfo, list);
  let conn;
  
  try{
    conn = await mariaDB.getConnection();
          await conn.beginTransaction();

    // detail 분리
    const {mate_detail_list, ...mateInfos} = mateSaveInfo;

    let selectedSql = await mariaDB.selectedQuery('matePlanKey', {});
    let lastMate = await conn.query(selectedSql, {});
    let lastMateId = lastMate[0].req_id;

    // 부모 key 생성
    let newMateId = keys.getNextKeyId(lastMateId);
    mateInfos.req_id = newMateId;

    // 부모테이블 column 정보 배열
    let mateCloumn = ['req_id', 'vendor_id', 'employee_id', 'req_due_date'];
    let mateAdd = converts.convertObjToAry(mateInfos, mateCloumn);

    // 부모테이블 insert

    selectedSql = await mariaDB.selectedQuery('insertMainMate', mateAdd);
    let result = await conn.query(selectedSql, mateAdd);



    // 마지막 req_detail_id 조회
    selectedSql = await mariaDB.selectedQuery('mateDetailKey', {});
    let lastMateDetail = await conn.query(selectedSql, {});
    let lastMateDetailId = lastMateDetail[0].req_detail_id;
    console.log(lastMateDetailId);
    
    for(let MateDetailInfo of mate_detail_list) {
      // order key 생성
      let newMateDetailId = keys.getNextKeyId(lastMateDetailId);
      MateDetailInfo.req_detail_id = newMateDetailId;
      // 상위에서 등록한 newMateId 사용
      MateDetailInfo.req_id = newMateId;
      
      // mate_name을 mate_id로 변경  할필요없어서 주석
      // mateChangeId
      // let mate_name = MateDetailInfo.mate_id;
      // console.log("===========================");
      // console.log(mate_name);
      // selectedSql = await mariaDB.selectedQuery('mateChangeId', mate_name);
      // let mate_id = await conn.query(selectedSql, mate_name);
      // console.log("===========================");
      // console.log(mate_id);
      // MateDetailInfo.mate_id = mate_id
      // 등록할 컬럼 정의(mateDetail 등록)

      let mateDetailCloumn = ['req_detail_id', 'req_id', 'mate_id', 'req_amount', 'memo'];
      let addInfo = converts.convertObjToAry(MateDetailInfo, mateDetailCloumn);
      
      // detail insert 쿼리 실행
      selectedSql = await mariaDB.selectedQuery('insertMatese', addInfo);
      await conn.query(selectedSql, addInfo);
      // insertMatese
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

          return result;
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
  storeMateAll,
}