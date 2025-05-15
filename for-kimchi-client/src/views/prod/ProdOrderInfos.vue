<template>
    <div class="container-fluid">
    <nav class="text-center mt-3">
        <!-- <router-link to="/ProdOrder"><button class="btn btn-info ms-1 me-1">생산지시</button></router-link> -->
        <button class="btn btn-primary ms-2 me-2">생산지시등록</button>
        <router-link to="/ProdMate"><button class="btn btn-info ms-2 me-2">자재관리</button></router-link>
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
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산계획ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산상세ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산제품</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">목표수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">누적수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">기지시수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산시작일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산종료일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodDetailList" @click="clickDtList(index)" style="height: 50px; overflow: auto;">
                    <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_detail_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.prod_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.sum_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_amount - info.sum_amount < 0">0</td>
                    <td class="align-middle font-weight-bolder text-center" v-else>{{info.plan_amount - info.sum_amount}}</td>
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
              <!-- 승인버튼 -->
              <div class="text-end pe-3 ">
              <button class="btn btn-success ms-2 me-2" @click="permiBtn()">승인</button>
              </div>
              <div class="table-responsive p-0" style="height: 300px;">
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                  <thead>
                    <tr>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10"><input type="checkbox" v-model="checkAll" @change="checkeds"></th>
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
                    <tr v-for="(info,index) in prodOrderList" style="height: 80px; overflow-y: auto;">
                      <td class="align-middle font-weight-bolder text-center"><input type="checkbox" v-model="info.check"></td>
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
import axios from 'axios';
import {
    formatDate,
    codeToName
  } from '@/utils/common';
import { useUserStore } from "@/stores/user"; 
import { mapState } from 'pinia';

export default {
    name: "Prodorder",
    data(){
        return{
          prodDetailList: [],
          prodOrderList: [],
          planDetailId: '',
          planDetailProd: '',
          prodDate: '',
          prodAmount: '',
          idx: 0,
          checkAll: false,
          check:false,
        }
    },
    created(){
      this.selectProdDetailList();
    },
    computed:{
      ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
    },
    methods:{
      // 생산계획 리스트
      async selectProdDetailList(){
        let ajaxRes =
        await axios.get(`/api/planDetailList`)
                   .catch(err => console.log(err));
                   this.prodDetailList = ajaxRes.data;
      },
      // 생산계획상세 리스트
      async clickDtList(index){
        this.idx = index;
        let info = this.prodDetailList[this.idx];
        
        let dtid = info.plan_detail_id
        let ajaxRes =
        await axios.get(`/api/prodOrder/${dtid}`)
                   .catch(err => console.log(err));
                   this.prodOrderList = ajaxRes.data.map(item => ({
          ...item,
          check: false,
        }));;

        this.planDetailId = info.plan_detail_id;
        this.planDetailProd = info.prod_id;
        this.prodDate = formatDate();
        this.prodAmount = info.plan_amount;
      },
      // 추가 버튼
      async addOrders(){
        let info ={plan_detail_id: this.planDetailId,
                  prod_id:         this.planDetailProd,
                  order_date:      this.prodDate,
                  order_amount:    this.prodAmount
        };
        // 선택 했는지 안했는지 확인
        if(info.plan_detail_id != null && info.prod_id != null){
        let ajaxRes =
        await axios.put(`/api/prodOrder`, info)
                    .catch(err=> console.log(err));
          let Order = ajaxRes.date;

         await this.selectProdDetailList();
         await this.clickDtList(this.idx);
        }else{
          alert('추가하고싶은 항목을 선택해주세요.')
        };
      },
      // 오늘날짜 가져오기
      formatDate(dateString) {
        return formatDate(dateString);
      },
      // 체크All이 체크되면 나머지도 체크되기
      checkeds(){
        this.prodOrderList.forEach(item => {
          item.check = this.checkAll;
        });
      },
      // 승인 버튼
      async permiBtn(){
        let param = [];
        let checkCheck = false;
        // 항목 선택했는지 확인하기
        if(Object.keys(this.prodOrderList).length > 0){
          // 체크한게 있는지 확인
          for(let orderDetail of this.prodOrderList){
            // 체크된애들 값을 저장.
            if(orderDetail.check){
              param.push({prod_order_lot: orderDetail.prod_order_lot,
                          employee_id: this.userInfo.employee_id
               });
              checkCheck = true;
            }
          }
          if(checkCheck){ 
            let  ajaxRes =
            await axios.put(`/api/orderCheck`, param)
                       .catch(err => console.log(err));
            this.proddtlist = ajaxRes.data
            await this.clickDtList(this.idx);
          }else{
            alert('체크된 항목이 없습니다.')
          };
        }else{
          alert('항목이 선택되지 않았습니다.')
        };
      },

    }
}
    
</script>