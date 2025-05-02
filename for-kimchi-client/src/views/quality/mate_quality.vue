<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <MaterialAlert>자재검사결과</MaterialAlert>

        <!-- 드롭다운-->
        <div class="d-flex align-items-center mb-3 px-3">
          <select v-model="selectedMaterial" class="form-select me-2 text-center"
            style="max-width: 200px; border: 1px solid gray; text-align-last: center;">
            <option value="">전체</option>
            <option v-for="(info, idx) in dropdown" v-bind:key="idx.id" v-on:click="qualityViewAll(info.mate_id)" >
              {{ info.mate_id }}
            </option>
          </select>

          <input v-model="searchKeyword" type="text" placeholder="검색어를 입력하세요" class="form-control me-2 text-center"
            style="max-width: 300px; border: 1px solid gray;" />
          <button @click="search" class="btn btn-primary" style="margin: 10px 20px 11px 2px;">
            검색
          </button>
        </div>

        <!--드롭다운-->

        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                <thead class="table-header">
                  <tr>
                    <th>검사일자</th>
                    <th>자재ID</th>
                    <th>자재명</th>
                    <th>검사결과</th>
                  </tr>
                </thead>
              </table>
              <div style="max-height: 200px; overflow-y: auto;">
                <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                  <tbody>
                      <tr v-for="(info, index) in qualityViewall" :key="info.mate_id" v-on:click="qualityViewDetail(info.mate_id)" style="cursor: pointer;">
                        <!--클릭안에 -> getQualityDetail(info.id)-->
                        <td>{{ info.quality_date }}</td>
                        <td>{{ info.mate_id }}</td>              <!--검사아이디-->
                        <td>{{ info.mate_name }}</td>
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
  </div>

  <div class="container-fluid py-4">
    <div class="row">
      <!-- 영역 -->
      <div class="d-flex align-items-center justify-content-end mb-3 px-3 ">
        <MaterialButton color="primary" class="me-2" @click="handleIncoming">
          입고
        </MaterialButton>

        <MaterialButton color="success" @click="handleInspection">
          전수검사
        </MaterialButton>
      </div>
      <!--까지 -->
      <div class="col-12">
        <MaterialAlert>자재검사상세</MaterialAlert>
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                <thead>
                  <tr>
                    <th>검사일자</th>
                    <th>검사번호</th>
                    <th>검사명</th>
                    <th>기준치</th>
                    <th>검사결과</th>
                    <th>
                      <input type="checkbox">
                    </th>
                  </tr>
                </thead>
              </table>
              <div style="max-height: 200px; overflow-y: auto;">
                <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                  <tbody>
                      <tr v-for="(info, index) in qualityViewdetail" v-bind:key="info.id" style="cursor: pointer;">
                        <td>{{ info.quality_date }}</td>
                        <td>{{ info.option_id }}</td>
                        <td>{{ info.option_name }}</td>
                        <td>{{ info.option_standard}}</td>
                        <td>
                          <span v-if="info.result === '합격'" class="badge badge-sm bg-gradient-info" style="width: 60px; text-align: center;">
                            {{ info.result }}
                          </span>
                          <span v-else class="badge badge-sm bg-gradient-danger" style="width: 60px; text-align: center;">
                            {{ info.result }}
                          </span>
                        </td>
                        <td>
                          <input type="checkbox">
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
        dropdown :[],
        qualityViewall :[],
        qualityViewdetail :[],
      }
    },
    created() {
      this.dropDown();
      this.qualityViewAll();
    },
    computed: {

    },
    methods: {
      async dropDown() {
        let ajaxRes =
        await axios.get(`/api/dropDown`)
                   .catch(err => console.log(err));
                   this.dropdown = ajaxRes.data;
      },
      async qualityViewAll(){
        let ajaxRes = 
        await axios.get(`/api/qualityViewAll`)
                   .catch(err => console.log(err));
                   this.qualityViewall = ajaxRes.data;
      },
      async qualityViewDetail(detailId){
        let ajaxRes =
        await axios.get(`api/qualityViewDetail/${detailId}`)
                   .catch(err => console.log(err));
        this.qualityViewdetail = ajaxRes.data;
      },
      addRow() {
        this.qualityViewdetail.push({});
      }
    }
  }
</script>