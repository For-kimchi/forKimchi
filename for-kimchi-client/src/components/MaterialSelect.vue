<template>
  <div
    class="input-group"
    :class="`input-group-${variant} ${getStatus(error, success)}`"
  >
    <label :class="variant === 'static' ? '' : 'form-label'">{{ label }}</label>
    <select
      :id="id"
      class="form-control"
      :class="getClasses(size)"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="isRequired"
      @change="$emit('update:value', $event.target.value)"
    >
      <option value="" disabled hidden>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import setMaterialInput from "@/assets/js/material-input.js";

export default {
  name: "MaterialSelect",
  props: {
    variant: {
      type: String,
      default: "outline",
    },
    label: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "선택하세요",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
      // [{ label: "옵션 이름", value: "옵션 값" }] 형태
    },
  },
  emits: ["update:value"],
  mounted() {
    setMaterialInput();
  },
  methods: {
    getClasses(size) {
      return size ? `form-control-${size}` : null;
    },
    getStatus(error, success) {
      if (success) return "is-valid";
      if (error) return "is-invalid";
      return null;
    },
  },
};
</script>