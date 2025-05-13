<template>

  <div class="text-end">
    <button @click="handleSearch" class="btn btn-success">조회</button>
    <button class="btn btn-danger" @click="goToMatmaPage" >신규</button>
    <button class="btn btn-info">수정</button>
  </div> 

  <!-- 자재발주조회 -->
  <div class="row">
    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
          <h6 class="text-white text-capitalize ps-3">검색</h6>
        </div>
      </div>

      <div class="card-body">
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item" style="margin-left: 10px;">거래처</li>
          <li class="list-group-item"><input type="text" v-model="search.company"></li>
          <li class="list-group-item" style="margin-left: 20px;">발주일자</li>
          <li class="list-group-item"><input type="date" v-model="search.startDate"> ~ <input type="date" v-model="search.endDate"></li>
          <!-- <li class="list-group-item" style="margin-left: 20px;">발주번호</li>
          <li class="list-group-item"><input type="text" v-model="search.orderNumber"></li> -->
        </ul>

        <ul class="list-group list-group-horizontal flex-wrap mt-3">
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">품목</li>
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
            <input type="text" v-model="search.item" class="form-control me-2" style="border: 1px solid #ccc; box-sizing: border-box;">
            <!-- <i class="fas fa-search" style="font-size: 20px; cursor: pointer;"></i> -->
          </li>
          <!-- 거래처 -->
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">거래처</li>
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
              <input type="text" v-model="search.supplier" class="form-control me-2" style="border: 1px solid #ccc; box-sizing: border-box;"/>
            <!-- <i class="fas fa-search" style="font-size: 20px; cursor: pointer;"></i> -->
          </li>

            <!-- 발주상태 -->
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">발주상태</li>
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
          <select v-model="search.orderStatus" class="form-select" style="min-width: 130px;">
            <option disabled value="" style="text-align: center;">선택하세요</option>
            <option value="발주등록">발주등록</option>
            <option value="발주승인">발주승인</option>
            <option value="발주마감">발주마감</option>
          </select>
          <!-- 검색 아이콘 -->
          <!-- <i class="fas fa-search d-flex align-items-center" style="font-size: 20px; cursor: pointer;"></i> -->
          </li>
            
          
        </ul>
      </div>
    </div>
  </div>

  <!-- 자재발주조회리스트 -->
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
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
                    <th>비고</th>
                    <th>승인일자</th>
                    <th>승인자</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="matReqList.length > 0">
                    <tr v-for="(info, index) in matReqList" :key="info.id" @click="handleRowClick(info)">
                      <td>{{ index + 1 }}</td>
                      <td><MaterialCheckbox></MaterialCheckbox></td>
                      <td>{{ info.req_date }}</td>
                      <td>{{ info.req_id }}</td>
                      <td>{{ info.vendor_id }}</td>
                      <td>{{ info.employee_id }}</td>
                      <td>{{ info.req_due_date }}</td>
                      <td>{{ info.req_status }}</td>
                      <td>{{ info.memo }}</td>
                      <td>{{ info.confirm_date }}</td>
                      <td>{{ info.manager_id }}</td>
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
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>자재발주상세ID</th>
                      <th>자재발주ID</th>
                      <th>자재명</th>
                      <th>발주수량</th>
                      <th>비고</th>
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
                        <td>{{ info.memo }}</td>
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

export default {
  name: 'MaterialManagement',
  components: {
    MaterialCheckbox,
  },
  data() {
    return {
      search: {
        company: '',
        startDate: '',
        endDate: '',
        orderNumber: '',
        item: '',
        supplier: '',
        orderStatus: '',
      },
      matReqList: [],
      selectedInfo: {},        // 클릭한 상세 데이터
      mateList: [],
    };
  },
    created() {
    this.handleSearch();
  },
  methods: {
    handleSearch() {
      // 검색 조건을 사용하여 API 요청을 보냅니다.
      axios
        .get('/api/materials', {
          params: this.search,
        })
        .then((response) => {
          this.matReqList = response.data;
        })
        .catch((error) => {
          console.error('검색 실패:', error);
        });
    },
    handleRowClick(info) {
      this.selectedInfo = info;
      axios
        .get(`/api/materials/${info.req_id}`,{
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
  },

};
</script>