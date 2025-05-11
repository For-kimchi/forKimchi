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
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0">제품</label>
            <input v-model="selectedType" type="radio" value="PRD" @change="fetchQualityItems" />
            <label class="form-label me-2 mb-0">자재</label>
            <input v-model="selectedType" type="radio" value="MAT" @change="fetchQualityItems" />
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
                    <th class="align-middle text-center">작업</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in items" :key="item.option_id">
                    <td class="align-middle text-center">{{ item.option_id }}</td>
                    <td class="align-middle text-center">{{ item.option_name }}</td>
                    <td class="align-middle text-center">{{ item.option_standard }}</td>
                    <td class="align-middle text-center">{{ item.option_method }}</td>
                    <td class="align-middle text-center">
                      <button class="btn btn-warning" @click="editItem(item)">수정</button>
                      <button class="btn btn-danger ms-2" @click="deleteItem(item.option_id)">삭제</button>
                    </td>
                  </tr>
                  <tr v-if="items.length === 0">
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
      selectedType: '', // 자재(MAT) 또는 상품(PRD) 선택
      action: '추가', // 액션(추가/수정)
      items: [], // 검사기준 목록
      selected: {
        option_id: '',
        option_name: '',
        option_standard: '',
        option_method: ''
      },
    };
  },
  methods: {
    // 제품 및 자재를 기반으로 검사항목 조회
    async fetchQualityItems() {
      if (!this.selectedType) {
        alert("제품 또는 자재를 선택하세요.");
        return;
      }
      try {
        const response = await axios.get(`/api/items/${this.selectedType}`);
        this.items = response.data;
      } catch (error) {
        console.error(error);
        alert('검사항목 조회에 실패했습니다.');
      }
    },

    // 항목 수정
    editItem(item) {
      this.selected = { ...item };
      this.action = '수정';
    },

    // 항목 저장 (추가/수정)
    async save() {
      try {
        const method = this.action === '수정' ? 'put' : 'post';
        const url = this.action === '수정' 
        ? `/api/addItem/${this.selected.option_id}` 
        : '/api/items';

        const response = await axios[method](url, this.selected);
        this.fetchQualityItems(); // 다시 목록 조회
        this.resetForm();
        alert('저장되었습니다.');
      } catch (error) {
        console.error(error);
        alert('저장 실패!');
      }
    },

    // 항목 삭제
    async deleteItem(option_id) {
      try {
        const response = await axios.delete(`/api/items/${option_id}`);
        this.fetchQualityItems(); // 목록 갱신
        alert('삭제되었습니다.');
      } catch (error) {
        console.error(error);
        alert('삭제 실패!');
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
