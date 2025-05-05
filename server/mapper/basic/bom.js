// 기준관리 sql
// bom.js

// BOM
// BOM 조회
const selectBom =
  `SELECT bom_id,
        prod_id,
        employee_id,
        reg_date,
        bom_status
 FROM t_bom
 WHERE prod_id = ?
 AND bom_status = '1t'`;

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
const deleteBomDetail =
`DELETE FROM t_bom_detail
WHERE bom_detail_id = ?`;

// BOM 비활성화
const updateBomStatus =
  `UPDATE t_bom
SET bom_status = '2t'
WHERE prod_id = ?`;

// 최근 BOM 조회
const selectLastBom =
`SELECT bom_id
FROM t_bom
ORDER BY bom_id DESC
LIMIT 1`;

// 최근 BOM 상세 조회회
const selectLastBomDetail =
`SELECT bom_detail_id
FROM t_bom_detail
ORDER BY bom_detail_id DESC
LIMIT 1`;


module.exports = {
  selectBom,
  selectBomDetail,
  insertBom,
  insertBomDetail,
  updateBom,
  updateBomDetail,
  deleteBom,
  deleteBomDetail,
  updateBomStatus,
  selectLastBom,
  selectLastBomDetail,
}