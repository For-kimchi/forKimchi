<template>
    <div class="container-fluid py-4">
    <nav class="text-center">
        <router-link to="/ProdOrder"><button class="btn btn-info ms-1 me-1">생산지시</button></router-link>
        <button class="btn btn-primary ms-2 me-2">생산지시등록</button>
        <router-link to="/ProdMate"><button class="btn btn-info ms-2 me-2">선출창고관리</button></router-link>
    </nav>
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-9">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산계획</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2" >
            <div class="table-responsive p-0" style="height: 450px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산계획ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산상세ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산제품</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">목표수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">누적수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">기지수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산시작일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산종료일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodDetailLists" @click="prodOrderList(info)" style="height: 50px; overflow: auto;">
                    <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_detail_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.prod_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.sum_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_amount - info.sum_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_start_date}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_end_date}}</td>
                    <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{info.plan_status}}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산지시등록</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2" >
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10"></th>
                    <td class="align-middle text-end">
                      <button class="btn bg-gradient-info w-20 mb-0 m-2 p-2" @click="addOrders()">추가</button>
                      <button class="btn bg-gradient-primary w-20 mb-0 m-2 p-2">취소</button>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-lift text-uppercase text-secondary font-weight-bolder opacity-10 p-2">생산계획상세Id</th>
                    <td class="align-middle text-start"><input type="text" class="input-group-static border" v-model="planDetailId" disabled></td>
                  </tr>  
                  <tr>
                    <th class="text-lift text-uppercase text-secondary font-weight-bolder opacity-10 p-2">제품명</th>
                    <td class="align-middle text-start"><input type="text" class="input-group-static border" v-model="planDetailProd" disabled></td>
                  </tr>
                  <tr>
                    <th class="text-lift text-uppercase text-secondary font-weight-bolder opacity-10 p-2">생산일자</th>
                    <td class="align-middle text-start"><input type="date" class="input-group-static border" v-model="prodDate"></td>
                  </tr>
                  <tr>
                    <th class="text-lift text-uppercase text-secondary font-weight-bolder opacity-10 p-2">생산지시수량</th>
                    <td class="align-middle text-start"><input type="number" class="input-group-static border" v-model="prodAmount"></td>
                  </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 상단 영역-->
    <div class="row">
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
              <div class="table-responsive p-0" style="height: 300px;">
                <table class="table align-items-center justify-content-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시LOT</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산제품</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산수량</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산일자</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">담당자</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세지시상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr>
                      <td colspan="8" rowspan="8" class="align-middle text-center ">생산계획을 선택해주세요</td>
                    </tr> -->
                    <tr v-for="(info,index) in prodOrderLists" style="height: 80px; overflow-y: auto;">
                      <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_order_lot}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_date}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.employee_id}}</td>
                      <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{info.order_status}}</span></td>
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
    name: "Prodorder",
    data(){
        return{
          prodDetailLists: [],
          prodOrderLists: [],
          planDetailId: '',
          planDetailProd: '',
          prodDate: '',
          prodAmount: '',
        }
    },
    created(){
      this.prodDetailList();
    },
    methods:{
      async prodDetailList(){
        let ajaxRes =
        await axios.get(`/api/planDetailList`)
                   .catch(err => console.log(err));
                   this.prodDetailLists = ajaxRes.data;
      },
      async prodOrderList(planDtId){
        let ajaxRes =
        await axios.get(`/api/prodOrder/${planDtId.plan_detail_id}`)
                   .catch(err => console.log(err));
                   this.prodOrderLists = ajaxRes.data;

        this.planDetailId = planDtId.plan_detail_id;
        this.planDetailProd = planDtId.prod_id;
      },
      // 담당자 추가해야함.
      async addOrders(){
        let info ={plan_detail_id: this.planDetailId,
                  prod_id:         this.planDetailProd,
                  order_date:      this.prodDate,
                  order_amount:    this.prodAmount
        };
        let ajaxRes =
        await axios.put(`/api/prodOrder`, info)
                    .catch(err=> console.log(err));
          let Order = ajaxRes.date;

         await this.prodDetailList();
         await this.prodOrderList(info.plan_detail_id);

      }

    }
}
    
</script>