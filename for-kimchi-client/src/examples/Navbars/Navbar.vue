<template>
  <nav
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
    :class="isAbsolute ? 'mt-4' : 'mt-0'"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :color="color" />
      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="'me-sm-4'"
        id="navbar">
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="'ms-md-auto'">
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <span class="me-2 font-weight-bolder" v-if="isLoggedIn">{{ userInfo.employee_name ? userInfo.employee_name + ' 님, 환영합니다' : '' }}</span>
          </li>
          <li class="nav-item d-flex align-items-center">
              <button class="btn btn-danger m-0 me-2" v-if="isLoggedIn" @click="logout">로그아웃</button>
              <button class="btn btn-info m-0" v-if="isLoggedIn" @click="openModal">비밀번호변경</button>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="#"
              @click="toggleSidebar"
              class="p-0 nav-link text-body lh-1"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <ChangePwdModal :visible="showModal" @close="showModal = false"/>

</template>

<script>

import ChangePwdModal from "../../views/modal/ChangePwdModal.vue";
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapState, mapActions } from 'pinia';
import { useEventStore } from '@/stores/event';
import { useUserStore } from "@/stores/user";


export default {
  name: "navbar",
  
  data() {
    return {
      showMenu: false,
      showModal: false,
    };
  },
  props: ["minNav", "color"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapActions(useEventStore, ["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(useUserStore, ["logoutStore"]),

    toggleSidebar() {
      this.navbarMinimize(useEventStore());
    },
    logout() {
      this.logoutStore();
      this.$router.push('/login');
    },
    openModal() {
      this.showModal = true;
    },
  },
  components: {
    Breadcrumbs,
    ChangePwdModal,
  },
  computed: {
    ...mapState(useEventStore, ["isRTL", "isAbsolute"]),
    ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ]),
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
