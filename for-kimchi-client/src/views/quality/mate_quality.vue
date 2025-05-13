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
                    <th>자재입고상세ID</th>
                    <th>검사번호</th>
                    <th>자재ID</th>
                    <th>자재명</th>
                    <th>입고수량</th>
                    <th>검사결과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateQualityViewall" :key="info.quality_id"
                    v-on:click="mateQualityViewDetail(info.quality_id)">
                    <td>{{info.inbound_detail_id}}</td>
                    <td>{{ info.quality_id }}</td>
                    <td>{{ info.mate_id }}</td>
                    <td>{{ info.mate_name }}</td>
                    <td>{{ info.inbound_amount }}</td>
                    <td>
                      <span v-if="info.result === '최종합격'" class="badge badge-sm bg-gradient-info"
                        style="width: 60px; text-align: center;">
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
                    <th>검사상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateQualityViewdetail" v-bind:key="option_id" style="cursor: pointer;">
                    <td>{{ info.option_id }}</td>
                    <td>{{ info.option_name }}</td>
                    <td>{{ info.option_standard }}</td>
                    <td>{{ info.quality_result_value }}</td>
                    <td>
                      <span v-if="info.result === '합격'" class="badge badge-sm bg-gradient-info"
                        style="width: 60px; text-align: center;">
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
        mateQualityViewDropdown: [],
        mateQualityViewall: [],
        mateQualityViewdetail: [],
      }
    },
    created() {
      this.mateQualityViewDropDown();
      this.mateQualityViewAll();
    },
    watch() {
      this.info.result == '합격'
      
    },
    methods: {
      async mateQualityViewDropDown() {
        let ajaxRes =
          await axios.get(`/api/mateQualityViewDropDown`)
          .catch(err => console.log(err));
        this.mateQualityViewDropdown = ajaxRes.data;
      },
      async mateQualityViewAll() {
        let ajaxRes =
          await axios.get(`/api/mateQualityViewAll`)
          .catch(err => console.log(err));
        this.mateQualityViewall = ajaxRes.data;
      },
      async mateQualityViewDetail(detailId) {
        let ajaxRes =
          await axios.get(`api/mateQualityViewDetail/${detailId}`)
          .catch(err => console.log(err));
        this.mateQualityViewdetail = ajaxRes.data;
      },
      async insertResult() {
        
      },
      addRow() {
        this.mateQualityViewdetail.push({});
      }
    }
  }
</script>