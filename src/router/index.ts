import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../components/SingIn.vue";
import SignUp from "../components/SignUp.vue";
import Edit from "../components/Edit.vue";
import Manage from "../components/Manage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
