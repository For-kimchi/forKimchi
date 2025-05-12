<template>
  <div class="container-fluid">
    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">검사항목 관리</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">
        <div class="col-md-3">
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
                    <th class="align-middle text-center">검사Id</th>
                    <th class="align-middle text-center">검사명</th>
                    <th class="align-middle text-center">검사기준치</th>
                    <th class="align-middle text-center">검사항목</th>
                    <th class="align-middle text-center">작업</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in optionList" v-bind:key="option_id">
                    <td class="align-middle text-center">{{ item.option_id }}</td>
                    <td class="align-middle text-center">{{ item.option_name }}</td>
                    <td class="align-middle text-center">{{ item.option_standard }}</td>
                    <td class="align-middle text-center">{{ item.option_method }}</td>
                    <td class="align-middle text-center">
                      <button class="btn btn-warning" v-on:click="editOption(item)">수정</button>
                      <button class="btn btn-danger ms-2" v-on:click="delOption(item.option_id)">삭제</button>
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
            <label class="form-label me-2 mb-0" style="width: 100px;">검사기준치</label>
            <input v-model="selected.option_standard" type="text" class="form-control border text-center" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0" style="width: 100px;">검사항목</label>
            <input v-model="selected.option_method" type="text" class="form-control border text-center" />
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
    data() {
      return {
        textValue: "",

        action: '추가', // 액션(추가/수정)
        items: [], // 검사기준 목록
        optionList: [],
        selected: {
          option_id: '',
          option_name: '',
          option_standard: '',
          option_method: ''
        },
      };
    },
    created() {
      this.selectOption();
    },
    methods: {
      // 조회
      async selectOption() {
        let ajaxRes =
          await axios.get(`/api/options`)
          .catch(err => console.log(err));
        this.optionList = ajaxRes.data;
      },

      // 수정(담기만)
      async editOption(item) {
        const {option_id, ...item_} = item;
        this.selected = item_;
        this.selected.option_id = option_id;
        this.action = '수정';

    
      },

      // 저장 (추가/수정)
      async save() {
        let result = await axios.post('/api/options', this.selected)
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
      codeToName(code, codeArray) {
        return codeToName(code, codeArray);
      },

      // 삭제
      async delOption(option_id) {
  let ajaxRes = await axios.delete(`/api/options/${option_id}`)
                           .catch(err => console.log(err));
  let sqlRes = ajaxRes?.data;
  let result = sqlRes?.affectedRows;
  if (result > 0) {
    alert('정상적으로 삭제되었습니다.');
    this.selectOption(); // 목록 새로고침
  } else {
    alert('삭제되지 않았습니다.');
  }
},

      // 폼 초기화
      resetForm() {
        this.selected = {
          option_id: '',
          option_name: '',
          option_standard: '',
          option_method: ''
        };
        this.action = '추가';
      }
    },
  };
</script>