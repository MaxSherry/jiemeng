import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers/routers'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: routers
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
