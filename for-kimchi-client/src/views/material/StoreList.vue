<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->

    <div class="row">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">검색</h6>
                </div>
            </div>
            <div>
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item">거래처</li>
                <li class="list-group-item"><input type="text"></li>
                <li class="list-group-item">제품명</li>
                <li class="list-group-item"><input type="text"></li>
                <!-- <li class="list-group-item">일정</li>
                <li class="list-group-item"><input type="date"> ~ <input type="date"></li> -->
                <li class="list-group-item"><button class="btn btn-success ms-2 me-2" @:click="">조회</button></li>
            </ul>
            </div>
        </div>
    </div>
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">입고조회</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재입고ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">거래처</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">담당자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in storeList" v-bind:key="info.inbound_id" v-on:click="getStoreDtList(info.inbound_id)">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_date }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.memo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    <!-- row div-->
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">입고상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재입고상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">양품수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">불량품수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in storeDtList" v-bind:key="inbound_detail_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.pass_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.fail_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_status }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.memo }}</td>
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
        storeList: [],
        storeDtList: [],
      }
    },
    created(){
      this.getStoreList();
    },
    methods : {
    async getStoreList() {
      let ajaxRes = 
      await axios.get(`/api/storeList`)
                  .catch (err => console.log(err));
      this.storeList = ajaxRes.data;
    },
    async getStoreDtList(storeId) {
      let ajaxRes =
      await axios.get(`/api/storeList/${storeId}`)
                .catch(err => console.log(err));
      this.storeDtList = ajaxRes.data;
    },

  }
}

</script>