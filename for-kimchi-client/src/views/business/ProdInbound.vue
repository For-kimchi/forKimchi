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
              <h6 class="text-white text-capitalize ps-3">제품입고대기현황</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 300px;">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center font-weight-bolder">생산지시LOT</th>
                    <th class="text-center font-weight-bolder">생산제품</th>
                    <th class="text-center font-weight-bolder">생산량</th>
                    <th class="text-center font-weight-bolder">생산일자</th>
                    <th class="text-center font-weight-bolder">담당자</th>
                    <th class="text-center font-weight-bolder">생산지시상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in prodOrderLists" @click="selectOrder(index)"
                    v-bind:key="info.prod_order_lot" style="height: 50px; overflow-y: auto;"
                    :class="selectedIndex === index ? 'table-active' : ''">
                    <td class="text-center">{{info.prod_order_lot}}</td>
                    <td class="text-center">{{info.prod_name}}</td>
                    <td class="text-center">{{info.order_amount}}</td>
                    <td class="text-center">{{ formatDate(info.order_date)}}</td>
                    <td class="text-center">{{info.employee_name}}</td>
                    <td class="text-center"><span class="badge badge-sm bg-gradient-success">{{ '생산완료' }}</span></td>
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
      <div class="col text-end">
        <button class="btn btn-info" @click="addClick">입고</button>
        <button class="btn btn-secondary ms-2" @click="resetList">초기화</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">입고정보</h6>
            </div>
          </div>
          <div class="card-body px-0 py-2">

            <div class="row pe-3">
              <div class="col d-flex justify-content-end align-items-center gap-3">
                <div class="fw-bold text-secondary">
                  생산량 : <span class="text-dark">{{ selectedOrderAmount }}</span>
                </div>
                <div class="fw-bold text-secondary">
                  | 입고량 : <span
                    :class=" selectedOrderAmount < inboundTotalAmount ? 'text-danger' : 'text-dark'">{{ inboundTotalAmount }}</span>
                </div>
                <div class="fw-bold text-secondary">
                  | 잔여량 : <span 
                  :class=" selectedOrderAmount < inboundTotalAmount ? 'text-danger' : 'text-dark'">{{ selectedOrderAmount - inboundTotalAmount >= 0 ? selectedOrderAmount - inboundTotalAmount : 0 }}</span>
                </div>
                <button class="btn btn-success m-0" @click="addRow">추가</button>
              </div>

            </div>
            <table class="table align-items-center justify-content-center mb-0">
              <thead>
                <tr>
                  <th class="text-center font-weight-bolder">제품명</th>
                  <th class="text-center font-weight-bolder">제품ID</th>
                  <th class="text-center font-weight-bolder">입고창고</th>
                  <th class="text-center font-weight-bolder">입고량</th>
                  <th class="text-center font-weight-bolder">
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(info, index) in prodInboundLists" v-bind:key="info.order_detail_id">
                  <td class="text-center">
                    {{ info.prod_id }}
                  </td>
                  <td class="text-center">
                    {{ info.prod_name }}
                  </td>
                  <td class="text-center">
                    <select v-model="info.warehouse_id" class="form-select border text-center">
                      <option value=""></option>
                      <option v-for="warehouse in warehouses" :key="warehouse.warehouse_id"
                        :value="warehouse.warehouse_id">
                        {{ warehouse.warehouse_name }}
                      </option>
                    </select>
                  </td>
                  <td class="text-center">
                    <input class="form-control border text-center" type="number" v-model="info.inbound_amount">
                  </td>
                  <td class="text-center">
                    <button class="btn btn-danger m-0" @click="removeRows(index)">삭제</button>
                  </td>
                </tr>
              </tbody>
            </table>
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
    data(){
        return{
          prodOrderLists: [],
          prodInboundLists: [],
          selectedIndex: null,
          warehouses: [],
          selectedOrderAmount: 0,
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
      ]),
      inboundTotalAmount() {

        let sum = 0;

        if (this.prodInboundLists.length > 0) {
          for (let item of this.prodInboundLists) {
            sum += item.inbound_amount;
          }
        }

        return sum;
      }
    },
    created(){
      this.prodOrderList();
      this.wareById();
    },
    methods:{
      async prodOrderList(){
        let res =
        await axios.get(`/api/prodMateOrder`, {
          params: {
            order_status: '5d',
          }
        }).catch(err => console.log(err));

        this.prodOrderLists = res.data;
      },
      async wareById() {
      let res = await axios.get(`/api/warehouse/2h`)
        .catch(err => console.log(err));
        this.warehouses = res.data;
      },
      async selectOrder(index){

        if (this.prodInboundLists.length > 0 && this.selectedIndex != index) {
          this.$swal({
            text: `저장되지 않은 항목이 있습니다, 선택하시겠습니까?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "승인",
            cancelButtonText: "취소",
          }).then(result => {
            if (result.isConfirmed) {
              this.selectedIndex = index;
              this.selectedOrderAmount = this.prodOrderLists[this.selectedIndex].order_amount;
              this.prodInboundLists = [];
            }
          });
        } else if (this.selectedIndex != index) {
          this.selectedIndex = index;
          this.selectedOrderAmount = this.prodOrderLists[this.selectedIndex].order_amount;
          this.prodInboundLists = [];
        }

      }, resetList() {

        if (this.prodInboundLists.length > 0)  {
        this.$swal({
            text: `입고 정보를 초기화하시겠습니까?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "승인",
            cancelButtonText: "취소",
          }).then(result => {
            if (result.isConfirmed) {
              this.prodInboundLists = [];
            }
          });
        }
      },
      async addClick(){

        if (this.prodInboundLists.length == 0) {
          this.$swal(
            {
              text: "입고 정보가 없습니다",
              icon: "warning"
            }
          );
          return;
        }
        
        if (this.prodInboundLists.some(item => !item.inbound_amount || !item.warehouse_id)) {
          this.$swal(
            {
              text: "미완성된 입고 정보가 있습니다",
              icon: "warning"
            }
          );
          return;
        }

        if (this.prodOrderLists[this.selectedIndex].order_amount != this.inboundTotalAmount) {
          this.$swal(
            {
              text: '생산량과 입고량이 일치하지 않습니다',
              icon: "warning"
            }
          );
          return;
        }

        let params = {
          employee_id: this.userInfo.employee_id,
          prod_order_lot: this.prodOrderLists[this.selectedIndex].prod_order_lot,
          details : this.prodInboundLists,
        }

        let res = await axios.post('/api/prodWarehouse', params)
        .catch(err => console.log(err));
        
        if (res.data.success) {
            this.$swal({
              text: "제품입고가 완료되었습니다",
              icon: "success"
            });
          this.prodOrderList();
          this.prodBomLists = [];
        } else {
            this.$swal({
              text: "제품입고 중 오류가 발생했습니다",
              icon: "error"
            });
        }
      },
      addRow() {
        if (this.selectedIndex == null) {
          this.$swal({
            text: "선택된 생산 정보가 없습니다",
            icon: "warning"
          });
          return;
        }

        this.prodInboundLists.push({
          prod_id: this.prodOrderLists[this.selectedIndex].prod_id,
          prod_name: this.prodOrderLists[this.selectedIndex].prod_name,
          inbound_amount: 0,
          employee_id: this.userInfo.employee_id,
        });
      },
      removeRows(index) {
        this.prodInboundLists.splice(index, 1);
      },
      formatDate(dateString) {
        return formatDate(dateString);
      }
    }
}
    
</script>