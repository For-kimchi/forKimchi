<template>
    <div class="container-fluid py-4">
    <nav class="text-center">
      <!-- <router-link to="/ProdOrder"><button class="btn btn-info me-2">생산지시</button></router-link> -->
      <router-link to="/ProdOrderInfo"><button class="btn btn-info me-2">생산지시등록</button></router-link>
      <button class="btn btn-primary">자재관리</button>
    </nav>
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">생산지시</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0" style="max-height: 300px;">
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                  <thead>
                    <tr>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시LOT</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산제품</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산수량</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산일자</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">담당자</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">테스트</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세지시상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr>
                      <td colspan="8" rowspan="8" class="align-middle text-center ">생산계획을 선택해주세요</td>
                    </tr> -->
                    <tr v-for="(info, index) in prodOrderLists" @click="prodBomList(index)" v-bind:key="info.prod_order_lot" style="height: 50px; overflow-y: auto;" 
                    :class="selectedOrderRow === index ? 'table-active' : ''">
                      <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_order_lot}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_date}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.employee_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.check}}</td>
                      <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{info.order_status}}</span></td>
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
      <!-- <div class="col-4">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">BOM</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">단위</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">분류</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="prodBomLists.length > 0">
                  <tr v-for="(info,index) in prodBomLists" v-bind:key="info.mate_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_name}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_unit}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_type}}</td>
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
      </div> -->
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">자재요청</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="text-end pe-3">
            <button class="btn btn-success" @click="addClick">요청</button>
            </div>
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">요청수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">최소요청수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">단위</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">분류</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="prodBomLists.length > 0">
                  <tr v-for="(info, index) in prodBomLists" v-bind:key="info.mate_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_name}}</td>
                    <td class="align-middle font-weight-bolder text-center"><input type="number" v-model="info.inbound_amount"></td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_amount * selectedOrder.order_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_unit}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.mate_type}}</td>
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
import axios from 'axios'

export default {
    name: "Prodorder",
    data(){
        return{
          prodOrderLists: [],
          prodBomLists: [],
          prodBomListInfos: [],
          number:'',
          // check: false,
          // test: 'table-active',
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
        await axios.get(`/api/prodOrderList`)
                   .catch(err => console.log(err));
        this.prodOrderLists = ajaxRes.data;
        
      },
      // 생산지시 클릭
      async prodBomList(index){
        this.selectedOrderRow = index;
        this.selectedOrder = this.prodOrderLists[index];
        let ajaxRes =
        await axios.get(`/api/prodBom/${this.selectedOrder.prod_id}`)
                    .catch(err => console.log(err));
        this.prodBomLists = ajaxRes.data;
        for (let item of this.prodBomLists) {
          item.inbound_amount = item.mate_amount * this.selectedOrder.order_amount;
        }
        // this.prodBomListInfos = [{
        //   mate_id :ajaxRes.data.mate_id,
        //   mate_name : ajaxRes.data.mate_name,
          
        // }];
        // this.order_amounts = info.order_amount;
        // this.prod_order_lot = ajaxRes.data.prod_order_lot;
      },
      // 자재요청 클릭
      async addClick(){
        let params = {
          prod_order_lot: this.selectedOrder.prod_order_lot,
          employee_id: 'EMP-001',
          details: this.prodBomLists,
        }

        let res = await axios.post('/api/prodMateOrder', params)
        .catch(err => console.log(err));
        
        console.log(res);
      }
    }
}
    
</script>