// 기준관리 sql
// basic.js

// 제품
// 제품 조건 조회
const selectProd =
  `SELECT prod_id
        prod_type,
        prod_name,
        prod_size,
        prod_unit,
        memo
 FROM t_prod
 WHERE 1=1
 :searchKeyword
 ORDER BY prod_id`;

// 제품 등록
const insertProd =
  `INSERT INTO t_prod 
 (prod_id, 
 prod_type, 
 prod_name, 
 prod_size, 
 prod_unit, 
 prod_pack_size, 
 prod_pack_unit, 
 expired_date_size, 
 expired_date_unit, 
 prod_min_qunatity, 
 memo)
 VALUES
 (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

// 제품 갱신
const updateProd =
  `UPDATE t_prod
 SET ?
 WHERE prod_id = ?`;

// 제품 삭제
const deleteProd =
  `DELETE FROM t_prod
 WHERE prod_id = ?`;

// BOM 조회
const selectBom =
  `SELECT bom_id,
        prod_id,
        employee_id,
        reg_date,
        bom_status
 FROM t_bom
 WHERE prod_id = ?`;

// BOM 상세 조회
const selectBomDetail =
  `SELECT bd.bom_detail_id,
        bd.bom_id,
        bd.mate_id,
        bd.mate_amount,
        ma.mate_unit
 FROM t_bom_detail bd 
 JOIN t_mate ma
 ON bd.mate_id = ma.mate_id
 WHERE bd.bom_id = ?`;

// BOM
// BOM 등록
const insertBom =
  `INSERT INTO t_bom 
 (bom_id, prod_id, employee_id, reg_date, bom_status)
 VALUES
 (?, ?, ?, CURRENT_TIMESTAMP, '1t')`;

// BOM 상세 등록
const insertBomDetail =
  `INSERT INTO t_bom_detail
 (bom_detail_id, bom_id, mate_id, mate_amount)
 VALUES
 (?, ?, ?, ?)`;

// BOM 갱신
const updateBom =
  `UPDATE t_bom
SET ?
WHERE bom_id = ?`;

// BOM 상세 갱신
const updateBomDetail =
  `UPDATE t_bom_detail
SET ?
WHERE bom_detail_id = ?`;

// BOM 삭제
const deleteBom =
  `DELETE FROM t_bom
WHERE bom_id = ?`;

// BOM 상세 삭제
`DELETE FROM t_bom_detail
WHERE bom_detail_id = ?`;

// 자재
// 자재 조건 조회
const selectMate =
  `SELECT mate_id
        mate_name,
        mate_unit,
        mate_min_quality,
        mate_type
 FROM t_mate
 WHERE 1=1
 :searchKeyword
 ORDER BY mate_id`;

// 자재 등록
const insertMate =
  `INSERT INTO t_mate
(mate_id, mate_name, mate_unit, mate_min_quantity, mate_type)
VALUES
(?, ?, ?, ?, ?)`;

// 자재 갱신
const updateMate =
  `UPDATE t_mate
SET ?
WHERE mate_id = ?`;

// 자재 삭제
const deleteMate =
  `DELETE FROM t_mate
WHERE mate_id = ?`;

// 공정
// 공정 조건 조회
const selectProc =
  `SELECT proc_id
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

// 공정 흐름도 상세 갱신

// 공정 흐름도 삭제

// 공정 흐름도 상세 삭제

// 사원
// 사원 조건 조회

// 사원 등록

// 사원 갱신

// 사원 삭제

//거래처
// 거래처 조건 조회

// 거래처 등록

// 거래처 갱신

// 거래처 삭제

// 창고 조회

// 설비 조회
const selectEquip =
  `SELECT equip_id,
equip_name,
equip_type
FROM t_equip`;

module.exports = {
  selectProd,
  insertProd,
  updateProd,
  deleteProd,
  selectBom,
  selectBomDetail,

  selectEquip,
}