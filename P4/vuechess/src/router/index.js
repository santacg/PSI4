import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import CreateGame from '../views/CreateGame.vue'
import LogOut from '../views/LogOut.vue'
import Play from '../views/Play.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '',
      path: '/log-in',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/creategame',
      name: 'CreateGame',
      component: CreateGame
    },
    {
      path: '/log-out',
      name: 'LogOut',
      component: LogOut
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    }
  ]
})

export default router
