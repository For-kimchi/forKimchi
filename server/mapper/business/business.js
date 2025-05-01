// 영업 sql
// business.js

// 주문
const selectLastOrder =
  `SELECT order_id
FROM t_order
ORDER BY order_id DESC
LIMIT 1
`;

const selectLastOrderDetail =
  `SELECT order_detail_id
FROM t_order_detail
ORDER BY order_detail_id DESC
LIMIT 1
`;

const insertOrder =
  `INSERT INTO t_order
(order_id, order_date, order_final_status, vendor_id, employee_id, reg_date, manager_id, confirm_date, memo)
VALUES
(?, ?, '1a', ?, ?, CURRENT_TIMESTAMP, null, null, null)`;

const insertOrderDetail =
  `INSERT INTO t_order_detail
(order_detail_id, order_id, prod_id, order_amount, deliv_due_date, order_status, memo)
VALUES
(?, ?, ?, ?, ?, '1z', null)
`;

// 납품
const selectDelivTarget =
  `SELECT ORDD.order_detail_id,
 ORDD.order_id,
 ORDD.prod_id,
 ORD.vendor_id,
 VE.vendor_name,
 PR.prod_name,
 order_amount,
 deliv_due_date,
 order_status,
 ORDD.memo
FROM t_order_detail ORDD
JOIN t_order ORD ON ORDD.order_id = ORD.order_id
JOIN t_prod PR ON ORDD.prod_id = PR.prod_id
JOIN t_vendor VE ON ORD.vendor_id = VE.vendor_id
AND deliv_due_date BETWEEN ? AND ?
ORDER BY deliv_due_date 
`;



//WHERE order_status = '4z' 나중에 데이터 있으면 필요한 조건

module.exports = {
  selectLastOrder,
  selectLastOrderDetail,
  insertOrder,
  insertOrderDetail,
  selectDelivTarget,
}