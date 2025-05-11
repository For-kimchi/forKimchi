<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">자재검사결과</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th>생산공정ID</th>
                    <th>검사번호</th>
                    <th>제품이름</th>
                    <th>제품번호</th>
                    <th>검사결과</th>
                  </tr>
                </thead>
                <tbody>
                     <tr v-for="(info, index) in prodQualityViewall" :key="info.quality_id" v-on:click="prodQualityViewDetail(info.quality_id)" style="cursor: pointer;">
                        <td>{{ info.prod_proc_id }}</td>
                        <td>{{ info.quality_id }}</td>
                        <td>{{ info.prod_name }}</td>
                        <td>{{ info.prod_id }}</td>
                        <td>
                          <span v-if="info.final_result === '최종합격'" class="badge badge-sm bg-gradient-info" style="width: 60px; text-align: center;">
                            {{ info.final_result }}
                          </span>
                          <span v-else class="badge badge-sm bg-gradient-danger" style="width: 60px; text-align: center;">
                            {{ info.final_result }}
                          </span>
                        </td>
                      </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">자재검사상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th>검사번호</th>
                    <th>검사명</th>
                    <th>기준치</th>
                    <th>검사결과</th>
                  </tr>
                </thead>
                <tbody>
                      <tr v-for="(info, index) in prodQualityViewdetail" v-bind:key="info.id" style="cursor: pointer;">
                        <td>{{ info.option_id }}</td>
                        <td>{{ info.option_name }}</td>
                        <td>{{ info.option_standard }}</td>
                        <td>
                          <span v-if="info.result === '합격'" class="badge badge-sm bg-gradient-info" style="width: 60px; text-align: center;">
                            {{ info.result }}
                          </span>
                          <span v-else class="badge badge-sm bg-gradient-danger" style="width: 60px; text-align: center;">
                            {{ info.result }}
                          </span>
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
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        prodQualityViewDropdown :[],
        prodQualityViewall :[],
        prodQualityViewdetail :[],
      }
    },
    created() {
      this.prodQualityViewDropDown();
      this.prodQualityViewAll();
    },
    computed: {

    },
    methods: {
      async prodQualityViewDropDown() {
        let ajaxRes =
        await axios.get(`/api/prodQualityViewDropDown`)
                   .catch(err => console.log(err));
                   this.prodQualityViewDropdown = ajaxRes.data;
      },
      async prodQualityViewAll(){
        let ajaxRes = 
        await axios.get(`/api/prodQualityViewAll`)
                   .catch(err => console.log(err));
                   this.prodQualityViewall = ajaxRes.data;
      },
      async prodQualityViewDetail(detailId){
        let ajaxRes =
        await axios.get(`api/prodQualityViewDetail/${detailId}`)
                   .catch(err => console.log(err));
        this.prodQualityViewdetail = ajaxRes.data;
      },
      addRow() {
        this.prodQualityViewdetail.push({});
      }
    }
  }
</script>