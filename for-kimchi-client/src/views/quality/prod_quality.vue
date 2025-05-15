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
                <label class="form-label me-2 mb-0 " style="width: 100px;">제품명</label>
                <input v-model="searchName" type="text" class="form-control border text-center" placeholder="제품명" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0 " style="width: 100px;">제품ID</label>
                <input v-model="searchId" type="text" class="form-control border text-center" placeholder="제품ID" />
              </div>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산공정ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">제품명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">제품ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">양품수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">불량수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사결과</th>
                  </tr>
                </thead>
                <tbody>
                     <tr v-for="(info, index) in prodQualityViewall" :key="info.quality_id" v-on:click="prodQualityViewDetail(info.quality_id)" style="cursor: pointer;">
                        <td class="align-middle text-center">{{ info.prod_proc_id }}</td>
                        <td class="align-middle text-center">{{ info.quality_id }}</td>
                        <td class="align-middle text-center">{{ info.prod_name }}</td>
                        <td class="align-middle text-center">{{ info.prod_id }}</td>
                        <td class="align-middle text-center">{{ info.quality_amount }}</td>
                        <td class="align-middle text-center">{{ info.quality_pass_amount }}</td>
                        <td class="align-middle text-center">{{ info.quality_fail_amount }}</td>
                        <td class="align-middle text-center">
                          <span v-if="info.final_result === '최종합격'" class="badge badge-sm bg-gradient-info" style="width: 70px; text-align: center;">
                            {{ info.final_result }}
                          </span>
                          <span v-else class="badge badge-sm bg-gradient-danger" style="width: 70px; text-align: center;">
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
            <div class="table-responsive p-0" style="max-height: 400px; overflow-y: auto;">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사번호</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">기준치</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">검사결과</th>
                  </tr>
                </thead>
                <tbody>
                      <tr v-for="(info, index) in prodQualityViewdetail" v-bind:key="info.id" style="cursor: pointer;">
                        <td class="align-middle text-center">{{ info.option_id }}</td>
                        <td class="align-middle text-center">{{ info.option_name }}</td>
                        <td class="align-middle text-center">{{ info.option_standard }}</td>
                        <td class="align-middle text-center">{{ info.quality_result_value }}</td>
                        <td class="align-middle text-center">
                          <span v-if="info.result === '합격'" class="badge badge-sm bg-gradient-info" style="width: 70px; text-align: center;">
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
  import { useUserStore } from "@/stores/user"; 
  // state, getter => mapState 
  // actions => mapActions 
  import { mapState } from 'pinia';

  export default {
    data() {
      return {
        prodQualityViewDropdown :[],
        prodQualityViewall :[],
        prodQualityViewdetail :[],
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
      this.prodQualityViewDropDown();
      this.prodQualityViewAll();
    },
    computed: {

    },
    methods: {

          // pdf
      async downloadPdf() {
      try {
        // 템플릿 파일을 가져옴
        const response = await axios.get('/templates/quality_report_prod.html');
        let templateHtml = response.data;

        // 동적으로 데이터를 템플릿에 삽입
        const tableRows = this.prodQualityViewdetail.map(info => `
          <tr>
            <td>${info.option_id}</td>
            <td>${info.option_name}</td>
            <td>${info.option_standard}</td>
            <td>${info.quality_result_value}</td>
            <td>${info.result === '합격' ? '<span style="color: green;">합격</span>' : '<span style="color: red;">불합격</span>'}</td>
          </tr>
        `).join('');

        const allPassed = this.prodQualityViewdetail.every(info => info.result === '합격');
        const finalResult = allPassed ? '최종합격' : '최종불합격';

        templateHtml = templateHtml
          .replace('{{ prod_name }}', this.prodQualityViewall[0]?.prod_name || 'N/A')
          .replace('{{ prod_id }}', this.prodQualityViewall[0]?.prod_id || 'N/A')
          .replace('{{ quality_id }}', this.prodQualityViewall[0]?.quality_id || 'N/A')
          .replace('{{ date }}', new Date().toLocaleDateString())
          .replace('{{ table_rows }}', tableRows)
          .replace('{{ final_result }}', finalResult || 'N/A');

        // 임시 DOM에 HTML 추가
        const tempElement = document.createElement('div');
        tempElement.innerHTML = templateHtml;
        document.body.appendChild(tempElement);

        // PDF로 변환
        const opt = {
          margin: 0.3,
          filename: `품질성적서_${new Date().toISOString().slice(0, 10)}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // PDF 다운로드
        await html2pdf().set(opt).from(tempElement).save();

        // 변환 후 임시 DOM 제거
        document.body.removeChild(tempElement);
      } catch (err) {
        console.error("PDF 다운로드 실패:", err);
      }
    },

      async prodQualityViewDropDown() {
        let ajaxRes =
        await axios.get(`/api/prodQualityViewDropDown`)
                   .catch(err => console.log(err));
                   this.prodQualityViewDropdown = ajaxRes.data;
      },
      async prodQualityViewAll(){
        let ajaxRes = 
        await axios.get(`/api/prodQualityViewAll`)
                   .catch(err => console.log(err));
                   this.prodQualityViewall = ajaxRes.data;
      },
      async prodQualityViewDetail(detailId){
        let ajaxRes =
        await axios.get(`api/prodQualityViewDetail/${detailId}`)
                   .catch(err => console.log(err));
        this.prodQualityViewdetail = ajaxRes.data;
      },
      addRow() {
        this.prodQualityViewdetail.push({});
      }
    }
  }
</script>