<template>
  <div>
    <button class="btn bg-gradient-primary text-white" @click="showModal = true">
      Open Modal
    </button>

    <teleport to="body">
      <div v-if="showModal" class="modal-backdrop">
        <div class="custom-modal">
          <!-- 헤더 -->
          <div class="modal-header d-flex justify-content-between">
            <h4 class="modal-title">Centered Modal</h4>
            <button class="btn-close" @click="showModal = false"></button>
          </div>

          <!-- 바디 -->
          <div class="modal-body">
            <p>This modal is 50% of screen width.</p>
          </div>

          <!-- 푸터 -->
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showModal = false">Cancel</button>
            <button class="btn bg-gradient-success text-white" @click="confirmAction">Confirm</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    confirmAction() {
      this.showModal = false;
      alert("Confirmed!");
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1050;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-modal {
  background-color: white;
  border-radius: 0.5rem;
  width: 50vw;
  max-width: 600px;
  padding: 1.5rem;
  box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.2);
}
</style>
