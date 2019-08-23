import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Toasted from 'vue-toasted';

import routes from './routes/routes';


//plugin setup
Vue.use(VueRouter);
Vue.use(Toasted, {
  duration: 3000
})

//configure router
const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
