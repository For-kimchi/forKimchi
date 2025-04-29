<template>
  <div class="container-fluid py-4">
  
    <!-- 저장/삭제/닫기 버튼 -->
    <div class="text-end mb-3">
      <button class="btn btn-success">저장</button>
      <button class="btn btn-danger">삭제</button>
      <button class="btn btn-info" @click="goBack">닫기</button>
    </div>
  
    <!-- 검색 카드 -->
    <div class="row">
  <div class="col-12">
    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
          <h6 class="text-white text-capitalize ps-3">검색</h6>
        </div>
      </div> <!-- card-header 끝 -->
      
      <div class="card-body">
    <ul class="list-group list-group-horizontal">
      <li class="list-group-item d-flex align-items-center">회사</li>
      <li class="list-group-item d-flex align-items-center">
        <input type="text" v-model="search.company">
        <i class="fas fa-search d-flex align-items-center" style="font-size: 20px; cursor: pointer; margin-left: 10px;" @click="openCompanySearchModal"></i>
      </li>
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc; margin-left: 20px;">담당자</li>
          <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
            <input type="text" class="form-control me-2 d-flex align-items-center" style="border: 1px solid #ccc; box-sizing: border-box;">
          </li>

          <li class="list-group-item d-flex align-items-center" style="margin-left: 10px;">납기일</li>
          <li class="list-group-item d-flex align-items-center">
            <input type="date">
          </li>
        </ul>
      </div> <!-- card-body 끝 -->
    </div>
  </div>
</div>
<div class="row">
  <div class="col-12 text-left mb-4">
    <button class="btn btn-primary">품목조회</button>
  </div>
</div>
  
    <!-- 거래처, 이동버튼, 품목정보 테이블 -->
    <div class="row">
      <!-- 왼쪽: 거래처 테이블 -->
      <div class="col-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">거래처</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-wrapper" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th><input type="checkbox" @change="toggleAll('customerList', $event)"></th>
                    <th>품목코드</th>
                    <th>품목명</th>
                    <th>수량</th>
                    <th>단위</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="customerList.length > 0">
                    <tr v-for="(info, index) in customerList" :key="info.id">
                      <td><input type="checkbox" v-model="info.selected"></td>
                      <td>{{ index + 1 }}</td>
                      <td>{{ info.equip_id }}</td>
                      <td>{{ info.equip_name }}</td>
                      <td>{{ info.equip_type }}</td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="5">현재 데이터가 존재하지 않습니다</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 가운데: +, - 버튼 -->
      <div class="col-1 d-flex flex-column align-items-center justify-content-center">
        <button @click="moveToSelected" class="btn btn-primary rounded-circle mb-3" style="width: 60px; height: 60px; font-size: 20px;">
          +
        </button>
        <button @click="moveToCustomer" class="btn btn-danger rounded-circle" style="width: 60px; height: 60px; font-size: 20px;">
          -
        </button>
      </div>
    
      <!-- 오른쪽: 품목정보 테이블 -->
      <div class="col-5">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">발주번호 <input type="text"></h6>
            </div>
          </div>

        
          <div class="card-body px-0 pb-2">
            <div class="table-wrapper" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th><input type="checkbox" @change="toggleAll('selectedList', $event)"></th>
                    <th>품목코드</th>
                    <th>품목명</th>
                    <th>수량</th>
                    <th>단위</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="selectedList.length > 0">
                    <tr v-for="(info, index) in selectedList" :key="info.id">
                      <td><input type="checkbox" v-model="info.selected"></td>
                      <td>{{ index + 1 }}</td>
                      <td>{{ info.equip_id }}</td>
                      <td>{{ info.equip_name }}</td>
                      <td>{{ info.equip_type }}</td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="5">현재 데이터가 존재하지 않습니다</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> <!-- row 끝 -->
  </div>
  <div class="card-body">
  <ul class="list-group list-group-horizontal">
    <li class="list-group-item d-flex align-items-center">회사</li>
    <li class="list-group-item d-flex align-items-center">
      <input type="text">
      <i class="fas fa-search d-flex align-items-center" style="font-size: 20px; cursor: pointer; margin-left: 10px;" @click="openCompanySearchModal"></i>
    </li>
  </ul>
</div>

<!-- 회사 검색 모달 -->
<div v-if="isModalVisible" class="modal-backdrop" @click.self="closeCompanySearchModal">
      <div class="modal-content-box">
        <div class="modal-header">
          <h5 class="modal-title">회사 검색</h5>
          <button type="button" class="btn-close" @click="closeCompanySearchModal"></button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control" v-model="search.company" placeholder="회사를 입력하세요">
          <ul>
            <li v-for="company in filteredCompanies" :key="company.id">{{ company.name }}</li>
          </ul>
        </div>
      </div>
    </div>

    
</template>
  
  
  

<script>
import axios from 'axios'
import MaterialCheckbox from '../../components/MaterialCheckbox.vue';

export default {
    name: "Material Management",
    components: {
      MaterialCheckbox,
    },
    data() {
    return {
      customerList: [
        { id: 1, equip_id: 'A001', equip_name: '품목A', equip_type: 'EA', selected: false },
        { id: 2, equip_id: 'B002', equip_name: '품목B', equip_type: 'EA', selected: false },
      ],
      selectedList: [],

      isModalVisible: false,
      search: {
        company: '',
      },
      companies: [
        { id: 1, name: '회사1' },
        { id: 2, name: '회사2' },
        { id: 3, name: '회사3' },
      ]
    };
  },
  methods: {
    // 전체선택 토글
    toggleAll(listName, event) {
      const isChecked = event.target.checked;
      this[listName].forEach(item => {
        item.selected = isChecked;
      });
    },

    // 왼쪽 -> 오른쪽으로 이동
    moveToSelected() {
      const movingItems = this.customerList.filter(item => item.selected);
      this.selectedList.push(...movingItems.map(item => ({ ...item, selected: false })));
      this.customerList = this.customerList.filter(item => !item.selected);
    },

    // 오른쪽 -> 왼쪽으로 이동
    moveToCustomer() {
      const movingItems = this.selectedList.filter(item => item.selected);
      this.customerList.push(...movingItems.map(item => ({ ...item, selected: false })));
      this.selectedList = this.selectedList.filter(item => !item.selected);
    },
    goBack() {
      this.$router.push('/materlist');; // 페이지 이동
    },
    openCompanySearchModal() {
      this.isModalVisible = true;
    },
    closeCompanySearchModal() {
      this.isModalVisible = false;
    }
},
computed: {
  filteredCompanies() {
      return this.companies.filter(company =>
        company.name.toLowerCase().includes(this.search.company.toLowerCase())
      );
    }
}
}
</script>

<style scoped>
/* 모달 배경 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

/* 모달 본문 */
.modal-content-box {
  background: white;
  border-radius: 8px;
  padding: 100px;
  width: 1000px;
  max-width: 90%;
}

/* 모달 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>