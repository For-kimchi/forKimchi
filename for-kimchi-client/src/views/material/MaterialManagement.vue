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
        <input type="text" :value="selectedCompany" readonly>
        <i class="fas fa-search d-flex align-items-center"
           style="font-size: 20px; cursor: pointer; margin-left: 10px;"
           @click="openCompanySearchModal"></i>
      </li>
    </ul>
      </div> <!-- card-body 끝 -->
    </div>
  </div>
</div>
<!-- <div class="row">
  <div class="col-12 text-left mb-4">
    <button class="btn btn-primary">품목조회</button>
  </div>
</div> -->
  
    <!-- 거래처, 이동버튼, 품목정보 테이블 -->
    <div class="row">
      <!-- 왼쪽: 거래처 테이블 -->
      <div class="col-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              
              <div class="card-body">
    <ul class="list-group list-group-horizontal">
      <li class="list-group-item d-flex align-items-center">자재명</li>
      <li class="list-group-item d-flex align-items-center">
        <input type="text" :value="selectedCompany" readonly>
        <i class="fas fa-search d-flex align-items-center"
         style="font-size: 20px; cursor: pointer; margin-left: 10px;"
         @click="openCompanySearchModal"></i>
      </li>
    </ul>
      </div>
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


<!-- 회사 검색 모달 -->
<!-- 회사 검색 인풋 -->
<input type="text" :value="selectedCompany" readonly>
<i class="fas fa-search" @click="openCompanySearchModal"></i>

<!-- 자재 검색 인풋 -->
<input type="text" :value="selectedMaterial" readonly>
<i class="fas fa-search" @click="openMaterialSearchModal"></i>

<!-- 회사 검색 모달 -->
<Modal
  :visible="isCompanyModalVisible"
  title="회사 검색"
  placeholder="회사명 검색"
  :list="companies"
  :selectedValue="selectedCompany"
  @close="closeCompanySearchModal"
  @select="selectCompany"
/>

<!-- 자재 검색 모달 -->
<Modal
  :visible="isMaterialModalVisible"
  title="자재 검색"
  placeholder="자재명 검색"
  :list="materials"
  :selectedValue="selectedMaterial"
  @close="closeMaterialSearchModal"
  @select="selectMaterial"
/>

    
</template>
  
  
  

<script>
import axios from 'axios'
import MaterialCheckbox from '../../components/MaterialCheckbox.vue';
import Modal from '@/views/modal/Modal.vue'
export default {
    name: "Material Management",
    components: {
      MaterialCheckbox,
      Modal,
    },
    data() {
    return {
      customerList: [
        { id: 1, equip_id: 'A001', equip_name: '품목A', equip_type: 'EA', selected: false },
        { id: 2, equip_id: 'B002', equip_name: '품목B', equip_type: 'EA', selected: false },
      ],
      selectedList: [],

      isModalVisible: false,
      searchText: '',
      selectedCompany: '',
      selectedMaterial: '',
      isCompanyModalVisible: false,
      isMaterialModalVisible: false,
      companies: [
        { id: 1, name: '회사1' },
        { id: 2, name: '회사2' }
      ],
      materials: [
        { id: 1, name: '자재A' },
        { id: 2, name: '자재B' }
      ],
      search: {
      company: '',
      // 필요에 따라 추가로 다른 필드도 여기에 정의
    },
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
    openCompanySearchModal() { this.isCompanyModalVisible = true; },
    closeCompanySearchModal() { this.isCompanyModalVisible = false; },
    selectCompany(name) { this.selectedCompany = name; },

    openMaterialSearchModal() { this.isMaterialModalVisible = true; },
    closeMaterialSearchModal() { this.isMaterialModalVisible = false; },
    selectMaterial(name) { this.selectedMaterial = name; },
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

<!-- <style scoped>
/* 모달 배경 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

/* 모달 본문 */
.modal-content-box {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
}

/* 모달 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-group-item-action {
  cursor: pointer;
}

.list-group-item.active {
  background-color: #0d6efd;
  color: white;
}
</style> -->