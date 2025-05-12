// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  }),
  actions: {
    loginStore(user) {
      this.isLoggedIn = true;
      this.userInfo = user;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userInfo', JSON.stringify(user));
    },
    logoutStore() {
      this.isLoggedIn = false;
      this.userInfo = {};
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userInfo');
    },
  },
});
