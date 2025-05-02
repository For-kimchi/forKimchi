<template>
  <div class="container-fluid py-4">

    <div class="text-end mb-3">
      <button class="btn btn-success">저장</button>
      <button class="btn btn-danger">삭제</button>
      <button class="btn btn-info" @click="goBack">닫기</button>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">검색</h6>
            </div>
          </div>

          <div class="card-body">
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item d-flex align-items-center">
                회사
                <Modal
                  :visible="isCompanyModalVisible"
                  title="회사 검색"
                  placeholder="회사명 검색"
                  :list="companies"
                  :selectedValue="selectedCompany"
                  @close="closeCompanySearchModal"
                  @select="selectCompany"
                />
              </li>
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
    </div>

    <div class="row">
      <div class="col-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <div class="card-body">
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item d-flex align-items-center">
                    자재
                    <Modal :visible="isMaterialModalVisible"title="자재 검색"placeholder="자재명 검색":list="materials":selectedValue="selectedMaterial"@close="closeMaterialSearchModal"@select="selectMaterial"/>
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <input type="text" :value="selectedMaterial" readonly>
                    <i class="fas fa-search d-flex align-items-center"
                       style="font-size: 20px; cursor: pointer; margin-left: 10px;"
                       @click="openMaterialSearchModal"></i>
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

      <div class="col-1 d-flex flex-column align-items-center justify-content-center">
        <button @click="moveToSelected" class="btn btn-primary rounded-circle mb-3" style="width: 60px; height: 60px; font-size: 20px;">
          +
        </button>
        <button @click="moveToCustomer" class="btn btn-danger rounded-circle" style="width: 60px; height: 60px; font-size: 20px;">
          -
        </button>
      </div>

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
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '@/views/modal/Modal.vue'

export default {
  name: "Material Management",
  components: {
    Modal,
  },
  data() {
    return {
      customerList: [
        { id: 1, equip_id: 'A001', equip_name: '품목A', equip_type: 'EA', selected: false },
        { id: 2, equip_id: 'B002', equip_name: '품목B', equip_type: 'EA', selected: false },
      ],
      selectedList: [],
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
      },
      venList: [],
    };
  },
  methods: {
    toggleAll(listName, event) {
      const isChecked = event.target.checked;
      this[listName].forEach(item => {
        item.selected = isChecked;
      });
    },
    moveToSelected() {
      const movingItems = this.customerList.filter(item => item.selected);
      this.selectedList.push(...movingItems.map(item => ({ ...item, selected: false })));
      this.customerList = this.customerList.filter(item => !item.selected);
    },
    moveToCustomer() {
      const movingItems = this.selectedList.filter(item => item.selected);
      this.customerList.push(...movingItems.map(item => ({ ...item, selected: false })));
      this.selectedList = this.selectedList.filter(item => !item.selected);
    },
    goBack() {
      this.$router.push('/materlist');
    },
    openCompanySearchModal() {
      this.isCompanyModalVisible = true;
    },
    closeCompanySearchModal() {
      this.isCompanyModalVisible = false;
    },
    selectCompany(name) {
      this.selectedCompany = name;
    },
    openMaterialSearchModal() {
      this.isMaterialModalVisible = true;
    },
    closeMaterialSearchModal() {
      this.isMaterialModalVisible = false;
    },
    selectMaterial(name) {
      this.selectedMaterial = name;
    },
    async fetchCompanies() {
    try {
      const res = await axios.get('/api/vendors');
      console.log(res.data)
      this.companies = res.data;
    } catch (err) {
      console.error('회사 목록을 불러오는데 실패했습니다:', err);
    }
  },
  },
  computed: {
    filteredCompanies() {
      return this.companies.filter(company =>
        item.name.toLowerCase().includes(this.search.company.toLowerCase())
      );
    }
  },
  mounted() {
  this.fetchCompanies();
  },
}
</script>
