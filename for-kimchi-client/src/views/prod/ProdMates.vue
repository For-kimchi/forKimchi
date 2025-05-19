<template>
    <div class="container-fluid">
    <nav class="text-center mt-3">
      <router-link to="/ProdOrderInfo"><button class="btn btn-info me-2">생산지시등록</button></router-link>
      <button class="btn btn-primary">자재현황</button>
    </nav>
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">자재요청대기현황</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0" style="max-height: 300px;">
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                  <thead>
                    <tr>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시LOT</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시ID</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산제품</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시수량</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시일자</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">담당자</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">자재현황</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(info, index) in prodOrderLists" @click="prodBomList(index)" v-bind:key="info.prod_order_lot" style="height: 50px; overflow-y: auto;" 
                    :class="selectedOrderRow === index ? 'table-active' : ''">
                      <td class="align-middle font-weight-bolder text-center">{{ index + 1}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_order_lot}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.plan_detail_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_name}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.order_date }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.employee_id}}</td>
                      <td class="align-middle font-weight-bolder text-center" v-if="info.order_status === '자재요청중'"><span class="badge badge-sm bg-gradient-info">{{info.order_status}}</span></td>
                      <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-warning">{{info.order_status}}</span></td>
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
            <!-- <button class="btn btn-success mb-0" @click="addClick">자재요청</button> -->
            </div>
            <div class="table-responsive p-0" style="max-height: 300px;"> 
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">자재ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">자재명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">요청수량</th>
                    <!-- <th class="text-center font-weight-bolder">최소요청수량</th> -->
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">단위</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">분류</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="prodBomLists.length > 0">
                  <tr v-for="(info, index) in prodBomLists" v-bind:key="info.mate_id">
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_name}}</td>
                    <!-- <td class="text-center"><input class="form-control border text-center" type="number" v-model="info.inbound_amount"></td> -->
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_amount * selectedOrder.order_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_unit}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.sub_code_name}}</td>
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

export default {
    name: "Prodorder",
    data(){
        return{
          prodOrderLists: [],
          prodBomLists: [],
          prodBomListInfos: [],
          number:'',
          selectedOrderRow: null,
          selectedOrder: {},
        }
    },
    created(){
      this.prodOrderList();
    },
    methods:{
      async prodOrderList(){
        let ajaxRes =
        await axios.get(`/api/prodMateOrder`)
                    .catch(err => console.log(err));
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
          item.inbound_amount = item.mate_amount * this.selectedOrder.order_amount;
        }
      },
      // 자재요청 클릭
      async addClick(){
        let params = {
          prod_order_lot: this.selectedOrder.prod_order_lot,
        }

        let res = await axios.put('/api/prodMateOrder', params)
        .catch(err => console.log(err));
        
        if (res.data.success) {
          alert('자재요청이 완료되었습니다');
          this.prodOrderList();
        } else {
          alert('자재요청 중 오류가 발생했습니다');
        }
      },
      formatDate(dateString) {
        return formatDate(dateString);
      }
    }
}
    
</script>