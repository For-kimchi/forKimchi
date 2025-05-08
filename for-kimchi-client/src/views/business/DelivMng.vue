<template>
  <div class="container-fluid">
    <!-- 검색 -->
    <div class="row">
      <div class="col text-end">
        <button class="btn btn-success ms-2"  @click="openOrderDetailModal">납품대상조회</button>
        <button class="btn btn-info ms-2" @click="register">저장</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card ps-2 my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">납품정보</h6>
            </div>
          </div>
          <div class="row g-3 mt-3 ms-3">
            <div class="col-md-3">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0">거래처명 :</label>
                {{ orderDetail.vendor_name }}
              </div>
            </div>
            <div class="col-md-3">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0">납품일자 : </label>
                {{ orderDetail.deliv_due_date ? yyyyMMdd(orderDetail.deliv_due_date) : '' }}
              </div>
            </div>
            <div class="col-md-3">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0">담당자명 : </label>
                {{ employee.employee_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <div class="card ps-2 my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">납품대상제품</h6>
            </div>
          </div>
          <div class="row g-3 mt-3 ms-3">
            <div class="col-md-2">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0 ">제품명 : </label>
                {{ orderDetail.prod_name }}
              </div>
            </div>
            <div class="col-md-2">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0">제품ID : </label>
                {{ orderDetail.prod_id }}
              </div>
            </div>
            <div class="col-md-2">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0">주문수량 : </label>
                {{ orderDetail.order_amount }}
              </div>
            </div>
            <div class="col-md-2">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0">잔여수량 : </label>
                {{ remain }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card ps-2 my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">납품가능제품</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 300px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">제품LOT</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">제품명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">재고</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">납품수량</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in prods" v-bind:key="info.prod_lot">
                    <td class="align-middle text-center">
                      {{ info.prod_lot }}
                    </td>
                    <td class="align-middle text-center">
                      {{ info.prod_name }}
                    </td>
                    <td class="align-middle text-center">
                      {{ info.prod_amount }}
                    </td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="number" v-model="info.deliv_amount">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <OrderDetailModal :visible="showOrderDetail" @close="showOrderDetail = false" @select="onSelectOrderDetail" />
</template>
<script>
import axios from 'axios';
import ProdModal from './ProdModal.vue';
import VendorModal from './VendorModal.vue';
import OrderDetailModal from '../modal/OrderDetailModal.vue';

export default {
    name: "주문관리",
    components: {
      ProdModal,
      VendorModal,
      OrderDetailModal,
    },
    data(){
      return {
        prods : [],
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
      }
    },
    created(){
    },
    methods : {
      async register() {

        let delivDetails = []

        for (let prod of this.prods) {
          if (prod.deliv_amount) {
            delivDetails.push(prod);
          }
        }

        let params = {
          order_detail_id : this.orderDetail.order_detail_id,
          employee_id : this.employee.employee_id,
          memo : '',
          remain: this.remain,
          deliv_details: delivDetails,
        }

        let result = await axios.post('/api/deliv', params)
        .catch(err => console.log(err));

        alert(result.data);

        this.prods = [];
        this.orderDetail = {};
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
      getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      yyyyMMdd(fullDateTime) { 
        let date = new Date(fullDateTime);
        return date.toISOString().split('T')[0]
      },
      openOrderDetailModal() {
        this.showOrderDetail = true;
      },
      onSelectOrderDetail(orderDetail) {
        this.orderDetail = orderDetail;
        this.getProd();
      },
    }
}

</script>