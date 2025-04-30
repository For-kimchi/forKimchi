<template>
    <teleport to="body">
      <div v-if="visible" class="modal-backdrop">
        <div class="custom-modal">
          <!-- 제목 -->
          <div class="modal-header mb-3">
            <h5 class="modal-title">Item Search</h5>
          </div>
  
<!-- 검색 영역 -->
<div class="d-flex align-items-center justify-content-between mb-3">
  <!-- 왼쪽: input -->
  <div class="flex-grow-1 me-3">
    <input
      v-model="search"
      type="text"
      class="form-control"
      placeholder="Search..."
    />
  </div>

  <!-- 오른쪽: 버튼 -->
  <div class="d-flex gap-2">
    <button class="btn btn-primary" @click="doSearch">Search</button>
    <button class="btn btn-outline-secondary" @click="$emit('close')">Close</button>
  </div>
</div>


  
          <!-- 검색 결과 테이블 -->
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Key</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in results"
                :key="item.key"
                @click="selectItem(item)"
                style="cursor: pointer"
              >
                <td>{{ item.key }}</td>
                <td>{{ item.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </teleport>
  </template>
  
  <script>
  export default {
    name: 'SearchModal',
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
      doSearch() {
        // 임시 검색 데이터
        this.results = [
          { key: 'A001', name: 'Apple' },
          { key: 'B002', name: 'Banana' },
          { key: 'C003', name: 'Cherry' },
        ].filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        );
      },
      selectItem(item) {
        this.$emit('select', item.key);
        this.$emit('close');
      },
    },
    emits: ['close', 'select']
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
  