<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12 text-end">
       <button class="btn btn-outline-primary mb-2" @click="goToBack">
        📋 닫기
      </button>
  </div>
</div>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산지시서 목록</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시서 번호</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">제품이름</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"  >발주서 등록</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateOrderList" :key="info.prod_order_lot" @click=""> <!--@click="viewProdOrderDetail(info)-->
                    <td class="align-middle text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{ info.prod_order_lot }}</td>
                    <td class="align-middle text-center">{{ info.prod_id }}</td>
                    <td class="align-middle text-center">{{ info.order_date }}</td>
                    <td class="align-middle text-center">{{ info.order_amount }}</td>
                    <td class="align-middle text-center"><button class="btn btn-sm btn-warning" disabled>{{ info.order_status }}</button></td>
                    <td class="align-middle text-center">{{ info.memo }}</td>
                    <td>
                    <button class="btn btn-sm btn-primary" @click="mateBomDetail(info)">
                    발주 등록
                    </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 상세보기 -->
    <div v-if="selectedOrder" class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산지시서 상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">항목</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">값</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="align-middle text-center">생산지시서 번호</td>
                    <td class="align-middle text-center">{{ selectedOrder.prod_order_lot }}</td>
                  </tr>
                  <tr>
                    <td class="align-middle text-center">발주일자</td>
                    <td class="align-middle text-center">{{ selectedOrder.order_date }}</td>
                  </tr>
                  <tr>
                    <td class="align-middle text-center">발주수량</td>
                    <td class="align-middle text-center">{{ selectedOrder.order_amount }}</td>
                  </tr>
                  <tr>
                    <td class="align-middle text-center">상태</td>
                    <td class="align-middle text-center">{{ selectedOrder.order_status }}</td>
                  </tr>
                  <tr>
                    <td class="align-middle text-center">비고</td>
                    <td class="align-middle text-center">{{ selectedOrder.memo }}</td>
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

export default {
  name: "MateProdOrder",
  data() {
    return {
      mateOrderList: [],  // 생산지시서 목록
      selectedOrder: null, // 선택된 생산지시서
      search: {
        prod_id: '',
        prod_name: '',
        start_date: '',
        end_date: '',
      }
    };
  },

    created() {
    this.searchProdOrder();

  },

  methods: {
    // 생산지시서 조회
    async searchProdOrder() {
      let ajaxRes =
      await axios.get(`/api/mateOrder`)
                .catch(err=> console.log(err));
      this.mateOrderList = ajaxRes.data
    },
    mateOrderInsert() {
      this.$router.push('/matma')
    },
    
  async mateBomDetail(info) {
    console.log(info);
  // 1. 선택된 생산지시서의 lot 번호로 자재 정보를 조회
  const res = await axios.get(`/api/mateOrder`, {
    params: { prod_order_lot: info.prod_order_lot }
  }).catch(err => console.error(err));

  // 3. mateBom 페이지로 자재 정보를 전달 (query 방식)
  this.$router.push({
    path: '/mateBom',
  query: {
    prod_order_lot: info.prod_order_lot,
    prod_id: info.prod_id,
    prod_name: info.prod_name, 
    order_amount: info.order_amount,
    unit: info.unit,
    mate_amount: info.mate_amount             
  }
  });
},

    goToBack() {
      this.$router.push('/matma');
    }
  },
};
</script>
