<template>
  <div class="container-fluid">

    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-info" @click="save">저장</button>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">제품정보조회</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">

        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품명</label>
            <input v-model="prod.prod_name" type="text" class="form-control border text-center" @keydown.prevent
                  @click="showProd = true" placeholder="제품명"/>
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품ID</label>
            <input v-model="prod.prod_id" type="text" class="form-control border text-center" @keydown.prevent placeholder="제품ID" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품규격</label>
            <input v-model="prod.prod_size" type="text" class="form-control border text-center" @keydown.prevent placeholder="제품규격" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품단위</label>
            <input v-model="prod.prod_unit" type="text" class="form-control border text-center" @keydown.prevent placeholder="제품단위" />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Left Side: Products -->
      <div class="col-md-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">BOM 정보</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 400px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center font-weight-bolder">자재ID</th>
                    <th class="text-center font-weight-bolder">자재명</th>
                    <th class="text-center font-weight-bolder">자재수량</th>
                    <th class="text-center font-weight-bolder">자재단위</th>
                    <th class="text-center font-weight-bolder"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in bom.bom_details" v-bind:key="info.bom_detail_id">
                    <td class="text-center">
                      {{ info.mate_id }}
                    </td>
                    <td class="text-center">
                      {{ info.mate_name }}
                    </td>
                    <td class="text-center">
                      <input class="form-control border text-center" type="number" v-model="info.mate_amount">
                    </td>
                    <td class="text-center">
                      {{ info.mate_unit }}
                    </td>
                    <td class="text-center">
                      <button class="btn btn-danger m-0" @click="removeRows(index)">삭제</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Materials -->
      <div class="col-md-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">자재 정보</h6>
            </div>
          </div>


          <div class="card-body px-0 pb-2">
            <div class="row g-3 px-3">
            <div class="col-md-6">
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="자재명" />
            </div>
            <div class="col-md-3">
              <button class="btn btn-success m-0" @click="searchMaterial">검색</button>
            </div>
          </div>
            <div class="table-responsive p-0" style="max-height: 400px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center font-weight-bolder">자재명</th>
                    <th class="text-center font-weight-bolder">자재ID</th>
                    <th class="text-center font-weight-bolder">자재단위</th>
                    <th class="text-center font-weight-bolder">자재분류</th>
                    <th class="text-center font-weight-bolder"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in materials" v-bind:key="info.mate_id">
                    <td class="text-center">
                      {{ info.mate_id }}
                    </td>
                    <td class="text-center">
                      {{ info.mate_name }}
                    </td>
                    <td class="text-center">
                      {{ info.mate_unit }}  
                    </td>
                    <td class="text-center">
                      {{ codeToName(info.mate_type, codes) }} 
                    </td>
                    <td class="text-center">
                      <button v-if="!bom.bom_details.some(detail => detail.mate_id == info.mate_id)" class="btn btn-success m-0" @click="addRows(index)">추가</button>
                      <button v-else class="btn btn-light m-0" disabled>추가</button>
                    </td>
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
import ProdModal from '../modal/ProdModal.vue';
import axios from 'axios';
import { formatDate, codeToName} from '@/utils/common';
import {
    mapState
  } from 'pinia';
  import {
    useUserStore
  } from "@/stores/user";

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
      codes: [],
    };
  },
  computed: {
    ...mapState(useUserStore, [
        "isLoggedIn",
        "userInfo",
      ])
  },
  methods: {
    async getBom() {

      let result = await axios.get('/api/basicBom', {
        params: {
          prod_id : this.prod.prod_id
        }
      }).catch(err => console.log(err));

      this.bom = result.data;
    },
    async getMate() {

      let result = await axios.get('/api/basicMate', {
        params: {
          mate_name : this.searchName
        }
      }).catch(err => console.log(err));

      this.materials = result.data;
    }
    ,
    onSelectProd(prod) {
      this.prod = prod;
      this.getBom();
    }, 
    searchMaterial() {
      if (!this.prod.prod_id) {
        this.$swal({
          text: '제품을 먼저 선택해주세요',
          icon: 'warning'
        });
        return;
      }
      this.getMate();
    },
    removeRows(index) {
      this.bom.bom_details.splice(index, 1);
    },
    addRows(index) {
      
      let exist = this.bom.bom_details.some(item => item.mate_id === this.materials[index].mate_id);

      if (!exist) {
        this.bom.bom_details.push({
          ...this.materials[index],
          mate_amount: 0,
        })
      }
    },
    async save() {

      if (!this.prod.prod_id) {
        this.$swal({
          text: '대상제품을 먼저 선택해주세요',
          icon: 'warning'
        });
        return;
      }

      for (let detail of this.bom.bom_details) {
        if (!detail.mate_amount) {
        this.$swal({
          text: '수량이 입력되지 않은 자재 항목이 있습니다',
          icon: 'warning'
        });
          return;
        }
      }

      this.bom.employee_id = this.userInfo.employee_id;

      let res = await axios.post('/api/basicBom', this.bom)
      .catch(err => console.log(err));
      
      if (res.data.success) {
        this.$swal({
          text: '저장이 완료되었습니다',
          icon: 'success'
        });
      } else {
        this.$swal({
          text: '저장 중 오류가 발생했습니다다',
          icon: 'error'
        });
      }

    },
    async getMateType() {
      let res = await axios.get(`/api/codes/U1`)
        .catch(err => console.log(err));
      this.codes = res.data;
    },
    codeToName(code, codeArray) {
      return codeToName(code, codeArray);
    }
  },
  created() {
    this.getMateType();
  },
};
</script>

