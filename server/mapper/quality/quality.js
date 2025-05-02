// 자재검사요청 (요청) [자재ID, 자재이름, 입고수량,비고]
const mateQualityReq = 
`
SELECT 
    distinct md.mate_id, 
    mate_name, 
    inbound_amount, 
    memo
FROM 
    t_mate_inbound_detail md join t_mate m
`;

// 자재검사요청 (대기) [자재ID, 자재이름, 기준치, ]
const mateQualityWait = 
`
SELECT DISTINCT
	m.mate_id,q.option_id,  q.option_name, q.option_standard
FROM 
	t_mate_inbound_detail m JOIN
    t_quality_mate_detail tq JOIN
    t_quality_option q ON(tq.option_id = q.option_id) JOIN
	t_mate mt
    where m.mate_id= ?
`;

// 자재검사조회 (드롭다운)
const qualityViewDropDown =
`select mate_id
from t_mate_inbound_detail JOIN t_quality_mate`;

// 자재수입검사조회
const qualityViewAll =
`SELECT DISTINCT
        date_type(quality_date) quality_date,
        d.mate_id,
        mate_name,
        sub_code(quality_result) result
 FROM t_mate JOIN t_mate_inbound_detail d
			 JOIN t_quality_mate
			 JOIN t_quality_mate_detail`;

// 자재수입검사조회 (상세)
const qualityViewDetail = 
`SELECT DISTINCT
        date_type(quality_date) quality_date,
        q.option_id,
		q.option_name,
		q.option_standard,
        sub_code(quality_result) result
 FROM t_mate_inbound_detail d JOIN t_mate e ON (e.mate_id = d.mate_id)
			 JOIN t_quality_mate
             JOIN t_quality_option q
			 JOIN t_quality_mate_detail
 WHERE d.mate_id = ?
`;

// // 자재수입검사조회 상세
// const qualityViewdetail =
// `select date_type(quality_date) quality_date ,option_name, option_standard, option_spec, sub_code_name, 
// case
// 	when quality_result = '1r' then '합격'
//     when quality_result = '2r' then '검사대기'
//     end AS quality_result
// from t_quality_option 
// join t_quality_mate 
// join t_quality_mate_detail d
// join t_sub_code s on d.quality_result = s.sub_code
// join t_mate_warehouse`

// // 자재수입검사관리 (검사요청)
// const qualityMatecontrol = 
// `select i.req_id, mate_name, td.mate_id, mate_lot
// from t_mate_inbound_detail td
// join t_mate tm on (tm.mate_id = td.mate_id)
// join t_mate_warehouse
// join t_mate_inbound i
// join t_mate_req_detail r on (i.req_id = r.req_id)
// join t_mate_req`

// // 자재수입검사관리 (검사대기)
// const qualityMatedetail =
// `select req_id ,date_type(quality_date) quality_date ,option_name, option_standard, option_spec, sub_code_name, 
// case
// 	when quality_result = '1r' then '합격'
//     when quality_result = '2r' then '검사대기'
//     end AS quality_result
// from t_quality_option 
// join t_quality_mate 
// join t_mate_inbound
// join t_quality_mate_detail d
// join t_sub_code s on d.quality_result = s.sub_code
// join t_mate_warehouse
// where req_id = ?`

module.exports = {
     mateQualityReq,
     mateQualityWait,
     qualityViewDropDown,
     qualityViewAll,
     qualityViewDetail,
};