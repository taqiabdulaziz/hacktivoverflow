import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
