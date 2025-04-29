// 기준관리 sql
// mate.js

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

module.exports = {
  selectMate,
  insertMate,
  updateMate,
  deleteMate,
}