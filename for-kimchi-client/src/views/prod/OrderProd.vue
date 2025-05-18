<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->
    <nav class="text-center">
      <router-link to="/prodplan"><button class="btn btn-info ms-2 me-2">생산계획</button></router-link>
      <button class="btn btn-primary ms-1 me-1">주문서</button>
    </nav>
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
            <div class="table-responsive p-0" style="height: 400px; overflow: auto;">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">주문서 작성</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">주문ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">주문일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">주문상태</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">거래처ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">주문담당자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">주문등록일자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in orderList" v-bind:key="info.order_id" v-on:click="getOrderDtList(info.order_id)">
                    <td class="align-middle font-weight-bolder text-center"><button class="btn btn-warning p-2 m-2" v-on:click.stop="planAdd(index)">생산계획추가</button></td>
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.order_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.order_date }}</td>
                    <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{ info.order_final_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.reg_date }}</td>
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
              <h6 class="text-white text-capitalize ps-3">주문상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">제품명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">주문수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">납품예정일자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in orderDtList" v-bind:key="order_detail_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.order_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.prod_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.order_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.deliv_due_date }}</td>
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
    name: "orderprod",
    data() {
      return{
        orderList : [],
        orderDtList:[],
        order_detail_id:'',
      }
    },
    created(){
      this.getOrderList();
    },
    computed:{
      ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
    },
    methods :{
      async getOrderList(){
        let ajaxRes =
        await axios.get(`/api/orderList`)
                   .catch(err => console.log(err));
        this.orderList = ajaxRes.data;
      },
      // 주문 상세 조회
      async getOrderDtList(orderId){
        let  ajaxRes =
        await axios.get(`/api/orderList/${orderId}`)
                    .catch(err => console.log(err));
        this.orderDtList = ajaxRes.data;

      },
      // 주문데이터를 통해서 생산계획등록 매서드
     async planAdd(idx){
        // 모든값을 가져오는게 아니기떄문에 받은 매개변수에서
        // 원하는값만 따로 분리시켜서 이걸 body에 담어서 보냄
        // orderList의 index번호를 기준으로 info에 값이 저장됨
        let info = this.orderList[idx];

        await this.getOrderDtList(info.order_id);
      // employee_id
        let orderInfo = {
          order_id:       info.order_id,
          order_detail_list: this.orderDtList,
          employee_id : this.userInfo.employee_id
        };
        
        let ajaxRes = await axios.post(`/api/planinsert`, orderInfo)
                                  .catch(err => console.log(err));
        let sqlRes = ajaxRes.data;
        let planInfo = sqlRes.affectedRows;

        // 등록이 끝난 후 상세계획을 다시 불러옴.
        // 페이지 이동할꺼라서 불러올필요없음.
        // await this.getOrderDtList(info.order_id);

        // 성공적으로 등록 시 페이지 이동 실패하면 안내
        if(planInfo > 0){
          this.$swal({
                  icon: "success",
                  title: "계획이 생성되었습니다.",
                  text: "생성 완료",
                });
          this.$router.push('/prodplan');
        }else{
          this.$swal({
                  icon: "error",
                  title: "계획이 등록되지 않았습니다.",
                });
        }
      }
    }
}

</script>