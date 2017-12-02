import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'

import { store } from './store'

import AlertCmp from './components/Shared/Alert.vue'

import Aplayer from 'aplayer'
import VueAplayer from 'vue-aplayer'

//Importar Firebase
import * as firebase from 'firebase'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(Vuetify)
Vue.use(VueAplayer)
Vue.use(VueChatScroll)
Vue.component('app-alert', AlertCmp)
Vue.component('a-player', VueAplayer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyCYogMKxVUoh0tAPGW53TlTSFHLDdBlOuQ',
      authDomain: 'catarsis-cr.firebaseapp.com',
      databaseURL: 'https://catarsis-cr.firebaseio.com',
      projectId: 'catarsis-cr',
      storageBucket: 'catarsis-cr.appspot.com'
    })  
  }
})
