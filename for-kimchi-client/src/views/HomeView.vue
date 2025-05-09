<template>
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
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
                  <label for="inputPassword5" class="form-label">Email</label>
                  <input type="email" id="inputPassword5" class="form-control border ps-3" aria-describedby="passwordHelpBlock">
                </div>
                <div class="mb-4">
                  <label for="inputPassword5" class="form-label">Password</label>
                  <input type="password" id="inputPassword5" class="form-control border ps-3" aria-describedby="passwordHelpBlock">
                </div>
                <div class="mb-2 form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault">
                  <label class="form-check-label" for="switchCheckDefault">로그인 유지</label>
                </div>
                <div class="d-grid">
                  <button class="btn btn-success btn-lg">로그인</button>
                </div>
                <p class="mt-4 text-sm text-center">
                  비밀번호를 잊으셨다면?
                  <router-link
                    :to="{ name: 'SignUp' }"
                    class="text-success text-gradient font-weight-bold"
                    >비밀번호 찾기</router-link
                  >
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { mapActions } from "pinia";
import { useEventStore } from "@/stores/event";

export default {
  name: "sign-in",
  components: {
    Navbar,
    MaterialInput,
    MaterialSwitch,
    MaterialButton,
  },
  beforeMount() {
    // this.toggleEveryDisplay();
    // this.toggleHideConfig();
  },
  beforeUnmount() {
    // this.toggleEveryDisplay();
    // this.toggleHideConfig();
  },
  methods: {
    ...mapActions(useEventStore, ["toggleEveryDisplay", "toggleHideConfig"]),
  },
};
</script>
