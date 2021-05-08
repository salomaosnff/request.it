import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Sidebar from "../views/Sidebar.vue";
import RequestForm from "../views/request-form.vue";
import RequestFormBody from "../views/request/Body.vue";
import RequestFormAuth from "../views/request/Auth.vue";
import RequestFormQuery from "../views/request/Query.vue";
import RequestFormHeader from "../views/request/Header.vue";
import RequestFormDocs from "../views/request/Docs.vue";
import Response from "../views/response.vue";

import ResponseBodyView from '../views/response/body.vue'
import ResponseHeadersView from '../views/response/headers.vue'

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
    children: [
      { path: "body", component: ResponseBodyView },
      { path: "header", component: ResponseHeadersView },
    ],
  },
];

const router = new VueRouter({
  routes,
});

declare const VUE_initialState: string;

router.replace(VUE_initialState);

export default router;
