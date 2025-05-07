<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">

      <!-- 영업 -->
      <li class="nav-item">
        <!-- collapseRef : router 에 등록된 path name 등록 ( '/' 는 제외 )-->
        <!-- navText : 화면에 표시될 이름 -->
        <!-- collapse : 확장 여부 true/false-->
         <!--shopping_basket,
                  content_paste,
                  table_view,
                  image,
                  apps,
                  content_paste,
                  upcoming,
                  view_in_ar,
                  receipt_long
                  A,B,C, 알파벳이 있음. 실험을 해보고 사용하길 권장드려요~-->
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="영업">
          <template v-slot:icon>
            <!-- 표시될 아이콘 이름 -->
            <i class="material-icons-round opacity-10 fs-5">inventory</i>
          </template>
          <!-- slot 에 하위 컴포넌트 추가 -->
          <template v-slot:list>
            <SidenavCollapseItem refer="/orders" miniIcon="receipt_long" text="주문조회"/>
            <SidenavCollapseItem refer="/ordersmng" miniIcon="receipt_long" text="주문관리"/>
            <SidenavCollapseItem refer="/delivs" miniIcon="local_shipping" text="납품조회"/>
            <SidenavCollapseItem refer="/delivsmng" miniIcon="local_shipping" text="납품관리"/>
            <SidenavCollapseItem refer="/prodwh" miniIcon="save_alt" text="제품입고"/>
          </template>
        </sidenav-collapse>
      </li>

      <!-- 생산 -->
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="생산">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <template v-slot:list>
            <SidenavCollapseItem refer="/Prodplan" miniIcon="" text="생산계획관리"/>
            <SidenavCollapseItem refer="/Prodorder" miniIcon="" text="생산지시관리"/>
            <SidenavCollapseItem refer="/Prodprocess" miniIcon="" text="생산공정관리"/>
            <SidenavCollapseItem refer="/Prodprocwork" miniIcon="" text="생산이력관리"/>
          </template>
        </sidenav-collapse>
      </li>

      <!-- 자재 -->
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="자재">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <template v-slot:list>
            <SidenavCollapseItem refer="/materlist" miniIcon="" text="자재발주조회"/>
            <SidenavCollapseItem refer="/matma" miniIcon="" text="자재발주관리"/>
            <SidenavCollapseItem refer="/storeList" miniIcon="" text="입고조회"/>
            <SidenavCollapseItem refer="/storema" miniIcon="" text="입고관리"/>
          </template>
        </sidenav-collapse>
      </li>

      <!-- 품질관리 -->
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="검사">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">checklist</i>
          </template>
          <template v-slot:list>
            <sidenav-collapse-item refer="/mateQuality" miniIcon="" text="자재수입검사조회"/>
            <sidenav-collapse-item refer="/mateQualityControl" miniIcon="" text="자재수입검사관리"/>
            <sidenav-collapse-item refer="/prodQuality" miniIcon="" text="제품검사조회"/>            
            <sidenav-collapse-item refer="/prodQualityControl" miniIcon="" text="제품검사관리"/>
            <sidenav-collapse-item refer="/qualityManager" miniIcon="" text="검사기준관리"/>
            <sidenav-collapse-item refer="/orders" miniIcon="" text="검사항목관리"/>
          </template>
        </sidenav-collapse>
      </li>

       <!-- 기준관리 -->
       <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="기준관리">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <template v-slot:list>
            <SidenavCollapseItem refer="/basicprod" miniIcon="" text="제품관리"/>
            <SidenavCollapseItem refer="/basicmate" miniIcon="" text="자재관리"/>
            <SidenavCollapseItem refer="/basicbom" miniIcon="" text="BOM관리"/>
            <SidenavCollapseItem refer="/basicproc" miniIcon="" text="공정관리"/>
            <SidenavCollapseItem refer="/basicprocflow" miniIcon="" text="공정흐름도관리"/>
            <SidenavCollapseItem refer="/basicvendor" miniIcon="" text="거래처관리"/>
            <sidenav-collapse-item refer="/basicemp" miniIcon="" text="사원관리"/>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Example -->
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="Examples">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">close</i>
          </template>
          <template v-slot:list>
            <SidenavCollapseItem refer="/tables" miniIcon="" text="Tables"/>
            <SidenavCollapseItem refer="/notifications" miniIcon="" text="Notifications"/>
            <SidenavCollapseItem refer="/billing" miniIcon="" text="Billing"/>
            <SidenavCollapseItem refer="/dashboard" miniIcon="" text="Dashboard"/>
            <SidenavCollapseItem refer="/profile" miniIcon="" text="Profile"/>
            <SidenavCollapseItem refer="/signIn" miniIcon="" text="SignIn"/>
            <SidenavCollapseItem refer="/signUp" miniIcon="" text="SignUp"/>
          </template>
        </sidenav-collapse>
      </li>

    </ul>
  </div>
</template>

<script>
  import SidenavCollapse from "./SidenavCollapse.vue";
  import SidenavCollapseItem from "./SidenavCollapseItem.vue";

  export default {
    name: "SidenavList",
    props: {
      cardBg: String,
    },
    data() {
      return {
        title: "Soft UI Dashboard PRO",
        controls: "dashboardsExamples",
        isActive: "active",
      };
    },
    components: {
      SidenavCollapse,
      SidenavCollapseItem,
    },
  };
</script>