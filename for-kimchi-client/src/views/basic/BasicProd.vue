<template>
  <div class="container-fluid py-4">
    <!-- 검색 -->
     <div class="text-end">
        <button class="btn btn-success" @click="search()">조회</button> |
        <button class="btn btn-info" @click="save()">저장</button> |
        <button class="btn btn-danger" @click="remove()">삭제</button> |
     </div>
    <div class="row">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">제품조회</h6>
                </div>
            </div>
            <div>
            <ul class="list-group list-group-horizontal list-group-flush">
                <li class="list-group-item"><MaterialInput type="text" label="제품ID"></MaterialInput></li>
                <li class="list-group-item"><MaterialInput type="text" label="제품명"></MaterialInput></li>
                <li class="list-group-item"><MaterialSelect :options="selectList"></MaterialSelect></li>
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
              <h6 class="text-white text-capitalize ps-3">제품정보</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      순서
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      제품ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      제품명
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      규격
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      단위
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      비고
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(info, index) in basicProdList" v-bind:key="info.prod_id">
                    <td class="align-middle text-center">{{ index }}</td>
                    <td class="align-middle text-center">{{ info.prod_id }}</td>
                    <td class="align-middle text-center">{{ info.prod_name }}</td>
                    <td class="align-middle text-center">{{ info.prod_size }}</td>
                    <td class="align-middle text-center">{{ info.prod_unit }}</td>
                    <td class="align-middle text-center">{{ info.memo }}</td>
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
                    <h6 class="text-white text-capitalize ps-3">제품등록/수정</h6>
                    </div>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><MaterialInput type="text" label="제품ID"></MaterialInput></li>
                    <li class="list-group-item"><MaterialSelect :options="selectList"></MaterialSelect></li>
                    <li class="list-group-item"><MaterialInput type="text" label="제품명"></MaterialInput></li>
                    <li class="list-group-item"><MaterialInput type="number" label="제품규격"></MaterialInput></li>
                    <li class="list-group-item"><MaterialInput type="text" label="제품단위"></MaterialInput></li>
                </ul>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import MaterialAlert from '../../components/MaterialAlert.vue';
import MaterialAvatar from '../../components/MaterialAvatar.vue';
import MaterialBadge from '../../components/MaterialBadge.vue';
import MaterialButton from '../../components/MaterialButton.vue';
import MaterialCheckbox from '../../components/MaterialCheckbox.vue';
import MaterialInput from '../../components/MaterialInput.vue';
import MaterialRadio from '../../components/MaterialRadio.vue';
import MaterialSwitch from '../../components/MaterialSwitch.vue';
import MaterialTextarea from '../../components/MaterialTextarea.vue';
import MaterialSelect from '../../components/MaterialSelect.vue';

export default {
  components: {
    MaterialAlert,
    MaterialAvatar,
    MaterialBadge,
    MaterialButton,
    MaterialCheckbox,
    MaterialInput,
    MaterialRadio,
    MaterialSwitch,
    MaterialTextarea,
    MaterialSelect
  },
  data() {
    return {
      basicProdList: [],
      codesList: [],
      search_id : '',
      search_name : ''
    }
  },
  computed: {
    selectList() {
      return this.selectFormat('sub_code_name', 'sub_code');
    }
  },
  methods: {
    async getBasicProd() {
      let res = await axios.get('/api/basicProd')
        .catch(err => console.log(err));
      this.basicProdList = res.data;
    },
    async getProdType() {
      let res = await axios.get(`/api/codes/F1`)
        .catch(err => console.log(err));
      this.codesList = res.data;
    },
    
    selectFormat(label, value) {
      let selectArray = [];

      for (let item of this.codesList) {
        let newItem = {
          label: item[label],
          value: item[value],
        }

        selectArray.push(newItem);
      }
      return selectArray;
    },
    async search() {
      let res = await axios.get('/api/basicProd', {
        params: {
          prod_id : this.search_id,
          prod_name : this.search_name,
        }
      })
        .catch(err => console.log(err));
      this.basicProdList = res.data;
    },
    save() {
      
    },
    remove() {

    }
  },
  created() {
    // this.getBasicProd();
    this.getProdType();
  }
}
</script>