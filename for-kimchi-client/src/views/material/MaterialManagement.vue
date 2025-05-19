<template>
  <div class="container-fluid py-4">

    <div class="d-flex flex-wrap justify-content-end gap-2 mb-3">
      <button class="btn btn-outline-primary " style="min-width: 10px;" @click="openProdOrderModal">
        📋 생산지시서 조회
      </button>
      <button class="btn btn-success shadow rounded-pill " style="min-width: 10px;" @click="mateAdd">
        💾 등록
      </button>
      <button class="btn btn-primary shadow rounded-pill " style="min-width: 10px;" @click="mateUpdate">
        ✏️ 수정
      </button>
      <!-- <button class="btn btn-danger shadow rounded-pill flex-fill" style="min-width: 120px;">🗑 삭제</button> -->
      <button class="btn btn-secondary shadow rounded-pill " style="min-width: 10px;" @click="goBack">
        ❌ 닫기
      </button>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">발주정보입력 </h6>
            </div>
          </div>

          <div class="card-body">
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item d-flex align-items-center">
                거래처
                <Modal :visible="isCompanyModalVisible" title="거래처 검색" placeholder="거래처 검색" :list="companies"
                  :selectedValue="selectedCompany" @close="closeCompanySearchModal" @select="selectCompany" />
              </li>
              <li class="list-group-item d-flex align-items-center">
                <input type="text" readonly v-model="vendor.vendor_name">
                <i class="fas fa-search d-flex align-items-center"
                  style="font-size: 20px; cursor: pointer; margin-left: 10px; " @click="openProdVendor"></i>
              </li>
              <li class="list-group-item d-flex align-items-center" style="margin-left: 20px; width: 130px;">납기예정일자</li>
              <li class="list-group-item d-flex align-items-center"><input type="date" v-model="req_due_date"></li>
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
              <h6 class="text-white text-capitalize ps-3">자재리스트</h6>
              <!-- <div class="card-body">
              </div> -->
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <ul class="list-group list-group-horizontal" style="margin-left: 20px;">
              <li class="list-group-item d-flex align-items-center">
                자재명
              </li>
              <li class="list-group-item d-flex align-items-center">
                <input type="text" v-model="search.material" @keyup.enter="handleClick" class="form-control mb-2"
                  placeholder="자재명을 입력하세요" />
                <i class="fas fa-search d-flex align-items-center"
                  style="font-size: 20px; cursor: pointer; margin-left: 10px;" @click="handleClick(info)"></i>
              </li>
            </ul>
            <div class="table-wrapper" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center mb-0 justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th><input type="checkbox" @change="toggleAll('searchMate', $event)"></th>
                    <th>품목코드</th>
                    <th>자재명</th>
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
                    <td colspan="5">검색된 자재가 없습니다</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-1 d-flex flex-column align-items-center justify-content-center">
        <button @click="moveToSelected" class="btn btn-primary rounded-circle mb-3"
          style="width: 60px; height: 60px; font-size: 20px;">
          +
        </button>
        <button @click="moveToCustomer" class="btn btn-danger rounded-circle"
          style="width: 60px; height: 60px; font-size: 20px;">
          -
        </button>
      </div>

      <div class="col-5">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">선택된 자재</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-wrapper" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center mb-0 justify-content-center mb-0 table-hover">
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
                    <tr v-for="(info, index) in selectedList" :key="index">
                      <td><input type="checkbox" v-model="info.selected"></td>
                      <td>{{ info.mate_id }}</td>
                      <td>{{ info.mate_name }}</td>
                      <td><input type="number" v-model="info.req_amount" style="width: 100px;"></td>
                      <td>{{ info.mate_unit }}</td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="5">추가된 자재가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <VendorModal :visible="showVendor" @close="showVendor = false" @select="onSelectVendor" :vendor_type="'1m'" />
  <!-- 자재발주조회리스트 -->
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
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
                    <th>No</th>
                    <th>발주일자</th>
                    <th>발주번호</th>
                    <th>거래처</th>
                    <th>발주자명</th>
                    <th>납기예정일자</th>
                    <th>발주상태</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="materialList.length > 0">
                    <tr v-for="(info, index) in materialList" :key="info.id" class="group cursor-pointer" @click="updateMateList(index)">
                      <td>{{ index + 1 }}</td>
                      <td >{{ info.req_date }}</td>
                      <td>{{ info.req_id }}</td>
                      <td>{{ info.vendor_name }}</td>
                      <td>{{ info.employee_name }}</td>
                      <td>{{ info.req_due_date }}</td>
                      <td><button class="btn btn-sm btn-warning" disabled>{{ info.req_status }}</button></td>
                      <td>
                        <button class="btn btn-danger" @click.stop="deleteRow(index)"
                          v-if="info.req_status == '발주등록'">삭제</button>
                      </td>
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
    <MateOrderModal v-if="isProdOrderModalOpen" @close="isProdOrderModalOpen = false"
      @save-order="handleProdOrderSave" />

  </div>
</template>

<script>
import axios from 'axios';
import Modal from '@/views/modal/Modal.vue'
import VendorModal from '../modal/VendorModal.vue';

// pinia import
// stores 
import { useUserStore } from "@/stores/user";
// state, getter => mapState 
// actions => mapActions 
import { mapState } from 'pinia';
// import MateModal from '../modal/MateModal.vue';

import MateOrderModal from '../modal/MateOrderModal.vue';
// const isProdOrderModalOpen = ref(false)
// import MaterialCheckbox from '../../components/MaterialCheckbox.vue';


export default {

  name: "Material Management",
  components: {
    Modal,
    VendorModal,
    MateOrderModal,
  },
  data() {
    return {
      isProdOrderModalOpen: false,
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
      vendor: {},
      req_due_date: this.formatDateAfter(null, 14),
      action: '수정',
      companies: [],
      materialList: [],
      req_amount: null,
      prodOrder: [],
      bomList: [],
    };

  },
  created() {
    this.getMateList();
    const stored = sessionStorage.getItem('auto_materials');
    if (stored) {
      this.materialList = JSON.parse(stored);
      sessionStorage.removeItem('auto_materials'); // 한 번만 쓰고 삭제
    }
  },

  methods: {
    openProdOrderModal() {
      this.isProdOrderModalOpen = true;
    },
    handleProdOrderSave({ prodOrder, bomList }) {

      this.selectedList = bomList.map(item => ({
        ...item,
        req_amount: item.mate_amount * item.order_amount,
        mate_amount: item.mate_amount,
      }));
      console.log("selectedList req_amount: ", this.selectedList.map(item => item.req_amount));
      // bomList에 없는값들 선언
      this.prod_order_lot = prodOrder.prod_order_lot;
      this.prod_id = prodOrder.prod_id;
    },

    //생산지시조회 페이지 이동
    goToProdOrderPage() {
      this.$router.push({ name: 'MateProdOrder' });
    },
    toggleAll(listName, event) {
      const isChecked = event.target.checked;
      this[listName].forEach(item => { item.selected = isChecked; });
    },

    handleClick() {
      axios.get('/api/mateList', {
        params: { mate_name: this.search.material }
      })
        .then((response) => {
          this.searchMate = response.data;
        })
        .catch((error) => {
          console.error('검색 실패:', error);
        });
    },
    // 발주관리페이지 발주항목 클릭시 자재리스트 자동 입력
    async updateMateList(index) {
      let selected = this.materialList[index];

      let ajaxRes = await axios.get(`/api/mateListInsert/${selected.req_id}`)
        .catch(err => console.log(err));
      this.selectedList = ajaxRes.data;
      this.vendor.vendor_id = selected.vendor_id;
      this.vendor.vendor_name = selected.vendor_name;
      this.req_due_date = selected.req_due_date;
    },

    // 발주서 리스트 전체조회
    async getMateList() {
      try {
        const ajaxRes = await axios.get(`/api/materialList`);
        this.materialList = ajaxRes.data;
      } catch (error) {
        console.error('자재 목록 조회 실패:', error);
      }
    },

    // 자재발주관리에서 삭제버튼 클릭시 발주삭제
    async deleteRow(index) {
      const reqId = this.materialList[index].req_detail_id;

      const result = await this.$swal({
        text: '정말 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      });

      if (!result.isConfirmed) return;

      try {
        await axios.delete(`/api/materialList/${reqId}`);
        this.materialList.splice(index, 1);
        await this.$swal({
          text: '삭제되었습니다.',
          icon: 'success'
        });
      } catch (err) {
        console.error('삭제 실패:', err);
        await this.$swal({
          text: '삭제 중 오류가 발생했습니다.',
          icon: 'error'
        });
      }
    },



moveToSelected() {
  const movingItems = this.searchMate.filter(item => item.selected);

  // 중복 자재 체크를 위해 이미 selectedList에 있는 mate_id 목록 생성
  const existingIds = new Set(this.selectedList.map(item => item.mate_id));

  // 중복된 자재 이름을 담을 배열
  const duplicates = [];

  // 중복이 아닌 자재만 필터링해서 추가할 리스트 생성
  const itemsToAdd = movingItems.filter(item => {
    if (existingIds.has(item.mate_id)) {
      duplicates.push(item.mate_name);
      return false; // 중복이니 제외
    }
    return true; // 중복 아니면 추가
  });

  // 중복 자재가 있으면 alert 띄우기
  if (duplicates.length > 0) {
  this.$swal.fire({
    icon: 'warning',
    title: '중복 자재',
    text: `이미 추가된 자재가 있습니다:\n${duplicates.join(', ')}`,
    confirmButtonText: '확인'
  });
}


  // 중복 없는 자재만 selectedList에 추가
  this.selectedList.push(...itemsToAdd.map(item => ({
    mate_id: item.mate_id,
    mate_name: item.mate_name,
    mate_unit: item.mate_unit,
    req_amount: 0,
    selected: false
  })));

  // searchMate에서 선택된 자재는 삭제 (중복 제외한 나머지만)
  this.searchMate = this.searchMate.filter(item => !item.selected);
},

moveToCustomer() {
  const movingItems = this.selectedList.filter(item => item.selected);

  // searchMate에 이미 있는 자재 ID 목록
  const existingIds = new Set(this.searchMate.map(item => item.mate_id));

  // 중복 자재는 제외하고 추가
  const itemsToAdd = movingItems.filter(item => !existingIds.has(item.mate_id));

  this.searchMate.push(...itemsToAdd.map(item => ({
    mate_id: item.mate_id,
    mate_name: item.mate_name,
    req_amount: item.req_amount,
    mate_unit: item.mate_unit,
    selected: false
  })));

  // selectedList에서는 선택된 항목은 무조건 제거
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
    resetForm() {
      this.selectedList = [];
      this.searchMate = [];
      this.vendor = {};
      this.req_due_date = '';
      this.selectedCompany = '';
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



    // 빈값에 대한 각각의 alert창 구성
    async mateAdd() {
      if (!this.vendor || !this.vendor.vendor_id) {
        // 회사명 확인
        await this.$swal({
          text: "회사명을 입력하세요.",
          icon: "warning"
        });
        return;
      }
      // 납기예정일자 확인
      if (!this.req_due_date) {
        await this.$swal({
          text: "납기예정일자를 입력하세요.",
          icon: "warning"
        });
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dueDate = new Date(this.req_due_date);
      if (dueDate < today) {
        await this.$swal({
          text: "납기예정일자는 오늘 이후 날짜여야 합니다.",
          icon: "warning"
        });
        return;
      }
      // 자재 선택여부 확인
      if (this.selectedList.length === 0) {
        await this.$swal({
          text: "자재가 없습니다.",
          icon: "warning"
        });
        return;
      }
      // 자재 수량확인
      const mateAmounts = this.selectedList.filter(item => !item.req_amount || item.req_amount <= 0);
      if (mateAmounts.length > 0) {
        await this.$swal({
          text: "수량을 모두 입력해주세요.",
          icon: "warning"
        });
        return;
      }
      // 서버로 보낼 데이터 구성
      const mateInfo = {
        mate_detail_list: this.selectedList.map(item => ({
          mate_id: item.mate_id,
          req_amount: item.req_amount,
        })),
        vendor_id: this.vendor.vendor_id,
        req_due_date: this.req_due_date,
        employee_id: this.userInfo.employee_id,
      };

      try {
        const ajaxRes = await axios.post(`/api/mateSave`, mateInfo);
        if (ajaxRes.data.affectedRows > 0) {
          await this.$swal({
            text: "저장되었습니다.",
            icon: "success"
          });
          this.resetForm();
          this.getMateList();
          this.$router.push('/matma');
        } else {
          await this.$swal({
            text: "저장이 실패하였습니다.",
            icon: "error"
          });
        }
      } catch (err) {
        console.error(err);
        await this.$swal({
          text: "저장 중 오류가 발생했습니다.",
          icon: "error"
        });
      }
    },

    async mateUpdate() {
      if (!this.vendor || !this.vendor.vendor_id) {
        // 회사명 확인
        await this.$swal({
          text: "회사명을 입력하세요.",
          icon: "warning"
        });
        return;
      }

      if (!this.req_due_date) {
        // 납기예정일자 확인
        await this.$swal({
          text: "납기예정일자를 입력하세요.",
          icon: "warning"
        });
        return;
      }

      if (this.selectedList.length === 0) {
        // 자재확인
        await this.$swal({
          text: "자재가 없습니다.",
          icon: "warning"
        });
        return;
      }

      const mateAmounts = this.selectedList.filter(item => !item.req_amount || item.req_amount <= 0);
      if (mateAmounts.length > 0) {
        // 자재수량 확인
        await this.$swal({
          text: "수량을 모두 입력해주세요.",
          icon: "warning"
        });
        return;
      }
      // 서버로 보낼 데이터 구성
      const mateInfo = {
        req_id: this.selectedList[0].req_id,
        mate_detail_list: this.selectedList.map(item => ({
          mate_id: item.mate_id,
          req_amount: item.req_amount,
        })),
        vendor_id: this.vendor.vendor_id,
        req_due_date: this.req_due_date,
        employee_id: this.userInfo.employee_id,
      };

      await axios.put(`/api/mateSave`, mateInfo).then(async res => {
        if (res.data.affectedRows > 0) {
          await this.$swal({
            text: "수정이 정상적으로 이루어졌습니다.",
            icon: "success"
          });
          this.getMateList();
          this.resetForm();
        }
      }).catch(async (err) => {
        console.log(err);
        await this.$swal({
          text: "수정 중 오류가 발생했습니다.",
          icon: "error"
        });
      });
    },


    formatDateAfter(dateString, after) {

      let date;

      if (dateString) {
        date = new Date(dateString);
      } else {
        date = new Date();
      }

      date.setDate(date.getDate() + after);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;

    }
  },
  computed: {
    filteredCompanies() {
      return this.companies.filter(company =>
        item.name.toLowerCase().includes(this.search.company.toLowerCase())
      );
    },
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
  },
  mounted() {
    this.fetchCompanies();
  },
}
</script>
