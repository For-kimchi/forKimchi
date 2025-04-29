<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">

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
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <!-- slot 에 하위 컴포넌트 추가 -->
          <template v-slot:list>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="orders" navText="주문관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="delivs" navText="납품관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <!-- collapseRef : router 에 등록된 path name 등록 ( '/' 는 제외 )-->
        <!-- navText : 화면에 표시될 이름 -->
        <!-- collapse : 확장 여부 true/false-->
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="자재">
          <template v-slot:icon>
            <!-- 표시될 아이콘 이름 -->
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <!-- slot 에 하위 컴포넌트 추가 -->
          <template v-slot:list>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="materlist" navText="자재발주조회">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="matma" navText="자재발주관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="storeList" navText="입고조회">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="storema" navText="입고관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <!-- collapseRef : router 에 등록된 path name 등록 ( '/' 는 제외 )-->
        <!-- navText : 화면에 표시될 이름 -->
        <!-- collapse : 확장 여부 true/false-->
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="생산">

          <template v-slot:icon>
            <!-- 표시될 아이콘 이름 -->
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <!-- slot 에 하위 컴포넌트 추가 -->
          <template v-slot:list>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="Prodplan" navText="생산계획관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">content_paste</i>
              </template>
            </sidenav-collapse>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="Prodorder" navText="생산지시관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">content_paste</i>
              </template>
            </sidenav-collapse>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="Prodprocess" navText="생산공정관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">view_in_ar</i>
              </template>
            </sidenav-collapse>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="Prodprocwork" navText="생산공정운영">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">apps</i>
              </template>
            </sidenav-collapse> 
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="Examples">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <template v-slot:list>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="tables" navText="Tables">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="notifications"
              navText="Notifications">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="billing"
              navText="Billing">
              <template v-slot:icon>
                <!-- 표시될 아이콘 이름 -->
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="dashboard"
              navText="Dashboard">
              <template v-slot:icon>
                <!-- 표시될 아이콘 이름 -->
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="profile"
              navText="Profile">
              <template v-slot:icon>
                <!-- 표시될 아이콘 이름 -->
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="signIn" navText="SignIn">
              <template v-slot:icon>
                <!-- 표시될 아이콘 이름 -->
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="signUp" navText="SignUp">
              <template v-slot:icon>
                <!-- 표시될 아이콘 이름 -->
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

          </template>
        </sidenav-collapse>

      </li>

      <!-- <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="tables" navText="Tables">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="notifications" navText="Notifications">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="billing" navText="Billing">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="dashboard"
          navText="Dashboard">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="profile" navText="Profile">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="signIn" navText="SignIn">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="signUp" navText="SignUp">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
        </sidenav-collapse>
      </li> -->

      <!-- 기준관리 -->
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="기준관리">
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <template v-slot:list>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="basicprod" navText="제품관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5"></i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="basicbom" navText="BOM관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5"></i>
              </template>
            </sidenav-collapse>

            
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="basicmate" navText="자재관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5"></i>
              </template>
            </sidenav-collapse>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <!-- collapseRef : router 에 등록된 path name 등록 ( '/' 는 제외 )-->
        <!-- navText : 화면에 표시될 이름 -->
        <!-- collapse : 확장 여부 true/false-->
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="검사">
          <template v-slot:icon>
            <!-- 표시될 아이콘 이름 -->
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <!-- slot 에 하위 컴포넌트 추가 -->
          <template v-slot:list>
            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="mateQuality" navText="자재수입검사조회">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="delivs" navText="자재수입검사관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="prodQuality" navText="제품검사조회">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="delivs" navText="제품검사관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="orders" navText="검사기준관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>

            <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="orders" navText="검사항목관리">
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">table_view</i>
              </template>
            </sidenav-collapse>
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