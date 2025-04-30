// 기준관리 sql
// vendor.js

//거래처
// 거래처 조건 조회
const selectVender =
`SELECT t_vendor
vendor_name,
vendor_number,
vendor_manager_name,
vendor_manager_tel,
vendor_tel,
vendor_addr,
vendor_type
FROM t_vendor
WHERE 1=1
:searchKeyword
ORDER BY vender_id`;

// 거래처 등록
const insertVendor =
`INSERT INTO t_vendor
(vendor_name,
vendor_number,
vendor_manager_name,
vendor_manager_tel,
vendor_tel,
vendor_addr,
vendor_type)
VALUES
(?, ?, ?, ?, ? ,? ,?)`;

// 거래처 갱신
const updateVendor = 
`UPDATE t_vendor
SET ?
WHERE vendor_id = ?`;

// 거래처 삭제
const deleteVendor =
`DELETE t_vendor
WHERE vendor_id = ?`;

module.exports = {
  selectVender,
  insertVendor,
  updateVendor,
  deleteVendor,
}