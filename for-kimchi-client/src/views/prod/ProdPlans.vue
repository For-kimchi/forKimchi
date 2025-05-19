<template>
  <div class="container-fluid py-4">
    <nav class="text-center">
      <button class="btn btn-primary ms-1 me-1">생산계획</button>
      <router-link to="/orderprod"><button class="btn btn-info ms-2 me-2">주문서</button></router-link>
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
          <div class="card-body px-0 pb-2" style="height: 500px; overflow: auto;">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산계획ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">거래처</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">담당자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">승인자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">계획등록일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">최종계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr v-for="(info,index) in prodlist" v-bind:key="info.plan_id" :class="this.idx === index ? 'table-active' : ''"
                   v-on:click="proddtList(index)">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.plan_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.manager_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.reg_date }}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_final_status === '계획승인'"><span class="badge badge-sm bg-gradient-info">{{ info.plan_final_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.plan_final_status === '계획등록'"><span class="badge badge-sm bg-gradient-warning">{{ info.plan_final_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-success">{{ info.plan_final_status }}</span></td>
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
            <div class="text-end pe-3" >
               <button class="btn btn-success ms-2 me-2" v-if="status2" @click="permiBtn()">승인</button>
               <button class="btn btn-info ms-2 me-2" v-if="status1"  @click="planDetailSave(proddtlist)">저장</button>
            </div>
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10"><input type="checkbox" v-model="checkAll" @change="checkeds"></th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">제품명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">주문수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산필요수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">추가생산수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">납품예정일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">시작일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">종료일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in proddtlist" v-bind:key="info.plan_detail_id">
                    <td class="align-middle font-weight-bolder text-center"><input type="checkbox" v-model="info.check"></td>
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.plan_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.prod_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.order_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center"><input class="text-center" type="number" v-model="info.plan_amount" style="width: 100px;"></td>

                    <td class="align-middle font-weight-bolder text-center" v-if="info.order_amount - info.plan_amount <= 0">0</td>
                    <td class="align-middle font-weight-bolder text-center" v-else>{{info.order_amount - info.plan_amount}}</td>
                    
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_amount - info.order_amount <= 0">0</td>
                    <td class="align-middle font-weight-bolder text-center" v-else>{{info.plan_amount - info.order_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.deliv_due_date }}</td>
                    <td class="align-middle font-weight-bolder text-center"><input class="text-center" type="date" v-model="info.plan_start_date"></td>
                    <td class="align-middle font-weight-bolder text-center"><input class="text-center" type="date" v-model="info.plan_end_date"></td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_status === '상세계획승인'"><span class="badge badge-sm bg-gradient-info">{{ info.plan_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.plan_status === '상세계획등록'"><span class="badge badge-sm bg-gradient-warning">{{ info.plan_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-success">{{ info.plan_status }}</span></td>
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
import { useUserStore } from "@/stores/user"; 
import { mapState } from 'pinia';
export default {
    name: "Prodplan",
    data(){
      return {
        prodlist : [],
        proddtlist :[],
        checkAll: false,
        check:false,
        idx: null,
        status1: false,
        status2: false,
        
      }
    },
    created(){
      this.prodList();
      // this.proddtList(orderId);
    },
    computed:{
      ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ]),
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
      async proddtList(index){
        this.idx = index;
        let planId = this.prodlist[index].plan_id;
        let  ajaxRes =
        await axios.get(`/api/proddtlist/${planId}`)
                   .catch(err => console.log(err));
        this.proddtlist = ajaxRes.data.map(item => ({
          ...item,
          check: false,
        }));
        // 계획중, 계획승인, 계획등록
        for(let list of this.proddtlist){
          if(list.plan_status === '상세계획승인'){
            this.status1 = false;
            this.status2 = true;
          }else if(list.plan_status === '상세계획등록'){
            this.status1 = true;
            this.status2 = false;
          }else if(list.plan_status === '상세지시중'){
            this.status1 = true;
            this.status2 = true;
          }
        }
      },
      // 저장 버튼
      async planDetailSave(planDetailList){
      // 항목선택여부 알림.
      if(Object.keys(planDetailList).length > 0){
            // 입력값이 있는지 확인
            for(let item of planDetailList){
              if(item.plan_amount == '' || item.plan_amount == null){
                this.$swal({
                  icon: "error",
                  title: "생산수량을 입력하지 않았습니다",
                  text: "입력하세요"
                });
                return;
              }else if(item.plan_start_date == '' || item.plan_start_date == null){
                this.$swal({
                  icon: "error",
                  title: "시작일자가 입력되지않았습니다.",
                  text: "입력하세요",
                });
                return;
              }else if(item.plan_end_date == '' || item.plan_end_date == null){
                this.$swal({
                  icon: "error",
                  title: "종료일자가 입력되지않았습니다.",
                  text: "입력하세요",
                });
                return;
              };
            };
            let  ajaxRes =
            await axios.put(`/api/planDetailSave`, planDetailList)
                       .catch(err => console.log(err));
            this.update = ajaxRes.data;
            this.$swal({
                  icon: "success",
                  title: "저장 완료",
                  draggable: true
                });
            await this.proddtList(this.idx);
        }else{
          this.$swal({
                  icon: "error",
                  title: "항목이 선택되지 않았습니다.",
                  text: "선택하세요",
                });
        };
      },
      // 체크항목이 체크되면 하위체크항목들 체크되기
      checkeds(){
        this.proddtlist.forEach(item => {
          item.check = this.checkAll;
        });
      },
      // 승인버튼
      async permiBtn(){
        let param = [];
        let checkCheck = false;
        // 항목 선택했는지 확인하기
        if(Object.keys(this.proddtlist).length > 0){

          // 체크한게 있는지 확인
          for(let planDetail of this.proddtlist){
            if(planDetail.check){
              param.push({ plan_detail_id: planDetail.plan_detail_id,
                          employee_id: this.userInfo.employee_id
               });
              checkCheck = true;
            }
          }

          if(checkCheck){
            let  ajaxRes =
            await axios.put(`/api/plandtbtn`, param)
                       .catch(err => console.log(err));
            this.proddtlist = ajaxRes.data
            await this.prodList();
          }else{
            this.$swal({
                  icon: "error",
                  title: "체크된 항목이 없습니다.",
                  text: "선택하세요",
                });
          };
        }else{
          this.$swal({
              icon: "error",
              title: "항목이 선택되지 않았습니다.",
              text: "선택하세요",
            });
    };

      },
    },
    
}

</script>