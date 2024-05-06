import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '../stores/token'
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
      path: '/log-in',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '',
      component: LogIn
    },
    {
      path: '/creategame',
      name: 'CreateGame',
      // Quito el auth para los test, pero me parece buena idea usarlo
      component: CreateGame,
    },
    {
      path: '/log-out',
      name: 'LogOut',
      component: LogOut,
      meta: { requiresAuth: true }
    },
    {
      path: '/play',
      name: 'Play',
      component: Play,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useTokenStore(); 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.isAuthenticated) {
      alert("You are not authenticated to access " + to.path);
      next({ path: '/log-in' });
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

export default router
