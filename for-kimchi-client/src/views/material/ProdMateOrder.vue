<template>
    <div class="container-fluid">
    <div class="row mt-3">
        <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">자재요청현황</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0" style="max-height: 300px;">
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                  <thead>
                    <tr>
                      <th class="text-center font-weight-bolder">생산지시LOT</th>
                      <th class="text-center font-weight-bolder">생산제품</th>
                      <th class="text-center font-weight-bolder">생산수량</th>
                      <th class="text-center font-weight-bolder">생산일자</th>
                      <th class="text-center font-weight-bolder">담당자</th>
                      <th class="text-center font-weight-bolder">생산지시상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(info, index) in prodOrderLists" @click="prodBomList(index)" v-bind:key="info.prod_order_lot" style="height: 50px; overflow-y: auto;" 
                    :class="selectedOrderRow === index ? 'table-active' : ''">
                      <td class="text-center">{{info.prod_order_lot}}</td>
                      <td class="text-center">{{info.prod_name}}</td>
                      <td class="text-center">{{info.order_amount}}</td>
                      <td class="text-center">{{ formatDate(info.order_date)}}</td>
                      <td class="text-center">{{info.employee_name}}</td>
                      <td class="text-center"><span class="badge badge-sm bg-gradient-success">{{ '자재요청중' }}</span></td>
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
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">자재정보</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="text-end pe-3">
            <button class="btn btn-success mb-0" @click="addClick">자재출고</button>
            </div>
            <div class="table-responsive p-0" style="max-height: 300px;"> 
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center font-weight-bolder">자재ID</th>
                    <th class="text-center font-weight-bolder">자재명</th>
                    <th class="text-center font-weight-bolder">요청수량</th>
                    <th class="text-center font-weight-bolder">재고</th>
                    <th class="text-center font-weight-bolder">출고수량</th>
                    <th class="text-center font-weight-bolder">잔여재고</th>
                    <th class="text-center font-weight-bolder">단위</th>
                    <th class="text-center font-weight-bolder">분류</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="prodBomLists.length > 0">
                  <tr v-for="(info, index) in prodBomLists" v-bind:key="info.mate_id">
                    <td class="text-center">{{info.mate_id}}</td>
                    <td class="text-center">{{info.mate_name}}</td>
                    <td class="text-center">{{info.mate_amount * selectedOrder.order_amount}}</td>
                    <td class="text-center" :class="info.mate_stock_amount < info.outbound_amount ? 'text-danger': ''">{{info.mate_stock_amount}}</td>
                    <td class="text-center">                      
                      <input class="form-control border text-center" type="number" v-model="info.outbound_amount">
                    </td>
                    <td class="text-center">
                      {{ info.mate_stock_amount - info.outbound_amount > 0 ? info.mate_stock_amount - info.outbound_amount : 0 }}
                    </td>
                    <td class="text-center">{{info.mate_unit}}</td>
                    <td class="text-center">{{info.sub_code_name}}</td>
                  </tr>
                </template>
                <tr v-else>
                  <td rowspan="3" colspan="7" class="align-middle font-weight-bolder text-center">항목을 선택해주세요.</td>
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
import { formatDate } from '../../utils/common';

  // pinia import
  // stores 
  import {
    useUserStore
  } from "@/stores/user";
  // state, getter => mapState 
  // actions => mapActions 
  import {
    mapState
  } from 'pinia';

export default {
    name: "Prodorder",
    data(){
        return{
          prodOrderLists: [],
          prodBomLists: [],
          number:'',
          selectedOrderRow: null,
          selectedOrder: {},
        }
    },
    computed: {
      // ...mapState(store, []), ...mapActions(store, [])
      // stores 에 등록된 이름으로 사용
      // 아래 처럼 등록했을 경우 computed 에 등록된 값과 동일하게 사용
      // 로그인 유저 정보는 userInfo 에 객체 형태로 저장되어있음
      // 아래 와 같은 형태로 사용
      // <template></template> 내부에서는 userInfo.employee_id
      // export default {} 내부에서는 this.userInfo.employee_id
      ...mapState(useUserStore, [
        "isLoggedIn",
        "userInfo",
      ])
    },
    created(){
      this.prodOrderList();
    },
    methods:{
      async prodOrderList(){
        let ajaxRes =
        await axios.get(`/api/prodMateOrderReq`, {
          // params: {
          //   order_status: '2d',
          // }
        }).catch(err => console.log(err));

        this.prodOrderLists = ajaxRes.data;
      },
      // 생산지시 클릭
      async prodBomList(index){
        this.selectedOrderRow = index;
        this.selectedOrder = this.prodOrderLists[index];
        let ajaxRes =
        await axios.get(`/api/prodMateOrder/${this.selectedOrder.prod_id}`)
                    .catch(err => console.log(err));
        this.prodBomLists = ajaxRes.data;
        for (let item of this.prodBomLists) {
          item.outbound_amount = item.mate_amount * this.selectedOrder.order_amount;
        }
      },
      // 자재요청 클릭
      async addClick(){

        if (this.prodBomLists.length == 0) {
          this.$swal(
            {
              text: "선택된 자재 요청 정보가 없습니다",
              icon: "warning"
            }
          );
          return;
        }

        if (this.prodBomLists.some(item => item.mate_stock_amount < item.outbound_amount)) {
          this.$swal(
            {
              text: "재고량이 부족한 자재가 있습니다",
              icon: "warning"
            }
          );
          return;
        }

        let params = {
          employee_id: this.userInfo.employee_id,
          prod_order_lot: this.selectedOrder.prod_order_lot,
          details : this.prodBomLists,
        }

        let res = await axios.post('/api/prodMateOrder', params)
        .catch(err => console.log(err));
        
        if (res.data.success) {
            this.$swal({
              text: "자재출고가 완료되었습니다",
              icon: "success"
            });
          this.prodOrderList();
          this.prodBomLists = [];
        } else {
            this.$swal({
              text: "자재출고 중 오류가 발생했습니다",
              icon: "error"
            });
        }
      },
      formatDate(dateString) {
        return formatDate(dateString);
      }
    }
}
    
</script>