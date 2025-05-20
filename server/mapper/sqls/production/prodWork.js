// 실적 페이지


// 생산계획 실적 조회
// 계획 실적조회 
const selectWorkPlan =`
SELECT
       t.plan_id,
       vendor_id(o.vendor_id) vendor_name,
       vendor_id,
       employee_id(t.employee_id) employee_name,
       employee_id,
       employee_id(t.manager_id) manager_name,
       manager_id,
       date_type(t.reg_date) reg_date,
       sub_code(t.plan_final_status) plan_final_status,
       t.memo
   FROM t_prod_plan t left join t_order o
                        on (t.order_id = o.order_id)
   WHERE t.plan_final_status in ('4i')
   :searchKeyword
   GROUP BY t.plan_id
   ORDER BY reg_date DESC
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
// employee_id 가져오기
const selectEmployeeIdInfo =`
SELECT employee_id
FROM t_employee
WHERE employee_name = ?
`;
module.exports = {
  selectWorkPlan,
  selectWorkPlanDetail,
  selectEmployeeIdInfo,

}