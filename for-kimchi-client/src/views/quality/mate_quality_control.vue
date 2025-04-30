<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="d-flex align-items-center justify-content-end mb-3 px-3 ">
          <MaterialButton class="btn btn-info" @click="handleInspection">
            추가
          </MaterialButton>
        </div>
        <MaterialAlert>자재검사</MaterialAlert>
        <h4>검사요청</h4>
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                <thead class="table-header">
                  <tr>
                    <th>발주번호</th>
                    <th>자재명</th>
                    <th>자재번호</th>
                    <th>LOT</th>
                    <MaterialCheckbox></MaterialCheckbox>
                  </tr>
                </thead>
              </table>
              <div style="max-height: 200px; overflow-y: auto;">
                <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                  <tbody>
                    <template v-if="mateCount > 0">
                      <tr v-for="(info, index) in mateQuality" :key="info.id" @click="" style="cursor: pointer;">
                        <!--클릭안에 -> getQualityDetail(info.id)-->
                        <td>{{ info.quality_date }}</td>
                        <td>{{ info.mate_name }}</td>
                        <td>{{ info.mate_lot }}</td>
                        <td>{{ info.sub_code_name }}</td>
                        <td>{{ info.result }}</td>

                      </tr>
                    </template>
                    <tr v-else>
                      <td colspan="4">현재 데이터가 존재하지 않습니다</td>
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
        <h4>검사대기</h4>
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                <thead>
                  <tr>
                    <th>검사일자</th>
                    <th>항목</th>
                    <th>규격</th>
                    <th>방법</th>
                    <th>검사결과</th>
                    <th>
                      <MaterialCheckbox></MaterialCheckbox>
                    </th>
                    <th>상태</th>
                  </tr>
                </thead>
              </table>
              <div style="max-height: 200px; overflow-y: auto;">
                <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                  <tbody>
                    <template v-if="detailCount > 0">
                      <tr v-for="(info, index) in mateQualityDetail" :key="info.id" @click="" style="cursor: pointer;">
                        <td>{{ info.quality_date }}</td>
                        <td>{{ info.option_name }}</td>
                        <td>{{ info.option_standard }}</td>
                        <td>{{ info.option_spec}}</td>
                        <td>{{ info.sub_code_name}}</td>
                        <td>
                          <MaterialCheckbox></MaterialCheckbox>
                        </td>
                        <td>{{info.quality_result}}</td>
                      </tr>
                    </template>
                    <tr v-else>
                      <td colspan="4">현재 데이터가 존재하지 않습니다</td>
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
        selectedMaterial: '',
        searchKeyword: '',
      }
    },
    computed: {
      mateCount() {
        return this.mateQuality.length;
      },
      detailCount() {
        return this.mateQualityDetail.length;
      },
      mateLot() {
        return this.mateLotDetail.length;
      }
    },
    methods: {
      async getQuality() {
        let res = await axios.get('/api/quality')
          .catch(err => console.log(err));
        this.mateQuality = res.data;
      },
      async getQualityDetail() {
        let res = await axios.get(`/api/quality-detail`)
          .catch(err => console.log(err));
        this.mateQualityDetail = res.data;
      },
      async getMateLot() {
        let res = await axios.get(`/api/quality-lot`)
          .catch(err => console.log(err));
        this.mateLotDetail = res.data;
      },
      search() {

      },
    },
    created() {
      this.getQuality();
      this.getQualityDetail();
      this.getMateLot();
    }
  }
</script>