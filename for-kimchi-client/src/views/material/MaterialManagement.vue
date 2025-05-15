<template>
  <div class="container-fluid py-4">

    <div class="text-end mb-3">
      <button class="btn btn-success" @click="mateAdd">저장</button>
      <!-- <button class="btn btn-danger" >삭제</button> -->
      <button class="btn btn-info" @click="goBack">닫기</button>
    </div>
    <div class="row">
  <div class="col-12 text-end">
    <button class="btn btn-outline-primary mb-2" @click="goToProdOrderPage">
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
                회사
                <Modal :visible="isCompanyModalVisible" title="회사 검색" placeholder="회사명 검색" :list="companies" :selectedValue="selectedCompany" @close="closeCompanySearchModal" @select="selectCompany"/>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <input type="text" readonly v-model="vendor.vendor_name">
                <i class="fas fa-search d-flex align-items-center" style="font-size: 20px; cursor: pointer; margin-left: 10px;" @click="openProdVendor"></i>
              </li>
              <li class="list-group-item" style="margin-left: 20px;">납기예정일자</li>
              <li class="list-group-item"><input type="date"  v-model="req_due_date"></li>
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
                    <input type="text" v-model="search.material" @keyup.enter ="handleClick" class="form-control mb-2"placeholder="자재명을 입력하세요"/>
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
                    <!-- <th>선택</th> -->
                    <th>발주일자</th>
                    <th>발주번호</th>
                    <th>거래처</th>
                    <th>사용자명</th>
                    <th>자재명</th>
                    <th>수량</th>
                    <th>단위</th>
                    <th>납기예정일자</th>
                    <th>발주상태</th>
                    <th>비고</th>
                    <!-- <th>승인일자</th>
                    <th>승인자</th> -->
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="materialList.length > 0">
                    <tr v-for="(info, index) in materialList" :key="info.id" @click="updateMateList(info.req_id)">
                      <td>{{ index + 1 }}</td>
                      <!-- <td><MaterialCheckbox></MaterialCheckbox></td> -->
                      <td>{{ info.req_date }}</td>
                      <td>{{ info.req_id }}</td>
                      <td>{{ info.vendor_id }}</td>
                      <td>{{ info.employee_id }}</td>
                      <td>{{ info.mate_name }}</td>
                      <td>{{ info.req_amount }}</td>
                      <td>{{ info.mate_unit }}</td>
                      <td>{{ info.req_due_date }}</td>
                      <td><button class="btn btn-sm btn-warning" disabled>{{ info.req_status }}</button></td>
                      <td>{{ info.memo }}</td>
                      <!-- <td>{{ info.confirm_date }}</td>
                      <td>{{ info.manager_id }}</td> -->
                      <!-- <td>{{ info.req_status }}({{ typeof info.req_status }})</td> -->
                      <td>
                      <button class="btn btn-danger" @click.stop="deleteRow(index)" v-if="info.req_status == '발주등록'">삭제</button>
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
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '@/views/modal/Modal.vue'
import VendorModal from '../modal/VendorModal.vue';
// import MaterialCheckbox from '../../components/MaterialCheckbox.vue';


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
      mateList: [],
      matReqList: [],
      req_due_date: '',
      initialMateInfo: null,
      updates: {},
      action: '수정',
      companies: [],
      materialList: [],
      mateListInsert: [],
      // mate_name:[],
      // req_amount:[],
      // mate_unit:[],
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
    //생산지시조회 페이지 이동
    goToProdOrderPage() {
    this.$router.push({ name: 'MateProdOrder' });
  },
    toggleAll(listName, event) {
    const isChecked = event.target.checked;
    this[listName].forEach(item => { item.selected = isChecked;});
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
async updateMateList(reqId) {
  let ajaxRes = await axios.get(`/api/mateListInsert/${reqId}`)
                          .catch(err=> console.log(err));
                           console.log('조회 결과:', ajaxRes.data);
  this.selectedList = ajaxRes.data;
},
// this.action = '수정';
// this.updates = { ...info };

// this.selectedCompany = info.vendor_id;
// this.vendor.vendor_name = info.vendor_id; // 또는 vendor_name 필드가 있다면 그것으로 대체

// this.req_due_date = info.req_due_date;

// try {
//   const response = await axios.get(`/api/materialList/${info.id}`);
//   this.selectedList = response.data.map(item => ({
//     mate_id: item.mate_id,
//     mate_name: item.mate_name,
//     mate_unit: item.mate_unit,
//     req_amount: item.req_amount,
//     selected: false
//   }));
// } catch (error) {
//   console.error('자재 상세 조회 실패:', error);
//   alert('자재 상세 정보를 불러오는 데 실패했습니다.');
// }

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
    // async mateSave(mateSaveInfo) {
    //   console.log(mateSaveInfo);
    //   if(Object.keys(mateSaveInfo).length > 0){
    //         let  ajaxRes =
    //         await axios.put(`/api/mateSave`, mateSaveInfo)
    //                    .catch(err => console.log(err));
    //         this.update = ajaxRes.data;
    //         alert('저장 완료');

    //     }else{
    //       alert('항목이 선택되지 않았습니다.')
    //     };
    // },

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
    employee_id: 'EMP-001',
    req_due_date: this.req_due_date,
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


  // async mateAdd() {
  //     let info = this.mateList[mate_id];

  //     await this.handleRowClick(info.mate_id);
  //     let mateInfo = {
  //       mate_id: info.mate_id,
  //       mate_detail_list: this.matReqList
  //     };

  //     let ajaxRes = await axios.post(`/api/mateSave`, mateInfo)
  //                               .catch(err => console.log(err));
  //     let sqlRes = ajaxRes.data; ---> dateXXXXXXX
  //     let mateDtInfo = sqlRes.affectedRow

  //     if(mateDtInfo > 0) {
  //       alert('저장되었습니다.');
  //       this.$router.push('/mateSave');
  //     } else {
  //       alert ('저장이 실패하였습니다.');
  //     }
  //   }



  
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
  // const autoMaterials = sessionStorage.getItem('auto_materials');
  // if (autoMaterials) {
  //   const data = JSON.parse(autoMaterials);

  //   // 예시: editForm에 값 세팅
  //   this.editForm.prod_order_lot = data.prod_order_lot;
  //   this.editForm.order_date = data.order_date;
  //   this.editForm.order_amount = data.order_amount;
  //   this.editForm.order_status = data.order_status;
  //   this.editForm.memo = data.memo;

  //   sessionStorage.removeItem('auto_materials'); // 한 번만 사용
  // }
  },
}
</script>
