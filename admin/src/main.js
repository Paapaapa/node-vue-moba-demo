import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import http from './http';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload';
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      };
    }
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
