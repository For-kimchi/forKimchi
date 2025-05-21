<template>
  <div class="container-fluid py-4">
    <nav class="text-center">
      <router-link to="/prodProcWork"><button class="btn btn-info ms-2 me-2">생산공정</button></router-link>
      <button class="btn btn-primary ms-1 me-1">생산지시</button>
    </nav>
    <div class="row">
      <div class="col-12">
        <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="selectProdPlan">조회</button>
        <button class="btn btn-secondary ms-2" @click="resetForm()">초기화</button>
      </div>
    </div>
        
    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">제품조회</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">
        <div class="col-md-4">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 text-center" style="width: 100px;">거래처</label>
            <input v-model="vendor_id" type="text" @keyup.enter="selectProdPlan" class="form-control border text-center" placeholder="거래처" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 text-center" style="width: 180px;">날짜</label>
            <input v-model="start_date" type="date" @keyup.enter="selectProdPlan" class="form-control border text-center"/> ~ <input v-model="end_date" type="date" class="form-control border text-center"/>
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 text-center" style="width: 100px;">담당자</label>
            <input v-model="employee_id" type="text" @keyup.enter="selectProdPlan" class="form-control border text-center" placeholder="담당자" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 text-center" style="width: 100px;">승인자</label>
            <input v-model="manager_id" type="text" @keyup.enter="selectProdPlan" class="form-control border text-center" placeholder="승인자" />
          </div>
        </div>
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
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산계획</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2" style="height: 400px; overflow: auto;">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산계획ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">거래처</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">담당자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">승인자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">계획등록일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">최종계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodPlanlList" v-bind:key="info.plan_id" :class="this.idx === index ? 'table-active' : ''"
                   v-on:click="addProdPlanDetailList(index)">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.plan_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.manager_name }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.reg_date }}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_final_status === '계획승인'"><span class="badge badge-sm bg-gradient-info">{{ info.plan_final_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.plan_final_status === '계획등록'"><span class="badge badge-sm bg-gradient-warning">{{ info.plan_final_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-success">{{ info.plan_final_status }}</span></td>
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
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산계획상세</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">제품명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">주문수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산필요수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">추가생산수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">납품예정일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">시작일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">종료일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodPlanDetailList" v-bind:key="info.plan_detail_id">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.plan_detail_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.prod_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.order_amount }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.order_amount - info.plan_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_amount - info.order_amount <= 0">0</td>
                    <td class="align-middle font-weight-bolder text-center" v-else>{{info.plan_amount - info.order_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.deliv_due_date }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.plan_start_date}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.plan_end_date }}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.plan_status === '상세계획승인'"><span class="badge badge-sm bg-gradient-info">{{ info.plan_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.plan_status === '상세계획등록'"><span class="badge badge-sm bg-gradient-warning">{{ info.plan_status }}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-success">{{ info.plan_status }}</span></td>
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
import { useUserStore } from "@/stores/user"; 
import { mapState } from 'pinia';
import {
    formatDate,
    codeToName,
    formatDateAfter
  } from '@/utils/common';
export default {
    name: "prodPlanWork",
    data(){
      return {
        prodPlanlList : [],
        prodPlanDetailList :[],
        idx: null,
        vendor_id: '',
        start_date: '',
        end_date: '',
        employee_id: '',
        manager_id: '',
      }
    },
    created(){
      this.selectProdPlan();
    },
    // 생산계획 조회
    methods : {
      async selectProdPlan(){
        const params = {};

        if (this.vendor_id) params.vendor_id = this.vendor_id;
        if (this.employee_id) params.employee_id = this.employee_id;
        if (this.manager_id) params.manager_id = this.manager_id;
        if (this.start_date) params.start_date = this.start_date;
        if (this.end_date) params.end_date = this.end_date;
        
        let ajaxRes =
        await axios.get(`/api/selectWorkplan`, {
          params
        })
                    .catch(err => console.log(err));
              this.prodPlanlList = ajaxRes.data;
        // let ajaxRes = await axios.get(`/api/selectWorkplan`)
        //             .catch(err => console.log(err));
        //       this.prodPlanlList = ajaxRes.data;
      },
      // 생산계획 상세 조회
      async addProdPlanDetailList(index){
        this.idx = index;
        let planId = this.prodPlanlList[index].plan_id;
        let  ajaxRes =
        await axios.get(`/api/selectWorkplanDetail/${planId}`)
                   .catch(err => console.log(err));
        this.prodPlanDetailList = ajaxRes.data
      },
      async resetForm(){
        this.vendor_id = '';
        this.employee_id = '';
        this.manager_id = '';
        this.start_date = '';
        this.end_date = '';

        await this.selectProdPlan();
      },
    }
}

</script>