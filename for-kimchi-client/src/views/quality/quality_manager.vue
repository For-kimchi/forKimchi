<template>
  <div class="container-fluid mt-5">

    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">대상정보</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">

        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">대상명</label>
            <input v-model="target.target_name" type="text" class="form-control border text-center" @keydown.prevent
                  @click="showProd = true" placeholder="대상명"/>
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">대상ID</label>
            <input v-model="target.target_id" type="text" class="form-control border text-center" @keydown.prevent 
            placeholder="대상ID" />
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
              <h6 class="text-white text-capitalize ps-3">검사기준정보</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 400px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center font-weight-bolder">검사ID</th>
                    <th class="text-center font-weight-bolder">검사명</th>
                    <th class="text-center font-weight-bolder">검사기준</th>
                    <th class="text-center font-weight-bolder">비교기준</th>
                    <th class="text-center font-weight-bolder"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in std.std_details" v-bind:key="info.std_detail_id">
                    <td class="text-center">
                      {{ info.option_id }}
                    </td>
                    <td class="text-center">
                      {{ info.option_name }}
                    </td>
                    <td class="text-center">
                      {{ info.option_standard }}
                    </td>
                    <td class="text-center">
                      {{ codeToName(info.option_operator, codes) }}
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
              <h6 class="text-white text-capitalize ps-3">검사정보</h6>
            </div>
          </div>

          <div class="card-body px-0 pb-2">
            <div class="row g-3 px-3">
            <div class="col-md-6">
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="검사명" />
            </div>
            <div class="col-md-3">
              <button class="btn btn-primary m-0" @click="searchOptions">검색</button>
            </div>
          </div>
            <div class="table-responsive p-0" style="max-height: 400px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center font-weight-bolder">검사ID</th>
                    <th class="text-center font-weight-bolder">검사명</th>
                    <th class="text-center font-weight-bolder">검사기준</th>
                    <th class="text-center font-weight-bolder">비교기준</th>
                    <th class="text-center font-weight-bolder"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in options" v-bind:key="info.option_id">
                    <td class="text-center">
                      {{ info.option_id }}
                    </td>
                    <td class="text-center">
                      {{ info.option_name }}
                    </td>
                    <td class="text-center">
                      {{ info.option_standard }}
                    </td>
                    <td class="text-center">
                      {{ codeToName(info.option_operator, codes) }}
                    </td>
                    <td class="text-center">
                      <button class="btn btn-success m-0" @click="addRows(index)">추가</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TargetModal :visible="showProd" @close="showProd = false" @select="onSelectTarget" />
  </div>
</template>



<script>
import TargetModal from '../modal/TargetModal.vue';
import axios from 'axios';
import { codeToName } from '@/utils/common';

export default {
  components: {
    TargetModal,
  },
  data() {
    return {
      showProd: false,
      searchName: '',
      materials: [],
      codes: [],
      target: {},
      stds: {},
      options: [],
      std: {
        std_details: [],
      }
    };
  },
  computed: {
  },
  methods: {
    async getStd() {

      let result = await axios.get('/api/stds', {
        params: {
          target_id : this.target.target_id
        }
      }).catch(err => console.log(err));

      this.stds = result.data;
    },
    async getOptions() {

      let result = await axios.get('/api/options', {
        params: {
          option_name: this.searchName
        }
      }).catch(err => console.log(err));

      this.options = result.data;
    }
    ,
    onSelectTarget(target) {
      this.target = target;
      this.getStd();
    }, 
    searchOptions() {
      this.getOptions();
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
      } else {
        alert('이미 추가된 자재입니다')
      }
    },
    async save() {

      this.bom.employee_id = this.employee.employee_id;

      let res = await axios.post('/api/basicBom', this.bom)
      .catch(err => console.log(err));
      
      if (res.data.success) {
        alert('등록 성공');
        this.bom = {};
        this.materials = [];
        this.prod = {};
      } else {
        alert('등록 실패');
      }

    },
    async getOptionType() {
      let res = await axios.get(`/api/codes/C2`)
        .catch(err => console.log(err));
      this.codes = res.data;
    },
    codeToName(code, codeArray) {
      return codeToName(code, codeArray);
    }
  },
  created() {
    this.getOptionType();
  },
};
</script>