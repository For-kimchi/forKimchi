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

// 자재입고조회(입고일자,입고번호,거래처,사용자명,품목수,비고,수정일,수정자)
const selectStore =
`SELECT inbound_id
        ,date_type(inbound_date) inbound_date
        ,vendor_id(vendor_id) vendor_id
        ,employee_id(employee_id) employee_id
        ,memo
  FROM t_mate_inbound`;

// 자재입고 상세조회
const selectDetailStore =
`SELECT inbound_detail_id
        ,inbound_amount
        ,pass_amount
        ,fail_amount
        ,sub_code(inbound_status) inbound_status
        ,memo
FROM t_mate_inbound_detail
WHERE inbound_id = ?`;

// 발주서입고등록(저장버튼 클릭시)
const insertStoreMain =
`INSERT INTO t_mate_inbound( inbound_id
                            ,req_id
			    ,employee_id
			    ,inbound_date
                            ,vendor_id
                            ,memo)
VALUES(?, ?, ?, SYSDATE(), ?, '')`;

// 자재입고상세등록(저장버튼 클릭시)
const insertStoreDetail = 
`INSERT INTO t_mate_inbound_detail(
                                    inbound_detail_id,
                                    inbound_id,
                                    mate_id
                                    ,inbound_amount
                                    ,inbound_status
                                    ,memo)
VALUES (?, ?, ?, ?, '1p', ?)`;

// 창고조회
const selectWarehouses = 
`SELECT warehouse_id,
	mate_lot,
        mate_id(mate_id) mate_id,
	mate_amount,
        date_type(inbound_date) inbound_date,
        employee_id(employee_id) employee_id
FROM t_mate_warehouse`;


// 입고상세에서 저장버튼 클릭시 창고에 DB저장
const insertWarehouse =
`INSERT INTO t_mate_warehouse (
                                mate_lot,
                                inbound_detail_id,
                                warehouse_id,
                                mate_amount,
                                inbound_date,
                                employee_id)
VALUES()`

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
}