// 기준관리 sql
// proc.js

// 공정
// 공정 조건 조회
const selectProc =
  `SELECT proc_id,
        proc_name,
        proc_type
 FROM t_proc
 WHERE 1=1
 :searchKeyword
 ORDER BY proc_id`;

// 공정 등록
const insertProc =
  `INSERT INTO t_proc
(proc_id, proc_name, proc_type)
VALUES
(?, ?, ?)`;

// 공정 갱신
const updateProc =
  `UPDATE t_proc
SET ?
WHERE proc_id = ?`;

// 공정 삭제
const deleteProc =
  `DELETE FROM t_proc
WHERE proc_id = ?`;

// 공정 흐름도 조회
const selectProcFlow =
  `SELECT proc_flow_id,
        prod_id,
        employee_id,
        reg_date,
        proc_flow_status
 FROM t_proc_flow
 WHERE prod_id = ?`;

// 공정 흐름도 상세 조회
const selectProcFlowDetail =
  `SELECT proc_flow_detail_id,
        proc_flow_id,
        proc_id,
        proc_seq
 FROM t_proc_flow_detail
 WHERE proc_flow_id = ?`;

// 공정 흐름도 등록
const insertProcFlow =
  `INSERT INTO t_proc_flow
(proc_flow_id, prod_id, employee_id, reg_date, proc_flow_status)
VALUES
(?, ?, ?, CURRENT_TIMESTAMP, '1v')`;

// 공정 흐름도 상세 등록
const insertProcFlowDetail =
  `INSERT INTO t_proc_flow_detail
(proc_flow_detail_id, proc_flow_id, proc_id, proc_seq)
VALUES
(?, ?, ?, CURRENT_TIMESTAMP, '1v')`;

// 공정 흐름도 갱신
const updateProcFlow =
  `UPDATE t_proc_flow
SET ?
WHERE proc_flow_id = ?`;

// 공정 흐름도 상세 갱신
const updateProcFlowDetail =
  `UPDATE t_proc_flow_detail
SET ?
WHERE proc_flow_detail_id = ?`;

// 공정 흐름도 삭제
const deleteProcFlow =
  `DELETE FROM t_proc_flow
WHERE proc_flow_id = ?`;

// 공정 흐름도 상세 삭제
const deleteProcFlowDetail =
  `DELETE FROM t_proc_flow_detail
WHERE proc_flow_detail_id = ?`;

module.exports = {
  selectProc,
  insertProc,
  updateProc,
  deleteProc,
  selectProcFlow,
  selectProcFlowDetail,
  insertProcFlow,
  insertProcFlowDetail,
  updateProcFlow,
  updateProcFlowDetail,
  deleteProcFlow,
  deleteProcFlowDetail,
}