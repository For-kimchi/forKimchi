<template>
  <div
    class="page-header align-items-start min-vh-90"
    style="background-image: url('/img/bgs/bg2.png'); border-radius: 1rem;">
    
  <!-- <div class="page-header align-items-start min-vh-90"> -->
    <!-- <span class="mask bg-gradient-dark opacity-6"></span> -->
    <div class="container my-auto">
      <div class="row">
          <h1 class="text-white">For Kimchi,</h1>
          <h3 class="text-white">MES for kimchi production</h3>
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
import { userUserStore } from "@/stores/user";
import axios from "axios";

export default {
  name: "홈",
  data() {
    return {
    }
  },
  components: {
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
    ...mapActions(userUserStore, ["login"]),
  },
};
</script>
