<template>
  <div class="container-fluid">

    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="search">조회</button>
        <button class="btn btn-secondary ms-2" @click="resetSearch">초기화</button>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">공정조회</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">공정명</label>
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="공정명" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">공정ID</label>
            <input v-model="searchId" type="text" class="form-control border text-center" placeholder="공정ID" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">공정분류</label>
            <select v-model="searchType" class="form-select border text-center">
              <option value="">전체</option>
              <option v-for="code in codes" :key="code.sub_code" :value="code.sub_code">
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
              <h6 class="text-white text-capitalize ps-3">공정목록</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive mb-4" style="max-height: 600px; overflow-y: auto;">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="align-middle text-center">공정ID</th>
                    <th class="align-middle text-center">공정명</th>
                    <th class="align-middle text-center">공정분류</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in items" :key="item.proc_id" @click="editItem(item)">
                    <td class="align-middle text-center">{{ item.proc_id }}</td>
                    <td class="align-middle text-center">{{ item.proc_name }}</td>
                    <td class="align-middle text-center">{{ codeToName(item.proc_type) }}</td>
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
            <label class="form-label me-2 mb-0 " style="width: 100px;">공정ID</label>
            <input v-model="selected.proc_id" type="text" class="form-control border text-center" readonly/>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">공정명</label>
            <input v-model="selected.proc_name" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">공정분류</label>
            <select v-model="selected.proc_type" class="form-select border text-center">
              <option v-for="code in codes" :key="code.sub_code" :value="code.sub_code">
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
    name: "공정관리",
    data() {
      return {
        searchName: "",
        searchId: "",
        searchType: "",
        items: [],
        codes: [],
        selected: {},
        action: '등록',
      };
    },
    computed: {},
    methods: {
      async getBasicProc() {
        const params = {};

        if (this.searchName) params.proc_name = this.searchName;
        if (this.searchId) params.proc_id = this.searchId;
        if (this.searchType) params.proc_type = this.searchType;

        let res = await axios.get('/api/basicProc', {
            params
          })
          .catch(err => console.log(err));
        this.items = res.data;
      },
      async getProcType() {
        let res = await axios.get(`/api/codes/G1`)
          .catch(err => console.log(err));
        this.codes = res.data;
      },
      search() {
        this.getBasicProc();
      },
      editItem(item) {
        this.action = '수정',
          this.selected = {
            ...item
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
      },
      async save() {

        if (!this.selected.proc_name ||
          !this.selected.proc_type) {
          alert('입력되지 않은 정보가 있습니다');
          return;
        }

        let result = await axios.post('/api/basicProc', this.selected)
          .catch(err => console.log(err));
        console.log(result);

        if (result.data.affectedRows > 0) {
          alert('저장이 완료되었습니다');
          this.getBasicProc();
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
    },
    created() {
      this.getProcType();
    }
  };
</script>