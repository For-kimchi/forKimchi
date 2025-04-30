const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');

// 참고용 코드
// const proddtlist = async(orderId)=>{
//     let conn;
//     try{
//         conn = await mariaDB.getConnection();
//         await conn.beginTransaction();

//         // 실제 SQL문을 가지고 오는 작업
//         selectedSql = await mariaDB.selectedQuery('selectproddetail', orderId);
//         // 해당 connection을 기반으로 실제 SQL문을 실행하는 메서드
//         let list = await conn.query(selectedSql, orderId);

//         selectedSql = await mariaDB.selectedQuery('selectprod', orderId);
//         let result = await conn.query(selectedSql);

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
let prodcode = 0;
// 트랜젝션 열고닫는거 컨트롤하는 코드.
const orpldtinsert = async(orderInfo)=>{
    // 뭔데 왜케 어려운건데
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
        // 매개변수 나눠서 저장
        let orplInfo = {plan_id: plankey,
                        order_id: orderInfo.order_id,
                        employee_id: orderInfo.employee_id
                        };

        let pldtInfo = {plan_detail_id: plandtkey,
                        plan_id: plankey,
                        prod_id: orderInfo.prod_id
                        };

        // plan_id는 키를 생성해서 추가.
        // order_id는 주문서에서 값을 가져와서 추가.
        let procloumn = ['plan_id','order_id','employee_id'];
        // 컬럼값과 넘겨받은 값을 배열로 저장.
        let addInfo = converts.convertObjToAry(orplInfo, procloumn);
        // 실제 SQL문을 가지고 오는 작업
        selectedSql = await mariaDB.selectedQuery('insertorpl', addInfo);
        // 해당 connection을 기반으로 실제 SQL문을 실행하는 메서드
        let insertInfo = await conn.query(selectedSql, addInfo);

        // 두번쨰 쿼리
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
}