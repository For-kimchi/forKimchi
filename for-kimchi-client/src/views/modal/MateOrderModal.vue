<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content p-3">
        <div class="modal-header">
          <h5 class="modal-title">자재 발주 정보</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
          <button class="btn btn-secondary" @click="$emit('close')">닫기</button>
        </div>
        <div class="modal-body">
          <div class="col-12">
            <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">생산지시서 목록</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 500px; overflow-y: auto;">
              <table class="table align-items-center mb-0 justify-content-center mb-0 table-hover">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">No</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시서 번호</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">제품이름</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시일자</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시수량</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">생산지시상태</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-10">비고</th>
                    <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"  >발주서 등록</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in mateOrderList" :key="info.prod_order_lot" @click=""> 
                    <td class="align-middle text-center">{{ index + 1 }}</td>
                    <td class="align-middle text-center">{{ info.prod_order_lot }}</td>
                    <td class="align-middle text-center">{{ info.prod_id }}</td>
                    <td class="align-middle text-center">{{ info.order_date }}</td>
                    <td class="align-middle text-center">{{ info.order_amount }}</td>
                    <td class="align-middle text-center"><button class="btn btn-sm btn-warning" disabled>{{ info.order_status }}</button></td>
                    <td class="align-middle text-center">{{ info.memo }}</td>
                    <td>
                    <button class="btn btn-sm btn-primary" @click="mateBomOrderSave(info)">
                    발주 등록
                    </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MateModal v-if="showModal" :prodOrderInfo="selectedOrder" @close="showModal = false"/>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import MateModal from '../modal/MateModal.vue';

export default {
  name: "MateProdOrder",
  data() {
    return {
      mateOrderList: [],  // 생산지시서 목록
      selectedOrder: null, // 선택된 생산지시서
      showModal: false, // 모달
      search: {
        prod_id: '',
        prod_name: '',
        start_date: '',
        end_date: '',
      },
      selected:[],
      bomList:[],
    };
  },

    created() {
    this.searchProdOrder();
    

  },
  components: {
   MateModal
  }, 

  methods: {
    // 생산지시서 조회
    async searchProdOrder() {
      let ajaxRes =
      await axios.get(`/api/mateOrder`)
                .catch(err=> console.log(err));
      this.mateOrderList = ajaxRes.data

    },

  // 발주저장버튼 클릭시 값 자동입력
async mateBomOrderSave(info) {


  let ajaxRes = await axios.get(`/api/mateBomInsert/${info.prod_order_lot}`)
                          .catch(err => console.log(err));
  this.bomList = ajaxRes.data.data || ajaxRes.data;

  this.$emit('save-order', {
    prodOrder: info,
    bomList: this.bomList
  });

  this.$emit('close');
},


//   // 1. 선택된 생산지시서의 lot 번호로 자재 정보를 조회
//   async mateBomDetail(info) {
//     this.selectedOrder = info;
//     this.showModal = true; 
//   const res = await axios.get(`/api/mateOrder`, {
//     params: { prod_order_lot: info.prod_order_lot }
//   }).catch(err => console.error(err));
// },

    goToBack() {
      this.$router.push('/matma');
    }
  },
};
</script>
