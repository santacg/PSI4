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
      path: '',
      path: '/log-in',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/creategame',
      name: 'CreateGame',
      component: CreateGame,
      meta: { requiresAuth: true }
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
  const store = useTokenStore(); // Obtener el store de autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si la ruta requiere autenticación
    if (!store.isAuthenticated) {
      // Si el usuario no está autenticado, redirigir a la página de login
      alert("You are not authenticated to access " + to.path);
      next({ path: '/log-in' });
    } else {
      next(); // Permitir acceso si está autenticado
    }
  } else {
    next(); // Permitir acceso si la ruta no requiere autenticación
  }
});

export default router
