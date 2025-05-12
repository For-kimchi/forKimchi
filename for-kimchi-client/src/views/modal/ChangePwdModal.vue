<template>
  <teleport to="body">
    <div v-if="visible" class="modal-backdrop">
      
      <div class="custom-modal">
        <!-- 제목 -->
        <div class="modal-header mb-3">
          <h5 class="modal-title">비밀번호 변경</h5>
        </div>

        <!-- 검색 영역 -->
        <div class="row">
          <div class="col-md-12">

              <div class="mb-2">
                  <label class="form-label">이전 비밀번호</label>
                  <input v-model="old_pwd" type="password" class="form-control border ps-3" placeholder="이전 비밀번호">
              </div>
              <div class="mb-2">
                  <label class="form-label">새 비밀번호</label>
                  <input v-model="new_pwd" type="password" class="form-control border ps-3" placeholder="새 비밀번호">
              </div>
            
              <div class="mb-2">
                  <label class="form-label">새 비밀번호 확인</label>
                  <input v-model="new_pwd_check" type="password" class="form-control border ps-3" placeholder="새 비밀번호 확인"
                  @keyup.enter="changePwd">
              </div>

              <div class="text-end">
                <button class="btn btn-primary" @click="changePwd">비밀번호변경</button>
                <button class="btn btn-secondary ms-2" @click="close">취소</button>
              </div>

          </div>
        </div>
        
      </div>
    </div>
  </teleport>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useUserStore } from "@/stores/user";
  import axios from 'axios';

  export default {
    props: {
      visible: Boolean,
    },
    data() {
      return {
        old_pwd: '',
        new_pwd: '',
        new_pwd_check: '',
      };
    },
    computed: {    
      ...mapState(useUserStore, [
      "isLoggedIn",
      "userInfo",
    ]),
    },
    methods: {
      async changePwd() {
        
        if (!this.old_pwd || !this.new_pwd || !this.new_pwd_check) {
          alert('입력되지 않은 정보가 있습니다');
          return;
        }

        if (this.new_pwd != this.new_pwd_check) {
          alert('새로운 비밀번호가 일치하지 않습니다');
          return;
        }

        let res = await axios.post('/api/changePwd', {
          employee_email: this.userInfo.employee_email,
          old_pwd: this.old_pwd,
          new_pwd: this.new_pwd,
        }).catch(err => console.log(err));

        console.log(res.data);

        if (res.data.success) {
          alert('변경 성공');
          this.close();
        } else {
          alert('변경 실패');
        }
      },
      close() {
        this.reset();
        this.$emit('close');
      },
      reset() {
        this.old_pwd = '';
        this.new_pwd = '';
        this.new_pwd_check = '';
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