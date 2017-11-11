import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Chat from '@/components/Chat/Chat'
import Meditations from '@/components/Meditations/Meditations'
import Diary from '@/components/Diary/Diary'
import Login from '@/components/Login/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/Mediations',
      name: 'Meditations',
      component: Meditations
    },
    {
      path: '/Diary',
      name: 'Diary',
      component: Diary
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ],
  mode:'history'
})
