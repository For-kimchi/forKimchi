<template>
  <div class="container-fluid">
    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">검사항목</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " >제품</label>
            <input v-model="prod" type="checkbox" placeholder="제품" @click="handleCheckbox('prod')"/>
            <label class="form-label me-2 mb-0 " >자재</label>
            <input v-model="mate" type="checkbox" placeholder="자재" @click="handleCheckbox('mate')"/>
            <button class="btn btn-info ms-3" style="margin: 10px 10px 10px 10px;" @click="">조회</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">검사기준목록</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive mb-4" style="max-height: 600px; overflow-y: auto;">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="align-middle text-center">검사ID</th>
                    <th class="align-middle text-center">검사명</th>
                    <th class="align-middle text-center">검사기준치</th>
                    <th class="align-middle text-center">검사항목</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, idx) in items" v-bind:key="product.prod_id" @click="editItem(product)">
                    <td class="align-middle text-center">{{ product.prod_id }}</td>
                    <td class="align-middle text-center">{{ product.prod_name }}</td>
                    <td class="align-middle text-center">{{ product.prod_size }}</td>
                    <td class="align-middle text-center">{{ product.prod_unit }}</td>
                    <td class="align-middle text-center">{{ product.prod_type }}</td>
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
            <label class="form-label me-2 mb-0 " style="width: 100px;">검사ID</label>
            <input v-model="selected.prod_id" type="text" class="form-control border text-center" readonly/>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">검사명</label>
            <input v-model="selected.prod_name" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">검사기준치</label>
            <input v-model="selected.prod_size" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">검사항목</label>
            <input v-model="selected.prod_unit" type="text" class="form-control border text-center" />
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
        searchName: "",
        searchId: "",
        searchType: "",
        items: [],
        codes: [],
        selected: {},
        action: '등록',
      };
    },
    computed: {
    },
    methods: {
    async getBasicProd() {
      const params = {};
      
      if (this.searchName) params.prod_name = this.searchName;
      if (this.searchId) params.prod_id = this.searchId;
      if (this.searchType) params.prod_type = this.searchType;

      let res = await axios.get('/api/basicProd', {
        params
      })
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
      editItem(product) {
        this.action = '수정',
        this.selected = {
          ...product
        };
      },
      resetForm() {
        this.action = '등록',
        this.selected = {
        };
      },
      async save() {
        let result = await axios.post('/api/basicProd', this.selected)
          .catch(err => console.log(err));
        console.log(result);

        if (result.data.affectedRows > 0) {
          alert('저장이 완료되었습니다');
          this.getBasicProd();
          this.resetForm();
        } else {
          alert('저장 과정에서 오류가 발생했습니다');
        }

      },
    },
    created() {
      this.getProdType();
    }
  };
</script>