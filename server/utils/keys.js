// 최초 제품/자재 ID 생성 시간정보없는애들 키
// 제품 : P, 자재 : M
const getFirstUniqueId = (prefix) => {
  return `${prefix}-001`;
}
// 최신키 매개변수로 추가
const getNextUniqueId = (uniqueId) => {
  const parts = uniqueId.split('-');
  if (parts.length < 2) {
    throw new Error('형식이 잘못되었습니다. "AAA-001" 형식이어야 합니다.');
  }

  const prefix = parts[0]; // 'AAA'
  const number = parts[1]; // '001'

  let num = parseInt(number, 10);
  if (isNaN(num)) {
    throw new Error('마지막 부분이 숫자가 아닙니다.');
  }
  num += 1;
  let newNumber = String(num).padStart(number.length, '0');

  return `${prefix}-${newNumber}`;
}

// 최초 Key ID 생성
// LOT 생성 시 제품ID, 자재ID 전달
const getFirstKeyId = (prefix) => {
  // 오늘 날짜 구하기 (yyyymmdd)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}${mm}${dd}`;

  return `${prefix}-${todayStr}-001`;
}

// 다음 key ID 생성
const getNextKeyId = (keyId) => {
  const parts = keyId.split('-');
  if (parts.length < 3) {
    throw new Error('형식이 잘못되었습니다. "AAA-yyyymmdd-001" 형식이어야 합니다.');
  }

  const prefix = parts[0]; // 'AAA'
  const originalDate = parts[1]; // 'yyyymmdd'
  const number = parts[2]; // '001'

  // 오늘 날짜 구하기 (yyyymmdd)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}${mm}${dd}`;

  let newNumber;
  if (originalDate === todayStr) {
    // 날짜가 같으면 번호 +1
    let num = parseInt(number, 10);
    if (isNaN(num)) {
      throw new Error('마지막 부분이 숫자가 아닙니다.');
    }
    num += 1;
    newNumber = String(num).padStart(number.length, '0');
  } else {
    // 날짜가 다르면 번호 리셋 (001)
    newNumber = '001';
  }

  return `${prefix}-${todayStr}-${newNumber}`;
}

module.exports = {
  getFirstUniqueId,
  getNextUniqueId,
  getFirstKeyId,
  getNextKeyId,
}