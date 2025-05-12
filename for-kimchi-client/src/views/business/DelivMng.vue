<template>
  <div class="container-fluid">
    <!-- 검색 -->
    <div class="row">
      <div class="col text-end">
        <button class="btn btn-success" @click="openOrderDetailModal">납품대상조회</button>
        <button class="btn btn-info ms-2" @click="register">저장</button>
      </div>
    </div>

    <div class="card mt-3 mb-5">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">납품정보</h6>
        </div>
      </div>
      <div class="row mt-3 px-3">
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">거래처명</label>
            <input :value="orderDetail.vendor_name" type="text" class="form-control border text-center" readonly />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">납품일자</label>
            <input :value="formatDate(orderDetail.deliv_due_date)" type="date" class="form-control border text-center"
              readonly />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">담당자명</label>
            <input v-model="userInfo.employee_name" type="text" class="form-control border text-center" readonly />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">비고</label>
            <input v-model="orderDetail.memo" type="text" class="form-control border text-center" readonly />
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3 mb-5">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">납품대상제품</h6>
        </div>
      </div>
      <div class="row mt-3 px-3">
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품명</label>
            <input :value="orderDetail.prod_name" type="text" class="form-control border text-center" readonly />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품ID</label>
            <input :value="orderDetail.prod_id" type="text" class="form-control border text-center" readonly />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">주문수량</label>
            <input v-model="orderDetail.order_amount" type="number" class="form-control border text-center" readonly />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">잔여수량</label>
            <input v-model="remain" type="number" class="form-control border text-center" readonly />
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-5">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">납품가능제품</h6>
        </div>
      </div>
      <div class="card-body px-0 py-2">
        <table class="table align-items-center justify-content-center my-0">
          <thead>
            <tr>
              <th class="text-center font-weight-bolder">제품LOT</th>
              <th class="text-center font-weight-bolder">제품명</th>
              <th class="text-center font-weight-bolder">재고</th>
              <th class="text-center font-weight-bolder">납품수량</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(info, index) in prods" v-bind:key="info.prod_lot">
              <td class="text-center">{{ info.prod_lot }}</td>
              <td class="text-center">{{ info.prod_name }}</td>
              <td class="text-center">{{ info.prod_amount }}</td>
              <td class="text-center">
                <input class="form-control border text-center" type="number" v-model="info.deliv_amount"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

  <OrderDetailModal :visible="showOrderDetail" @close="showOrderDetail = false" @select="onSelectOrderDetail" />
</template>
<script>
import axios from 'axios';
import ProdModal from '../modal/ProdModal.vue';
import VendorModal from '../modal/VendorModal.vue';
import OrderDetailModal from '../modal/OrderDetailModal.vue';
import { formatDate, codeToName} from '@/utils/common';

import { mapState } from 'pinia';
import { useUserStore } from "@/stores/user"; 

export default {
  name: "주문관리",
  components: {
    ProdModal,
    VendorModal,
    OrderDetailModal,
  },
  data() {
    return {
      prods: [],
      showOrderDetail: false,
      employee: {
        employee_id: 'EMP-001',
        employee_name: '김영업',
      },
      orderDetail: {},
    }
  },
  computed: {
    remain() {
      if (this.orderDetail.order_amount) {
        let sum = 0;
        for (let prod of this.prods) {
          sum += prod.deliv_amount ? prod.deliv_amount : 0;
        }
        return this.orderDetail.order_amount - sum;
      } else {
        return 0;
      }
    },
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
  },
  created() {},
  methods: {
    async register() {

      let delivDetails = []

      for (let prod of this.prods) {
        if (prod.deliv_amount) {
          delivDetails.push(prod);
        }
      }

      let params = {
        order_detail_id: this.orderDetail.order_detail_id,
        employee_id: this.employee.employee_id,
        memo: '',
        remain: this.remain,
        deliv_details: delivDetails,
      }

      let res = await axios.post('/api/deliv', params)
        .catch(err => console.log(err));

      if (res.data.success) {
        alert('납품 등록 완료');
        this.prods = [];
        this.orderDetail = {};
      } else {
        alert('납품 등록 실패');
      }

    },
    async getProd() {

      let result = await axios.get('/api/delivProdTarget', {
          params: {
            prod_id: this.orderDetail.prod_id
          }
        })
        .catch(err => console.log(err));

      this.prods = result.data;
    },
    openOrderDetailModal() {
      this.showOrderDetail = true;
    },
    onSelectOrderDetail(orderDetail) {
      this.orderDetail = orderDetail;
      this.getProd();
    },
    formatDate(dateString) {
      return formatDate(dateString);
    },
  }
}

</script>