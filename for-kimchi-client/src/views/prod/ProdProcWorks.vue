<template>

    <div class="container-fluid py-4">
        <div class="row">
        <!-- 행 영역 div-->
      <div class="col-12">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">검색</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            
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
          <div class="card-body px-0 pb-2" style="height: 500px; overflow: auto;">
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
                  <tr>
                    <td class="align-middle font-weight-bolder text-center">ㅎㅎ</td>
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
                <h6 class="text-white text-capitalize ps-3">생산지시</h6>
                </div>
            </div>
            <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0 table-hover">
                    <thead>
                    <tr>
                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-10"></th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="align-middle font-weight-bolder text-center"></td>
                        
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
    
    export default {
        name: "ProdprocWork",
        data(){
            return{
                prodList: [],
            }
        },
        
    }
    
    </script>