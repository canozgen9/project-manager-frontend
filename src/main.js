import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

var socket = socketio('http://localhost:4321', {reconnection: true, autoConnect: false})
Vue.use(VueSocketIO, socket)

store.state.socket = socket

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
