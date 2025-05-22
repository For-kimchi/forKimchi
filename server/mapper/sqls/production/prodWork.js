// 실적 페이지


// 생산계획 실적 조회
// 계획 실적조회 
const selectWorkPlan =`
SELECT
       t.plan_id,
       v.vendor_name,
       e.employee_name,
       m.employee_name manager_name,
       date_type(t.reg_date) reg_date,
       sc.sub_code_name plan_final_status
   FROM t_prod_plan t left join t_order o ON (t.order_id = o.order_id)
   left JOIN t_employee e ON(t.employee_id = e.employee_id)
   left JOIN t_employee m ON(t.manager_id = m.employee_id)
   left JOIN t_vendor v ON(o.vendor_id = v.vendor_id)
   left JOIN t_sub_code sc ON (t.plan_final_status = sc.sub_code)
   WHERE t.plan_final_status in ('4i')
   :searchKeyword
   GROUP BY t.plan_id
   ORDER BY plan_id DESC
`;


// 상세계획 실적조회
const selectWorkPlanDetail =`
SELECT
        d.plan_detail_id,
        prod_id(d.prod_id) prod_id,
        p.order_amount,
        d.plan_amount,
        sub_code(d.plan_status) plan_status,
        date_type(p.deliv_due_date) deliv_due_date,
        date_type(d.plan_start_date) plan_start_date,
        date_type(d.plan_end_date) plan_end_date
 FROM t_prod_plan_detail d left JOIN t_prod_plan t
                         ON (d.plan_id = t.plan_id)
                         left JOIN t_order_detail p
                         ON (t.order_id = p.order_id)
 WHERE t.plan_id = ?
 GROUP BY plan_detail_id
`;
// 공정실적조회
const selectWorkProdProc =`
SELECT 
        o.prod_order_lot,
        p.prod_name,
        date_type(o.order_date) order_date,
        o.order_amount,
        e.employee_name,
        sc.sub_code_name order_status
FROM t_prod_order o left JOIN t_employee e ON(o.employee_id = e.employee_id)
                    left JOIN t_prod p ON(o.prod_id = p.prod_id)
                    left JOIN t_sub_code sc ON (o.order_status = sc.sub_code)
WHERE o.order_status in ('5d')
:searchKeyword
ORDER BY prod_order_lot
`;
module.exports = {
  selectWorkPlan,
  selectWorkPlanDetail,
  selectWorkProdProc,
}