<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="d-flex align-items-center justify-content-end mb-3 px-3 ">
        </div>
        <Material-Alert>자재검사</Material-Alert>
        <h4>검사요청</h4>
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                <thead class="table-header">
                  <tr>  
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재입고상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재입고ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">입고수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">양품수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">불량품수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">유통기한</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">입고상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">비고</th>
                  </tr>
                </thead>
              </table>
              <div>
                <table class="table align-items-center mb-0" >
                  <tbody>
                    <tr v-for="(info, index) in mateQualityreq" v-bind:key="info.mate_id" v-on:click="mateQualityWait(index)" style="cursor: pointer;">
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
      </div>
    </div>
  </div>

  <div class="container-fluid py-4">
    <div class="row">
      <!-- 영역 -->
      <div class="d-flex align-items-center justify-content-end mb-3 px-3 ">
        <button class="btn btn-info ms-2 me-2" @click="test">검사</button>

        <button class="btn btn-warning ms-2 me-2" @click="">반려</button>
      </div>
      <!--까지 -->
      <div class="col-12">
        <materialAlert><span>검사대기</span></materialAlert>
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사번호</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사이름</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사기준</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사기준입력</th>
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상태</th> -->
                  </tr>
                </thead>
              </table>
              <div style="max-height: 200px; overflow-y: auto;">
                <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                  <tbody>
                    <tr v-for="(info, index) in mateQualitywait" v-bind:key="mate_detail_id"  style="cursor: pointer;">
                      <td class="align-middle text-center">{{ info.option_id }}</td>
                      <td class="align-middle text-center">{{ info.option_name }}</td>
                      <td class="align-middle text-center">{{ info.option_standard}}</td>
                      <td class="align-middle text-center"><input type="text" v-model="info.quality_result_value"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import MaterialAlert from '../../components/MaterialAlert.vue';
  import MaterialAvatar from '../../components/MaterialAvatar.vue';
  import MaterialBadge from '../../components/MaterialBadge.vue';
  import MaterialButton from '../../components/MaterialButton.vue';
  import MaterialCheckbox from '../../components/MaterialCheckbox.vue';
  import MaterialInput from '../../components/MaterialInput.vue';
  import MaterialRadio from '../../components/MaterialRadio.vue';
  import MaterialSwitch from '../../components/MaterialSwitch.vue';
  import MaterialTextarea from '../../components/MaterialTextarea.vue';

  export default {

    components: {
      MaterialAlert,
      MaterialAvatar,
      MaterialBadge,
      MaterialButton,
      MaterialCheckbox,
      MaterialInput,
      MaterialRadio,
      MaterialSwitch,
      MaterialTextarea,
    },
    data() {
      return {
        mateQualityreq :[],
        mateQualitywait: [],
        selected: {},
      }
    },
    created() {
      this.mateQualityReq();
    },
    computed: {
      
    },
    methods: {
      // 자재검사요청 (요청)
      async mateQualityReq(){
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
          inbound_detail_id : this.selected.inbound_detail_id,
          details : this.mateQualitywait
        }


        let testlist = await axios.post('/api/mateInsert', param)
                    .catch(err => console.log(err))
                    console.log(testlist);

                    if (testlist.data.affectedRows > 0) {
          alert('저장이 완료되었습니다');

          this.mateQualityreq = this.mateQualityreq.filter (item => item.inbound_detail_id !== this.selected.inbound_detail_id);
          this.selected = {};
          this.mateQualitywait = [];

        } else {
          alert('저장 과정에서 오류가 발생했습니다');
        }
      },
      addRow(){
        this.mateQualitywait.push({});
      }
    }
  }
</script>