const selectPmo =
`
select prod_order_lot,
	     plan_detail_id,
       prod_id(prod_id) prod_name,
       date_type(order_date) order_date,
       order_amount,
       employee_id(employee_id) employee_id,
       sub_code(order_status) order_status,
       prod_id
from t_prod_order
WHERE order_status in ('2d','3d')
ORDER BY order_date DESC;
`;

const selectPmoOne =
`
SELECT 
bd.mate_id,
mate_amount,
mate_name,
mate_unit,
mate_type,
sub_code_name,
IFNULL((SELECT
SUM(mate_stock_amount) 
FROM t_mate_stock
WHERE mate_id = bd.mate_id 
GROUP BY mate_id), 0) mate_stock_amount
FROM t_bom b
JOIN t_bom_detail bd ON b.bom_id = bd.bom_id
JOIN t_mate m ON bd.mate_id = m.mate_id
JOIN t_sub_code sc ON m.mate_type = sc.sub_code
WHERE b.bom_status = '1t'
AND prod_id = ?
`;

const updatePmo =
`
UPDATE t_prod_order
SET order_status = ?
WHERE prod_order_lot = ?
`;

const selectLastPmo = 
`SELECT pmo_id
FROM t_prod_mate_order
ORDER BY pmo_id DESC
LIMIT 1`;

const insertPmo = 
`INSERT INTO t_prod_mate_order
(pmo_id, prod_order_lot, inbound_date, employee_id, inbound_status, memo)
VALUES
(?, ?, CURRENT_TIMESTAMP, ?, 'N', null)
`;

const selectLastPmh = 
`SELECT pmh_id
FROM t_prod_mate_hold
ORDER BY pmh_id DESC
LIMIT 1`;

const selectMateStock = 
`SELECT mate_lot, mate_stock_amount 
FROM t_mate_stock
WHERE mate_id = ?
AND mate_stock_amount > 0
ORDER BY mate_lot;
`;

const insertPmh = 
`INSERT INTO t_prod_mate_hold
(pmh_id, pmo_id, mate_lot, mate_id, hold_amount, memo, hold_status)
VALUES
(?, ?, ?, ?, ?, null, 'N');
`;

const selectLastPmu = 
`SELECT pmu_id
FROM t_prod_mate_used
ORDER BY pmu_id DESC
LIMIT 1`;

const insertPmu = 
`
CALL insert_prod_mate_used(?, ?, ?, ?, ?)
`;

module.exports = {
  selectPmo,
  selectPmoOne,
  updatePmo,
  selectLastPmo,
  insertPmo,
  selectLastPmh,
  selectMateStock,
  insertPmh,
  selectLastPmu,
  insertPmu,
}