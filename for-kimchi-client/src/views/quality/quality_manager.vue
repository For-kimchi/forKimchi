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
          <h6 class="text-white text-capitalize ps-3">대상정보</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">

        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">검사대상명</label>
            <input v-model="target.target_name" type="text" class="form-control border text-center" @keydown.prevent
                  @click="showProd = true" placeholder="검사대상명"/>
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">검사대상ID</label>
            <input v-model="target.target_id" type="text" class="form-control border text-center" @keydown.prevent 
            placeholder="검사대상ID" />
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
              <button class="btn btn-success m-0" @click="searchOptions">검색</button>
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

  // pinia import
  // stores 
  import { useUserStore } from "@/stores/user"; 
  // state, getter => mapState 
  // actions => mapActions 
  import { mapState } from 'pinia';

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
      options: [],
      std: {
        std_details: [],
      }
    };
  },
  computed: {
      // ...mapState(store, []), ...mapActions(store, [])
      // stores 에 등록된 이름으로 사용
      // 아래 처럼 등록했을 경우 computed 에 등록된 값과 동일하게 사용
      // 로그인 유저 정보는 userInfo 에 객체 형태로 저장되어있음
      // 아래 와 같은 형태로 사용
      // <template></template> 내부에서는 userInfo.employee_id
      // export default {} 내부에서는 this.userInfo.employee_id
      ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
    },
  methods: {
    async getStd() {

      let result = await axios.get('/api/stds', {
        params: {
          target_id : this.target.target_id
        }
      }).catch(err => console.log(err));

      this.std = result.data;
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
      this.std.std_details.splice(index, 1);
    },
    addRows(index) {
      
      let exist = this.std.std_details.some(item => item.option_id === this.options[index].option_id);

      if (!exist) {
        this.std.std_details.push({
          ...this.options[index],
        })
      } else {
        alert('이미 추가된 검사입니다')
      }
    },
    async save() {

      let res = await axios.post('/api/stds', this.std)
      .catch(err => console.log(err));
      
      if (res.data.success) {
        alert('등록 성공');
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