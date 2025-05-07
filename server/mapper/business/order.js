// 영업 sql
// order.js

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
(?, ?, '1a', ?, ?, CURRENT_TIMESTAMP, null, null, ?)`;

const insertOrderDetail =
  `INSERT INTO t_order_detail
(order_detail_id, order_id, prod_id, order_amount, deliv_due_date, order_status, memo)
VALUES
(?, ?, ?, ?, ?, '1z', null)
`;

const selectOrders =
  `SELECT order_id,
        order_date,
        order_final_status,
        o.vendor_id,
        v.vendor_name,
        employee_id,
        reg_date,
        manager_id,
        confirm_date,
        memo
 FROM t_order o 
 JOIN t_vendor v ON o.vendor_id = v.vendor_id
 WHERE 1=1
 :searchKeyword
 ORDER BY order_id DESC`;

 const selectOrderDetail =
  `SELECT order_detail_id,
        order_id,
        prod_id,
        order_amount,
        deliv_due_date,
        order_status,
        memo
 FROM t_order_detail
 WHERE order_id = ?`;

 const updateOrderStatus = 
 `UPDATE t_order
 SET order_final_status = ?
 WHERE order_id = ?`;

 const updateOrderDetailStatus = 
 `UPDATE t_order_detail
 SET order_status = ?
 WHERE order_detail_id = ?`;

module.exports = {
  selectLastOrder,
  selectLastOrderDetail,
  insertOrder,
  insertOrderDetail,
  selectOrders,
  selectOrderDetail,
  updateOrderStatus,
  updateOrderDetailStatus,
}