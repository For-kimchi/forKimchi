<template>
  <div class="container-fluid">
    <!-- 검색 -->
    <div class="row">
      <div class="col text-end">
        <button class="btn btn-info" @click="register">저장</button>
        <button class="btn btn-secondary ms-2" @click="reset">초기화</button>
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
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">주문ID</label>
            <input v-model="order.order_id" type="text" class="form-control border text-center" placeholder="주문ID" readonly/>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">주문일자</label>
            <input v-model="order.order_date" type="date" class="form-control border text-center" placeholder="주문일자" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">거래처</label>
            <input v-model="order.vendor_name" type="text" class="form-control border text-center" @keydown.prevent
            @click="showVendor = true" placeholder="거래처" />         
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">담당자</label>
            <input v-model="userInfo.employee_name" type="text" class="form-control border text-center" placeholder="담당자" />
          </div>
        </div>
      </div>

      <div class="row mt-1 px-3">
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">비고</label>
            <input v-model="order.memo" type="text" class="form-control border text-center" placeholder="비고" />
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-1">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">주문상세정보</h6>
        </div>
      </div>
      <div class="card-body px-0 py-2">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-center font-weight-bolder">제품명</th>
              <th class="text-center font-weight-bolder">제품ID</th>
              <th class="text-center font-weight-bolder">제품규격</th>
              <th class="text-center font-weight-bolder">제품단위</th>
              <th class="text-center font-weight-bolder">주문수량</th>
              <th class="text-center font-weight-bolder">납품일자</th>
              <th class="text-center font-weight-bolder">
                <button class="btn btn-success m-0" v-on:click="addRow">추가</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(info, index) in orderDetails" v-bind:key="info.order_detail_id">
                    <td class="text-center">
                      <input class="form-control border text-center" type="text" v-model="info.prod_name" @keydown.prevent
                        @click="openProdModal(index)" placeholder="제품명"></td>
                    <td class="text-center">
                      {{ info.prod_id }}</td>
                    <td class="text-center">
                      {{ info.prod_size }}</td>
                    <td class="text-center">
                      {{ info.prod_unit }}</td>
                    <td class="text-center">
                      <input class="form-control border text-center" type="number" v-model="info.order_amount"></td>
                    <td class="text-center">
                      <input class="form-control border text-center" type="date" v-model="info.deliv_due_date"></td>
                    <td class="text-center">
                      <button class="btn btn-danger m-0" @click="removeRows(index)">삭제</button></td>
                  </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <VendorModal :visible="showVendor" @close="showVendor = false" @select="onSelectVendor" :vendor_type="'2m'" />
  <ProdModal :visible="showProd" @close="showProd = false" @select="onSelectProd" />
</template>
<script>
  import axios from 'axios';
  import ProdModal from '../modal/ProdModal.vue';
  import VendorModal from '../modal/VendorModal.vue';
  import {
    formatDate,
    formatDateAfter
  } from '../../utils/common';

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
    name: "주문관리",
    components: {
      ProdModal,
      VendorModal,
    },
    data() {
      return {
        order: {
          order_date: formatDate(),
        },
        orderDetails: [],
        selectedIndex: null,
        showVendor: false,
        showProd: false,
        vendor: {},
        memo: '',
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
    methods: {
      async register() {

        if (!this.order.vendor_id) {
          this.$swal({
              text: "거래처 정보가 없습니다",
              icon: "warning"
            });
          return;
        }

        if (this.orderDetails.length == 0) {
          this.$swal({
              text: "상세 항목이 없습니다",
              icon: "warning"
            });
          return;
        }

        for (let detail of this.orderDetails) {
          if (!detail.prod_id || !detail.order_amount) {
            this.$swal({
              text: "미완성된 상세 항목이 있습니다",
              icon: "warning"
            });
            return;
          }
        }

        let params = {
          order_id: this.order.order_id,
          vendor_id: this.order.vendor_id,
          employee_id: this.userInfo.employee_id,
          order_date: this.order.order_date,
          order_details: this.orderDetails.map(({ prod_unit, prod_size, ...rest }) => rest),
          memo: this.order.memo,
        }

        let res = await axios.post('/api/order', params)
          .catch(err => console.log(err));

        if (res.data.success) {
          this.$swal({
            text: "주문이 등록되었습니다",
            icon: "success"
          });
          this.reset();
        } else {
          this.$swal({
            text: "주문 등록 중 오류가 발생했습니다",
            icon: "error"
          });
        }
      },
      formatDate(dateString) {
        return formatDate(dateString);
      },
      formatDateAfter() {
        return formatDateAfter(this.order.order_date, 14);
      },
      addRow() {
        this.orderDetails.push({
          deliv_due_date: this.formatDateAfter(),
        });
      },
      removeRows(index) {
        this.orderDetails.splice(index, 1);
      },
      onSelectProd(prod) {
        this.orderDetails[this.selectedIndex].prod_id = prod.prod_id;
        this.orderDetails[this.selectedIndex].prod_name = prod.prod_name;
        this.orderDetails[this.selectedIndex].prod_unit = prod.prod_unit;
        this.orderDetails[this.selectedIndex].prod_size = prod.prod_size;
      },
      openProdModal(index) {
        this.showProd = true;
        this.selectedIndex = index;
      },
      onSelectVendor(vendor) {
        this.order.vendor_id = vendor.vendor_id;
        this.order.vendor_name = vendor.vendor_name;
      },
      async getOrderOne(order_id) {
        let res =
          await axios.get(`/api/orderOne`, {
            params: {
              order_id,
            }
          })
          .catch(err => console.log(err));

        this.order = res.data.order;
        this.order.order_date = formatDate(this.order.order_date);
        this.orderDetails = res.data.order_details;
        this.orderDetails.forEach(item => {
          item.deliv_due_date = formatDate(item.deliv_due_date);
        })
      },
      reset() {
        this.order = {
          order_date: formatDate(),
        };
        this.orderDetails = [];
      }
    },
    created() {
      if (this.$route.query.order_id) {
        this.getOrderOne(this.$route.query.order_id)
      }
    }
  }
</script>