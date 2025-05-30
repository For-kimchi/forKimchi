const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');
const keys = require('../utils/keys');

// let conn;
//     try{
//                 conn = await mariaDB.getConnection();
//                 await conn.beginTransaction();
                
//                 conn.commit();
//     }catch(err){
//         if(conn) conn.rollback();
//     }finally{
//         if(conn) conn.release();
//     }

// 생산지시 전체조회
const selectProdOrderList = async()=>{
 let list = await mariaDB.query('selectOrders');
 return list;
};
// 생산지시등록을 위한 계획 조회
const selectProdPlanDetailList = async()=>{
    let list = await mariaDB.query('selectPlanDetail');
    return list;
};
// 생산계획을 통한 생산지시 조회
const selectProdOrderInfoList = async(planDtId) =>{
    let list = await mariaDB.query('selectplanOrderInfo', planDtId);
    return list;
};
// 생산지시리스트
const selectProdOrderLists = async() =>{
    let list = await mariaDB.query('selectProdOrderList');
    return list;
};
// 생산지시자재 요청내역
const selectProdMateList = async() =>{
    let list = await mariaDB.query('selectProdMate');
    return list;
};
// 생산지시자재 BOM
const selectProdBomList = async(prodid) =>{
    // prod_name = prod_id
    // selectedSql = await mariaDB.selectedQuery('selectProdName', prodid);
    let prodId = await mariaDB.query('selectProdName', prodid);
    prodId = prodId[0].prod_id;
    
    // selectedSql = await mariaDB.selectedQuery('selectBomsBomDetail', prodId);
    let result = await mariaDB.query('selectBomsBomDetail', prodId);
    return result;
    // let conn;
    // try{
    //     conn = await mariaDB.getConnection();
    //     await conn.beginTransaction();
    //     conn.commit();
    // }catch(err){
    //     if(conn) conn.rollback();
    // }finally{
    //     if(conn) conn.release();
    // }
};

// 생산지시 등록
const insertProdOrder = async(prodOrder) =>{

    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();

        // 생산지시 중 상세계획 상태변경
        selectedSql = await mariaDB.selectedQuery('updatePlanDetailStatus', prodOrder.plan_detail_id);
        let status = await conn.query(selectedSql, prodOrder.plan_detail_id);

        // 최근LOT 조회
        selectedSql = await mariaDB.selectedQuery('selectProdOrderLimit', {});
        let lastLot = await conn.query(selectedSql, {});
        
        // prod_id 변환
        let prodName = prodOrder.prod_id
        selectedSql = await mariaDB.selectedQuery('selectProdOrderName', prodName);
        let prodId = await conn.query(selectedSql, prodName);
        prodId = prodId[0].prod_id;
        let lastOrderLot = lastLot[0].prod_order_lot;
        let newOrderLot = keys.getNextKeyId(lastOrderLot);
        
        // 생성된 키를 포함하여 등록.
        prodOrder.prod_order_lot = newOrderLot;
        prodOrder.prod_id = prodId;
        let cloumn = ['plan_detail_id', 'prod_order_lot', 'prod_id', 'order_date', 'order_amount'];
        let convert = converts.convertObjToAry(prodOrder, cloumn);
        selectedSql = await mariaDB.selectedQuery('insertProdOrderInfo', convert);
        let result = await conn.query(selectedSql, convert);

        conn.commit();
        return result;
    }catch(err){
        if(conn) conn.rollback();
        console.log(err);
    }finally{
        if(conn) conn.release();
    }
};

// 생산지시 승인 생산지시모두가 승인이 된다면 생산계획은 생산계획완료로 상태가 변경되야함.
const orderCheck = async(orderCheck) =>{
    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        
        let plan_detail_id = orderCheck[0].plan_detail_id;
        delete orderCheck[0].plan_detail_id;
        for(let check of orderCheck){
            let param = [check.employee_id, check.prod_order_lot];
            selectedSql = await mariaDB.selectedQuery('updateProdOrderBtn', param);
            let lastPlan = await conn.query(selectedSql, param);
            
        }
        selectedSql = await mariaDB.selectedQuery('prodPlanOrderStatusInfo', plan_detail_id);
        result = await conn.query(selectedSql, plan_detail_id);
        

        conn.commit();
        return result;
    }catch(err){
        if(conn) conn.rollback();
    }finally{
        if(conn) conn.release();
    }
};

// 생산공정
// 생산공정을 위한 지시 조회 selectProdProcess
const selectProdProcess = async() =>{
    let list = await mariaDB.query('selectProdProcess');
    return list;
};
// 공정흐름도 조회 + 공정수
const selectProdProcFlowInfo = async(prodLot) =>{
    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        
        // 이름을 넣어서 id를 구함.
        selectedSql = await mariaDB.selectedQuery('selectOrderProdId', prodLot);
        let prodId = await conn.query(selectedSql, prodLot);

         // prod_id 처리
        prodId =  prodId[0].prod_id;
        // prod_id + prod_order_lot 합치기
        
        // 공정흐름도 조회
        selectedSql = await mariaDB.selectedQuery('selectProdProcFlowInfo', prodId);
        let Info = await conn.query(selectedSql, prodId);

        // 반복문 공정 합계
        let sumList = [];
       for(let procFlow of Info){
            let params = [prodLot, procFlow.proc_id, prodLot, procFlow.proc_id];
            // 각 합계 구하기
            selectedSql = await mariaDB.selectedQuery('selectSumProdProcList', params);
            let list = await conn.query(selectedSql, params);
            sumList.push(list[0]);
        };

        // 한 행처럼 보이도록 결과물 합치기
        let result =[];

        for(let idx in Info){
            result[idx] = {...Info[idx], ...sumList[idx] };
        }
        // 공정상태구분 프로시저 임시변수 저장
        selectedSql = await mariaDB.selectedQuery('selectProcStatus', prodLot);
        let list = await conn.query(selectedSql, prodLot);
        // 프로시저 호출
        selectedSql = await mariaDB.selectedQuery('selectProceduresStatus', prodLot);
        list = await conn.query(selectedSql, prodLot);
        // 0번쨰 배열에 살짝 끼워넣기ㅎㅎ
        result[0].type = list[0].type;
        result[0].num = list[0].num;
        // result.push();
        conn.commit();
        return result;
    }catch(err){
        if(conn) conn.rollback();
    }finally{
        if(conn) conn.release();
    }
};
// 생산공정 조회 조건 = 생산lot + 공정ID
const selectProdProcInfo = async(lot) =>{
    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();

        let lotInfo = [lot.lot, lot.prodId];

        selectedSql = await mariaDB.selectedQuery('selectProdProcList', lotInfo);
        let result = await conn.query(selectedSql, lotInfo);
        conn.commit();
        return result;
    }catch(err){
        if(conn) conn.rollback();
    }finally{
        if(conn) conn.release();
    }
};
// 생산 공정 등록 insertProdProcList 모든 공정을 확인하고 공정상태가 다 끝이 났다면 공정완료
const insertProdProcList = async(procList) =>{
     let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        let result;
        // lot번호를 통해서 상태변경
        let lot = [procList[0].prod_order_lot];
        selectedSql = await mariaDB.selectedQuery('updateOrderStatuss', lot);
        result = await conn.query(selectedSql, lot);

        // for문
        for(let prodProc of procList){
            // prodProcId 생성
            selectedSql = await mariaDB.selectedQuery('selectProdProcessId');
            let prodProcId = await conn.query(selectedSql);

            // 생산공정ID 생성 후 변수저장
            prodProcId = prodProcId[0].prod_proc_id;
            let newProcId = keys.getNextKeyId(prodProcId);
            prodProc.prod_proc_id = newProcId;
            let emp = [];
            // employee_id 변환 selectEmployeeId
            emp.push(prodProc.employee_id);
            
            selectedSql = await mariaDB.selectedQuery('selectEmployeeNameChange', emp);
            emp = await conn.query(selectedSql, emp);
            emp = emp[0].employee_id;
            prodProc.employee_id = emp;
            

            // convert employee_id 추가해야함.
            let cloumn = ['prod_proc_id', 'prod_order_lot', 'proc_id', 'employee_id', 'proc_order_amount', 'input_amount'];
            let convert = converts.convertObjToAry(prodProc, cloumn);

            // 실제 등록
            selectedSql = await mariaDB.selectedQuery('insertProdProc', convert);
            result = await conn.query(selectedSql, convert);
            };
            
            conn.commit();
            return result;
            }catch(err){
                if(conn) conn.rollback();
                console.log(err);
            }finally{
                if(conn) conn.release();
            }
};
// 공정 시작시간 업데이트 updateStartTime
const updateStartTime = async(param) =>{
    let list = await mariaDB.query('updateStartTime', param);
    return list;
};
// 공정 종료결과 업데이트 updateEndTime
const updateEndTime = async(param, procId) =>{
     let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        let lot = param.prod_order_lot;
        let procType = [];
        delete param.prod_order_lot;
        procType.push(param.proc_type);
        
        sqlectedSQL = await mariaDB.selectedQuery('selectSubCodeName', procType);
        procType = await conn.query(sqlectedSQL, procType);
        procType = procType[0].sub_code;
        
        let proc_status = '';
        delete param.proc_type;
        // 공정타입이 검사공정이라면
        if(procType === '2g'){
            proc_status = '4e';
        }else{
            proc_status = '3e';
        }
        param.proc_status = proc_status;
        let list = [param, procId];
        
        selectedSql = await mariaDB.selectedQuery('updateEndTime', list);
        let prodProcId = await conn.query(selectedSql, list);

        sqlectedSQL = await mariaDB.selectedQuery('selectProdProcStatus', lot);
        let result = await conn.query(sqlectedSQL, lot);

        conn.commit();
        return result;
        }catch(err){
            if(conn) conn.rollback();
        }finally{
            if(conn) conn.release();
        }
};
module.exports = {
    selectProdOrderList,
    selectProdPlanDetailList,
    selectProdOrderInfoList,
    insertProdOrder,
    selectProdMateList,
    selectProdOrderLists,
    selectProdBomList,
    selectProdProcess,
    selectProdProcFlowInfo,
    selectProdProcInfo,
    insertProdProcList,
    updateStartTime,
    updateEndTime,
    orderCheck,
}