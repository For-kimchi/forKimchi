// production 쿼리문
// planKey생성을 위한 조회
const sltPlanKey =
  `SELECT plan_id
FROM t_prod_plan
ORDER BY plan_id DESC
LIMIT 1
`;
// plandetail Key
const sltPlanDetailKey =
  `SELECT plan_detail_id
FROM t_prod_plan_detail
ORDER BY plan_detail_id DESC
LIMIT 1
`;

// prod_id 조회
const prodCode =`
SELECT prod_id
FROM t_prod
WHERE prod_name = ?
ORDER BY prod_id DESC
LIMIT 1
`;

// 주문목록 확인(수주 승인상태)
const selectorder =
`SELECT 
        order_id,
        date_type(order_date) order_date,
        sub_code(order_final_status) order_final_status,
        vendor_id(vendor_id) vendor_id,
        employee_id(employee_id) employee_id,
        date_type(reg_date) reg_date,
        memo
 FROM  t_order 
 WHERE order_final_status = '2a'`;

 // 주문 상세 조회
 const selectorderdt =`
 SELECT 
       order_detail_id,
       prod_id(prod_id) prod_id,
       order_amount,
       date_type(deliv_due_date) deliv_due_date,
       memo
  FROM t_order_detail
  WHERE order_id = ?`;

// 생산계획 목록(지시완료 제외) 
const selectprod =
`SELECT
       t.plan_id,
       vendor_id(o.vendor_id) vendor_id,
       employee_id(t.employee_id) employee_id,
       employee_id(t.manager_id) manager_id,
       date_type(t.reg_date) reg_date,
       sub_code(t.plan_final_status) plan_final_status,
       t.memo
   FROM t_prod_plan t left join t_order o
                        on (t.order_id = o.order_id)
   WHERE t.plan_final_status in ('2i','1i','3i')
   GROUP BY t.plan_id`;

// 상세생산계획 조회
const selectproddetail =
`SELECT
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
 GROUP BY plan_detail_id`;

 // 주문서를 통한 plan등록
 // session 등록되면 그값을 emp_id에 저장해야함.
 // 아직안했기때문에 제외시킴.
 const insertorpl =
 `
 INSERT INTO t_prod_plan(plan_id,
						             order_id,
                         employee_id,
                         plan_final_status,
                         reg_date)
VALUES(?, ?, '세션Id', '1i',SYSDATE())
 `;
 // 주문서를 통한 detail등록
 const insertorprdt =
 `
 INSERT INTO t_prod_plan_detail(plan_detail_id,
                                plan_id,
                                prod_id,
                                plan_status)
 VALUES(?, ?, ?, '1c')
 `;
// 계획추가한 주문 상태값변경
const updateod = `
UPDATE t_order
SET order_final_status = '3a'
WHERE order_id = ?`;

// 디테일저장버튼
const updateprod = `
UPDATE t_prod_plan_detail
SET ?
WHERE plan_detail_id = ?`

// 승인버튼
const updateplandt = `
UPDATE t_prod_plan_detail
SET plan_status = '2i'
WHERE plan_detail_id = ?`

module.exports = {
    selectorder,
    selectprod,
    selectproddetail,
    insertorpl,
    insertorprdt,
    updateod,
    updateprod,
    updateplandt,
    selectorderdt,
    sltPlanDetailKey,
    sltPlanKey,
    prodCode,
}