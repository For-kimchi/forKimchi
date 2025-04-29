// 기준관리 sql
// etc.js

// 창고 조회
const selectWarehouse =
  `SELECT warehouse_id,
warehouse_name,
warehouse_type,
warehouse_addr
FROM t_warehouse`;

// 설비 조회
const selectEquip =
  `SELECT equip_id,
equip_name,
equip_type
FROM t_equip`;

// 코드 조회
const selectCode =
  `SELECT sub_code,
sub_code_name
FROM t_sub_code 
WHERE main_code = ?`;

module.exports = {
  selectWarehouse,
  selectEquip,
  selectCode,
}