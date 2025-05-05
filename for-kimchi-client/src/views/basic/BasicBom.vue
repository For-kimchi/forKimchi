<template>
  <div class="container my-4">
    <!-- Search Filter -->
    <div class="card p-3 mb-4">
      <div class="row g-3">
        <div class="col-md-3">
          <input v-model="prod.prod_name" type="text" class="form-control border text-center" @keydown.prevent
                  @click="showProd = true" placeholder="제품명" />
        </div>
        <div class="col-md-3">
          <input v-model="prod.prod_id" type="text" class="form-control border text-center" placeholder="제품ID" />
        </div>
        <div class="col-md-3">
          <input v-model="prod.prod_type" type="text" class="form-control border text-center" placeholder="제품분류" />
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary">저장</button>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Left Side: Products -->
      <div class="col-md-6">
        <div class="card p-3 mb-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">BOM 정보</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 300px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">자재명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">자재수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">자재단위</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7"></th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in bom.bom_detail" v-bind:key="info.bom_detail_id">
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.mate_id" readonly></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="number" v-model="info.mate_amount"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.mate_unit" readonly></td>
                    <td class="align-middle text-center">
                      <button class="btn btn-danger ms-2" @click="removeRows(index)">삭제</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Materials -->
      <div class="col-md-6">
        <div class="card p-3 mb-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">자재 정보</h6>
            </div>
          </div>


          <div class="card-body px-0 pb-2">
            <div class="row g-3 mt-2">
            <div class="col-md-6">
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="자재명" />
            </div>
            <div class="col-md-3">
              <button class="btn btn-primary" @click="searchMaterial">검색</button>
            </div>
          </div>
            <div class="table-responsive p-0" style="max-height: 300px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">자재명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">자재ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">주문수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">납품일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in materials" v-bind:key="info.order_detail_id">
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.mate_id" readonly></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.mate_name" readonly></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.mate_unit"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.mate_type"></td>
                    <td class="align-middle text-center">
                      <button class="btn btn-success ms-2" @click="addRows(index)">추가</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProdModal :visible="showProd" @close="showProd = false" @select="onSelectProd" />
  </div>
</template>



<script>
import ProdModal from '../business/ProdModal.vue';
import axios from 'axios';

export default {
  components: {
    ProdModal,
  },
  data() {
    return {
      showProd: false,
      searchName: '',
      bom: {},
      materials: [],
      prod:{},
    };
  },
  computed: {
  },
  methods: {
    async getBom() {

      let result = await axios.get('/api/basicBom', {
        params: {
          prod_id : this.prod.prod_id
        }
      })

      this.bom = result.data;
    },
    async getMate() {

      let result = await axios.get('/api/basicMate', {
        params: {
          mate_name : this.searchName
        }
      })

      this.materials = result.data;
    }
    ,
    onSelectProd(prod) {
      this.prod = prod;
      this.getBom();
    }, 
    searchMaterial() {
      this.getMate();
    },
    removeRows(index) {
      this.bom.bom_detail.splice(index, 1);
    },
    addRows(index) {
      
      let exist = this.bom.bom_detail.some(item => item.mate_id === this.materials[index].mate_id);

      if (!exist) {
        this.bom.bom_detail.push({
          mate_id: this.materials[index].mate_id,
          mate_amount: 0,
          mate_unitL: this.materials[index].mate_unit,
        })
      } else {
        alert('이미 추가된 자재입니다')
      }
    }
  },
  mounted() {
  },
};
</script>

