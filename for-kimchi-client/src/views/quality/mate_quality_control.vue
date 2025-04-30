<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="d-flex align-items-center justify-content-end mb-3 px-3 ">
          <MaterialButton class="btn btn-info" @click="handleInspection">
            추가
          </MaterialButton>
        </div>
        <Material-Alert>자재검사</Material-Alert>
        <h4>검사요청</h4>
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                <thead class="table-header">
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">발주번호</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재번호</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">LOT</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><input type="checkbox"/></th>
                  </tr>
                </thead>
              </table>
              <div style="max-height: 200px; overflow-y: auto;">
                <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                  <tbody>
                      <tr v-for="(info, index) in matelists" :key="info.id" @click="" style="cursor: pointer;">
                        <!--클릭안에 -> getQualityDetail(info.id)-->
                        <td class="align-middle text-center">{{ info.req_id }}</td>
                        <td class="align-middle text-center">{{ info.mate_name }}</td>
                        <td class="align-middle text-center">{{ info.mate_id }}</td>
                        <td class="align-middle text-center">{{ info.mate_lot }}</td>
                        <td class="align-middle text-center"><input type="checkbox"/></td>
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
        <MaterialButton class="btn btn-info me-2" @click="handleIncoming">
          검사
        </MaterialButton>

        <MaterialButton class="btn btn-warning" @click="handleInspection">
          반려
        </MaterialButton>
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
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">항목</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">규격</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">기준</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">방법</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      <input type="checkbox"/>
                    </th>
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상태</th> -->
                  </tr>
                </thead>
              </table>
              <div style="max-height: 200px; overflow-y: auto;">
                <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                  <tbody>
                      <tr v-for="(info, index) in mateQualityDetail" :key="info.id" @click="" style="cursor: pointer;">
                        <td class="align-middle text-center">{{ info.quality_date }}</td>
                        <td class="align-middle text-center">{{ info.option_name }}</td>
                        <td class="align-middle text-center">{{ info.option_standard }}</td>
                        <td class="align-middle text-center">{{ info.option_spec}}</td>
                        <td class="align-middle text-center"><input type="text"></td>
                        <td class="align-middle text-center">
                          <input type="checkbox"/>
                        </td>
                        <!-- <td>{{info.quality_result}}</td> -->
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
        mateQuality: [],
        mateQualityDetail: [],
        mateLotDetail: [],
        matelists: [],
        selectedMaterial: '',
        searchKeyword: '',
      }
    },
    computed: {
      mateCount() {
        return this.mateQuality.length;
      },
      mateLot() {
        return this.mateLotDetail.length;
      },
      matelist() {
        return this.matelists.length;
      }

    },
    methods: {
      async getQualityDetail() {
        let res = await axios.get(`/api/quality-detail`)
          .catch(err => console.log(err));
        this.mateQualityDetail = res.data;
      },
      search() {

      },
      async getMate() {
        let res = await axios.get(`/api/quality-mate`)
        .catch(err => console.log(err));
        this.matelists= res.data;
      }
    },
    created() {
      this.getQualityDetail();
      this.getMate();
    }
  }
</script>