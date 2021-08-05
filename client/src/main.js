import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'

import '@/assets/styles/main.scss';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import vmodal from 'vue-js-modal';

Vue.use(VueRouter)
Vue.use(VueSweetalert2)
Vue.use(vmodal)

new Vue({
  render: h => h(App),
  el: '#app',
  router
})
