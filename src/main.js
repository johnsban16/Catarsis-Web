import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'

import { store } from './store'

import AlertCmp from './components/Shared/Alert.vue'

import Aplayer from 'aplayer'
import VueAplayer from 'vue-aplayer'

// Cada filtro hay que importarlo
import DateFilter from './filters/date'
import arrayToString from './filters/arrayToString'

//Importar Firebase
import * as firebase from 'firebase'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(Vuetify)
Vue.use(VueAplayer)
Vue.use(VueChatScroll)

// Definir el filtro acá para usarlo en toda la app
Vue.filter('date', DateFilter)
Vue.filter('arrayToString', arrayToString)

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
    // Para que le haga lock al usuario que está signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user){ // Si hay un usuario válido
        this.$store.dispatch('autoSignIn', user) // Autosignea un usuario que ya tiene los tokens válidos en local storage
      }
    }) // Esto se dispara cada vez que el estado de autenticación cambia

    // Se cargan las entrys del diario del usuario
    this.$store.dispatch('loadEntrys')
  }
})
