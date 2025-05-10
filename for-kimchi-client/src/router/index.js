import {
  createRouter,
  createWebHistory
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tables from "../views/Tables.vue";
import Notifications from "../views/Notifications.vue";
import Billing from "../views/Billing.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";

//혁진
import mateQuality from "../views/quality/mate_quality.vue";
import prodQuality from "../views/quality/prod_quality.vue";
import mateQualityControl from "../views/quality/mate_quality_control.vue";
import prodQualityControl from "../views/quality/prod_quality_control.vue";
import  qualityManager from "../views/quality/quality_manager.vue";

// 유환
import ProdPlan from "../views/prod/ProdPlans.vue";
import ProdOrder from "../views/prod/ProdOrder.vue";
import ProdProcess from "../views/prod/ProdProcess.vue";
import ProdProcWork from "../views/prod/ProdProcWorks.vue";
import OrderProd from "../views/prod/OrderProd.vue";
import ProdOrderInfo from "../views/prod/ProdOrderInfos.vue";
import ProdMate from "../views/prod/ProdMates.vue";

// 김어진 (자재발주)
import MaterialList from "../views/material/MaterialList.vue";
import MaterialManagement from "../views/material/MaterialManagement.vue";
// 김어진 (입고)
import StoreList from "../views/material/StoreList.vue";
import StoreManagement from "../views/material/StoreManagement.vue";
// 김어진 (창고현황)
import WarehouseList from "../views/material/WarehouseList.vue";

//business (영업)
import OrderList from "../views/business/OrderList.vue";
import OrderMng from "../views/business/OrderMng.vue";
import DelivList from "../views/business/DelivList.vue";
import DelivMng from "../views/business/DelivMng.vue";
import ProdWarehouse from "../views/business/ProdWarehouse.vue";

//basic (기준관리)
import BasicProd from "../views/basic/BasicProd.vue";
import BasicMate from "../views/basic/BasicMate.vue";
import BasicBom from "../views/basic/BasicBom.vue";
import BasicProc from "../views/basic/BasicProc.vue";
import BasicProcFlow from "../views/basic/BasicProcFlow.vue";
import BasicVendor from "../views/basic/BasicVendor.vue";
import BasicEmployee from "../views/basic/BasicEmployee.vue";

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
  // 유환(prod)
  {
    path: "/prodPlan",
    name: "ProdPlan",
    component: ProdPlan,
  },
  {
    path: "/prodOrder",
    name: "ProdOrder",
    component: ProdOrder,
  },
  {
    path: "/prodProcess",
    name: "ProdProcess",
    component: ProdProcess,
  },
  {
    path: "/prodProcWork",
    name: "ProdProcWork",
    component: ProdProcWork,
  },
  {
    path: "/orderProd",
    name: "OrderProd",
    component: OrderProd,
  },
  {
    path: "/prodOrderInfo",
    name: "ProdOrderInfo",
    component: ProdOrderInfo,
  },
  {
    path: "/prodMate",
    name: "ProdMate",
    component: ProdMate,
  },
  // 이혁진
  {
    path: "/mateQuality",
    name: "mateQuality",
    component: mateQuality,
  },
  {
    path: "/prodQuality",
    name: "prodQuality",
    component: prodQuality,
  },
  {
    path: "/mateQualityControl",
    name: "mateQualityControl",
    component: mateQualityControl,
  },
  {
    path: "/prodQualityControl",
    name: "prodQualityControl",
    component: prodQualityControl,
  },
  {
    path: "/qualityManager",
    name: "qualityManager",
    component: qualityManager,
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

  // 어진(창고현황)
  {
    path: "/warehouseList",
    name: "WarehouseList",
    component: WarehouseList
  },

  {
    path: "/mateQuality",
    name: "mateQuality",
    component: mateQuality,
  },
  //basic (기준관리)
  {
    path: "/basicprod",
    name: "BasicProd",
    component: BasicProd,
  },
  {
    path: "/basicmate",
    name: "BasicMate",
    component: BasicMate,
  },
  {
    path: "/basicbom",
    name: "BasicBom",
    component: BasicBom,
  },
  {
    path: "/basicproc",
    name: "BasicProc",
    component: BasicProc,
  },
  {
    path: "/basicprocflow",
    name: "BasicProcFlow",
    component: BasicProcFlow,
  },
  {
    path: "/basicvendor",
    name: "BasicVendor",
    component: BasicVendor,
  },
  {
    path: "/basicemp",
    name: "BasicEmployee",
    component: BasicEmployee,
  },
  //business (영업)
  {
    path: "/orders",
    name: "OrderList",
    component: OrderList,
  },
  {
    path: "/ordersmng",
    name: "OrderMng",
    component: OrderMng,
  },
  {
    path: "/delivs",
    name: "DelivList",
    component: DelivList,
  },
  {
    path: "/delivsmng",
    name: "DelivMng",
    component: DelivMng,
  },
  {
    path: "/prodwh",
    name: "ProdWarehouse",
    component: ProdWarehouse,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;