// 자재검사요청 (요청)
const mateQualityReq = 
`
SELECT 
	inbound_detail_id,
    inbound_id,
    mate_id,
    mate_id(mate_id) mate_name,
    inbound_amount,
    sub_code (inbound_status) inbound_status,
    memo
FROM t_mate_inbound_detail
WHERE inbound_status = '1p'
ORDER BY inbound_detail_id
`;
// 자재검사요청 (대기-상세)
const mateQualityWait = 
`
SELECT 
	qo.option_id,
    qo.option_name,
    qo.option_standard,
    qo.option_method
FROM t_mate_inbound_detail id
JOIN t_quality_std qs ON id.mate_id = qs.target_id
JOIN t_quality_std_detail qsd ON qs.std_id = qsd.std_id
JOIN t_quality_option qo ON qsd.option_id = qo.option_id
WHERE inbound_status = '1p'
AND inbound_detail_id = ?
`;
// 검사결과 최종반영
const mateQualityInsert =
`
INSERT INTO t_quality_mate
(
quality_id,
inbound_detail_id,
quality_date,
quality_final_result,
quality_type,
quality_amount,
quality_pass_amount,
quality_fail_amount
)
VALUES
(?, ?, CURRENT_TIMESTAMP, ?, '1w', 10, 20, 30)
`;
// 검사대기 항목 검사 후 상태 변경
const updateMateQuality =
`
UPDATE t_quality_mate_detail
SET quality_result = ?
WHERE option_id = ?
AND quality_detail_id = ?
`;
// 검사완료된 항목 상태값 변경
const updateMate = 
`
UPDATE t_mate_inbound_detail
SET inbound_status = '2p'
WHERE inbound_detail_id = ?
`;
// 검사상세 결과값
const mateWaitInsert =
`
INSERT INTO t_quality_mate_detail
(quality_detail_id, quality_id, option_id, quality_result_value, quality_result)
VALUES
(?, ?, ?, ?, ?)
`;
// 자재검사조회 (드롭다운)
const mateQualityViewDropDown =
`
select 
      mate_id
 from 
      t_mate_inbound_detail t JOIN 
      t_quality_mate m on (t.inbound_detail_id = m.inbound_detail_id)
      group by mate_id
`;
// 자재수입검사조회
const mateQualityViewAll =
`
SELECT DISTINCT
	q.inbound_detail_id,
    q.quality_id,
    md.mate_id,
    mate_id(md.mate_id) mate_name,
    q.quality_amount,
    q.quality_pass_amount,
    q.quality_fail_amount,
	sub_code(quality_final_result) final_result
FROM 
	t_quality_mate q join
    t_mate_inbound_detail md  on(q.inbound_detail_id = md.inbound_detail_id)
ORDER BY
	inbound_detail_id DESC
`;
// 자재수입검사조회 (상세)
const mateQualityViewDetail = 
`
SELECT DISTINCT
	m.option_id, 
    option_name, 
    option_standard,
    quality_result_value,
    sub_code(m.quality_result) result
FROM 
	t_quality_mate t join
    t_quality_mate_detail m on (t.quality_id = m.quality_id)join
    t_quality_option o on (m.option_id = o.option_id)
where m.quality_id= ?
`;
// key
const selectLastmateQuality = 
`
SELECT quality_id
FROM t_quality_mate
ORDER BY quality_id DESC
LIMIT 1
`;
// 상세 key
const selectLastmateQualityDetail = 
`SELECT quality_detail_id
FROM t_quality_mate_detail
ORDER BY quality_detail_id DESC
LIMIT 1
`;
//-----------------------------------------------------------------------------

// 제품검사요청 (요청)  --- 공정상태 추후 t_sub_code  E : 4e 생성시 코드변경
const prodQualityReq = 
`
SELECT 
	prod_order_lot,
	prod_proc_id,
	proc_id,
	prod_id,
    prod_id (prod_id) prod_name,
	proc_input_amount
FROM
	t_prod_proc
WHERE
    proc_status = '4e'
ORDER BY prod_order_lot
`;

// 제품검사요청 (대기-상세)
const prodQualityWait = 
`
SELECT 
	qo.option_id,
    qo.option_name,
    qo.option_standard,
    qo.option_method
FROM t_prod_proc pp
JOIN t_quality_std qs ON pp.prod_id = qs.target_id
JOIN t_quality_std_detail qsd ON qs.std_id = qsd.std_id
JOIN t_quality_option qo ON qsd.option_id = qo.option_id
WHERE pp.proc_status = '4e'
AND pp.prod_proc_id = ?;
`;

const prodQualityInsert =
`
INSERT INTO t_quality_prod
(
quality_id,
prod_proc_id,
quality_date,
quality_final_result,
quality_type,
quality_amount,
quality_pass_amount,
quality_fail_amount
)
VALUES
(?, ?, CURRENT_TIMESTAMP, '1x', '1w', 10, 20, 30)
`;

// 검사상세 결과값
const prodWaitInsert =
`
INSERT INTO t_quality_prod_detail
(quality_detail_id, quality_id, option_id, quality_result_value, quality_result)
VALUES
(?, ?, ?, ?, ?)
`;
// 제품검사조회 (드롭다운)
const prodQualityViewDropDown =
`select distinct t.prod_id 
from t_prod_proc t JOIN t_quality_prod m on (t.prod_proc_id = m.prod_proc_id)`;

// 제품검사조회
const prodQualityViewAll =
`
select 
	tqp.prod_proc_id,
    tqp.quality_id,
    prod_id(tpp.prod_id) prod_name,
    tpp.prod_id,
    tqp.quality_amount,
    tqp.quality_pass_amount,
    tqp.quality_fail_amount,
    sub_code(tqp.quality_final_result) final_result
from
	t_prod_proc tpp join t_quality_prod tqp on (tpp.prod_proc_id = tqp.prod_proc_id)
order by tqp.prod_proc_id
`;

// 제품검사조회 (상세)
const prodQualityViewDetail = 
`SELECT DISTINCT
	m.option_id, 
    option_name, 
    option_standard,
    quality_result_value,
    sub_code(m.quality_result) result
FROM 
	t_quality_prod t join
    t_quality_prod_detail m on (t.quality_id = m.quality_id)join
    t_quality_option o on (m.option_id = o.option_id)
where m.quality_id= ?
`;

// 검사완료된 항목 상태값 변경 - 검사 합격 시
const updateProd = 
`
UPDATE t_prod_proc
SET proc_status = '3e'
WHERE prod_proc_id = ?
`;

// key
const selectLastProdQuality = 
`SELECT quality_id
FROM t_quality_prod
ORDER BY quality_id DESC
LIMIT 1`;
// 상세 key
const selectLastProdQualityDetail = 
`SELECT quality_detail_id
FROM t_quality_prod_detail
ORDER BY quality_detail_id DESC
LIMIT 1`;
// --------------------------------------------------

// // 검사항목조회
// const selectOption =
// `SELECT 
//         option_id, 
//         option_name, 
//         option_standard, 
//         option_method
//  FROM t_quality_option
//  WHERE 1=1
//  :searchKeyword
//  ORDER BY option_id
// `;
// // 검사항목관리
// const optionListInsert = 
// `
// INSERT INTO t_quality_option (option_id, option_name, option_standard, option_method)
// VALUES(?, ?, ?, ?);
// `; 
// // 검사항목갱신
// const updateOption = 
// `UPDATE t_quality_option
//  SET ?
//  WHERE option_id = ?`;

// const selectLastOption =
// `SELECT option_id
// FROM t_quality_option
// ORDER BY option_id DESC
// LIMIT 1`;

// 검사항목 조회
const selectOption =
`
SELECT 
	option_id, 
    option_name, 
    option_standard,
    option_operator,
    option_method
FROM
	t_quality_option
WHERE 1=1
:searchKeyword
`;

// 검사항목 추가
const insertOption =
`
INSERT INTO t_quality_option 
(option_id, option_name, option_standard, option_operator, option_method)
VALUES(?, ?, ?, ?, ?)
`;

// 검사항목 갱신
const updateOption =
`
UPDATE t_quality_option
SET ?
WHERE option_id = ?
`;

// 검사항목의 마지막 option_id 조회
const selectLastOption =
`
SELECT option_id
FROM t_quality_option
ORDER BY option_id DESC
LIMIT 1
`;
// 검사항목 삭제
const deleteOption = 
`
DELETE FROM t_quality_option
WHERE option_id = ?
`;

// ----------------------------------------------------------------
// 검사기준 조회
const selectOptionControl =
`
SELECT 
		tqs.target_id,
        tqsd.option_id, 
        tqo.option_name, 
        tqo.option_standard,
        tqo.option_method
 FROM t_quality_std tqs JOIN t_quality_std_detail tqsd ON (tqs.std_id = tqsd.std_id) JOIN
	  t_quality_option tqo ON (tqsd.option_id = tqo.option_id)
 WHERE 1=1
 :searchKeyword
 ORDER BY tqs.target_id
`;

// 검사기준 추가
const insertOptionControl =
`
INSERT INTO t_quality_option 
(option_id, option_name, option_standard, option_method)
VALUES(?, ?, ?, ?)
`;

// 검사기준 갱신
const updateOptionControl =
`
UPDATE t_quality_option
SET option_id=?, option_name=?, option_standard=?, option_method=?
WHERE option_id = ?
`;

// 검사기준의 마지막 option_id 조회
const selectLastOptionControl =
`
SELECT option_id
FROM t_quality_option
ORDER BY option_id DESC
LIMIT 1
`;
// 검사기준 삭제
const deleteOptionControl = 
`
DELETE FROM t_quality_option
WHERE option_id = ?
`;

//검사기준관리
//검사기준조회
const selectStd =
`SELECT std_id,
        std_type,
        target_id
FROM t_quality_std
WHERE std_status = '1bb' 
AND target_id = ?
`;


//검사기준상세조회
const selectStdDetail =
`SELECT
        qsd.std_detail_id,
        qo.option_id,
        qo.option_name,
        qo.option_standard,
        qo.option_operator
FROM t_quality_std_detail qsd
JOIN t_quality_option qo ON qsd.option_id = qo.option_id
WHERE qsd.std_id = ?
`;

const updateStdStatus =
`UPDATE t_quality_std
SET std_status = '2bb'
WHERE target_id = ?
`;

const selectLastStd = 
`SELECT std_id
FROM t_quality_std
ORDER BY std_id DESC
LIMIT 1
`;

const insertStd = 
`
INSERT INTO t_quality_std
(std_id, std_type, target_id, std_status)
VALUES
(?, ?, ?, '1bb')
`;

const selectLastStdDetail = 
`SELECT std_detail_id
FROM t_quality_std_detail
ORDER BY std_detail_id DESC
LIMIT 1
`;

const insertStdDetail = 
`
INSERT INTO t_quality_std_detail
(std_detail_id, std_id, option_id)
VALUES
(?, ?, ?)
`;

module.exports = {
    // 자재
     mateQualityReq,
     mateQualityInsert,
     mateQualityWait,
     mateQualityViewDropDown,
     mateQualityViewAll,
     mateQualityViewDetail,
     selectLastmateQuality,
     selectLastmateQualityDetail,
     mateWaitInsert,
     updateMateQuality,
     updateMate,
    // 제품
     prodQualityReq,
     prodQualityWait,
     prodQualityViewDropDown,
     prodQualityViewAll,
     prodQualityViewDetail,
     selectLastProdQuality,
     selectLastProdQualityDetail,
     prodQualityInsert,
     prodWaitInsert,
     updateProd,
    // 검사항목관리
     selectOption,
     insertOption,
     updateOption,
     selectLastOption,
     deleteOption,
     // 검사기준관리
     selectOptionControl,
     insertOptionControl,
     updateOptionControl,
     selectLastOptionControl,
     deleteOptionControl,
     selectStd,
     selectStdDetail,
     updateStdStatus,
     selectLastStd,
     insertStd,
     selectLastStdDetail,
     insertStdDetail,
};