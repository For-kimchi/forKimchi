import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tables from "../views/Tables.vue";
import Notifications from "../views/Notifications.vue";
import Billing from "../views/Billing.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import OrderList from "../views/business/OrderList.vue";
import DelivList from "../views/business/DelivList.vue";

import Productionplan from "../views/Productionplan.vue";
import Productionorder from "../views/Productionorder.vue";
import Productionprocess from "../views/Productionprocess.vue";
import Productionprocwork from "../views/Productionprocwork.vue";
//혁진
import mateQuality from "../views/quality/mate_quality.vue"; 
// 유환
import Prodplan from "../views/prod/Prodplan.vue";
import Prodorder from "../views/prod/Prodorder.vue";
import Prodprocess from "../views/prod/Prodprocess.vue";
import Prodprocwork from "../views/prod/Prodprocwork.vue";
import Orderprod from "../views/prod/Orderprods.vue";

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
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/orders",
    name: "OrderList",
    component: OrderList,
  },
  {
    path: "/delivs",
    name: "DelivList",
    component: DelivList,
  },
  // 유환(prod)
  {
    path: "/prodplan",
    name: "Prodplan",
    component: Prodplan,
  },
  {
    path: "/prodorder",
    name: "Prodorder",
    component: Prodorder,
  },
  {
    path: "/prodprocess",
    name: "Prodprocess",
    component: Prodprocess,
  },
  {
    path: "/prodprocwork",
    name: "Prodprocwork",
    component: Prodprocwork,
  },
  {
    path: "/orderprod",
    name: "Orderprod",
    component: Orderprod,
  },
  {
    path: "/mateQuality",
    name: "mateQuality",
    component: mateQuality,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
