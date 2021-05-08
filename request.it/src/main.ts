import Vue from "vue";
import App from "./App.vue";
import { CommandRegistry } from "./lib/command-registry";
import router from "./router";
import store from "./store";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

Vue.config.productionTip = false;

const registry = new CommandRegistry();

Vue.mixin({
  computed: {
    $commands: () => registry,
  },
});

Vue.use(hljs.vuePlugin);

window.addEventListener("message", (e) => {
  registry.call(e.data);
});

declare module "vue/types/vue" {
  interface Vue {
    $commands: CommandRegistry;
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
