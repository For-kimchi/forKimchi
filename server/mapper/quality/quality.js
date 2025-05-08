// 자재검사요청 (요청) [자재ID, 자재이름, 입고수량,비고]
const mateQualityReq = 
`
SELECT 
	inbound_detail_id,
    inbound_id,
    mate_id,
    mate_id(mate_id) mate_name,
    inbound_amount,
    pass_amount,
    fail_amount,
    date_type(expired_date) date,
    sub_code (inbound_status) inbound_status,
    memo
FROM t_mate_inbound_detail
`;

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
(?, ?, CURRENT_TIMESTAMP, '1x', '1w', 10, 20, 30)
`;

// 자재검사요청 (대기-상세) [자재ID, 자재이름, 기준치, ]
const mateQualityWait = 
`
SELECT 
	tqsd.option_id, option_name, option_standard
FROM
	t_mate_inbound_detail tmi LEFT JOIN 
	 t_quality_std tqs ON (tmi.mate_id = tqs.target_id) JOIN 
    t_quality_std_detail tqsd ON (tqs.std_id = tqsd.std_id) JOIN
	t_quality_option tqo ON (tqsd.option_id = tqo.option_id)
    WHERE tmi.mate_id = ?
`;

const mateWaitInsert =
`
INSERT INTO t_quality_mate_detail
(quality_detail_id, quality_id, option_id, quality_result_value, quality_result)
VALUES
(?, ?, ?, ?, '1r')
`;

// 자재검사조회 (드롭다운)
const mateQualityViewDropDown =
`select mate_id
from t_mate_inbound_detail t JOIN t_quality_mate m on (t.inbound_detail_id = m.inbound_detail_id)`;

// 자재수입검사조회
const mateQualityViewAll =
`
SELECT DISTINCT
	q.inbound_detail_id,
    q.quality_id,
    md.mate_id,
    mate_id(md.mate_id) mate_name,
	sub_code(quality_final_result) result
FROM 
	t_quality_mate q join
    t_mate_inbound_detail md  on(q.inbound_detail_id = md.inbound_detail_id)
ORDER BY
	quality_id DESC
`;

// 자재수입검사조회 (상세)
const mateQualityViewDetail = 
`SELECT DISTINCT
	m.option_id, 
    option_name, 
    option_standard, 
    sub_code(m.quality_result) result
FROM 
	t_quality_mate t join
    t_quality_mate_detail m on (t.quality_id = m.quality_id)join
    t_quality_option o on (m.option_id = o.option_id)
where m.quality_id= ?
`;
// key
const selectLastmateQuality = 
`SELECT quality_id
FROM t_quality_mate
ORDER BY quality_id DESC
LIMIT 1`;
// 상세 key
const selectLastmateQualityDetail = 
`SELECT quality_detail_id
FROM t_quality_mate_detail
ORDER BY quality_detail_id DESC
LIMIT 1`;
//-----------------------------------------------------------------------------

// 제품검사요청 (요청)
const prodQualityReq = 
`
SELECT
    quality_id, 
    m.mate_name, 
    inbound_amount, 
    memo
FROM 
	t_quality_mate q join
    t_mate_inbound_detail md  on(q.inbound_detail_id = md.inbound_detail_id) join
    t_mate m on(md.mate_id = m.mate_id)
`;

// 제품검사요청 (대기-상세)
const prodQualityWait = 
`
SELECT DISTINCT
	m.option_id, option_name, option_standard
FROM 
	t_quality_mate join
    t_quality_mate_detail m join
    t_quality_option o on (m.option_id = o.option_id)
where m.quality_id= ?
`;

// 제품검사조회 (드롭다운)
const prodQualityViewDropDown =
`select distinct t.prod_id 
from t_prod_proc t JOIN t_quality_prod m on (t.prod_proc_id = m.prod_proc_id)`;

// 제품수입검사조회
const prodQualityViewAll =
`
SELECT
    q.quality_id, 
    p.prod_name,
    sub_code(s.quality_result) result
FROM 
	t_quality_prod q join
    t_prod_proc md  on(q.prod_proc_id = md.prod_proc_id) join
    t_prod p on(md.prod_id = p.prod_id) join
    t_quality_prod_detail s on (q.quality_id = s.quality_id)
`;

// 제품수입검사조회 (상세)
const prodQualityViewDetail = 
`select DISTINCT
C.option_id, 
C.option_name, 
C.option_standard, 
sub_code(B.quality_result) result
from 
t_quality_prod A join 
t_quality_prod_detail B on (A.quality_id = B.quality_id) join
t_quality_option C on (B.option_id = C.option_id)
where A.quality_id= ?
`;


module.exports = {
     mateQualityReq,
     mateQualityInsert,
     mateQualityWait,
     mateQualityViewDropDown,
     mateQualityViewAll,
     mateQualityViewDetail,
     selectLastmateQuality,
     selectLastmateQualityDetail,
     mateWaitInsert,

     prodQualityViewDropDown,
     prodQualityViewAll,
     prodQualityViewDetail,
};