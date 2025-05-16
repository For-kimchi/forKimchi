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
WHERE order_status in ('4d', '3d') and order_date > sysdate()
`;

// 생산작업을 위한 공정흐름도 조회
const selectProdProcFlowInfo =`
SELECT  pfd.proc_seq,
        p.proc_id,
        p.proc_name,
        sub_code(p.proc_type) proc_type
 FROM t_proc_flow_detail pfd
 JOIN t_proc p ON pfd.proc_id = p.proc_id
 WHERE proc_flow_id = (SELECT proc_flow_id
                        FROM t_proc_flow
                        WHERE prod_id = ?
                        AND proc_flow_status = '1v');
`;
// 생산작업을 위한 생산공정 합계조회
const selectSumProdProcList =`
SELECT 
        COUNT(prod_proc_id) count,
        SUM(proc_input_amount) sum_input_amount,
        SUM(proc_fail_amount) sum_fail_amount,
        SUM(proc_pass_amount) sum_pass_amount,
        (SELECT count(proc_status)
			  FROM t_prod_proc
			  WHERE prod_order_lot = ? AND proc_id = ? AND proc_status = '3e') status
 FROM t_prod_proc
 WHERE prod_order_lot = ? AND proc_id = ?
`;


// 생산작업을 위한 생산공정 조회
const selectProdProcList =`
SELECT 
        prod_proc_id,
        employee_id(employee_id) employee_id,
        proc_order_amount, 
        proc_input_amount, 
        proc_fail_amount, 
        proc_pass_amount, 
        DATE_FORMAT(proc_start_date, '%y/%m/%d %T') proc_start_date, 
        DATE_FORMAT(proc_end_date, '%y/%m/%d %T') proc_end_date,
        sub_code(proc_status) proc_status
 FROM t_prod_proc
 WHERE prod_order_lot = ? AND proc_id = ?
`;
// lot번호를 통한 제품 가져오기
const selectProdOrderProdId =`
SELECT prod_id
FROM t_prod_order
WHERE prod_order_lot = ?
`;
// 생산공정Key를 위한 ID조회
const selectProdProcessId =`
SELECT prod_proc_id
FROM t_prod_proc
ORDER BY prod_proc_id DESC
LIMIT 1
`;

// 생산공정 등록
const insertProdProc =`
INSERT INTO t_prod_proc(
                        prod_proc_id,
                        prod_order_lot,
                        proc_id,
                        employee_id,
                        proc_order_amount,
                        proc_input_amount,
                        proc_status)
VALUES(?, ?, ?, ?, ?, ?, '1e');
`;
// 공정등록 시 생산지시 상태변경
const updateOrderStatuss =`
UPDATE t_prod_order
SET order_status = '4d'
WHERE prod_order_lot = ?
`;

// startTime 업데이트
const updateStartTime =`
UPDATE t_prod_proc
SET proc_start_date = sysdate(),
    proc_status = '2e'
WHERE prod_proc_id = ?
`;
// endTime 업데이트
const updateEndTime =`
UPDATE t_prod_proc
SET proc_end_date = sysdate(),
    proc_status = '3e',
    ?
WHERE prod_proc_id = ?
`;
// prod_order_lot정보를 가지고 prod_id를 가져와야함.
const selectOrderProdId =`
SELECT prod_id
FROM t_prod_order
WHERE prod_order_lot = ?
LIMIT 1
`;

// 공정상태 확인 후 공정 완료처리
const selectProdProcStatus =`
SELECT proc_status
FROM t_prod_proc
WHERE prod_order_lot = ?
`;

module.exports = {
  selectProdProcess,
  selectProdProcFlowInfo,
  selectProdProcList,
  selectProdOrderProdId,
  selectProdProcessId,
  insertProdProc,
  updateStartTime,
  updateEndTime,
  selectSumProdProcList,
  selectOrderProdId,
  updateOrderStatuss,
}