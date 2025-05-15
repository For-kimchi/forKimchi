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
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재입고상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재입고ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">입고수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">입고상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateQualityreq" v-bind:key="info.inbound_detail_id"
                    v-on:click="mateQualityWait(index)" style="cursor: pointer;" :class="selectedIndex === index ? 'table-active' : ''">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{ info.inbound_detail_id }}</td>
                    <td class="align-middle text-center">{{ info.inbound_id }}</td>
                    <td class="align-middle text-center">{{ info.mate_id }}</td>
                    <td class="align-middle text-center">{{ info.mate_name }}</td>
                    <td class="align-middle text-center">{{ info.inbound_amount }}</td>
                    <td class="align-middle text-center">{{ info.inbound_status }}</td>
                    <td class="align-middle text-center">{{ info.memo }}</td>
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
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사번호
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사이름
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사기준
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사기준입력
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상태</th>

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateQualitywait" v-bind:key="info.option_id" style="cursor: pointer;">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{ info.option_id }}</td>
                    <td class="align-middle text-center">{{ info.option_name }}</td>
                    <td class="align-middle text-center">{{ info.option_standard}} {{info.option_operator}}</td>
                    <td class="align-middle text-center"><input type="number" v-model="info.quality_result_value"></td>
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
    data() {
      return {
        mateQualityreq: [],
        mateQualitywait: [],
        selected: [],
        selectedIndex: null,
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
    created() {
      this.mateQualityReq();
    },
    watch: {
      mateQualitywait: {
        handler(newResult) {
          newResult.forEach(info => {
            const result_value = info.quality_result_value;
            const standard = info.option_standard;
            const operator = info.option_operator;
            if (!isNaN(result_value) && !isNaN(standard)) {
              if(result_value == null || result_value == ''){
                info.result = '대기';
              } else if(operator == '이하') {
                info.result = result_value <= standard ? '합격' : '불합격';
              } else if(operator == '이상'){
                info.result = result_value >= standard ? '합격' : '불합격';
            }
          }else{
            info.result = '대기';
        }
          });
        },
        deep: true
      }
    },
    methods: {
      // 자재검사요청 (요청)
      async mateQualityReq() {
        let ajaxRes =
          await axios.get(`/api/mateQualityReq`)
          .catch(err => console.log(err));
        this.mateQualityreq = ajaxRes.data;
      },
      // 자재검사요청상세 (대기)
      async mateQualityWait(index) {
        this.selected = this.mateQualityreq[index];
        let ajaxRes =
          await axios.get(`/api/mateQualityWait/${this.selected.inbound_detail_id}`)
          .catch(err => console.log(err));
        this.mateQualitywait = ajaxRes.data;
      },
      // 검사버튼
      async test() {
        let param = {
          inbound_detail_id: this.selected.inbound_detail_id,
          details: this.mateQualitywait
        };
        // 검사결과값 입력여부 체크

        // 비정상
        let save = false;
        for (let idx of this.mateQualitywait) {
          let val = Object.hasOwn(idx, 'quality_result_value');
          if (!val || idx.quality_result_value <= 0) {
            alert("검사결과값 을 입력하세요.");
            return;
          }
        }
        // 정상
        let testlist = await axios.post('/api/mateInsert', param)
          .catch(err => console.log(err))
        console.log(testlist);
        if (testlist.data.affectedRows > 0) {
          alert('저장이 완료되었습니다');
          this.mateQualityreq.filter(item => item.inbound_detail_id !== this.selected.inbound_detail_id);
          this.selected = [];
          this.mateQualitywait = [];
        } else {
          alert('저장 과정에서 오류가 발생했습니다');
        };
      },
      // addRow() {
      //   this.mateQualitywait.push({});
      // }
    }
  }
</script>