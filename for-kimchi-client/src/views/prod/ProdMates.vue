<template>
    <div class="container-fluid py-4">
    <nav class="text-center">
      <router-link to="/ProdOrder"><button class="btn btn-info ms-1 me-1">생산지시</button></router-link>
      <router-link to="/ProdOrderInfo"><button class="btn btn-info ms-2 me-2">생산지시등록</button></router-link>
      <button class="btn btn-primary ms-2 me-2">선출창고관리</button>
    </nav>
    <!-- 검색
     <div class="text-end">
        <button class="btn btn-success ms-2 me-2">조회</button>
     </div> -->
    <div class="row">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">검색</h6>
                </div>
            </div>
            <div>
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item">제품코드</li>
                <li class="list-group-item"><input type="text"></li>
                <li class="list-group-item">제품명</li>
                <li class="list-group-item"><input type="text"></li>
                <li class="list-group-item">일정</li>
                <li class="list-group-item"><input type="date"> ~ <input type="date"></li>
                <button class="btn btn-success ms-2 me-2">조회</button>
            </ul>
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
              <h6 class="text-white text-capitalize ps-3">창고내역</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">순번</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산계획ID</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">거래처</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">담당자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">승인자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">계획등록일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">주문상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">최종계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info,index) in prodlist" v-bind:key="info.plan_id" v-on:click="proddtList(info.plan_id)">
                    <td class="align-middle font-weight-bolder text-center">{{ index + 1 }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.plan_id}}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.vendor_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.employee_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.manager_id }}</td>
                    <td class="align-middle font-weight-bolder text-center">{{ info.reg_date }}</td>
                    <td class="align-middle font-weight-bolder text-center"><span class="badge badge-sm bg-gradient-success">{{ info.plan_final_status }}</span></td>
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
      <div class="col-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">공정</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">erer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                    <td class="align-middle font-weight-bolder text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">BOM</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">erer</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">erer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="align-middle text-center"></td>
                    <td class="align-middle text-center"></td>
                    <td class="align-middle text-center"></td>
                    <td class="align-middle text-center"></td>
                    <td class="align-middle text-center"></td>
                    <td class="align-middle text-center"></td>
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

        }
    }
}
    
</script>