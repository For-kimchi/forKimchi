<template>
  <div class="container-fluid">
    <!-- 검색 -->
    <div class="row">
      <div class="col text-end">
        <button class="btn btn-success" @click="getOrders">조회</button>
        <button class="btn btn-secondary ms-2" @click="resetSearch">초기화</button>
      </div>
    </div>

    <div class="card mt-3 mb-3">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">주문조회</h6>
        </div>
      </div>
      <div class="row mt-3 px-3">
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">거래처명</label>
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="거래처명" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">주문상태</label>
            <select v-model="searchType" class="form-select border text-center">
              <option value="">전체</option>
              <option v-for="code in codes" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">시작일자</label>
            <input v-model="searchStartDate" type="date" class="form-control border text-center" placeholder="" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 font-weight-bolder" style="width: 100px;">종료일자</label>
            <input v-model="searchEndDate" type="date" class="form-control border text-center" placeholder="" />
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col text-end">
        <button class="btn btn-info ms-2" @click="registerOrder">등록</button>
        <button class="btn btn-warning ms-2" @click="modifyOrder">수정</button>
        <button class="btn btn-danger ms-2" @click="removeOrder">삭제</button>
        <button class="btn btn-dark ms-2" @click="confirmOrder">승인</button>
      </div>
    </div>

    <div class="card mt-3 mb-5">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">주문내역</h6>
        </div>
      </div>
      <div class="card-body px-0 py-2" style="max-height: 300px; overflow: auto;">
        <!-- <div class="table-responsive p-0"> -->
          <table class="table align-items-center mb-0 table-hover">
            <thead>
              <tr>
                <th class="text-center text-uppercase font-weight-bolder opacity-7">
                  <input type="checkbox" v-model="allSelected" @change="toggleAll">
                </th>
                <th class="text-center font-weight-bolder">주문ID</th>
                <th class="text-center font-weight-bolder">주문일자</th>
                <th class="text-center font-weight-bolder">거래처</th>
                <th class="text-center font-weight-bolder">담당자</th>
                <th class="text-center font-weight-bolder">승인자</th>
                <th class="text-center font-weight-bolder">주문최종상태</th>
                <th class="text-center font-weight-bolder">비고</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info, index) in orders" v-bind:key="info.order_id" @click="getOrderDetails(index)"
                :class="selectedIndex === index ? 'table-active' : ''">
                <td class="align-middle text-center">
                  <input type="checkbox" v-if="info.order_final_status === '1a'" v-model="info.selected"
                    @change="check">
                </td>
                <td class="text-center">{{ info.order_id}}</td>
                <td class="text-center">{{ formatDate(info.order_date)}}</td>
                <td class="text-center">{{ info.vendor_name }}</td>
                <td class="text-center">{{ info.employee_name }}</td>
                <td class="text-center">{{ info.manager_name }}</td>
                <td class="text-center">
                  <button class="btn btn-sm m-0 text-white" :class="{'btn-info': info.order_final_status === '1a',
                                                    'btn-success': info.order_final_status === '2a',
                                                    'btn-danger': info.order_final_status === '3a',
                                                    'btn-secondary': info.order_final_status === '4a'
                                                    }" disabled>
                                                    {{ codeToName(info.order_final_status, codes) }}
                                                  </button>


                </td>
                <td class="text-center">{{ info.memo }}</td>
              </tr>
            </tbody>
          </table>
        <!-- </div> -->
      </div>
    </div>

    <div class="card mb-5" v-if="orderDetails.length != 0">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">주문상세내역</h6>
        </div>
      </div>
      <div class="card-body px-0 py-2">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-center font-weight-bolder">주문상세ID</th>
              <th class="text-center font-weight-bolder">제품명</th>
              <th class="text-center font-weight-bolder">주문수량</th>
              <th class="text-center font-weight-bolder">납품일자</th>
              <th class="text-center font-weight-bolder">주문상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(info, index) in orderDetails" v-bind:key="info.order_detail_id">
              <td class="text-center">{{ info.order_detail_id }}</td>
              <td class="text-center">{{ info.prod_name }}</td>
              <td class="text-center">{{ info.order_amount }}</td>
              <td class="text-center">{{ formatDate(info.deliv_due_date) }}</td>
              <td class="text-center">
                <button class="btn btn-sm m-0 text-white" :class="{'btn-info': info.order_status === '1z',
                                                    'btn-success': info.order_status === '2z',
                                                    'btn-danger': info.order_status === '3z',
                                                    'btn-secondary': info.order_status === '4z'
                                                    }" disabled>
                                                    {{ codeToName(info.order_status, detailCodes) }}
                                                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    mapState
  } from 'pinia';
  import {
    useUserStore
  } from "@/stores/user";
  import {
    formatDate,
    codeToName
  } from '@/utils/common';

  export default {
    name: "주문조회",
    data() {
      return {
        searchName: '',
        searchType: '',
        searchStartDate: formatDate(),
        searchEndDate: formatDate(),
        orders: [],
        orderDetails: [],
        codes: [],
        detailCodes: [],
        allSelected: false,
        selectedIndex: null,
      }
    },
    computed: {
      ...mapState(useUserStore, [
        "isLoggedIn",
        "userInfo",
      ])
    },
    methods: {
      registerOrder() {
        this.$router.push('/ordersmng');
      },
      modifyOrder() {
        if (this.selectedIndex != null) {

          let selected = this.orders[this.selectedIndex];

          if (selected.order_final_status == '1a') {
            this.$router.push({
              path: '/ordersmng',
              query: {
                order_id: this.orders[this.selectedIndex].order_id,
              }
            });
          } else {
            this.$swal({
              text: "승인완료된 건은 수정할 수 없습니다",
              icon: "warning"
            });
          }
        } else {
          // sweetalert 문자+아이콘
          this.$swal({
            text: "선택된 항목이 없습니다",
            icon: "warning"
          });
        }
      },
      async getOrders() {
        const params = {};

        if (this.searchName) params.vendor_name = this.searchName;
        if (this.searchType) params.order_final_status = this.searchType;
        if (this.searchStartDate) params.startDate = this.searchStartDate;
        if (this.searchEndDate) params.endDate = this.searchEndDate;

        let result =
          await axios.get(`/api/order`, {
            params
          })
          .catch(err => console.log(err));

        this.orders = result.data.map(item => ({
          ...item,
          selected: false
        }));
        this.allSelected = false;
        this.selectedIndex = null;
        this.orderDetails = [];
      },
      async getOrderDetails(index) {
        this.selectedIndex = index;

        let result =
          await axios.get(`/api/order/${this.orders[index].order_id}`)
          .catch(err => console.log(err));
        this.orderDetails = result.data;
      },
      async getOrderStatus() {
        let res = await axios.get(`/api/codes/A1`)
          .catch(err => console.log(err));
        this.codes = res.data;
      },
      async getOrderDetailStatus() {
        let res = await axios.get(`/api/codes/Z1`)
          .catch(err => console.log(err));
        this.detailCodes = res.data;
      },
      async confirmOrder() {

        const selectedItems = this.orders.filter(item => item.selected);

        let params = {
          orders: selectedItems,
          employee_id: this.userInfo.employee_id,
        }

        if (selectedItems.length > 0) {

          // sweetalert2 문자+아이콘+확인
          this.$swal({
            text: "선택된 항목을 승인하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "승인",
            cancelButtonText: "취소",
          }).then(async result => {
            if (result.isConfirmed) {
              let res = await axios.post(`/api/orderConfirm`, params)
                .catch(err => console.log(err));

              if (res.data.success) {
                // sweetalert 문자+아이콘
                this.$swal({
                  text: "선택된 항목이 승인되었습니다",
                  icon: "success"
                });

                this.getOrders();

              } else {
                // sweetalert 문자+아이콘
                this.$swal({
                  text: "삭제 처리 중 오류가 발생했습니다",
                  icon: "error"
                });
              }
            }
          });
        } else {
          // sweetalert 문자+아이콘
          this.$swal({
            text: "선택된 항목이 없습니다",
            icon: "warning"
          });
        }
      },
      async removeOrder() {
        if (this.selectedIndex != null) {

          let selectedOrder = this.orders[this.selectedIndex];

          if (selectedOrder.order_final_status == '1a') {

            // sweetalert 문자+아이콘+확인
            this.$swal({
              text: "선택된 항목을 삭제하시겠습니까?",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "삭제",
              cancelButtonText: "취소",
            }).then(async result => {
              if (result.isConfirmed) {
                let res = await axios.delete(`/api/order`, {
                    params: {
                      order_id: selectedOrder.order_id
                    }
                  })
                  .catch(err => console.log(err));

                if (res.data.success) {
                  // sweetalert 문자+아이콘
                  this.$swal({
                    text: "선택된 항목이 삭제되었습니다",
                    icon: "success"
                  });
                  this.getOrders();
                  this.orderDetails = [];
                } else {
                  // sweetalert 문자+아이콘
                  this.$swal({
                    text: "삭제 처리 중 오류가 발생했습니다",
                    icon: "error"
                  });
                }
              }
            })
          } else {
            // sweetalert 문자+아이콘
            this.$swal({
              text: "승인완료된 건은 삭제할 수 없습니다",
              icon: "warning"
            });
          }
        } else {
          // sweetalert 문자+아이콘
          this.$swal({
            text: "선택된 항목이 없습니다",
            icon: "warning"
          });
        }
      },
      resetSearch() {
        this.searchName = '';
        this.searchType = '';
        this.searchStartDate = formatDate();
        this.searchEndDate = formatDate();
      },
      toggleAll() {
        this.orders.forEach(item => {
          if (item.order_final_status == '1a') {
            item.selected = this.allSelected;
          }
        });
      },
      check() {
        this.allSelected = this.orders.every(item => item.selected);
      },
      codeToName(code, codeArray) {
        return codeToName(code, codeArray);
      },
      formatDate(dateString) {
        return formatDate(dateString);
      }
    },
    created() {
      this.getOrderStatus();
      this.getOrderDetailStatus();
      this.getOrders();
    },
  }
</script>