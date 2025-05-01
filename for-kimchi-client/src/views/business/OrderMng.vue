<template>
  <div class="container-fluid">
    <!-- 검색 -->
    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="search">조회</button>
        <button class="btn btn-info ms-2" @click="resetForm">등록</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card ps-2 my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
          <h6 class="text-white text-capitalize ps-3">주문정보</h6>
        </div>
      </div>
      <div class="row g-3 mt-3">
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">거래처명</label>
            <input v-model="vendor.vendor_name" type="text" class="form-control border text-center" readonly @click="showVendor = true" placeholder="거래처명" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">주문일자</label>
            <input v-model="order_date" type="Date" class="form-control border text-center" placeholder="" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">담당자명</label>
            <input v-model="employee_id" type="text" class="form-control border text-center" readonly placeholder="담당자명" />
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
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">생산계획상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="text-end pe-3 ">
              <button class="btn btn-success" v-on:click="addRow">추가</button>
              <button class="btn btn-info ms-2 me-2">저장</button>
            </div>
            <div class="table-responsive p-0" style="max-height: 300px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">제품명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">제품ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">주문수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">납품일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in orderDetails" v-bind:key="order_detail_id">
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.prod_name" readonly  @click="openProdModal(index)" placeholder="제품명"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.prod_id" readonly></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="number" v-model="info.order_amount"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="date" v-model="info.deliv_due_date"></td>
                    <td class="align-middle text-center">
                      <button class="btn btn-danger ms-2" @click="removeRows(index)">삭제</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <VendorModal
      :visible="showVendor"
      @close="showVendor = false"
      @select="onSelectVendor"
    />
  <ProdModal
      :visible="showProd"
      @close="showProd = false"
      @select="onSelectProd"
    />
</template>
<script>
import axios from 'axios';
import ProdModal from './ProdModal.vue';
import VendorModal from './VendorModal.vue';

export default {
    name: "주문관리",
    components: {
      ProdModal,
      VendorModal,
    },
    data(){
      return {
        orderDetails : [],
        selectedIndex: null,
        showVendor: false,
        showProd: false,
        vendor: {},
        order_date: null,
        employee_id: '',
      }
    },
    created(){
    },
    methods : {
      addRow(){
        this.orderDetails.push({});
      },
      removeRows(index) {
        this.orderDetails.splice(index, 1);
      },
      handleProductSelected(product) {
        this.selectedProduct = product;
      },
      onSelectProd(prod) {
        this.orderDetails[this.selectedIndex].prod_id = prod.prod_id
        this.orderDetails[this.selectedIndex].prod_name = prod.prod_name
      },
      openProdModal(index) {
        this.showProd = true;
        this.selectedIndex = index;
      },
      onSelectVendor(vendor) {
        this.vendor = vendor
      },
      openProdVendor() {
        this.showVendor = true;
      },
    }
}

</script>