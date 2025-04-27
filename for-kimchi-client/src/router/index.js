import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tables from "../views/Tables.vue";
import Notifications from "../views/Notifications.vue";
import Productionplan from "../views/Productionplan.vue";
import Productionorder from "../views/Productionorder.vue";
import Productionprocess from "../views/Productionprocess.vue";
import Productionprocwork from "../views/Productionprocwork.vue";
const routes = [
  // 예시
  {
    path: "/",
    name: "/",
    component: HomeView,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  // 유환
  {
    path: "/Productionplan",
    name: "Production plan",
    component: Productionplan,
  },
  {
    path: "/Productionorder",
    name: "Production order",
    component: Productionorder,
  },
  {
    path: "/Productionprocess",
    name: "Production process",
    component: Productionprocess,
  },
  {
    path: "/Productionprocwork",
    name: "Production procwork",
    component: Productionprocwork,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
