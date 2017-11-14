
import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'

import { store } from './store'

//Importar Firebase
import * as firebase from 'firebase'

Vue.use(Vuetify)

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
      storageBucket: ''
    })
  }
})
