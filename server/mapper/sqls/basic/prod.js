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
 prod_unit)
 VALUES
 (?, ?, ?, ?, ?)`;

// 제품 갱신
const updateBasicProd =
  `UPDATE t_prod
 SET ?
 WHERE prod_id = ?`;

// 제품 삭제
const deleteProd =
  `DELETE FROM t_prod
 WHERE prod_id = ?`;

 // 최근 제품 조회
 const selectLastProd =
  `SELECT prod_id
FROM t_prod
ORDER BY prod_id DESC
LIMIT 1`;


module.exports = {
  selectProd,
  insertProd,
  updateBasicProd,
  deleteProd,
  selectLastProd,
}