import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Sidebar from "../views/Sidebar.vue";
import RequestForm from "../views/request-form.vue";
import RequestFormBody from "../views/request-form.vue";
import RequestFormAuth from "../views/request-form.vue";
import RequestFormQuery from "../views/request-form.vue";
import RequestFormHeader from "../views/request-form.vue";
import RequestFormDocs from "../views/request-form.vue";
import Response from "../views/response.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Sidebar",
    component: Sidebar,
  },
  {
    path: "/request",
    name: "Request",
    component: RequestForm,
    children: [
      { path: "body", component: RequestFormBody },
      { path: "auth", component: RequestFormAuth },
      { path: "query", component: RequestFormQuery },
      { path: "header", component: RequestFormHeader },
      { path: "docs", component: RequestFormDocs },
    ],
  },
  {
    path: "/response",
    name: "Response",
    component: Response,
  },
];

const router = new VueRouter({
  routes,
});

declare const VUE_initialState: string;

router.replace(VUE_initialState);

export default router;
