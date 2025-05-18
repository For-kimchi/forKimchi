<template>
  <div class="container-fluid">

    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="selectOption">조회</button>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">검사항목관리</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">검사명</label>
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="검사명" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">검사ID</label>
            <input v-model="searchId" type="text" class="form-control border text-center" placeholder="검사ID" />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">검사목록</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive mb-4" style="max-height: 600px; overflow-y: auto;">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="align-middle text-center">검사ID</th>
                    <th class="align-middle text-center">검사명</th>
                    <th class="align-middle text-center">검사기준</th>
                    <th class="align-middle text-center">비교기준</th>
                    <th class="align-middle text-center">검사방법</th>
                    <th class="align-middle text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in optionList" v-bind:key="option_id">
                    <td class="align-middle text-center">{{ item.option_id }}</td>
                    <td class="align-middle text-center">{{ item.option_name }}</td>
                    <td class="align-middle text-center">{{ item.option_standard }}</td>
                    <td class="align-middle text-center">{{ codeToName(item.option_operator, codes) }}</td>
                    <td class="align-middle text-center">{{ item.option_method }}</td>
                    <td class="align-middle text-center">
                      <button class="btn btn-warning m-0" v-on:click="editOption(index)">수정</button>
                      <!-- <button class="btn btn-danger m-0 ms-2" v-on:click="delOption(index)">삭제</button> -->
                    </td>
                  </tr>
                  <tr v-if="optionList.length === 0">
                    <td colspan="5" class="text-center">검색된 결과가 없습니다</td>
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
            <label class="form-label me-2 mb-0" style="width: 100px;">검사ID</label>
            <input v-model="selected.option_id" type="text" class="form-control border text-center" readonly />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0" style="width: 100px;">검사명</label>
            <input v-model="selected.option_name" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0" style="width: 100px;">검사기준</label>
            <input v-model="selected.option_standard" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0" style="width: 100px;">비교기준</label>
            <select v-model="selected.option_operator" class="form-select border text-center">
              <option v-for="code in codes" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0" style="width: 100px;">검사방법</label>
            <input v-model="selected.option_method" type="text" class="form-control border text-center" />
          </div>
          <div class="text-end">
            <button class="btn btn-info m-0" @click="save">저장</button>
            <button class="btn btn-secondary m-0 ms-2" @click="resetForm">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  import { codeToName } from '../../utils/common';

  // pinia import
  // stores 
  import { useUserStore } from "@/stores/user"; 
  // state, getter => mapState 
  // actions => mapActions 
  import { mapState } from 'pinia';

  export default {
    data() {
      return {
        action: '추가', // 액션(추가/수정)
        optionList: [],
        selected: {},
        searchName: '',
        searchId: '',
        codes: [],
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
    created() {
      // this.selectOption();
      this.getOptionType();
    },
    methods: {
      // 조회
      async selectOption() {

        let params = {};

        if (this.searchId) params.option_id = this.searchId;
        if (this.searchName) params.option_name = this.searchName;

        let ajaxRes =
          await axios.get(`/api/options`, {
            params
          })
          .catch(err => console.log(err));
        this.optionList = ajaxRes.data;
      },

      // 수정(담기만)
      async editOption(index) {
        this.selected =  {
          ...this.optionList[index]
        }
        this.action = '수정';
      },

      // 저장 (추가/수정)
      async save() {
        let result = await axios.post('/api/options', this.selected)
          .catch(err => console.log(err));
        console.log(result);

        if (result.data.affectedRows > 0) {
                    this.$swal({
    text: "저장이 완료되었습니다",
    icon: "success"
  });
          this.selectOption();
          this.resetForm();
        } else {
            this.$swal({
    text: "저장 과정에서 오류가 발생했습니다",
    icon: "error"
  });
        }
      },

      // 삭제
      // async delOption(index) {
      // },

      // 폼 초기화
      resetForm() {
        this.selected = {};
        this.action = '추가';
      },

      async getOptionType() {
        let res = await axios.get(`/api/codes/C2`)
          .catch(err => console.log(err));
        this.codes = res.data;
      },

      codeToName(code, codeArray) {
        return codeToName(code, codeArray);
      },
    },
  };
</script>