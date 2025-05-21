// 생산지시 조회
// prodOrder 조회문
const selectOrders =`
SELECT
plan_detail_id,
prod_order_lot,
prod_id(prod_id) prod_id,
date_type(order_date) order_date,
order_amount,
employee_id(employee_id) employee_id,
sub_code(order_status) order_status
FROM   t_prod_order;
`;
// ----------------------------------------------------------------

// LOT를 위한 쿼리
const selectProdOrderLimit =`
SELECT prod_order_lot
FROM t_prod_order
ORDER BY prod_order_lot DESC
LIMIT 1
`;
// prod_id 변환
const selectProdOrderName =`
SELECT prod_id
FROM t_prod
WHERE prod_name = ?
`;
// ----------------------------------------------------------------

// 생산지시등록을 위한 쿼리
// 생산계획 조회
const selectPlanDetail =`
SELECT
        t.plan_id,
        d.plan_detail_id,
        prod_id(d.prod_id) prod_id,
        d.plan_amount,
        (SELECT sum(order_amount) sum_amount
         FROM t_prod_order
         WHERE plan_detail_id = d.plan_detail_id) sum_amount,
        date_type(d.plan_start_date) plan_start_date,
        date_type(d.plan_end_date) plan_end_date,
        sub_code(d.plan_status) plan_status
 FROM t_prod_plan_detail d left JOIN t_prod_plan t
                         ON (d.plan_id = t.plan_id)
 WHERE d.plan_status in ('1c', '2c', '3c')
 `;
// 생산지시상세 조회
const selectplanOrderInfo = `
SELECT 
        prod_order_lot,
        prod_id(prod_id) prod_id,
        date_type(order_date) order_date,
        order_amount,
        employee_id(employee_id) employee_id,
        sub_code(order_status) order_status
FROM t_prod_order
WHERE plan_detail_id = ?
ORDER BY prod_order_lot
`;
// 생산지시 등록
const insertProdOrderInfo = `
INSERT INTO t_prod_order(plan_detail_id,
                         prod_order_lot,
                         prod_id,
                         order_date,
                         order_amount,
                         order_status)
VALUES (?, ?, ?, ?, ?,'1d')
`;
// 생산지시 승인 버튼
const updateProdOrderBtn =`
UPDATE t_prod_order 
SET order_status = '2d',
    employee_id = ?
WHERE prod_order_lot = ?
`;

// 생산지시 중 상세계획 상태변경
const updatePlanDetailStatus =`
UPDATE t_prod_plan_detail
SET plan_status = '3c'
WHERE plan_detail_id = ?
`;
// 생산지시 승인 했을때 모든항목 승인여부 확인
const prodPlanOrderStatusInfo =`
CALL prodPlanStatus(?);
`;
// ----------------------------------------------------------------
// 선출창고관리

// 생산지시리스트
const selectProdOrderList =`
SELECT 
        prod_order_lot,
        prod_id(prod_id) prod_id,
        date_type(order_date) order_date,
        order_amount,
        employee_id(employee_id) employee_id,
        sub_code(order_status) order_status
FROM t_prod_order
WHERE order_status in ('2d', '3d')
ORDER BY order_date DESC, prod_order_lot
`;

// 재고요청
const selectProdMate = `
SELECT 
        prod_mate_id,
        prod_order_lot,
        mate_id(mate_id) mate_id,
        inbound_date,
        inbound_amount,
        employee_id(employee_id) employee_id,
        inbound_status,
        memo
FROM t_prod_mate_order
`;

// bom 정보
const selectBomsBomDetail =`
SELECT
        bd.mate_id,
        m.mate_name,
        bd.mate_amount,
        m.mate_unit,
        sub_code(m.mate_type) mate_type
FROM t_bom b JOIN t_bom_detail bd
                ON(b.bom_id = bd.bom_id)
	     JOIN t_mate m
		ON (bd.mate_id = m.mate_id)
WHERE b.prod_id = ? 
AND b.bom_status = '1t'
`;
// ----------------------------------------------------------------


module.exports = {
    selectOrders,
    selectPlanDetail,
    selectplanOrderInfo,
    insertProdOrderInfo,
    selectProdOrderLimit,
    selectProdOrderName,
    selectProdMate,
    selectProdOrderList,
    selectBomsBomDetail,
    updatePlanDetailStatus,
    updateProdOrderBtn,
    prodPlanOrderStatusInfo,
    
}