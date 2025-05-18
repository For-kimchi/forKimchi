<template>
  <div
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content p-3">
        <div class="modal-header">
          <h5 class="modal-title">자재 발주 정보</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <!-- ✅ 상단 요약 영역 -->
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-info shadow-info border-radius-lg pt-3 pb-2">
                <h6 class="text-white text-capitalize ps-3">발주 정보 요약</h6>
              </div>
            </div>
            <div class="row g-2 my-3 px-3">
              <div class="col-md-4">
                <label class="form-label">제품코드</label>
                <input v-model="prod_order_lot" type="text" class="form-control border text-center" readonly />
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

          <!-- ✅ BOM 정보 테이블 -->
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(info, index) in mateBomList" :key="index">
                      <td class="text-center">{{ info.mate_id }}</td>
                      <td class="text-center">{{ info.mate_name }}</td>
                      <td class="text-center">{{ info.mate_amount * order_amount }}</td>
                      <td class="text-center">{{ info.mate_unit }}</td>
                    </tr>
                    <tr v-if="mateBomList.length === 0">
                      <td colspan="4" class="text-center">자재 정보가 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- ✅ 저장 버튼 -->
          <div class="row mt-3">
            <div class="col text-end">
              <button class="btn btn-primary" @click="mateAdd(index)">발주 저장</button>
              <button class="btn btn-secondary" @click="$emit('close')">닫기</button>
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
  name: 'MateModal',
  props: ['prodOrderInfo'],
  data() {
    return {
      mateBomList: [],
      prod_order_lot: '',
      prod_id: '',
      prod_name: '',
      order_amount: 0,
      selectedList: [],
    };
  },
  watch: {
    prodOrderInfo: {
      immediate: true,
      handler(val) {
        if (val) {
          this.prod_order_lot = val.prod_order_lot || '';
          this.prod_id = val.prod_id || '';
          this.prod_name = val.prod_name || '';
          this.order_amount = val.order_amount || 0;

          if (this.prod_order_lot) {
            this.mateBom(this.prod_order_lot);
          }
        }
      },
    },
  },
  methods: {
    async mateBom(prod_order_lot) {
      try {
        const res = await axios.get(`/api/mateBom/${prod_order_lot}`);
        this.mateBomList = res.data;
      } catch (err) {
        console.error(err);
        this.mateBomList = [];
      }
    },
    
    mateAdd() {
    this.$emit('mateAdd', this.selectedItems); // 선택된 자재 배열 전달
    },

    async mateAdd() {
      let selected = this.mateBomList[index];
      
      const mateInfo = {
          mate_detail_list: this.mateBomList.map(item => ({
          mate_id: item.mate_id,
          mate_name: item.mate_name,
          req_amount: item.mate_amount * this.order_amount,
          mate_unit: item.mate_unit
        })),
        vendor_id: '', // 거래처 ID 바인딩 필요 시 추가
        req_due_date: null, // 납기일 입력 필요 시 바인딩
        employee_id: '', // 로그인 유저 정보 바인딩 필요
        
      };

      try {
        const res = await axios.get(`/api/mateListInsert/${selected.req_id}`, mateInfo);
        if (res.data.affectedRows > 0) {
          alert('저장되었습니다.');
          this.$emit('mateAdd', mateInfo.mate_detail_list);
          this.$emit('close');
        } else {
          alert('저장 실패');
        }
      } catch (err) {
        console.error(err);
        alert('저장 중 오류 발생');
      }
    },
  },
};
</script>
