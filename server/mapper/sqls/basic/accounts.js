// 기준관리 sql
// accounts.js

const selectLogin =
  `SELECT employee_id,
        employee_pwd,
        employee_name,
        employee_email,
        sub_code(employee_dept) dept_name,
        sub_code(employee_type) type_name,
        sub_code(employee_status) status_name
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