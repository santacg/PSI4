import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import CreateGame from '../views/CreateGame.vue'
import LogOut from '../views/LogOut.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-up',
      name: 'SignUp',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
  ]
})

export default router
