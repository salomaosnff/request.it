import Vue from "vue";
import App from "./App.vue";
import { CommandRegistry } from "./lib/command-registry";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

const registry = new CommandRegistry();

Vue.mixin({
  computed: {
    $commands: () => registry,
  },
});

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
