<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">

      <li class="nav-item">
        <!-- collapseRef : router 에 등록된 path name 등록 ( '/' 는 제외 )-->
        <!-- navText : 화면에 표시될 이름 -->
        <!-- collapse : 확장 여부 true/false-->
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
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="" navText="영업">
          <template v-slot:icon>
            <!-- 표시될 아이콘 이름 -->
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
          <!-- slot 에 하위 컴포넌트 추가 -->
          <template v-slot:list>
            <SidenavCollapseItem refer="Productionplan" text="생산계획관리"></SidenavCollapseItem>
            <SidenavCollapseItem refer="Productionorder" text="생산지시관리"></SidenavCollapseItem>
            <SidenavCollapseItem refer="Productionprocess" text="생산공정관리"></SidenavCollapseItem>
            <SidenavCollapseItem refer="Productionprocwork" text="생산공정운영"></SidenavCollapseItem>
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