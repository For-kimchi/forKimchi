// <자재발주> //

// mateKey
const matePlanKey =
  `SELECT req_id
FROM t_mate_req
ORDER BY req_id DESC
LIMIT 1
`;

// mateDetailKey
const mateDetailKey =
  `SELECT req_detail_id
FROM t_mate_req_detail
ORDER BY req_detail_id DESC
LIMIT 1
`;

// mate_id 조회
const mateCode = 
`SELECT mate_id
FROM t_mate
WHERE mate_name = ?
ORDER BY mate_id DESC
LIMIT 1`;

// 발주리스트를 통한 detail등록
const insertMateDetail = 
`INSERT INTO t_mate_req_detail (
  req_detail_id,
  req_id,
  mate_id,
  req_amount,
  memo)
  VALUES (?, ?, ?, ?, ?)`;

// 자재발주조회(no,발주일자,발주번호,거래처,사용자명,품목수,발주서,비고,승인일자,승인자)
const selectMateReq =
`SELECT 
	        req_id,
          date_type(req_date) req_date,
          vendor_id(vendor_id) vendor_id,
          employee_id(employee_id) employee_id,
	        date_type(req_due_date) req_due_date,
          sub_code(req_status) req_status,
	        memo,
          date_type(confirm_date) confirm_date,
          employee_id(manager_id) manager_id
FROM t_mate_req
`;

// 자재발주조회에서 검색 결과에 맞는 값만 조회
const selectMateReqWithSearch = `
  SELECT 
    req_id,
    date_type(req_date) req_date,
    vendor_id(vendor_id) vendor_id,
    employee_id(employee_id) employee_id,
    date_type(req_due_date) req_due_date,
    sub_code(req_status) req_status,
    memo,
    date_type(confirm_date) confirm_date,
    employee_id(manager_id) manager_id
  FROM t_mate_req
  WHERE 1=1
    AND (? IS NULL OR vendor_id LIKE ?)
    AND (? IS NULL OR req_date BETWEEN ? AND ?)
    AND (? IS NULL OR req_status = ?)
    AND (? IS NULL OR employee_id LIKE ?)
`;

// 입고관리에서 발주서 전체조회(발주승인건만)
// const selectMateStore =
//   `SELECT 
// 	req_id,
//     date_type(req_date) req_date,
//     vendor_id(vendor_id) vendor_id,
//     employee_id(employee_id) employee_id,
// 	date_type(req_due_date) req_due_date,
//     sub_code(req_status) req_status,
// 	memo,
//     date_type(confirm_date) confirm_date,
//     employee_id(manager_id) manager_id
// FROM t_mate_req
// WHERE req_status = '2o'
// `;

// 자재발주상세조회 (No,품목코드,품목명,납품예정일,,수량,단위,검사여부,비고)
const selectMateDetail =
`SELECT 
		    req_detail_id,
        req_id,
        mate_id(mate_id) mate_id,
        req_amount,
        memo
FROM t_mate_req_detail
WHERE req_id = ?;`;


// 거래처 검색
const insertVenId =
`SELECT DISTINCT
        vendor_id
FROM t_mate_req
ORDER BY vendor_id`;

// 자재검색
const searchMateList =
`SELECT 
	mate_id
    ,mate_name
    ,mate_unit
FROM t_mate
ORDER BY mate_id`;

// 자재발주 상세조회
const detailMateInserts = 
`SELECT
        p.mate_id
        ,p.mate_name
        ,req_amountsd
        ,p.mate_unit
FROM t_mate_req_detail mrd LEFT JOIN t_mate p
                                ON (mrd.mate.id = p.mate_id)
WHERE mrd.req_id=?`;

// 자재발주등록
const insertMainMate =
`INSERT INTO t_mate_req(
                        req_date
                        ,req_id
                        ,vendor_id
                        ,employee_id
                        ,req_due_date
                        ,req_status
                        ,memo)
VALUES(SYSDATE(), ?, ?, ?, ?, '1o', '')`;

// 자재발주 상세등록버튼(저장)
const insertMatese =
`INSERT INTO t_mate_req_detail(req_detail_id
                            ,req_id
                            ,mate_id
                            ,req_amount
                            ,memo)
VALUES(?, ?, ?, ?, ?)
`;

// 자재발주관리페이지에서 발주서전체리스트 조회
const selectDeleteList =
`SELECT 
	        req_id,
          date_type(req_date) req_date,
          vendor_id(vendor_id) vendor_id,
          employee_id(employee_id) employee_id,
	        date_type(req_due_date) req_due_date,
          sub_code(req_status) req_status,
	        memo,
          date_type(confirm_date) confirm_date,
          employee_id(manager_id) manager_id
FROM t_mate_req `

// 자재발주관리페이지에서 자재리스트 중 선택항목 삭제버튼
const deleteMateBtn =
`DELETE 
FROM t_mate_req
WHERE req_id =?`

// 자재발주 상세삭제(자재발주상세부터 삭제해야 오류가 안난다.)
const deleteDetailMate =
`DELETE 
FROM t_mate_req_detail
WHERE req_id = ?`;

// 자재발주삭제
const deleteMate = 
`DELETE
FROM t_mate_req
WHERE req_id =?`;

// 자재발주수정
const updateMate = 
`UPDATE t_mate_req
SET ?
WHERE req_id = ?;`

// 자재발주 상세수정
const updateDetailMate = 
`UPDATE t_mate_req_detail
SET ?
WHERE req_id = ? 
AND mate_id = ?;
`
// 자재이름을 ID로 변환시키는 쿼리 필요없어서 주석
// const mateChangeId =`
// SELECT mate_id
// FROM t_mate
// WHERE mate_name = ?
// `;


// 자재창고 입고 //


// 선출창고 출고 //



module.exports = {
    selectMateReq,
    selectMateDetail,
    insertVenId,
    searchMateList,
    insertMatese,
    insertMainMate,
    matePlanKey,
    mateDetailKey,
    mateCode,
    insertMateDetail,
    detailMateInserts,
    selectDeleteList,
    deleteDetailMate,
    deleteMateBtn,
}