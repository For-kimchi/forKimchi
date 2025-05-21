<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">자재검사결과</h6>
            </div>
          </div>
          <div class="row g-2 my-3 px-3">
            <div class="col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0 " style="width: 100px;">자재명</label>
                <input v-model="searchName" type="text" class="form-control border text-center" placeholder="자재명 : 엔터"
                  @keyup.enter="searchMateName(searchName)" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0 " style="width: 100px;">시작일자</label>
                <input v-model="searchStartDate" type="date" class="form-control border text-center" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0 " style="width: 100px;">종료일자</label>
                <input v-model="searchEndDate" type="date" class="form-control border text-center" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="mb-3 d-flex align-items-center">
                <button class="btn btn-success" @click="getMateDate">조회</button>
                <button class="btn btn-secondary ms-2" @click="resetSearch">초기화</button>
              </div>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 250px; overflow-y: auto;">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재입고ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재입고상세ID
                    </th>
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사ID</th> -->
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">자재명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사날짜
                    </th>
                    <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">양품수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">불량수량</th> -->
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사결과
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateQualityViewall" :key="info.quality_id"
                    v-on:click="mateQualityViewDetail(index)" :class="selectedIndex === index ? 'table-active' : ''">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{info.inbound_id}}</td>
                    <td class="align-middle text-center">{{info.inbound_detail_id}}</td>
                    <!-- <td class="align-middle text-center">{{ info.quality_id }}</td> -->
                    <td class="align-middle text-center">{{ info.mate_id }}</td>
                    <td class="align-middle text-center">{{ info.mate_name }}</td>
                    <td class="align-middle text-center">{{ formatDate(info.quality_date) }}</td>
                    <!-- <td class="align-middle text-center">{{ info.quality_amount }}</td>
                    <td class="align-middle text-center">{{ info.quality_pass_amount }}</td>
                    <td class="align-middle text-center">{{ info.quality_fail_amount }}</td> -->
                    <td class="align-middle text-center">
                      <span v-if="info.final_result === '최종합격'" class="badge badge-sm bg-gradient-info px-0"
                        style="width: 70px; text-align: center;">
                        {{ info.final_result }}
                      </span>
                      <span v-else class="badge badge-sm bg-gradient-danger px-0"
                        style="width: 70px; text-align: center;">
                        {{ info.final_result }}
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
    <div class="text-end pe-3 ">
      <button class="btn btn-info ms-2 me-2" @click="downloadPdf">
        품질성적서 다운로드
      </button>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">자재검사상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 250px; overflow-y: scroll;">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사번호
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">기준치</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사결과
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateQualityViewdetail" v-bind:key="info.option_id"
                    style="cursor: pointer;">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{ info.option_id }}</td>
                    <td class="align-middle text-center">{{ info.option_name }}</td>
                    <td class="align-middle text-center">{{ info.option_standard }} {{ info.option_operator }}</td>
                    <td class="align-middle text-center">{{ info.quality_result_value }}</td>
                    <td class="align-middle text-center">
                      <span v-if="info.result === '합격'" class="badge badge-sm bg-gradient-info"
                        style="width: 70px; text-align: center;">
                        {{ info.result }}
                      </span>
                      <span v-else class="badge badge-sm bg-gradient-danger" style="width: 70px; text-align: center;">
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
  import {
    formatDate,
    formatDateAfter,
    codeToName
  } from '@/utils/common';

  export default {
    data() {
      return {

        // mateQualityViewDropdown: [],
        mateQualityViewall: [],
        mateQualityViewdetail: [],
        searchName: '',
        selectedIndex: null,
        searchStartDate: formatDate(),
        searchEndDate: formatDateAfter(null, 1),

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
      this.mateQualityViewAll();
    },
    methods: {
      async getMateDate() {
        const params = {};
        if (this.searchStartDate) params.startDate = this.searchStartDate;
        
        if (this.searchEndDate){
          const endDate = new Date(this.searchEndDate);
          endDate.setDate(endDate.getDate() + 1);
          const adjustedEndDate = endDate.toISOString().split('T')[0];
          params.endDate = adjustedEndDate;
        }
        let result =
          await axios.get(`/api/getMateDate`, {
            params
          })
          .catch(err => console.log(err));
        this.mateQualityViewall = result.data;
      },
      formatDate(dateString) {
        return formatDate(dateString);
      },
      formatDateAfter(dateString, after) {
        return formatDate(dateString, after);
      },
      async downloadPdf() {
        if (this.mateQualityViewdetail.length === 0) {
          this.$swal({
            text: "다운로드 실패 - 검사결과를 클릭하세요!",
            icon: "warning"
          });
          return;
        }

        this.$swal({
          text: "다운로드 성공",
          icon: "success"
        });

        try {
          const response = await axios.get('/templates/quality_report_mate.html');
          let templateHtml = response.data;

          // tableRows 문자열 생성
          const tableRows = this.mateQualityViewdetail.map(info => {
            return `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${info.option_id}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${info.option_name}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${info.option_standard} ${info.option_operator}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${info.quality_result_value}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                  ${info.result === '합격'
                    ? '<span style="color: green;">합격</span>'
                    : '<span style="color: red;">불합격</span>'}
                </td>
              </tr>
            `;
          }).join('');

          const allPassed = this.mateQualityViewdetail.every(info => info.result === '합격');
          const finalResult = allPassed ?
            '<span style="color: green;">최종합격</span>' :
            '<span style="color: red;">최종불합격</span>';

          templateHtml = templateHtml
            .replace('{{ mate_name }}', this.mateQualityViewall[this.selectedIndex] ?.mate_name || 'N/A')
            .replace('{{ mate_id }}', this.mateQualityViewall[this.selectedIndex] ?.mate_id || 'N/A')
            .replace('{{ quality_id }}', this.mateQualityViewall[this.selectedIndex] ?.quality_id || 'N/A')
            .replace('{{ final_result }}', finalResult)
            .replace('{{ table_rows }}', tableRows);

          const tempElement = document.createElement('div');
          tempElement.innerHTML = templateHtml;
          document.body.appendChild(tempElement);

          const opt = {
            margin: 0.3,
            filename: `품질성적서_${new Date().toISOString().slice(0, 10)}.pdf`,
            image: {
              type: 'jpeg',
              quality: 0.98
            },
            html2canvas: {
              scale: 2
            },
            jsPDF: {
              unit: 'in',
              format: 'a4',
              orientation: 'portrait'
            }
          };

          await html2pdf().set(opt).from(tempElement).save();
          document.body.removeChild(tempElement);

        } catch (err) {
          console.error("PDF 다운로드 실패:", err);
          this.$swal({
            text: "PDF 생성 중 오류가 발생했습니다.",
            icon: "error"
          });
        }
      },
      async mateQualityViewDropDown() {
        let ajaxRes =
          await axios.get(`/api/mateQualityViewDropDown`)
          .catch(err => console.log(err));
        this.mateQualityViewDropdown = ajaxRes.data;
      },

      async searchMateName(sId) {
        if (!sId) {
          this.mateQualityViewAll();
          return;
        }
        let ajaxRes = await axios.get(`/api/selectMateName/${sId}`)
          .catch(err => console.log(err));
        this.mateQualityViewall = ajaxRes.data;
      },
      async mateQualityViewAll() {
        let ajaxRes =
          await axios.get(`/api/mateQualityViewAll`)
          .catch(err => console.log(err));
        this.mateQualityViewall = ajaxRes.data;
      },
      async mateQualityViewDetail(idx) {
        this.selectedIndex = idx;
        let detailId = this.mateQualityViewall[idx].quality_id;
        let ajaxRes =
          await axios.get(`api/mateQualityViewDetail/${detailId}`)
          .catch(err => console.log(err));
        this.mateQualityViewdetail = ajaxRes.data;
      },
      resetSearch() {
        this.searchName = '';
        this.searchStartDate = formatDate();
        this.searchEndDate = formatDateAfter(null, 1);
        this.mateQualityViewAll();
      }
    }
  }
</script>