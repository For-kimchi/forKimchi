<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->
    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="search">조회</button>
        <button class="btn btn-info ms-2" @click="resetForm">등록</button>
      </div>
    </div>

    <div class="card p-3 mb-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
          <h6 class="text-white text-capitalize ps-3">주문조회</h6>
        </div>
      </div>
      <div class="row g-3 mt-3">
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">거래처명</label>
            <input v-model="searchName" type="text" class="form-control border text-center" placeholder="제품명" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">주문상태</label>
            <select v-model="searchType" class="form-select text-center">
              <option value="">전체</option>
              <option v-for="code in codes" :key="code.sub_code" :value="code.sub_code">
                {{ code.sub_code_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">시작일자</label>
            <input v-model="searchStartDate" type="Date" class="form-control border text-center" placeholder="" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">종료일자</label>
            <input v-model="searchStartDate" type="Date" class="form-control border text-center" placeholder="" />
          </div>
        </div>
      </div>
    </div>

    
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산계획</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><input type="checkbox"></th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산계획ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">거래처</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">담당자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">계획등록일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">납품예정일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">최종계획상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodlist" v-bind:key="info.plan_id" v-on:click="proddtList(info.order_id)">
                    <td class="align-middle text-center"><input type="checkbox"></td>
                    <td class="align-middle text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{ info.plan_id}}</td>
                    <td class="align-middle text-center">{{ info.order_id}}</td>
                    <td class="align-middle text-center">{{ info.vendor_id }}</td>
                    <td class="align-middle text-center">{{ info.employee_id }}</td>
                    <td class="align-middle text-center">{{ info.reg_date }}</td>
                    <td class="align-middle text-center">{{ info.deliv_due_date }}</td>
                    <td class="align-middle text-center"><span class="badge badge-sm bg-gradient-info">{{ info.order_status }}</span></td>
                    <td class="align-middle text-center"><span class="badge badge-sm bg-gradient-success">{{ info.plan_final_status }}</span></td>
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
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">생산계획상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="text-end pe-3 ">
              <button class="btn btn-success" v-on:click="addRow">추가</button>
              <button class="btn btn-info ms-2 me-2">저장</button>
            </div>
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><input type="checkbox"></th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상세ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">제품명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">주문수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">상세계획상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">시작일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">종료일자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in proddtlist" v-bind:key="order_detail_id">
                    <td class="align-middle text-center"><input type="checkbox"></td>
                    <td class="align-middle text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center"><input type="text" v-model="info.order_detail_id"></td>
                    <td class="align-middle text-center">{{ info.prod_id }}</td>
                    <td class="align-middle text-center">{{ info.order_amount }}</td>
                    <td class="align-middle text-center">{{ info.plan_amount }}</td>
                    <td class="align-middle text-center"><span class="badge badge-sm bg-gradient-success">{{ info.plan_status }}</span></td>
                    <td class="align-middle text-center">{{ info.plan_start_date }}</td>
                    <td class="align-middle text-center">{{ info.plan_end_date }}</td>
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
import axios from 'axios'

export default {
    name: "Prodplan",
    data(){
      return {
        // plandtList : [
        //   { no : '',
        //     planId : '',
        //     orderId : '',
        //     planStatus :'',
        //     detailList : [{}, {}],
        //   }
        // ],
        selectedDetail : [],
        prodlist : [],
        proddtlist : []
      }
    },
    created(){
      this.prodList();
      // this.proddtList(orderId);
    },
    // 생산계획 조회
    methods : {
      async prodList(){
        let ajaxRes =
        await axios.get(`/api/prodlist`)
                  .catch(err => console.log(err));
                  this.prodlist = ajaxRes.data;
      },
      // 생산계획 상세 조회
      async proddtList(orderid){
        let  ajaxRes =
        await axios.get(`/api/proddtlist/${orderid}`)
                   .catch(err => console.log(err));
        this.proddtlist = ajaxRes.data;
      },
      addRow(){
        this.proddtlist.push({});
      }
    }
    
}

</script>