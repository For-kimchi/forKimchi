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
`;

const insertPmh = 
`INSERT INTO t_prod_mate_hold
(pmh_id, pmo_id, mate_lot, mate_id, hold_amount, memo, hold_status)
VALUES
(?, ?, ?, ?, ?, null, 'N');
`;

module.exports = {
  selectLastPmo,
  insertPmo,
  selectLastPmh,
  selectMateStock,
  insertPmh,
}