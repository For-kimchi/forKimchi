// <자재발주> //

// 자재발주조회(no,발주일자,발주번호,거래처,사용자명,품목수,발주서,비고,승인일자,승인자)
const selectMateReq =
  `SELECT 
	date_type(mr.req_date) req_date,
    mr.req_id,
    mr.vendor_id,
    mr.employee_id,
	mrd.req_amount,
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


// 자재발주등록
const insertMateInfo = 
``

// 자재발주 상세등록


// 자재발주삭제


// 자재발주 상세삭제


// 자재발주수정


// 자재발주 상세수정



// 자재창고 입고 //


// 선출창고 출고 //



module.exports = {
    selectMateReq,
    selectMateDetail,
}