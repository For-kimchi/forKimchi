// 공정을 위한 생산지시 조회
const selectProdProcess =`
SELECT 
        prod_order_lot,
        prod_id(prod_id) prod_id,
        date_type(order_date) order_date,
        order_amount,
        employee_id(employee_id) employee_id,
        sub_code(order_status) order_status
FROM t_prod_order
WHERE order_status in ('4d', '5d')
`;

// 생산작업을 위한 공정흐름도 조회
const selectProdProcFlowInfo =`
SELECT  proc_seq,
		    proc_name,
        sub_code(proc_type) proc_type
FROM t_proc_flow pf LEFT JOIN t_proc_flow_detail pfd
					            ON(pf.proc_flow_id = pfd.proc_flow_id)
					          JOIN t_proc p
					            ON(pfd.proc_id = p.proc_id)
WHERE pf.prod_id = ?
`;
module.exports = {
  selectProdProcess,
  selectProdProcFlowInfo,
}