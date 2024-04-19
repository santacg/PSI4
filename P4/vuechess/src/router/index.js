import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LogIn.vue'
import Login from '../views/SignUp.vue'
import Login from '../views/LogOut.vue'
import Login from '../views/CreateGame.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      path: '/log-in',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/sign-up',
      name: 'SignUp',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SignUp
    },
    {
      path: '/log-out',
      name: 'LogOut',
      component: LogOut
    },
    {
      path: '/creategame',
      name: 'CreateGame',
      component: CreateGame
    }
  ]
})

export default router
