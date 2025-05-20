<template>
  <div class="container-fluid py-4">
    <div class="d-flex flex-wrap justify-content-end gap-2 mb-3">
      <button @click="handleSearch" class="btn btn-success me-2 shadow rounded-pill">
        🔍 조회
      </button>
      <button class="btn btn-danger me-2 shadow rounded-pill" @click="goToMatmaPage">
        ➕ 신규
      </button>
      <button class="btn btn-info shadow rounded-pill" @click="confirmMate">
        ✅ 승인
      </button>
    </div>
    <!-- 자재발주조회 -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
            <h6 class="text-white text-capitalize ps-3">검 색</h6>
          </div>
        </div>
        <div class="row g-2 my-3 px-3">
          <!-- 거래처 -->
          <div class="col-md-3">
            <div class="d-flex align-items-center">
              <label class="form-label me-2 mb-0" style="width: 100px;">거래처</label>
              <input v-model="search.vendor_name" type="text" class="form-control border text-center"
                placeholder="거래처명" />
            </div>
          </div>
          <!-- 발주일자 -->
          <div class="col-md-4">
            <div class="d-flex align-items-center">
              <label class="form-label me-2 mb-0" style="width: 150px;">발주일자</label>
              <input type="date" v-model="search.startDate" class="form-control border text-center me-1" />
              <span class="mx-1">~</span>
              <input type="date" v-model="search.endDate" class="form-control border text-center" />
            </div>
          </div>
          <!-- 발주상태 -->
          <div class="col-md-3">
            <div class="d-flex align-items-center">
              <label class="form-label me-2 mb-0 align-items-center" style="width: 100px;">발주상태</label>
              <select v-model="search.req_status" class="form-select border">
                <option value="">전체</option>
                <option value="1o">발주등록</option>
                <option value="2o">발주승인</option>
                <option value="3o">발주마감</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  </div>
  <!-- 자재발주조회리스트 -->

  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">발주전체조회</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 300px; overflow-y: auto;">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>선택</th>
                    <th>발주일자</th>
                    <th>발주번호</th>
                    <th>거래처</th>
                    <th>사용자명</th>
                    <th>납기예정일자</th>
                    <th>발주상태</th>
                    <th>승인일자</th>
                    <th>승인자</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="matReqList.length > 0">
                    <tr v-for="(info, index) in matReqList" :key="info.id" class="group cursor-pointer" @click="handleRowClick(info, index)"
                    :class="selectedOrderRow === index ? 'table-active' : ''" >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <input type="checkbox" v-if="info.req_status === '발주등록'" v-model="info.selected"
                          @change="check">
                      </td>
                      <td class="align-items-center">{{ info.req_date }}</td>
                      <td class="align-items-center">{{ info.req_id }}</td>
                      <td class="align-items-center">{{ info.vendor_name }}</td>
                      <td class="align-items-center">{{ info.employee_name }}</td>
                      <td class="align-items-center">{{ info.req_due_date }}</td>
                      <td class="align-items-center">
                        <button class="btn btn-sm" :class="{
                          'btn-primary': info.req_status === '발주등록',
                          'btn-success': info.req_status === '발주승인',
                          'btn-secondary': info.req_status === '발주마감'
                        }" disabled>{{ info.req_status === '발주등록' ? '📝' :
                          info.req_status === '발주승인' ? '✅' : '📦' }} {{ info.req_status }} </button>
                      </td>
                      <td>{{ info.confirm_date }}</td>
                      <td>{{ info.manager_name }}</td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="11" style="text-align: center;">검색어를 입력하세요.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 자재발주 상세조회 -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">발주상세조회</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>자재발주상세ID</th>
                    <th>자재발주ID</th>
                    <th>자재명</th>
                    <th>발주수량</th>
                    <th>단위</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <template v-if="count > 0 "> -->
                  <tr v-for="(info, index) in mateList" :key="info.id" style="cursor: pointer;">
                    <td>{{ index + 1 }}</td>
                    <td>{{ info.req_detail_id }}</td>
                    <td>{{ info.req_id }}</td>
                    <td>{{ info.mate_id }}</td>
                    <td>{{ info.req_amount }}</td>
                    <td>{{ info.mate_unit }}</td>
                  </tr>
                  <!-- </template> -->
                  <!-- <tr v-else>
                      <td colspan="4">현재 데이터가 존재하지 않습니다</td>
                    </tr> -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MaterialCheckbox from '../../components/MaterialCheckbox.vue';
// stores 
import { useUserStore } from "@/stores/user";
// state, getter => mapState 
// actions => mapActions 
import { mapState } from 'pinia';

export default {
  name: 'MaterialManagement',
  components: {
    MaterialCheckbox,
  },
  data() {
    return {
      search: {
        req_status: "",
      },
      matReqList: [],
      selectedInfo: {},        // 클릭한 상세 데이터
      mateList: [],
      allSelected: [],
      selectedOrderRow: null,
      selectedOrder: {},
      
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {

    check() {
      this.allSelected = this.matReqList.every(item => item.selected);
    },
    async handleSearch() {
      // 검색 조건을 사용하여 API 요청을 보냅니다.
      await axios
        .get('/api/materials', {
          params: this.search,
        })
        .then((response) => {
          this.matReqList = response.data.map(item => ({
            ...item,
            selected: false
          }));
          this.allSelected = false;
        })
        .catch((error) => {
          console.error('검색 실패:', error);
        });
    },
    async handleRowClick(info, index) {
      this.selectedInfo = info;
      this.selectedOrderRow =index;
      await axios
        .get(`/api/materials/${info.req_id}`, {
        })
        .then((response) => {
          this.mateList = response.data;
        })
        .catch((error) => {
          console.log('검색 실패:', error.response?.data || error.message);
        });
    },
    goToMatmaPage() {
      this.$router.push('/matma'); // Vue Router를 사용하여 페이지 이동
    },

    async confirmMate() {
      const selectedItems = this.matReqList.filter(item => item.selected);

      let params = {
        mates: selectedItems,
        employee_id: this.userInfo.employee_id,
      }

      if (selectedItems.length > 0) {
        const result = await this.$swal({
          text: "선택된 항목을 승인하시겠습니까?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "승인",
          cancelButtonText: "취소",
        });

        if (result.isConfirmed) {
          let res = await axios.post(`/api/mateConfirm`, params)
            .catch(err => console.log(err));

          if (res?.data?.success) {
            await this.$swal({
              text: '선택된 항목이 승인되었습니다.',
              icon: "success"
            });

            this.handleSearch();
          } else {
            await this.$swal({
              text: '승인 처리 중 오류가 발생했습니다.',
              icon: 'error'
            });
          }
        }
      } else {
        await this.$swal({
          text: '선택된 항목이 없습니다.',
          icon: 'warning'
        });
      }
    }


  },
  computed: {
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
  },

};
</script>