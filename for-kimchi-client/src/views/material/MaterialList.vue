<template>
    <div class="text-end">
            <button class="btn btn-success">조회</button>
            <button class="btn btn-danger">신규</button>
            <button class="btn btn-info">수정</button>
    </div> 
    <!-- 자재발주조회 -->
    <div class="row">
  <div class="card my-4">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
        <h6 class="text-white text-capitalize ps-3">검색</h6>
      </div>
    </div>

    <!-- card-body를 제대로 닫아줌 -->
    <div class="card-body">
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item">회사</li>
        <li class="list-group-item"><input type="text"></li>
        <li class="list-group-item">등록일</li>
        <li class="list-group-item"><input type="date"> ~ <input type="date"></li>
        <li class="list-group-item">발주번호</li>
        <li class="list-group-item"><input type="text"></li>
      </ul>

      <!-- 두 번째 list 그룹 -->
      <ul class="list-group list-group-horizontal flex-wrap mt-3">
        <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">품목</li>
        <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
          <input type="text" class="form-control me-2" style="border: 1px solid #ccc; box-sizing: border-box;">
          <i class="fas fa-search" style="font-size: 20px; cursor: pointer;"></i>
        </li>

        <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">거래처</li>
        <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
          <input type="text" class="form-control me-2" style="border: 1px solid #ccc; box-sizing: border-box;">
          <i class="fas fa-search" style="font-size: 20px; cursor: pointer;"></i>
        </li>
      </ul>
    </div> <!-- card-body 끝 -->
  </div>
</div>

    <!-- 자재발주조회리스트 -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>선택</th>
                      <th>발주일자</th>
                      <th>발주번호</th>
                      <th>거래처</th>
                      <th>사용자명</th>
                      <th>품목수</th>
                      <th>발주서</th>
                      <th>비고</th>
                      <th>승인일자</th>
                      <th>승인자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="count > 0">
                      <tr v-for="(info, index) in customerList" v-bind:key="info.id">
                        <td>{{ index + 1 }}</td>
                        <td><MaterialCheckbox></MaterialCheckbox></td>
                        <td>{{ info.equip_id }}</td>
                        <td>{{ info.equip_name }}</td>
                        <td>{{ info.equip_type }}</td>
                      </tr>
                    </template>
                    <tr v-else>
                      <td colspan="4">현재 데이터가 존재하지 않습니다</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 자재발주 상세조회 -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>품목코드</th>
                      <th>품목명</th>
                      <th>납품예정일</th>
                      <th>창고</th>
                      <th>수량</th>
                      <th>단위</th>
                      <th>검사여부</th>
                      <th>비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="count > 0">
                      <tr v-for="(info, index) in customerList" v-bind:key="info.id">
                        <td>{{ index + 1 }}</td>
                        <td><MaterialCheckbox></MaterialCheckbox></td>
                        <td>{{ info.equip_id }}</td>
                        <td>{{ info.equip_name }}</td>
                        <td>{{ info.equip_type }}</td>
                      </tr>
                    </template>
                    <tr v-else>
                      <td colspan="4">현재 데이터가 존재하지 않습니다</td>
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
    import MaterialCheckbox from '../../components/MaterialCheckbox.vue';
    
    export default {
        name: "Material Management",
        components: {
          MaterialCheckbox,
        }
    }
    
    </script>