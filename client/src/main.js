import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'

import '@/assets/styles/main.scss';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueRouter)
Vue.use(VueSweetalert2)

new Vue({
  render: h => h(App),
  el: '#app',
  router
})
