// <자재발주> //

const matePlanKey =
  `SELECT req_id
FROM t_mate_req
ORDER BY req_id DESC
LIMIT 1
`;

// 자재발주조회(no,발주일자,발주번호,거래처,사용자명,품목수,발주서,비고,승인일자,승인자)
const selectMateReq =
  `SELECT 
	date_type(mr.req_date) req_date,
    mr.req_id,
    mr.vendor_id,
    mr.employee_id,
	mr.req_due_date,
    mr.req_status,
	mr.memo,
    mr.confirm_date,
    mr.manager_id
FROM 
    t_mate_req mr
LEFT JOIN 
    t_mate_req_detail mrd ON mr.req_id = mrd.req_id
WHERE 1=1
ORDER BY mr.req_id
`;

// 자재발주상세조회 (No,품목코드,품목명,납품예정일,,수량,단위,검사여부,비고)
const selectMateDetail =
`SELECT 
    p.mate_id
    ,p.mate_name
    ,mr.req_due_date
    ,mrd.req_amount
    ,p.mate_unit
    ,mrd.memo
FROM t_mate_req_detail mrd
LEFT JOIN 
    t_mate p ON mrd.mate_id = p.mate_id
LEFT JOIN 
    t_mate_req mr ON mrd.req_id = mr.req_id
WHERE mrd.req_id=?`;


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

// 자재발주 상세등록
const detailMateInsert = 
`SELECT
        p.mate_id
        ,p.mate_name
        ,req_amount
        ,p.mate_unit
FROM t_mate_req_detail mrd
LEFT JOIN
    t_mate p ON mrd.mate.id = p.mate_id
WHERE mrd.req_id=?`;

// 자재발주등록
const insertMainMate =
`INSERT INTO t_mate_req(
                        ,req_date
                        ,req_id
                        ,vendor_id
                        ,employee_id
                        ,req_due_date
                        ,req_status
                        ,memo)
VALUES(SYSDATE(), ?, ?, ?, ?, '1o', ?)`

// 자재발주 상세등록버튼(저장)
const insertMates =
`INSERT INTO t_mate_req_detail(req_detail_id
                            ,req_id
                            ,mate_id
                            ,req_amount
                            ,memo)
VALUES(?, ?, ?, ?, ?)
`;

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
SET
    req_date = ?, 
    vendor_id = ?, 
    employee_id = ?, 
    memo = ?, 
    confirm_date = ?, 
    manager_id = ?
WHERE req_id = ?;`

// 자재발주 상세수정
const updateDetailMate = 
`UPDATE t_mate_req_detail
SET 
  mate_id = ?, 
  req_due_date = ?, 
  req_amount = ?, 
  memo = ?
WHERE req_id = ? 
AND mate_id = ?;
`


// 자재창고 입고 //


// 선출창고 출고 //



module.exports = {
    selectMateReq,
    selectMateDetail,
    insertVenId,
    searchMateList,
    insertMates,
    insertMainMate,
    matePlanKey,
}