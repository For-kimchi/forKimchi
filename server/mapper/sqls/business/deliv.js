// 영업 sql
// deliv.js

// 납품
const selectDelivTarget =
  `
  SELECT DEL.* FROM 
  (SELECT ORDD.order_detail_id,
 ORDD.order_id,
 ORDD.prod_id,
 ORD.vendor_id,
 VE.vendor_name,
 PR.prod_name,
 ORDD.order_amount,
(ORDD.order_amount - PRD_DELIV(ORDD.order_detail_id)) remain_amount,
 ORDD.deliv_due_date,
 ORDD.order_status,
 ORDD.memo
FROM t_order_detail ORDD
LEFT JOIN t_order ORD ON ORDD.order_id = ORD.order_id
LEFT JOIN t_prod PR ON ORDD.prod_id = PR.prod_id
LEFT JOIN t_vendor VE ON ORD.vendor_id = VE.vendor_id
WHERE deliv_due_date BETWEEN ? AND ?
AND ORDD.order_status = '2z'
) DEL
WHERE remain_amount > 0
ORDER BY deliv_due_date
`;
//WHERE order_status = '4z' 나중에 데이터 있으면 필요한 조건

const selectDelivProdTarget =
  `SELECT A.*,
p.prod_name,
w.warehouse_name
FROM (
SELECT 
pw.prod_lot,
pw.warehouse_id,
pw.prod_id,
pw.prod_amount,
(pw.prod_amount - IFNULL(SUM(dd.deliv_amount), 0)) remain_amount,
pw.inbound_date
FROM t_prod_warehouse pw
LEFT JOIN t_deliv_detail dd
ON pw.prod_lot = dd.prod_lot AND pw.warehouse_id = dd.warehouse_id
WHERE pw.prod_id = ?
GROUP BY pw.prod_lot, pw.warehouse_id
) A 
JOIN t_prod p ON A.prod_id = p.prod_id
JOIN t_warehouse w ON A.warehouse_id = w.warehouse_id
WHERE A.remain_amount > 0
ORDER BY prod_lot, warehouse_id
`;
//기존에 납품된 수량으로 입고수량과 비교해야 함

const selectLastDeliv =
  `SELECT deliv_id
FROM t_deliv
ORDER BY deliv_id DESC
LIMIT 1`;

const insertDeliv =
  `INSERT INTO t_deliv
(deliv_id, order_detail_id, deliv_status, deliv_date, employee_id, memo)
VALUES
(?, ?, '2b', CURRENT_TIMESTAMP, ?, ?)`;

const selectLastDelivDetail =
  `SELECT deliv_detail_id
FROM t_deliv_detail
ORDER BY deliv_detail_id DESC
LIMIT 1`;

const insertDelivDetail =
  `INSERT INTO t_deliv_detail
(deliv_detail_id, deliv_id, prod_lot, warehouse_id, prod_id, deliv_amount, memo)
VALUES
(?, ?, ?, ?, ?, ?, ?)`;

const updatePlotStatus =
  `UPDATE t_prod_warehouse
SET lot_status = ?
WHERE prod_lot = ?`;

const selectDeliv =
  `SELECT deliv_id,
        d.order_detail_id,
        deliv_status,
        deliv_date,
        o.vendor_id,
        v.vendor_name,
        d.employee_id,
        e.employee_name,
        d.memo,
        od.order_amount,
        PRD_DELIV(od.order_detail_id) deliv_total_amount
 FROM t_deliv d
 LEFT JOIN t_order_detail od ON d.order_detail_id = od.order_detail_id
 LEFT JOIN t_order o ON od.order_id = o.order_id
 LEFT JOIN t_vendor v ON o.vendor_id = v.vendor_id
 LEFT JOIN t_employee e ON d.employee_id = e.employee_id
 WHERE 1=1
 :searchKeyword
 ORDER BY deliv_id DESC`;

const selectDelivDetail =
  `SELECT deliv_detail_id,
        deliv_id,
        prod_lot,
        dd.prod_id,
        p.prod_name,
        deliv_amount,
        dd.memo
 FROM t_deliv_detail dd
 JOIN t_prod p ON dd.prod_id = p.prod_id
 WHERE deliv_id = ?
 ORDER BY deliv_detail_id DESC`;

const insertProdWarehouse =
  `
 CALL insert_prod_warehouse(?, ?, ?, ?, ?, ?)
 `;

 // TEST

const selectProdWarehouseLot =
  `
SELECT A.*,
p.prod_name,
w.warehouse_name
FROM (
SELECT 
pw.prod_lot,
pw.warehouse_id,
pw.prod_id,
pw.prod_amount,
(pw.prod_amount - IFNULL(SUM(dd.deliv_amount), 0)) remain_amount,
pw.inbound_date
FROM t_prod_warehouse pw
LEFT JOIN t_deliv_detail dd
ON pw.prod_lot = dd.prod_lot AND pw.warehouse_id = dd.warehouse_id
GROUP BY pw.prod_lot, pw.warehouse_id
) A 
JOIN t_prod p ON A.prod_id = p.prod_id
JOIN t_warehouse w ON A.warehouse_id = w.warehouse_id
WHERE A.remain_amount > 0
ORDER BY prod_lot, warehouse_id
  `;

const selectProdWarehouseGroup =
  `
SELECT 
A.warehouse_id,
w.warehouse_name,
A.prod_id,
p.prod_name,
SUM(A.prod_amount) total_prod_amount,
SUM(A.remain_amount) total_remain_amount
FROM (
SELECT 
pw.prod_lot,
pw.warehouse_id,
pw.prod_id,
pw.prod_amount,
(pw.prod_amount - IFNULL(SUM(dd.deliv_amount), 0)) remain_amount,
pw.inbound_date
FROM t_prod_warehouse pw
LEFT JOIN t_deliv_detail dd
ON pw.prod_lot = dd.prod_lot AND pw.warehouse_id = dd.warehouse_id
GROUP BY pw.prod_lot, pw.warehouse_id
) A 
JOIN t_prod p ON A.prod_id = p.prod_id
JOIN t_warehouse w ON A.warehouse_id = w.warehouse_id
WHERE A.remain_amount > 0
GROUP BY prod_id, warehouse_id
ORDER BY prod_id
  `;

module.exports = {
  selectDelivTarget,
  selectDelivProdTarget,
  selectLastDeliv,
  insertDeliv,
  selectLastDelivDetail,
  insertDelivDetail,
  updatePlotStatus,
  selectDeliv,
  selectDelivDetail,
  insertProdWarehouse,
  selectProdWarehouseLot,
  selectProdWarehouseGroup,
}