<template>
  <nav aria-label="breadcrumb">
    <ol
      class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb"
      :class="'me-sm-6'"
    >
      <!-- <li class="text-sm breadcrumb-item" :class="color">
        <a :class="color" class="opacity-8" href="#">Pages</a>
      </li>
      <li
        class="text-sm breadcrumb-item active"
        :class="color"
        aria-current="page"
      >
        {{ currentPage }}
      </li> -->
    </ol>
    <h3 class="mb-0 font-weight-bolder" :class="color">
      {{ currentPage }}
    </h3>
  </nav>
</template>

<script>
export default {
  name: "breadcrumbs",
  props: {
    currentPage: {
      type: String,
      required: "",
    },
    color: {
      type: String,
      default: "text-dark",
    },
  },
};
</script>
