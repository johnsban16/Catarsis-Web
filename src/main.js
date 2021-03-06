import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'

import { store } from './store'

import AlertCmp from './components/Shared/Alert.vue'

import Aplayer from 'aplayer'
import VueAplayer from 'vue-aplayer'
import VueResource from 'vue-resource'

// Cada filtro hay que importarlo
import DateFilter from './filters/date'
import arrayToString from './filters/arrayToString'

// Importar dialog de edit
import EditEntryDialog from './components/Diary/Edit/EditEntryDialog.vue'


//Importar Firebase
import * as firebase from 'firebase'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(Vuetify)
Vue.use(VueAplayer)
Vue.use(VueChatScroll)
Vue.use(VueResource)

// Definir el filtro acá para usarlo en toda la app
Vue.filter('date', DateFilter)
Vue.filter('arrayToString', arrayToString)

Vue.component('app-alert', AlertCmp)
Vue.component('a-player', VueAplayer)

// Dialog de edit
Vue.component('app-edit-entry-dialog', EditEntryDialog)

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
        this.$store.dispatch('loadEntrys') // Carga sus entrys de diario
        this.$store.dispatch('loadMeditationsRelax')
      }
    }) // Esto se dispara cada vez que el estado de autenticación cambia

    // Se cargan las entrys del diario del usuario
    this.$store.dispatch('loadEntrys')
    // Se cargan las meditations relax
    this.$store.dispatch('loadMeditationsRelax')

  }
})
