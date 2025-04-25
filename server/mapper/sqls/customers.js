// mapper/sql/cutomers.js
// 쿼리문 입력하고 const타입으로 저장
// 전체조회
const selectAll = `select  id,
		                       name,
		                       email,
                           phone,
                           address
                   from customers
                   order by id`;
// 단건조회
const selectById =
`SELECT id,
        name,
        email,
        phone,
        address
 FROM customers
 WHERE id= ?`;
// 입력한 쿼리문을 exports하기위해 추가.
// 여기에 들어가지않으면 public라고 생각하고 없으면 private라고 생각하면됨
// 등록
const insertInfo =
`INSERT INTO customers(name, email, phone, address)
VALUES (?,?,?,?)` // 배열로값을 넘겨줘야함.


// set절은 객체
// SET name = 'H', address = 'daegu'
// {name:'H', address:'daegu'}
// where절은 배열 [객체, 단일값]
// 수정
const updateInfo =
`UPDATE customers
SET ?
WHERE id = ?`; 

// 삭제
const deleteInfo =
`DELETE FROM customers
WHERE id = ?`;

/*

  1) ? 갯수
  1-1) 1개 : 단일 값
  1-2) 2개 이상 : 배열

  2) ? 앞에 컬럼의 유무
  2-1) 컬럼이 존재하는 경우 기본 데이터값(문자, 숫자, 날짜)
  2-2) 컬럼이 없는 경우 객체

*/
module.exports = {
  selectAll,
  selectById,
  insertInfo,
  updateInfo,
  deleteInfo,
}