<template>
  <teleport to="body">
    <div v-if="visible" class="modal-backdrop">
      
      <div class="custom-modal">
        <!-- 제목 -->
        <div class="modal-header mb-3">
          <h5 class="modal-title">비밀번호 찾기</h5>
        </div>

        <!-- 검색 영역 -->
        <div class="row">
          <div class="col-md-12">

              <div class="mb-2">
                  <label class="form-label">이메일</label>
                  <input v-model="employee_email" type="email" class="form-control border ps-3" placeholder="이메일 입력"
                  @keyup.enter="resetPwd">
                  <label class="form-label mt-2">- 등록한 이메일로 임시비밀번호를 발급받을 수 있습니다</label>
              </div>

              <div class="text-end">
                <button class="btn btn-success" @click="resetPwd">임시비밀번호발급</button>
                <button class="btn btn-secondary ms-2" @click="close">취소</button>
              </div>

          </div>
        </div>
        
      </div>
    </div>
  </teleport>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      visible: Boolean,
    },
    data() {
      return {
        employee_email: '',
      };
    },
    methods: {
      async resetPwd() {

        if (!this.employee_email) {
          this.$swal({
          text: '이메일을 입력해주세요',
          icon: 'warning'
        });
        return;
        }
 
        let res = await axios.post('/api/resetPwd', {
          employee_email: this.employee_email,
        }).catch(err => console.log(err));

        if (res.data.success) {
        this.$swal({
          text: '임시비밀번호가 발급되었습니다',
          icon: 'success'
        });
          this.close();
        } else {
        this.$swal({
          text: '등록되지 않은 이메일입니다',
          icon: 'error'
        });
        }
      },
      close() {
        this.reset();
        this.$emit('close');
      },
      reset() {
        this.employee_email = '';
      }
    },
    emits: ['close'],
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1050;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .custom-modal {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    width: 50vw;
    max-width: 600px;
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    border-bottom: 1px solid #dee2e6;
  }
</style>