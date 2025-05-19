<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->

    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">검색</h6>
            </div>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item d-flex align-items-center">거래처</li>
              <li class="list-group-item d-flex align-items-center"><input type="text" v-model="search.vendor_name">
              </li>
              <li class="list-group-item d-flex align-items-center">입고일자</li>
              <li class="list-group-item d-flex align-items-center"><input type="date" v-model="search.startDate"> ~
                <input type="date" v-model="search.endDate">
              </li>
              <!-- <li class="list-group-item">일정</li>
                <li class="list-group-item"><input type="date"> ~ <input type="date"></li> -->
              <li class="list-group-item d-flex align-items-center"><button class="btn btn-success ms-2 me-2"
                  @:click="getStoreList">조회</button></li>
            </ul>
          </div>
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
            <div class="table-responsive p-0" style="max-height: 500px; overflow-y: auto;">
              <table class="table align-items-center mb-0 justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재입고ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">담당자
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고일자
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">거래처
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in storeList" v-bind:key="info.inbound_id" class="group cursor-pointer"
                    v-on:click="getStoreDtList(info.inbound_id)">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_date }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_name }}</td>
                    <td class="align-middle text-center">
                      <button class="btn btn-sm" :class="{
                        'btn-warning': info.inbound_final_status === '검사요청',
                        'btn-info': info.inbound_final_status === '검사완료',
                        'btn-success': info.inbound_final_status === '입고완료'
                      }" disabled>{{ info.inbound_final_status }}</button>
                    </td>
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
            <div class="table-responsive p-0" style="max-height: 500px; overflow-y: auto;">
              <table class="table align-items-center justify-content-center mb-0 justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">
                      자재입고상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">발주수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">미입고수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in storeDtList" v-bind:key="inbound_detail_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.mate_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.req_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ (info.req_amount - info.inbound_amount)
                    }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_status }}</td>
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
// stores 
import { useUserStore } from "@/stores/user";
// state, getter => mapState 
// actions => mapActions 
import { mapState } from 'pinia';

export default {

  data() {
    return {
      storeList: [],
      storeDtList: [],
      search: {

      },
    }
  },
  created() {
    this.getStoreList();
  },
  computed: {
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
  },
  methods: {
    async getStoreList() {
      let ajaxRes =
        await axios.get(`/api/storeList`, {
          params: this.search,
        })
          .catch(err => console.log(err));
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