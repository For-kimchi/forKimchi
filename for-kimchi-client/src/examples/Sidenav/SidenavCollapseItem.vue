<template>
  <li class="nav-item">
    <router-link
      class="nav-link text-white"
      :to="refer"
    >
      <div class="text-center d-flex align-items-center justify-content-center me-2">
        <i class="material-icons-round opacity-10 fs-5">{{ miniIcon }}</i>
      </div>
      <span class="sidenav-normal me-3 ms-2 ps-1">{{ text }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "SidenavCollapseItem",
  props: {
    refer: { type: String, required: true },
    miniIcon: { type: String, required: true },
    text: { type: String, required: true },
  }
};
</script>
