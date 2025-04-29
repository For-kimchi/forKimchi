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
        date_type(s.deliv_due_date) deliv_due_date,
        sub_code(m.order_status) order_status,
        s.memo
 FROM t_order_detail s join t_order m
                         on (s.order_id = m.order_id)
 WHERE m.order_status = '2a' and '3a'
 ORDER BY order_status, delivery_due_date`;

// 생산계획 목록(지시완료 제외) 
const selectprod =
`SELECT
       t.plan_id,
       o.order_id,
       vendor_id(o.vendor_id) vendor_id,
       employee_id(o.employee_id) employee_id,
       date_type(t.reg_date) reg_date,
       date_type(d.deliv_due_date) deliv_due_date,
       sub_code(d.order_status) order_status,
       sub_code(t.plan_final_status) plan_final_status,
       t.memo
   FROM t_prod_plan t join t_order o
                        on (t.order_id = o.order_id)
                      join t_order_detail d
                        on (t.order_id = d.order_id)`;

// 상세생산계획 조회
const selectproddetail =
`SELECT
        p.order_detail_id,
        prod_id(p.prod_id) prod_id,
        p.order_amount,
        d.plan_amount,
        sub_code(d.plan_status) plan_status,
        date_type(d.plan_start_date) plan_start_date,
        date_type(d.plan_end_date) plan_end_date
 FROM t_prod_plan_detail d JOIN t_prod_plan t
                         ON (d.plan_id = t.plan_id)
                         JOIN t_order_detail p
                         ON (t.order_id = p.order_id)`;
 // 생산계획에 들어갈 주문 등록
 const insertprod =
 `INSERT INTO `;

module.exports = {
    selectorder,
    selectprod,
    selectproddetail,
}