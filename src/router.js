import { createRouter, createWebHistory } from "vue-router";
import useAuth from "./composables/useAuth";

import Index from "./pages/index.vue";
import Salsas from "./pages/salsas.vue";
import Traditional from "./pages/traditional.vue";
import Abroad from "./pages/abroad.vue";
import Sides from "./pages/sides.vue";
import Login from "./pages/login.vue";
import NotFound from "./pages/404.vue";

const { isAuthenticated } = useAuth();

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/salsas",
    name: "Salsas",
    component: Salsas,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/traditional",
    name: "Traditional",
    component: Traditional,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/abroad",
    name: "Abroad",
    component: Abroad,
  },
  {
    path: "/sides",
    name: "Sides",
    component: Sides,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
