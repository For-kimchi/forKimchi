<template>
  <teleport to="body">
    <div v-if="visible" class="modal-backdrop">
      <div class="custom-modal">
        <!-- 제목 -->
        <div class="modal-header mb-3">
          <h5 class="modal-title">제품 조회</h5>
        </div>

        <!-- 검색 영역 -->
        <div class="d-flex align-items-center justify-content-between mb-3">
          <!-- 왼쪽: input -->
          <div class="flex-grow-1 me-3">
            <input v-model="search" type="text" class="form-control border text-center" placeholder="제품명" @keyup.enter="searchProd"/>
          </div>

          <!-- 오른쪽: 버튼 -->
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-success m-0" @click="searchProd">조회</button>
            <button type="button" class="btn btn-secondary m-0" @click="$emit('close')">닫기</button>
          </div>
        </div>

        <!-- 검색 결과 테이블 -->
        <table class="table table-hover">
          <thead>
            <tr>
              <th class="text-center">제품ID</th>
              <th class="text-center">제품명</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in results" :key="item.prod_id" @click="selectItem(item)" style="cursor: pointer">
              <td class="text-center">{{ item.prod_id }}</td>
              <td class="text-center">{{ item.prod_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </teleport>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    props: {
      visible: Boolean,
    },
    data() {
      return {
        search: '',
        results: [],
      };
    },
    methods: {
      async searchProd() {
        let params = {
          prod_name: this.search
        }

        let list = await axios.get('/api/basicProd', {
          params
        }).catch(err => console.log(err));

        this.results = list.data;
      },
      selectItem(item) {
        this.$emit('select', item);
        this.$emit('close');
      },
      resetState() {
        this.search = ''
        this.results = []
      },
    },
    emits: ['close', 'select'],
    watch: {
      visible(newVal) {
        if (newVal) {
          this.resetState()
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1050;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .custom-modal {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    width: 50vw;
    max-width: 600px;
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    border-bottom: 1px solid #dee2e6;
  }
  </style>
  