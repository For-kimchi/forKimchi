<template>
  <div class="container-fluid">

    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="getBasicEmployee">조회</button>
        <button class="btn btn-info ms-2" @click="resetForm">등록</button>
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
            <label class="form-label me-2 mb-0 " style="width: 100px;">사원명</label>
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="거래처명" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">사원ID</label>
            <input v-model="searchId" type="text" class="form-control border text-center" placeholder="거래처ID" />
          </div>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">부서</label>
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
            <label class="form-label me-2 mb-0 " style="width: 100px;">권한</label>
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
            <label class="form-label me-2 mb-0 " style="width: 100px;">상태</label>
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
                  <tr v-for="(item, idx) in items" :key="item.vendor_id" @click="editItem(index)">
                    <td class="align-middle text-center">{{ item.vendor_id }}</td>
                    <td class="align-middle text-center">{{ item.vendor_name }}</td>
                    <td class="align-middle text-center">{{ codeToName(item.vendor_type) }}</td>
                    <td class="align-middle text-center">{{ item.vendor_number }}</td>
                    <td class="align-middle text-center">{{ item.vendor_tel }}</td>
                    <td class="align-middle text-center">{{ item.vendor_addr }}</td>
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
        <div class="card p-3">
          <h5>{{ action }}</h5>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">거래처ID</label>
            <input v-model="selected.vendor_id" type="text" class="form-control border text-center" readonly/>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">거래처명</label>
            <input v-model="selected.vendor_name" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">사업자번호</label>
            <input v-model="selected.vendor_number" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">연락처</label>
            <input v-model="selected.vendor_tel" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">주소</label>
            <textarea v-model="selected.vendor_addr" class="form-control border"></textarea>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">거래처분류</label>
            <select v-model="selected.vendor_type" class="form-select border text-center">
              <option v-for="code in codes" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
          <div class="text-end">
            <button class="btn btn-primary" @click="save">저장</button>
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
    name: "제품관리",
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
      async save() {
        let result = await axios.post('/api/basicEmployee', this.selected)
          .catch(err => console.log(err));
        console.log(result);

        if (result.data.affectedRows > 0) {
          alert('저장이 완료되었습니다');
          this.getBasicEmployee();
          this.resetForm();
        } else {
          alert('저장 과정에서 오류가 발생했습니다');
        }

      },
      codeToName(code) {
        for (let item of this.codes) {
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