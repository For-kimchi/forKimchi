<template>
  <teleport to="body">
    <div v-if="visible" class="modal-backdrop">
      <div class="custom-modal">
        <!-- 제목 -->
        <div class="modal-header mb-3">
          <h5 class="modal-title">납품대상 조회</h5>
        </div>

        <!-- 검색 영역 -->
        <div class="d-flex align-items-center justify-content-between mb-3">
          <!-- 왼쪽: input -->
          <div class="d-flex align-items-center flex-grow-1 me-3">
            <div class="d-flex align-items-center flex-grow-1 me-3">
              <label class="fw-bold fs-6 mb-0 me-2" style="flex: 0 0 100px;">시작일자</label>
              <input v-model="searchStart" type="date" class="form-control border flex-grow-1 text-center"
                @keyup.enter="search" />
            </div>
            <div class="d-flex align-items-center flex-grow-1">
              <label class="fw-bold fs-6 mb-0 me-2" style="flex: 0 0 100px;">종료일자</label>
              <input v-model="searchEnd" type="date" class="form-control border flex-grow-1 text-center"
                @keyup.enter="search" />
            </div>
          </div>

          <!-- 오른쪽: 버튼 -->
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-primary" @click="search">조회</button>
            <button type="button" class="btn btn-secondary" @click="$emit('close')">닫기</button>
          </div>
        </div>
        <!-- 검색 결과 테이블 -->
        <table class="table table-hover">
          <thead>
            <tr>
              <th>주문상세ID</th>
              <th>제품ID</th>
              <th>주문수량</th>
              <th>납품예정일자</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in results" :key="item.key" @click="selectItem(item)" style="cursor: pointer">
              <td>{{ item.order_detail_id }}</td>
              <td>{{ item.prod_id }}</td>
              <td>{{ item.order_amount }}</td>
              <td>{{ yyyyMMdd(item.deliv_due_date) }}</td>
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
      searchStart: this.getTodayDate(0),
      searchEnd: this.getTodayDate(7),
      results: [],
    };
  },
  methods: {
    async search() {
      let params = {
        startDate: this.searchStart,
        endDate: this.searchEnd,
      }

      let list = await axios.get('/api/delivTarget', {
        params
      }).catch(err => console.log(err));

      this.results = list.data;
    },
    selectItem(item) {
      this.$emit('select', item);
      this.$emit('close');
    },
    resetState() {
      this.searchStart = this.getTodayDate(0);
      this.searchEnd = this.getTodayDate(7);
      this.results = []
    },
    getTodayDate(plus) {
      const today = new Date();

      today.setDate(today.getDate() + plus);

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
      yyyyMMdd(fullDateTime) { 
        let date = new Date(fullDateTime);
        return date.toISOString().split('T')[0]
      }
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
  max-width: 800px;
  box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
}
</style>
