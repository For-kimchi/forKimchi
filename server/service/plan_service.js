const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');
const keys = require('../utils/keys');

// 참고용 코드
// 트랜젝션 열고닫는거 컨트롤하는 코드.
// const proddtlist = async(orderId)=>{
//     let conn;
//     try{
//         conn = await mariaDB.getConnection();
//         await conn.beginTransaction();

//         // 실제 SQL문을 가지고 오는 작업
//         selectedSql = await mariaDB.selectedQuery('selectproddetail', orderId);
//         // 해당 connection을 기반으로 실제 SQL문을 실행하는 메서드
//         let list = await conn.query(selectedSql, orderId);
           // 추가 query
//         selectedSql = await mariaDB.selectedQuery('selectprod', orderId);
//         let result = await conn.query(selectedSql);
           // 트랜젝션 종료.
//         conn.commit();
//     }catch(err){
//         if(conn) conn.rollback();
//     }finally{
//         if(conn) conn.release();
//     }
//     return list;
// }

// 자바스크립트에서 기능은 전부 함수.
// 전체조회
const order_list = async()=>{
 let list = await mariaDB.query('selectorder');
 return list;
};
// 주문 상세조회
const orderdtlist = async(orderId)=>{
    let list = await mariaDB.query('selectorderdt', orderId);
    return list;
}

// 생산계획조회
const prodlist = async()=>{
    let list = await mariaDB.query('selectprod');
    return list;
};

// 생산상세계획조회
const proddtlist = async(orderId)=>{
    let list = await mariaDB.query('selectproddetail', orderId);
        return list;
};

// plandt저장버튼 모든 상세항목에 반영
const modifypldt = async(pldtinfo, pldtId)=>{
    let updateInfo = [pldtinfo, pldtId];
    let result = await mariaDB.query('updateprod', updateInfo);
    return result;
};

// plandt승인버튼 체크표시된것만
const pldtperm = async(pldtId)=>{
    let result = await mariaDB.query('updateplandt', pldtId);
    return result;
};

// 주문을 생산계획에 추가(order상태변경, plan추가, plan_detail추가)
// let prodcode = 0;
const orpldtinsert = async(orderInfo)=>{
  // planInfo
  // {
  //   order_id: 'ORD-20250503-002',
  //   deliv_due_date: '2025-05-15',
  //   order_details: [
  //     { order_detail_id: 'ORDD-...', prod_name: '절임배추', order_amount: 200 },
  //     { order_detail_id: 'ORDD-...', prod_name: '총각김치', order_amount: 100 },
  //     ...
  //   ]
  // }
    let conn;

    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();

        // detail 분리
        const {order_detail_list, ...orplInfo} = orderInfo;
        console.log(orderInfo);
        console.log(order_detail_list);
        console.log(orplInfo);
        // plan 등록
        // plan key 정보 조회
        selectedSql = await mariaDB.selectedQuery('sltPlanKey', {});
        let lastPlan = await conn.query(selectedSql, {});
        let lastPlanId = lastPlan[0].plan_id;
    
        // order key 생성
        let newPlanId = keys.getNextKeyId(lastPlanId);
        orplInfo.plan_id = newPlanId;

        let procloumn = ['plan_id','order_id'];
        // 컬럼값과 넘겨받은 값을 배열로 저장.
        let addInfo = converts.convertObjToAry(orplInfo, procloumn);
        // 실제 SQL문을 가지고 오는 작업
        selectedSql = await mariaDB.selectedQuery('insertorpl', addInfo);
        // 해당 connection을 기반으로 실제 SQL문을 실행하는 메서드
        let insertInfo = await conn.query(selectedSql, addInfo);



        // planDetail key 정보 조회
        selectedSql = await mariaDB.selectedQuery('sltPlanDetailKey', {});
        let lastPlanDetail = await conn.query(selectedSql, {});
        let lastPlanDetailId = lastPlanDetail[0].plan_detail_id;

        for(let DetailInfo of order_detail_list){
        // order key 생성
        let newPlanDetailId = keys.getNextKeyId(lastPlanDetailId);
        DetailInfo.plan_detail_id = newPlanDetailId;
        DetailInfo.plan_id = newPlanId;
        delete DetailInfo.order_detail_id;

        // prod_id 처리.. 해냈다
        let prod = DetailInfo.prod_id;
        console.log(prod);
        selectedSql = await mariaDB.selectedQuery('prodCode', prod);
        let prodId = await conn.query(selectedSql, prod);
        DetailInfo.prod_id = prodId[0].prod_id;
        

        // planDetail 등록
        let detailCloumn = ['plan_detail_id', 'plan_id', 'prod_id'];
        let addInfo = converts.convertObjToAry(DetailInfo, detailCloumn);
        selectedSql = await mariaDB.selectedQuery('insertorprdt', addInfo);
        let result = await conn.query(selectedSql, addInfo);
        lastPlanDetailId = newPlanDetailId;
        };

        // 주문의 상태값 변경시키는 쿼리
        selectedSql = await mariaDB.selectedQuery('updateod', orplInfo.order_id);
        let orstatus = await conn.query(selectedSql, orplInfo.order_id);
        conn.commit();
 
        return orstatus;
    //  에러 뜨면 rollback
    }catch(err){
        if(conn) conn.rollback();
        console.log(err);
    // 커넥션 초기화
    }finally{
        if(conn) conn.release();
    }
};

module.exports = {
    order_list,
    prodlist,
    proddtlist,
    orpldtinsert,
    modifypldt,
    pldtperm,
    orderdtlist,
}