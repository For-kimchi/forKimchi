<template>
  <!-- <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
    "> -->

<div class="page-header align-items-start min-vh-100">
    <!-- <span class="mask bg-gradient-dark opacity-6"></span> -->
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-success shadow-success border-radius-lg pt-2 pb-3">
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Welcome to For 김치
                </h4>
              </div>
            </div>
            <div class="card-body">
                <div class="mb-2">
                  <label class="form-label">이메일</label>
                  <input v-model="employee_email" type="email" class="form-control border ps-3" @keyup.enter="login">
                </div>
                <div class="mb-4">
                  <label class="form-label">비밀번호</label>
                  <input v-model="employee_pwd" type="password" class="form-control border ps-3" @keyup.enter="login">
                </div>
                <!-- <div class="mb-2 form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch">
                  <label class="form-check-label">로그인 유지</label>
                </div> -->
                <div class="d-grid">
                  <button class="btn btn-success btn-lg" @click="login">로그인</button>
                </div>
                <p class="mt-4 text-sm text-center">
                  비밀번호를 잊으셨다면?
                  <span class="text-success text-gradient font-weight-bold" @click="openModal">비밀번호 찾기</span>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ResetPwdModal :visible="showModal" @close="showModal = false"/>

</template>


<script>
import ResetPwdModal from "./modal/ResetPwdModal.vue";
import { mapActions } from "pinia";
import { useEventStore } from "@/stores/event";
import { useUserStore } from "@/stores/user";
import axios from "axios";

export default {
  name: "로그인",
  components: {
    ResetPwdModal,
  },
  data() {
    return {
      employee_email: '',
      employee_pwd: '',
      employee: {},
      showModal: false,
    }
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapActions(useEventStore, ["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions(useUserStore, ["loginStore"]),

    async login() {
      let param = {
        employee_email: this.employee_email,
        employee_pwd: this.employee_pwd,
      }

      let res = await axios.post('/api/login', param)
      .catch(err => console.log(err));

      if (res.data.success) {
        this.employee = res.data.employee;
        this.loginStore(this.employee);
        this.$router.push('/');
      } else {
        this.$swal({
          title: '로그인 실패',
          text: '이메일 또는 비밀번호를 확인해주세요',
          icon: 'warning'
        });
      }
    },
    openModal() {
      this.showModal = true;
    }
  },
};
</script>
