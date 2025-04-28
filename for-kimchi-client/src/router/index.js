import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tables from "../views/Tables.vue";
import Notifications from "../views/Notifications.vue";
import Billing from "../views/Billing.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import Productionplan from "../views/Productionplan.vue";
import Productionorder from "../views/Productionorder.vue";
import Productionprocess from "../views/Productionprocess.vue";
import Productionprocwork from "../views/Productionprocwork.vue";

//business (영업)
import OrderList from "../views/business/OrderList.vue"
import DelivList from "../views/business/DelivList.vue"

//basic (기준관리)
import BasicProd from "../views/basic/BasicProd.vue"
import BasicBom from "../views/basic/BasicBom.vue"
import BasicMate from "../views/basic/BasicMate.vue"

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
  //business (영업)
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
  //basic (기준관리)
  {
    path: "/basicprod",
    name: "BasicProd",
    component: BasicProd,
  },
  {
    path: "/basicbom",
    name: "BasicBom",
    component: BasicBom,
  },
  {
    path: "/basicmate",
    name: "BasicMate",
    component: BasicMate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
