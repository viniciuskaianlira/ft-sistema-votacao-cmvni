import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import SessaoView from '../views/SessaoView.vue';
import { permissions } from '../utils/permissions.js';

// Simulação de Auth (você deve depois integrar com Vuex ou localStorage real)
function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/sessao',
    name: 'Sessão',
    component: SessaoView,
    meta: { requiresAuth: true, roles: ['presidente', 'secretario'] }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Proteção de Rotas
router.beforeEach((to, from, next) => {
  const user = getUser();

  if (to.meta.requiresAuth) {
    if (!user) {
      return next({ name: 'Login' });
    }

    if (to.meta.roles && !to.meta.roles.includes(user.role)) {
      // Se o usuário não tiver a role exigida pela rota
      return next({ name: 'Dashboard' });
    }
  }

  next();
});

export default router;
