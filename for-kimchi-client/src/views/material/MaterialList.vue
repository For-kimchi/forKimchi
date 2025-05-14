<template>

  <div class="text-end">
    <button @click="handleSearch" class="btn btn-success">조회</button>
    <button class="btn btn-danger" @click="goToMatmaPage" >신규</button>
    <button class="btn btn-info" @click="confirmMate">승인</button>
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
          <li class="list-group-item"><input type="text" v-model="search.vendor_name"></li>
          <li class="list-group-item" style="margin-left: 20px;">발주일자</li>
          <li class="list-group-item"><input type="date" v-model="search.startDate"> ~ <input type="date" v-model="search.endDate"></li>
          <!-- <li class="list-group-item" style="margin-left: 20px;">발주번호</li>
          <li class="list-group-item"><input type="text" v-model="search.orderNumber"></li> -->
        </ul>

        <ul class="list-group list-group-horizontal flex-wrap mt-3">
          <!-- <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">품목</li> -->
          <!-- <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
            <input type="text" v-model="search.prod_name" class="form-control me-2" style="border: 1px solid #ccc; box-sizing: border-box;"> -->
            <!-- <i class="fas fa-search" style="font-size: 20px; cursor: pointer;"></i> -->
          <!-- </li> -->
          <!-- 거래처 -->
          <!-- <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">거래처</li>
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
              <input type="text" v-model="search.supplier" class="form-control me-2" style="border: 1px solid #ccc; box-sizing: border-box;"/> -->
            <!-- <i class="fas fa-search" style="font-size: 20px; cursor: pointer;"></i> -->
          <!-- </li> -->

            <!-- 발주상태 -->
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">발주상태</li>
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
          <select v-model="search.req_status" class="form-select" style="min-width: 130px;">
            <option disabled value="" style="text-align: center;">선택하세요</option>
            <option value="1o">발주등록</option>
            <option value="2o">발주승인</option>
            <option value="3o">발주마감</option>
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
                      <td>           
                          <input type="checkbox" v-if="info.req_status === '발주등록'" v-model="info.selected"
                        @change="check"></td>
                      <td>{{ info.req_date }}</td>
                      <td>{{ info.req_id }}</td>
                      <td>{{ info.vendor_name }}</td>
                      <td>{{ info.employee_name }}</td>
                      <td>{{ info.req_due_date }}</td>
                      <td class="align-middle text-center">
                      <button class="btn btn-sm" :class="{
                                                          'btn-primary': info.req_status === '발주등록',
                                                          'btn-success': info.req_status === '발주승인',
                                                           'btn-secondary': info.req_status === '발주마감'
                                                          }"disabled>{{ info.req_status === '발주등록' ? '📝' : info.req_status === '발주승인' ? '✅' : '📦' }} {{ info.req_status }} </button></td>
                      <td>{{ info.memo }}</td>
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
      },
      matReqList: [],
      selectedInfo: {},        // 클릭한 상세 데이터
      mateList: [],
      allSelected: [],
    };
  },
    created() {
    this.handleSearch();
  },
  methods: {
    
      check() {
        this.allSelected = this.matReqList.every(item => item.selected);
      },
    handleSearch() {
      // 검색 조건을 사용하여 API 요청을 보냅니다.
      axios
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

    async confirmMate() {
      const selectedItems = this.matReqList.filter(item => item.selected);

      let params = {
        mates: selectedItems,
        employee_id: 'EMP-001',
      }
      
      if (selectedItems.length > 0) {
          if (confirm('선택한 항목을 승인하시겠습니까?')) {
            let res = await axios.post(`/api/mateConfirm`, params)
              .catch(err => console.log(err));
              
              
            if (res.data.success) {
              alert('선택된 항목이 승인되었습니다.');
              this.handleSearch();
            } else {
              alert('승인 처리 중 오류가 발생했습니다.');
            }
          }
        } else {
          alert('선택된 항목이 없습니다.');
        }
    }
  },

};
</script>