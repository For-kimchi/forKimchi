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
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재입고ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고일자
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">거래처
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">담당자
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in storeList" v-bind:key="info.inbound_id"
                    v-on:click="getStoreDtList(info.inbound_id)">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_date }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.memo }}</td>
                    <td class="align-middle font-weight-bolder text-center"><button class="btn btn-sm btn-info"
                        disabled>{{ info.inbound_status }}</button></td>
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
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">창고선택
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">
                      자재입고상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">검사상태
                    </th>
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">양품수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">불량품수량</th> -->
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고상태</th> -->
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고/반품
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in storeWareStatus" v-bind:key="info.inbound_detail_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">

                      <select v-model="info.warehouse_id" class="form-select text-center"
                        style="max-width: 150px; border: 1px solid gray;">
                        <option value="" selected>선택</option>
                        <option v-for="(w, index) in wareId" :key="w.warehouse_id" :value="w.warehouse_id">{{
                          w.warehouse_name }}</option>
                      </select>
                    </td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.mate_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.quality_result }}</td>
                    <!-- <td class="align-middle font-weight-bolder text-center">{{ info.pass_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.fail_amount }}</td> -->
                    <!-- <td class="align-middle font-weight-bolder text-center">{{ info.inbound_status }}</td>  -->
                    <!-- 드롭다운(입고/반품) -->
                    <td>
                      <select v-model="info.inbound_type" class="form-select me-2 text-center"
                        style="max-width: 200px; border: 1px solid gray; text-align-last: center;">
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
  // stores 
  import { useUserStore } from "@/stores/user"; 
  // state, getter => mapState 
  // actions => mapActions 
  import { mapState } from 'pinia';

export default {
  data() {
    return {
      storeList: [],            // 입고 목록
      storeWareStatus: [],      // 상세 목록
      inbound_id: '',           // 선택된 입고 ID
      warehouses: [],
      wareId:[],
      selectedWarehouse:'',       
    };
  },
  computed: {
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
  },
  created() {
    this.getStoreList();        // 최초 로드 시 입고 목록 조회
    this.getWarehouses();
    this.wareTypeAdd();
  },
  methods: {
    async getStoreList() {
      try {
        const res = await axios.get(`/api/storeWareStatus`);
        this.storeList = res.data;
      } catch (err) {
        console.error('입고 목록 조회 오류:', err);
      }
    },
    async getWarehouses() {
      try {
        const res = await axios.get('/api/warehouseList');

        // 중복 제거된 warehouse_id만 추출
        const uniqueList = [...new Set(res.data.map(item => item.warehouse_type))];

        // 필요한 형태로 다시 가공
        this.warehouses = uniqueList.map(id => ({ warehouse_id: id }));

      } catch (err) {
        console.error('창고 목록 조회 오류:', err);
      }
},

    async getStoreDtList(storeId) {
      try {
        const res = await axios.get(`/api/storeWareList/${storeId}`);
        this.storeWareStatus = res.data;
        this.inbound_id = storeId;
        this.warehouse_id = '';
        // 기본값 설정: quality_result 기준으로 inbound_type 세팅
        this.storeWareStatus.forEach(item => {
            item.warehouse_id = '';
          if (!item.inbound_type) {
            item.inbound_type = item.quality_result === '양품' ? '입고' : '반품';
            
          }
        });

      } catch (err) {
        console.error('입고 상세 조회 오류:', err);
      }
    },

    // 창고입고 상세에서 창고선택 드롭다운창에 warehouse_id넣기
    async wareTypeAdd() {
      try {
        let ajaxRes = await axios.get('/api/wareDetailId');
        this.wareId = ajaxRes.data;
        console.log('-----------------------------', this.wareId);
      } catch (err) {
        console.log('창고 목록 오류:', err);
      }
    },
    async wareAdd() {
      try {
        const saveList = this.storeWareStatus.map(item => ({
          inbound_type: item.inbound_type,
          inbound_detail_id: item.inbound_detail_id,
          warehouse_id: item.warehouse_id,
          inbound_amount: item.inbound_amount,
          mate_id: item.mate_id,
          employee_id: this.userInfo.employee_id,
          inbound_id: this.inbound_id,
        }));

        console.log(this.storeWareStatus);
        console.log(saveList);
        if (saveList.length === 0) {
          alert('입고 항목이 없습니다.');
          return;
        }

        let result = await axios.post('/api/insertWarehouse', saveList);
        alert('입고가 완료되었습니다.');
        this.getStoreList(); // 목록 새로고침
        this.storeWareStatus = []; // 상세 목록 초기화
        this.inbound_id = '';      // 선택 ID 초기화
      } catch (err) {
        console.error('입고 저장 실패:', err);
        alert('저장 중 오류 발생');
      }
    }
  }
}
</script>
