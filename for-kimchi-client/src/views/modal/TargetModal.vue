<template>
  <teleport to="body">
    <div v-if="visible" class="modal-backdrop">
      <div class="custom-modal">
        <!-- 제목 -->
        <div class="modal-header mb-3">
          <h5 class="modal-title">대상 조회</h5>
        </div>

        <div class="d-flex mb-2 ">
          <div class="form-check form-check-inline ps-0">
            <input class="form-check-input" type="radio" id="prod" value="prod" v-model="searchType" checked>
            <label class="form-check-label ms-2" for="prod">제품</label>
          </div>
          <div class="form-check form-check-inline ps-0">
            <input class="form-check-input" type="radio" id="mate" value="mate" v-model="searchType">
            <label class="form-check-label ms-2" for="mate">자재</label>
          </div>
      </div>


        <!-- 검색 영역 -->
        <div class="d-flex align-items-center justify-content-between mb-3">
          <!-- 왼쪽: input -->
          <div class="flex-grow-1 me-3">
            <input v-model="search" type="text" class="form-control border text-center" placeholder="대상명" @keyup.enter="searchTarget"/>
          </div>

          <!-- 오른쪽: 버튼 -->
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-success m-0" @click="searchTarget">조회</button>
            <button type="button" class="btn btn-secondary m-0" @click="$emit('close')">닫기</button>
          </div>
        </div>

        <!-- 검색 결과 테이블 -->
        <table class="table table-hover">
          <thead>
            <tr>
              <th>대상ID</th>
              <th>대상명</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="selectedType == 'prod'">
              <tr v-for="(item, index) in results" :key="item.prod_id" @click="selectItem(index)" style="cursor: pointer">
                <td>{{ item.prod_id }}</td>
                <td>{{ item.prod_name }}</td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="(item, index) in results" :key="item.mate_id" @click="selectItem(index)" style="cursor: pointer">
                <td>{{ item.mate_id }}</td>
                <td>{{ item.mate_name }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </teleport>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    props: {
      visible: Boolean,
    },
    data() {
      return {
        search: '',
        results: [],
        searchType: 'prod',
        selectedType: '',
      };
    },
    methods: {


      async searchTarget() {
        
        this.selectedType = this.searchType;

        if (this.searchType == 'prod') {
          let params = {
          prod_name: this.search
        }

        let list = await axios.get('/api/basicProd', {
          params
        }).catch(err => console.log(err));

        this.results = list.data;
        } else {
          let params = {
          mate_name: this.search
        }

        let list = await axios.get('/api/basicMate', {
          params
        }).catch(err => console.log(err));

        this.results = list.data;
        }
        
      },
      selectItem(index) {

        let selected = {
          target_id : this.searchType == 'prod' ? this.results[index].prod_id : this.results[index].mate_id,
          target_name : this.searchType == 'prod' ? this.results[index].prod_name : this.results[index].mate_name
        }

        this.$emit('select', selected);
        this.$emit('close');
      },
      resetState() {
        this.search = ''
        this.results = []
        this.searchType = 'prod'
        this.selectedType = ''
      },
    },
    emits: ['close', 'select'],
    watch: {
      visible(newVal) {
        if (newVal) {
          this.resetState()
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1050;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .custom-modal {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    width: 50vw;
    max-width: 600px;
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    border-bottom: 1px solid #dee2e6;
  }
  </style>
  