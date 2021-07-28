import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './service/http';
import '@/mock'
import { goBack, goPage } from './utils/goBack'



Vue.config.productionTip = false;
Vue.use(api);
Vue.prototype.$api = api;
Vue.prototype.$goBack = goBack; // 跳转对应降级页面
Vue.prototype.$goPage = goPage; // 跳转应该显示的页面
Vue.prototype.intervalNum = 30000; // 定时器间隔








new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
