// <자재발주> //

// 자재발주조회(no,발주일자,발주번호,거래처,사용자명,품목수,발주서,비고,승인일자,승인자)
const selectMateReq =
  `SELECT 
    o.order_date,
    o.order_id,
    v.vendor_name,
    e.employee_name,
    od.order_amount,
    o.memo,
    o.confirm_date,
    o.manager_id
FROM 
    t_order o
LEFT JOIN 
    t_order_detail od ON o.order_id = od.order_id
LEFT JOIN 
    t_vendor v ON o.vendor_id = v.vendor_id
LEFT JOIN 
    t_employee e ON o.employee_id = e.employee_id;
`

// 자재발주상세조회 (No,품목코드,품목명,납품예정일,창고,수량,단위,검사여부,비고)
//const selectMateid = 
//``

// 자재발주등록
//const insertMateInfo = 
//``

// 자재발주 상세등록


// 자재발주삭제


// 자재발주 상세삭제


// 자재발주수정


// 자재발주 상세수정



// <자재입고> //

// 자재입고조회


// 자재입고 상세조회


// 자재입고등록


// 자재입고상세등록


// 자재입고삭제


// 자재입고상세삭제


// 자재입고수정


// 자재입고 상세수정




// 자재창고 입고 //


// 선출창고 출고 //



module.exports = {
  selectMateReq,

}