<template>
  <div class="container-fluid py-4">

    <div class="text-end mb-3">
      <button class="btn btn-success" @click="mateSave(selectedList)">저장</button>
      <button class="btn btn-danger" >삭제</button>
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
                <Modal :visible="isCompanyModalVisible" title="회사 검색" placeholder="회사명 검색" :list="companies" :selectedValue="selectedCompany" @close="closeCompanySearchModal" @select="selectCompany"/>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <input type="text" readonly v-model="vendor.vendor_name">
                <i class="fas fa-search d-flex align-items-center" style="font-size: 20px; cursor: pointer; margin-left: 10px;" @click="openProdVendor"></i>
              </li>
              <li class="list-group-item" style="margin-left: 20px;">납기예정일자</li>
              <li class="list-group-item"><input type="date"></li>
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
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <input type="text" v-model="search.material" @input="handleClick" class="form-control mb-2"placeholder="자재명 검색"/>
                    <i class="fas fa-search d-flex align-items-center" style="font-size: 20px; cursor: pointer; margin-left: 10px;" @click ="handleClick(info)"></i>
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
                    <th><input type="checkbox" @change="toggleAll('searchMate', $event)"></th>
                    <th>품목코드</th>
                    <th>품목명</th>
                    <th>단위</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="searchMate.length > 0">
                    <tr v-for="(info, index) in searchMate" :key="info.mate_name">
                      <td><input type="checkbox" v-model="info.selected"></td>
                      <td>{{ info.mate_id }}</td>
                      <td>{{ info.mate_name }}</td>
                      <td>{{ info.mate_unit }}</td>
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
                      <td>{{ info.mate_id }}</td>
                      <td>{{ info.mate_name }}</td>
                      <td><input type="number" v-model="info.req_amount" style="width: 100px;"></td>      
                      <td>{{ info.mate_unit }}</td>      
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
  <VendorModal :visible="showVendor" @close="showVendor = false" @select="onSelectVendor" />
</template>

<script>
import axios from 'axios';
import Modal from '@/views/modal/Modal.vue'
import VendorModal from '../modal/VendorModal.vue';

export default {
  name: "Material Management",
  components: {
    Modal,
    VendorModal,
  },
  data() {
    return { 
      selectedList: [],
      selectedCompany: '',
      selectedMaterial: '',
      isCompanyModalVisible: false,
      isMaterialModalVisible: false,
      search: {
        company: '',
        material: '', 
      },
      searchMate: [],
      venList: [],
      showVendor: false,
      vendor : {},
      mateSaveInfo :[],
    };
  },
  methods: {
    toggleAll(listName, event) {
      const isChecked = event.target.checked;
      this[listName].forEach(item => {
        item.selected = isChecked;
      });
    },
    handleClick() {
      console.log('selectedMaterial:', this.selectedMaterial);
    axios
    .get('/api/mateList', {
      params: { mate_name: this.selectedMaterial }, // 검색어 전달
    })
    .then((response) => {
      this.searchMate = response.data;
    })
    .catch((error) => {
      console.error('검색 실패:', error);
    });
    },
// 항목선택여부 알림.
// if(Object.keys(planDetailList).length > 0){
//     let  ajaxRes =
//     await axios.put(`/api/planDetailSave`, planDetailList)
//                .catch(err => console.log(err));
//     this.update = ajaxRes.data;
//     alert('저장 완료');

// }else{
//   alert('항목이 선택되지 않았습니다.')
// };
    async mateSave(mateSaveInfo) {
      console.log(mateSaveInfo);
      if(Object.keys(mateSaveInfo).length > 0){
            let  ajaxRes =
            await axios.put(`/api/mateSave`, mateSaveInfo)
                       .catch(err => console.log(err));
            this.update = ajaxRes.data;
            alert('저장 완료');

        }else{
          alert('항목이 선택되지 않았습니다.')
        };
    },

    moveToSelected() {
      const movingItems = this.searchMate.filter(item => item.selected);
      this.selectedList.push(...movingItems.map(item => ({
        mate_id: item.mate_id,
        mate_name: item.mate_name,
        mate_unit: item.mate_unit,
        req_amount: item.req_amount,
      // mate_unit: item.mate_unit,
      selected: false
      })));
      this.searchMate = this.searchMate.filter(item => !item.selected);
    },
    moveToCustomer() {
      const movingItems = this.selectedList.filter(item => item.selected);
      this.searchMate.push(...movingItems.map(item => ({
      mate_id: item.equip_id,
      mate_name: item.equip_name,
      req_amount: item.req_amount,
      mate_unit: item.mate_unit,
      selected: false
      })));
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
    onSelectVendor(vendor) {
      this.vendor = vendor
    },
    openProdVendor() {
      this.showVendor = true;
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
