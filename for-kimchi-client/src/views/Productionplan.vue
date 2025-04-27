<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->
     <div class="text-end">
        <button class="btn btn-success">조회</button>
        <button class="btn btn-danger">삭제</button>
        <button class="btn btn-info">저장</button>
     </div>
    <div class="row">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">주문서</h6>
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
            </ul>
            </div>
        </div>
    </div>
    <div class="row">
        <!-- 행 영역 div-->
      <div class="col-8">
        <!-- 테이블 div-->
        <div class="card my-4">
            <!--항목명 div-->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">주문서</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                       NO
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      제품코드
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      제품명
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      납품예정일
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        주문수량
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="align-middle text-center">
                        1번인데
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">어디꺼</p>
                      <p class="text-xs text-secondary mb-0">제품코드</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      포기김치10kg
                    </td>
                    <td class="align-middle text-center">
                      23/04/18
                    </td>
                    <td class="align-middle text-center">
                        수량
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- 저장 수정 공간-->
      <div class="col-4">
            <div class="card my-4">
                <!--상단-->
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">입력</h6>
                    </div>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">제품명<p><input type="text"></p></li>
                    <li class="list-group-item">생산수량<p><input type="text"></p></li>
                    <li class="list-group-item">일정<p><input type="date"> ~ <input type="date"></p></li>
                </ul>
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
              <h6 class="text-white text-capitalize ps-3">생산계획</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table
                class="table align-items-center justify-content-center mb-0"
              >
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><input type="checkbox"></th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">NO</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산계획코드</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">제품명</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">시작일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">종료일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">생산수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">담당자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">승인자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">계획상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="align-middle text-center"><input type="checkbox"></td>
                    <td class="align-middle text-center">1</td>
                    <td class="align-middle text-center">AAAA01</td>
                    <td class="align-middle text-center">포기김치10kg</td>
                    <td class="align-middle text-center">23/04/18</td>
                    <td class="align-middle text-center">23/04/18</td>
                    <td class="align-middle text-center">2000</td>
                    <td class="align-middle text-center">김어진</td>
                    <td class="align-middle text-center">김민식</td>
                    <td class="align-middle text-center"><span class="badge badge-sm bg-gradient-success">계획 승인</span></td>
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
    name: "Production plan",
    
}

</script>