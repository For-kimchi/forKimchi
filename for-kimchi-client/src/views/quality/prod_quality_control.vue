<template>
  <div class="container-fluid py-4">
    <div class="row">
      <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
          <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">자재검사</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                 <tr>  
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산지시LOT</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산공정ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">설비ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">공정ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">제품ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">제품명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">투입량</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in prodQualityreq" v-bind:key="info.prod_id" v-on:click="prodQualityWait(index)" style="cursor: pointer;">
                      <td class="align-middle text-center">{{ info.prod_order_lot }}</td>
                      <td class="align-middle text-center">{{ info.prod_proc_id }}</td>
                      <td class="align-middle text-center">{{ info.equip_id }}</td>
                      <td class="align-middle text-center">{{ info.proc_id }}</td>
                      <td class="align-middle text-center">{{ info.prod_id }}</td>
                      <td class="align-middle text-center">{{ info.prod_name }}</td>
                      <td class="align-middle text-center">{{ info.proc_input_amount }}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- row div-->
    </div>
    <div class="row">
      <div class="col-12">
        <div class="text-end pe-3 ">
          <!-- 승인버튼에 세션값을 통해 권한이 있을경우에만 작동하도록 조건을 넣어줘야함 -->
          <button class="btn btn-success ms-2 me-2" @click="test">검사</button>
          <button class="btn btn-danger ms-2 me-2" @click="">반려</button>
        </div>
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">검사대기</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사번호
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사이름
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사기준
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사기준입력
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상탸
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in prodQualitywait" v-bind:key="prod_detail_id" style="cursor: pointer;">
                    <td class="align-middle text-center">{{ info.option_id }}</td>
                    <td class="align-middle text-center">{{ info.option_name }}</td>
                    <td class="align-middle text-center">{{ info.option_standard}}</td>
                    <td class="align-middle text-center">{{ info.result}}</td>
                    <td class="align-middle text-center">
                      <span v-if="info.result === '합격'" class="badge badge-sm bg-gradient-info"
                        style="width: 60px; text-align: center;">
                        {{ info.result }}
                      </span>
                      <span v-else-if="info.result === '불합격'" class="badge badge-sm bg-gradient-danger"
                        style="width: 60px; text-align: center;">
                        {{ info.result }}
                      </span>
                      <span v-else class="badge badge-sm bg-gradient-warning" style="width: 60px; text-align: center;">
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
        prodQualityreq :[],
        prodQualitywait : [],
        selected: {},
      }
    },
    created() {
      this.prodQualityReq();
    },
    watch: {
      prodQualitywait: {
        handler(newResult) {
          newResult.forEach(info => {
            const result_value = info.quality_result_value;
            const standard = info.option_standard;
            if (!isNaN(result_value) && !isNaN(standard)) {
              info.result = result_value >= standard ? '합격' : '불합격';
            } else {
              info.result = '대기';
            }
          });
        },
        deep: true
      }
    },
    methods: {
       reloadPage() {
        location.reload();
      },

      // 제품품검사요청 (요청)
      async prodQualityReq(){
        let ajaxRes = 
        await axios.get(`/api/prodQualityReq`)
                   .catch(err => console.log(err));
                   this.prodQualityreq = ajaxRes.data;
      },

      // 제품검사요청 (대기)
      async prodQualityWait(index){
        this.selected = this.prodQualityreq[index];

        let ajaxRes = 
          await axios.get(`/api/prodQualityWait/${this.selected.prod_id}`)
                   .catch(err => console.log(err));
                   this.prodQualitywait = ajaxRes.data;
      },
      addRow() {
        this.prodQualitywait.push({});
      }
    }
  }
</script>