// 기준관리 sql
// prod.js

// 제품
// 제품 조건 조회
const selectProd =
  `SELECT prod_id,
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

module.exports = {
  selectProd,
  insertProd,
  updateProd,
  deleteProd,
}