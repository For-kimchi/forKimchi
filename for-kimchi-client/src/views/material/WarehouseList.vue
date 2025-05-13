<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->

    <!-- <div class="row">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">검색</h6>
                </div>
            </div>
            <div>
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item">자재명</li>
                <li class="list-group-item"><input type="text"></li>
                <li class="list-group-item">담당자</li>
                <li class="list-group-item"><input type="text"></li>
                 <li class="list-group-item">일정</li>
                <li class="list-group-item"><input type="date"> ~ <input type="date"></li> 
                <li class="list-group-item"><button class="btn btn-success ms-2 me-2" @:click="">조회</button></li>
            </ul>
            </div>
        </div>
    </div> -->
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3 px-3 d-flex justify-content-between align-items-center">
             <h6 class="text-white text-capitalize m-0">창고현황</h6>
    
            <div class="btn-group bg-white rounded px-2 py-1 shadow-sm" role="group" aria-label="조회 방식 선택">
              <input type="radio" class="btn-check" id="lotView" value="lot" v-model="searchType" @change="wareSearch" autocomplete="off">
              <label class="btn btn-sm btn-outline-success mb-0" for="lotView">LOT별 조회</label>

              <input type="radio" class="btn-check" id="groupView" value="group" v-model="searchType" @change="wareSearch" autocomplete="off">
              <label class="btn btn-sm btn-outline-success mb-0" for="groupView">자재별 묶음 조회</label>
        </div>
    </div>
</div>
          
<div class="card-body px-0 pb-2">
  <div class="table-responsive p-0">
    <table class="table align-items-center mb-0">
      <thead v-if="searchType === 'lot'">
        <tr>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">창고명</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">LOT</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고수량</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고일자</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">담당자</th>
        </tr>
      </thead>
      <thead v-else-if="searchType === 'group'">
        <tr>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고수량</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">최근 입고일자</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">LOT 수</th>
        </tr>
      </thead>

      <tbody>
        <!-- LOT별 조회일 때 -->
        <tr v-if="searchType === 'lot'" v-for="(info, index) in wareList" :key="info.warehouse_id">
          <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.warehouse_id }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.mate_lot }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.mate_id }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.mate_amount }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.inbound_date }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.employee_id }}</td>
        </tr>

        <!-- 자재별 묶음 조회일 때 -->
        <tr v-else-if="searchType === 'group'" v-for="(info, index) in wareList" :key="info.mate_id">
          <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.mate_id }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.mate_amount }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ formatDate(info.last_inbound_date) }}</td>
          <td class="align-middle font-weight-bolder text-center">{{ info.lot_count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
        </div>
      </div>
      </div>
      </div>
    </template>

<script>
import axios from 'axios'

export default {
  
    data() {
      return{
       wareList:[],
       searchType : 'lot', // 기본조회방식
      };
    },
    created(){
      this.wareSearch();
    },
    methods : {
     async wareSearch() {
    try {
      let ajaxRes = await axios.get(`/api/warehouseList?type=${this.searchType}`);
      this.wareList = ajaxRes.data;
    } catch (err) {
      console.error('창고현황 조회 실패:', err);
    }
    },

  formatDate(dateString) {
    const date = new Date(dateString); // 입력된 날짜를 Date 객체로 변환
    return date.toLocaleDateString('ko-KR'); // 'ko-KR'은 한국 날짜 형식으로 변환
     }
  }
}

</script>