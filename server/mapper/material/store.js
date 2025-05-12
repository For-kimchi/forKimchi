// <자재입고> //

// storeKey
const storePlanKey = 
`SELECT inbound_id
FROM t_mate_inbound
ORDER BY inbound_id DESC
LIMIT 1`;

// storeDetailKey
const storeDetailKey =
`SELECT inbound_detail_id
FROM t_mate_inbound_detail
ORDER BY inbound_detail_id DESC
LIMIT 1`;

// lot생성을 위한 조회문
const seletMateLot =`
SELECT mate_lot
FROM t_mate_warehouse
ORDER BY mate_lot DESC
LIMIT 1`;

// 창고입고조회(입고일자,입고번호,거래처,사용자명,품목수,비고,수정일,수정자)
const selectStore =
`SELECT date_type(req_date) req_date
        ,req_id
        ,vendor_id(vendor_id) vendor_id
        ,employee_id(employee_id) employee_id
        ,date_type(req_due_date) req_due_date
        ,memo
  FROM t_mate_req
  WHERE req_status = '2o'`;

  // `SELECT req_id
//         ,date_type(inbound_date) inbound_date
//         ,vendor_id(vendor_id) vendor_id
//         ,employee_id(employee_id) employee_id
//         ,memo
//   FROM t_mate_inbound`;

// 창고입고 상세조회
const selectDetailStore =
`SELECT inbound_detail_id
        ,inbound_amount
        ,pass_amount
        ,fail_amount
        ,sub_code(inbound_status) inbound_status
        ,mate_id
        ,memo
FROM t_mate_inbound_detail
WHERE inbound_id = ?`;

// 창고입고조회 (검사완료건만 조회)
const selectWareStatus = 
`SELECT 
	ib.inbound_id
        ,ib.inbound_date
        ,ib.vendor_id
        ,ib.employee_id
        ,ib.memo
FROM t_mate_inbound ib
JOIN t_mate_inbound_detail ibt ON ib.inbound_id = ibt.inbound_id
GROUP BY ib.inbound_id
HAVING COUNT(*) = SUM(CASE WHEN ibt.inbound_status = '2p' THEN 1 ELSE 0 END);`;


// 창고입고조회(입고상태값 추가)
const selectStoreStatus = 
`SELECT 
  i.inbound_id,
  date_type(i.inbound_date) inbound_date,
  vendor_id(i.vendor_id) vendor_id,
  employee_id(i.employee_id) employee_id,
  i.memo,
  CASE
    WHEN SUM(CASE WHEN id.inbound_status = '1p' THEN 1 ELSE 0 END) > 0 THEN '검사요청'
    WHEN COUNT(*) = SUM(CASE WHEN id.inbound_status = '2p' THEN 1 ELSE 0 END) THEN '검사완료'
    WHEN SUM(CASE WHEN id.inbound_status IN ('3p', '4p') THEN 1 ELSE 0 END) > 0 THEN '입고마감'
    ELSE '기타'
  END AS inbound_final_status
FROM t_mate_inbound i
JOIN t_mate_inbound_detail id ON i.inbound_id = id.inbound_id
WHERE id.inbound_status = '2p'
GROUP BY i.inbound_id;`

// 발주서입고등록(저장버튼 클릭시)
const insertStoreMain =
`INSERT INTO t_mate_inbound( inbound_id
                            ,req_id
			    ,employee_id
			    ,inbound_date
                            ,vendor_id
                            ,memo)
VALUES(?, ?, ?, SYSDATE(), ?, '')`;

// 입고상세등록(저장버튼 클릭시)
const insertStoreDetail = 
`INSERT INTO t_mate_inbound_detail(
                                    inbound_detail_id,
                                    inbound_id,
                                    mate_id
                                    ,inbound_amount
                                    ,inbound_status
                                    ,memo)
VALUES (?, ?, ?, ? ,'1p', '')`;


// 창고현황조회
const selectWarehouses = 
`SELECT warehouse_id,
	mate_lot,
        mate_id(mate_id) mate_name,
        mate_id,
	mate_amount,
        date_type(inbound_date) inbound_date,
        employee_id(employee_id) employee_id
FROM t_mate_warehouse`;


// 창고입고상세에서 저장버튼 클릭시 창고에 DB저장
const insertWarehouse =
`INSERT INTO t_mate_warehouse (
                                mate_lot,
                                mate_id,
                                inbound_detail_id,
                                warehouse_id,
                                mate_amount,
                                inbound_date,
                                employee_id)
VALUES(?, ?, ?, ?, ?, SYSDATE(), ?)`

// 입고 발주서상세 저장후 항목update
const updateStore =
`UPDATE t_mate_req
SET req_status = '3o'
WHERE req_id = ?`

// 창고입고관리 inbound_status UPDATE
const updateInbound =`
UPDATE t_mate_inbound_detail
SET inbound_status = '3p'
WHERE inbound_id = ?`;



// 자재입고삭제


// 자재입고상세삭제


// 자재입고수정


// 자재입고 상세수정


module.exports = {
  insertStoreMain,
  insertStoreDetail,
  storePlanKey,
  storeDetailKey,
  selectStore,
  selectDetailStore,
  selectWarehouses,
  insertWarehouse,
  updateStore,
  selectWareStatus,
  selectStoreStatus,
  updateInbound,
  seletMateLot,
}