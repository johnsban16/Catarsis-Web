import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Chat from '@/components/Chat/Chat'
import Meditations from '@/components/Meditations/Meditations'
import MeditationsRelax from '@/components/Meditations/Meditations-Relax'
import Diary from '@/components/Diary/Diary'
import DiaryEntry from '@/components/Diary/Entry'
import AddEntry from '@/components/Diary/AddEntry'
import Login from '@/components/User/Login'
import Signup from '@/components/User/Signup'
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
      path: '/Meditations',
      name: 'Meditations',
      component: Meditations
    },
    {
      path: '/Meditations/Relax',
      name: '/Meditations/Relax',
      component: MeditationsRelax
    },
    {
      path: '/Diary',
      name: 'Diary',
      component: Diary
    },
    {
      path: '/Entry/New',
      name: 'AddEntry',
      component: AddEntry
    },
    {
      path: '/Entry/:id',
      name: 'DiaryEntry',
      props: true,
      component: DiaryEntry
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
  ],
  mode:'history'
})
