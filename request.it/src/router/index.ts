import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Sidebar from "../views/Sidebar.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Sidebar",
    component: Sidebar,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
