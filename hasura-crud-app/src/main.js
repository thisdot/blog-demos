import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";

let bootstrap = require("bootstrap");
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
