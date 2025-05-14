<template>
  <!-- <div
    class="page-header align-items-start min-vh-80"
    style="background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');">
     -->
  <div class="page-header align-items-start min-vh-90">
    <!-- <span class="mask bg-gradient-dark opacity-6"></span> -->
    <div class="container my-auto">
      <div class="row">
          <h1>For 김치</h1>
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
