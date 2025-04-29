// production 쿼리문
// 주문목록 확인(수주 승인상태)
const selectorder =
`SELECT 
        m.order_id,
        s.order_detail_id,
        date_type(m.order_date) order_date,
        vendor_id(m.vendor_id) vendor_id,
        employee_id(m.employee_id) employee_id,
        date_type(m.reg_date) reg_date,
        prod_id(s.prod_id) prod_id,
        s.order_amount,
        date_type(s.delivery_due_date) delivery_due_date,
        sub_code(m.order_status) order_status,
        s.memo
 FROM t_order_detail s join t_order m
                         on (s.order_id = m.order_id)
 WHERE m.order_status = '2a' and '3a'
 ORDER BY order_status, delivery_due_date`;

// 생산계획 목록(지시완료 제외)
 const selectprod =
 `SELECT
        plan_id,
        plan_final_status,
        employee_id,
        reg_date,
        manager_id,
        confirm_date,
        memo
    FROM t_prod_plan
 WHERE IS NOT 'i4'
 `;
module.exports = {
    selectorder,
    selectprod,
}