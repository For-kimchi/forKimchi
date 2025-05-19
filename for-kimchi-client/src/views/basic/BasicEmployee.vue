<template>
  <div class="container-fluid">

    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="getBasicEmployee">조회</button>
        <button class="btn btn-secondary ms-2" @click="resetSearch">초기화</button>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">사원조회</h6>
        </div>
      </div>
      <div class="row g-2 mt-3 px-3">
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">사원명</label>
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="사원명" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">사원ID</label>
            <input v-model="searchId" type="text" class="form-control border text-center" placeholder="사원ID" />
          </div>
        </div>
      </div>
      <div class="row g-2 mt-1 mb-3 px-3">
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">부서</label>
            <select v-model="searchDept" class="form-select border text-center">
              <option value="">전체</option>
              <option v-for="code in dept" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">권한</label>
            <select v-model="searchType" class="form-select border text-center">
              <option value="">전체</option>
              <option v-for="code in type" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">상태</label>
            <select v-model="searchStatus" class="form-select border text-center">
              <option value="">전체</option>
              <option v-for="code in status" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">사원목록</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive mb-4" style="max-height: 600px; overflow-y: auto;">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="align-middle text-center">사원ID</th>
                    <th class="align-middle text-center">사원명</th>
                    <th class="align-middle text-center">부서</th>
                    <th class="align-middle text-center">권한</th>
                    <th class="align-middle text-center">이메일</th>
                    <th class="align-middle text-center">연락처</th>
                    <th class="align-middle text-center">상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in items" :key="item.employee_id" @click="editItem(idx)">
                    <td class="align-middle text-center">{{ item.employee_id }}</td>
                    <td class="align-middle text-center">{{ item.employee_name }}</td>
                    <td class="align-middle text-center">{{ codeToName(item.employee_dept, dept) }}</td>
                    <td class="align-middle text-center">{{ codeToName(item.employee_type, type) }}</td>
                    <td class="align-middle text-center">{{ item.employee_email }}</td>
                    <td class="align-middle text-center">{{ item.employee_tel }}</td>
                    <td class="align-middle text-center">{{ codeToName(item.employee_status, status) }}</td>
                  </tr>
                  <tr v-if="items.length === 0">
                    <td colspan="6" class="text-center">검색된 결과가 없습니다</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3 mb-1">
          <h5>{{ action }}</h5>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">사원ID</label>
            <input v-model="selected.employee_id" type="text" class="form-control border text-center" readonly/>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">사원명</label>
            <input v-model="selected.employee_name" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">부서</label>
            <select v-model="selected.employee_dept" class="form-select border text-center">
              <option v-for="code in dept" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">권한</label>
            <select v-model="selected.employee_type" class="form-select border text-center">
              <option v-for="code in type" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">이메일</label>
            <input v-model="selected.employee_email" type="email" class="form-control border text-center" :disabled="action === '수정'"/>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">연락처</label>
            <input v-model="selected.employee_tel" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">상태</label>
            <select v-model="selected.employee_status" class="form-select border text-center">
              <option v-for="code in status" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
          <div class="text-end">
            <button class="btn btn-info" @click="save">저장</button>
            <button class="btn btn-secondary ms-2" @click="resetForm">취소</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "사원관리",
    data() {
      return {
        searchName: '',
        searchId: '',
        searchDept: '',
        searchType: '',
        searchStatus: '',
        items: [],
        codes: [],
        selected: {},
        action: '등록',
        dept: [],
        type: [],
        status: [],
      };
    },
    computed: {
    },
    methods: {
    async getBasicEmployee() {
      const params = {};
      
      if (this.searchName) params.employee_name = this.searchName;
      if (this.searchId) params.employee_id = this.searchId;
      if (this.searchDept) params.employee_dept = this.searchDept;
      if (this.searchType) params.employee_type = this.searchType;
      if (this.searchStatus) params.employee_status = this.searchStatus;

      let res = await axios.get('/api/basicEmployee', {
        params
      })
        .catch(err => console.log(err));
      this.items = res.data;
      console.log(this.items);
    },
      editItem(index) {
        this.action = '수정',
        this.selected = {
          ...this.items[index]
        };
      },
      resetForm() {
        this.action = '등록',
        this.selected = {};
      },
      resetSearch() {
        this.searchName = '';
        this.searchId = '';
        this.searchType = '';
        this.searchStatus = '';
        this.searchDept = '';
      },
      async save() {

        if (!this.selected.employee_name ||
          !this.selected.employee_email ||
          !this.selected.employee_status ||
          !this.selected.employee_type ||
          !this.selected.employee_dept
        ) {
          this.$swal({
          text: '입력되지 않은 정보가 있습니다',
          icon: 'warning'
          });
          return;
        }

        let res = await axios.post('/api/basicEmployee', this.selected)
          .catch(err => console.log(err));

        if (res.data.success > 0) {
        this.$swal({
          text: '저장이 완료되었습니다',
          icon: 'success'
        });
          this.getBasicEmployee();
          this.resetForm();
        } else {
        this.$swal({
          text: '저장 중 오류가 발생했습니다',
          icon: 'error'
        });
        }

      },
      codeToName(code, codes) {
        for (let item of codes) {
          if (item.sub_code == code) return item.sub_code_name;
        }
        return '';
      },
    async getDept() {
      let res = await axios.get(`/api/codes/L1`)
        .catch(err => console.log(err));
      this.dept = res.data;
    }
    ,
    async getType() {
      let res = await axios.get(`/api/codes/J1`)
        .catch(err => console.log(err));
      this.type = res.data;
    }
    ,
    async getStatus() {
      let res = await axios.get(`/api/codes/K1`)
        .catch(err => console.log(err));
      this.status = res.data;
    }
    },
    created() {
      this.getDept();
      this.getType();
      this.getStatus();
    }
  };
</script>