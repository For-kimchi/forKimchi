const mariaDB = require('../mapper/mapper');
const keys = require('../utils/keys');
const converts = require('../utils/converts');
const accounts = require('../utils/accounts');
const argon2 = require('argon2');

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

// 제품 등록
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

// 거래처 등록
const postVendor = async (body) => {

  console.log(body);

  let result;
  if (body.vendor_id) {

    result = await mariaDB.query("updateVendor", [body, body.vendor_id]);

  } else {

    let last = await mariaDB.query("selectLastVendor", {});
    let lastId = last[0].vendor_id;

    let newId = keys.getNextUniqueId(lastId);

    body.vendor_id = newId;

    let column = ['vendor_id', 'vendor_name', 'vendor_number', 'vendor_tel', 'vendor_addr', 'vendor_type'];
    let arrayParam = converts.convertObjToAry(body, column);

    result = await mariaDB.query("insertVendor", arrayParam);

  }

  return result;
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

// 자재 등록
const postMate = async (body) => {

  console.log(body);

  let result;
  if (body.mate_id) {

    result = await mariaDB.query("updateBasicMate", [body, body.mate_id]);

  } else {

    let last = await mariaDB.query("selectLastMate", {});
    let lastId = last[0].mate_id;

    let newId = keys.getNextUniqueId(lastId);

    body.mate_id = newId;

    let column = ['mate_id', 'mate_name', 'mate_unit', 'mate_type'];
    let param = converts.convertObjToAry(body, column);

    result = await mariaDB.query("insertMate", param);

  }

  return result;
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

// 공정 등록
const postProc = async (body) => {

  console.log(body);

  let result;
  if (body.proc_id) {

    result = await mariaDB.query("updateProc", [body, body.proc_id]);

  } else {

    let last = await mariaDB.query("selectLastProc", {});
    let lastId = last[0].proc_id;

    let newId = keys.getNextUniqueId(lastId);

    body.proc_id = newId;

    let column = ['proc_id', 'proc_name', 'proc_type'];
    let param = converts.convertObjToAry(body, column);

    result = await mariaDB.query("insertProc", param);

  }

  return result;
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

  let res = {
    success: true,
  };

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

      console.log(result);
  
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
  
      return res;
    } catch (err) {
      // error 발생 시 console 출력 및 rollback
      console.log(err);
      if (conn) conn.rollback();

      res.success = false;
      
      return res;
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

  let procFlow;
  if (procFlowList.length > 0) {

    procFlow = procFlowList[0];

    if (procFlow.proc_flow_id) {

      let procFlowDetailList = await mariaDB.query("selectProcFlowDetail", procFlow.proc_flow_id);
  
      procFlow.flow_details = procFlowDetailList;
    }

  } else {

    procFlow = {
      prod_id: params.prod_id,
      flow_details: [],
    }

  }

  return procFlow;
};

const postProcFlow = async (body) => {

  let res = {
    success: true,
  };

  try {
      conn = await mariaDB.getConnection();
      await conn.beginTransaction();
  
      console.log(body);
  
      const {
        flow_details,
        ...procFlow
      } = body;

      let selectedSql = await mariaDB.selectedQuery('updateProcFlowStatus', procFlow.prod_id);
      let result = await conn.query(selectedSql, procFlow.prod_id);
      
      console.log(result);
  
      selectedSql = await mariaDB.selectedQuery('selectLastProcFlow', {});
      let lastItem = await conn.query(selectedSql, {});
      let lastKey = lastItem[0].proc_flow_id;
  
      let newKey = keys.getNextUniqueId(lastKey);
      procFlow.proc_flow_id = newKey;
  
      let column = ['proc_flow_id', 'prod_id', 'employee_id'];
      let param = converts.convertObjToAry(procFlow, column);
  
      selectedSql = await mariaDB.selectedQuery('insertProcFlow', param);
      result = await conn.query(selectedSql, param);
  
      console.log(result);
  
      column = ['proc_flow_detail_id', 'proc_flow_id', 'proc_id', 'proc_seq'];
  
      selectedSql = await mariaDB.selectedQuery('selectLastProcFlowDetail', {});
      lastItem = await conn.query(selectedSql, {});
      lastKey = lastItem[0].proc_flow_detail_id;
  
      for (let i = 0; i < flow_details.length; i++) {
        
        newKey = keys.getNextUniqueId(lastKey);
        flow_details[i].proc_flow_detail_id = newKey;
        flow_details[i].proc_flow_id = procFlow.proc_flow_id;
        flow_details[i].proc_seq = i + 1; 
  
        param = converts.convertObjToAry(flow_details[i], column);
  
        let selectedSql = await mariaDB.selectedQuery('insertProcFlowDetail', param);
        result = await conn.query(selectedSql, param);
  
        console.log(result);
  
        lastKey = newKey;
      }
  
      // 정상 완료 시 commit
      conn.commit();
      
      return res;
    } catch (err) {
      // error 발생 시 console 출력 및 rollback
      console.log(err);
      if (conn) conn.rollback();

      res.success = false;

      return res;
    } finally {
      // connection 반환
      if (conn) conn.release();
    }
}

// 사원 조건 조회
const getEmp = async (params) => {
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

  let list = await mariaDB.query("selectEmployee", keyword);
  return list;
};

// 사원 등록
const postEmp = async (body) => {

  let res = {
    success: true,
    employee: {},
  }

  let list = await mariaDB.query("selectLogin", body.employee_email);
  let item = list[0];

  if (item && body.employee_id !== item.employee_id) {
    res.success = false;
    return res;
  }

  let result;
  if (body.employee_id) {

    result = await mariaDB.query("updateEmployee", [body, body.employee_id]);

    if (result.affectedRows > 0) {
      return res;
    } else {
      res.success = false;
      return res;
    }
  } else {

    let last = await mariaDB.query("selectLastEmp", {});
    let lastId = last[0].employee_id;

    let newId = keys.getNextUniqueId(lastId);

    body.employee_id = newId;

    const tempPassword = accounts.generateTempPassword();
    const hashedPassword = await argon2.hash(tempPassword);

    body.employee_pwd = hashedPassword;

    let column = ['employee_id', 'employee_email', 'employee_pwd', 'employee_name', 'employee_dept', 'employee_type','employee_status', 'employee_tel'];
    let param = converts.convertObjToAry(body, column);

    result = await mariaDB.query("insertEmployee", param);

    if (result.affectedRows > 0) {
      await accounts.sendTempPasswordEmail(body.employee_email, tempPassword);
      return res;
    } else {
      res.success = false;
      return res;
    }
  }
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
  postVendor,
  getMate,
  postMate,
  getProc,
  postProc,
  getBom,
  postBom,
  getProcFlow,
  postProcFlow,
  getEmp,
  postEmp,
  getCode,
}