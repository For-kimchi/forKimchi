<template>
  <div class="container-fluid">
    <!-- 검색 -->
    <div class="row">
      <div class="col text-end">
        <button class="btn btn-success" @click="openOrderDetailModal">주문정보조회</button>
        <button class="btn btn-info ms-2" @click="register">저장</button>
      </div>
    </div>

    <div class="card mt-3 mb-5">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">주문정보</h6>
        </div>
      </div>
      <div class="row mt-3 px-3">
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">거래처명</label>
            {{ orderDetail.vendor_name }}
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">납품일자</label>
            {{ formatDate(orderDetail.deliv_due_date) }}
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">담당자명</label>
            {{ userInfo.employee_name }}
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품명</label>
            {{ orderDetail.prod_name }}
          </div>
        </div>
      </div>
      <div class="row my-3 px-3">
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">주문수량</label>
            {{ orderDetail.remain_amount }}
          </div>
        </div>
        <div class="col-md-3">
            <label class="form-label me-2 mb-0 " style="width: 100px;">납품수량</label>
            {{ delivAmount }}
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">잔여수량</label>
            {{ orderDetail.remain_amount && orderDetail.remain_amount >= delivAmount ? orderDetail.remain_amount - delivAmount : 0 }}
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">비고</label>
            {{ orderDetail.memo }}
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
              <th class="text-center font-weight-bolder">제품창고</th>
              <th class="text-center font-weight-bolder">재고수량</th>
              <th class="text-center font-weight-bolder">납품수량</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(info, index) in prods" v-bind:key="info.prod_lot">
              <td class="text-center">{{ info.prod_lot }}</td>
              <td class="text-center">{{ info.prod_name }}</td>
              <td class="text-center">{{ info.warehouse_name }}</td>
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
import OrderDetailModal from '../modal/OrderDetailModal.vue';
import { formatDate, codeToName} from '@/utils/common';

import { mapState } from 'pinia';
import { useUserStore } from "@/stores/user"; 

export default {
  name: "납품관리",
  components: {
    OrderDetailModal,
  },
  data() {
    return {
      prods: [],
      showOrderDetail: false,
      orderDetail: {},
    }
  },
  computed: {
    remain() {
      if (this.orderDetail.remain_amount) {
        let sum = 0;
        for (let prod of this.prods) {
          sum += prod.deliv_amount ? prod.deliv_amount : 0;
        }
        return this.orderDetail.remain_amount - sum;
      } else {
        return 0;
      }
    },
    delivAmount() {
      if (this.orderDetail.remain_amount) {
        let sum = 0;
        for (let prod of this.prods) {
          sum += prod.deliv_amount ? prod.deliv_amount : 0;
        }
        return sum;
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

      if (!this.orderDetail.order_detail_id) {
        this.$swal({
          text: '주문정보를 먼저 조회 해주세요',
          icon: 'warning'
        });
        return;
      }

      if (!this.delivAmount) {
        this.$swal({
          text: '납품수량이 입력되지 않았습니다',
          icon: 'warning'
        });
        return;
      }

      if (this.orderDetail.remain_amount < this.delivAmount) {
        this.$swal({
          text: '납품수량은 주문수량을 초과할 수 없습니다',
          icon: 'warning'
        });
        return;
      }

      let delivDetails = []

      for (let prod of this.prods) {
        if (prod.deliv_amount) {
          if (prod.prod_amount < prod.deliv_amount) {
            this.$swal({
              text: '납품수량은 재고수량을 초과할 수 없습니다',
              icon: 'warning'
            });
            delivDetails = [];
            return;
          }
          delivDetails.push(prod);
        }
      }

      let params = {
        order_detail_id: this.orderDetail.order_detail_id,
        employee_id: this.userInfo.employee_id,
        memo: '',
        remain: this.orderDetail.remain_amount - this.delivAmount,
        deliv_details: delivDetails,
      }

      let res = await axios.post('/api/deliv', params)
        .catch(err => console.log(err));

      if (res.data.success) {
        this.$swal({
              text: '납품정보가 등록되었습니다',
              icon: 'success'
            });
        this.prods = [];
        this.orderDetail = {};
      } else {
        this.$swal({
          text: '납품정보 등록 중 오류가 발생했습니다',
          icon: 'error'
        });
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

      if (this.prods.length == 0) {
        this.$swal({
          text: '납품가능한 제품이 없습니다',
          icon: 'warning'
        });
      }
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
  },
}

</script>