import Vue from 'vue'
import App from './App.vue'
import './index.css'

import Vuex from 'vuex'
import Toasted from 'vue-toasted';
import store from './store';
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false
Vue.use(Toasted)
Vue.use(Vuex)
Vue.use(firestorePlugin)

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')


