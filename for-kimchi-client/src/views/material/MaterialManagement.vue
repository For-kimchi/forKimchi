<template>
  <div class="container-fluid py-4">

    <div class="text-end mb-3">
      <button class="btn btn-success me-2 shadow rounded-pill" @click="mateAdd">
        💾 등록
      </button>
      <button class="btn btn-primary me-2 shadow rounded-pill" @click="mateUpdate">
        ✏️ 수정
      </button>
      <!-- <button class="btn btn-danger me-2 shadow rounded-pill">🗑 삭제</button> -->
      <button class="btn btn-secondary shadow rounded-pill" @click="goBack">
        ❌ 닫기
      </button>
    </div>
    <div class="row">
      <div class="col-12 text-end">
        <button class="btn btn-outline-primary mb-2" @click="openProdOrderModal">
          📋 생산지시서 조회
        </button>
      </div>
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
                거래처
                <Modal :visible="isCompanyModalVisible" title="거래처 검색" placeholder="거래처 검색" :list="companies"
                  :selectedValue="selectedCompany" @close="closeCompanySearchModal" @select="selectCompany" />
              </li>
              <li class="list-group-item d-flex align-items-center">
                <input type="text" readonly v-model="vendor.vendor_name">
                <i class="fas fa-search d-flex align-items-center"
                  style="font-size: 20px; cursor: pointer; margin-left: 10px;" @click="openProdVendor"></i>
              </li>
              <li class="list-group-item" style="margin-left: 20px;">납기예정일자</li>
              <li class="list-group-item"><input type="date" v-model="req_due_date"></li>
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
                    자재명
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <input type="text" v-model="search.material" @keyup.enter="handleClick" class="form-control mb-2"
                      placeholder="자재명을 입력하세요" />
                    <i class="fas fa-search d-flex align-items-center"
                      style="font-size: 20px; cursor: pointer; margin-left: 10px;" @click="handleClick(info)"></i>
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
                    <td colspan="5">현재 데이터가 존재하지 않습니다</td>
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
                    <tr v-for="(info, index) in selectedList" :key="index">
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
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>발주일자</th>
                    <th>발주번호</th>
                    <th>거래처</th>
                    <th>발주자명</th>
                    <th>납기예정일자</th>
                    <th>발주상태</th>
                    <!-- <th>비고</th> -->
                    <!-- <th>승인일자</th>
                    <th>승인자</th> -->
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="materialList.length > 0">
                    <tr v-for="(info, index) in materialList" :key="info.id" @click="updateMateList(index)">
                      <td>{{ index + 1 }}</td>
                      <!-- <td><MaterialCheckbox></MaterialCheckbox></td> -->
                      <td>{{ info.req_date }}</td>
                      <td>{{ info.req_id }}</td>
                      <td>{{ info.vendor_name }}</td>
                      <td>{{ info.employee_name }}</td>
                      <td>{{ info.req_due_date }}</td>
                      <td><button class="btn btn-sm btn-warning" disabled>{{ info.req_status }}</button></td>
                      <!-- <td>{{ info.memo }}</td> -->
                      <!-- <td>{{ info.confirm_date }}</td>
                      <td>{{ info.manager_id }}</td> -->
                      <!-- <td>{{ info.req_status }}({{ typeof info.req_status }})</td> -->
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
      console.log("받은 생산지시서: ", prodOrder);
      console.log("받은 BOM 리스트:dddd ", this.bomList);
      console.log("selectedList==============", this.selectedList);
      this.selectedList = bomList.map(item => ({
        ...item,
        req_amount: item.mate_amount * item.order_amount,
        mate_amount: item.mate_amount,
      }));
      console.log("selectedList req_amount: ", this.selectedList.map(item => item.req_amount));
      // bomList에 없는값들 선언
      this.prod_order_lot = prodOrder.prod_order_lot;
      this.prod_id = prodOrder.prod_id;
      // this.order_amount = prodOrder.order_amount;

      // +,-버튼은 객체를 원하고 발주저장버튼은 배열은 원하므로 둘 다 사용하게끔 바꿈
      // mate_id등은 bomList에 있으니까 여기서 선언
      // if (Array.isArray(bomList) && bomList.length > 0) {
      //   this.selectedList = bomList.map(item => {
      //     console.log('초기 req_amount:', item.mate_amount);  // 실행 가능
      //     return {
      //       ...item,
      //       selected: true,
      //       req_amount: item.order_amount || 0
      //     };
      //   });
      // }

      // 리스트 테이블에 BOM 목록 채우기
      // this.selectedList = Array.isArray(bomList) ? bomList : [];
    },

    // <tr v-for="(info, index) in selectedList" :key="info.id">
    //      <td><input type="checkbox" v-model="info.selected"></td>
    //      <td>{{ info.mate_id }}</td>
    //      <td>{{ info.mate_name }}</td>
    //      <td><input type="number" v-model="info.req_amount" style="width: 100px;"></td>
    //      <td>{{ info.mate_unit }}</td>
    //  </tr>


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
      console.log("selectedList발주항목클릭1111111111111111111111", this.selectedList)
      this.vendor.vendor_id = selected.vendor_id;
      this.vendor.vendor_name = selected.vendor_name;
      this.req_due_date = selected.req_due_date;
    },


    //   handleModalConfirm(selectedItems) {
    //   // 모달에서 넘어온 자재들을 selectedList에 저장
    //   this.selectedList = selectedItems.map(item => ({
    //     mate_id: item.mate_id,
    //     mate_code: item.mate_code,
    //     mate_name: item.mate_name,
    //     mate_unit: item.mate_unit,
    //     req_amount: 1 // 기본 수량 1로 설정 (수정 가능)
    //   }));
    // },
    // handleMateAdd(mateList) {
    //   // mateList: mateModal에서 넘어온 자재 배열
    //   this.selectedList = mateList.map(item => ({
    //     mate_id: item.mate_id,
    //     mate_code: item.mate_code,
    //     mate_name: item.mate_name,
    //     mate_unit: item.mate_unit,
    //     req_amount: 1 // 체크박스 초기 선택 여부
    //   }));
    //   this.showModal = false;
    // },



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

      const reqId = this.materialList[index].req_detail_id; // 뒤에는 실제불러올 값인 req_id가 들어가야한다.

      if (!confirm('정말 삭제하시겠습니까?'))
        return;
      try {
        await axios.delete(`/api/materialList/${reqId}`);
        this.materialList.splice(index, 1); // 프론트에서도 삭제
        alert('삭제되었습니다.');
      } catch (err) {
        console.error('삭제 실패:', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    },

    moveToSelected() {
      const movingItems = this.searchMate.filter(item => item.selected);
      this.selectedList.push(...movingItems.map(item => ({
        mate_id: item.mate_id,
        mate_name: item.mate_name,
        mate_unit: item.mate_unit,
        req_amount: 0,
        // mate_unit: item.mate_unit, 
        selected: false
      })));
      this.searchMate = this.searchMate.filter(item => !item.selected);
    },
    moveToCustomer() {
      const movingItems = this.selectedList.filter(item => item.selected);
      this.searchMate.push(...movingItems.map(item => ({
        mate_id: item.mate_id,
        mate_name: item.mate_name,
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
      // 회사명 확인
      if (!this.vendor || !this.vendor.vendor_id) {
        alert("회사명을 입력하세요.");
        return;
      }

      // 납기 예정일 확인
      if (!this.req_due_date) {
        alert("납기예정일자를 입력하세요.");
        return;
      }

      // 현재 날짜보다 이전 날짜인지 확인
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간 제거 (날짜만 비교)

      const dueDate = new Date(this.req_due_date);
      if (dueDate < today) {
        alert("납기예정일자는 오늘 이후 날짜여야 합니다.");
        return;
      }

      // 자재 선택 여부 확인
      if (this.selectedList.length === 0) {
        alert("자재가 없습니다.");
        return;
      }

      // 자재 수량 확인
      const mateAmounts = this.selectedList.filter(item => !item.req_amount || item.req_amount <= 0);
      if (mateAmounts.length > 0) {
        alert("수량을 모두 입력해주세요.");
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
          alert("저장되었습니다.");
          this.resetForm();
          this.getMateList();
          this.$router.push('/matma');
        } else {
          alert("저장이 실패하였습니다.");
        }
      } catch (err) {
        console.error(err);
        alert("저장 중 오류가 발생했습니다.");
      }
    },

    async mateUpdate() {
      // 회사명 확인
      if (!this.vendor || !this.vendor.vendor_id) {
        alert("회사명을 입력하세요.");
        return;
      }

      // 납기 예정일 확인
      if (!this.req_due_date) {
        alert("납기예정일자를 입력하세요.");
        return;
      }

      // 자재 선택 여부 확인
      if (this.selectedList.length === 0) {
        alert("자재가 없습니다.");
        return;
      }

      // 자재 수량 확인
      const mateAmounts = this.selectedList.filter(item => !item.req_amount || item.req_amount <= 0);
      if (mateAmounts.length > 0) {
        alert("수량을 모두 입력해주세요.");
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

      await axios.put(`/api/mateSave`, mateInfo).then(res => {
        if (res.data.affectedRows > 0) {
          alert("수정이 정상적으로 이루어졌습니다.")
          this.getMateList();
          this.resetForm();
        }
      }).catch((err) => console.log(err));
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
