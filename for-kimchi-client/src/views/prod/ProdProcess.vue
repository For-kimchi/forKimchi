<template>
    <div class="container-fluid py-4">
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
            <div class="card-body px-0 pb-2" >
                <div class="table-responsive p-0">
                    <div class="text-end">
                    <button class="btn btn-info ms-2 me-2" data-bs-toggle="modal" data-bs-target="#processModal">생산지시선택</button>
                    </div>
                <table class="table align-items-center mb-2 table-hover">
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10">생산지시LOT</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.prod_order_lot}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10">제품ID</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.prod_id}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10">생산지시일자</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.order_date}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10">생산지시수량</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.order_amount}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10">생산지시담당자</th>
                    <td class="align-middle font-weight-bolder text-left">{{prodProdProcessInfo.employee_id}}</td>
                  </tr>
                  <tr>
                    <th class="text-left text-uppercase text-secondary font-weight-bolder opacity-10">생산지시상태</th>
                    <td class="align-middle font-weight-bolder text-left"><span class="badge badge-sm bg-gradient-success">{{prodProdProcessInfo.order_status}}</span></td>
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
                    <!-- <tr>
                      <td colspan="8" rowspan="8" class="align-middle text-center ">생산계획을 선택해주세요</td>
                    </tr> -->
                    <tr v-for="(info,index) in procFlow"  @click="selectProc(index)">
                      <td class="align-middle font-weight-bolder text-center">{{info.proc_seq}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.proc_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.proc_name}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.count}}</td>
                      <td class="align-middle font-weight-bolder text-center" v-if="info.proc_seq == 1">{{prodProdProcessInfo.order_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center" v-else>{{procFlow[index - 1].sum_pass_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.sum_input_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.sum_fail_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.sum_pass_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{info.proc_type}}</span></td>
                      <td class="align-middle font-weight-bolder text-center" v-if="info.count == info.status && info.proc_type == '일반'"><span class="badge badge-sm bg-gradient-info">공정완료</span></td>
                      <td class="align-middle font-weight-bolder text-center" v-else-if="info.count == info.status && procFlow[index].proc_type == '품질검사대상'"><button class="btn btn-danger p-2 m-0">품질검사요청</button></td>
                      <td class="align-middle font-weight-bolder text-center" v-else><span class="badge badge-sm bg-gradient-info">공정대기</span></td>
                    </tr>
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
                <h1 class="modal-title fs-5" id="exampleModalLabel">생산지시</h1>
                
            </div>
            <div class="modal-body">
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
                    <!-- <tr>
                      <td colspan="8" rowspan="8" class="align-middle text-center ">생산계획을 선택해주세요</td>
                    </tr> -->
                    <tr v-for="(info,index) in prodProdProcessLists">
                      <td class="align-middle font-weight-bolder text-center"><button data-bs-dismiss="modal" class="btn btn-info"@click="prodOrder(index)">선택</button></td>
                      <td class="align-middle font-weight-bolder text-center">{{index + 1}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_order_lot}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.prod_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.order_date}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.employee_id}}</td>
                      <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{info.order_status}}</span></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div> -->
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
                  <div class=" text-end">
                    <button class="btn btn-success mx-2" @click="addList()" :disable="!isValue">공정생성</button>
                    <button class="btn btn-info mx-2" @click="addinsert(procFlowList)" :disable="!isValue">공정저장</button>
                  </div>
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
                    <td class="align-middle font-weight-bolder text-center" v-if="info.proc_input_amount >= 0">{{info.proc_input_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-else><input type="number" v-model="info.input_amount" style="width: 100px;"></td>
                    <td class="align-middle font-weight-bolder text-center">{{info.proc_fail_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{info.proc_pass_amount}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-if="info.proc_input_amount >= 0 && info.proc_start_date == null">
                      <input type="button" class="btn btn-info m-0" value="공정시작" @click="startTime(index)"></td>
                    <td class="align-middle font-weight-bolder text-center" v-else>{{info.proc_start_date}}</td>
                    
                    <td class="align-middle font-weight-bolder text-center" v-if="info.proc_input_amount >= 0 && info.proc_start_date == null">{{info.proc_end_date}}</td>
                    <td class="align-middle font-weight-bolder text-center" v-else-if="info.proc_input_amount >= 0 && info.proc_end_date == null">
                      <input type="button" class="btn btn-primary m-0" @click="inx(index)" value="공정종료" data-bs-toggle="modal" data-bs-target="#endTime"></td>
                      <td class="align-middle font-weight-bolder text-center" v-else>{{info.proc_end_date}}</td>
                    <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{info.proc_status}}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- Modal -->
<div class="modal fade" id="endTime" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">공정 종료</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">
          <li class="list-group-item list-group-item-info">불량수를 입력해주세요</li>
          <li class="list-group-item list-group-item-primary">불량량<input type="number" class="p-2 m-2" v-model="proc_fail_amount">
            <button type="button" class="btn btn-primary m-0" @click="endTime(proc_fail_amount)" data-bs-dismiss="modal">공정종료</button></li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
      </div>
    </div>
  </div>
</div>
</template>
    
<script>
// 해야할일 정리
// 공정이 완료되었다면 공정생성막기, 공정저장부분 투입량이 지시량보다 많아지면 저장 안되게 막기
// 모든 공정 종료 시 자재 홀딩 풀어야됨.
// 투입량부분 공정시작누를떄 입력 vs 추가 공정생성할떄 입력하기.(현재)
// 공정 삭제만드는거 생각해봐야함.

import axios from 'axios'

export default {
    name: "Prodorder",
    data(){
        return{
            prodProdProcessLists: [],
            prodProdProcessInfo:[],
            procFlow: [],
            procFlowList: [],
            // number= 공정흐름도 index
            number: '',
            input_amount: '',
            proc_fail_amount: '',
            proc_pass_amount: '',
            indexs: '',
            prodOrderidx: '',
            // 공정상태 확인
            procType: false,
        }
    },
    created(){
        this.prodProdProcessList();
    },
    computed:{
    },
    methods:{
     async prodProdProcessList(){
        let ajaxRes =
        await axios.get(`/api/prodProcess`)
                    .catch(err => console.log(err));
        this.prodProdProcessLists = ajaxRes.data;
     },
     // 생산지시선택 버튼
     async prodOrder(index){
        this.prodProdProcessInfo = this.prodProdProcessLists[index];
        // let prodId = this.prodProdProcessInfo.prod_id;
        let prodLot = this.prodProdProcessLists[index].prod_order_lot
        let ajaxRes =
        await axios.get(`/api/prodProcFlow/${prodLot}`)
                    .catch(err => console.log(err));
        this.procFlow = ajaxRes.data;
        // // count와 status의 값이 똑같다면 모든공정완료
        // if(procFlow.count == procFlow.status){
        //   this.procType = true;
        // }else{
        //   this.procType = false;
        // }
        this.procFlowList = [];
        this.prodOrderidx = index;

      },
      // 생산공정 조회
      async selectProc(index){
        let param = {lot: this.prodProdProcessInfo.prod_order_lot,
                     prodId: this.procFlow[index].proc_id};
        
        let ajaxRes =
        await axios.put(`/api/prodProcFlowInfo`, param)
                  .catch(err => console.log(err));
        this.procFlowList = ajaxRes.data;
        this.number = index;
      },
      // 공정생성버튼
      async addList(){
          this.procFlowList.push({prod_order_lot:this.prodProdProcessInfo.prod_order_lot,
                                  employee_id: this.prodProdProcessInfo.employee_id,
                                  proc_order_amount: this.prodProdProcessInfo.order_amount,
                                  proc_id: this.procFlow[this.number].proc_id});
      },
      // 공정저장버튼
      async addinsert(list){
        // 투입량 확인
        // if(input_amount){
        // console.log(this.list.input_amount);
        // }
        // 이미 저장된 데이터는 제거.(Object.hasOwn를 통해서 prod_order_lot가 객체안에 있다면 true 없으면 false)
        let param = list.filter(item =>{
          return Object.hasOwn(item, 'prod_order_lot');
        });
        console.log(param);
        let ajaxRes =
        await axios.post(`/api/insertProdProc`, param)
                    .catch(err => console.log(err));
        let result = ajaxRes.data.affectedRows;
        
        if(result > 0){
          alert('저장되었습니다.');
          await this.prodOrder(this.prodOrderidx);
          await this.selectProc(this.number);
        }else{
          alert('저장에 실패했습니다.');
          await this.prodOrder(this.prodOrderidx);
          await this.selectProc(this.number);
        }
      },
      // 공정시작
      async startTime(idx){
        let info = this.procFlowList[idx].prod_proc_id;
        let ajaxRes =
        await axios.put(`/api/updateStartTime/${info}`)
        .catch(err => console.log(err));
        let result = ajaxRes.data.affectedRows;
        alert('공정이 시작되었습니다.');
        await this.selectProc(this.number);
      },
      // 공정 종료 버튼
      async endTime(amount){
        let input_amount = this.procFlowList[this.indexs].proc_input_amount;
        // 불량량이 투입량보다 많으면 취소
        if(amount > input_amount){
          alert('투입량보다 많습니다.취소되었습니다');
        }else{
          let id = this.procFlowList[this.indexs].prod_proc_id;
          let pass_amount = input_amount - amount;
          let info = {proc_fail_amount: amount,
                      proc_pass_amount: pass_amount}
          let ajaxRes = 
          await axios.put(`/api/updateEndTime/${id}`, info)
                     .catch(err => console.log(err));
          let result = ajaxRes.data.affectedRows;
          await this.prodOrder(this.prodOrderidx);
          await this.selectProc(this.number);
          this.proc_fail_amount= '';
        }
      },
      async inx(idx){
        this.indexs = idx;
        console.log(this.indexs);
      }
    }
}
    
</script>