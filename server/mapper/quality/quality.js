// 자재수입검사관리 조회
//드롭다운
const mate_dropdown =
`select mate_lot from t_mate_warehouse`;

const selectQuality =
`select date_type(quality_date) quality_date, mate_name, mate_lot, sub_code_name,
case
	when quality_result = '1r' then '입고'
    when quality_result = '2r' then '대기'
    end AS result
from t_mate
join t_mate_warehouse
join t_quality_mate
join t_quality_mate_detail d
join t_sub_code s on d.quality_result = s.sub_code`;

// 자재검사상세 단건   검사일자	항목	규격	방법	검사결과	상태
const quality_detail =
`select date_type(quality_date) quality_date ,option_name, option_standard, option_spec, sub_code_name, 
case
	when quality_result = '1r' then '합격'
    when quality_result = '2r' then '검사대기'
    end AS quality_result
from t_quality_option 
join t_quality_mate 
join t_quality_mate_detail d
join t_sub_code s on d.quality_result = s.sub_code
join t_mate_warehouse
`

// 자재수입검사관리 등록


module.exports = {
  selectQuality,
  quality_detail,
  mate_dropdown,
};