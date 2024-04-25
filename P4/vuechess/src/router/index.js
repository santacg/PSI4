import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
<<<<<<< HEAD
import CreateGame from '../views/CreateGame.vue'
import LogOut from '../views/LogOut.vue'
=======
import LogOut from '../views/LogOut.vue'
import CreateGame from '../views/CreateGame.vue'

>>>>>>> 9e19ea5a995403cabc0e3738eec65d14b6fd3f18

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
<<<<<<< HEAD
    {
      path: '/creategame',
      name: 'CreateGame',
      component: CreateGame
    },
=======
>>>>>>> 9e19ea5a995403cabc0e3738eec65d14b6fd3f18
    {
      path: '/log-out',
      name: 'LogOut',
      component: LogOut
    },
<<<<<<< HEAD
=======
    {
      path: '/creategame',
      name: 'CreateGame',
      component: CreateGame
    }
>>>>>>> 9e19ea5a995403cabc0e3738eec65d14b6fd3f18
  ]
})

export default router
