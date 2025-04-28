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
 WHERE prod_id`;

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
 WHERE bom_id`;

// BOM
// BOM 등록
const insertBom =
  `INSERT INTO t_bom 
 (bom_id, prod_id, employee_id, )
 VALUES
 (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

// BOM 상세 등록

// BOM 갱신

// BOM 상세 갱신

// BOM 삭제

// BOM 상세 삭제

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

// 자재 갱신

// 자재 삭제

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

// 공정 갱신

// 공정 삭제

// 공정 흐름도 조회
const selectProcFlow =
  `SELECT bom_id,
        prod_id,
        employee_id,
        reg_date,
        bom_status
 FROM t_bom
 WHERE prod_id`;

 // 공정 흐름도 상세 조회

 // 공정 흐름도 등록

 // 공정 흐름도 상세 등록

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
FROM t_equip
`;

module.exports = {
  selectProd,
  insertProd,
  updateProd,
  deleteProd,
  selectBom,
  selectBomDetail,

  selectEquip,
}
