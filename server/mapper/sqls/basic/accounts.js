// 기준관리 sql
// accounts.js

const selectLogin =
  `SELECT employee_id,
        employee_email,
        employee_pwd,
        employee_name,
        employee_dept,
        employee_type,
        employee_status,
        employee_tel,
        employee_date
 FROM t_employee
 WHERE employee_email = ?`;

 const updatePwd = 
 `UPDATE t_employee
 SET employee_pwd = ?
 WHERE employee_email = ?
 `;

module.exports = {
  selectLogin,
  updatePwd,
}