const express = require('express');
const router = express.Router();

const accountService = require('../service/account_service.js');

// 로그인 
router.post('/login', async (req, res) => {
  let body = req.body;
  let result = await accountService.login(body);
  res.send(result);
});

// 비밀번호 초기화
router.post('/resetPwd', async (req, res) => {
  let body = req.body;
  let result = await accountService.resetPwd(body);
  res.send(result);
});

// 비밀번호 변경
router.post('/changePwd', async (req, res) => {
  let body = req.body;
  let result = await accountService.changePwd(body);
  res.send(result);
});

module.exports = router;