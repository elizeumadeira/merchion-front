import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CadastroView from '../views/CadastroView.vue'
import AreaUsuarioView from '../views/AreaUsuarioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AreaUsuarioView,
      beforeEnter: (to, from, next) => {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');

        const isAuthenticated = name !== null && email !== null; // Duvido alguém hackear esse sistema!
        if (!isAuthenticated) {
          next({ name: 'home' });
        } else {
          next();
        }
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: {},
      beforeEnter: (to, from, next) => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        next({ name: 'home' });
      },
    }
  ],
})

export default router
