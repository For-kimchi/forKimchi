<template>
    <div class="container-fluid">
    <nav class="text-center mt-3">
        <!-- <router-link to="/ProdOrder"><button class="btn btn-info ms-1 me-1">생산지시</button></router-link> -->
        <button class="btn btn-primary ms-2 me-2">생산지시등록</button>
        <router-link to="/ProdMate"><button class="btn btn-info ms-2 me-2">자재현황</button></router-link>
    </nav>
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
          <div class="card-body px-0 pb-2" >
            <div class="table-responsive p-0" style="height: 300px;">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">추가</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산상세ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산제품</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">목표수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">누적수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">기지시수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">추가수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산시작일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산종료일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodDetailList" @click="clickDtList(index)" style="height: 50px; overflow: auto;"
                  :class="this.idx === index ? 'table-active' : ''">
                    <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_status === '상세지시완료' && info.plan_amount <= info.sum_amount"><button class="btn btn-warning w-80 p-1 m-0"data-bs-toggle="modal" data-bs-target="#insertProc" disabled>지시추가</button></td>
                    <td class="align-middle font-weight-bolder text-center" v-else><button class="btn btn-warning w-80 p-1 m-0"data-bs-toggle="modal" data-bs-target="#insertProc">지시추가</button></td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_detail_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.prod_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.sum_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_amount - info.sum_amount < 0">0</td>
                    <td class="align-middle font-weight-bolder text-center" v-else>{{info.plan_amount - info.sum_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.sum_amount - info.plan_amount < 0">0</td>
                    <td class="align-middle font-weight-bolder text-center" v-else>{{info.sum_amount - info.plan_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_start_date}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_end_date}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_status === '상세계획승인'"><span class="badge badge-sm bg-gradient-info">{{info.plan_status}}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.plan_status === '상세지시중'"><span class="badge badge-sm bg-gradient-success">{{info.plan_status}}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.plan_status === '상세계획등록'"><span class="badge badge-sm bg-gradient-warning">{{info.plan_status}}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-secondary">{{info.plan_status}}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="insertProc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              
            </div>
            <div class="modal-body">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">생산지시등록</h6>
                  </div>
                </div>
                <div class="card-body px-0 pb-2" >
                  <div class="table-responsive p-0">
                    <table class="table align-items-center justify-content-center mb-0">
                        <tr>
                          <td class="align-middle text-end m-2 p-3" colspan="4">
                            <button class="btn bg-gradient-info w-10 mb-0 m-2 p-2" @click="addOrders()" data-bs-dismiss="modal">추가</button>
                            <button class="btn bg-gradient-primary w-10 mb-0 m-2 p-2" @click="close()">초기화</button>
                          </td>
                        </tr>
                        <tr>
                          <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10 p-3 w-50">생산계획상세Id</th>
                          <td class="align-middle text-start"><input type="text" class="input-group-static border" v-model="planDetailId" disabled></td>
                          <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10 p-3 w-50">제품명</th>
                          <td class="align-middle text-start"><input type="text" class="input-group-static border" v-model="planDetailProd" disabled></td>
                        </tr> 
                        <tr>
                          <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10 p-3 w-50">생산종료일자</th>
                          <td class="align-middle text-start"><input type="date" class="input-group-static border w-100" v-model="planEndDate" disabled></td>
                          <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10 p-3 w-50">생산일자</th>
                          <td class="align-middle text-start"><input type="date" class="input-group-static border w-100" v-model="prodDate"></td>
                        </tr>
                        <tr>
                          <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10 p-3 w-50">목표 수량</th>
                          <td class="align-middle text-start"><input type="number" class="input-group-static border" v-model="planAmount" disabled></td>
                          <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10 p-3 w-50">생산지시수량</th>
                          <td class="align-middle text-start"><input type="number" class="input-group-static border" min="1" v-model="prodAmount" placeholder="수량을 입력하세요"></td>
                        </tr>
                    </table>
                  </div>
                </div>
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
                    <tr v-for="(info,index) in prodOrderList" style="height: 50px; overflow-y: auto;">
                      <td class="align-middle font-weight-bolder text-center"><input type="checkbox" v-model="info.check"></td>
                      <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_order_lot}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_date}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.employee_id}}</td>
                      <td class="align-middle font-weight-bolder text-center" v-if="info.order_status === '자재요청중'"><span class="badge badge-sm bg-gradient-success">{{info.order_status}}</span></td>
                      <td class="align-middle font-weight-bolder text-center" v-else-if="info.order_status === '자재요청완료'"><span class="badge badge-sm bg-gradient-secondary">{{info.order_status}}</span></td>
                      <td class="align-middle font-weight-bolder text-center" v-else-if="info.order_status === '생산진행중'"><span class="badge badge-sm bg-gradient-warning">{{info.order_status}}</span></td>
                      <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-info">{{info.order_status}}</span></td>
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
          prodDetailLists: [],
          prodOrderList: [],
          planDetailId: '',
          planDetailProd: '',
          planAmount: '',
          planEndDate: '',
          prodDate: '',
          prodAmount: '',
          idx: null,
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

                  //  this.prodDetailLists.filter(item =>{
                  //   if(item.plan_status === '상세계획승인'){
                  //     this.prodDetailList.push(item);
                  //     }
                  //   })
      },
      // 생산계획상세 리스트
      async clickDtList(index){
        this.idx = index;
        let info = this.prodDetailList[index];
        console.log(this.prodDetailList[this.idx]);
        // console.log(info);
        // plan_detail_id 에러
        let dtid = info.plan_detail_id
        let ajaxRes =
        await axios.get(`/api/prodOrder/${dtid}`)
                   .catch(err => console.log(err));
                   this.prodOrderList = ajaxRes.data.map(item => ({
          ...item,
          check: false,
        }));;
          console.log(this.prodOrderList);
          this.planDetailId = info.plan_detail_id;
          this.planDetailProd = info.prod_id;
          this.planAmount = info.plan_amount;
          this.planEndDate = info.plan_end_date;
          this.prodDate = formatDate();
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
          if(this.prodAmount < 0 || this.prodAmount == null){
            this.$swal({
                  icon: "warning",
                  title: "생산지시수량을 입력해주세요.",
                  text: "입력하세요",
                });
          }else{
            let ajaxRes =
            await axios.put(`/api/insertProdOrder`, info)
                        .catch(err=> console.log(err));
                        let Order = ajaxRes.data;
            this.$swal({
                  icon: "success",
                  title: "생산지시완료",
                  text: "성공",
                });
            this.prodAmount = '';
            await this.selectProdDetailList();
            await this.clickDtList(this.idx);
          }
        }else{
          this.$swal({
                  icon: "warning",
                  title: "추가하고싶은 항목을 선택하세요.",
                  text: "선택하세요",
                });
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
            if(this.prodDetailList[this.idx] !== null || this.prodDetailList[this.idx] !== undefined){
              if(orderDetail.check){
                console.log(param);
                param.push({prod_order_lot: orderDetail.prod_order_lot,
                            employee_id: this.userInfo.employee_id,
                            // 에러원인
                            plan_detail_id: this.prodDetailList[this.idx].plan_detail_id
                 });
                 console.log(param);
                checkCheck = true;
              }
            }
          }
          if(checkCheck){ 
            if(param !== null || param !== undefined){
              let  ajaxRes =
              await axios.put(`/api/orderCheck`, param)
                         .catch(err => console.log(err));
              this.proddtlist = ajaxRes.data
              this.$swal({
                icon: "success",
                title: "승인완료",
                text: "지시가 승인되었습니다.",
              });
              this.checkAll = false;
              this.prodOrderList.forEach(item => {
                item.check = false;
              });
              await this.selectProdDetailList();
              await this.clickDtList(this.idx);
            }else{
              await this.selectProdDetailList();
            }
          }else{
            this.$swal({
                  icon: "warning",
                  title: "체크된 항목이 없습니다.",
                  text: "체크하세요",
                });
          };
        }else{
          this.$swal({
                  icon: "warning",
                  title: "항목이 선택되지 않았습니다.",
                  text: "선택하세요",
                });
        };
      },
      // 취소버튼
      async close(){
        // this.prodOrderList = [];
        // this.planDetailId = '';
        // this.planDetailProd = '';
        this.prodDate = '';
        this.prodAmount = '';
        // await this.selectProdDetailList();
      },

    }
}
    
</script>