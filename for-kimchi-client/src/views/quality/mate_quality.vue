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
            <option v-for="(info, idx) in mateQualityViewDropdown" v-bind:key="idx.id" v-on:click="mateQualityViewAll(info.mate_id)" >
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
                    <th>자재입고상세ID</th>
                    <th>검사번호</th>
                    <th>자재이름</th>
                    <th>자재번호</th>
                    <th>검사결과</th>
                  </tr>
                </thead>
              </table>
              <div style="max-height: 200px; overflow-y: auto;">
                <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                  <tbody>
                      <tr v-for="(info, index) in mateQualityViewall" :key="info.quality_id" v-on:click="mateQualityViewDetail(info.quality_id)" style="cursor: pointer;">
                        <!--클릭안에 -> getQualityDetail(info.id)-->
                        <td>{{info.inbound_detail_id}}</td>
                        <td>{{ info.quality_id }}</td>
                        <td>{{ info.mate_name }}</td>              <!--검사아이디-->
                        <td>{{ info.mate_id }}</td>
                        <td>
                          <span v-if="info.result === '최종합격'" class="badge badge-sm bg-gradient-info" style="width: 60px; text-align: center;">
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
      <div class="col-12">
        <MaterialAlert>자재검사상세</MaterialAlert>
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" style="table-layout: fixed; width: 100%;">
                <thead>
                  <tr>
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
                      <tr v-for="(info, index) in mateQualityViewdetail" v-bind:key="info.id" style="cursor: pointer;">
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
        mateQualityViewDropdown :[],
        mateQualityViewall :[],
        mateQualityViewdetail :[],
      }
    },
    created() {
      this.mateQualityViewDropDown();
      this.mateQualityViewAll();
    },
    computed: {

    },
    methods: {
      async mateQualityViewDropDown() {
        let ajaxRes =
        await axios.get(`/api/mateQualityViewDropDown`)
                   .catch(err => console.log(err));
                   this.mateQualityViewDropdown = ajaxRes.data;
      },
      async mateQualityViewAll(){
        let ajaxRes = 
        await axios.get(`/api/mateQualityViewAll`)
                   .catch(err => console.log(err));
                   this.mateQualityViewall = ajaxRes.data;
      },
      async mateQualityViewDetail(detailId){
        let ajaxRes =
        await axios.get(`api/mateQualityViewDetail/${detailId}`)
                   .catch(err => console.log(err));
        this.mateQualityViewdetail = ajaxRes.data;
      },
      addRow() {
        this.mateQualityViewdetail.push({});
      }
    }
  }
</script>