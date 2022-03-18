import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/style.less";
import axios from 'axios';
import PortalVue from 'portal-vue';

axios.defaults.baseURL = 'http://localhost:3000';

Vue.config.productionTip = false;

Vue.use(PortalVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

document.title = "한자검정시험";
