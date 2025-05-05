const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys');
const converts = require('../utils/converts')

// 제품 조건 조회
const getProd = async (params) => {
  let count = Object.keys(params).length;
  let keyword;
  if (count > 0) {
    let selected = [];
    for (let i = 0; i < (count - 1); i++) {
      selected.push('AND ');
    }

    keyword = converts.convertObjToQueryLike(params, selected);
  } else {
    keyword = {};
  }

  let list = await mariaDB.query("selectProd", keyword);
  return list;
};

const postProd = async (body) => {

  console.log(body);

  let result;
  if (body.prod_id) {

    result = await mariaDB.query("updateProd", [body, body.prod_id]);

  } else {

    let lastProd = await mariaDB.query("selectLastProd", {});
    let lastProdId = lastProd[0].prod_id;

    let newProdId = keys.getNextUniqueId(lastProdId);

    body.prod_id = newProdId;

    let prodColumn = ['prod_id', 'prod_type', 'prod_name', 'prod_size', 'prod_unit'];
    let prodParam = converts.convertObjToAry(body, prodColumn);

    result = await mariaDB.query("insertProd", prodParam);

  }

  return result;
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

    keyword = converts.convertObjToQueryLike(params, selected);
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

    keyword = converts.convertObjToQueryLike(params, selected);
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

    keyword = converts.convertObjToQueryLike(params, selected);
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
  
  console.log(bomList);

  let bom;
  if (bomList.length > 0) {
    
    bom = bomList[0];

    if (bom.bom_id) {
  
      let bomDetailList = await mariaDB.query("selectBomDetail", bom.bom_id);
  
      bom.bom_details = bomDetailList;
    }
  } else {
    bom = {
      prod_id: params.prod_id,
      bom_details: [],
    }
  }

  return bom;
};

const postBom = async (body) => {

  try {
      conn = await mariaDB.getConnection();
      await conn.beginTransaction();
  
      console.log(body);
  
      const {
        bom_details,
        ...bom
      } = body;

      let selectedSql = await mariaDB.selectedQuery('updateBomStatus', bom.prod_id);
      let result = await conn.query(selectedSql, bom.prod_id);
  
      selectedSql = await mariaDB.selectedQuery('selectLastBom', {});
      let lastItem = await conn.query(selectedSql, {});
      let lastKey = lastItem[0].bom_id;
  
      let newKey = keys.getNextUniqueId(lastKey);
      bom.bom_id = newKey;
  
      let column = ['bom_id', 'prod_id', 'employee_id'];
      let param = converts.convertObjToAry(bom, column);
  
      selectedSql = await mariaDB.selectedQuery('insertBom', param);
      result = await conn.query(selectedSql, param);
  
      console.log(result);
  
      column = ['bom_detail_id', 'bom_id', 'mate_id', 'mate_amount'];
  
      selectedSql = await mariaDB.selectedQuery('selectLastBomDetail', {});
      lastItem = await conn.query(selectedSql, {});
      lastKey = lastItem[0].bom_detail_id;
  
      for (let detail of bom_details) {
        
        newKey = keys.getNextUniqueId(lastKey);
        detail.bom_detail_id = newKey;
        detail.bom_id = bom.bom_id;
  
        param = converts.convertObjToAry(detail, column);
  
        let selectedSql = await mariaDB.selectedQuery('insertBomDetail', param);
        result = await conn.query(selectedSql, param);
  
        console.log(result);
  
        lastKey = newKey;
      }
  
      // 정상 완료 시 commit
      conn.commit();
  
      return result;
    } catch (err) {
      // error 발생 시 console 출력 및 rollback
      console.log(err);
      if (conn) conn.rollback();
    } finally {
      // connection 반환
      if (conn) conn.release();
    }

}

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
  postProd,
  getVendor,
  getMate,
  getProc,
  getBom,
  postBom,
  getProcFlow,
  getCode,
}