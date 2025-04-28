<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"></link>
<template>
    <div class="text-end">
            <button class="btn btn-success">조회</button>
            <button class="btn btn-danger">신규</button>
            <button class="btn btn-info">수정</button>
            <button class="btn btn-warning">입고마감</button>
    </div> 
    <!-- 자재발주조회 -->
    <!-- 검색 영역 -->
<!-- 검색 영역 -->
<div class="card my-4">
  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
    <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
      <h6 class="text-white text-capitalize ps-3">검색</h6>
    </div>
  </div>
  <div class="card-body">
    <ul class="list-group list-group-horizontal flex-wrap">
      <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">회사</li>
      <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">
        <input type="text" class="form-control" style="border: 1px solid #ccc; box-sizing: border-box;">
      </li>

      <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">등록일</li>
      <li class="list-group-item me-3 d-flex align-items-center" style="border-left: 1px solid #ccc;">
        <input type="date" class="form-control me-1" style="width: 150px; border: 1px solid #ccc; box-sizing: border-box;"> ~
        <input type="date" class="form-control ms-1" style="width: 150px; border: 1px solid #ccc; box-sizing: border-box;">
      </li>

      <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">입고번호</li>
      <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">
        <input type="text" class="form-control" style="border: 1px solid #ccc; box-sizing: border-box;">
      </li>

      <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">진행상태</li>
      <li class="list-group-item me-3" style="border-left: 1px solid #ccc;">
        <select class="form-select" style="border: 1px solid #ccc; box-sizing: border-box;">
          <option value="">전체</option>
          <option value="진행중">진행중</option>
          <option value="완료">완료</option>
          <option value="취소">취소</option>
        </select>
      </li>
    </ul>

    <!-- 품목, 거래처 따로 아래 줄 -->
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

export default {
    name: "StoreList",
    
}

</script>