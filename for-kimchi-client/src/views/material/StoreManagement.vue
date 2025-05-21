<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->
    <!-- <div class="row">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
            <h6 class="text-white text-capitalize ps-3">검색</h6>
          </div>
        </div>
        <div>
          <ul class="list-group list-group-horizontal">
            <li class="list-group-item">제품코드</li>
            <li class="list-group-item"><input type="text"></li>
            <li class="list-group-item">제품명</li>
            <li class="list-group-item"><input type="text"></li>
            <li class="list-group-item">일정</li>
            <li class="list-group-item"><input type="date"> ~ <input type="date"></li>
            <li class="list-group-item"><button class="btn btn-success ms-2 me-2" @:click="">조회</button></li>
          </ul>
        </div>
      </div>
    </div> -->

    <div class="row">
      <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
          <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">발주서</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 500px; overflow-y: auto;">
              <table class="table align-items-center mb-0 justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">발주일자
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">발주번호
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">거래처
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">사용자명
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">납기예정일자
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">발주상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in matReqList" v-bind:key="info.id" class="group cursor-pointer" v-on:click="mateDetailInfo(info,index)"
                  :class="selectedOrderRow === index ? 'table-active' : ''" >
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.req_date }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.req_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.req_due_date }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.memo }}</td>
                    <td class="align-middle font-weight-bolder text-center"><button class="btn btn-sm btn-success"
                        disabled>{{ info.req_status }}</button></td>
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
              <h6 class="text-white text-capitalize ps-3">발주서상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0 justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">상세ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">발주수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">검사요청수량
                    </th>
                  </tr>

                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateList" v-bind:key="info.id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.req_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.mate_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.req_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">
                      <input type="number" v-model.number="info.inbound_amount" @change="amountCheck(info)">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 발주서 항목 클릭시에만 저장버튼 활성화 -->
            <div v-if="mateList.length > 0" class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0"></table>
              <div class="text-end pe-5 mt-3">
                <button class="btn btn-success" @click="storeAdd">검사요청</button>
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
  name: "orderprod",
  data() {
    return {
      matReqList: [],
      mateList: [],

      // 저장버튼
      selectedList: [],
      mate_id: [],
      vendor_id: [],
      selectedInfo: [],
      selectedOrderRow: null,
    }
  },
  computed: {
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
  },
  created() {
    this.storeMateAll();
  },
  methods: {
    // 발주서 조회
    storeMateAll() {
      axios
        .get('/api/storeMate', {
          params: this.search,
        })
        .then((response) => {
          this.matReqList = response.data;
        })
        .catch((error) => {
          console.error('검색 실패:', error);
        });
    },

    // 발주서 클릭한 항목 상세조회
    mateDetailInfo(info, index) {
      this.selectedInfo = info;
      this.selectedOrderRow = index;
      axios
        .get(`/api/storeMate/${info.req_id}`)
        .then((response) => {
          this.mateList = response.data;
        })
        .catch((error) => {
          console.log('검색 실패:', error.response?.data || error.message);
        });
    },

    // 발주수량보다 입고수량을 초과하여 입력시 경고창 띄움 (자동으로 발주수량으로 되돌림)
    amountCheck(info) {
      if (info.inbound_amount > info.req_amount) {
        this.$swal({
          text: '검사요청수량은 발주수량을 초과할 수 없습니다.',
          icon: 'warning'
        });
        info.inbound_amount = info.req_amount;
      }
    },

    // 저장버튼  
    async storeAdd() {
      // 입고수량이 입력된 항목만 저장 대상으로 설정
      this.selectedList = this.mateList.filter(item => item.inbound_amount > 0);

      if (this.selectedList.length === 0) {
        await this.$swal({
          text: '입고수량을 입력한 항목이 없습니다.',
          icon: 'info'
        });
        return;
      }

      const storeInfo = {
        store_detail_list: this.selectedList.map(item => ({
          req_id: item.req_id,
          mate_id: item.mate_id,
          inbound_amount: item.inbound_amount,
          memo: item.memo || '',
        })),
        employee_id: this.userInfo.employee_id,
        vendor_id: this.selectedInfo.vendor_id, // 클릭한 발주서에서 가져오기
      };

      try {
        const ajaxRes = await axios.post(`/api/storeSave`, storeInfo);
        if (ajaxRes.data.affectedRows > 0) {
          await this.$swal({
            text: '검사요청되었습니다.',
            icon: 'success'
          });
          this.mateList = [];
          this.id = '';
          this.storeMateAll();
        } else {
          await this.$swal({
            text: '저장이 실패하였습니다.',
            icon: 'error'
          });
        }
      } catch (err) {
        console.error(err);
        await this.$swal({
          text: '저장 중 오류가 발생했습니다.',
          icon: 'error'
        });
      }
    }

  }
}
</script>