const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys');
const converts = require('../utils/converts');
const accounts = require('../utils/accounts');
const argon2 = require('argon2');

// 제품 조건 조회
const login = async (body) => {

  let res = {
    success: true,
    employee: {},
  }

  let list = await mariaDB.query("selectLogin", body.employee_email);
  let item = list[0];

  if (item) {

    let check = await argon2.verify(item.employee_pwd, body.employee_pwd);

    if (check) {

      let {
        employee_pwd,
        ...info
      } = item;

      res.employee = info;

      return res;
    } else {
      res.success = false;
      return res;
    }

  } else {
    res.success = false;
    return res;
  }
};

const resetPwd = async (body) => {

  let res = {
    success: true,
    employee: {},
  }

  let list = await mariaDB.query("selectLogin", body.employee_email);
  let item = list[0];

  if (item) {

    const tempPassword = accounts.generateTempPassword();
    const hashedPassword = await argon2.hash(tempPassword);


    let result = await mariaDB.query("updatePwd", [ hashedPassword, body.employee_email]);

    if (result.affectedRows > 0) {
      await accounts.sendTempPasswordEmail(body.employee_email, tempPassword);
      
      return res;
    } else {
      res.success = false;
      return res;
    }
  } else {
    res.success = false;
    return res;
  }
}

const changePwd = async (body) => {

  let res = {
    success: true,
    employee: {},
  }

  let list = await mariaDB.query("selectLogin", body.employee_email);
  let item = list[0];

  if (item) {

    let check = await argon2.verify(item.employee_pwd, body.old_pwd);

    if (check) {
      const hashedPassword = await argon2.hash(body.new_pwd);

      let result = await mariaDB.query("updatePwd", [ hashedPassword, body.employee_email]);

      if (result.affectedRows > 0) {
        return res;
      } else {
        res.success = false;
        return res;
      }
    } else {
      res.success = false;
      return res;
    }
  } else {
    res.success = false;
    return res;
  }
}

module.exports = {
  login,
  resetPwd,
  changePwd,
}