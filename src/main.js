import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueSimpleAccordion from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';

import './assets/fonts/fonts.css'

Vue.config.productionTip = false
Vue.use(VueSimpleAccordion, {});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
