<template>
  <div class="p-4">

    <!-- 검색 영역 -->
    <div class="mb-3 d-flex align-items-center">
      <label class="me-2">자재명</label>
      <input v-model="search" type="text" class="form-control w-25 me-2">
      <button @click="searchData" class="btn btn-primary">검색</button>
    </div>

    <!-- 검사결과 테이블 -->
    <h5 class="mb-2">자재검사결과</h5>
    <table class="table table-bordered text-center align-middle">
      <thead class="table-light">
        <tr>
          <th>검사일자</th>
          <th>자재명</th>
          <th>자재번호</th>
          <th>LOT</th>
          <th>검사결과</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in filteredList" :key="idx" @click="selectItem(item)" :class="{'table-primary': selectedItem && selectedItem.lot === item.lot}">
          <td>{{ item.date }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.number }}</td>
          <td>{{ item.lot }}</td>
          <td>{{ item.result }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 버튼 그룹 -->
    <div class="my-3">
      <button class="btn btn-success me-2">입고</button>
      <button class="btn btn-info">전수검사</button>
    </div>

    <!-- 상세 테이블 -->
    <h5 class="mb-2">자재검사상세</h5>
    <table class="table table-bordered text-center align-middle">
      <thead class="table-light">
        <tr>
          <th>검사일자</th>
          <th>항목</th>
          <th>규격</th>
          <th>방법</th>
          <th>검사결과</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(detail, idx) in selectedDetails" :key="idx">
          <td>{{ detail.date }}</td>
          <td>{{ detail.item }}</td>
          <td>{{ detail.standard }}</td>
          <td>{{ detail.method }}</td>
          <td>{{ detail.result }}</td>
          <td>
            <div v-if="detail.status === '검사중'" class="badge bg-warning text-dark">검사중</div>
            <div v-else class="form-check">
              <input class="form-check-input" type="checkbox" :checked="detail.checked">
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const search = ref('');
const selectedItem = ref(null);

const list = ref([
  { date: '2024-03-21', name: '소금', number: '001', lot: 'M06', result: '정상', status: '입고' },
  { date: '2024-03-21', name: '엿젓', number: '002', lot: 'M07', result: '불량', status: '대기' },
  { date: '2024-03-21', name: '배추', number: '003', lot: 'M08', result: '정상', status: '검사완료' },
  { date: '2024-09-10', name: '엿젓', number: '002', lot: 'M07', result: '불량', status: '검사중' },
  { date: '2024-03-21', name: '배추', number: '003', lot: 'M08', result: '정상', status: '검사완료' },
  { date: '2024-03-21', name: '소금', number: '001', lot: 'M06', result: '불량', status: '폐기' },
]);

const details = ref({
  'M07': [
    { date: '2024-09-10', item: '염도', standard: '20% ~ 25%', method: '전기전도도 측정', result: '등록', status: '' },
    { date: '2024-09-10', item: 'ph', standard: '4.2 ~ 4.5', method: 'PH 측정', result: '등록', status: '검사중', checked: true },
    { date: '2024-09-10', item: '이물검사', standard: '없음', method: '육안 검사', result: '등록', status: '', checked: false },
  ]
});

const filteredList = computed(() => {
  if (!search.value) return list.value;
  return list.value.filter(item => item.name.includes(search.value));
});

const selectedDetails = computed(() => {
  if (!selectedItem.value) return [];
  return details.value[selectedItem.value.lot] || [];
});

function selectItem(item) {
  selectedItem.value = item;
}

function searchData() {
  // 검색 버튼은 computed에서 자동 갱신되기 때문에 별도 처리 필요 없음
}
</script>

<style scoped>
.table-primary {
  background-color: #cfe2ff !important;
}
</style>