<template>
  <div class="container-fluid py-4">
    <nav class="text-center">
      <button class="btn btn-primary ms-1 me-1">생산계획</button>
      <router-link to="/orderprod"><button class="btn btn-info ms-2 me-2">주문서</button></router-link>
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
              <h6 class="text-white text-capitalize ps-3">생산계획</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산계획ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">거래처</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">담당자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">승인자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">계획등록일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">최종계획상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodlist" v-bind:key="info.plan_id" v-on:click="proddtList(info.plan_id)">
                    <td class="align-middle text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{ info.plan_id}}</td>
                    <td class="align-middle text-center">{{ info.vendor_id }}</td>
                    <td class="align-middle text-center">{{ info.employee_id }}</td>
                    <td class="align-middle text-center">{{ info.manager_id }}</td>
                    <td class="align-middle text-center">{{ info.reg_date }}</td>
                    <td class="align-middle text-center"><span class="badge badge-sm bg-gradient-success">{{ info.plan_final_status }}</span></td>
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
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산계획상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="text-end pe-3 ">
              <!-- 승인버튼에 세션값을 통해 권한이 있을경우에만 작동하도록 조건을 넣어줘야함 -->
              <button class="btn btn-success ms-2 me-2" v-on:click="permibtn()">승인</button>
              <!-- <button class="btn btn-success" v-on:click="addRow">추가</button> -->
              <button class="btn btn-info ms-2 me-2"  @click="pldtsave(proddtlist)">저장</button>
            </div>
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><input type="checkbox"></th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">제품명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산필요수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">추가생산수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상세계획상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">납품예정일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">시작일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">종료일자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in proddtlist" v-bind:key="order_detail_id">
                    <td class="align-middle text-center"><input type="checkbox"></td>
                    <td class="align-middle text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{ info.plan_detail_id }}</td>
                    <td class="align-middle text-center">{{ info.prod_id }}</td>
                    <td class="align-middle text-center">{{ info.order_amount }}</td>
                    <td class="align-middle text-center"><input class="text-center" type="number" v-model="info.plan_amount"></td>

                    <td class="align-middle text-center" v-if="info.order_amount - info.plan_amount <= 0">0</td>
                    <td class="align-middle text-center" v-else>{{info.order_amount - info.plan_amount}}</td>
                    
                    <td class="align-middle text-center" v-if="info.plan_amount - info.order_amount <= 0">0</td>
                    <td class="align-middle text-center" v-else>{{info.plan_amount - info.order_amount}}</td>
                    <td class="align-middle text-center"><span class="badge badge-sm bg-gradient-success">{{ info.plan_status }}</span></td>
                    <td class="align-middle text-center">{{ info.deliv_due_date }}</td>
                    <td class="align-middle text-center"><input class="text-center" type="date" v-model="info.plan_start_date"></td>
                    <td class="align-middle text-center"><input class="text-center" type="date" v-model="info.plan_end_date"></td>
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
    name: "Prodplan",
    data(){
      return {
        prodlist : [],
        proddtlist : [],
      }
    },
    created(){
      this.prodList();
      // this.proddtList(orderId);
    },
    // 생산계획 조회
    methods : {
      async prodList(){
        let ajaxRes =
        await axios.get(`/api/prodlist`)
                  .catch(err => console.log(err));
                  this.prodlist = ajaxRes.data;
      },
      // 생산계획 상세 조회
      async proddtList(orderid){
        let  ajaxRes =
        await axios.get(`/api/proddtlist/${orderid}`)
                   .catch(err => console.log(err));
        this.proddtlist = ajaxRes.data;
      }
    }
    
}

</script>