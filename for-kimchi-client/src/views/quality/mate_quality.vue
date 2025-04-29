<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <MaterialAlert>자재검사결과</MaterialAlert>

        <!-- 드롭다운시작-->
        <div class="d-flex align-items-center mb-3 px-3">
          <select v-model="selectedMaterial" class="form-select me-2" style="max-width: 200px;">
            <option value="">전체</option>
            <option v-for="(item, idx) in materialNames" :key="idx" :value="item">
              {{ item }}
            </option>
          </select>

          <input
            v-model="searchKeyword"
            type="text"
            placeholder="검색어를 입력하세요"
            class="form-control me-2"
            style="max-width: 300px;"
          />

          <button @click="search" class="btn btn-primary">
            검색
          </button>
        </div>
        <!--드롭다운끝-->
        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th>검사일자</th>
                    <th>자재명</th>
                    <th>자재번호</th>
                    <th>LOT</th>
                    <th>검사결과</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="count > 0">
                    <tr v-for="(info, index) in customerList" v-bind:key="info.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ info.equip_id }}</td>
                      <td>{{ info.equip_name }}</td>
                      <td>{{ info.equip_type }}</td>
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

  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <MaterialAlert>자재검사상세</MaterialAlert>

    <!--영역 -->
    <div class="d-flex align-items-center mb-3 px-3">
        <MaterialButton
          color="primary"
          class="me-2"
          @click="handleIncoming"
        >
          입고
        </MaterialButton>

        <MaterialButton
          color="success"
          @click="handleInspection"
        >
          전수검사
        </MaterialButton>
    </div>
    <!--까지 -->

        <div class="card my-4">
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th>검사일자</th>
                    <th>항목</th>
                    <th>규격</th>
                    <th>방법</th>
                    <th>검사결과</th>
                    <th><MaterialCheckbox></MaterialCheckbox></th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="count > 0">
                    <tr v-for="(info, index) in customerList" v-bind:key="info.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ info.equip_id }}</td>
                      <td>{{ info.equip_name }}</td>
                      <td>{{ info.equip_type }}</td>
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
        customerList: [],
        selectedMaterial: '',
        searchKeyword: '',
      }
    },
    computed: {
      count() {
        return this.customerList.length;
      }
    }
    ,methods: {
      async getCustomers() {
        let res = await axios.get('/api/equips')
        .catch(err => console.log(err));
        this.customerList = res.data;
      },
    }
    ,created() {
      // this.getCustomers();
    }
  }
  </script>
