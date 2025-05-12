<template>
  <div class="container-fluid py-4">
    <div class="row">
      <!-- 행 영역 div-->
      <div class="col-12">
        <div class="text-end pe-3 ">
          <button class="btn btn-secondary  btn-sm" @click="reloadPage">새로고침</button>
        </div>
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
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재입고상세ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재입고ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">입고수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">양품수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">불량품수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">유통기한
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">입고상태
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateQualityreq" v-bind:key="info.mate_id"
                    v-on:click="mateQualityWait(index)" style="cursor: pointer;">
                    <!--클릭안에 -> getQualityDetail(info.id)-->
                    <td class="align-middle text-center">{{ info.inbound_detail_id }}</td>
                    <td class="align-middle text-center">{{ info.inbound_id }}</td>
                    <td class="align-middle text-center">{{ info.mate_id }}</td>
                    <td class="align-middle text-center">{{ info.mate_name }}</td>
                    <td class="align-middle text-center">{{ info.inbound_amount }}</td>
                    <td class="align-middle text-center">{{ info.pass_amount }}</td>
                    <td class="align-middle text-center">{{ info.fail_amount }}</td>
                    <td class="align-middle text-center">{{ info.date }}</td>
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
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateQualitywait" v-bind:key="mate_detail_id" style="cursor: pointer;">
                    <td class="align-middle text-center">{{ info.option_id }}</td>
                    <td class="align-middle text-center">{{ info.option_name }}</td>
                    <td class="align-middle text-center">{{ info.option_standard}}</td>
                    <td class="align-middle text-center"><input type="text" v-model="info.quality_result_value"></td>
                    <td class="align-middle text-center">
                      <span v-if="info.result === '합격'" class="badge badge-sm bg-gradient-info"
                        style="width: 60px; text-align: center;">
                        {{ info.result }}
                      </span>
                      <span v-else-if="info.result === '불합격'" class="badge badge-sm bg-gradient-danger" style="width: 60px; text-align: center;">
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
        mateQualityreq: [],
        mateQualitywait: [],
        selected: {},
      }
    },
    created() {
      this.mateQualityReq();
    },
    watch: {
      mateQualitywait: {
        handler(newResult) {
          newResult.forEach(info => {
            const result_value = parseFloat(info.quality_result_value);
            const standard = parseFloat(info.option_standard);
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
          await axios.get(`/api/mateQualityWait/${this.selected.mate_id}`)
          .catch(err => console.log(err));
        this.mateQualitywait = ajaxRes.data;
      },

      async test() {
        let param = {
          inbound_detail_id: this.selected.inbound_detail_id,
          details: this.mateQualitywait
        }


        let testlist = await axios.post('/api/mateInsert', param)
          .catch(err => console.log(err))
        console.log(testlist);

        if (testlist.data.affectedRows > 0) {
          alert('저장이 완료되었습니다');

          this.mateQualityreq = this.mateQualityreq.filter(item => item.inbound_detail_id !== this.selected
            .inbound_detail_id);
          this.selected = {};
          this.mateQualitywait = [];

        } else {
          alert('저장 과정에서 오류가 발생했습니다');
        }
      },
      addRow() {
        this.mateQualitywait.push({});
      }
    }
  }
</script>