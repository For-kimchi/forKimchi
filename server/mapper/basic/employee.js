// 기준관리 sql
// employee.js

// 사원
// 사원 조건 조회
const selectEmployee =
  `SELECT employee_id,
        employee_email,
        employee_name,
        employee_dept,
        employee_type,
        employee_status,
        employee_tel,
        employee_date,
 FROM t_employee
 WHERE 1=1
 :searchKeyword
 ORDER BY employee_id`;

// 사원 등록
const insertEmployee =
  `INSERT INTO t_employee
(employee_id, employee_email, employee_pwd, employee_name, employee_dept, employee_type, employee_status, employee_tel, employee_date)
VALUES
(?, ? , ?, ?, ?, ?, '1k', ?, CURRENT_TIMESTAMP)`;

// 사원 갱신
const updateEmployee =
  `UPDATE t_employee
SET ?
WHERE employee_id = ?`;

// 사원 삭제
const deleteEmployee =
  `DELETE FROM t_employee
WHERE employee_id = ?`;

module.exports = {
  selectEmployee,
  insertEmployee,
  updateEmployee,
  deleteEmployee
}