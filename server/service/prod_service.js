const mariaDB = require('../mapper/mapper');
const converts = require('../utils/converts');

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
// 트랜젝션 열고닫는거 컨트롤하는 코드.
const orprodt = async(orderInfo)=>{
    let conn;
    try{
        conn = await mariaDB.getConnection();
        await conn.beginTransaction();
        // plan_id는 키를 생성해서 추가.
        // order_id는 주문서에서 값을 가져와서 추가.
        let procloumn = ['plan_id','order_id','plan_final_status','employee_id','reg_date','manager_id','memo'];
        // 컬럼값과 넘겨받은 값을 배열로 저장.
        let addInfo = converts.convertObjToAry(orderInfo, procloumn);
        // 실제 SQL문을 가지고 오는 작업
        let inserts = await mariaDB.query('insertInfo', addInfo);
        // selectedSql = await mariaDB.selectedQuery('insertorpl', addInfo);
        // 해당 connection을 기반으로 실제 SQL문을 실행하는 메서드
        // let insertInfo = await conn.query(selectedSql, addInfo);
        


        // 두번쨰 쿼리
        let dtcloumn = ['plan_detail_id', 'plan_id', 'prod_id', 'plan_status'];
        addInfo = converts.convertObjToAry(orderInfo, procloumn);
        inserts = await mariaDB.query('insertorprdt', addInfo);
        // let result = await conn.query(selectedSql, addInfo);
        conn.commit();
 
        return inserts;
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
}