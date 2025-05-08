<template>
  <div class="container-fluid">
    
    <div class="row mt-3">
      <div class="col text-end">
        <button class="btn btn-success" @click="showProd = true">조회</button>
        <button class="btn btn-info ms-2" @click="save">등록</button>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-success shadow-success border-radius-lg pt-3 pb-2">
          <h6 class="text-white text-capitalize ps-3">제품정보</h6>
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
        <div class="col-md-3">
          <div class="d-flex align-items-center">
            <label class="form-label me-2 mb-0 " style="width: 100px;">제품분류</label>
            <input v-model="prod.prod_type" type="text" class="form-control border text-center" @keydown.prevent placeholder="제품분류" />
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
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">순번</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">공정ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">공정명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7"></th>
                  </tr>
                </thead>
                <!-- <tbody>
                  <tr v-for="(info, index) in bom.bom_detail" v-bind:key="info.bom_detail_id">
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.mate_id" readonly></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="number" v-model="info.mate_amount"></td>
                    <td class="align-middle text-center">
                      <input class="form-control border text-center" type="text" v-model="info.mate_unit" readonly></td>
                    <td class="align-middle text-center">
                      <button class="btn btn-danger ms-2" @click="removeRows(index)">삭제</button></td>
                  </tr>
                </tbody> -->
                <draggable tag="tbody" :list="procFlow.flow_details" item-key="id" @end="updateRowNumbers">
                  <template #item="{ element, index }">
                    <tr>
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center">{{ element.proc_id }}</td>
                      <td class="text-center">{{ element.proc_name }}</td>
                      <td class="text-center"><button class="btn btn-danger ms-2" @click="removeRows(index)">삭제</button></td>
                    </tr>
                  </template>
                </draggable>
              </table>
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
                <button class="btn btn-primary" @click="searchFlow">검색</button>
              </div>
            </div>
            <div class="table-responsive p-0" style="max-height: 400px;">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">공정ID</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">공정명</th>
                    <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in procs" v-bind:key="info.proc_id">
                    <td class="text-center">{{ info.proc_id }}</td>
                    <td class="text-center">{{ info.proc_name }}</td>
                    <td class="text-center"><button class="btn btn-success ms-2" @click="addRows(index)">추가</button></td>
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
  import draggable from 'vuedraggable'

  export default {
    components: {
      ProdModal,
      draggable,
    },
    data() {
      return {
        showProd: false,
        searchName: '',
        procFlow: {},
        procs: [],
        prod: {},
        employee: {
          employee_id: 'EMP-001',
          employee_name: '홍길동',
        }
      };
    },
    computed: {},
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
          })
        } else {
          alert('이미 추가된 공정입니다')
        }
      },
      updateRowNumbers() {

      },
      async save() {

        this.procFlow.employee_id = this.employee.employee_id;

        let res = await axios.post('/api/basicProcFlow', this.procFlow)
        .catch(err => console.log(err));

        if (res.data.success) {
          alert('등록 성공');
          this.bom = {};
          this.materials = [];
          this.prod = {};
        } else {
          alert('등록 실패');
        }

      },
    },
    mounted() {},
  };
</script>