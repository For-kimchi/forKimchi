// 오늘날짜 가져오기 (매개변수 없을떄)
// 있으면 데이터포맷
export function formatDate(dateString) {

  let date;

  if (dateString) {
    date = new Date(dateString);
  } else {
    date = new Date();
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateAfter(dateString, after) {

  let date;

  if (dateString) {
    date = new Date(dateString);
  } else {
    date = new Date();
  }

  date.setDate(date.getDate() + after);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;

}
// 상태값 변경 ID = NAME
export function codeToName(code, codeArray) {
  
  for (let item of codeArray) {
    if (item.sub_code == code) return item.sub_code_name;
  }

  return '';
}