import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import MaterialDashboard from "./material-dashboard";
import { createPinia } from 'pinia'

const pinia = createPinia()

const appInstance = createApp(App);
appInstance.use(pinia);
appInstance.use(router);
appInstance.use(MaterialDashboard);
appInstance.mount("#app");
