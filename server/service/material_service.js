const mariaDB = require('../mapper/mapper.js');
const {
    convertObjToQuery,
    convertObjToAry
} = require('../utils/converts');
const keys = require('../utils/keys');
const converts = require('../utils/converts.js');

// 전체발주조회
const mateReqAll = async (searchList) => {
    console.log(searchList);
    // let searchKeyword = Object.keys(searchList).length > 0 ? convertObjToQuery(searchList) : '';

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
        param.searchKeyword += ` AND req_date BETWEEN '${startDate}' AND '${endDate}'`;
    }

    console.log(param)

    // :searchKeyword => AND a = b AND c = d
    let list = await mariaDB.query('selectMateReq', param);
    return list;
};

// 자재발주페이지에서 검색결과에 따른 발주조회
const searchOrder = async (company, startDate, endDate, orderStatus, supplier) => {
    const conn = await db.getConnection();
    try {
        const params = [
            company, `%${company}%`,
            startDate, startDate, endDate,
            orderStatus, orderStatus,
            supplier, `%${supplier}%`
        ];

        const [rows] = await conn.query(selectMateReqWithSearch, params);
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error("검색 중 오류");
    } finally {
        conn.release();
    }
};

// 발주조회페이지 승인버튼
const mateConfirm = async (mateInfo) => {

    let res = {
        success: true,
    }

    try {
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();

        let {
            mates,
            employee_id
        } = mateInfo;

        let selectedSql = await mariaDB.selectedQuery('updateMateStatus', {});

        for (let mate of mates) {
            let result = await conn.query(selectedSql, ['2o', employee_id, mate.req_id]);
        }
        conn.commit();
        return res;

    } catch (err) {
        console.log(err);
        if (conn) conn.rollback();
        res.success = false;
        return res;

    } finally {
        if (conn) conn.release();
    }

}

// 입고관리 발주서전체조회(발주승인건만)
// const storeMateAll = async() => {
//   let list = await mariaDB.query('selectMateStore');
//   return list;
// };

// 발주상세조회
const mateReqById = async (mateNo) => {
    let list = await mariaDB.query('selectMateDetail', mateNo);
    return list;
};

// 회사검색(발주관리페이지)
const vendorId = async () => {
    let list = await mariaDB.query('insertVenId');
    return list;
};

// 자재검색 (발주관리페이지)
const mateList = async (mateName) => {
    let list = await mariaDB.query('searchMateList', mateName);
    return list;
};

// 자재발주관리페이지 발주서리스트 조회
const mateAll = async () => {
    let list = await mariaDB.query('mateListAll')
    return list;
};

// 자재발주페이지 발주상세조회
const selectMateInfo = async (reqId) => {
    let list = await mariaDB.query('selectMateDetail', reqId);
    return list;
};

// 자재발주관리페이지 발주서 삭제버튼
const deleteMaterial = async (reqId) => {
    let result = await mariaDB.query('deleteMateBtn', reqId);
    return result;
};

// 생산지시에 따른 BOM 조회
const mateBom = async (id) => {
    let list = await mariaDB.query('mateBom', id);
    return list;
};


// 생산지시조회
const mateOrder = async () => {
    let list = await mariaDB.query('mateOrderList');
    return list;
}

// 생산지시조회에서 발주등록버튼
const mateBomSave = async(prodId) => {
    let result = await mariaDB.query('mateBomId',prodId);
    return result;
}

// 생산지시조회에서 발주버튼 클릭시 값 자동입력(자재)
const mateBomAdd = async(prodId) => {
    let result = await mariaDB.query('mateBomAdd', prodId);
    console.log('쿼리 결과:', result);
    return result;
}


// 생산지시조회에서 발주등록버튼 클릭시 값 자동입력
// const mateSave = async() => {
//     let result = await mariaDB.query('mateBomSaves');
//     await result;
// }

// 발주저장버튼
const insertMates = async (mateSaveInfo) => {
    let list = ['mate_id', 'mate_name'];
    // let result = await mariaDB.query('insertMate', addList);
    // let addList = converterAray.convertObjToAry(mateSaveInfo, list);
    let conn;

    try {
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();

        // detail 분리
        const {
            mate_detail_list,
            ...mateInfos
        } = mateSaveInfo;

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

        for (let MateDetailInfo of mate_detail_list) {
            // order key 생성
            let newMateDetailId = keys.getNextKeyId(lastMateDetailId);
            MateDetailInfo.req_detail_id = newMateDetailId;
            // 상위에서 등록한 newMateId 사용
            MateDetailInfo.req_id = newMateId;


            let mateDetailCloumn = ['req_detail_id', 'req_id', 'mate_id', 'req_amount', 'memo'];
            let addInfo = converts.convertObjToAry(MateDetailInfo, mateDetailCloumn);

            // detail insert 쿼리 실행
            selectedSql = await mariaDB.selectedQuery('insertMatese', addInfo);
            await conn.query(selectedSql, addInfo);
            // insertMatese
            // 다음 detail_id 생성을 위해 저장
            lastMateDetailId = newMateDetailId;
        }
        await conn.commit();

        return result;
        //  에러 뜨면 rollback
    } catch (err) {
        if (conn) conn.rollback();
        console.log('자재발주상세 등록 오류:', err);
        // 커넥션 초기화
    } finally {
        if (conn) conn.release();
    }
};

// 발주관리페이지에서 발주서 클릭시 값 넘기기
const mateListClick = async (reqId) => {
    let list = await mariaDB.query('selectReqMate', reqId);
    return list;
};

// 자재발주관리에서 req_id가 있을경우 수정 (update)
const updateMates = async (updateData) => {
    let conn;
    try {
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();

        let selectedSql = await mariaDB.selectedQuery('deleteMateDetail', updateData.req_id);
        let result = await conn.query(selectedSql, updateData.req_id);

        selectedSql = await mariaDB.selectedQuery('mateDetailKey', {});
        let lastMateDetail = await conn.query(selectedSql, {});
        let lastMateDetailId = lastMateDetail[0].req_detail_id;

        for (let MateDetailInfo of updateData.mate_detail_list) {
            let newMateDetailId = keys.getNextKeyId(lastMateDetailId);
            MateDetailInfo.req_detail_id = newMateDetailId;
            MateDetailInfo.req_id = updateData.req_id;

            let mateDetailCloumn = ['req_detail_id', 'req_id', 'mate_id', 'req_amount', 'memo'];
            let addInfo = converts.convertObjToAry(MateDetailInfo, mateDetailCloumn);

            // detail insert 쿼리 실행
            selectedSql = await mariaDB.selectedQuery('insertMatese', addInfo);
            result = await conn.query(selectedSql, addInfo);
            // insertMatese
            // 다음 detail_id 생성을 위해 저장
            lastMateDetailId = newMateDetailId;
        }

        let req_fields = ["vendor_id", "req_due_date", "employee_id", "req_id"];

        selectedSql = await mariaDB.selectedQuery('updateMateByReq_id', convertObjToAry(updateData, req_fields));
        result = await conn.query(selectedSql, convertObjToAry(updateData, req_fields));

        await conn.commit();

        return result;
    } catch (err) {
        if (conn) conn.rollback();
        console.log('자재발주 수정 오류:', err);
    } finally {
        if (conn) conn.release();
    }
    return result;
};


module.exports = {
    mateReqAll,
    mateReqById,
    vendorId,
    mateList,
    insertMates,
    mateAll,
    deleteMaterial,
    searchOrder,
    mateConfirm,
    selectMateInfo,
    updateMates,
    mateOrder,
    mateListClick,
    mateBom,
    mateBomSave,
    mateBomAdd,
    // mateSave,
}