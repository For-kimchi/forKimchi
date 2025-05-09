<template>
    <div class="container-fluid py-4">
    <nav class="text-center">
        <button class="btn btn-primary ms-2 me-2">생산지시등록</button>
        <router-link to="/"><button class="btn btn-info ms-2 me-2">자재관리</button></router-link>
    </nav>
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-8">
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
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시LOT</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">제품ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시담당자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td class="align-middle font-weight-bolder text-center">{{prodProdProcessInfo.prod_order_lot}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{prodProdProcessInfo.prod_id}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{prodProdProcessInfo.order_date}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{prodProdProcessInfo.order_amount}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{prodProdProcessInfo.employee_id}}</td>
                      <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{prodProdProcessInfo.order_status}}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
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
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정명</th>
                      <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">공정분류</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr>
                      <td colspan="8" rowspan="8" class="align-middle text-center ">생산계획을 선택해주세요</td>
                    </tr> -->
                    <tr v-for="(info,index) in procFlow">
                      <td class="align-middle font-weight-bolder text-center">{{info.proc_seq}}</td>
                      <td class="align-middle font-weight-bolder text-center">{{info.proc_name}}</td>
                      <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{info.proc_type}}</span></td>
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
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

    <!-- 하단 영역-->
    <div class="row">
        <div class="col-12">
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
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시LOT</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">제품ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시일자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시수량</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시담당자</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10">생산지시상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in d" @click="">
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{}}</span></td>
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
    name: "Prodorder",
    data(){
        return{
            prodProdProcessLists: [],
            prodProdProcessInfo:[],
            procFlow: [],
        }
    },
    created(){
        this.prodProdProcessList();
    },
    methods:{
     async prodProdProcessList(){
        let ajaxRes =
        await axios.get(`/api/prodProcess`)
                    .catch(err => console.log(err));
        this.prodProdProcessLists = ajaxRes.data;
     },
     async prodOrder(index){
        this.prodProdProcessInfo = this.prodProdProcessLists[index];
        let prodId = this.prodProdProcessInfo.prod_id;
        let ajaxRes =
        await axios.get(`/api/prodProcFlow/${prodId}`)
                    .catch(err => console.log(err));
        this.procFlow = ajaxRes.data;
      },
    }
}
    
</script>