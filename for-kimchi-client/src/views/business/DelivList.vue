<template>
  <div class="container-fluid">
    <!-- 검색 -->
    <div class="row">
      <div class="col text-end">
        <button class="btn btn-success" @click="getDelivs">조회</button>
      </div>
    </div>

    <div class="card mt-3 mb-5">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">납품조회</h6>
        </div>
      </div>
      <div class="row g-3 mt-3 ms-3">
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">거래처명</label>
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="거래처명" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">납품상태</label>
            <select v-model="searchType" class="form-select text-center">
              <option value="">전체</option>
              <option v-for="code in codes" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">시작일자</label>
            <input v-model="searchStartDate" type="date" class="form-control border text-center" placeholder="" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">종료일자</label>
            <input v-model="searchEndDate" type="date" class="form-control border text-center" placeholder="" />
          </div>
        </div>
      </div>
    </div>

        <div class="card mb-5">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">납품내역</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2" style="max-height: 300px; overflow: auto;">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">납품ID</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">주문상세ID</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">납품일자</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">담당자</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">납품상태</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in delivs" v-bind:key="info.order_id" @click="getDelivDetails(info.deliv_id)">
                    <td class="align-middle text-center">{{ info.deliv_id}}</td>
                    <td class="align-middle text-center">{{ info.order_detail_id}}</td>
                    <td class="align-middle text-center">{{ yyyyMMdd(info.deliv_date)}}</td>
                    <td class="align-middle text-center">{{ info.employee_id }}</td>
                    <td class="align-middle text-center">{{ info.deliv_status }}</td>
                    <td class="align-middle text-center">{{ info.memo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="card mb-5">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">납품상세내역</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">납품상세ID</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">납품ID</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">제품LOT</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">제품ID</th>
                    <th class="text-center text-uppercase font-weight-bolder opacity-7">납품수량</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in delivDetails" v-bind:key="info.deliv_detail_id">
                    <td class="align-middle text-center">{{ info.deliv_detail_id }}</td>
                    <td class="align-middle text-center">{{ info.deliv_id }}</td>
                    <td class="align-middle text-center">{{ info.prod_lot }}</td>
                    <td class="align-middle text-center">{{ info.prod_id }}</td>
                    <td class="align-middle text-center">{{ info.deliv_amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "납품조회",
    data(){
      return {
        searchName: "",
        searchType: "",
        searchStartDate: this.getTodayDate(),
        searchEndDate: this.getTodayDate(),
        delivs : [],
        delivDetails : [],
        codes: [],
      }
    },
    methods : {
      async getDelivs(){
        const params = {};
      
        if (this.searchName) params.vendor_name = this.searchName;
        if (this.searchType) params.deliv_status = this.searchType;
        if (this.searchStartDate) params.startDate = this.searchStartDate;
        if (this.searchEndDate) params.endDate = this.searchEndDate;

        console.log(params);

        let result =
        await axios.get(`/api/deliv`, {
                    params
                  })
                  .catch(err => console.log(err));

        this.delivs = result.data;
      },
      async getDelivDetails(delivId) {
        let result = 
        await axios.get(`/api/deliv/${delivId}`)
                   .catch(err => console.log(err));
        this.delivDetails = result.data;
      },
      async getDelivType() {
        let res = await axios.get(`/api/codes/B1`)
          .catch(err => console.log(err));
        this.codes = res.data;
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
    },
    created() {
      this.getDelivType();
    }
}

</script>