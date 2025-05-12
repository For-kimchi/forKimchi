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
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">창고현황</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
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
                <tbody>
                  <tr v-for="(info,index) in wareList" v-bind:key="info.warehouse_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.warehouse_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.mate_lot }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.mate_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.mate_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.inbound_date }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_id }}</td>
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
      }
    },
    created(){
      this.wareSearch();
    },
    methods : {
     async wareSearch() {
      let ajaxRes =
      await axios.get(`/api/warehouseList`)
                  .catch(err=> console.log(err));
        this.wareList = ajaxRes.data;
    } 
  }
}

</script>