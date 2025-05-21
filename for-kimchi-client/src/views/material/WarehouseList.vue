<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">제품현황</h6>
            </div>
          </div>

          <div class="card-body px-0 pb-2">
            <div class="row align-items-center g-3 px-3">
              <div class="col-md-9 d-flex align-items-center gap-3">
                <h6 class="mb-0 text-dark text-sm">창고현황</h6>
                <select v-model="selectedWarehouse" @change="wareSearch" class="align-middle text-center"
                  style="width: 150px; height: 35px; margin: 15px;background-color: white; color: black; border: 1px solid #ccc;">
                  <option disabled value="">창고를 선택하세요</option>
                  <option v-for="(info, index) in wareId.filter(w => w.warehouse_id !== 'WHS-004')" :key="index"
                    :value="info.warehouse_id">
                    {{ info.warehouse_name }}
                  </option>
                </select>

              </div>

              <div class="col-md-3 d-flex justify-content-md-end">
                <div class="btn-group btn-group-sm" role="group" aria-label="조회 방식">
                  <input type="radio" class="btn-check" id="lotView" value="lot" v-model="searchType"
                    @change="wareSearch" autocomplete="off">
                  <label class="btn btn-outline-success mb-0 px-3"
                    :class="searchType === 'lot' ? 'bg-primary text-white' : 'bg-white text-primary'" for="lotView">
                    LOT별 조회
                  </label>

                  <input type="radio" class="btn-check" id="groupView" value="group" v-model="searchType"
                    @change="wareSearch" autocomplete="off">
                  <label class="btn btn-outline-success mb-0 px-3"
                    :class="searchType === 'group' ? 'bg-primary text-white' : 'bg-white text-primary'" for="groupView">
                    자재별 묶음 조회
                  </label>
                </div>
              </div>
            </div>

            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                  <thead>
                    <tr v-show="searchType === 'lot'">
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">창고명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">LOT</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">담당자</th>
                    </tr>
                  </thead>
                    <thead>
                  <tr v-show="searchType === 'group'">
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">자재명
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">입고수량
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">최근 입고일자
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">LOT 수
                    </th>
                  </tr>
                </thead>
                  <tbody>
                  <!-- LOT별 조회일 때 -->
                  <template v-if="searchType === 'lot'">
                    <tr v-for="(info, index) in wareList" :key="'lot_' + index">
                      <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.warehouse_name }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.mate_lot }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.mate_name }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.mate_amount }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.inbound_date }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.employee_name }}</td>
                    </tr>
                  </template>
                  <!-- 자재별 묶음 조회일 때 -->
                  <template v-else>
                    <tr v-for="(info, index) in wareList" :key="'group_' + index">
                      <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.mate_name }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.mate_amount }}</td>
                      <td class="align-middle font-weight-bolder text-center">{{ formatDate(info.last_inbound_date) }}
                      </td>
                      <td class="align-middle font-weight-bolder text-center">{{ info.lot_count }}</td>
                    </tr>
                  </template>
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
import axios from 'axios'
// stores 
import { useUserStore } from "@/stores/user";
// state, getter => mapState 
// actions => mapActions 
import { mapState } from 'pinia';


export default {

  data() {
    return {
      wareList: null,
      searchType: 'lot', // 기본조회방식
      wareId: [],
      selectedWarehouse: '',
    };
  },
  created() {
    this.wareSearch();
    this.wareById();
  },

  computed: {
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
  },
  methods: {
    async wareSearch() {
      try {
        this.wareList = null;

        const params = {
          type: this.searchType,
          warehouse_id: this.selectedWarehouse
        };

        let ajaxRes = await axios.get('/api/warehouseList', { params });
        this.wareList = ajaxRes.data;
      } catch (err) {
        console.error('창고현황 조회 실패:', err);
      }
    },
    // 드롭다운에 warehouse_id 넣기
    async wareById() {
      let ajaxRes = await axios.get(`/api/warehouse/1h`)
        .catch(err => console.log(err));
      this.wareId = ajaxRes.data;
      // console.log('wareId------------------------',this.wareId);  // created()안에 쓰인거니까 this를 써야 됨.. 
    },


    formatDate(dateString) {
      const date = new Date(dateString); // 입력된 날짜를 Date 객체로 변환
      return date.toLocaleDateString('ko-KR'); // 'ko-KR'은 한국 날짜 형식으로 변환
    }
  }
}

</script>