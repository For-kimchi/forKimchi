import {
  createRouter,
  createWebHistory
} from "vue-router";
import { useUserStore } from '@/stores/user';

// main, login
import LoginView from "../views/LoginVue.vue";
import HomeView from "../views/HomeView.vue";

// examples
import Tables from "../views/Tables.vue";
import Notifications from "../views/Notifications.vue";
import Billing from "../views/Billing.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";

//혁진 (검사)
import mateQuality from "../views/quality/mate_quality.vue";
import prodQuality from "../views/quality/prod_quality.vue";
import mateQualityControl from "../views/quality/mate_quality_control.vue";
import prodQualityControl from "../views/quality/prod_quality_control.vue";
import qualityManager from "../views/quality/quality_manager.vue";
import qualityList from "../views/quality/qualityList.vue";

// 유환
import ProdPlan from "../views/prod/ProdPlans.vue";
import ProdOrder from "../views/prod/ProdOrder.vue";
import ProdProcess from "../views/prod/ProdProcess.vue";
import ProdProcWork from "../views/prod/ProdProcWorks.vue";
import OrderProd from "../views/prod/OrderProd.vue";
import ProdOrderInfo from "../views/prod/ProdOrderInfos.vue";
import ProdMate from "../views/prod/ProdMates.vue";

import ProdMateOrder from "../views/material/ProdMateOrder.vue";
// 김어진 (자재발주)
import MaterialList from "../views/material/MaterialList.vue";
import MaterialManagement from "../views/material/MaterialManagement.vue";
// 김어진 (입고)
import StoreList from "../views/material/StoreList.vue";
import StoreManagement from "../views/material/StoreManagement.vue";
// 김어진 (창고현황)
import WarehouseList from "../views/material/WarehouseList.vue";
import WarehouseAdd from "../views/material/WarehouseAdd.vue";
// 김어진 (생산지시조회)
import MateProdOrder from "../views/material/MateProdOrder.vue";
import MateBom from "../views/material/MateBom.vue";
//business (영업)
import OrderList from "../views/business/OrderList.vue";
import OrderMng from "../views/business/OrderMng.vue";
import DelivList from "../views/business/DelivList.vue";
import DelivMng from "../views/business/DelivMng.vue";
import ProdInbound from "../views/business/ProdInbound.vue";
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
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { 
      requiresAuth: true,
      pageName: 'Home'
    }
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
    meta: { 
      requiresAuth: true,
      pageName: '생산계획',
     }
  },
  {
    path: "/prodOrder",
    name: "ProdOrder",
    component: ProdOrder,
     meta: { 
      requiresAuth: true,
      pageName: '생산지시',
     }
  },
  {
    path: "/prodProcess",
    name: "ProdProcess",
    component: ProdProcess,
     meta: { 
      requiresAuth: true,
      pageName: '생산공정',
     }
  },
  {
    path: "/prodProcWork",
    name: "ProdProcWork",
    component: ProdProcWork,
     meta: { 
      requiresAuth: true,
      pageName: '생산실적관리',
     }
  },
  {
    path: "/orderProd",
    name: "OrderProd",
    component: OrderProd,
     meta: { 
      requiresAuth: true,
      pageName: '주문확인',
     }
  },
  {
    path: "/prodOrderInfo",
    name: "ProdOrderInfo",
    component: ProdOrderInfo,
     meta: { 
      requiresAuth: true,
      pageName: '생산계획관리',
     }
  },
  {
    path: "/prodMate",
    name: "ProdMate",
    component: ProdMate,
     meta: { 
      requiresAuth: true,
      pageName: '생산자재관리',
     }
  },
  // 이혁진
  {
    path: "/mateQuality",
    name: "mateQuality",
    component: mateQuality,
    meta: { 
      requiresAuth: true,
      pageName: '자재검사조회',
    }
  },
  {
    path: "/prodQuality",
    name: "prodQuality",
    component: prodQuality,
    meta: { 
      requiresAuth: true,
      pageName: '제품검사조회',
    }
  },
  {
    path: "/mateQualityControl",
    name: "mateQualityControl",
    component: mateQualityControl,
    meta: { 
      requiresAuth: true,
      pageName: '자재검사관리',
    }
  },
  {
    path: "/prodQualityControl",
    name: "prodQualityControl",
    component: prodQualityControl,
    meta: { 
      requiresAuth: true,
      pageName: '제품검사관리',
    }
  },
  {
    path: "/qualityManager",
    name: "qualityManager",
    component: qualityManager,
    meta: { 
      requiresAuth: true,
      pageName: '검사기준관리',
     }
  },
  {
    path: "/qualityList",
    name: "qualityList",
    component: qualityList,
    meta: { 
      requiresAuth: true,
      pageName: '검사항목관리',
    }
  },
  {
    path: "/prodMateOrder",
    name: "ProdMateOrder",
    component: ProdMateOrder,
    meta: { 
      requiresAuth: true,
      pageName: '자재출고관리',
     }
  },
  // 김어진 (자재발주)
  {
    path: "/materlist",
    name: "Material List",
    component: MaterialList,
    meta: { 
      requiresAuth: true,
      pageName: '자재발주조회',
     }
  },
  {
    path: "/matma",
    name: "Material Management",
    component: MaterialManagement,
    meta: { 
      requiresAuth: true,
      pageName: '자재발주관리',
     }
  },
  {
    path: "/mateBom",
    name: "MateBom",
    component: MateBom,
    meta: {
      requiresAuth: true,
      pageName: '생산지시발주',
    }
  },
  // 김어진(입고)
  {
    path: "/storeList",
    name: "StoreList",
    component: StoreList,
    meta: { 
      requiresAuth: true,
      pageName: '입고조회',
     }
  },
  {
    path: "/storema",
    name: "StoreManagement",
    component: StoreManagement,
    meta: { 
      requiresAuth: true,
      pageName: '입고관리',
     }
  },

  // 어진(창고현황)
  {
    path: "/warehouseList",
    name: "WarehouseList",
    component: WarehouseList,
    meta: { 
      requiresAuth: true,
      pageName: '창고현황',
     }
  },

  {
    path: "/warehouseAdd",
    name: "WarehouseAdd",
    component: WarehouseAdd,
    meta: { 
      requiresAuth: true,
      pageName: '창고입고',
     }
  },
  // 어진 (생산지시조회)
  {
    path: "/mateProdOrder",
    name: "MateProdOrder",
    component: MateProdOrder,
    meta: { 
      requiresAuth: true,
      pageName: '생산지시조회',
     }
  },

  // {
  //   path: "/mateQuality",
  //   name: "mateQuality",
  //   component: mateQuality,
  // },
  //basic (기준관리)
  {
    path: "/basicprod",
    name: "BasicProd",
    component: BasicProd,
    meta: { 
      requiresAuth: true,
      pageName: '제품관리',
     }
  },
  {
    path: "/basicmate",
    name: "BasicMate",
    component: BasicMate,
    meta: { 
      requiresAuth: true,
      pageName: '자재관리',
     }
    
  },
  {
    path: "/basicbom",
    name: "BasicBom",
    component: BasicBom,
    meta: { 
      requiresAuth: true,
      pageName: 'BOM관리',
     }
  },
  {
    path: "/basicproc",
    name: "BasicProc",
    component: BasicProc,
    meta: { 
      requiresAuth: true,
      pageName: '공정관리',
     }
  },
  {
    path: "/basicprocflow",
    name: "BasicProcFlow",
    component: BasicProcFlow,
    meta: { 
      requiresAuth: true,
      pageName: '공정흐름도관리',
     }
  },
  {
    path: "/basicvendor",
    name: "BasicVendor",
    component: BasicVendor,
    meta: { 
      requiresAuth: true,
      pageName: '거래처관리',
     }
    
  },
  {
    path: "/basicemp",
    name: "BasicEmployee",
    component: BasicEmployee,
    meta: { 
      requiresAuth: true,
      pageName: '사원관리',
     }
  },
  //business (영업)
  {
    path: "/orders",
    name: "OrderList",
    component: OrderList,
    meta: { 
      requiresAuth: true,
      pageName: '주문조회',
    }
  },
  {
    path: "/ordersmng",
    name: "OrderMng",
    component: OrderMng,
    meta: { 
      requiresAuth: true,
      pageName: '주문등록/수정',
     }
  },
  {
    path: "/delivs",
    name: "DelivList",
    component: DelivList,
    meta: { 
      requiresAuth: true,
      pageName: '납품조회',
     }
  },
  {
    path: "/delivsmng",
    name: "DelivMng",
    component: DelivMng,
    meta: { 
      requiresAuth: true,
      pageName: '납품관리',
     }
  },
  {
    path: "/prodinbound",
    name: "ProdInbound",
    component: ProdInbound,
    meta: { 
      requiresAuth: true,
      pageName: '제품입고',
     }
  },
  {
    path: "/prodwh",
    name: "ProdWarehouse",
    component: ProdWarehouse,
    meta: { 
      requiresAuth: true,
      pageName: '제품현황',
     }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;