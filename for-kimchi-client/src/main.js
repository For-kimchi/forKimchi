import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import MaterialDashboard from "./material-dashboard";
import { createPinia } from 'pinia'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia()

const appInstance = createApp(App);
appInstance.use(pinia);
appInstance.use(router);
appInstance.use(MaterialDashboard);
appInstance.use(VueSweetalert2);
appInstance.mount("#app");