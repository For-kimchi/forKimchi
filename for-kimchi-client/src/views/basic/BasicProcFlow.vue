<template>
  <div class="container-fluid">

    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-info" @click="save">저장</button>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">제품정보조회</h6>
        </div>
      </div>
      <div class="row g-2 my-3 px-3">

        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품명</label>
            <input v-model="prod.prod_name" type="text" class="form-control border text-center" @keydown.prevent
            @click="showProd = true" placeholder="제품명" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품ID</label>
            <input v-model="prod.prod_id" type="text" class="form-control border text-center" @keydown.prevent placeholder="제품ID" />
          </div>
        </div>

      </div>
    </div>


    <div class="row">
      <!-- Left Side: Products -->
      <div class="col-md-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">공정흐름도 정보</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0" style="max-height: 400px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center font-weight-bolder">순번</th>
                    <th class="text-center font-weight-bolder">공정ID</th>
                    <th class="text-center font-weight-bolder">공정명</th>
                    <th class="text-center font-weight-bolder">공정분류</th>
                    <th class="text-center font-weight-bolder"></th>
                  </tr>
                </thead>
                <draggable tag="tbody" :list="procFlow.flow_details" item-key="id" @end="updateRowNumbers">
                  <template #item="{ element, index }">
                    <tr>
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center">{{ element.proc_id }}</td>
                      <td class="text-center">{{ element.proc_name }}</td>
                      <td class="text-center">{{ codeToName(element.proc_type, codes) }}</td>
                      <td class="text-center"><button class="btn btn-danger m-0" @click="removeRows(index)">삭제</button></td>
                    </tr>
                  </template>
                </draggable>
              </table>
            </div>
            <div class="text-center text-muted mt-2" style="font-size: 0.9rem;">
              <i class="material-icons-round" style="vertical-align: middle; font-size: 1rem;">info</i>
                항목을 마우스로 드래그하여 순서를 변경할 수 있습니다.
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Materials -->
      <div class="col-md-6">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
              <h6 class="text-white text-capitalize ps-3">공정 정보</h6>
            </div>
          </div>

          <div class="card-body px-0 pb-2">
            <div class="row g-3 px-3">
              <div class="col-md-6">
                <input v-model="searchName" type="text" class="form-control border text-center" placeholder="공정명" />
              </div>
              <div class="col-md-3">
                <button class="btn btn-success m-0" @click="searchFlow">검색</button>
              </div>
            </div>
            <div class="table-responsive p-0" style="max-height: 400px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center font-weight-bolder">공정ID</th>
                    <th class="text-center font-weight-bolder">공정명</th>
                    <th class="text-center font-weight-bolder">공정분류</th>
                    <th class="text-center font-weight-bolder"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in procs" v-bind:key="info.proc_id">
                    <td class="text-center">{{ info.proc_id }}</td>
                    <td class="text-center">{{ info.proc_name }}</td>
                    <td class="text-center">{{ codeToName(info.proc_type, codes) }}</td>
                    <td class="text-center">
                      <button v-if="!procFlow.flow_details.some(detail => detail.proc_id == info.proc_id)" class="btn btn-success m-0" @click="addRows(index)">추가</button>
                      <button v-else class="btn btn-light m-0" disabled>추가</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProdModal :visible="showProd" @close="showProd = false" @select="onSelectProd" />
  </div>
</template>

<script>
  import ProdModal from '../modal/ProdModal.vue';
  import axios from 'axios';
  import draggable from 'vuedraggable';
  import { codeToName } from '../../utils/common'
  import {
    mapState
  } from 'pinia';
  import {
    useUserStore
  } from "@/stores/user";

  export default {
    components: {
      ProdModal,
      draggable,
    },
    data() {
      return {
        showProd: false,
        searchName: '',
        procFlow: {
          flow_details: [],
        },
        procs: [],
        prod: {},
        codes: []
      };
    },
    computed: {
      ...mapState(useUserStore, [
        "isLoggedIn",
        "userInfo",
      ])
    },
    methods: {
      async getProcFlow() {

        let result = await axios.get('/api/basicProcFlow', {
          params: {
            prod_id: this.prod.prod_id
          }
        }).catch(err => console.log(err));

        this.procFlow = result.data;
      },
      async getFlow() {

        let result = await axios.get('/api/basicProc', {
          params: {
            proc_name : this.searchName
          }
        }).catch(err => console.log(err));

        this.procs = result.data;
      },
      onSelectProd(prod) {
        this.prod = prod;
        this.getProcFlow();
      },
      searchFlow() {
        if (!this.prod.prod_id) {
        this.$swal({
          text: '제품을 먼저 선택해주세요',
          icon: 'warning'
        });
          return;
        }
        this.getFlow();
      },
      removeRows(index) {
        this.procFlow.flow_details.splice(index, 1);
      },
      addRows(index) {

        let exist = this.procFlow.flow_details.some(item => item.proc_id === this.procs[index].proc_id);

        if (!exist) {
          this.procFlow.flow_details.push({
            proc_id: this.procs[index].proc_id,
            proc_name: this.procs[index].proc_name,
            proc_type: this.procs[index].proc_type,
          })
        }
      },
      updateRowNumbers() {

      },
      async save() {

        if (!this.prod.prod_id) {
        this.$swal({
          text: '대상제품을 먼저 선택해주세요',
          icon: 'warning'
        });
          return;
        }
        
        this.procFlow.employee_id = this.userInfo.employee_id;

        let res = await axios.post('/api/basicProcFlow', this.procFlow)
        .catch(err => console.log(err));

        if (res.data.success) {
        this.$swal({
          text: '저장이 완료되었습니다',
          icon: 'success'
        });
        } else {
        this.$swal({
          text: '저장 중 오류가 발생했습니다다',
          icon: 'error'
        });
        }

      },
      async getProcType() {
      let res = await axios.get(`/api/codes/G1`)
        .catch(err => console.log(err));
      this.codes = res.data;
    },
      codeToName(code, codeArray) {
        return codeToName(code, codeArray);
      },
    },
    created() {
      this.getProcType();
    },
  };
</script>