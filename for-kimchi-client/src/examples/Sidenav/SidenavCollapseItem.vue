<template>
  <li class="nav-item">
    <router-link
      class="nav-link text-white"
      :to="refer"
    >
      <span class="sidenav-mini-icon">{{ miniIcon }}</span>
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
