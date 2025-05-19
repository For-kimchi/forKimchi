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


// 입고조회
const selectStoreList = 
`SELECT 
  i.inbound_id,
  date_type(i.inbound_date) AS inbound_date,
  vendor_id(i.vendor_id) vendor_name,
  employee_id(i.employee_id) AS employee_name,
  i.memo,
  CASE
    WHEN SUM(CASE WHEN id.inbound_status = '1p' THEN 1 ELSE 0 END) > 0 THEN '검사요청'
    WHEN COUNT(*) = SUM(CASE WHEN id.inbound_status = '2p' THEN 1 ELSE 0 END) THEN '검사완료'
    WHEN SUM(CASE WHEN id.inbound_status IN ('3p', '4p') THEN 1 ELSE 0 END) > 0 THEN '입고완료'
    ELSE '기타'
  END AS inbound_final_status
FROM t_mate_inbound i
LEFT JOIN t_mate_inbound_detail id ON i.inbound_id = id.inbound_id
LEFT JOIN t_vendor v ON i.vendor_id = v.vendor_id 
WHERE 1=1
  :searchKeyword
GROUP BY 
  i.inbound_id,
  i.inbound_date,
  i.vendor_id,
  v.vendor_name,
  i.employee_id,
  i.memo;
`;

// 입고관리에서 발주서리스트 (입고상태추가해야함)
const selectStoreMateList = 
`SELECT 
	        req_id,
          date_type(req_date) req_date,
          vendor_id(vendor_id) vendor_name,
          employee_id(employee_id) employee_name,
	        date_type(req_due_date) req_due_date,
          sub_code(req_status) req_status,
	        memo,
          date_type(confirm_date) confirm_date,
          employee_id(manager_id) manager_id
FROM t_mate_req
WHERE req_status = '2o'
`;

// 입고관리에서 발주서상세리스트(발주서리스트 중에서 클릭시)
const selectStoreMateDetail =
`SELECT 
		    req_detail_id,
        req_id,
        mate_id(mate_id) mate_name,
        mate_id,
        req_amount,
        memo
FROM t_mate_req_detail
WHERE req_id = ?;`;

// 창고입고조회(입고일자,입고번호,거래처,사용자명,품목수,비고,수정일,수정자)
const selectStore =
`SELECT date_type(req_date) req_date
        ,req_id
        ,vendor_id(vendor_id) vendor_name
        ,employee_id(employee_id) employee_name
        ,date_type(req_due_date) req_due_date
        ,memo
  FROM t_mate_req
  WHERE req_status = '2o'`;


// 창고입고 상세조회
const selectDetailStore =
`SELECT 
  ib.inbound_id,
  DATE_FORMAT(ib.inbound_date, '%Y-%m-%d') AS inbound_date,
  vendor_id(ib.vendor_id) vendor_name,
  employee_id(ib.employee_id) AS employee_id,
  ib.memo,
  wr.warehouse_type,
  wr.warehouse_id,

  ibd.inbound_detail_id,
  MAX(mate_id(ibd.mate_id)) AS mate_name, 
  MAX(ibd.inbound_amount) AS inbound_amount,  
  MAX(ibd.memo) AS detail_memo,

  CASE 
    WHEN qmd.quality_result = '1r' THEN '합격'
    WHEN qmd.quality_result = '2r' THEN '불합격'
    ELSE NULL
  END AS quality_result,

  CASE 
    WHEN qmd.quality_result = '2r' THEN '반품'
    ELSE '입고'
  END AS inbound_type

FROM t_mate_inbound ib
JOIN t_mate_inbound_detail ibd ON ib.inbound_id = ibd.inbound_id
JOIN t_mate_warehouse mtw ON ibd.mate_id = mtw.mate_id
LEFT JOIN t_warehouse wr ON mtw.warehouse_id = wr.warehouse_id
LEFT JOIN t_quality_mate qm ON ibd.inbound_detail_id = qm.inbound_detail_id
LEFT JOIN t_quality_mate_detail qmd ON qm.quality_id = qmd.quality_id

WHERE ib.inbound_id = ?
GROUP BY 
  ib.inbound_id, 
  ibd.inbound_detail_id
`;

// 입고조회페이지 상세조회
const storeDetailList =
`SELECT inbound_detail_id
        ,inbound_amount
        ,sub_code(inbound_status) inbound_status
        ,mate_id(mate_id) mate_name
        ,memo
FROM t_mate_inbound_detail
WHERE inbound_id = ?`;

// 창고입고조회 (검사완료건만 조회)
const selectWareStatus = 
`SELECT 
	      ib.inbound_id
        ,date_type(ib.inbound_date) inbound_date
        ,vendor_id(ib.vendor_id) vendor_name
        ,employee_id(ib.employee_id) employee_name
        ,ib.memo
        ,sub_code(ibt.inbound_status) inbound_status
FROM t_mate_inbound ib
JOIN t_mate_inbound_detail ibt ON ib.inbound_id = ibt.inbound_id
GROUP BY ib.inbound_id
HAVING COUNT(*) = SUM(CASE WHEN ibt.inbound_status = '2p' THEN 1 ELSE 0 END);`;


// 창고입고조회(입고상태값 추가)
const selectStoreStatus = 
`SELECT 
  i.inbound_id,
  date_type(i.inbound_date) inbound_date,
  vendor_id(i.vendor_id) vendor_name,
  employee_id(i.employee_id) employee_name,
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
GROUP BY i.inbound_id`;

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
`SELECT 
  w.warehouse_id,
  d.mate_lot,
  mate_id(d.mate_id) mate_name,
  d.mate_amount,
  d.inbound_date,
  employee_id(d.employee_id) employee_name
FROM t_mate_inbound_detail d
JOIN t_warehouse w ON w.warehouse_id = d.warehouse_id
WHERE w.warehouse_id = ?
ORDER BY d.inbound_date DESC`;

// 창고현황페이지에서 warehouse_id(드롭다운) 조회
const warehouseIdAll =
`SELECT 
  warehouse_id,
  warehouse_name,
  warehouse_type
FROM t_warehouse
`;

// 창고입고페이지에서 warehouse_id(드롭다운) 조회
const warehouseDtId =
`SELECT 
  warehouse_id,
  warehouse_name,
  warehouse_type
FROM t_warehouse
WHERE warehouse_type = '1h'`;


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
SET inbound_status = ?
WHERE inbound_detail_id = ?`;

// 창고입고카테고리에서 반품처리
const updateWarehouse = 
`UPDATE t_mate_warehouse
SET inbound_status = '4p'
WHERE inbound_id =?`;

// 창고 LOT별 전체조회
const warehouseLotList =
`SELECT 
  w.warehouse_id,
  w.warehouse_name,
  m.mate_lot,
  mate_id(m.mate_id) mate_name,
  m.mate_amount,
  date_type(m.inbound_date) inbound_date,
  employee_id(m.employee_id) employee_name
FROM t_mate_warehouse m
JOIN t_warehouse w ON w.warehouse_id = m.warehouse_id
WHERE w.warehouse_id = ?
ORDER BY m.inbound_date DESC`;

// 창고 자재별 묶음 합계조회
const groupBywareList =
`SELECT 
  mate_id(mate_id) mate_name,
  SUM(mate_amount) AS mate_amount,
  MAX(inbound_date) AS last_inbound_date,
  COUNT(DISTINCT mate_lot) AS lot_count
FROM t_mate_warehouse
WHERE warehouse_id = ?
GROUP BY mate_id
ORDER BY last_inbound_date DESC`;

const selectWarehouseByType =
`
SELECT
  warehouse_id,
  warehouse_name
FROM t_warehouse
WHERE warehouse_type = ?
ORDER BY warehouse_id
`;

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
  selectStoreList,
  selectStoreMateList,
  selectStoreMateDetail,
  updateWarehouse,
  warehouseLotList,
  groupBywareList,
  storeDetailList,
  warehouseIdAll,
  warehouseDtId,
  selectWarehouseByType,
}