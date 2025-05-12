<template>
  <div class="container-fluid py-4">
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">입고조회</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재입고ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">거래처</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">담당자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in storeList" v-bind:key="info.inbound_id" v-on:click="getStoreDtList(info.inbound_id)">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_date }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.memo }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    <!-- row div-->
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">입고상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재입고상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고수량</th>
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">양품수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">불량품수량</th> -->
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고/반품</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in storeWareStatus " v-bind:key="inbound_detail_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.mate_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_amount }}</td>
                    <!-- <td class="align-middle font-weight-bolder text-center">{{ info.pass_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.fail_amount }}</td> -->
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_status }}</td>
                    <!-- 드롭다운(입고/반품) -->
                    <td>
                     <select v-model="info.inbound_type" class="form-select me-2 text-center"style="max-width: 200px; border: 1px solid gray; text-align-last: center;">
                      <option value="입고">입고</option>
                      <option value="반품">반품</option>
                     </select>
                    </td>
                     <!-- 드롭다운(입고/반품) -->
                    <td class="align-middle font-weight-bolder text-center">{{ info.memo }}</td>
                  </tr>
                </tbody>
              </table>
              </div>
            <!-- 테이블 오른쪽 밑에 저장버튼 -->
            <div v-if="storeWareStatus.length > 0" class="table-responsive p-0">
                  <table class="table align-items-center justify-content-center mb-0"></table>
                 <div class="text-end pe-5 mt-3">
                <button class="btn btn-success" @click="wareAdd">창고입고</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  
    data() {
      return{
        storeList: [],
        storeDtList: [],
        insertWare: [],
        inbound_id: '',
        storeWareStatus:[],
      }
    },
    created(){
      this.getStoreList();
    },
    methods : {
    async getStoreList() {
      let ajaxRes = 
      await axios.get(`/api/storeWareStatus`)
                  .catch (err => console.log(err));
      this.storeList = ajaxRes.data;
    },
    
    async getStoreDtList(storeId) {
      let ajaxRes =
      await axios.get(`/api/storeList/${storeId}`)
                .catch(err => console.log(err));
      this.storeWareStatus = ajaxRes.data;
      this.inbound_id = storeId;
    },


    async wareAdd() {
  try {
    let saveList = this.storeWareStatus // 창고와 입고테이블이 다르기 때문에 saveList에 storeDtList를 한개씩 담아줌.
      .filter(item => item.inbound_type === '입고')   // 입고만 저장
      .map(item => ({
        inbound_type: '입고',         // 테이블에 inbound_type이 없기 때문에 값을 지정해줌 
        mate_lot: `MLOT-${Date.now()}`,                 // LOT번호 자동 생성
        inbound_detail_id: item.inbound_detail_id,
        warehouse_id: 'WHS-001',        // 선택된 창고
        inbound_amount: item.inbound_amount,
        mate_id : item.mate_id,
        employee_id: '홍길동',
        inbound_id: this.inbound_id
      }));
      console.log(saveList);
    // insertWarehouse 라우터로 전송
    let res = await axios.post('/api/insertWarehouse', saveList)

    // saveList에 빈값이 넘어올 경우 반품으로 처리, 
    // 드롭다운에서 입고를 선택하면 inbound_type: '입고'로 기본값을 주었고, 
    // 위의 드롭다운 입고옵션에 value="입고"를 주어서 saveList의 filter를 통해 값이 담김. 
    // value="입고"가 아닌 드롭다운옵션의 경우에는 빈값을 담아서 넘김.
    if (saveList.length === 0) {
    alert('반품되었습니다.');
    return;
    }
    
    alert('입고가 완료되었습니다.');
    // 창고입고목록 초기화 axios.get함수를 다시 부름으로써 새로고침 효과가 나타난다.(새로고침하면 inbound_id 가 3p가 된 컬럼은 사라지게 됨)
    this.getStoreList();
    // 창고입고상세목록 초기화(id값과 in storeWareStatus을 빈값으로 나타낸다. 즉, 입고상세는 저장버튼을 누르면 자동으로 전부 빈값으로 만들어지게 됨.)
    this.storeWareStatus = [];
    this.inbound_id = '';

  } catch (err) {

    console.error('저장 실패:', err);
    alert('저장 중 오류 발생');
  }
    }
  }
}

</script>