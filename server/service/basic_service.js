const mariaDB = require('../mapper/mapper');
const {
  convertObjToQuery, convertObjToQueryLike
} = require('../utils/converts');

// 제품 조건 조회
const getProd = async (params) => {
  let count = Object.keys(params).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
    }

    keyword = convertObjToQueryLike(params, selected);
  } else {
    keyword = {};
  }

  let list = await mariaDB.query("selectProd", keyword);
  return list;
};

// 거래처 조건 조회
const getVendor = async (params) => {
  let count = Object.keys(params).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
    }

    keyword = convertObjToQueryLike(params, selected);
  } else {
    keyword = {};
  }

  let list = await mariaDB.query("selectVendor", keyword);
  return list;
};

// 자재 조건 조회
const getMate = async (params) => {
  let count = Object.keys(params).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
    }

    keyword = convertObjToQueryLike(params, selected);
  } else {
    keyword = {};
  }

  let list = await mariaDB.query("selectMate", keyword);
  return list;
};

// 공정 조건 조회
const getProc = async (params) => {
  let count = Object.keys(params).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
    }

    keyword = convertObjToQueryLike(params, selected);
  } else {
    keyword = {};
  }

  let list = await mariaDB.query("selectProc", keyword);
  return list;
};

// BOM
// BOM 조회
const getBom = async (params) => {
  let param = params.prod_id;
  let bomList = await mariaDB.query("selectBom", param);
  let bom = bomList[0];

  if (bom.bom_id) {

    let bomDetailList = await mariaDB.query("selectBomDetail", bom.bom_id);

    bom.bom_detail = bomDetailList;
  }

  return bom;
};

// ProcFlow
// ProcFlow 조회
const getProcFlow = async (params) => {
  let param = params.prod_id;
  let procFlowList = await mariaDB.query("selectProcFlow", param);
  let procFlow = procFlowList[0];

  if (procFlow.proc_flow_id) {

    let procFlowDetailList = await mariaDB.query("selectProcFlowDetail", procFlow.proc_flow_id);

    procFlow.flow_detail = procFlowDetailList;
  }

  return procFlow;
};

// 코드 조회
const getCode = async (mainCode) => {
  let list = await mariaDB.query("selectCode", mainCode);
  return list;
}

module.exports = {
  getProd,
  getVendor,
  getMate,
  getProc,
  getBom,
  getProcFlow,
  getCode,
}