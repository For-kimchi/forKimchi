<template>
  <div class="container my-4">

    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="search">조회</button>
        <button class="btn btn-info ms-2" @click="resetForm">등록</button>
      </div>
    </div>

    <div class="card p-3 mb-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
          <h6 class="text-white text-capitalize ps-3">공정조회</h6>
        </div>
      </div>
      <div class="row g-3 mt-3">
        <div class="col-md-3">
          공정명<input v-model="searchName" type="text" class="form-control" placeholder="공정명" />
        </div>
        <div class="col-md-3">
          공정ID<input v-model="searchId" type="text" class="form-control" placeholder="공정ID" />
        </div>
        <div class="col-md-3">
          공정분류
          <select v-model="searchType" class="form-select">
            <option value="">전체</option>
            <option v-for="code in codes" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">제품목록</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive mb-4" style="max-height: 600px; overflow-y: auto;">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="align-middle text-center">No</th>
                    <th class="align-middle text-center">제품코드</th>
                    <th class="align-middle text-center">제품명</th>
                    <th class="align-middle text-center">규격</th>
                    <th class="align-middle text-center">단위</th>
                    <th class="align-middle text-center">제품분류</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in items" :key="item.prod_id" @click="editItem(item)">
                    <td class="align-middle text-center">{{ idx + 1 }}</td>
                    <td class="align-middle text-center">{{ item.prod_id }}</td>
                    <td class="align-middle text-center">{{ item.prod_name }}</td>
                    <td class="align-middle text-center">{{ item.prod_size }}</td>
                    <td class="align-middle text-center">{{ item.prod_unit }}</td>
                    <td class="align-middle text-center">{{ item.prod_type }}</td>
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
          <div class="mb-3">
            <label class="form-label">제품코드</label>
            <input v-model="selected.prod_id" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">제품명</label>
            <input v-model="selected.prod_name" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">규격</label>
            <input v-model="selected.prod_size" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">단위</label>
            <input v-model="selected.prod_unit" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">제품분류</label>
            <select v-model="selected.prod_type" class="form-select">
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
    name: "공정관리",
    data() {
      return {
        searchName: "",
        searchId: "",
        searchType: "",
        items: [],
        codes: [],
        selected: {},
      };
    },
    computed: {
    },
    methods: {
    async getBasicProd() {
      let res = await axios.get('/api/basicProd')
        .catch(err => console.log(err));
      this.items = res.data;
    },
    async getProdType() {
      let res = await axios.get(`/api/codes/F1`)
        .catch(err => console.log(err));
      this.codes = res.data;
    },
      search() {
        this.getBasicProd();
      },
      editItem(item) {
        this.selected = {
          ...item
        };
      },
      resetForm() {
        this.selected = {
        };
      },
      save() {
        this.resetForm();
      },
    },
    created() {
      this.getProdType();
    }
  };
</script>