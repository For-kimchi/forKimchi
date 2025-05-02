<template>
  <div v-if="visible" class="modal-backdrop" @click.self="close">
    <div class="modal-content-box">
      <div class="modal-header">
        <h5 class="modal-title">{{ title }}</h5>
        <button type="button" class="btn-close" @click="close"></button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control mb-2" v-model="search" :placeholder="placeholder">
        <ul class="list-group">
          <li v-for="item in filteredList"
              :key="item.id"
              class="list-group-item list-group-item-action"
              :class="{ active: item.name === selectedValue }"
              @click="select(item.name)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: String,
    placeholder: String,
    list: Array,
    selectedValue: String,
    vendor_Id: String,
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    filteredList() {
      return this.list.filter(item =>
        (item.name ?? '').toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    select(name) {
      this.$emit('select', name);
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content-box {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<style scoped>
/* 기존 모달 스타일 유지 */
.modal-backdrop { /* ... */ }
.modal-content-box { /* ... */ }
.modal-header { /* ... */ }
.list-group-item-action { cursor: pointer; }
.list-group-item.active { background-color: #0d6efd; color: white; }
</style>