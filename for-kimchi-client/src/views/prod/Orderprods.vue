<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->
    <nav class="text-center">
      <button class="btn btn-success ms-2 me-2">주문서조회</button>
      <router-link to="/prodplan"><button class="btn btn-info ms-2 me-2">생산계획</button></router-link>
    </nav>
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
                <li class="list-group-item"><button class="btn btn-success ms-2 me-2">조회</button></li>
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
              <h6 class="text-white text-capitalize ps-3">주문서</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문서 작성</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">거래처ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">담당자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">등록일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">제품ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">납품예정일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상세비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info) in orderList" v-bind:key="info.order_id">
                    <td class="align-middle text-center"><button class="btn btn-warning p-1 m-1" v-on:click="goToplanInfo(info)">주문서 추가</button></td>
                    <td class="align-middle text-center">{{ info.order_id }}</td>
                    <td class="align-middle text-center">{{ info.order_detail_id }}</td>
                    <td class="align-middle text-center">{{ info.order_date }}</td>
                    <td class="align-middle text-center">{{ info.vendor_id }}</td>
                    <td class="align-middle text-center">{{ info.employee_id }}</td>
                    <td class="align-middle text-center">{{ info.reg_date }}</td>
                    <td class="align-middle text-center">{{ info.prod_id }}</td>
                    <td class="align-middle text-center">{{ info.order_amount }}</td>
                    <td class="align-middle text-center">{{ info.delivery_due_date }}</td>
                    <td class="align-middle text-center"><span class="badge badge-sm bg-gradient-success">{{ info.order_status }}</span></td>
                    <td class="align-middle text-center">{{ info.memo }}</td>
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
    name: "orderprod",
    data() {
      return{
        orderList : [],
      }
    },
    created(){
      this.getOrderList();
    },

    methods :{
      async getOrderList(){
        let ajaxRes =
        await axios.get(`/api/orderLisit`)
                   .catch(err => console.log(err));
        this.orderList = ajaxRes.data;
      },
      goToplanInfo(infos){
      }
    }
}

</script>