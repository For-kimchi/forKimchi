// 생산지시 조회
// prodOrder 조회문
const selectOrders =`
SELECT prod_order_id,
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
 WHERE t.plan_final_status in ('2i', '3i')
 `;
// 생산지시상세 조회
const selectplanOrderInfo = `
SELECT 
        prod_order_id,
        prod_order_lot,
        prod_id(prod_id) prod_id,
        date_type(order_date) order_date,
        order_amount,
        employee_id(employee_id) employee_id,
        sub_code(order_status) order_status
FROM t_prod_order
WHERE plan_detail_id = ?
`;
// 생산지시 등록
const insertProdOrderInfo = `
INSERT INTO t_prod_order(plan_detail_id,
                         prod_order_lot,
                         prod_id,
                         order_date,
                         order_amount,
                         order_status)
VALUES (?, ?, ?, ?, ?, '1d')
`;


// ----------------------------------------------------------------

// 선출창고관리
// ----------------------------------------------------------------


module.exports = {
    selectOrders,
    selectPlanDetail,
    selectplanOrderInfo,
    insertProdOrderInfo,
}