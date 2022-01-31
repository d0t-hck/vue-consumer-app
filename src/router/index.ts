import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../components/SingIn.vue";
import SignUp from "../components/SignUp.vue";
import Edit from "../components/Edit.vue";
import Manage from "../components/Manage.vue";
import Profile from "../components/Profile.vue";
import Unauthorized from "../components/Unauthorized.vue";
import Forbidden from "../components/Forbidden.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/home",
  },
  {
    path: "/sign-in",
    component: SignIn,
  },
  {
    path: "/sign-up",
    component: SignUp,
  },
  {
    path: "/edit/:email",
    name: "edit",
    component: Edit,
  },
  {
    path: "/manage",
    component: Manage,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
  },
  {
    path: "/forbidden",
    component: Forbidden,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
