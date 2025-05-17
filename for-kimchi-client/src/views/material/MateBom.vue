<template>
  <div class="container-fluid">
    <!-- 상단 요약 영역 -->
    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-info shadow-info border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">발주 정보 요약</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">
        <div class="col-md-4">
          <label class="form-label">제품코드</label>
          <input  v-model="prod_order_lot" type="text" class="form-control border text-center" readonly />
        </div>
        <div class="col-md-4">
          <label class="form-label">제품명</label>
          <input v-model="prod_id" type="text" class="form-control border text-center" readonly />
        </div>
        <div class="col-md-4">
          <label class="form-label">생산지시수량</label>
          <input v-model="order_amount" type="text" class="form-control border text-center" readonly />
        </div>
      </div>
    </div>

    <!-- BOM 정보 테이블 -->
    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">BOM 기반 발주 자재 정보</h6>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive p-0" style="max-height: 500px;">
          <table class="table align-items-center justify-content-center mb-0">
            <thead>
              <tr>
                <th class="text-center">자재ID</th>
                <th class="text-center">자재명</th>
                <th class="text-center">자재수량 * 생산지시수량</th>
                <th class="text-center">자재단위</th>
                <!-- <th class="text-center">거래처</th>
                <th class="text-center">납기 예정일</th>
                <th class="text-center">발주일자</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info, index) in mateBomList" :key="index">
                <td class="text-center">{{ info.mate_id }}</td>
                <td class="text-center">{{ info.mate_name }}</td>
                <td class="text-center">{{ (info.mate_amount) * (info.order_amount) }}</td>
                <td class="text-center">{{ info.mate_unit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 저장 버튼 -->
    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-primary" @click="mateAdd">발주 저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
  return {
    mateBomList:[],
     prod_order_lot: '',  // 추가
    prod_id: '',         // 추가
    prod_name: '',       // 추가
    order_amount: 0,     // 추가
    mate_amount: 0,
    selectedList:[],
  };
},
created() {
const query = this.$route.query;
  this.prod_order_lot = query.prod_order_lot || '';
  this.prod_id = query.prod_id || '';
  this.prod_name = query.prod_name || '';
  this.order_amount = query.order_amount || '';
  this.mate_amount = query.mate_amount || '';


  if (this.prod_order_lot) {
    this.mateBom(this.prod_order_lot);
  }

const prod_order_lot = this.$route.query.prod_order_lot;


  if (prod_order_lot) {
    this.mateBom(prod_order_lot);
  }
},
methods: {
  async mateBom(prod_order_lot) {
    let ajaxRes = await axios
      .get(`/api/mateBom/${prod_order_lot}`)
      .catch(err => {
        console.log(err);
        return { data: [] }; // 실패 시 빈 배열 방지
      });

    this.mateBomList = ajaxRes.data;
  },
  // async mateBomAdd() {
  //   let ajaxRes = await axios.post(`/api/mateBom`, param)
  //                             .catch(err => console.log(err));
  //   this.bomAdd = ajaxRes.data;
  // }
   async mateAdd() {
      // 서버로 보낼 데이터 구성
      const mateInfo = {
        mate_detail_list: this.selectedList.map(item => ({
        mate_id: item.mate_id,
        req_amount: item.req_amount,
        })),
        vendor_id: this.vendor.vendor_id,
        req_due_date: this.req_due_date,
        employee_id: this.userInfo.employee_id,
      };

      try {
        const ajaxRes = await axios.post(`/api/mateSave`, mateInfo);
        if (ajaxRes.data.affectedRows > 0) {
          alert("저장되었습니다.");
        } else {
          alert("저장이 실패하였습니다.");
        }
      } catch (err) {
        console.error(err);
        alert("저장 중 오류가 발생했습니다.");
      }
    },
}
}
</script>