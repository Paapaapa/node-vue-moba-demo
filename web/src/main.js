import Vue from 'vue';
import App from './App.vue'
import './assets/iconfont/iconfont.css';
import './assets/scss/style.scss';

Vue.config.productionTip = false


import VueRouter from 'vue-router';
import router from './router';

Vue.use(VueRouter);


import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

// 轮播组件
Vue.use(VueAwesomeSwiper);


// 自定义卡片组件
import Card from './components/Card.vue';
import ListCard from './components/ListCard.vue';

Vue.component('m-card', Card);
Vue.component('m-list-card', ListCard);


import axios from 'axios';

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
 // baseURL: 'http://localhost:3000/web/api',
});


import dayjs from 'dayjs';

Vue.filter('date', val => dayjs(val).format("YYYY/MM/DD"));


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
