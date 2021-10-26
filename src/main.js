import Vue from 'vue'
import App from './App.vue'
import './index.css'

import Toasted from 'vue-toasted';
import { firestorePlugin } from 'vuefire';

Vue.config.productionTip = false
Vue.use(Toasted)
Vue.use(firestorePlugin)

new Vue({
  render: h => h(App)
}).$mount('#app')
