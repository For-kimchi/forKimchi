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
                  <input v-model="loginInfo.email" type="email" class="form-control border px-2" placeholder="이메일" />
                </div>
                <div class="mb-3">
                  <input v-model="loginInfo.pwd" type="password" class="form-control border px-2" placeholder="비밀번호" />
                </div>
                <div class="text-center">
                  <button class="btn btn-success">로그인</button>
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
      loginInfo: {
        email: '',
        pwd: '',
      },
    }
  },
  computed: {
  }
  ,methods: {
    async login() {

      let result = await axios.post('/api/login', this.loginInfo)
      .catch(err => console.log(err));

      if (result.data.success) {

      } else {
        
      }
    }
  }
  ,created() {
  }
}
</script>