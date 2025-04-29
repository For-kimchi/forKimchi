// 자재수입검사관리 조회
const mate_dropdown = 
`select mate_name
from t_mate_warehouse join t_mate`;

const selectQuality = 
`select date_type(quality_date) quality_date, mate_name, mate_lot,  quality_result 
from t_mate 
join t_mate_warehouse 
join t_quality_mate 
join t_quality_mate_detail`;

// 자재검사상세 단건   검사일자	항목	규격	방법	검사결과	상태
const quality_detail =
`select date_type(quality_date) quality_date ,option_name, option_standard, option_spec, option_method
from t_quality_option 
join t_quality_mate 
join t_mate_warehouse
WHERE mate_lot= '?'`

// 자재수입검사관리 등록


module.exports = {
  selectQuality,
  quality_detail,
  mate_dropdown,
};