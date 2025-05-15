<template>
    <div class="container-fluid py-4">
    <nav class="text-center">
      <button class="btn btn-primary ms-1 me-1">생산지시이력</button>
      <!-- <router-link to=""><button class="btn btn-info ms-2 me-2">생산지시등록</button></router-link>
      <router-link to=""><button class="btn btn-info ms-2 me-2">자재관리</button></router-link> -->
    </nav>
    <!-- 검색
     <div class="text-end">
        <button class="btn btn-success ms-2 me-2">조회</button>
     </div> -->
    <div class="row">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">검색</h6>
                </div>
            </div>
            <div>
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item">제품코드</li>
                <li class="list-group-item"><input type="text"></li>
                <li class="list-group-item">제품명</li>
                <li class="list-group-item"><input type="text"></li>
                <li class="list-group-item">일정</li>
                <li class="list-group-item"><input type="date"> ~ <input type="date"></li>
                <button class="btn btn-success ms-2 me-2">조회</button>
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
              <h6 class="text-white text-capitalize ps-3">생산지시</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="height: 600px; overflow: auto;">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산계획상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산LOT</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">제품</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시담당자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodOrderList" v-bind:key="info.prod_order_id" >
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.plan_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.prod_order_lot }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.prod_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.order_date}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.order_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_id }}</td>
                    <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{ info.order_status }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    <!-- row div-->
    </div>
  </div>
</template>
    
<script>
import axios from 'axios'

export default {
    name: "ProdOrder",
    data(){
        return{
          prodOrderList:[],
        }
    },
    created(){
      this.selectprodOrder();
    },
    methods:{
      async selectprodOrder(){
        let ajaxRes =
        await axios.get(`/api/prodOrder`)
                   .catch(err => console.log(err));
        this.prodOrderList = ajaxRes.data;
      }
    },
}
    
</script>