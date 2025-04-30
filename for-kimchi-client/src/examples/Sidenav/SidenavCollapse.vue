<template>
  <div>
    <router-link
      :data-bs-toggle="collapse ? 'collapse' : ''"
      :to="collapse ? `#${collapseRef}` : collapseRef"
      :aria-controls="collapseRef"
      :aria-expanded="isExpanded"
      class="nav-link"
      :class="getRoute() === collapseRef ? `active bg-gradient-${color}` : ''"
      v-bind="$attrs"
      @click.prevent="toggleExpand"
    >
      <div class="text-center d-flex align-items-center justify-content-center me-2">
        <slot name="icon" />
      </div>
      <span class="nav-link-text ms-1">{{ navText }}</span>
    </router-link>
    <div :id="collapseRef" :class="isExpanded ? 'collapse show' : 'collapse'">
      <ul class="nav nav-sm flex-column">
        <slot name="list" />
      </ul>
    </div>
  </div>
</template>

<script>
import { useEventStore } from '@/stores/event';
import { mapState } from 'pinia';

export default {
  name: "SidenavCollapse",
  props: {
    collapseRef: { type: String, required: true },
    navText: { type: String, required: true },
    collapse: { type: Boolean, default: true }
  },
  data() {
    return { isExpanded: false };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  },
  computed: {
    ...mapState(useEventStore, ["isRTL", "color"])
  }
};
</script>
