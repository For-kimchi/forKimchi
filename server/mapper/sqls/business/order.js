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

const selectOrder =
  `SELECT order_id,
        order_date,
        order_final_status,
        o.vendor_id,
        v.vendor_name,
        o.employee_id,
        e.employee_name,
        reg_date,
        manager_id,
        em.employee_name manager_name,
        confirm_date,
        memo
 FROM t_order o 
 LEFT JOIN t_vendor v ON o.vendor_id = v.vendor_id
 LEFT JOIN t_employee e ON o.employee_id = e.employee_id
 LEFT JOIN t_employee em ON o.manager_id = em.employee_id
 WHERE 1=1
 :searchKeyword
 ORDER BY order_id DESC`;

 const selectOrderDetail =
  `SELECT order_detail_id,
        order_id,
        od.prod_id,
        p.prod_name,
        order_amount,
        deliv_due_date,
        order_status,
        od.memo
 FROM t_order_detail od
 JOIN t_prod p ON od.prod_id = p.prod_id
 WHERE order_id = ?`;

 const updateOrderStatus = 
 `UPDATE t_order
 SET order_final_status = ?,
 manager_id = ?,
 confirm_date = CURRENT_TIMESTAMP
 WHERE order_id = ?`;

 const updateOrderDetailStatus = 
 `UPDATE t_order_detail
 SET order_status = ?
 WHERE order_detail_id = ?`;

 const selectOrderOne = 
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
 WHERE order_id = ?
 `;

 const updateOrder = 
 `UPDATE t_order
 SET ?
 WHERE order_id = ?`;

 const updateOrderDetail = 
 `UPDATE t_order_detail
 SET ?
 WHERE order_detail_id = ?`;

 const deleteOrder = 
 `DELETE FROM t_order
WHERE order_id = ?
 `;

 const deleteOrderDetail =
 `DELETE FROM t_order_detail
WHERE order_detail_id = ?
 `;

  const deleteOrderDetailAll =
 `DELETE FROM t_order_detail
WHERE order_id = ?
 `;

module.exports = {
  selectLastOrder,
  selectLastOrderDetail,
  insertOrder,
  insertOrderDetail,
  selectOrder,
  selectOrderDetail,
  updateOrderStatus,
  updateOrderDetailStatus,
  selectOrderOne,
  updateOrder,
  updateOrderDetail,
  deleteOrder,
  deleteOrderDetail,
  deleteOrderDetailAll,
}