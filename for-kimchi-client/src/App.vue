
<template>
  <sidenav
    :custom_class="color"
    :class="'fixed-start'"
    v-if="showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden"
  >
    <!-- nav -->
    <navbar
      :class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
      :color="isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="showNavbar"
    />
    <router-view />
    <!-- <app-footer v-show="showFooter" /> -->
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapState, mapActions } from 'pinia';
import { useEventStore } from '@/stores/event';
import { useUserStore } from "@/stores/user";

export default {
  name: "App",
  components: {
    Sidenav,
    Navbar,
    AppFooter,
  },
  methods: {
    ...mapActions(useEventStore, ["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    ...mapState(useEventStore, [
      "isRTL",
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton",
    ]),
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ])
  },
  beforeMount() {
    const store = useEventStore();
    store.isTransparent = "bg-transparent";

    const sidenav = document.getElementsByClassName("g-sidenav-show")[0];

    if (window.innerWidth > 1200) {
      sidenav.classList.add("g-sidenav-pinned");
    }
  },
};
</script>
