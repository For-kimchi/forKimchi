// <자재입고> //

// storeKey
const storePlanKey = 
`SELECT inbound_id
FROM t_mate_inbound
ORDER BY inbound_id DESC
LIMIT 1`;

// storeDetailKey
const storeDetailKey =
`SELECT inbound_detail_id
FROM t_mate_inbound_detail
ORDER BY inbound_detail_id DESC
LIMIT 1`;

// store_id 조회
const storeCode = 
``



// 자재입고조회(입고일자,입고번호,거래처,사용자명,품목수,비고,수정일,수정자)


// 자재입고 상세조회


// 발주서입고등록(저장버튼 클릭시)
const insertStoreMain =
`INSERT INTO t_mate_inbound( inbound_id
                            , req_id
							               ,employee_id
							               ,inbound_date
                             ,vendor_id
                             ,memo)
VALUES(?, ?, ?, SYSDATE(), ?, '')`;

// 자재입고상세등록(저장버튼 클릭시)
const insertStoreDetail = 
`INSERT INTO t_mate_inbound_detail(
                                    inbound_detail_id,
                                    inbound_id,
                                    mate_id
                                    ,inbound_amount
                                    ,inbound_status
                                    ,memo)
VALUES (?, ?,?, ?, '1p', ?)`;

// 자재입고삭제


// 자재입고상세삭제


// 자재입고수정


// 자재입고 상세수정


module.exports = {
  insertStoreMain,
  insertStoreDetail,
  storePlanKey,
  storeDetailKey,
}