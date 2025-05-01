import { createRouter, createWebHistory } from 'vue-router'
import LoginView     from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import InicioView    from '@/views/InicioView.vue'
import AtoView       from '@/views/AtoView.vue'
import ProjetosView  from '@/views/ProjetosView.vue'
import SessoesView   from '@/views/SessoesView.vue'
import NotFoundView  from '@/views/404View.vue'

function getUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',            // rota default /dashboard
        name: 'Inicio',
        component: InicioView
      },
      {
        path: 'ato',
        name: 'Ato',
        component: AtoView
      },
      {
        path: 'projetos',
        name: 'Projetos',
        component: ProjetosView
      },
      {
        path: 'sessoes',
        name: 'Sessões',
        component: SessoesView
      },
      {
        path: 'indicacoes',
        name: 'Indicações',
        component: () => import('@/views/IndicacoesView.vue') // Rota para Indicações
      },
      {
        path: 'protocolos',
        name: 'Protocolos',
        component: () => import('@/views/ProtocolosView.vue') // Rota para Protocolos
      },
      {
        path: 'vereadores',
        name: 'Vereadores',
        component: () => import('@/views/VereadoresView.vue') // Rota para Vereadores
      },
      {
        path: 'mesadiretora',
        name: 'Mesa Diretora',
        component: () => import('@/views/MesaDiretoraView.vue') // Rota para Mesa Diretora
      }
      // … outras sub-rotas …
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = getUser()
  if (to.meta.requiresAuth) {
    if (!user) return next({ name: 'Login' })
  }
  next()
})

export default router
