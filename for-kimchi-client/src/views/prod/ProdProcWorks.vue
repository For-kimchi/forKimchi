<template>
    <div class="container-fluid py-4">
      <nav class="text-center">
      <button class="btn btn-primary ms-1 me-1">생산공정</button>
      <router-link to="/prodPlanWork"><button class="btn btn-info ms-2 me-2">생산지시</button></router-link>
    </nav>
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-4">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">생산지시</h6>
                </div>
            </div>
            <div class="card-body px-0 pb-2 px-3">
                <div class="table-responsive p-0">
                    <div class="text-end">
                    <button class="btn btn-info ms-2 me-2 m-1 p-3" data-bs-toggle="modal" data-bs-target="#processModal">생산지시선택</button>
                    </div>
                <table class="table align-items-center mb-2 table-hover">
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10 px-3 py-2">생산지시LOT</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.prod_order_lot}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10 px-3 py-2">제품ID</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.prod_id}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10 px-3 py-2">생산지시일자</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.order_date}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10 px-3 py-2">생산지시수량</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.order_amount}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10 px-3 py-2">생산지시담당자</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.employee_id}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10 px-3 py-2">생산지시상태</th>
                    <td class="align-middle font-weight-bolder text-left" v-if="prodProdProcessInfo.order_status === '생산진행중'"><span class="badge badge-sm bg-gradient-warning ">{{prodProdProcessInfo.order_status}}</span></td>
                    <td class="align-middle font-weight-bolder text-left" v-else><span class="badge badge-sm bg-gradient-success">{{prodProdProcessInfo.order_status}}</span></td>
                  </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
          <!-- 테이블 div-->
          <div class="card my-4">
              <!--항목명 div-->
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                <h6 class="text-white text-capitalize ps-3">공정흐름도</h6>
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                  <thead>
                    <tr>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정순서</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정ID</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정명</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정수</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">지시량</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">투입량</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">불량량</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산량</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정분류</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="procFlow.length > 0">
                    <tr v-for="(info,index) in procFlow"  @click="selectProc(index)" :class="this.number === index ? 'table-active' : ''">
                      <td class="align-middle font-weight-bolder text-center">{{info.proc_seq}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.proc_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.proc_name}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.count}}</td>
                      <td class="align-middle font-weight-bolder text-center" v-if="info.proc_seq == 1">
                        <input type="text" class="text-center align-middle font-weight-bolder" style="background-color: white; border: 0; width: 50px;" v-model="order_amount" disabled></td>
                      <td class="align-middle font-weight-bolder text-center" v-else>{{procFlow[index - 1].sum_pass_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.sum_input_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.sum_fail_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.sum_pass_amount}}</td>

                      <td class="align-middle font-weight-bolder text-center"  v-if="info.proc_type == '품질검사대상'"><span class="badge badge-sm bg-gradient-primary">{{info.proc_type}}</span></td>
                      <td class="align-middle font-weight-bolder text-center"  v-else><span class="badge badge-sm bg-gradient-success">{{info.proc_type}}</span></td>

                      <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-primary" v-if="this.num < info.proc_seq">공정대기</span>
                      <span class="badge badge-sm bg-gradient-secondary" v-else-if="this.num > info.proc_seq">공정완료</span>
                      <span class="badge badge-sm bg-gradient-primary" v-else-if="this.num === info.proc_seq && this.type === '4e'">검사중</span>
                      <span class="badge badge-sm bg-gradient-primary" v-else-if="this.num === info.proc_seq && this.type === '5e'">공정중단</span>
                      <span class="badge badge-sm bg-gradient-secondary" v-else-if="this.num === info.proc_seq && this.type === '3e'">공정완료</span>
                      <span class="badge badge-sm bg-gradient-warning" v-else-if="this.num === info.proc_seq && this.type === '2e'">공정진행중</span>
                      <span class="badge badge-sm bg-gradient-warning" v-else-if="this.num === info.proc_seq && this.type === '1e'">공정진행중</span>
                      <span class="badge badge-sm bg-gradient-secondary" v-else>공정완료</span></td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="align-middle font-weight-bolder text-center" colspan="10" rowspan="3">지시를 선택하거나 공정흐름도를 저장해주세요.</td>
                    </tr>
                  </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!--모달-->
        <!-- Modal -->
        <div class="modal fade" id="processModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                  <div class="row">
                    <div class="col-12">
                      <div class="row mt-3">
                        <div class="col text-end">
                          <button class="btn btn-success" @click="prodProdProcessList">조회</button>
                          <!-- <button class="btn btn-secondary ms-2" @click="resetForm()">초기화</button> -->
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
                              <label class="form-label me-2 mb-0 text-center" style="width: 100px;">지시LOT</label>
                              <input v-model="order_lot" type="text" @keyup.enter="prodProdProcessList" class="form-control border text-center" placeholder="지시LOT" />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="d-flex align-items-center">
                              <label class="form-label me-2 mb-0 text-center" style="width: 180px;">생산일자</label>
                              <input v-model="start_date" type="date" @keyup.enter="prodProdProcessList" class="form-control border text-center"/> ~ <input v-model="end_date" type="date" class="form-control border text-center"/>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="d-flex align-items-center">
                              <label class="form-label me-2 mb-0 text-center" style="width: 100px;">담당자</label>
                              <input v-model="employee_id" type="text" @keyup.enter="prodProdProcessList" class="form-control border text-center" placeholder="담당자" />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="d-flex align-items-center">
                              <label class="form-label me-2 mb-0 text-center" style="width: 100px;">제품</label>
                              <input v-model="prod_id" type="text" @keyup.enter="prodProdProcessList" class="form-control border text-center" placeholder="제품" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            <div class="modal-body" style="height: 400px; overflow: auto;">
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                  <thead>
                    <tr>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">버튼</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시LOT</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산제품</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산수량</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산일자</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">담당자</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">상세지시상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(info,index) in prodProdProcessLists">
                      <td class="align-middle font-weight-bolder text-center"><button data-bs-dismiss="modal" class="btn btn-info"@click="prodOrder(index)">선택</button></td>
                      <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_order_lot}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_name}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_date}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.employee_name}}</td>
                      <td class="align-middle font-weight-bolder text-center" v-if="info.order_status === '생산진행중'"><span class="badge badge-sm bg-gradient-warning">{{info.order_status}}</span></td>
                      <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-success">{{info.order_status}}</span></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>

    <!-- 생산 공정 -->
    <div class="row">
        <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">생산공정</h6>
                </div>
            </div>
            <div class="card-body px-0 pb-2" >
                <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산공정ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정담당자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">투입량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">불량량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">시작시간</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">종료시간</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in procFlowList" v-bind:key="info.prod_proc_id">
                    <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.prod_proc_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.employee_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.proc_input_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.proc_fail_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.proc_pass_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.proc_start_date}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.proc_end_date}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.proc_status === '공정완료'"><span class="badge badge-sm bg-gradient-secondary">{{info.proc_status}}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.proc_status === '검사진행'"><span class="badge badge-sm bg-gradient-primary">{{info.proc_status}}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.proc_status === '공정진행'"><span class="badge badge-sm bg-gradient-warning">{{info.proc_status}}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.proc_status === '공정중단'"><span class="badge badge-sm bg-gradient-info">{{info.proc_status}}</span></td>
                    <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-success">{{info.proc_status}}</span></td>
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

export default {
    name: "Prodorder",
    data(){
        return{
            prodProdProcessLists: [],
            prodProdProcessInfo:[],
            procFlow: [],
            procFlowList: [],
            prod_id :'',
            vendor_id: '',
            start_date: '',
            end_date: '',
            employee_id: '',
            // number= 공정흐름도 index
            number: null,
            input_amount: 0,
            proc_fail_amount: 0,
            proc_pass_amount: 0,
            indexs: null,
            prodOrderidx: 0,
            // 공정상태 확인
            procType: false,
            amount: 0,
            order_amount: 0,
            pass_amount: 0,
            num: 0,
            type: null,
        }
    },
    created(){
        this.prodProdProcessList();
    },
    computed:{
      isValue(){
        return ;
      },
      ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
      // pass_amount(){
      //   return this.procFlow[index - 1].sum_pass_amount;
      // },
    },
    methods:{
      // 생산지시 리스트 prodProdProcessLists
     async prodProdProcessList(){
      const params = {};
        if (this.order_lot) params.order_lot = this.order_lot;
        if (this.employee_id) params.employee_id = this.employee_id;
        if (this.prod_id) params.prod_id = this.prod_id;
        if (this.start_date) params.start_date = this.start_date;
        if (this.end_date) params.end_date = this.end_date;
        
        let ajaxRes =
        await axios.get(`/api/prodProcessWork`, {
          params
        })
                    .catch(err => console.log(err));
        this.prodProdProcessLists = ajaxRes.data;
     },
     // 생산지시선택 버튼 procFlow
     async prodOrder(index){
        this.prodProdProcessInfo = this.prodProdProcessLists[index];
        // let prodId = this.prodProdProcessInfo.prod_id;
        let prodLot = this.prodProdProcessLists[index].prod_order_lot
        let ajaxRes =
        await axios.get(`/api/prodProcFlow/${prodLot}`)
                    .catch(err => console.log(err));
        this.procFlow = ajaxRes.data;
        this.num = this.procFlow[0].num;
        this.type = this.procFlow[0].type;
        // 버튼 클릭시 list 초기화
        this.procFlowList = [];
        // this.number = null;
        // index값 저장
        this.prodOrderidx = index;
        // 값 활용하기위해서 저장
        this.order_amount = this.prodProdProcessInfo.order_amount;
        // this.pass_amount;
      },
      // 생산공정 조회 procFlowList
      async selectProc(index){
        let param = {lot: this.prodProdProcessInfo.prod_order_lot,
                     prodId: this.procFlow[index].proc_id};
        
        let ajaxRes =
        await axios.put(`/api/prodProcFlowInfo`, param)
                  .catch(err => console.log(err));
        this.procFlowList = ajaxRes.data;
        // index값 저장
        this.number = index;
      },
    }
}
    
</script>