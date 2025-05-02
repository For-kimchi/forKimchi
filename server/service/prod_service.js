const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');

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

// plandt저장버튼
const modifypldt = async(pldtinfo, pldtId)=>{
    let updateInfo = [pldtinfo, pldtId];
    let result = await mariaDB.query('updateprod', updateInfo);
    return result;
};

// plandt승인버튼
const pldtperm = async(pldtId)=>{
    let result = await mariaDB.query('updateplandt', pldtId);
    return result;
};

// 주문을 생산계획에 추가(order상태변경, plan추가, plan_detail추가)
let prodcode = 0;
const orpldtinsert = async(orderInfo)=>{
    // orderInfo에 들어있는값의 형식
    // { 
    //     "id": 1,
    //     "first_name": "Rudy",
    //     "last_name": "Castillon",
    //     "email": "rcastillon0@aol.com",
    //     "gender": "Male",
    //     "ip_address": "77.118.135.69"
    //   }
    let conn;
    
    // 오늘 날짜 구하기 (yyyymmdd)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}${mm}${dd}`;

    // 임시 키생성
    prodcode ++;
    let plankey = 'PLAN' + todayStr + prodcode;
    let plandtkey = 'PLANDT' + todayStr + prodcode;

    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        // 세션등록되면 employee_id가 session값으로 추가되어야함.(버튼누른사람)
        // 매개변수 나눠서 저장
        // order 상태정보 변경
        let target_id = orderInfo.order_id;
        // plan정보
        let orplInfo = {plan_id: plankey,
                        order_id: orderInfo.order_id,
                        employee_id: orderInfo.employee_id
                        };
        // plan_detail정보
        let pldtInfo = {plan_detail_id: plandtkey,
                        plan_id: plankey,
                        prod_id: orderInfo.prod_id
                        };
        // 첫번쨰 쿼리
        selectedSql = await mariaDB.selectedQuery('updateod', target_id);
        let orstatus = await conn.query(selectedSql, target_id);

        // 두번쨰 쿼리
        // plan_id는 키를 생성해서 추가.
        // order_id는 주문서에서 값을 가져와서 추가.
        let procloumn = ['plan_id','order_id','employee_id'];
        // 컬럼값과 넘겨받은 값을 배열로 저장.
        let addInfo = converts.convertObjToAry(orplInfo, procloumn);
        // 실제 SQL문을 가지고 오는 작업
        selectedSql = await mariaDB.selectedQuery('insertorpl', addInfo);
        // 해당 connection을 기반으로 실제 SQL문을 실행하는 메서드
        let insertInfo = await conn.query(selectedSql, addInfo);

        // 세번쨰 쿼리
        let dtcloumn = ['plan_detail_id', 'plan_id', 'prod_id'];
        addInfo = converts.convertObjToAry(pldtInfo, dtcloumn);
        selectedSql = await mariaDB.selectedQuery('insertorprdt', addInfo);
        let result = await conn.query(selectedSql, addInfo);
        conn.commit();
 
        return result;
    //  에러 뜨면 rollback
    }catch(err){
        if(conn) conn.rollback();
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
}