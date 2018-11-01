// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// require('../bootstrap');

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from "vee-validate";
import Toastr from 'vue-toastr';

import App from './App'
import router from './router'
import store from './store/index'


import { setHeaderAxios } from './api/auth'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toastr/src/vue-toastr.scss'

Vue.use(BootstrapVue);
Vue.use(Toastr);
// setHeaderAxios();

const config = {
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
  classes: true,
  fieldsBagName: 'vee',
}
Vue.use(VeeValidate, config)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

// console.log(a.$router);

