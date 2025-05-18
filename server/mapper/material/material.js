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

// 생산지시 BOM조회
const mateBom =
`SELECT 
  po.prod_order_lot,
  po.prod_id,
  td.mate_id,
  m.mate_name,
  m.mate_unit,
  td.mate_amount,
  po.order_amount
FROM t_prod_order po
LEFT JOIN t_bom b ON po.prod_id = b.prod_id
LEFT JOIN t_bom_detail td ON b.bom_id = td.bom_id
LEFT JOIN t_mate m ON td.mate_id = m.mate_id
WHERE po.prod_order_lot = ? AND b.bom_status = '1t';`

// 생산지시에서 발주등록 버튼클릭시 값 자동입력 (자재에)
  const mateBomAdd =
  `SELECT 
    po.prod_order_lot,
    po.prod_id,
    td.mate_id,
    m.mate_name,
    m.mate_unit,
    td.mate_amount,
    po.order_amount
  FROM t_prod_order po
  LEFT JOIN t_bom b ON po.prod_id = b.prod_id
  LEFT JOIN t_bom_detail td ON b.bom_id = td.bom_id
  LEFT JOIN t_mate m ON td.mate_id = m.mate_id
  WHERE po.prod_order_lot = ?`;

// 생산지시 발주등록버튼 클릭시 값 자동입력
// const mateBomSaves = 
// `SELECT 
// SELECT mr.mate_id,
// 		    tm.mate_name,
//         mr.req_amount,
//         tm.mate_unit,
//         mr.req_id,
//         tmr.req_due_date,
//         vendor_id(tmr.vendor_id) vendor_name
// FROM t_mate_req_detail mr
// LEFT JOIN t_mate tm ON mr.mate_id = tm.mate_id
// JOIN t_mate_req tmr ON mr.req_id = tmr.req_id
// WHERE mr.req_id = ?`

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
          vendor_id(mr.vendor_id) vendor_name,
          employee_id(employee_id) employee_name,
	        date_type(req_due_date) req_due_date,
          sub_code(req_status) req_status,
	        memo,
          date_type(confirm_date) confirm_date,
          manager_id,
          employee_id(manager_id) manager_name
FROM t_mate_req mr 
JOIN t_vendor v ON mr.vendor_id = v.vendor_id
WHERE 1=1
:searchKeyword
`;


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

// 자재발주페이지 승인버튼(상태값 변경)
const updateMateStatus =
`UPDATE t_mate_req
SET req_status = ?,
    confirm_date = SYSDATE(),
    manager_id = ?
WHERE req_id= ?`;


// 거래처 검색
const insertVenId =
`SELECT DISTINCT
        vendor_id(vendor_id) vendor_name
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
        ,req_amount
        ,p.mate_unit
FROM t_mate_req_detail mrd 
LEFT JOIN t_mate p ON (mrd.mate.id = p.mate_id)
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
const mateListAll =
`SELECT 
	  mrd.req_detail_id,
    mrd.req_id,
    mrd.mate_id,
    mrd.req_amount,
    mrd.memo,
    sub_code(mr.req_status) req_status,
    vendor_id,
    vendor_id(mr.vendor_id) vendor_name,
    date_type(mr.req_date) req_date,
    employee_id(mr.employee_id) employee_name,
    date_type(mr.req_due_date) req_due_date,
    mt.mate_name,
    mt.mate_unit
FROM t_mate_req_detail mrd
LEFT JOIN t_mate_req mr ON mrd.req_id = mr.req_id
JOIN t_mate mt ON mrd.mate_id = mt.mate_id
WHERE mr.req_status = '1o'
GROUP BY mrd.req_id
ORDER BY mr.req_due_date
`;
// SELECT 
// 	        req_id,
//           date_type(req_date) req_date,
//           vendor_id(mr.vendor_id) vendor_name,
//           employee_id(employee_id) employee_name,
// 	        date_type(req_due_date) req_due_date,
//           sub_code(req_status) req_status,
// 	        memo,
//           date_type(confirm_date) confirm_date,
//           manager_id,
//           employee_id(manager_id) manager_name
// FROM t_mate_req mr 
// JOIN t_vendor v ON mr.vendor_id = v.vendor_id
// WHERE 1=1
// :searchKeyword


// 자재발주관리페이지에서 행클릭시 값 자동입력
const selectReqMate =
`SELECT mr.mate_id,
		    tm.mate_name,
        mr.req_amount,
        tm.mate_unit,
        mr.req_id,
        tmr.req_due_date,
        vendor_id(tmr.vendor_id) vendor_name
FROM t_mate_req_detail mr
LEFT JOIN t_mate tm ON mr.mate_id = tm.mate_id
JOIN t_mate_req tmr ON mr.req_id = tmr.req_id
WHERE mr.req_id = ?`;


// 자재발주관리페이지에서 자재리스트 중 선택항목 삭제버튼
const deleteMateBtn =
`DELETE 
FROM t_mate_req_detail
WHERE req_detail_id =?`




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

// 생산지시전체조회
const mateOrderList =
`SELECT 
        po.prod_order_lot,
        prod_id(po.prod_id) prod_id,
        date_type(po.order_date) order_date,
        po.order_amount,
        employee_id(po.employee_id) employee_name,
        sub_code(po.order_status) order_status,
        bd.mate_amount,
        t.mate_id,
        t.mate_name,
        t.mate_unit
FROM t_prod_order po
LEFT JOIN t_bom b ON po.prod_id = b.prod_id
LEFT JOIN t_bom_detail bd ON b.bom_id = bd.bom_id
LEFT JOIN t_mate t ON bd.mate_id = t.mate_id
WHERE order_status = '2d'
GROUP BY po.prod_order_lot, po.prod_id, po.order_date, po.order_amount, po.employee_id, po.order_status;
` 

const deleteMateDetail = `
DELETE 
FROM t_mate_req_detail
WHERE req_id = ?
`;

const updateMateByReq_id = `
UPDATE t_mate_req
  SET
    vendor_id = ?,
    req_due_date = ?,
    employee_id = ?
WHERE req_id = ?
`;


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
    deleteDetailMate,
    deleteMateBtn,
    updateMateStatus,
    // updateMateQuery,
    mateOrderList,
    selectReqMate,
    mateListAll,
    mateBomAdd,
    deleteMateDetail,       // 자재 발주 상세 삭제 (자재 발주 id)
    updateMateByReq_id,             // 자재 발주 수정 (자재 발주 id)
    mateBom, // BOM에 따른 생산지시 조회
    // mateBomSaves,
}