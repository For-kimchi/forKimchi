const nodemailer = require('nodemailer');
const crypto = require('crypto');

function generateTempPassword(length = 10) {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

const transporter = nodemailer.createTransport({
  service: 'gmail', // 또는 사용 중인 SMTP 서비스
  auth: {
    user: 'msk6516@gmail.com',
    pass: 'fbcd vxtg qalx hdbj'
  },
});

async function sendTempPasswordEmail(to, tempPassword) {
  return transporter.sendMail({
    from: '"관리자" <your.email@gmail.com>',
    to,
    subject: '사원 등록 - 임시 비밀번호 안내',
    html: `<p>임시 비밀번호는 <strong>${tempPassword}</strong> 입니다.<br/>로그인 후 반드시 비밀번호를 변경해 주세요.</p>`,
  });
}

module.exports = {
  generateTempPassword,
  sendTempPasswordEmail,
}