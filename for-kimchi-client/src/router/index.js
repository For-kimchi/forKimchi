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

// 김어진 (자재발주)
import MaterialList from "../views/material/MaterialList.vue";
import MaterialManagement from "../views/material/MaterialManagement.vue";

// 김어진 (입고)
import StoreList from "../views/material/StoreList.vue";
import StoreManagement from "../views/material/StoreManagement.vue";

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
  {
    path: "/mateQuality",
    name: "mateQuality",
    component: mateQuality,
  },
  // 김어진 (자재발주)
  {
    path: "/materlist",
    name: "Material List",
    component: MaterialList,
  },
  {
    path: "/matma",
    name: "Material Management",
    component: MaterialManagement,
  },
  // 김어진(입고)
  {
    path: "/storeList",
    name: "StoreList",
    component: StoreList,
  },
  {
    path: "/storema",
    name: "StoreManagement",
    component: StoreManagement,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
