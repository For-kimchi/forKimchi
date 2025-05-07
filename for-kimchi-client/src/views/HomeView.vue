<template>
  <div
    class="page-header align-items-start min-vh-75">
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  For김치
                </h4>
                <div class="row mt-3">
                  <div class="col-12 text-center mx-auto">
                    <h5 class="text-white font-weight-bolder text-center mt-2 mb-0">
                      환영합니다!
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- <form role="form" class="text-start mt-3"> -->
                <div class="mb-3">
                  <material-input
                    id="email"
                    type="email"
                    label="이메일"
                    name="email"
                  />
                </div>
                <div class="mb-3">
                  <material-input
                    id="password"
                    type="password"
                    label="비밀번호"
                    name="password"
                  />
                </div>
                <material-switch id="rememberMe" name="rememberMe">로그인 유지</material-switch>
                <div class="text-center">
                  <material-button
                    class="my-4 mb-2"
                    variant="gradient"
                    color="success"
                    fullWidth
                    >로그인</material-button
                  >
                </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
  data() {
    return {

    }
  },
  computed: {
  }
  ,methods: {
  }
  ,created() {
  }
}
</script>