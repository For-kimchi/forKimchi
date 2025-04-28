<template>
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
                    <th>아이디</th>
                    <th>이름</th>
                    <th>연락처</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="count > 0">
                    <tr v-for="(info, index) in customerList" v-bind:key="info.id">
                      <td>{{ index + 1 }}</td>
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
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <MaterialAlert>Alert</MaterialAlert>
        <MaterialButton>Button</MaterialButton>
        <MaterialCheckbox></MaterialCheckbox>
        <MaterialInput></MaterialInput>
        <MaterialRadio></MaterialRadio>
        <MaterialSwitch></MaterialSwitch>
        <MaterialTextarea></MaterialTextarea>
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
    },
    data() {
      return {
        customerList: [],
      }
    },
    computed: {
      count() {
        return this.customerList.length;
      }
    }
    ,methods: {
      async getCustomers() {
        let res = await axios.get('/api/equips')
        .catch(err => console.log(err));
        this.customerList = res.data;
      },
    }
    ,created() {
      // this.getCustomers();
    }
  }
  </script>